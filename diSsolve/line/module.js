import { THREE } from "global";

export function LineToThree(linepoints, initPoint){
    var group = new THREE.Group();
    var geometry = new THREE.Geometry();
    const xInit = initPoint.x
    const yInit = initPoint.y
    const zInit = initPoint.z
    for (let i = 0; i<linepoints.length;i++){
        geometry.vertices.push( 
        new THREE.Vector3	(linepoints[i].x - xInit,linepoints[i].y - yInit,	linepoints[i].z - zInit));
    }
    var line = new THREE.Line(
        geometry, new THREE.LineBasicMaterial( {color: 0xffff00} )
    );
    group.add(line);
    return group
}


export const MasterLineData = (horizon, VerticalDataList, superElevation, beginStation) => {
  let lineResult = LineGenerator2(horizon, beginStation)
  let parabolaData = [];
  let tangent = [];
  for (let i = 0; i < VerticalDataList.length - 1; i++) {
    tangent.push((VerticalDataList[i + 1][1] - VerticalDataList[i][1]) /
      (VerticalDataList[i + 1][0] - VerticalDataList[i][0]))
  }
  for (let i = 0; i < VerticalDataList.length - 2; i++) {
    let parabola1 = VerticalDataList[i + 1][0] - VerticalDataList[i + 1][2] / 2;
    let parabola2 = VerticalDataList[i + 1][0] + VerticalDataList[i + 1][2] / 2;
    parabolaData.push([
      parabola1,
      parabola2,
      VerticalDataList[i][1] + tangent[i] * (parabola1 - VerticalDataList[i][0]),
      VerticalDataList[i + 1][1] + tangent[i + 1] * (parabola2 - VerticalDataList[i + 1][0]),
      VerticalDataList[i + 1][2]
    ])
  }
  lineResult.tangent = tangent
  lineResult.parabolaData = parabolaData;
  lineResult.VerticalDataList = VerticalDataList;
  lineResult.SuperElevation = superElevation
  lineResult.HorizonDataList = horizon
  lineResult.points = [];
  const spacing = 10000
  for (let i = Math.ceil(lineResult.beginStationNumber / spacing) * spacing; i < lineResult.endStationNumber; i += spacing) {
    lineResult.points.push(MasterPointGenerator(i, lineResult));
  }
  
  return lineResult
}

const LineGenerator2 = (horizonDataList,beginStation) => {
  // console.time("for loop");
  let lineResult = {
    vectors: [],
    curves: [],
    segments: { start: [], end: [] },
    beginStationNumber: 0,
    endStationNumber: 0,
    startPoint: [],
  };
  for (let i = 0; i < horizonDataList.length - 1; i++) {
    lineResult.startPoint.push(_.take(horizonDataList[i], 2));
    lineResult.vectors.push(
      Vector2d([
        _.take(horizonDataList[i], 2),
        _.take(horizonDataList[i + 1], 2)
      ])
    );
  }

  for (let i = 0; i < horizonDataList.length - 2; i++) {
    lineResult.curves.push(
      Curve(
        _.take(horizonDataList[i], 2),
        lineResult.vectors[i],
        lineResult.vectors[i + 1],
        horizonDataList[i + 1][2],
        horizonDataList[i + 1][3],
        horizonDataList[i + 1][4],
      )
    );
  }
  let segmentsStation = beginStation
  lineResult.segments.start.push(segmentsStation);
  for (let j = 0; j < (horizonDataList.length - 2); j++) {
    if (j === 0) {
      segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset; //초기값은 항상 직선으로 시작
      lineResult.segments.start.push(segmentsStation);
    } else {
      segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset - lineResult.curves[j - 1].endOffset
      lineResult.segments.start.push(segmentsStation);
    }
    segmentsStation += lineResult.curves[j].beginClothoid.length
    lineResult.segments.start.push(segmentsStation);
    segmentsStation += lineResult.curves[j].arcAngle * lineResult.curves[j].arcRadius
    lineResult.segments.start.push(segmentsStation);
    segmentsStation += lineResult.curves[j].endClothoid.length
    lineResult.segments.start.push(segmentsStation);
  }
  lineResult.segments.end.push(..._.drop(lineResult.segments.start));
  if (lineResult.curves.length === 0) {
    segmentsStation += lineResult.vectors[lineResult.vectors.length - 1].length
  } else {
    segmentsStation += lineResult.vectors[lineResult.vectors.length - 1].length - lineResult.curves[lineResult.curves.length - 1].endOffset
  }
  lineResult.segments.end.push(segmentsStation);
  lineResult.beginStationNumber = lineResult.segments.start[0];
  lineResult.endStationNumber = lineResult.segments.end[lineResult.segments.end.length - 1];
  return lineResult;
};

