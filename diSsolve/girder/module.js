import { MasterPointGenerator, OffsetLine, PointLineMatch2, PointGenerator } from "../line/module"

export function GirderLayoutGenerator2(masterLine, slaveLine, girderLayoutInput) {
  const angle = 0;
  const spanLength = 1;
  const baseLine = 0;
  const alignOffset = 1;
  const margin = 12000 // 해당변수로 충분한 거더 간격이 포함되어야 함.

  let result = {
    masterLine: masterLine,
    startPoint: {},
    endPoint: {},
    girderLine: [],
    gridKeyPoint: {}
  }
  let supportStation = girderLayoutInput.baseValue;
  let bridgeLength = 0;
  let i = 0
  girderLayoutInput.supportData.forEach(function (elem) {
    bridgeLength += elem[spanLength] ? elem[spanLength] : 0;
    let gridName = "CRS" + i
    result.gridKeyPoint[gridName] = MasterPointGenerator(supportStation + bridgeLength, masterLine, elem[angle])
    if (i === 0) {
      result.startPoint = result.gridKeyPoint[gridName];
    } else if (i === girderLayoutInput.supportData.length - 1) {
      result.endPoint = result.gridKeyPoint[gridName];
    }
    i++;
  })
  // 시종점 교대사각 자동계산 //
  result.gridKeyPoint["CRS" + 1].skew = OffsetSkewCalculator(result.startPoint, result.startPoint.skew, girderLayoutInput.supportData[1][1], masterLine)
  result.gridKeyPoint["CRS" + (girderLayoutInput.supportData.length - 2)].skew = OffsetSkewCalculator(result.endPoint, result.endPoint.skew, -1 * girderLayoutInput.supportData[girderLayoutInput.supportData.length - 1][1], masterLine)
  // 시종점 교대사각 자동계산 끝 //
  let stp = MasterPointGenerator(result.startPoint.masterStationNumber - margin, masterLine, result.startPoint.skew)
  let edp = MasterPointGenerator(result.endPoint.masterStationNumber + margin, masterLine, result.startPoint.skew)

  for (let j = 0; j < girderLayoutInput.getGirderList.length; j++) {
    let girderBaseLine = girderLayoutInput.getGirderList[j][baseLine] === "MasterLine" ? masterLine : slaveLine[girderLayoutInput.getGirderList[j][baseLine]];
    result.girderLine.push(OffsetLine(girderLayoutInput.getGirderList[j][alignOffset], girderBaseLine, stp, edp))
    // 추후에 거더라인이 포인트만 가져간다고 하면, 포인트에대한 내용만 보내줄것!
  }

  return result
}


