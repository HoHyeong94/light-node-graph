import {
  GirderLayoutGenerator,
  GirderGridStation,
  GridPointGenerator,
  PointSectionInfo
} from "./uiFunction";
import {
  LineGenerator,
  VerticalPositionGenerator,
} from "./nodeGenerator";
import {
  sectionPoint,
  XbeamSection,
  XbeamSectionK,
  diaphragmSection,
  diaphragmSection2,
  vStiffSection,
  hBracingSection,
  hBracingPlate
} from "./geometryFunc";
import {_} from "global";



// ---------------------- Test ----------------------------------
export function Main(
  horizon,
  vertical,
  superElevation,
  girderLayoutInput,
  SEShape,
  girderBaseInfo,
  xbeamLayout,
  xbeamSectionList,
  diaphragmLayout,
  diaphragmSectionList,
  vStiffLayout,
  vStiffSectionList,
  hBracingLayout,
  hBracingSectionList
) {
  ///// 선형정보는 입력은 m단위로 받는 것을 자동 변환할 수 있도록 함. mm로 변환 코드 작성 필요 ///
  const horizonDataList = horizon;
  const VerticalDataList = vertical;
  const SuperElevation = superElevation;
  const beginStation = 769452.42;
  const slaveOrMaster = true;
  const input = { beginStation, horizonDataList, slaveOrMaster };

  let line = LineGenerator(input);
  let zPosition = 0;
  //   let line2 = OffsetLine(20,line)
  for (let i = 0; i < line.points.length; i++) {
    zPosition = VerticalPositionGenerator(
      VerticalDataList,
      SuperElevation,
      line.points[i]
    ).elevation;
    line.points[i].z = zPosition;
  }
  let hline = [];
  hline.push(line);
  let girderLayout = GirderLayoutGenerator(
    girderLayoutInput,
    hline,
    VerticalDataList,
    SuperElevation
  );
  let gridStationList = GirderGridStation(girderLayout, 5000, 1000);
  let startSkew = girderLayoutInput.supportData[0].angle;
  let endSkew =
    girderLayoutInput.supportData[girderLayoutInput.supportData.length - 1]
      .angle;
  let gridPoint = GridPointGenerator(
    line,
    girderLayout,
    gridStationList,
    SEShape,
    startSkew,
    endSkew,
    VerticalDataList,
    SuperElevation
  );
  // for (let pt in gridPoint.nameToPointDict){
  //     gridPoint.nameToPointDict[pt].z = VerticalPositionGenerator(VerticalDataList, SuperElevation,gridPoint.nameToPointDict[pt])
  // }
  console.log(gridPoint);

  // immer 로 감쌌기 때문에 ... .length 가 없을수 있다 ...
  //gridPoint.stationDictList[index].length

  let sectionPointDict = {};
  for (let i = 0; i < girderBaseInfo.length; i++) {
    let index = girderBaseInfo[i].girderIndex;
    for (let j = 0; j < gridPoint.stationDictList[index].length; j++) {
      for (let key in gridPoint.stationDictList[index][j]) {
        let pt = gridPoint.stationDictList[index][j][key];
        let pointSectionInfo = PointSectionInfo(
          gridPoint.nameToPointDict[pt].masterStationNumber,
          gridPoint.nameToPointDict[pt].skew,
          girderBaseInfo[i],
          gridPoint.nameToPointDict
        );
        sectionPointDict[pt] = sectionPoint(
          girderBaseInfo[i].section,
          pointSectionInfo,
          gridPoint.nameToPointDict[pt].gradientY
        );
      }
    }
  }
  // console.log(sectionInfo)
  // console.log(gridPoint)
  let diaDict = DiaShapeDict(
    sectionPointDict,
    diaphragmLayout,
    diaphragmSectionList
  );
  let vStiffDict = VstiffShapeDict(
    sectionPointDict,
    vStiffLayout,
    vStiffSectionList
  );
  let hBracing = HBracingList(
    gridPoint.nameToPointDict,
    sectionPointDict,
    hBracingLayout,
    hBracingSectionList
  );
  let xbeamDict = XbeamDict(
    gridPoint.nameToPointDict,
    sectionPointDict,
    xbeamLayout,
    xbeamSectionList
  );
  return {
    p: [line.points],
    gridPoint,
    xbeamData: xbeamLayout,
    sectionPointDict,
    diaDict,
    vStiffDict,
    ...hBracing,
    ...xbeamDict
  };
}

export function XbeamDict(
  nameToPointDict,
  sectionPointDict,
  xbeamLayout,
  xbeamSectionList
) {
  let xbeamSectionDict = {};
  let xbeamPointDict = {};
  for (let i = 0; i < xbeamLayout.length; i++) {
    let iNodekey = xbeamLayout[i].iNode;
    let jNodekey = xbeamLayout[i].jNode;
    let xbeamSection = xbeamSectionList[xbeamLayout[i].section];
    let iSectionPoint = sectionPointDict[iNodekey].forward;
    let jSectionPoint = sectionPointDict[jNodekey].forward;
    let iPoint = nameToPointDict[iNodekey];
    let jPoint = nameToPointDict[jNodekey];
    // let cbkey = 'CB' + iNodekey + 'To' + jNodekey
    if (xbeamLayout[i].section == "xbeamI") {
      xbeamSectionDict[iNodekey] = XbeamSection(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection
      );
    } else if (xbeamLayout[i].section == "xbeamK") {
      xbeamSectionDict[iNodekey] = XbeamSectionK(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection
      );
    }
    // xbeamSectionDict[iNodekey] = XbeamSection(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamSection)
    // xbeamPointDict[cbkey] = XbeamPoint(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamLayout)
  }
  return { xbeamSectionDict, xbeamPointDict };
}
// export function XbeamPointDict(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamLayout){