export const MasterPointGenerator = (station, Masterline,skew) => {
  let resultPoint = {
    x: 0,
    y: 0,
    z: 0,
    normalCos: 0,
    normalSin: 0,
    masterStationNumber: station.toFixed(4) * 1,
    virtual: false,
    gradientX:0,
    leftGradient:0,
    rightGradient:0,
    skew: skew? skew: 90,
  };
  // const dataList = Masterline.input.horizonDataList;
  const startStationNumList = Masterline.segments.start;
  const endStationNumList = Masterline.segments.end;
  
  let gradX =0;
  let leftG =0;
  let rightG = 0;

  let l = 0;
  let lineNum = 0;
  let varCase = 0;
  const startPoint = Masterline.startPoint;
  let tempRes = [0, 0, 0, 0];

  for (let i = 0; i < startStationNumList.length;i++) { //= 4 * (dataList.length - 2); i++) {
    l = station - startStationNumList[i];

    lineNum = Math.floor(i / 4);
    varCase = i % 4;
    if (
      station >= startStationNumList[i] &&
      station <= endStationNumList[i]
    ) {
      switch (varCase) {
        case 0:
          if (i === 0) { // if datalist.length === 2point, this is not available, || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
            tempRes[0] = startPoint[lineNum][0] + l * Masterline.vectors[lineNum].cos;
            tempRes[1] = startPoint[lineNum][1] + l * Masterline.vectors[lineNum].sin;
          } else {
            tempRes[0] = Masterline.curves[lineNum - 1].endClothoidCoord[0] + l * Masterline.vectors[lineNum].cos;
            tempRes[1] = Masterline.curves[lineNum - 1].endClothoidCoord[1] + l * Masterline.vectors[lineNum].sin;
          }
          tempRes[2] = Masterline.vectors[lineNum].sin;
          tempRes[3] = -1 * Masterline.vectors[lineNum].cos;
          break;
        case 1:
          tempRes = Masterline.curves[lineNum].beginClothoidStation(l);
          break;
        case 2:
          tempRes = Masterline.curves[lineNum].arcStation(l);
          break;
        case 3:
          tempRes = Masterline.curves[lineNum].endClothoidStation(l);
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
  if (station <= Masterline.VerticalDataList[0][0]) {
    resultPoint.z = Masterline.VerticalDataList[0][1] + Masterline.tangent[0] * (station - Masterline.VerticalDataList[0][0]);
    gradX = Masterline.tangent[0]
  } else if (station >= Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][0]) {
    resultPoint.z = Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][1] + Masterline.tangent[Masterline.tangent.length - 1] * (station - Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1][0]);
    gradX = Masterline.tangent[Masterline.tangent.length - 1]
  } else {
    for (let i = 0; i < Masterline.VerticalDataList.length - 1; i++) {
      if (station >= Masterline.VerticalDataList[i][0] && station < Masterline.VerticalDataList[i + 1][0]) {
        resultPoint.z = Masterline.VerticalDataList[i][1] + Masterline.tangent[i] * (station - Masterline.VerticalDataList[i][0])
        gradX = Masterline.tangent[i];
      }
    }
    for (let i = 0; i < Masterline.VerticalDataList.length - 2; i++) {
      if (station >= Masterline.parabolaData[i][0] && station <= Masterline.parabolaData[i][1]) {
        resultPoint.z = Masterline.parabolaData[i][2] +
        Masterline.tangent[i] * (station - Masterline.parabolaData[i][0]) +
          (Masterline.tangent[i + 1] - Masterline.tangent[i]) / 2 / Masterline.parabolaData[i][4] * (station - Masterline.parabolaData[i][0]) ** 2
        gradX = Masterline.tangent[i] + (Masterline.tangent[i + 1] - Masterline.tangent[i]) / Masterline.parabolaData[i][4] * (station - Masterline.parabolaData[i][0])
      }
    }
  }
  if (station <= Masterline.SuperElevation[0][0]) {
      leftG = -Masterline.SuperElevation[0][1];
      rightG = Masterline.SuperElevation[0][2];
  } else if (station >= Masterline.SuperElevation[Masterline.SuperElevation.length - 1][0]) {
      leftG = -Masterline.SuperElevation[Masterline.SuperElevation.length - 1][1];
      rightG = Masterline.SuperElevation[Masterline.SuperElevation.length - 1][2];
  } else {
    for (let i = 0; i < Masterline.SuperElevation.length - 1; i++) {
      if (station >= Masterline.SuperElevation[i][0] && station < Masterline.SuperElevation[i + 1][0]) {
          leftG = -((station - Masterline.SuperElevation[i][0]) / (Masterline.SuperElevation[i + 1][0] - Masterline.SuperElevation[i][0])
            * (Masterline.SuperElevation[i + 1][1] - Masterline.SuperElevation[i][1]) + Masterline.SuperElevation[i][1]);
          rightG = ((station - Masterline.SuperElevation[i][0]) / (Masterline.SuperElevation[i + 1][0] - Masterline.SuperElevation[i][0])
            * (Masterline.SuperElevation[i + 1][2] - Masterline.SuperElevation[i][2]) + Masterline.SuperElevation[i][2]);
      }
    }
  }

  resultPoint.gradientX = gradX;
  resultPoint.leftGradient = leftG/100;
  resultPoint.rightGradient = rightG/100;
  return resultPoint;
};