export function GridPointGenerator3(girderLayout, SEShape, gridInput) {
  let masterLine = girderLayout.masterLine
  let nameToPointDict = {};
  const girderNumber = girderLayout.girderLine.length
  let pointName = "";
  let offset = 0;
  for (let k = 0; k < 8; k++) {
    switch (k) {
      case 0: offset = SEShape.start.A; break;
      case 1: offset = SEShape.start.A + SEShape.start.D; break;
      case 2: offset = SEShape.start.A + SEShape.start.D + SEShape.start.F; break;
      case 3: offset = SEShape.start.A + SEShape.start.D + SEShape.start.F + SEShape.start.G; break;
      case 4: offset = -(SEShape.end.A + SEShape.end.D + SEShape.end.F + SEShape.end.G); break;
      case 5: offset = -(SEShape.end.A + SEShape.end.D + SEShape.end.F); break;
      case 6: offset = -(SEShape.end.A + SEShape.end.D); break;
      case 7: offset = -(SEShape.end.A); break;
    }
    let masterPoint = k < 4 ? girderLayout.startPoint : girderLayout.endPoint;
    let skew = k < 4 ? OffsetSkewCalculator(masterPoint, girderLayout.startPoint.skew, offset, masterLine) : OffsetSkewCalculator(masterPoint, girderLayout.endPoint.skew, offset, masterLine);
    let centerPoint = MasterPointGenerator(masterPoint.masterStationNumber + offset, masterLine, skew);
    for (let i = 0; i < girderNumber; i++) {
      pointName = "G" + (i + 1) + "K" + k;
      nameToPointDict[pointName] = LineMatch2(centerPoint, masterLine, girderLayout.girderLine[i])
    }
    nameToPointDict["CRK" + k] = centerPoint;
  }
  for (let k in girderLayout.gridKeyPoint) {
    let centerPoint = girderLayout.gridKeyPoint[k];
    for (let i = 0; i < girderNumber; i++) {
      pointName = "G" + (i + 1) + k.substr(2);
      nameToPointDict[pointName] = LineMatch2(centerPoint, masterLine, girderLayout.girderLine[i])
    }
    nameToPointDict[k] = centerPoint;
  }
  // for (let i=0;i<girderNumber;i++){
  const name = 0;
  const BenchMark = 1;
  const off = 2;
  for (let gp in gridInput)
    gridInput[gp].forEach(function (elem) {
      pointName = elem[name]
      let i = pointName.substr(1, 1) * 1 - 1
      let masterstation = nameToPointDict[elem[BenchMark]].masterStationNumber + elem[off]

      let masterPoint = MasterPointGenerator(masterstation, masterLine)
      nameToPointDict[pointName] = LineMatch2(masterPoint, masterLine, girderLayout.girderLine[i])
      //SplinePointGenerator(masterPoint, girderLayout.girderLine[i].points, masterLine.VerticalDataList, masterLine.SuperElevation);
    })
  // }
  let i = 0;
  girderLayout.masterLine.points.forEach(function (point) {
    if (point.masterStationNumber > nameToPointDict["CRK0"].masterStationNumber
      && point.masterStationNumber < nameToPointDict["CRK7"].masterStationNumber) {
      nameToPointDict["CRN" + i] = point
      i++
    }
  })

  return nameToPointDict
}

export function OffsetSkewCalculator(masterPoint, masterSkew, offset, masterLine) {
  const startSkew = masterSkew
  let offsetStation = masterPoint.masterStationNumber + offset
  const offsetPoint = PointGenerator(offsetStation, masterLine)
  let sign = 1;
  if (masterPoint.normalCos * offsetPoint.normalSin - masterPoint.normalSin * offsetPoint.normalCos >= 0) {
    sign = 1;
  } else {
    sign = -1;
  }
  let deltaSkew = (Math.acos(masterPoint.normalCos * offsetPoint.normalCos + masterPoint.normalSin * offsetPoint.normalSin) * 180 / Math.PI).toFixed(4) * 1
  let offsetSkew = startSkew - sign * (deltaSkew)
  // if (offsetSkew > 90) { offsetSkew -= 180; }
  // else if (offsetSkew < -90) { offsetSkew += 180; }
  return offsetSkew
}