//   let resultPoint = {
//     stationNumber:0,
//     x: 0,
//     y: 0,
//     z: 0,
//     normalCos: 0,
//     normalSin: 0,
//     masterStationNumber:0,
//     offset: 0,
//     virtual: false,
//     skew:90
//   };
//   let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rightTopPlate[0])
//   let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.rightTopPlate[0])
//   resultPoint.x = iTopNode
//   return resultPoint
// }

export function HBracingList(
  nameToPointDict,
  sectionPointDict,
  hBracingLayout,
  hBracingectionList
) {
  let hBracingList = [];
  let hBracingPlateDict = {};
  let right = true;
  for (let i = 0; i < hBracingLayout.length; i++) {
    let hBSection = hBracingectionList[hBracingLayout[i].section];
    let pk1 = hBracingLayout[i].from;
    let pk2 = hBracingLayout[i].to;
    let webPoints = [];
    if (hBracingLayout[i].leftToright) {
      webPoints = [
        sectionPointDict[pk1].forward.lWeb[0],
        sectionPointDict[pk1].forward.lWeb[1],
        sectionPointDict[pk2].forward.rWeb[0],
        sectionPointDict[pk2].forward.rWeb[1]
      ];
    } else {
      webPoints = [
        sectionPointDict[pk1].forward.rWeb[0],
        sectionPointDict[pk1].forward.rWeb[1],
        sectionPointDict[pk2].forward.lWeb[0],
        sectionPointDict[pk2].forward.lWeb[1]
      ];
    }
    let point1 = nameToPointDict[pk1];
    let point2 = nameToPointDict[pk2];

    hBracingList.push(hBracingSection(point1, point2, webPoints, hBSection));
    if (hBracingLayout[i].platelayout[0]) {
      right = hBracingLayout[i].leftToright ? false : true;
      let webPoints1 = [
        sectionPointDict[pk1].forward.lWeb[0],
        sectionPointDict[pk1].forward.lWeb[1],
        sectionPointDict[pk1].forward.rWeb[0],
        sectionPointDict[pk1].forward.rWeb[1]
      ];
      hBracingPlateDict[pk1] = hBracingPlate(right, webPoints1, hBSection);
    }
    if (hBracingLayout[i].platelayout[1]) {
      right = hBracingLayout[i].leftToright ? true : false;
      let webPoints2 = [
        sectionPointDict[pk2].forward.lWeb[0],
        sectionPointDict[pk2].forward.lWeb[1],
        sectionPointDict[pk2].forward.rWeb[0],
        sectionPointDict[pk2].forward.rWeb[1]
      ];
      hBracingPlateDict[pk2] = hBracingPlate(right, webPoints2, hBSection);
    }
  }

  return { hBracingList, hBracingPlateDict };
}

export function DiaShapeDict(
  sectionPointDict,
  diaphragmLayout,
  diaphragmSectionList
) {
  let result = {};
  for (let i = 0; i < diaphragmLayout.length; i++) {
    let gridkey = diaphragmLayout[i].position;
    let diaSection = diaphragmSectionList[diaphragmLayout[i].section];
    let webPoints = [
      sectionPointDict[gridkey].forward.lWeb[0],
      sectionPointDict[gridkey].forward.lWeb[1],
      sectionPointDict[gridkey].forward.rWeb[0],
      sectionPointDict[gridkey].forward.rWeb[1]
    ];
    let uflangePoints = [
      sectionPointDict[gridkey].forward.leftTopPlate[1],
      sectionPointDict[gridkey].forward.leftTopPlate[2],
      sectionPointDict[gridkey].forward.rightTopPlate[1],
      sectionPointDict[gridkey].forward.rightTopPlate[2]
    ];
    let skew = sectionPointDict[gridkey].forward.skew;
    if (diaphragmLayout[i].section == "diaType1") {
      result[gridkey] = diaphragmSection(
        webPoints,
        skew,
        uflangePoints,
        diaSection
      );
    } else if (diaphragmLayout[i].section == "diaType2") {
      result[gridkey] = diaphragmSection2(
        webPoints,
        skew,
        uflangePoints,
        diaSection
      );
    }
  }
  return result;
}

export function VstiffShapeDict(
  sectionPointDict,
  vStiffLayout,
  vStiffSectionList
) {
  let result = {};
  for (let i = 0; i < vStiffLayout.length; i++) {
    let gridkey = vStiffLayout[i].position;
    let vSection = vStiffSectionList[vStiffLayout[i].section];
    let webPoints = [
      sectionPointDict[gridkey].forward.lWeb[0],
      sectionPointDict[gridkey].forward.lWeb[1],
      sectionPointDict[gridkey].forward.rWeb[0],
      sectionPointDict[gridkey].forward.rWeb[1]
    ];
    let uflangePoints = [
      sectionPointDict[gridkey].forward.leftTopPlate[1],
      sectionPointDict[gridkey].forward.leftTopPlate[2],
      sectionPointDict[gridkey].forward.rightTopPlate[1],
      sectionPointDict[gridkey].forward.rightTopPlate[2]
    ];
    let skew = sectionPointDict[gridkey].forward.skew;
    result[gridkey] = vStiffSection(webPoints, skew, uflangePoints, vSection);
  }
  return result;
}

// ---------------------- Test ----------------------------------
