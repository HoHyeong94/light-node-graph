import { ToGlobalPoint, PlateRestPoint, Kframe, XYOffset, Vector, scallop, Fillet2D } from "../geometryModule"
import { PTS } from "../DB/module"
import { vPlateGen, hPlateGen, hPlateSide2D } from "../stiffner/module"
import { IbeamJoint } from "../splice/module"

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
      xbeamSectionDict[iNodekey + jNodekey] = xbeam.result
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
      xbeamSectionDict[iNodekey + jNodekey] = xbeam.result
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
      xbeamSectionDict[iNodekey + jNodekey] = xbeam.result
      xbData = xbeam.data
      xbSection = xbeam.section
    } else if (xbeamLayout[i][section] == "DYXbeam2") {
      let xbeam = DYXbeam2(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection,
      );
      xbeamSectionDict[iNodekey + jNodekey] = xbeam.result
      xbData = xbeam.data
      xbSection = xbeam.section
    } else if (xbeamLayout[i][section] == "DYXbeam3") {
      let xbeam = DYXbeam3(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection,
      );
      xbeamSectionDict[iNodekey + jNodekey] = xbeam.result
      xbData = xbeam.data
      xbSection = xbeam.section
    } else if (xbeamLayout[i][section] == "DYXbeam4") {
      let xbeam = DYXbeam4(
        iPoint,
        jPoint,
        iSectionPoint,
        jSectionPoint,
        xbeamSection,
      );
      xbeamSectionDict[iNodekey + jNodekey] = xbeam.result
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

export function DYXbeam4(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
  let xs = {
    bracketLength: 541,
    bracketWidth: 450,
    bracketFilletR: 100,
    lflangeHeight: 300,
    webHeight: 576,
    webThickness: 12,
    flangeWidth: 250,
    flangeThickness: 12,
    stiffThickness: 12,
    stiffWidth: 150,
    scallopRadius: 25,
    webJointThickness: 10,
    webJointWidth: 330,
    webJointHeight: 440,
    flangeJointThickness: 10,
    flangeJointLength: 480,
    flangeJointWidth: 80,
  }
  let wBolt = {
    P: 90,
    G: 75,
    pNum: 5,
    gNum: 2,
    size: 37,
    dia: 22,
    t: 14,
  }
  let fBolt = {
    P: 170,
    G: 75,
    pNum: 2,
    gNum: 3,
    size: 37,
    dia: 22,
    t: 14,
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
    offset: (iPoint.offset + jPoint.offset) / 2,
  }
  let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
  centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;
  const rotationY = (centerPoint.skew - 90) * Math.PI / 180

  //폐합시를 고려하여 예외처리 필요
  let ufl, ufr
  if (iSectionPoint.uflange[2].length > 0) {
    ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
  } else {
    ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
  }
  if (jSectionPoint.uflange[2].length > 0) {
    ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
  } else {
    ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
  }

  let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
  let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
  let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
  let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

  let uGradient = (ufr.y - ufl.y) / (ufr.x - ufl.x);
  let lGradient = (br.y - bl.y) / (br.x - bl.x);
  let uRad = -Math.atan(uGradient)
  let lRad = -Math.atan(lGradient)

  let lwebPlate = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight }, { x: bl.x, y: bl.y + xs.webHeight + xs.lflangeHeight }, lGradient, lGradient, xs.bracketLength)
  result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0,3], [0,3,2,1]);
  let lstiff = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight - xs.flangeThickness }, bl, lGradient, 0, xs.stiffWidth);
  let lstiff2 = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight + xs.webHeight + xs.flangeThickness }, tl, lGradient, uGradient, xs.stiffWidth);
  result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);
  result["lstiff2"] = vPlateGen(lstiff2, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

  let rwebPlate = PlateRestPoint({ x: br.x, y: br.y + xs.lflangeHeight }, { x: br.x, y: br.y + xs.webHeight + xs.lflangeHeight }, lGradient, lGradient, -xs.bracketLength)
  result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0,3], [0,3,2,1]);
  let rstiff = PlateRestPoint({ x: br.x, y: br.y + xs.lflangeHeight - xs.flangeThickness }, br, lGradient, 0, -xs.stiffWidth);
  let rstiff2 = PlateRestPoint({ x: br.x, y: br.y + xs.lflangeHeight + xs.webHeight + xs.flangeThickness }, tr, lGradient, uGradient, -xs.stiffWidth);
  result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);
  result["rstiff2"] = vPlateGen(rstiff2, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);


  let bracketPoint = [lwebPlate[0], rwebPlate[0], lwebPlate[1], rwebPlate[1]];
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let grad = lRad;
    let bracketLength = xs.bracketLength;
    let z = i < 2 ? - xs.flangeThickness : 0;
    let thickness = i < 2? -xs.flangeThickness : xs.flangeThickness
    let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
    { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, z, centerPoint.skew, 0, grad,
          hPlateSide2D(0, sign * bracketLength / Math.cos(grad), thickness, 0, bracketPoint[i], grad, Math.PI / 2 + grad, Math.PI / 2 + grad), false, false)
    
    // result["bracket" + i.toFixed(0)] = {
    //   points: bracketShape,
    //   Thickness: xs.flangeThickness,
    //   z: z,
    //   rotationX: 0,
    //   rotationY: grad,
    //   hole: [],
    //   point: bracketPoint[i],
    //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    // }
  }
  let webPlate = [lwebPlate[3], rwebPlate[3], rwebPlate[2], lwebPlate[2]]
  result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2,3], [0,1,2,3]);
  let uPoint = ToGlobalPoint(centerPoint, lwebPlate[2])
  let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2)
  let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
  result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, lRad,
    hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), true, [0, 1]);
  let lPoint = ToGlobalPoint(centerPoint, lwebPlate[3])
  let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2)
  let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
  result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
    hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[3], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);
  let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt)
  for (let i in joint) { result[i] = joint[i] }
  let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
  ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })];
  let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];
  return { result, data, section }
}

