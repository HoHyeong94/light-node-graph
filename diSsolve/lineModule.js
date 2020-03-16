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
    tangent.push((VerticalDataList[i + 1]['elevation'] - VerticalDataList[i]['elevation']) /
      (VerticalDataList[i + 1]['station'] - VerticalDataList[i]['station']))
  }
  for (let i = 0; i < VerticalDataList.length - 2; i++) {
    let parabola1 = VerticalDataList[i + 1]['station'] - VerticalDataList[i + 1]['curveLength'] / 2;
    let parabola2 = VerticalDataList[i + 1]['station'] + VerticalDataList[i + 1]['curveLength'] / 2;
    parabolaData.push([
      parabola1,
      parabola2,
      VerticalDataList[i]['elevation'] + tangent[i] * (parabola1 - VerticalDataList[i]['station']),
      VerticalDataList[i + 1]['elevation'] + tangent[i + 1] * (parabola2 - VerticalDataList[i + 1]['station']),
      VerticalDataList[i + 1]['curveLength']
    ])
  }
  lineResult.tangent = tangent
  lineResult.parabolaData = parabolaData;
  lineResult.VerticalDataList = VerticalDataList;
  lineResult.SuperElevation = superElevation
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
  if (station <= Masterline.VerticalDataList[0]['station']) {
    resultPoint.z = Masterline.VerticalDataList[0]["elevation"] + Masterline.tangent[0] * (station - Masterline.VerticalDataList[0]['station']);
    gradX = Masterline.tangent[0]
  } else if (station >= Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1]['station']) {
    resultPoint.z = Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1]['elevation'] + Masterline.tangent[Masterline.tangent.length - 1] * (station - Masterline.VerticalDataList[Masterline.VerticalDataList.length - 1]['station']);
    gradX = Masterline.tangent[Masterline.tangent.length - 1]
  } else {
    for (let i = 0; i < Masterline.VerticalDataList.length - 1; i++) {
      if (station >= Masterline.VerticalDataList[i]['station'] && station < Masterline.VerticalDataList[i + 1]['station']) {
        resultPoint.z = Masterline.VerticalDataList[i]['elevation'] + Masterline.tangent[i] * (station - Masterline.VerticalDataList[i]['station'])
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
  if (station <= Masterline.SuperElevation[0]['station']) {
      leftG = -Masterline.SuperElevation[0]['left'];
      rightG = Masterline.SuperElevation[0]['right'];
  } else if (station >= Masterline.SuperElevation[Masterline.SuperElevation.length - 1]['station']) {
      leftG = -Masterline.SuperElevation[Masterline.SuperElevation.length - 1]['left'];
      rightG = Masterline.SuperElevation[Masterline.SuperElevation.length - 1]['right'];
  } else {
    for (let i = 0; i < Masterline.SuperElevation.length - 1; i++) {
      if (station >= Masterline.SuperElevation[i]['station'] && station < Masterline.SuperElevation[i + 1]['station']) {
          leftG = -((station - Masterline.SuperElevation[i]['station']) / (Masterline.SuperElevation[i + 1]['station'] - Masterline.SuperElevation[i]['station'])
            * (Masterline.SuperElevation[i + 1]['left'] - Masterline.SuperElevation[i]['left']) + Masterline.SuperElevation[i]['left']);
          rightG = ((station - Masterline.SuperElevation[i]['station']) / (Masterline.SuperElevation[i + 1]['station'] - Masterline.SuperElevation[i]['station'])
            * (Masterline.SuperElevation[i + 1]['right'] - Masterline.SuperElevation[i]['right']) + Masterline.SuperElevation[i]['right']);
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