export const LineMatch2 = (masterPoint, masterLine, slavePoints) => {
  let resultPoint = {
    stationNumber: 0,
    x: 0,
    y: 0,
    z: 0,
    normalCos: 0,
    normalSin: 0,
    masterStationNumber: 0,
    offset: 0,
    virtual: false,
    skew: masterPoint.skew,
    gradientX: 0,
    gradientY: 0,
  };
  const unitVx = -1 * masterPoint.normalSin;
  const unitVy = masterPoint.normalCos;
  const skewRadian = resultPoint.skew * Math.PI / 180;
  let dX = unitVx * Math.cos(skewRadian) - unitVy * Math.sin(skewRadian);
  let dY = unitVx * Math.sin(skewRadian) + unitVy * Math.cos(skewRadian);
  let alpha = dY;
  let beta = -1 * dX;
  let gamma = - alpha * masterPoint.x - beta * masterPoint.y;
  let dummy1 = 0;
  let dummy2 = 0;
  let sign = 1;
  let check = {};
  for (let i = 0; i < slavePoints.length - 1; i++) {
    dummy1 = alpha * slavePoints[i].x + beta * slavePoints[i].y + gamma;
    dummy2 = alpha * slavePoints[i + 1].x + beta * slavePoints[i + 1].y + gamma;
    if (dummy1 === 0) {
      resultPoint = slavePoints[i]
      break;
    }
    else if (dummy2 === 0) {
      resultPoint = slavePoints[i + 1]
      break;
    }
    else if (dummy1 * dummy2 < 0) {
      let coe = splineCoefficient(slavePoints[i], slavePoints[i + 1]);
      let a = alpha * coe.a2 + beta * coe.a1;
      let b = alpha * coe.b2 + beta * coe.b1;
      let c = alpha * coe.c2 + beta * coe.c1 + gamma;
      let t = 0;
      let err = 0.001
      let tt = 0;
      if (a == 0) {
        t = -c / b;
      } else {
        t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
        tt = t
        if (t > 1 + err || t < -1 - err) {
          t = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
        };
      }

      let deltaX = 2 * coe.a2 * (t) + coe.b2;
      let deltaY = 2 * coe.a1 * (t) + coe.b1;
      let len = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      resultPoint.normalCos = deltaY / len;
      resultPoint.normalSin = -deltaX / len;
      resultPoint.x = coe.a2 * (t ** 2) + coe.b2 * t + coe.c2;
      resultPoint.y = coe.a1 * (t ** 2) + coe.b1 * t + coe.c1;
      //   let segLen = splineLength(slaveLine.points[i],slaveLine.points[i+1]);
      //   let resultLen = splineLength(slaveLine.points[i],resultPoint);
      //   resultPoint.stationNumber = slaveLine.points[i].stationNumber + (slaveLine.points[i+1].stationNumber - slaveLine.points[i].stationNumber) * resultLen/segLen;
      // check = {a:a,b:b,c:c,t:t,tt:tt,coe:coe} ;
      break;
    }
  }

  let newMasterPoint = masterPoint.skew === 90 ? masterPoint : PointLineMatch2(resultPoint, masterLine)

  resultPoint.masterStationNumber = newMasterPoint.masterStationNumber.toFixed(4) * 1
  resultPoint.stationNumber = resultPoint.masterStationNumber
  if (newMasterPoint.normalCos * (resultPoint.x - newMasterPoint.x) + newMasterPoint.normalSin * (resultPoint.y - newMasterPoint.y) >= 0) {
    sign = 1
  }
  else {
    sign = -1
  }
  resultPoint.offset = sign * Math.sqrt((resultPoint.x - newMasterPoint.x) ** 2 + (resultPoint.y - newMasterPoint.y) ** 2).toFixed(4) * 1;
  if (sign > 0) {
    resultPoint.z = newMasterPoint.z + newMasterPoint.rightGradient * resultPoint.offset
  } else {
    resultPoint.z = newMasterPoint.z + newMasterPoint.leftGradient * resultPoint.offset
  }
  resultPoint.gradientX = newMasterPoint.gradientX;
  resultPoint.gradientY = sign > 0 ? newMasterPoint.rightGradient : newMasterPoint.leftGradient;
  // resultPoint.check = check

  return resultPoint
}

