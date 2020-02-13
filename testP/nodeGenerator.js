import { Vector2d, Curve } from "./classVariable";
import {_} from "global";


export const LineGenerator = inputs => {
  // console.time("for loop");
  let lineResult = {
    vectors: [],
    curves: [],
    segments: { start: [], end: [] },
    beginStationNumber: 0,
    endStationNumber: 0,
    startPoint: [],
    slaveOrMaster: true,
    input: { ...inputs },
    points : []
  };
  const spacing = 10000; //단위 수정시 check

  for (let i = 0; i < lineResult.input.horizonDataList.length - 1; i++) {
    lineResult.startPoint.push(_.take(lineResult.input.horizonDataList[i], 2));
    lineResult.vectors.push(
      Vector2d([
        _.take(lineResult.input.horizonDataList[i], 2),
        _.take(lineResult.input.horizonDataList[i + 1], 2)
      ])
    );
  }

  for (let i = 0; i < lineResult.input.horizonDataList.length - 2; i++) {
    lineResult.curves.push(
      Curve(
        _.take(lineResult.input.horizonDataList[i], 2),
        lineResult.vectors[i],
        lineResult.vectors[i+1],
        lineResult.input.horizonDataList[i + 1][2],
        lineResult.input.horizonDataList[i + 1][3],
        lineResult.input.horizonDataList[i + 1][4],
      )
    );
  }
  const dataList = lineResult.input.horizonDataList;
  let segmentsStation = lineResult.input.beginStation
  lineResult.segments.start.push(segmentsStation);
  for (let j = 0; j < (dataList.length - 2); j++) {
    if (j === 0){
      segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset; //초기값은 항상 직선으로 시작
      lineResult.segments.start.push(segmentsStation);
    } else {
      segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset - lineResult.curves[j-1].endOffset
      lineResult.segments.start.push(segmentsStation);
    }
    segmentsStation += lineResult.curves[j].beginClothoid.length
    lineResult.segments.start.push(segmentsStation);
    segmentsStation +=  lineResult.curves[j].arcAngle * lineResult.curves[j].arcRadius
    lineResult.segments.start.push(segmentsStation);
    segmentsStation +=  lineResult.curves[j].endClothoid.length
    lineResult.segments.start.push(segmentsStation);
  }
  lineResult.segments.end.push(..._.drop(lineResult.segments.start));
  if (lineResult.curves.length === 0){
    segmentsStation += lineResult.vectors[lineResult.vectors.length-1].length
  }else {
    segmentsStation += lineResult.vectors[lineResult.vectors.length-1].length - lineResult.curves[lineResult.curves.length -1].endOffset
  }
  lineResult.segments.end.push(segmentsStation);
  lineResult.beginStationNumber = lineResult.segments.start[0];
  lineResult.endStationNumber = lineResult.segments.end[lineResult.segments.end.length - 1];

  for (let i = Math.ceil(lineResult.beginStationNumber / spacing) * spacing; i < lineResult.endStationNumber; i += spacing) {
    lineResult.points.push(PointGenerator(i, lineResult,90));
  }
  return lineResult;
};

export const OffsetLine = (offset, line) => {
let lineResult = {
    vectors: line.vectors,
    curves: line.curves,
    segments: line.segments,
    beginStationNumber: line.beginStationNumber,
    endStationNumber: line.endStationNumber,
    startPoint: [],
    slaveOrMaster: false,
    input: line.inputs,
    points : []
    };

  //let lineResult = {...line}
//   let points = [];
  for (let i = 0; i<line.points.length;i++){
    let resultPoint = {
        stationNumber:line.points[i].stationNumber,
        x: line.points[i].x  + line.points[i].normalCos * offset,
        y: line.points[i].y  + line.points[i].normalSin * offset,
        z: 0,
        normalCos: line.points[i].normalCos,
        normalSin: line.points[i].normalSin,
        masterStationNumber: line.points[i].stationNumber,
        offset: offset,
        virtual: false
        };
    lineResult.points.push(resultPoint)

  }

  return lineResult
}