export function Vector2d(xydata) {
  let vectorX = xydata[1][0] - xydata[0][0]
  let vectorY = xydata[1][1] - xydata[0][1]
  let vector = [vectorX, vectorY]
  let length = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2))
  let cos = vectorX / length
  let sin = vectorY / length
  return { vector, length, cos, sin }
}


export function Curve(startPoint, vector1, vector2, radius, a1, a2) {
  if (radius !== 0) {
      // let vector1 = Vector2d(xydata1);
      // let vector2 = Vector2d(xydata2);
      let angle = Math.acos((vector1.vector[0] * vector2.vector[0] + vector1.vector[1] * vector2.vector[1]) / (vector1.length * vector2.length))
      let arcRadius = radius
      let aBegin = a1
      let aEnd = a2

      let sign = 0

      if ((-1 * vector2.cos * vector1.sin + vector2.sin * vector1.cos) > 0) {
          sign = 1    // Counter clockwise
      }
      else {
          sign = -1   // Clockwise
      }

      let beginClothoid = Clothoid(radius, a1)
      let endClothoid = Clothoid(radius, a2)
      let arcAngle = angle - beginClothoid.angle - endClothoid.angle

      let beginOffset = beginClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
          endClothoid.offset / Math.sin(angle) - beginClothoid.offset / Math.tan(angle)

      let endOffset = endClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
          beginClothoid.offset / Math.sin(angle) - endClothoid.offset / Math.tan(angle)

      let beginClothoidCoord = [startPoint[0] + (vector1.length - beginOffset) * vector1.cos,
      startPoint[1] + (vector1.length - beginOffset) * vector1.sin]

      let beginArcCoord = [beginClothoidCoord[0] + beginClothoid.totalX * vector1.cos - sign * beginClothoid.totalY * vector1.sin,
      beginClothoidCoord[1] + beginClothoid.totalX * vector1.sin + sign * beginClothoid.totalY * vector1.cos]

      let arcCenter = [beginClothoidCoord[0] + beginClothoid.radiusCenterOffset * vector1.cos - sign * (radius + beginClothoid.offset) * vector1.sin,
      beginClothoidCoord[1] + beginClothoid.radiusCenterOffset * vector1.sin + sign * (radius + beginClothoid.offset) * vector1.cos]

      let endArcCoord = [arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(arcAngle) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(arcAngle),
      arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(arcAngle) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(arcAngle)]

      let endClothoidCoord = [endArcCoord[0] + endClothoid.totalX * vector2.cos + sign * endClothoid.totalY * vector2.sin,
      endArcCoord[1] + endClothoid.totalX * vector2.sin - sign * endClothoid.totalY * vector2.cos]

      function beginClothoidStation(l) {
          let clothoidX = l * (1 - l ** 4 / 40 / aBegin ** 4 + l ** 8 / 3456 / aBegin ** 8)
          let clothoidY = l ** 3 / 6 / aBegin ** 2 * (1 - l ** 4 / 56 / aBegin ** 4 + l ** 8 / 7040 / aBegin ** 8)
          let resultX = beginClothoidCoord[0] + vector1.cos * clothoidX - sign * vector1.sin * clothoidY
          let resultY = beginClothoidCoord[1] + vector1.sin * clothoidX + sign * vector1.cos * clothoidY
          let slopeDeltaX = (1 - l ** 4 * 5 / 40 / aBegin ** 4 + l ** 8 * 9 / 3456 / aBegin ** 8)
          let slopeDeltaY = l ** 2 / 6 / aBegin ** 2 * (3 - l ** 4 * 7 / 56 / aBegin ** 4 + l ** 8 * 11 / 7040 / aBegin ** 8)
          let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2)
          let normalCos = sign * slopeDeltaY / slopeLength
          let normalSin = -1 * slopeDeltaX / slopeLength
          let globalNormalCos = vector1.cos * normalCos - vector1.sin * normalSin
          let globalNormalSin = vector1.sin * normalCos + vector1.cos * normalSin
          return [resultX, resultY, globalNormalCos, globalNormalSin]
      }

      function endClothoidStation(l) {
          l = endClothoid.length - l
          let clothoidX = endClothoid.totalX - (l * (1 - l ** 4 / 40 / aEnd ** 4 + l ** 8 / 3456 / aEnd ** 8))
          let clothoidY = -1 * endClothoid.totalY + (l ** 3 / 6 / aEnd ** 2 * (1 - l ** 4 / 56 / aEnd ** 4 + l ** 8 / 7040 / aEnd ** 8))
          let resultX = endArcCoord[0] + vector2.cos * clothoidX - sign * vector2.sin * clothoidY
          let resultY = endArcCoord[1] + vector2.sin * clothoidX + sign * vector2.cos * clothoidY
          let slopeDeltaX = -1 * (1 - l ** 4 * 5 / 40 / aEnd ** 4 + l ** 8 * 9 / 3456 / aEnd ** 8)
          let slopeDeltaY = l ** 2 / 6 / aEnd ** 2 * (3 - l ** 4 * 7 / 56 / aEnd ** 4 + l ** 8 * 11 / 7040 / aEnd ** 8)
          let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2)
          let normalCos = -sign * slopeDeltaY / slopeLength
          let normalSin = slopeDeltaX / slopeLength
          let globalNormalCos = vector2.cos * normalCos - vector2.sin * normalSin
          let globalNormalSin = vector2.sin * normalCos + vector2.cos * normalSin
          return [resultX, resultY, globalNormalCos, globalNormalSin]
      }

      function arcStation(l) {
          let resultX = arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(l / arcRadius) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(l / arcRadius)
          let resultY = arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(l / arcRadius) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(l / arcRadius)
          let globalNormalCos = sign * (resultX - arcCenter[0]) / arcRadius
          let globalNormalSin = sign * (resultY - arcCenter[1]) / arcRadius
          return [resultX, resultY, globalNormalCos, globalNormalSin]
      }

      let result = {
          angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
          arcCenter, endArcCoord, endClothoidCoord, beginClothoidStation, endClothoidStation, arcStation, sign
      }
      return result
  }
  else {
      let angle = 0
      let beginClothoid = Clothoid(radius, a1)
      let endClothoid = Clothoid(radius, a2)
      let arcRadius = 0
      let arcAngle = 0
      let beginOffset = 0
      let endOffset = 0
      let beginClothoidCoord = 0
      let beginArcCoord = 0
      let arcCenter = 0
      let endArcCoord = 0
      let endClothoidCoord = 0

      let result = {
          angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
          arcCenter, endArcCoord, endClothoidCoord
      }
      return result
  }

}


