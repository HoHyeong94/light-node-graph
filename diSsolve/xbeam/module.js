import { ToGlobalPoint, PlateRestPoint Kframe, XYOffset, Vector, scallop } from "../geometryModule"
import { PTS } from "../DB/module"
import { vPlateGen, hPlateGen } from "../stiffner/module"

export function XbeamDict(
  nameToPointDict,
  sectionPointDict,
  xbeamLayout,
  xbeamSectionList,
  sectionDB
) {
  const iNode = 0;
  const jNode = 1;
  const section = 2;

  let xbeamSectionDict = {};
  let xbeamData = []
  for (let i = 0; i < xbeamLayout.length; i++) {
    let iNodekey = xbeamLayout[i][iNode];
    let jNodekey = xbeamLayout[i][jNode];
    let xbeamSection = xbeamSectionList[xbeamLayout[i][section]];
    let iSectionPoint = sectionPointDict[iNodekey].forward;
    let jSectionPoint = sectionPointDict[jNodekey].forward;
    let iPoint = nameToPointDict[iNodekey];
    let jPoint = nameToPointDict[jNodekey];
    let xbData = [];
    let xbSection = [];
    // let cbkey = 'CB' + iNodekey + 'To' + jNodekey
    if (xbeamLayout[i][section] == "xbeamI") {
      let xbeam = XbeamSection(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection
      );
      xbeamSectionDict[iNodekey] = xbeam.result
      xbData = xbeam.data
      xbSection = xbeam.section
    } else if (xbeamLayout[i][section] == "xbeamK") {
      let xbeam = XbeamSectionK(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection,
        sectionDB
      );
      xbeamSectionDict[iNodekey] = xbeam.result
      xbData = xbeam.data
      xbSection = xbeam.section
    } else if (xbeamLayout[i][section] == "DYXbeam1") {
      let xbeam = DYXbeam1(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection,
      );
      xbeamSectionDict[iNodekey] = xbeam.result
      xbData = xbeam.data
      xbSection = xbeam.section
    }

    // xbeamSectionDict[iNodekey] = XbeamSection(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamSection)
    // xbeamPointDict[cbkey] = XbeamPoint(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamLayout)
    //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[]}];
    let key = i < 10 ? "X0" + i : "X" + i;
    let isKframe = xbeamLayout[i][section] == "xbeamK" ? true : false;
    xbeamData.push({
      inode: iNodekey, jnode: jNodekey, key: key, isKframe: isKframe, data: xbData, section: xbSection
    })
  }

  return { xbeamSectionDict, xbeamData };
}

export function DYXbeam1(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
  let xs = {
    bracketLength: 541,
    bracketWidth: 450,
    bracketFilletR: 200,
    webHeight: 578,
    webThickness: 12,
    flangeWidth: 250,
    flangeThickness: 12,
    stiffThickness: 12,
    stiffWidth : 150,
    scallopRadius: 25,
    webJointThickness: 10,
    webJointWidth: 330,
    webJointHeight: 440,
    flangeJointThickness: 10,
    flangeJointLength: 480,
    flangeJointWidth: 80,
  }
  let result = {};
  let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2)
  let vec = { x: (jPoint.x - iPoint.x) / tlength, y: (jPoint.y - iPoint.y) / tlength }


  let dOffset = (jPoint.offset - iPoint.offset) / 2;
  let dz = (jPoint.z - iPoint.z) / 2


  let centerPoint = {
    x: (iPoint.x + jPoint.x) / 2,
    y: (iPoint.y + jPoint.y) / 2,
    z: (iPoint.z + jPoint.z) / 2,
    normalCos: iPoint.normalCos,
    normalSin: iPoint.normalSin,
  }
  let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
  centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;

  //폐합시를 고려하여 예외처리 필요
  let ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
  let ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
  let lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
  let lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };

  let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
  let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
  let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
  let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

  let uGradient = (ufr.y-ufl.y)/(ufr.x -ufl.x);
  let lGradient = (tr.y-tl.y)/(tr.x -tl.x);
  let lwebPlate = [tl, {x: tl.x, y:tl.y - xs.webHeight}, 
    {x:tl.x + xs.bracketLength, y: tl.y - xs.webHeight + lGradient * xs.bracketLength},
    {x:tl.x + xs.bracketLength, y: ufl.y + uGradient * (xs.bracketLength - (ufl.x - tl.x))},
    ufl]
  result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, []);
  let lstiff = PlateRestPoint({x: tl.x, y:tl.y - xs.webHeight - xs.flangeThickness}, bl, lGradient, 0, xs.stiffWidth);
  result["lstiff"] = vPlateGen(lstiff,centerPoint,xs.stiffThickness,[0,1],xs.scallopRadius,null,null,[]);

  let data = []; //[cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  
  // let webHeight = ((iTopNode2.y - iBottomNode2.y) + (jTopNode2.y - jBottomNode2.y))/2
  let section = [];// [upperFlangeWidth,upperFlangeThickness,lowerFlangeWidth,lowerFlangeThickness,webHeight, webThickness ]
  return { result, data, section }
}