export const LineMatch = (masterPoint, masterLine, slaveLine, skew, VerticalDataList, SuperElevation) => {
  let resultPoint = {
    stationNumber : 0,
    x: 0,
    y: 0,
    z: 0,
    normalCos: 0,
    normalSin: 0,
    masterStationNumber: 0,
    offset: 0,
    virtual: false,
    skew:skew,
    gradientX:0,
    gradientY:0,
  };
  const unitVx = -1 * masterPoint.normalSin;
  const unitVy = masterPoint.normalCos;
  const skewRadian = skew * Math.PI / 180;
  let dX = unitVx * Math.cos(skewRadian) - unitVy * Math.sin(skewRadian);
  let dY = unitVx * Math.sin(skewRadian) + unitVy * Math.cos(skewRadian);
  let alpha = dY;
  let beta = -1 * dX;
  let gamma = - alpha * masterPoint.x - beta * masterPoint.y;
  let dummy1 = 0;
  let dummy2 = 0;
  let sign = 1;
  for (let i = 0; i<slaveLine.points.length -1;i++){
    dummy1 = alpha * slaveLine.points[i].x + beta * slaveLine.points[i].y + gamma;
    dummy2 = alpha * slaveLine.points[i+1].x + beta * slaveLine.points[i+1].y + gamma;
    if (dummy1 ===0){
      resultPoint = slaveLine.points[i]    
      break;
    }
    else if (dummy2 ===0) {
      resultPoint = slaveLine.points[i+1]    
      break;
    }
    else if (dummy1*dummy2 < 0){
      let coe = splineCoefficient(slaveLine.points[i],slaveLine.points[i+1]);
      let a = alpha * coe.a2 + beta * coe.a1;
      let b = alpha * coe.b2 + beta * coe.b1;
      let c = alpha * coe.c2 + beta * coe.c1 + gamma;
      let t = 0;
      if (a == 0){
          t = -c/b;
      }else{
        t = (-b + Math.sqrt(b**2 - 4*a*c))/(2*a);
        if (t>1 || t<-1){
            t = (-b - Math.sqrt(b**2 - 4*a*c))/(2*a);
        };
      }
      
      let deltaX = 2* coe.a2 * (t) + coe.b2;
      let deltaY = 2* coe.a1 * (t) + coe.b1;
      let len = Math.sqrt(deltaX**2 + deltaY**2);
      resultPoint.normalCos = - deltaY/len;
      resultPoint.normalSin = deltaX/len;
      resultPoint.x = coe.a2 * (t**2) + coe.b2* t + coe.c2;
      resultPoint.y = coe.a1 * (t**2) + coe.b1* t + coe.c1;
    //   let segLen = splineLength(slaveLine.points[i],slaveLine.points[i+1]);
    //   let resultLen = splineLength(slaveLine.points[i],resultPoint);
    //   resultPoint.stationNumber = slaveLine.points[i].stationNumber + (slaveLine.points[i+1].stationNumber - slaveLine.points[i].stationNumber) * resultLen/segLen;
      let MasterPoint = PointLineMatch(resultPoint,masterLine)
      resultPoint.masterStationNumber = MasterPoint.masterStationNumber.toFixed(4)*1
      resultPoint.stationNumber = resultPoint.masterStationNumber
      if (MasterPoint.normalCos * (resultPoint.x - MasterPoint.x) + MasterPoint.normalSin * (resultPoint.y - MasterPoint.y) >= 0) {
        sign = 1
      }
      else {
        sign = -1
      }
      resultPoint.offset = sign * Math.sqrt((resultPoint.x-MasterPoint.x)**2 + (resultPoint.y-MasterPoint.y)**2).toFixed(4)*1;
      let verticalInfo =  VerticalPositionGenerator(VerticalDataList, SuperElevation, resultPoint)
      resultPoint.z = verticalInfo.elevation
      resultPoint.gradientX = verticalInfo.gradientX;
      resultPoint.gradientY = verticalInfo.gradientY;
      break;
    }
  }
  return resultPoint
}

