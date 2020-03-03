import { PointGenerator, VerticalPositionGenerator } from "../line/module";

export function GirderLayoutGenerator(girderLayoutInput, mLine, hLine) {
  const {
    verticalDataList: VerticalDataList,
    superElevation: SuperElevation
  } = mLine.input;
  let result = {
    masterLine: {},
    girderLine: [],
    centralSupportPoint: [],
    girderSupportPoint: [],
    // girderInfoList :[],
    // girderLengthList :[],
    girderSpanPoint: []
  };
  //   let girderInfoObj = {
  //     number: 0,
  //     baseLine: {},
  //     alignOffset: 0,
  //     girderLine: {},
  //     outerBeam: false
  //   };
  // let GirderLengthObj = {
  //     crTotalLength: 0,
  //     girderTotalLength: 0,
  //     crSpanLength: [],
  //     griderSpanLength: []
  // }
  let supportDataList = girderLayoutInput.supportData;
  // let beginShapeDataList = girderLayoutInput.SEShape.start   // 시점부
  // let endShapeDataList = girderLayoutInput.SEShape.end       // 종점부
  let girderDataList = girderLayoutInput.getGirderList;
  let supportStation = girderLayoutInput.baseValue;

  result.masterLine = mLine;

  let i = 0;
  let girderInfoList = [];
  for (let j = 0; j < girderDataList.length; j++) {
    const girderInfo = {
      number: 0,
      baseLine: {},
      alignOffset: 0,
      girderLine: {},
      outerBeam: false
    };

    girderInfo.number = i;
    girderInfo.baseLine = mLine;
    girderInfo.girderLine = {
      vectors: mLine.vectors,
      curves: mLine.curves,
      segments: mLine.segments,
      beginStationNumber: mLine.beginStationNumber,
      endStationNumber: mLine.endStationNumber,
      startPoint: [],
      slaveOrMaster: false,
      input: mLine.inputs,
      points: hLine[girderDataList[j]]
    };
    // console.log("GirderInfo")
    // console.log(girderInfo)

    // girderInfo.girderLine = OffsetLine(
    //   girderDataList[j].alignOffset,
    //   girderInfoObj.baseLine
    // );
    girderInfo.alignOffset = girderInfo.girderLine.points[0].offset; //girderDataList[j].alignOffset;
    girderInfo.outerBeam = false; // girderDataList[j].isBeam ? true : false;
    girderInfoList.push(girderInfo);
    i += 1;
  }
  //console.log(supportDataList)
  result.centralSupportPoint.push(
    PointGenerator(supportStation, result.masterLine, supportDataList[0][0])
  );
  for (i = 1; i < supportDataList.length; i++) {
    supportStation = supportStation + supportDataList[i][1];
    result.centralSupportPoint.push(
      PointGenerator(supportStation, result.masterLine, supportDataList[i][0])
    );
  }
  for (let i = 0; i < girderInfoList.length; i++) {
    result.girderSupportPoint.push(
      SupportSkewPointGenerator(
        result.centralSupportPoint,
        result.masterLine,
        girderInfoList[i].girderLine,
        supportDataList,
        VerticalDataList,
        SuperElevation
      )
    );
    result.girderLine.push(girderInfoList[i].girderLine);
  }
  for (let i = 0; i < result.girderSupportPoint.length; i++) {
    // i:girderIndex
    let PointsList = [];
    for (let j = 1; j < result.girderSupportPoint[i].length - 2; j++) {
      // j:supportIndex
      let Points = [];
      Points.push(result.girderSupportPoint[i][j]);
      for (let k = 0; k < girderInfoList[i].girderLine.points.length; k++) {
        if (
          girderInfoList[i].girderLine.points[k].masterStationNumber >
            result.girderSupportPoint[i][j].masterStationNumber &&
          girderInfoList[i].girderLine.points[k].masterStationNumber <
            result.girderSupportPoint[i][j + 1].masterStationNumber
        ) {
          Points.push(girderInfoList[i].girderLine.points[k]);
        }
      }
      Points.push(result.girderSupportPoint[i][j + 1]);
      PointsList.push(Points);
    }
    result.girderSpanPoint.push(PointsList);
  }
  return result;
}