export function XbeamSection(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
  const result = {}
  let data = []
  const connectorLength = xbeamSection.connectorLength
  const connectorWidth = xbeamSection.connectorWidth
  const upperFlangeThickness = xbeamSection.upperFlangeThickness
  const upperFlangeWidth = xbeamSection.upperFlangeWidth
  const lowerFlangeThickness = xbeamSection.lowerFlangeThickness
  const lowerFlangeWidth = xbeamSection.lowerFlangeWidth
  const vStiffThickness = xbeamSection.vStiffThickness
  const vStiffBottomOffset = xbeamSection.vStiffBottomOffset
  const vStiffWidth = xbeamSection.vStiffWidth
  const webThickness = xbeamSection.webThickness
  const vStiffendFillet = xbeamSection.vStiffendFillet
  const scallopRadius = xbeamSection.scallopRadius

  const cosec = Math.abs(1 / Math.sin(iPoint.skew * Math.PI / 180));
  const cot = Math.abs(1 / Math.tan(iPoint.skew * Math.PI / 180));
  const cos = cot / cosec

  // 기준점은 iTopNode라고 가정, 가로보는 반드시 skew각도와 일치해야함.
  let iNode = ToGlobalPoint(iPoint, iSectionPoint.rightTopPlate[0]) //순서가 바뀌었을때도 예외처리 필요
  let jNode = ToGlobalPoint(jPoint, jSectionPoint.leftTopPlate[0])
  let length = Math.sqrt((jNode.x - iNode.x) ** 2 + (jNode.y - iNode.y) ** 2)
  let vec = { x: (jNode.x - iNode.x) / length, y: (jNode.y - iNode.y) / length }
  let grd = (jNode.z - iNode.z) / length
  let grdSec = Math.sqrt(1 + grd ** 2)
  let centerPoint = {
    x: (iNode.x + jNode.x) / 2,
    y: (iNode.y + jNode.y) / 2,
    z: (iNode.z + jNode.z) / 2,
    normalCos: vec.x,
    normalSin: vec.y,
  }
  let lFlangeL = (iSectionPoint.rWeb[2].x - iSectionPoint.rightTopPlate[0].x) * cosec
  let rFlangeL = (jSectionPoint.lWeb[2].x - jSectionPoint.leftTopPlate[0].x) * cosec

  let iBottom = ToGlobalPoint(iPoint, iSectionPoint.bottomPlate[1])
  let jBottom = ToGlobalPoint(jPoint, jSectionPoint.bottomPlate[0])
  let lengthB = Math.sqrt((jBottom.x - iBottom.x) ** 2 + (jBottom.y - iBottom.y) ** 2)
  let vecB = { x: (jBottom.x - iBottom.x) / lengthB, y: (jBottom.y - iBottom.y) / lengthB }
  let grdB = (jBottom.z - iBottom.z) / lengthB
  let grdSecB = Math.sqrt(1 + grdB ** 2)
  let bottomPoint = {
    x: (iBottom.x + jBottom.x) / 2,
    y: (iBottom.y + jBottom.y) / 2,
    z: (iBottom.z + jBottom.z) / 2,
    normalCos: vecB.x,
    normalSin: vecB.y,
  }
  let lFlangeB = (iSectionPoint.rWeb[3].x - iSectionPoint.bottomPlate[1].x) * cosec
  let rFlangeB = (jSectionPoint.lWeb[3].x - jSectionPoint.bottomPlate[0].x) * cosec
  let gradientX = (iPoint.gradientX + jPoint.gradientX) / 2
  let vStiffLength = centerPoint.z - bottomPoint.z - vStiffBottomOffset
  let vStiffPlate = [{ x: webThickness / 2, y: -webThickness / 2 * gradientX },
  { x: webThickness / 2, y: -vStiffLength - webThickness / 2 * gradientX },
  { x: webThickness / 2 + vStiffWidth, y: -vStiffLength - webThickness / 2 * gradientX },
  { x: webThickness / 2 + vStiffWidth, y: -(webThickness / 2 + vStiffWidth) * gradientX }]
  let vStiffTopFillet = Math.max(vStiffWidth - (upperFlangeWidth - webThickness) / 2, 0)
  let vStiffPoint = []
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[1], vStiffPlate[0], vStiffPlate[3], scallopRadius, 4));
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[0], vStiffPlate[3], vStiffPlate[2], vStiffTopFillet, 1));
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[3], vStiffPlate[2], vStiffPlate[1], vStiffendFillet, 1));
  vStiffPoint.push(vStiffPlate[1])
  result['vStiffner'] = {
    points: vStiffPoint,
    Thickness: vStiffThickness,
    z: -vStiffThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: Math.PI / 2 * 3,
    hole: [],
    point: centerPoint
  }

  result['cbUpperFlange'] = {
    points: [{ x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: -upperFlangeWidth / 2 },
    { x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: upperFlangeWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: upperFlangeWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: -upperFlangeWidth / 2 },],
    Thickness: upperFlangeThickness,
    z: 0,
    rotationX: Math.atan(gradientX),
    rotationY: -Math.atan(grd),
    hole: [],
    point: centerPoint
  }
  result['connectorLeftTop'] = {
    points: [{ x: (- length / 2 - connectorWidth / 2 * cot) * grdSec, y: connectorWidth / 2 },
    { x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: upperFlangeWidth / 2 },
    { x: (lFlangeL - length / 2 + connectorLength) * grdSec, y: -upperFlangeWidth / 2 },
    { x: (- length / 2 + connectorWidth / 2 * cot) * grdSec, y: -connectorWidth / 2 }],

    Thickness: upperFlangeThickness,
    z: 0,
    rotationX: Math.atan(gradientX),
    rotationY: -Math.atan(grd),
    hole: [],
    point: centerPoint
  }
  result['connectorRightTop'] = {
    points: [{ x: (length / 2 - connectorWidth / 2 * cot) * grdSec, y: connectorWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: upperFlangeWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSec, y: -upperFlangeWidth / 2 },
    { x: (length / 2 + connectorWidth / 2 * cot) * grdSec, y: -connectorWidth / 2 }],
    Thickness: upperFlangeThickness,
    z: 0,
    rotationX: Math.atan((iPoint.gradientX + jPoint.gradientX) / 2),
    rotationY: -Math.atan(grd),
    hole: [],
    point: centerPoint
  }

  result['cblowerFlange'] = {
    points: [{ x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },
    { x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },],
    Thickness: lowerFlangeThickness,
    z: -lowerFlangeThickness,
    rotationX: 0,
    rotationY: -Math.atan(grdB),
    hole: [],
    point: bottomPoint
  }
  result['connectorLeftBottom'] = {
    points: [{ x: (- lengthB / 2 - connectorWidth / 2 * cot) * grdSecB, y: connectorWidth / 2 },
    { x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
    { x: (lFlangeL - length / 2 + connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },
    { x: (- lengthB / 2 + connectorWidth / 2 * cot) * grdSecB, y: -connectorWidth / 2 }],
    Thickness: lowerFlangeThickness,
    z: -lowerFlangeThickness,
    rotationX: 0,
    rotationY: -Math.atan(grdB),
    hole: [],
    point: bottomPoint
  }
  result['connectorRightBottom'] = {
    points: [{ x: (lengthB / 2 - connectorWidth / 2 * cot) * grdSecB, y: connectorWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: lowerFlangeWidth / 2 },
    { x: (rFlangeL + length / 2 - connectorLength) * grdSecB, y: -lowerFlangeWidth / 2 },
    { x: (lengthB / 2 + connectorWidth / 2 * cot) * grdSecB, y: -connectorWidth / 2 }],
    Thickness: lowerFlangeThickness,
    z: -lowerFlangeThickness,
    rotationX: 0,
    rotationY: -Math.atan(grdB),
    hole: [],
    point: bottomPoint
  }

  let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[2])
  let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[2])
  let cblength = Math.sqrt((jTopNode.x - iTopNode.x) ** 2 + (jTopNode.y - iTopNode.y) ** 2)
  let cbVec = { x: (jTopNode.x - iTopNode.x) / cblength, y: (jTopNode.y - iTopNode.y) / cblength }
  let gradient = (jTopNode.z - iTopNode.z) / cblength
  let iCos = (iPoint.normalCos * cbVec.x + iPoint.normalSin * cbVec.y).toFixed(6) * 1
  let jCos = jPoint.normalCos * cbVec.x + jPoint.normalSin * cbVec.y

  let ibaseNode = { x: iSectionPoint.rWeb[2].x * cosec, y: iSectionPoint.rWeb[2].y }
  let iTopNode1 = { x: iSectionPoint.rightTopPlate[0].x * cosec, y: iSectionPoint.rightTopPlate[0].y }
  let jbaseNode = { x: ibaseNode.x + cblength, y: ibaseNode.y + jTopNode.z - iTopNode.z }
  let jTopNode1 = { x: jbaseNode.x + (jSectionPoint.leftTopPlate[0].x - jSectionPoint.lWeb[2].x) * cosec, y: jbaseNode.y + jSectionPoint.leftTopPlate[0].y - jSectionPoint.lWeb[2].y }


  let jBottomNode = { x: jbaseNode.x + (jSectionPoint.lWeb[3].x - jSectionPoint.lWeb[2].x) * cosec, y: jbaseNode.y + jSectionPoint.lWeb[3].y - jSectionPoint.lWeb[2].y }
  let jBottomNode1 = { x: jbaseNode.x + (jSectionPoint.bottomPlate[0].x - jSectionPoint.lWeb[2].x) * cosec, y: jbaseNode.y + jSectionPoint.bottomPlate[0].y - jSectionPoint.lWeb[2].y }
  let iBottomNode1 = { x: iSectionPoint.bottomPlate[1].x * cosec, y: iSectionPoint.bottomPlate[1].y }
  let iBottomNode = { x: iSectionPoint.rWeb[3].x * cosec, y: iSectionPoint.rWeb[3].y }

  let a = (jBottomNode1.y - iBottomNode1.y) / (jBottomNode1.x - iBottomNode1.x)

  let iTopNode2 = { x: ibaseNode.x + connectorLength, y: ibaseNode.y + connectorLength * gradient }
  let iBottomNode2 = { x: iTopNode2.x, y: iBottomNode1.y + a * (iTopNode2.x - iBottomNode1.x) }
  let jTopNode2 = { x: jbaseNode.x - connectorLength, y: jbaseNode.y - connectorLength * gradient }
  let jBottomNode2 = { x: jTopNode2.x, y: iBottomNode1.y + a * (jTopNode2.x - iBottomNode1.x) }

  let leftConnectorWeb = [
    ibaseNode,
    iTopNode1,
    iTopNode2,
    iBottomNode2,
    iBottomNode1,
    iBottomNode,
  ]
  result['leftConnectorWeb'] = {
    points: leftConnectorWeb,
    Thickness: xbeamSection.webThickness,
    z: -xbeamSection.webThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: Math.acos(iCos),
    hole: [],
    point: iPoint
  }
  let rightConnectorWeb = [
    jbaseNode,
    jTopNode1,
    jTopNode2,
    jBottomNode2,
    jBottomNode1,
    jBottomNode,
  ]
  result['rightConnectorWeb'] = {
    points: rightConnectorWeb,
    Thickness: xbeamSection.webThickness,
    z: -xbeamSection.webThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: Math.acos(iCos),
    hole: [],
    point: iPoint
  }
  let cbWeb = [
    iTopNode2,
    iBottomNode2,
    jBottomNode2,
    jTopNode2
  ]
  result['cbWeb'] = {
    points: cbWeb,
    Thickness: xbeamSection.webThickness,
    z: -xbeamSection.webThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: Math.acos(iCos),
    hole: [],
    point: iPoint
  }
  // console.log('icos:', iCos) 
  let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2)
  data = [cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  
  let webHeight = ((iTopNode2.y - iBottomNode2.y) + (jTopNode2.y - jBottomNode2.y)) / 2
  let section = [upperFlangeWidth, upperFlangeThickness, lowerFlangeWidth, lowerFlangeThickness, webHeight, webThickness]
  return { result, data, section }
}