export function DYXbeam3(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
  let xs = {
    bracketLength: 554,
    bracketWidth: 450,
    bracketFilletR: 100,
    webHeight: 576,
    webThickness: 12,
    flangeWidth: 250,
    flangeThickness: 12,
    stiffThickness: 12,
    stiffWidth: 150,
    stiffWidth2: 300,
    stiffFilletR: 200,
    scallopRadius: 25,
    webJointThickness: 10,
    webJointWidth: 330,
    webJointHeight: 440,
    flangeJointThickness: 10,
    flangeJointLength: 480,
    flangeJointWidth: 80,
  }
  let wBolt = {
    P: 90,
    G: 75,
    pNum: 5,
    gNum: 2,
    size: 37,
    dia: 22,
    t: 14,
  }
  let fBolt = {
    P: 170,
    G: 75,
    pNum: 2,
    gNum: 3,
    size: 37,
    dia: 22,
    t: 14,
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
    offset: (iPoint.offset + jPoint.offset) / 2
  }
  let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
  centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;
  const rotationY = (centerPoint.skew - 90) * Math.PI / 180

  //폐합시를 고려하여 예외처리 필요
  let ufl, ufr, lfl, lfr
  if (iSectionPoint.uflange[2].length > 0) {
    ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
  } else {
    ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
  }
  if (jSectionPoint.uflange[2].length > 0) {
    ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
  } else {
    ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
  }
  if (iSectionPoint.lflange[2].length > 0) {
    lfl = { x: iSectionPoint.lflange[2][1].x - dOffset, y: iSectionPoint.lflange[2][1].y - dz };
  } else {
    lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
  }
  if (jSectionPoint.lflange[2].length > 0) {
    lfr = { x: jSectionPoint.lflange[2][0].x + dOffset, y: jSectionPoint.lflange[2][0].y + dz };
  } else {
    lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };
  }

  let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
  let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
  let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
  let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

  let tGradient = (tr.y - tl.y) / (tr.x - tl.x);
  let uGradient = (br.y - bl.y) / (br.x - bl.x);
  let lGradient = (lfr.y - lfl.y) / (lfr.x - lfl.x);
  let uRad = -Math.atan(uGradient)
  let lRad = -Math.atan(lGradient)

  let lwebPlate = [{ x: bl.x, y: bl.y + xs.webHeight }, bl, lfl, { x: bl.x + xs.bracketLength, y: lfl.y + lGradient * (xs.bracketLength - (lfl.x - bl.x)) },
  { x: bl.x + xs.bracketLength, y: bl.y + xs.webHeight + uGradient * xs.bracketLength }]
  result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
  let lstiffPoint = [tl, { x: bl.x, y: bl.y + xs.webHeight + xs.flangeThickness }, { x: bl.x + xs.stiffWidth2, y: bl.y + xs.webHeight + xs.flangeThickness + uGradient * xs.stiffWidth2 },
    { x: bl.x + xs.stiffWidth2, y: bl.y + xs.webHeight + xs.flangeThickness + uGradient * xs.stiffWidth2 + 50 },
    { x: bl.x + xs.stiffWidth, y: bl.y + xs.webHeight + xs.flangeThickness + uGradient * xs.stiffWidth2 + (xs.stiffWidth2 - xs.stiffWidth) + 50 },
    { x: tl.x + xs.stiffWidth, y: tl.y + tGradient * xs.stiffWidth }]
  let lstiff = [];
  lstiff.push(...scallop(lstiffPoint[5], lstiffPoint[0], lstiffPoint[1], xs.scallopRadius, 4))
  lstiff.push(...scallop(lstiffPoint[0], lstiffPoint[1], lstiffPoint[2], xs.scallopRadius, 4))
  lstiff.push(lstiffPoint[2], lstiffPoint[3])
  lstiff.push(...Fillet2D(lstiffPoint[3], lstiffPoint[4], lstiffPoint[5], xs.stiffFilletR, 4))
  lstiff.push(lstiffPoint[5])
  result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [], 0, null, null, []);

  let rwebPlate = [{ x: br.x, y: br.y + xs.webHeight }, br, lfr, { x: br.x - xs.bracketLength, y: lfr.y - lGradient * (xs.bracketLength - (br.x - lfr.x)) },
  { x: br.x - xs.bracketLength, y: br.y + xs.webHeight - uGradient * xs.bracketLength }]
  result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
  let rstiffPoint = [tr, { x: br.x, y: br.y + xs.webHeight + xs.flangeThickness }, { x: br.x - xs.stiffWidth2, y: br.y + xs.webHeight + xs.flangeThickness - uGradient * xs.stiffWidth2 },
    { x: br.x - xs.stiffWidth2, y: br.y + xs.webHeight + xs.flangeThickness - uGradient * xs.stiffWidth2 + 50 },
    { x: br.x - xs.stiffWidth, y: br.y + xs.webHeight + xs.flangeThickness - uGradient * xs.stiffWidth2 + (xs.stiffWidth2 - xs.stiffWidth) + 50 },
    { x: tr.x - xs.stiffWidth, y: tr.y - tGradient * xs.stiffWidth }]
  let rstiff = [];
  rstiff.push(...scallop(rstiffPoint[5], rstiffPoint[0], rstiffPoint[1], xs.scallopRadius, 4))
  rstiff.push(...scallop(rstiffPoint[0], rstiffPoint[1], rstiffPoint[2], xs.scallopRadius, 4))
  rstiff.push(rstiffPoint[2], rstiffPoint[3])
  rstiff.push(...Fillet2D(rstiffPoint[3], rstiffPoint[4], rstiffPoint[5], xs.stiffFilletR, 4))
  rstiff.push(rstiffPoint[5])
  result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [], 0, null, null, []);

  let bracketPoint = [lwebPlate[0], rwebPlate[0], lfl, lfr];
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let grad = i < 2 ? uRad : lRad;
    let z = i < 2 ? 0 : -xs.flangeThickness;
    let thickness = i < 2? xs.flangeThickness : - xs.flangeThickness
    let bracketLength = i < 2 ? xs.bracketLength : i === 2 ? xs.bracketLength - (ufl.x - tl.x) : xs.bracketLength - (tr.x - ufr.x);
    let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
    { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, z, centerPoint.skew, 0, grad,
          hPlateSide2D(0, sign * bracketLength / Math.cos(grad), thickness, 0, bracketPoint[i], grad, Math.PI / 2 + grad, Math.PI / 2 + grad), false, false)
  }
  let webPlate = [lwebPlate[3], rwebPlate[3], rwebPlate[4], lwebPlate[4]]
  result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2,3],[0, 1, 2, 3]);
  let uPoint = ToGlobalPoint(centerPoint, lwebPlate[4])
  let l = Math.sqrt((lwebPlate[4].x - rwebPlate[4].x) ** 2 + (lwebPlate[4].y - rwebPlate[4].y) ** 2)
  let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
  result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
    hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[4], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, [0, 1]);
  let lPoint = ToGlobalPoint(centerPoint, lwebPlate[3])
  let ll = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2)
  let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
  result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
    hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[3], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);

  let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt)
  for (let i in joint) { result[i] = joint[i] }

  let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
  ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })];
  let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];

  return { result, data, section }
}