function SupportSkewPointGenerator(
  centralSupportPoint,
  masterLine,
  girderLine,
  supportDatalist,
  VerticalDataList,
  SuperElevation
) {
  let resultPoint = [];
  for (let i = 0; i < centralSupportPoint.length; i++) {
    let skew = supportDatalist[i][0];
    if (skew !== 0) {
      let dummyPoint = LineMatch(
        centralSupportPoint[i],
        masterLine,
        girderLine,
        skew,
        VerticalDataList,
        SuperElevation
      );
      resultPoint.push(dummyPoint);
    } else {
      console.log("Skew value is not available");
      resultPoint = null;
    }
  }
  return resultPoint;
}

function LineMatch(
  masterPoint,
  masterLine,
  slaveLine,
  skew,
  VerticalDataList,
  SuperElevation
) {
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
    skew: skew,
    gradientX: 0,
    gradientY: 0
  };
  const unitVx = -1 * masterPoint.normalSin;
  const unitVy = masterPoint.normalCos;
  const skewRadian = (skew * Math.PI) / 180;
  let dX = unitVx * Math.cos(skewRadian) - unitVy * Math.sin(skewRadian);
  let dY = unitVx * Math.sin(skewRadian) + unitVy * Math.cos(skewRadian);
  let alpha = dY;
  let beta = -1 * dX;
  let gamma = -alpha * masterPoint.x - beta * masterPoint.y;
  let dummy1 = 0;
  let dummy2 = 0;
  let sign = 1;
  for (let i = 0; i < slaveLine.points.length - 1; i++) {
    dummy1 =
      alpha * slaveLine.points[i].x + beta * slaveLine.points[i].y + gamma;
    dummy2 =
      alpha * slaveLine.points[i + 1].x +
      beta * slaveLine.points[i + 1].y +
      gamma;
    if (dummy1 === 0) {
      resultPoint = slaveLine.points[i];
      break;
    } else if (dummy2 === 0) {
      resultPoint = slaveLine.points[i + 1];
      break;
    } else if (dummy1 * dummy2 < 0) {
      let coe = splineCoefficient(slaveLine.points[i], slaveLine.points[i + 1]);
      let a = alpha * coe.a2 + beta * coe.a1;
      let b = alpha * coe.b2 + beta * coe.b1;
      let c = alpha * coe.c2 + beta * coe.c1 + gamma;
      let t = 0;
      if (a == 0) {
        t = -c / b;
      } else {
        t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
        if (t > 1 || t < -1) {
          t = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
        }
      }

      let deltaX = 2 * coe.a2 * t + coe.b2;
      let deltaY = 2 * coe.a1 * t + coe.b1;
      let len = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      resultPoint.normalCos = -deltaY / len;
      resultPoint.normalSin = deltaX / len;
      resultPoint.x = coe.a2 * t ** 2 + coe.b2 * t + coe.c2;
      resultPoint.y = coe.a1 * t ** 2 + coe.b1 * t + coe.c1;
      //   let segLen = splineLength(slaveLine.points[i],slaveLine.points[i+1]);
      //   let resultLen = splineLength(slaveLine.points[i],resultPoint);
      //   resultPoint.stationNumber = slaveLine.points[i].stationNumber + (slaveLine.points[i+1].stationNumber - slaveLine.points[i].stationNumber) * resultLen/segLen;
      let MasterPoint = PointLineMatch(resultPoint, masterLine);
      resultPoint.masterStationNumber =
        MasterPoint.masterStationNumber.toFixed(4) * 1;
      resultPoint.stationNumber = resultPoint.masterStationNumber;
      if (
        MasterPoint.normalCos * (resultPoint.x - MasterPoint.x) +
          MasterPoint.normalSin * (resultPoint.y - MasterPoint.y) >=
        0
      ) {
        sign = 1;
      } else {
        sign = -1;
      }
      resultPoint.offset =
        sign *
        Math.sqrt(
          (resultPoint.x - MasterPoint.x) ** 2 +
            (resultPoint.y - MasterPoint.y) ** 2
        ).toFixed(4) *
        1;
      let verticalInfo = VerticalPositionGenerator(
        VerticalDataList,
        SuperElevation,
        resultPoint
      );
      resultPoint.z = verticalInfo.elevation;
      resultPoint.gradientX = verticalInfo.gradientX;
      resultPoint.gradientY = verticalInfo.gradientY;
      break;
    }
  }
  return resultPoint;
}