export function SplinePointGenerator(masterPoint, slavePoints, VerticalDataList, SuperElevation){
    let resultPoint = {
        stationNumber:0,
        x: 0,
        y: 0,
        z: 0,
        normalCos: 0,
        normalSin: 0,
        masterStationNumber:0,
        offset: 0,
        virtual: false,
        skew:90
      };

      let dX = masterPoint.normalCos;
      let dY = masterPoint.normalSin;
      let alpha = dY;
      let beta = -1 * dX;
      let gamma = - alpha * masterPoint.x - beta * masterPoint.y;
      let dummy1 = 0;
      let dummy2 = 0;
      let sign = 1;
      for (let i = 0; i<slavePoints.length -1;i++){
        dummy1 = alpha * slavePoints[i].x + beta * slavePoints[i].y + gamma;
        dummy2 = alpha * slavePoints[i+1].x + beta * slavePoints[i+1].y + gamma;
        if (dummy1 ===0){
          resultPoint = slavePoints[i]
          break;
        }
        else if (dummy2 ===0) {
          resultPoint = slavePoints[i+1]
          break;
        }
        else if (dummy1*dummy2 < 0){
          let coe = splineCoefficient(slavePoints[i],slavePoints[i+1]);
          let a = alpha * coe.a2 + beta * coe.a1;
          let b = alpha * coe.b2 + beta * coe.b1;
          let c = alpha * coe.c2 + beta * coe.c1 + gamma;
          let t = 0;
          if (a == 0){
              t = -c/b;
          }else{
            t = (-b + Math.sqrt(b**2 - 4*a*c))/(2*a);
            if (t>1 || t<-1){
                t = (-b - Math.sqrt(b**2 - 4*a*c))/(2*a);
            };
          }
          let deltaX = 2* coe.a2 * (t) + coe.b2;
          let deltaY = 2* coe.a1 * (t) + coe.b1;
          let len = Math.sqrt(deltaX**2 + deltaY**2);
          resultPoint.normalCos = - deltaY/len;
          resultPoint.normalSin = deltaX/len;
          resultPoint.x = coe.a2 * (t**2) + coe.b2* t + coe.c2;
          resultPoint.y = coe.a1 * (t**2) + coe.b1* t + coe.c1;
          resultPoint.masterStationNumber = masterPoint.masterStationNumber.toFixed(4)*1
          resultPoint.stationNumber = resultPoint.masterStationNumber
          if (masterPoint.normalCos * (resultPoint.x - masterPoint.x) + masterPoint.normalSin * (resultPoint.y - masterPoint.y) >= 0) {
            sign = 1
          }
          else {
            sign = -1
          }
          resultPoint.offset = sign * Math.sqrt((resultPoint.x-masterPoint.x)**2 + (resultPoint.y-masterPoint.y)**2).toFixed(4)*1;
          let verticalInfo =  VerticalPositionGenerator(VerticalDataList, SuperElevation, resultPoint)
          resultPoint.z = verticalInfo.elevation
          resultPoint.gradientX = verticalInfo.gradientX;
          resultPoint.gradientY = verticalInfo.gradientY;
          break;
        }
      }
      return resultPoint
    

}

export const PointGenerator = (stationNumber, line, skew) => {
  let resultPoint = {
    stationNumber:stationNumber.toFixed(4)*1,
    x: 0,
    y: 0,
    z: 0,
    normalCos: 0,
    normalSin: 0,
    masterStationNumber: stationNumber,
    offset: 0,
    virtual: false,
    skew : skew,
  };
  const dataList = line.input.horizonDataList;
  const startStationNumList = line.segments.start;
  const endStationNumList = line.segments.end;

  let l = 0;
  let lineNum = 0;
  let varCase = 0;
  const startPoint = line.startPoint;
  let tempRes = [0,0,0,0
  
  ];
  
  for (let i = 0; i <= 4 * (dataList.length-2); i++) {
    l = stationNumber - startStationNumList[i];

    lineNum = Math.floor(i / 4);
    varCase = i % 4;
    if (
      stationNumber >= startStationNumList[i] &&
      stationNumber <= endStationNumList[i]
    ) {
      switch (varCase) {
        case 0:
          if (i === 0 || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
            tempRes[0] = startPoint[lineNum][0] + l * line.vectors[lineNum].cos;
            tempRes[1] = startPoint[lineNum][1] + l * line.vectors[lineNum].sin;
          } else {
            tempRes[0] = line.curves[lineNum - 1].endClothoidCoord[0] + l * line.vectors[lineNum].cos;
            tempRes[1] = line.curves[lineNum - 1].endClothoidCoord[1] + l * line.vectors[lineNum].sin;
          }
          tempRes[2] = line.vectors[lineNum].sin;
          tempRes[3] = -1 * line.vectors[lineNum].cos;
          break;
        case 1:
          tempRes = line.curves[lineNum].beginClothoidStation(l);
          break;
        case 2:
          tempRes = line.curves[lineNum].arcStation(l);
          break;
        case 3:
          tempRes = line.curves[lineNum].endClothoidStation(l);
          break;
        default:
          break;
      }
      resultPoint.x = tempRes[0];
      resultPoint.y = tempRes[1];
      resultPoint.normalCos = tempRes[2];
      resultPoint.normalSin = tempRes[3];
      break;
    }
  }
  return resultPoint;
};