export const splineCoefficient = (point1, point2) => {
  const x1 = point1.x;
  const y1 = point1.y;
  const x2 = point2.x;
  const y2 = point2.y;
  const err = 0.0001;

  let b1 = (y2 - y1) / 2;
  let b2 = (x2 - x1) / 2;
  let a1 = 0.0;
  let a2 = 0.0;
  let df1 = 0.0;
  let df2 = 0.0;


  if (point1.normalSin === 0 && point2.normalSin === 0) {
    a2 = 0;
    b2 = 0;
    a1 = 0;
  }
  if (point1.normalSin === 0 && point2.normalSin !== 0) {
    a2 = b2 / 2;
    df2 = -point2.normalCos / point2.normalSin;
    a1 = (-b1 + df2 * (2 * a2 + b2)) / 2
  }
  if (point1.normalSin !== 0 && point2.normalSin === 0) {
    a2 = - b2 / 2;
    df1 = -point1.normalCos / point1.normalSin;
    a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
  }
  if (point1.normalSin !== 0 && point2.normalSin !== 0) {
    df1 = -point1.normalCos / point1.normalSin
    df2 = -point2.normalCos / point2.normalSin
    if (Math.abs(df1 - df2) < err) {
      a1 = 0
      a2 = 0
    } else {
      a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1))
      a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
    }
  }



  // if (point1.normalSin === 0) {
  //   if (point2.normalSin === 0) {
  //     // return Math.abs(y2 - y1)
  //   }
  //   else {
  //     df2 = -point2.normalCos / point2.normalSin
  //     a2 = b2 / 2
  //     a1 = (-b1 + df2 * (2 * a2 + b2)) / 2
  //   }
  // } else if (point2.normalSin === 0) {
  //   if (point2.normalSin === 0) {
  //     // return Math.abs(y2 - y1)
  //   } else {
  //     df1 = -point1.normalCos / point1.normalSin
  //     a2 = b2 / -2
  //     a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
  //   }
  // } else {
  //   df1 = -point1.normalCos / point1.normalSin
  //   df2 = -point2.normalCos / point2.normalSin

  //   if (df1 === df2) {
  //     a1 = 0
  //     a2 = 0
  //   } else {
  //     a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1))
  //     a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2
  //   }
  // }
  const c1 = y2 - a1 - b1;
  const c2 = x2 - a2 - b2;
  return { a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2 }
}

export function splineProp(point1, point2) {
  const coe = splineCoefficient(point1, point2)
  const w1 = 5 / 9
  const w2 = 8 / 9
  const w3 = w1
  const t1 = -0.77459666924
  const t2 = 0
  const t3 = 0.77459666924
  let length = Math.sqrt(Math.pow((2 * coe.a1 * t1 + coe.b1), 2) + Math.pow((2 * coe.a2 * t1 + coe.b2), 2)) * w1
    + Math.sqrt(Math.pow((2 * coe.a1 * t2 + coe.b1), 2) + Math.pow((2 * coe.a2 * t2 + coe.b2), 2)) * w2
    + Math.sqrt(Math.pow((2 * coe.a1 * t3 + coe.b1), 2) + Math.pow((2 * coe.a2 * t3 + coe.b2), 2)) * w3;
  let l = Math.sqrt(coe.b2 ** 2 + coe.b1 ** 2)
  let midPoint = { x: coe.c2, y: coe.c1, cos: coe.b2 / l, sin: coe.b1 / l, normalCos: coe.b1 / l, normalSin: -coe.b2 / l, coe: coe }
  return { length: length.toFixed(4) * 1, midPoint }
}

export function GridStationList(pointDict) {
  let gs = [];
  let cs = [];
  for (let k in pointDict) {
    let girderIndex = k.substr(1, 1) - 1
    if (gs.length <= girderIndex) {
      for (let i = 0; i <= girderIndex - gs.length; i++) {
        gs.push([])
      }
    }

    if (k.substr(0, 1) === "G") {
      let s = pointDict[k].masterStationNumber
      if (s >= pointDict["G" + (girderIndex + 1) + "K1"].masterStationNumber &&
        s <= pointDict["G" + (girderIndex + 1) + "K6"].masterStationNumber) {
        gs[girderIndex].push({ station: pointDict[k].masterStationNumber, key: k, point: pointDict[k] })
      }
    } else {
      cs.push({ station: pointDict[k].masterStationNumber, key: k, point: pointDict[k] })
    }

  }
  gs.forEach(function (elem) { elem.sort(function (a, b) { return a.station < b.station ? -1 : 1; }) })
  cs.sort(function (a, b) { return a.station < b.station ? -1 : 1; })

  for (let i = 0; i < gs.length; i++) {
    let totalLength = 0;
    let segLength = 0;
    let dummy0 = {};
    for (let j = 0; j < gs[i].length; j++) {
      let gridObj = gs[i][j];
      if (j !== 0) { segLength = splineProp(dummy0, gridObj.point).length };
      totalLength += segLength;
      // console.log("totalLength", totalLength)
      dummy0 = gridObj.point;
      gs[i][j]["girderStation"] = totalLength
    }
  }


  return { girder: gs, centerLine: cs }
}