function Clothoid(radius, a) {
  if (radius !== 0) {
      let length = Math.pow(a, 2) / radius
      let angle = Math.pow(a, 2) / Math.pow(radius, 2) / 2
      let totalX = length * (1 - Math.pow(length, 2) / 40 / Math.pow(radius, 2) + Math.pow(length, 4) / 3456 / Math.pow(radius, 4))
      let totalY = Math.pow(length, 2) / 6 / radius * (1 - Math.pow(length, 2) / 56 / Math.pow(radius, 2) + Math.pow(length, 4) / 7040 / Math.pow(radius, 4))
      let offset = totalY - radius * (1 - Math.cos(angle))
      let radiusCenterOffset = totalX - radius * Math.sin(angle)

      let result = { length, angle, totalX, totalY, offset, radiusCenterOffset }
      return result
  }
  else {
      let length = 0
      let angle = 0
      let totalX = 0
      let totalY = 0
      let offset = 0
      let radiusCenterOffset = 0
      let result = { length, angle, totalX, totalY, offset, radiusCenterOffset }
      return result
  }
}

export const OffsetLine = (offset, line, startPoint, endPoint) => {
 
  let points = [];
  let st = 0;
  let ed = 0;
  let resultPoint = {};
   for (let i = 0; i < line.points.length; i++) {
    //  let zOffset = offset > 0? line.points[i].rightGradient * offset : line.points[i].leftGradient * offset
    resultPoint = {
      // stationNumber: line.points[i].masterStationNumber,
      x: line.points[i].x + line.points[i].normalCos * offset,
      y: line.points[i].y + line.points[i].normalSin * offset,
      // z: 0, //line.points[i].z +  zOffset,
      normalCos: line.points[i].normalCos,
      normalSin: line.points[i].normalSin,
      // masterStationNumber: line.points[i].masterStationNumber,
      // skew: line.points[i].skew,
      // offset: offset,
      // virtual: false
    };
    st = startPoint.normalSin * (resultPoint.x - startPoint.x) - startPoint.normalCos * (resultPoint.y - startPoint.y);
    ed = endPoint.normalSin * (resultPoint.x - endPoint.x) - endPoint.normalCos * (resultPoint.y - endPoint.y);
    
    if (st*ed <=0){
     points.push(resultPoint)
    }
  }
  return points
}