export const splineCoefficient = (point1, point2) =>{
    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    let b1 = (y2 - y1) / 2;
    let b2 = (x2 - x1) / 2;
    let a1 = 0.0;
    let a2 = 0.0;
    let df1 = 0.0;
    let df2 = 0.0;
    if (point1.normalSin === 0){
        if (point2.normalSin === 0){
            // return Math.abs(y2 - y1)
        }
        else{
            df2 = -point2.normalCos / point2.normalSin
            a2 = b2 / 2
            a1 = (-b1 + df2 * (2 * a2 + b2)) / 2
        } 
    } else if (point2.normalSin === 0){
        if (point2.normalSin === 0){
            // return Math.abs(y2 - y1)
        }else{
            df1 = -point1.normalCos / point1.normalSin
            a2 = b2 / -2
            a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
        }
    }else{
        df1 = -point1.normalCos / point1.normalSin
        df2 = -point2.normalCos / point2.normalSin

        if (df1 === df2){
            a1 = 0
            a2 = 0
        }else{
            a2 = (2*b1-(df1+df2)*b2)/(2*(df2-df1))
            a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
        }
    }
    const c1 = y2 - a1 - b1;
    const c2 = x2 - a2 - b2;
 return {a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2}
}

export const splineLength =(point1, point2) =>{
    const coe = splineCoefficient(point1,point2)
    const w1 = 5/9
    const w2 = 8/9
    const w3 = w1
    const t1 = -0.77459666924
    const t2 = 0
    const t3 = 0.77459666924

    let length = Math.sqrt(Math.pow((2 * coe.a1 * t1 + coe.b1), 2) + Math.pow((2 * coe.a2 * t1 + coe.b2),2)) * w1 
            + Math.sqrt(Math.pow((2 * coe.a1 * t2 + coe.b1), 2) + Math.pow((2 * coe.a2 * t2 + coe.b2),2)) * w2
            + Math.sqrt(Math.pow((2 * coe.a1 * t3 + coe.b1), 2) + Math.pow((2 * coe.a2 * t3 + coe.b2),2)) * w3
    return length.toFixed(4)*1
}