function PointLineMatch(targetPoint, masterLine) {
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
    point1 = PointGenerator(station1, masterLine, 90);
    point2 = PointGenerator(station2, masterLine, 90);
    crossproduct1 =
      (targetPoint.x - point1.x) * point1.normalSin -
      (targetPoint.y - point1.y) * point1.normalCos;
    crossproduct2 =
      (targetPoint.x - point2.x) * point2.normalSin -
      (targetPoint.y - point2.y) * point2.normalCos;

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
      innerproduct =
        (targetPoint.x - point1.x) * -point1.normalSin +
        (targetPoint.y - point1.y) * point1.normalCos;
      station3 = station1 + innerproduct;
      point1 = PointGenerator(station3, masterLine, 90);
      station1 = point1.stationNumber;
      crossproduct1 =
        (targetPoint.x - point1.x) * point1.normalSin -
        (targetPoint.y - point1.y) * point1.normalCos;
      resultPoint = { ...point1 };
      num_iter += 1;
      if (num_iter == 200) {
        break;
      }
    }
  }
  //targetPoint.master_station_number = result.station_number
  return resultPoint;
}

function splineCoefficient(point1, point2) {
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
  if (point1.normalSin === 0) {
    if (point2.normalSin === 0) {
      // return Math.abs(y2 - y1)
    } else {
      df2 = -point2.normalCos / point2.normalSin;
      a2 = b2 / 2;
      a1 = (-b1 + df2 * (2 * a2 + b2)) / 2;
    }
  } else if (point2.normalSin === 0) {
    if (point2.normalSin === 0) {
      // return Math.abs(y2 - y1)
    } else {
      df1 = -point1.normalCos / point1.normalSin;
      a2 = b2 / -2;
      a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
    }
  } else {
    df1 = -point1.normalCos / point1.normalSin;
    df2 = -point2.normalCos / point2.normalSin;

    if (df1 === df2) {
      a1 = 0;
      a2 = 0;
    } else {
      a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1));
      a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
    }
  }
  const c1 = y2 - a1 - b1;
  const c2 = x2 - a2 - b2;
  return { a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2 };
}

// export const splineLength =(point1, point2) =>{
//     const coe = splineCoefficient(point1,point2)
//     const w1 = 5/9
//     const w2 = 8/9
//     const w3 = w1
//     const t1 = -0.77459666924
//     const t2 = 0
//     const t3 = 0.77459666924

//     let length = Math.sqrt(Math.pow((2 * coe.a1 * t1 + coe.b1), 2) + Math.pow((2 * coe.a2 * t1 + coe.b2),2)) * w1
//             + Math.sqrt(Math.pow((2 * coe.a1 * t2 + coe.b1), 2) + Math.pow((2 * coe.a2 * t2 + coe.b2),2)) * w2
//             + Math.sqrt(Math.pow((2 * coe.a1 * t3 + coe.b1), 2) + Math.pow((2 * coe.a2 * t3 + coe.b2),2)) * w3
//     return length.toFixed(4)*1
// }