export function XbeamSectionK(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection, sectionDB) {
  const result = {};
  let data = [];
  //K형가로보는 skew를 허용하지 않고 생성됨.
  const topOffset = xbeamSection.topOffset
  const bottomOffset = xbeamSection.bottomOffset
  const gussetThickness = xbeamSection.gussetThickness
  const gussetBondingLength = xbeamSection.gussetBondingLength
  const gussetWeldingOffset = xbeamSection.gussetWeldingOffset
  const gussetTopWidth = xbeamSection.gussetTopWidth
  const gussetBottomWidth = xbeamSection.gussetBottomWidth
  const gussetCenterWidth = xbeamSection.gussetCenterWidth
  let hFrameEndOffset = xbeamSection.hFrameEndOffset
  let diaFrameEndOffset = xbeamSection.diaFrameEndOffset
  let tFrame = xbeamSection.tFrameName
  let bFrame = xbeamSection.bFrameName
  let dFrame = xbeamSection.dFrameName
  const pts1 = PTS(tFrame, true, 1, sectionDB)
  const pts2 = PTS(bFrame, true, 1, sectionDB)
  const pts3 = PTS(dFrame, true, 1, sectionDB)


  let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1])
  let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[1])

  let length = Math.sqrt((jTopNode.x - iTopNode.x) ** 2 + (jTopNode.y - iTopNode.y) ** 2)
  let xlength = Math.abs(jTopNode.x - iTopNode.x)
  let vec = { x: (jTopNode.x - iTopNode.x) / length, y: (jTopNode.y - iTopNode.y) / length }
  let grd = (jTopNode.z - iTopNode.z) / length
  let grdSec = Math.sqrt(1 + grd ** 2)

  let centerPoint = {
    x: (iTopNode.x + jTopNode.x) / 2,
    y: (iTopNode.y + jTopNode.y) / 2,
    z: (iTopNode.z + jTopNode.z) / 2,
    normalCos: vec.x,
    normalSin: vec.y,
  }

  const iCot = (iSectionPoint.rWeb[1].x - iSectionPoint.rWeb[0].x) / (iSectionPoint.rWeb[1].y - iSectionPoint.rWeb[0].y)
  const jCot = (jSectionPoint.lWeb[1].x - jSectionPoint.lWeb[0].x) / (jSectionPoint.lWeb[1].y - jSectionPoint.lWeb[0].y)
  let iheight = iSectionPoint.rWeb[1].y - iSectionPoint.rWeb[0].y
  let jheight = jSectionPoint.rWeb[1].y - jSectionPoint.rWeb[0].y
  let points = [
    { x: -xlength / 2 - topOffset * iCot, y: -xlength / 2 * grd - topOffset },
    { x: xlength / 2 - topOffset * jCot, y: xlength / 2 * grd - topOffset },
    { x: xlength / 2 - (jheight - bottomOffset) * jCot, y: xlength / 2 * grd - (jheight - bottomOffset) },
    { x: -xlength / 2 - (iheight - bottomOffset) * iCot, y: -xlength / 2 * grd - (iheight - bottomOffset) },
  ]
  let bottomCenter = { x: (points[2].x + points[3].x) / 2, y: (points[2].y + points[3].y) / 2 }
  let topFrame = Kframe(points[0], points[1], hFrameEndOffset, hFrameEndOffset, pts1)
  let bottomFrame = Kframe(points[3], points[2], hFrameEndOffset, hFrameEndOffset, pts2)
  let leftFrame = Kframe(points[0], bottomCenter, diaFrameEndOffset, diaFrameEndOffset, pts3)
  let rightFrame = Kframe(bottomCenter, points[1], diaFrameEndOffset, diaFrameEndOffset, pts3)

  let topVec = Vector(points[0], points[1])
  let leftVec = Vector(points[0], bottomCenter)
  let rightVec = Vector(bottomCenter, points[1])
  let bottomVec = Vector(points[3], points[2])

  let leftTopGussetPlate = [
    { x: -xlength / 2 - gussetWeldingOffset * iCot, y: -xlength / 2 * grd - gussetWeldingOffset },
    XYOffset(points[0], topVec, hFrameEndOffset + gussetBondingLength, pts1[0] + gussetWeldingOffset),
    XYOffset(points[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[0] + gussetWeldingOffset),
    XYOffset(points[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[3] - gussetWeldingOffset),
    { x: -xlength / 2 - (gussetWeldingOffset + gussetTopWidth) * iCot, y: -xlength / 2 * grd - (gussetWeldingOffset + gussetTopWidth) },
  ]
  result['centerGusset'] = {
    points: [
      XYOffset(bottomCenter, bottomVec, -gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
      XYOffset(bottomCenter, bottomVec, gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
      XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
      XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
      XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
      XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
    ],
    Thickness: gussetThickness,
    z: -gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['leftTopGusset'] = {
    points: leftTopGussetPlate,
    Thickness: gussetThickness,
    z: -gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['rightTopGusset'] = {
    points: [
      { x: xlength / 2 - gussetWeldingOffset * jCot, y: xlength / 2 * grd - gussetWeldingOffset },
      XYOffset(points[1], topVec, -(hFrameEndOffset + gussetBondingLength), pts1[0] + gussetWeldingOffset),
      XYOffset(points[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
      XYOffset(points[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
      { x: xlength / 2 - (gussetWeldingOffset + gussetTopWidth) * jCot, y: xlength / 2 * grd - (gussetWeldingOffset + gussetTopWidth) },
    ],
    Thickness: gussetThickness,
    z: -gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['leftBottomGusset'] = {
    points: [
      { x: -xlength / 2 - (iheight - gussetWeldingOffset) * iCot, y: -xlength / 2 * grd - (iheight - gussetWeldingOffset) },
      XYOffset(points[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[3] - gussetWeldingOffset),
      XYOffset(points[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[0] + gussetWeldingOffset),
      { x: -xlength / 2 - (iheight - gussetWeldingOffset - gussetBottomWidth) * iCot, y: -xlength / 2 * grd - (iheight - gussetWeldingOffset - gussetBottomWidth) },
    ],
    Thickness: gussetThickness,
    z: -gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }

  result['rightBottomGusset'] = {
    points: [
      { x: xlength / 2 - (jheight - gussetWeldingOffset) * jCot, y: xlength / 2 * grd - (jheight - gussetWeldingOffset) },
      XYOffset(points[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[3] - gussetWeldingOffset),
      XYOffset(points[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[0] + gussetWeldingOffset),
      { x: xlength / 2 - (jheight - gussetWeldingOffset - gussetBottomWidth) * jCot, y: xlength / 2 * grd - (jheight - gussetWeldingOffset - gussetBottomWidth) },
    ],
    Thickness: gussetThickness,
    z: -gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }

  result['topFrame1'] = {
    points: topFrame[0],
    Thickness: pts1[4],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['topFrame2'] = {
    points: topFrame[1],
    Thickness: pts1[5],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  // console.log(result)

  result['bottomFrame1'] = {
    points: bottomFrame[0],
    Thickness: pts2[4],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['bottomFrame2'] = {
    points: bottomFrame[1],
    Thickness: pts2[5],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }

  result['leftFrame1'] = {
    points: leftFrame[0],
    Thickness: pts3[4],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['leftFrame2'] = {
    points: leftFrame[1],
    Thickness: pts3[5],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['righttFrame1'] = {
    points: rightFrame[0],
    Thickness: pts3[4],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  result['rightFrame2'] = {
    points: rightFrame[1],
    Thickness: pts3[5],
    z: gussetThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: [],
    point: centerPoint
  }
  let dummyPoints = [...points, bottomCenter]
  dummyPoints.forEach(function (elem) { data.push(ToGlobalPoint(centerPoint, elem)) })
  let section = [tFrame, bFrame, dFrame];   //사용자로부터 받은 단면요소의 값을 객체로 저장
  return { result, data, section }
}