export const PointLineMatch = (targetPoint, masterLine) =>{
    let resultPoint = {};
    let point1 = {};
    let point2 = {};
    let crossproduct1 = 0;
    let crossproduct2 = 0;
    let innerproduct = 1;
    let station1 = 0;
    let station2 = 0;
    let station3 = 0;
    const err = 0.1;
    let num_iter = 0;
    let a = true;

    //matser_segment = variables.Segment_station_number(master_line_datalist)

    for (let i = 0; i< masterLine.segments.start.length;i++){
        station1 = masterLine.segments.start[i];
        station2 = masterLine.segments.end[i];
        point1 = PointGenerator(station1, masterLine,90)
        point2 = PointGenerator(station2, masterLine,90)
        crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos
        crossproduct2 = (targetPoint.x - point2.x) * point2.normalSin - (targetPoint.y - point2.y) * point2.normalCos

        if (crossproduct1 * crossproduct2 < 0){
            a = false;
            break;
        }else if (Math.abs(crossproduct1) < err){
            resultPoint = {...point1};
            break;
        } else if (Math.abs(crossproduct2) < err){
            resultPoint = {...point2};
            break;
        }
    }
    if (a == false){
        while (Math.abs(innerproduct) > err){
            innerproduct = (targetPoint.x - point1.x) * (-point1.normalSin) + (targetPoint.y - point1.y) * (point1.normalCos)
            station3 = station1 + innerproduct
            point1 = PointGenerator(station3, masterLine,90)
            station1 = point1.stationNumber
            crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos
            resultPoint = {...point1}
            num_iter += 1
            if (num_iter == 200){
                break;
            }
        }
    };
    //targetPoint.master_station_number = result.station_number
    return resultPoint
 };

 export function VerticalPositionGenerator(VerticalDataList, SuperElevation, Point){
    const station = Point.masterStationNumber;
    const offset = Point.offset;
    let result_elevation = 0;
    let superelevation =0;
    let parabola_data = [];
    let tangent = [];
    let gradX = 0;
  for (let i = 0; i < VerticalDataList.length-1; i++){
      tangent.push( (VerticalDataList[i+1]['elevation'] - VerticalDataList[i]['elevation']) /
      (VerticalDataList[i+1]['station'] - VerticalDataList[i]['station']) )
  }
  for (let i = 0; i <  VerticalDataList.length-2;i++){
    let parabola1 = VerticalDataList[i+1]['station'] - VerticalDataList[i+1]['curveLength'] / 2;
    let parabola2 = VerticalDataList[i+1]['station'] + VerticalDataList[i+1]['curveLength'] / 2;
      parabola_data.push([
        parabola1,
        parabola2,
        VerticalDataList[i]['elevation'] + tangent[i] * ( parabola1 - VerticalDataList[i]['station'] ),
        VerticalDataList[i+1]['elevation'] + tangent[i+1] * (parabola2 - VerticalDataList[i+1]['station']),
        VerticalDataList[i+1]['curveLength']
      ])

    }
  if (station <= VerticalDataList[0]['station']){
      result_elevation = VerticalDataList[0]["elevation"] + tangent[0] * (station - VerticalDataList[0]['station'] );
      gradX = tangent[0]
  } else if (station >= VerticalDataList[VerticalDataList.length -1]['station']){
      result_elevation = VerticalDataList[VerticalDataList.length-1]['elevation'] + tangent[tangent.length-1] * ( station - VerticalDataList[VerticalDataList.length-1]['station'] );
      gradX = tangent[tangent.length-1]
  }else{
      for (let i = 0; i<VerticalDataList.length-1;i++){
          if (station >= VerticalDataList[i]['station'] && station < VerticalDataList[i+1]['station']){
              result_elevation = VerticalDataList[i]['elevation'] + tangent[i] * (station - VerticalDataList[i]['station'] )
              gradX = tangent[i];
          }
      }
      for (let i = 0; i<VerticalDataList.length-2;i++){
          if (station >= parabola_data[i][0] && station <= parabola_data[i][1]){
              result_elevation = parabola_data[i][2] + 
              tangent[i] * (station - parabola_data[i][0]) + 
              (tangent[i+1] - tangent[i]) / 2 / parabola_data[i][4] * (station - parabola_data[i][0])**2
              gradX = tangent[i] + (tangent[i+1] - tangent[i])  / parabola_data[i][4] * (station - parabola_data[i][0])
          }
      }
  }
  let gradient = Gradient(SuperElevation, station, offset)
  superelevation = gradient * offset
//  if (station <= SuperElevation[0]['station']){
//      if (offset < 0){
//          superelevation = SuperElevation[0]['left'] / 100 * offset * (-1)
//      }else{
//          superelevation = SuperElevation[0]['right'] / 100 * offset
//      }
//  }else if (station >= SuperElevation[SuperElevation.length -1]['station']){
//      if (offset < 0){
//          superelevation = SuperElevation[SuperElevation.length-1]['left'] / 100 * offset * (-1)
//      }else{
//          superelevation = SuperElevation[SuperElevation.length-1]['right'] / 100 * offset
//      }
//  }else{
//      for (let i = 0;i< SuperElevation.length-1;i++){
//          if (station >= SuperElevation[i]['station'] && station < SuperElevation[i+1]['station']){
//              if (offset < 0){
//                  superelevation = ( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
//                  * (SuperElevation[i+1]['left'] - SuperElevation[i]['left']) + SuperElevation[i]['left'] ) / 100 * offset * (-1);
//              }else{
//                  superelevation = ( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
//                  * (SuperElevation[i+1]['right'] - SuperElevation[i]['right']) + SuperElevation[i]['right'] ) / 100 * offset;
//              }
//          }
//      }
//  }
 return {elevation:result_elevation + superelevation,gradientX:gradX, gradientY:gradient}

}

export function Gradient(SuperElevation,station, offset){
  // const station = Point.masterStationNumber;
  // const offset = Point.offset;
  let gradient = 0;

  if (station <= SuperElevation[0]['station']){
    if (offset < 0){
        gradient = -SuperElevation[0]['left'];
    }else{
        gradient = SuperElevation[0]['right'];
    }
  }else if (station >= SuperElevation[SuperElevation.length -1]['station']){
      if (offset < 0){
          gradient = -SuperElevation[SuperElevation.length-1]['left'] ;
      }else{
          gradient = SuperElevation[SuperElevation.length-1]['right'];
      }
  }else{
      for (let i = 0;i< SuperElevation.length-1;i++){
          if (station >= SuperElevation[i]['station'] && station < SuperElevation[i+1]['station']){
              if (offset < 0){
                  gradient = -( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
                  * (SuperElevation[i+1]['left'] - SuperElevation[i]['left']) + SuperElevation[i]['left'] );
              }else{
                  gradient = ( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
                  * (SuperElevation[i+1]['right'] - SuperElevation[i]['right']) + SuperElevation[i]['right'] );
              }
          }
      }
  }
  return gradient / 100
}