export function GridPointGenerator2(
  masterLine,
  girderLayout,
  SEShape,
  startSkew,
  endSkew,
  VerticalDataList,
  SuperElevation,
  diaPhragmLocate,
  vStiffLocate,
  splice,
  joint,
  height,
  taperedPoint
) {
  let gridPointStation = [];
  let stationDictList = [];
  let nameToPointDict = {};
  const girderNumber = girderLayout.girderSupportPoint.length;
  const spanNumber = girderLayout.girderSpanPoint[0].length;
  let pointName = "";

  for (let i = 0; i < girderNumber; i++) {
    let kNum = 1;
    let ptsList = [];
    let stationDict = [];
    for (let j = 0; j < spanNumber; j++) {
      let pts = [];
      let stationToNameDict = {};
      pointName = "G" + (i + 1) + "S" + (j + 1);
      stationToNameDict[
        girderLayout.girderSupportPoint[i][j + 1].masterStationNumber
      ] = pointName;
      nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j + 1];
      pointName = "G" + (i + 1) + "S" + (j + 2);
      stationToNameDict[
        girderLayout.girderSupportPoint[i][j + 2].masterStationNumber
      ] = pointName;
      if (j === spanNumber - 1) {
        nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j + 2];
      }
      let skewedStation = [];
      if (j === 0) {
        let masterPoint = girderLayout.centralSupportPoint[0];
        let offset = 0;
        for (let k = 0; k < 3; k++) {
          pointName = "G" + (i + 1) + "K" + kNum;
          kNum += 1;
          if (k === 0) {
            offset = SEShape.start.A + SEShape.start.D; // neede to minus sign
          } else if (k === 1) {
            offset = SEShape.start.A + SEShape.start.D + SEShape.start.F; // neede to minus sign
          } else {
            offset =
              SEShape.start.A +
              SEShape.start.D +
              SEShape.start.F +
              SEShape.start.G;
          }
          let skew = OffsetSkewCalculator(
            masterPoint,
            startSkew,
            offset,
            masterLine
          );
          let centerPoint = PointGenerator(
            masterPoint.masterStationNumber + offset,
            masterLine,
            skew
          );
          let skewPoint = LineMatch(
            centerPoint,
            masterLine,
            girderLayout.girderLine[i],
            skew,
            VerticalDataList,
            SuperElevation
          );
          skewedStation.push(skewPoint.masterStationNumber);
          stationToNameDict[skewPoint.masterStationNumber] = pointName;
          nameToPointDict[pointName] = skewPoint;
        }
      } else if (j === spanNumber - 1) {
        let masterPoint =
          girderLayout.centralSupportPoint[
            girderLayout.centralSupportPoint.length - 1
          ];
        let offset = 0;
        for (let k = 3; k < 6; k++) {
          pointName = "G" + (i + 1) + "K" + kNum;
          kNum += 1;
          if (k === 3) {
            offset =
              SEShape.end.A + SEShape.end.D + SEShape.end.F + SEShape.end.G;
          } else if (k === 4) {
            offset = SEShape.end.A + SEShape.end.D + SEShape.end.F; // neede to minus sign
          } else {
            offset = SEShape.end.A + SEShape.end.D; // neede to minus sign
          }
          let skew = OffsetSkewCalculator(
            masterPoint,
            endSkew,
            -1 * offset,
            masterLine
          );
          let centerPoint = PointGenerator(
            masterPoint.masterStationNumber - offset,
            masterLine,
            skew
          );
          let skewPoint = LineMatch(
            centerPoint,
            masterLine,
            girderLayout.girderLine[i],
            skew,
            VerticalDataList,
            SuperElevation
          );
          skewedStation.push(skewPoint.masterStationNumber);
          stationToNameDict[skewPoint.masterStationNumber] = pointName;
          nameToPointDict[pointName] = skewPoint;
        }
      }
      pts.push(girderLayout.girderSupportPoint[i][j + 1].masterStationNumber);
      pts.push(girderLayout.girderSupportPoint[i][j + 2].masterStationNumber);
      pts.push(...skewedStation);
      stationDict.push(stationToNameDict);
      ptsList.push(pts);
    }
    gridPointStation.push(ptsList);
    stationDictList.push(stationDict);
  }
  diaPhragmLocate.forEach(function(elem) {
    pointName = elem[0];
    let i = pointName.substr(1, 1) * 1 - 1;
    let masterstation =
      nameToPointDict[elem[1]].masterStationNumber + elem[2];
    let masterPoint = PointGenerator(masterstation, masterLine);
    for (let j = 0; j < spanNumber; j++) {
      if (
        masterstation >=
          girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
        masterstation <=
          girderLayout.centralSupportPoint[j + 2].masterStationNumber
      ) {
        stationDictList[i][j][masterstation] = pointName;
        gridPointStation[i][j].push(masterstation);
        nameToPointDict[pointName] = SplinePointGenerator(
          masterPoint,
          girderLayout.girderSpanPoint[i][j],
          VerticalDataList,
          SuperElevation
        );
        break;
      }
    }
  });

  vStiffLocate.forEach(function(elem) {
    pointName = elem[0];
    let i = pointName.substr(1, 1) * 1 - 1;
    let masterstation =
      nameToPointDict[elem[1]].masterStationNumber + elem[2];
    let masterPoint = PointGenerator(masterstation, masterLine);
    for (let j = 0; j < spanNumber; j++) {
      if (
        masterstation >=
          girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
        masterstation <=
          girderLayout.centralSupportPoint[j + 2].masterStationNumber
      ) {
        stationDictList[i][j][masterstation] = pointName;
        gridPointStation[i][j].push(masterstation);
        nameToPointDict[pointName] = SplinePointGenerator(
          masterPoint,
          girderLayout.girderSpanPoint[i][j],
          VerticalDataList,
          SuperElevation
        );
        break;
      }
    }
  });

  splice.forEach(function(elem) {
    pointName = elem[0];
    let i = pointName.substr(1, 1) * 1 - 1;
    let masterstation =
      nameToPointDict[elem[1]].masterStationNumber + elem[2];
    let masterPoint = PointGenerator(masterstation, masterLine);
    for (let j = 0; j < spanNumber; j++) {
      if (
        masterstation >=
          girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
        masterstation <=
          girderLayout.centralSupportPoint[j + 2].masterStationNumber
      ) {
        stationDictList[i][j][masterstation] = pointName;
        gridPointStation[i][j].push(masterstation);
        nameToPointDict[pointName] = SplinePointGenerator(
          masterPoint,
          girderLayout.girderSpanPoint[i][j],
          VerticalDataList,
          SuperElevation
        );
        break;
      }
    }
  });
  joint.forEach(function(elem) {
    pointName = elem[0];
    let i = pointName.substr(1, 1) * 1 - 1;
    let masterstation =
      nameToPointDict[elem[1]].masterStationNumber + elem[2];
    let masterPoint = PointGenerator(masterstation, masterLine);
    for (let j = 0; j < spanNumber; j++) {
      if (
        masterstation >=
          girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
        masterstation <=
          girderLayout.centralSupportPoint[j + 2].masterStationNumber
      ) {
        stationDictList[i][j][masterstation] = pointName;
        gridPointStation[i][j].push(masterstation);
        nameToPointDict[pointName] = SplinePointGenerator(
          masterPoint,
          girderLayout.girderSpanPoint[i][j],
          VerticalDataList,
          SuperElevation
        );
        break;
      }
    }
  });

  height.forEach(function(elem) {
    pointName = elem[0];
    let i = pointName.substr(1, 1) * 1 - 1;
    let masterstation =
      nameToPointDict[elem[1]].masterStationNumber + elem[2];
    let masterPoint = PointGenerator(masterstation, masterLine);
    for (let j = 0; j < spanNumber; j++) {
      if (
        masterstation >=
          girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
        masterstation <=
          girderLayout.centralSupportPoint[j + 2].masterStationNumber
      ) {
        stationDictList[i][j][masterstation] = pointName;
        gridPointStation[i][j].push(masterstation);
        nameToPointDict[pointName] = SplinePointGenerator(
          masterPoint,
          girderLayout.girderSpanPoint[i][j],
          VerticalDataList,
          SuperElevation
        );
        break;
      }
    }
  });

  taperedPoint.forEach(function(elem) {
    pointName = elem[0];
    let i = pointName.substr(1, 1) * 1 - 1;
    let masterstation =
      nameToPointDict[elem[1]].masterStationNumber + elem[2];
    let masterPoint = PointGenerator(masterstation, masterLine);
    for (let j = 0; j < spanNumber; j++) {
      if (
        masterstation >=
          girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
        masterstation <=
          girderLayout.centralSupportPoint[j + 2].masterStationNumber
      ) {
        stationDictList[i][j][masterstation] = pointName;
        gridPointStation[i][j].push(masterstation);
        nameToPointDict[pointName] = SplinePointGenerator(
          masterPoint,
          girderLayout.girderSpanPoint[i][j],
          VerticalDataList,
          SuperElevation
        );
        break;
      }
    }
  });

  for (let i in gridPointStation) {
    for (let j in gridPointStation[i]) {
      gridPointStation[i][j].sort();
    }
  }

  return { gridPointStation, stationDictList, nameToPointDict };
}