export function DYXbeam2(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
  let xs = {
    bracketLength: 420,
    bracketWidth: 550,
    bracketFilletR: 150,
    webHeight: 878,
    webThickness: 12,
    flangeWidth: 250,
    flangeThickness: 12,
    stiffThickness: 12,
    stiffWidth: 100,
    scallopRadius: 25,
    webJointThickness: 10,
    webJointWidth: 330,
    webJointHeight: 780,
    flangeJointThickness: 10,
    flangeJointLength: 480,
    flangeJointWidth: 80,
  }
  let wBolt = {
    P: 100,
    G: 75,
    pNum: 8,
    gNum: 2,
    size: 37,
    dia: 22,
    t: 14,
  }
  let fBolt = {
    P: 170,
    G: 75,
    pNum: 2,
    gNum: 3,
    size: 37,
    dia: 22,
    t: 14,
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
    offset: (iPoint.offset + jPoint.offset) / 2
  }
  let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
  centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;
  const rotationY = (centerPoint.skew - 90) * Math.PI / 180
  const rightAngle = Math.PI / 2

  //폐합시를 고려하여 예외처리 필요
  let ufl, ufr
  if (iSectionPoint.uflange[2].length > 0) {
    ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
  } else {
    ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
  }
  if (jSectionPoint.uflange[2].length > 0) {
    ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
  } else {
    ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
  }
  // let lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
  // let lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };

  let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
  let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
  let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
  let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

  let uGradient = (ufr.y - ufl.y) / (ufr.x - ufl.x);
  let lGradient = (tr.y - tl.y) / (tr.x - tl.x);
  let uRad = -Math.atan(uGradient)
  let lRad = -Math.atan(lGradient)

  let lwebPlate = [tl, { x: tl.x, y: tl.y - xs.webHeight }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight + lGradient * xs.bracketLength },
    { x: tl.x + xs.bracketLength, y: ufl.y + uGradient * (xs.bracketLength - (ufl.x - tl.x)) }, ufl]
  result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
  let lstiff = [{ x: tl.x, y: tl.y - xs.webHeight - xs.flangeThickness }, bl, { x: bl.x + xs.stiffWidth, y: bl.y },
  { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight - xs.flangeThickness + lGradient * xs.bracketLength - 30 }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight - xs.flangeThickness + lGradient * xs.bracketLength }];
  result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

  let lL = Math.sqrt((lstiff[2].x - lstiff[3].x) ** 2 + (lstiff[2].y - lstiff[3].y) ** 2);
  let lrot = -Math.atan((lstiff[2].y - lstiff[3].y) / (lstiff[2].x - lstiff[3].x))
  let lPlate = [{ x: -lL / 2 + 30, y: 30 }, { x: -lL / 2 + 120, y: 60 }, { x: lL / 2 - 120, y: 60 }, { x: lL / 2 - 30, y: 30 }, { x: lL / 2 - 30, y: -30 }, { x: lL / 2 - 120, y: -60 }, { x: -lL / 2 + 120, y: -60 }, { x: -lL / 2 + 30, y: -30 }]
  let cp = { x: (lstiff[2].x + lstiff[3].x) / 2, y: (lstiff[2].y + lstiff[3].y) / 2 }
  result["lstiffPlate"] = hPlateGen(lPlate, ToGlobalPoint(centerPoint, cp), 12, -12, centerPoint.skew, 0, lrot,
    hPlateSide2D(-lL / 2, lL / 2, 12, -12, cp, lrot, rightAngle, rightAngle), false, false)

  let rwebPlate = [tr, { x: tr.x, y: tr.y - xs.webHeight }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - lGradient * xs.bracketLength },
    { x: tr.x - xs.bracketLength, y: ufr.y - uGradient * (xs.bracketLength - (tr.x - ufr.x)) }, ufr]
  result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], null);
  let rstiff = [{ x: tr.x, y: tr.y - xs.webHeight - xs.flangeThickness }, br, { x: br.x - xs.stiffWidth, y: br.y },
  { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - xs.flangeThickness - lGradient * xs.bracketLength - 30 }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - xs.flangeThickness - lGradient * xs.bracketLength }];

  PlateRestPoint({ x: tr.x, y: tr.y - xs.webHeight - xs.flangeThickness }, br, lGradient, 0, -xs.stiffWidth);
  result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

  let rL = Math.sqrt((rstiff[2].x - rstiff[3].x) ** 2 + (rstiff[2].y - rstiff[3].y) ** 2);
  let rrot = -Math.atan((rstiff[2].y - rstiff[3].y) / (rstiff[2].x - rstiff[3].x))
  let rPlate = [{ x: -rL / 2 + 30, y: 30 }, { x: -rL / 2 + 120, y: 60 }, { x: rL / 2 - 120, y: 60 }, { x: rL / 2 - 30, y: 30 }, { x: rL / 2 - 30, y: -30 }, { x: rL / 2 - 120, y: -60 }, { x: -rL / 2 + 120, y: -60 }, { x: -rL / 2 + 30, y: -30 }]
  let rcp = { x: (rstiff[2].x + rstiff[3].x) / 2, y: (rstiff[2].y + rstiff[3].y) / 2 }
  result["rstiffPlate"] = hPlateGen(rPlate, ToGlobalPoint(centerPoint, rcp), 12, -12, centerPoint.skew, 0, rrot,
    hPlateSide2D(-rL / 2, rL / 2, 12, -12, rcp, rrot, rightAngle, rightAngle), false, false)



  let bracketPoint = [lstiff[0], rstiff[0], ufl, ufr];
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let grad = i < 2 ? lRad : uRad;
    let bracketLength = i < 2 ? xs.bracketLength : i === 2 ? xs.bracketLength - (ufl.x - tl.x) : xs.bracketLength - (tr.x - ufr.x);
    let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 15, y: xs.bracketWidth / 2 }, { x: sign * 44, y: xs.bracketWidth / 2 - 82 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
    { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 44, y: -xs.bracketWidth / 2 + 82 }, { x: sign * 15, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    let th1 = i < 2 ? Math.PI / 2 + grad : rightAngle
    let top2D = i < 2 ? false : true;
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, 0, centerPoint.skew, 0, grad,
      hPlateSide2D(0, sign * bracketLength / Math.cos(grad), xs.flangeThickness, 0, bracketPoint[i], grad, th1, Math.PI / 2 + grad), top2D, false)
    // {
    //   points: bracketShape,
    //   Thickness: xs.flangeThickness,
    //   z: 0,
    //   rotationX: 0,
    //   rotationY: grad, 
    //   hole: [],
    //   point: bracketPoint[i],
    //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    // }
  }
  let webPlate = [lwebPlate[2], rwebPlate[2], rwebPlate[3], lwebPlate[3]]
  result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3]);
  let uPoint = ToGlobalPoint(centerPoint, lwebPlate[3]) //가로보 중심축을 기준으로 해야 측면도상의 중심단면이 반영됨. 추후 수정 필요
  let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2)
  let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
  result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
    hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[3], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, [0, 1]);
  let lPoint = ToGlobalPoint(centerPoint, lwebPlate[2])
  let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2)
  let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
  result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
    hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);

  let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt)
  for (let i in joint) { result[i] = joint[i] }

  let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
  ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })];
  let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];
  return { result, data, section }
}