export const PointLineMatch2 = (targetPoint, masterLine) => {
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

  for (let i = 0; i < masterLine.segments.start.length; i++) {
    station1 = masterLine.segments.start[i];
    station2 = masterLine.segments.end[i];
    point1 = PointGenerator(station1, masterLine, 90)
    point2 = PointGenerator(station2, masterLine, 90)
    crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos
    crossproduct2 = (targetPoint.x - point2.x) * point2.normalSin - (targetPoint.y - point2.y) * point2.normalCos

    if (crossproduct1 * crossproduct2 < 0) {
      a = false;
      break;
    } else if (Math.abs(crossproduct1) < err) {
      resultPoint = { ...point1 };
      break;
    } else if (Math.abs(crossproduct2) < err) {
      resultPoint = { ...point2 };
      break;
    }
  }
  if (a == false) {
    while (Math.abs(innerproduct) > err) {
      innerproduct = (targetPoint.x - point1.x) * (-point1.normalSin) + (targetPoint.y - point1.y) * (point1.normalCos)
      station3 = station1 + innerproduct
      point1 = PointGenerator(station3, masterLine, 90)
      station1 = point1.stationNumber
      crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos
      resultPoint = { ...point1 }
      num_iter += 1
      if (num_iter == 200) {
        break;
      }
    }
  };
  const MasterPoint = MasterPointGenerator(resultPoint.stationNumber,masterLine)
  //targetPoint.master_station_number = result.station_number
  return MasterPoint
};