export function OffsetSkewCalculator(
  masterPoint,
  masterSkew,
  offset,
  masterLine
) {
  const startSkew = masterSkew;
  let offsetStation = masterPoint.masterStationNumber + offset;
  const offsetPoint = PointGenerator(offsetStation, masterLine);
  let sign = 1;
  if (
    masterPoint.normalCos * offsetPoint.normalSin -
      masterPoint.normalSin * offsetPoint.normalCos >=
    0
  ) {
    sign = 1;
  } else {
    sign = -1;
  }
  let deltaSkew =
    (
      (Math.acos(
        masterPoint.normalCos * offsetPoint.normalCos +
          masterPoint.normalSin * offsetPoint.normalSin
      ) *
        180) /
      Math.PI
    ).toFixed(4) * 1;
  let offsetSkew = startSkew - sign * deltaSkew;
  if (offsetSkew > 90) {
    offsetSkew -= 180;
  } else if (offsetSkew < -90) {
    offsetSkew += 180;
  }
  return offsetSkew;
}

export function SplinePointGenerator(
  masterPoint,
  slavePoints,
  VerticalDataList,
  SuperElevation
) {
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
    skew: 90
  };

  let dX = masterPoint.normalCos;
  let dY = masterPoint.normalSin;
  let alpha = dY;
  let beta = -1 * dX;
  let gamma = -alpha * masterPoint.x - beta * masterPoint.y;
  let dummy1 = 0;
  let dummy2 = 0;
  let sign = 1;
  for (let i = 0; i < slavePoints.length - 1; i++) {
    dummy1 = alpha * slavePoints[i].x + beta * slavePoints[i].y + gamma;
    dummy2 = alpha * slavePoints[i + 1].x + beta * slavePoints[i + 1].y + gamma;
    if (dummy1 === 0) {
      resultPoint = slavePoints[i];
      break;
    } else if (dummy2 === 0) {
      resultPoint = slavePoints[i + 1];
      break;
    } else if (dummy1 * dummy2 < 0) {
      let coe = splineCoefficient(slavePoints[i], slavePoints[i + 1]);
      let a = alpha * coe.a2 + beta * coe.a1;
      let b = alpha * coe.b2 + beta * coe.b1;
      let c = alpha * coe.c2 + beta * coe.c1 + gamma;
      let t = 0;
      if (a == 0) {
        t = -c / b;
      } else {
        t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
        if (t > 1 || t < -1) {
          t = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
        }
      }
      let deltaX = 2 * coe.a2 * t + coe.b2;
      let deltaY = 2 * coe.a1 * t + coe.b1;
      let len = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      resultPoint.normalCos = -deltaY / len;
      resultPoint.normalSin = deltaX / len;
      resultPoint.x = coe.a2 * t ** 2 + coe.b2 * t + coe.c2;
      resultPoint.y = coe.a1 * t ** 2 + coe.b1 * t + coe.c1;
      resultPoint.masterStationNumber =
        masterPoint.masterStationNumber.toFixed(4) * 1;
      resultPoint.stationNumber = resultPoint.masterStationNumber;
      if (
        masterPoint.normalCos * (resultPoint.x - masterPoint.x) +
          masterPoint.normalSin * (resultPoint.y - masterPoint.y) >=
        0
      ) {
        sign = 1;
      } else {
        sign = -1;
      }
      resultPoint.offset =
        sign *
        Math.sqrt(
          (resultPoint.x - masterPoint.x) ** 2 +
            (resultPoint.y - masterPoint.y) ** 2
        ).toFixed(4) *
        1;
      let verticalInfo = VerticalPositionGenerator(
        VerticalDataList,
        SuperElevation,
        resultPoint
      );
      resultPoint.z = verticalInfo.elevation;
      resultPoint.gradientX = verticalInfo.gradientX;
      resultPoint.gradientY = verticalInfo.gradientY;
      break;
    }
  }
  return resultPoint;
}
