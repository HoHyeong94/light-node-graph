import {
  GirderLayoutGenerator,
  GridPointGenerator2,
  PointSectionInfo,
  SupportAngleCalculator,
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
  hBracingPlate,
  SplicePlate,
} from "./geometryFunc";
import { ToGlobalPoint } from "./threejsDisplay";
// import {Vector2d, Curve, LineSegment} from "./Class_variable";
import _ from "lodash";
import {
  addedValues,
} from "./defaultValues";

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
  hBracingSectionList,
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
  // let gridStationList = GirderGridStation(girderLayout, 5000, 1000);
  let startSkew = girderLayoutInput.supportData[0].angle;
  let endSkew = girderLayoutInput.supportData[girderLayoutInput.supportData.length - 1].angle;
  // let gridPoint2 = GridPointGenerator(
  //   line,
  //   girderLayout,
  //   gridStationList,
  //   SEShape,
  //   startSkew,
  //   endSkew,
  //   VerticalDataList,
  //   SuperElevation
  // );

  let gridPoint = GridPointGenerator2(
    line,
    girderLayout,
    SEShape,
    startSkew,
    endSkew,
    VerticalDataList,
    SuperElevation,
    addedValues.diaPhragmLocate, 
    addedValues.vStiffLocate, 
    addedValues.splice, 
    addedValues.joint, 
    addedValues.height,
    addedValues.taperedPoint)

  // for (let pt in gridPoint.nameToPointDict){
  //     gridPoint.nameToPointDict[pt].z = VerticalPositionGenerator(VerticalDataList, SuperElevation,gridPoint.nameToPointDict[pt])
  // }
  // console.log(gridPoint);
  let supportAngle = SupportAngleCalculator(addedValues.supportFixed, addedValues.supportData, gridPoint.nameToPointDict)
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
  console.log(sectionPointDict)
  
  // let deckPointDict = {};
  // for (let i in sectionPointDict){
  //   deckPointDict[i] = deckSection()
  // }



  // console.log(sectionInfo)
  
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
  let hBracing = HBracingDict(
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

  let steelBoxDict = SteelBoxDict(
    gridPoint.gridPointStation,
    gridPoint.stationDictList,
    gridPoint.nameToPointDict,
    sectionPointDict,
  )
  let spliceDict = SpliceDict(
    gridPoint.nameToPointDict,
    sectionPointDict,
  )
  return {
    p: [line.points],
    gridPoint,
    xbeamData: xbeamLayout,
    sectionPointDict,
    diaDict,
    vStiffDict,
    ...hBracing,
    ...xbeamDict,
    steelBoxDict,
    spliceDict,
    supportAngle
  };
}

export function SpliceDict(nameToPointDict,sectionPointDict){
  let spliceDict = {}
  for (let key in nameToPointDict){
    if(key.includes("SP")){
      spliceDict[key] = SplicePlate(nameToPointDict[key],sectionPointDict[key].forward)
    }
  }
  return spliceDict
}