export const PointGenerator = (stationNumber, line, skew) => {
  let resultPoint = {
    stationNumber: stationNumber.toFixed(4) * 1,
    x: 0,
    y: 0,
    z: 0,
    normalCos: 0,
    normalSin: 0,
    masterStationNumber: stationNumber,
    offset: 0,
    virtual: false,
    skew: skew,
  };
  // const dataList = line.input.horizonDataList;
  const startStationNumList = line.segments.start;
  const endStationNumList = line.segments.end;

  let l = 0;
  let lineNum = 0;
  let varCase = 0;
  const startPoint = line.startPoint;
  let tempRes = [0, 0, 0, 0];

  for (let i = 0; i < startStationNumList.length;i++){  // }= 4 * (dataList.length - 2); i++) {
    l = stationNumber - startStationNumList[i];

    lineNum = Math.floor(i / 4);
    varCase = i % 4;
    if (
      stationNumber >= startStationNumList[i] &&
      stationNumber <= endStationNumList[i]
    ) {
      switch (varCase) {
        case 0:
          if (i === 0) { // if datalist.length === 2point, this is not available, || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
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

export const OffsetPoint = (masterPoint,masterLine,offset) => {
    let resultPoint = {
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: 0,
      gradientX:masterPoint.gradientX,
      gradientY: 0,
      skew:masterPoint.skew,
      offset:offset
    };
    if (masterPoint.skew === 90){
      resultPoint.x =  masterPoint.x + masterPoint.normalCos * offset;
      resultPoint.y = masterPoint.y + masterPoint.normalSin * offset;
      resultPoint.normalCos =  masterPoint.normalCos;
      resultPoint.normalSin = masterPoint.normalSin;
      resultPoint.masterStationNumber = masterPoint.masterStationNumber;
      resultPoint.gradientY = offset>0? masterPoint.rightGradient:masterPoint.leftGradient;
      resultPoint.z = masterPoint.z + resultPoint.gradientY * offset;
    } else {
      let skewRad = (masterPoint.skew-90)*Math.PI/180;
      let cos = Math.cos(skewRad);
      let sin = Math.sin(skewRad);
      let skewCos = masterPoint.normalCos*cos - masterPoint.normalSin*sin
      let skewSin = masterPoint.normalCos*sin + masterPoint.normalSin*cos
      let skewC = masterPoint.x * skewSin - masterPoint.y * skewCos
      let newP = {}
      let x = 0;
      let y=0;
      let delta = 0;
      let iter = 0
      let dist = 0
      let ms = masterPoint.masterStationNumber+Math.tan(skewRad)*offset
      for (let i=0;i<30;i++){
        newP = MasterPointGenerator(ms,masterLine)
        let newCos = newP.normalCos
        let newSin = newP.normalSin
        let newC = newP.x * newSin - newP.y * newCos
        let sign = offset>0?1:-1;
        x = (skewCos*newC - newCos * skewC)/(skewCos *newSin - skewSin * newCos)
        y = (skewSin*newC - newSin * skewC)/(skewCos *newSin - skewSin * newCos)
        dist = Math.sqrt((newP.x - x)**2 + (newP.y - y)**2)
        iter = i;
        if (Math.abs(Math.abs(offset) - dist) < 0.1){
          break;
        }else{
          let icos = newCos*skewCos + newSin*skewSin
          let isin = Math.sqrt(1-icos**2)
          delta = sign*(dist - Math.abs(offset))*isin/icos //추후 검토가 필요함
          ms += delta
        }
        
      }
      resultPoint.x =  x;
      resultPoint.y = y;
      resultPoint.normalCos =  newP.normalCos;
      resultPoint.normalSin = newP.normalSin;
      resultPoint.masterStationNumber = newP.masterStationNumber;
      resultPoint.gradientY = offset>0? newP.rightGradient:newP.leftGradient;
      resultPoint.z = newP.z + resultPoint.gradientY * offset;
    }
    return resultPoint
  }