export function DYXbeam1(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
  let xs = {
    bracketLength: 541,
    bracketWidth: 450,
    bracketFilletR: 100,
    webHeight: 578,
    webThickness: 12,
    flangeWidth: 250,
    flangeThickness: 12,
    stiffThickness: 12,
    stiffWidth: 150,
    scallopRadius: 25,
    webJointThickness: 10,
    webJointWidth: 330,
    webJointHeight: 440,
    flangeJointThickness: 10,
    flangeJointLength: 480,
    flangeJointWidth: 80,
  }
  let wBolt = {
    P: 90,
    G: 75,
    pNum: 5,
    gNum: 2,
    size: 37,
    dia: 22,
    t: 14,
  }
  let fBolt = {
    P: 170,
    G: 75,
    pNum: 2,
    gNum: 3,
    size: 37,
    dia: 22,
    t: 14,
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
    offset: (iPoint.offset + jPoint.offset) / 2
  }
  let cw = (centerPoint.normalCos * vec.y - centerPoint.normalSin * vec.x) > 0 ? 1 : -1; // 반시계방향의 경우 1
  centerPoint.skew = 90 + cw * Math.acos(centerPoint.normalCos * vec.x + centerPoint.normalSin * vec.y) * 180 / Math.PI;
  const rotationY = (centerPoint.skew - 90) * Math.PI / 180
  const rightAngle = Math.PI / 2

  let ufl, ufr
  if (iSectionPoint.uflange[2].length > 0) {
    ufl = { x: iSectionPoint.uflange[2][1].x - dOffset, y: iSectionPoint.uflange[2][1].y - dz };
  } else {
    ufl = { x: iSectionPoint.uflange[1][0].x - dOffset, y: iSectionPoint.uflange[1][0].y - dz };
  }
  if (jSectionPoint.uflange[2].length > 0) {
    ufr = { x: jSectionPoint.uflange[2][0].x + dOffset, y: jSectionPoint.uflange[2][0].y + dz };
  } else {
    ufr = { x: jSectionPoint.uflange[0][0].x + dOffset, y: jSectionPoint.uflange[0][0].y + dz };
  }
  // let lfl = { x: iSectionPoint.lflange[1][0].x - dOffset, y: iSectionPoint.lflange[1][0].y - dz };
  // let lfr = { x: jSectionPoint.lflange[0][0].x + dOffset, y: jSectionPoint.lflange[0][0].y + dz };

  let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
  let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
  let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
  let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

  let uGradient = (ufr.y - ufl.y) / (ufr.x - ufl.x);
  let lGradient = (tr.y - tl.y) / (tr.x - tl.x);
  let uRad = -Math.atan(uGradient)
  let lRad = -Math.atan(lGradient)

  let lwebPlate = [tl, { x: tl.x, y: tl.y - xs.webHeight }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight + lGradient * xs.bracketLength },
    { x: tl.x + xs.bracketLength, y: ufl.y + uGradient * (xs.bracketLength - (ufl.x - tl.x)) }, ufl]
  result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, []);
  let lstiff = PlateRestPoint({ x: tl.x, y: tl.y - xs.webHeight - xs.flangeThickness }, bl, lGradient, 0, xs.stiffWidth);
  result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

  let rwebPlate = [tr, { x: tr.x, y: tr.y - xs.webHeight }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - lGradient * xs.bracketLength },
    { x: tr.x - xs.bracketLength, y: ufr.y - uGradient * (xs.bracketLength - (tr.x - ufr.x)) }, ufr]
  result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, []);
  let rstiff = PlateRestPoint({ x: tr.x, y: tr.y - xs.webHeight - xs.flangeThickness }, br, lGradient, 0, -xs.stiffWidth);
  result["rstiff"] = vPlateGen(rstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

  let bracketPoint = [lstiff[0],rstiff[0], ufl, ufr];
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let grad = i < 2 ? lRad : uRad;
    let th1 = i < 2 ? Math.PI / 2 + grad : rightAngle
    let bracketLength = i < 2 ? xs.bracketLength : i === 2 ? xs.bracketLength - (ufl.x - tl.x) : xs.bracketLength - (tr.x - ufr.x);
    let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
    { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, 0, centerPoint.skew, 0, grad,
    hPlateSide2D(0, sign * bracketLength / Math.cos(grad), xs.flangeThickness, 0, bracketPoint[i], grad, th1, Math.PI / 2 + grad), false, false)
    // {
    //   points: bracketShape,
    //   Thickness: xs.flangeThickness,
    //   z: 0,
    //   rotationX: 0,
    //   rotationY: grad,
    //   hole: [],
    //   point: bracketPoint[i],
    //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    // }
  }
  let webPlate = [lwebPlate[2], rwebPlate[2], rwebPlate[3], lwebPlate[3]]
  result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, []);
  let uPoint = ToGlobalPoint(centerPoint, lwebPlate[3])
  let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2)
  let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
  result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
    hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[3], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, [0, 1]);
  let lPoint = ToGlobalPoint(centerPoint, lwebPlate[2])
  let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2)
  let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
  result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
    hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, [0, 1]);

  let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt)
  for (let i in joint) { result[i] = joint[i] }

  let data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
  ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })]; //[cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  
  // let webHeight = ((iTopNode2.y - iBottomNode2.y) + (jTopNode2.y - jBottomNode2.y))/2
  let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];// [upperFlangeWidth,upperFlangeThickness,lowerFlangeWidth,lowerFlangeThickness,webHeight, webThickness ]
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
  // let tlength = Math.sqrt((iPoint.x - jPoint.x) ** 2 + (iPoint.y - jPoint.y) ** 2)
  data = [ToGlobalPoint(iPoint, { x: (ibaseNode.x + iTopNode1.x) / 2, y: (ibaseNode.y + iTopNode1.y) / 2, z: (ibaseNode.z + iTopNode1.z) / 2 }),
  ToGlobalPoint(iPoint, { x: (jbaseNode.x + jTopNode1.x) / 2, y: (jbaseNode.y + jTopNode1.y) / 2, z: (jbaseNode.z + jTopNode1.z) / 2 })];
  //[cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  

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