export function SteelBoxDict(gridPointList,stationDictList,nameToPointDict, sectionPointDict){
    let steelBoxDict = {};
    let pk1 = ""
    let pk2 = ""
    let UFi = 1;
    let Bi = 1;
    let LWi = 1;
    let RWi = 1;
    let Ribi = 1;
    let keyname = ""
    for (let i  in gridPointList){
      for (let j in gridPointList[i]){
        for (let k = 0; k< gridPointList[i][j].length -1;k++){
          pk1 = stationDictList[i][j][gridPointList[i][j][k]]
          pk2 = stationDictList[i][j][gridPointList[i][j][k+1]]
          let point1 = nameToPointDict[pk1];
          let point2 = nameToPointDict[pk2];

          keyname = "G"+(i*1+1).toString()+"TopPlate" + UFi
          if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
          let L1 = sectionPointDict[pk1].forward.leftTopPlate
          let R1 = sectionPointDict[pk1].forward.rightTopPlate
          let L2 = sectionPointDict[pk2].backward.leftTopPlate
          let L3 = sectionPointDict[pk2].forward.leftTopPlate
          let R2 = sectionPointDict[pk2].backward.rightTopPlate
          let R3 = sectionPointDict[pk2].forward.rightTopPlate
            
          if(L1[1].x>=R1[1].x){ //폐합인 경우 
            let C1 = [L1[0],R1[0],R1[3],L1[3]];
            C1.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point1, element)))
          }else{
            L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
            R1.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point1, element)))
          }
          let FisB = true;
          for (let i in L2){ if(L2[i] !== L3[i] || R2[i] !== R3[i]){FisB = false}}
          if (!FisB || pk2.substr(2,1)==="K" || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP"|| k === gridPointList[i][j].length -2){
            if(L2[1].x>=R2[1].x){ //폐합인 경우 
              let C2 = [L2[0],R2[0],R2[3],L2[3]];
              C2.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point2, element)))
            }else{
              L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
              R2.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point2, element)))
            }
          }
          if(pk2.substr(2,1)==="K" || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP"){ UFi +=1 }


          keyname = "G"+(i*1+1).toString()+"BottomPlate" + Bi
          if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
          L1 = sectionPointDict[pk1].forward.bottomPlate
          L2 = sectionPointDict[pk2].backward.bottomPlate
          L3 = sectionPointDict[pk2].forward.bottomPlate
            
          L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
          
          FisB = true;
          for (let i in L2){ if(L2[i] !== L3[i] ){FisB = false}}
          if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP"|| k === gridPointList[i][j].length -2){
              L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
          }
          if(pk2.substr(2,2)==="BF" || pk2.substr(2,2)==="SP"){ Bi +=1 }

          // keyname = "G"+(i*1+1).toString()+"LeftWeB" + LWi
          // if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
          // L1 = sectionPointDict[pk1].forward.lWeb
          // L2 = sectionPointDict[pk2].backward.lWeb
          // L3 = sectionPointDict[pk2].forward.lWeb
          // L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
          // FisB = true;
          // for (let i in L2){ if(L2[i] !== L3[i] ){FisB = false}}
          // if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP" || k === gridPointList[i][j].length -2){
          //     L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
          // }
          // if(pk2.substr(2,2)==="LW" || pk2.substr(2,2)==="SP" ){ LWi +=1 }

          // keyname = "G"+(i*1+1).toString()+"RightWeB" + RWi
          // if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
          // L1 = sectionPointDict[pk1].forward.rWeb
          // L2 = sectionPointDict[pk2].backward.rWeb
          // L3 = sectionPointDict[pk2].forward.rWeb
          // L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
          // FisB = true;
          // for (let i in L2){ if(L2[i] !== L3[i] ){FisB = false}}
          // if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP" || k === gridPointList[i][j].length -2){
          //     L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
          // }
          // if(pk2.substr(2,2)==="RW" || pk2.substr(2,2)==="SP"){ RWi +=1 }

          let RibList = []
          for (let ii in  sectionPointDict[pk1].forward){
            if (ii.includes("Rib"))
            RibList.push(ii)
          }
          for (let Ribkey of RibList){
            keyname = "G"+(i*1+1).toString()+"lRib" + Ribi
            if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
            L1 = sectionPointDict[pk1].forward[Ribkey]
            L2 = sectionPointDict[pk2].backward[Ribkey]
            L3 = sectionPointDict[pk2].forward[Ribkey]
            console.log(L1,L2,L3)
            L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
            FisB = true;
            for (let i in L2){ FisB = L3? (L2[i] !== L3[i]? false :true):false }
            if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP" || k === gridPointList[i][j].length -2){
                L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
                Ribi +=1
            }
            // if(pk2.substr(2,2)==="RW" || pk2.substr(2,2)==="SP"){  }
        }

        }
        }
    }

    return steelBoxDict
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

export function HBracingDict(
  nameToPointDict,
  sectionPointDict,
  hBracingLayout,
  hBracingectionList
) {
  let hBracingDict = {};
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

    hBracingDict[pk1+pk2] = hBracingSection(point1, point2, webPoints, hBSection);
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

  return { hBracingDict, hBracingPlateDict };
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
