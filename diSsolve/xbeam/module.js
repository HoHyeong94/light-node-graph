import { ToGlobalPoint, PlateRestPoint, Kframe, XYOffset, Vector2D, scallop, Fillet2D } from "../geometryModule"
import { PTS } from "../DB/module"
import { vPlateGen, hPlateGen, hPlateSide2D, hPlateGenV2, vFrameGen } from "../stiffner/module"
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
      let xbeam = XbeamI0(
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
      let xbeam = XbeamK0(
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
  result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], [0, 3, 2, 1]);
  let lstiff = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight - xs.flangeThickness }, bl, lGradient, 0, xs.stiffWidth);
  let lstiff2 = PlateRestPoint({ x: bl.x, y: bl.y + xs.lflangeHeight + xs.webHeight + xs.flangeThickness }, tl, lGradient, uGradient, xs.stiffWidth);
  result["lstiff"] = vPlateGen(lstiff, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);
  result["lstiff2"] = vPlateGen(lstiff2, centerPoint, xs.stiffThickness, [0, 1], xs.scallopRadius, null, null, []);

  let rwebPlate = PlateRestPoint({ x: br.x, y: br.y + xs.lflangeHeight }, { x: br.x, y: br.y + xs.webHeight + xs.lflangeHeight }, lGradient, lGradient, -xs.bracketLength)
  result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3], [0, 3, 2, 1]);
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
    let thickness = i < 2 ? -xs.flangeThickness : xs.flangeThickness
    let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
    { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    let top2D = i < 2 ? false : true;
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, z, centerPoint.skew, 0, grad,
      hPlateSide2D(0, sign * bracketLength / Math.cos(grad), thickness, 0, bracketPoint[i], grad, Math.PI / 2 + grad, Math.PI / 2 + grad), top2D, false)
  }
  let webPlate = [lwebPlate[3], rwebPlate[3], rwebPlate[2], lwebPlate[2]]
  result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3]);
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
    let thickness = i < 2 ? xs.flangeThickness : - xs.flangeThickness
    let bracketLength = i < 2 ? xs.bracketLength : i === 2 ? xs.bracketLength - (ufl.x - tl.x) : xs.bracketLength - (tr.x - ufr.x);
    let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.bracketWidth / 2 }, { x: sign * 20, y: xs.flangeWidth / 2 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
    { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.flangeWidth / 2 }, { x: sign * 20, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    let top2D = i < 2 ? true : false;
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, z, centerPoint.skew, 0, grad,
      hPlateSide2D(0, sign * bracketLength / Math.cos(grad), thickness, 0, bracketPoint[i], grad, Math.PI / 2 + grad, Math.PI / 2 + grad), top2D, false)
  }
  let webPlate = [lwebPlate[3], rwebPlate[3], rwebPlate[4], lwebPlate[4]]
  result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3]);
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

  let bracketPoint = [lstiff[0], rstiff[0], ufl, ufr];
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

export function XbeamI0(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection) {
  const result = {}
  let data = []
  // const connectorLength = xbeamSection.connectorLength
  // const connectorWidth = xbeamSection.connectorWidth
  // const upperFlangeThickness = xbeamSection.upperFlangeThickness
  // const upperFlangeWidth = xbeamSection.upperFlangeWidth
  const lowerFlangeThickness = xbeamSection.lowerFlangeThickness
  const lowerFlangeWidth = xbeamSection.lowerFlangeWidth
  const vStiffThickness = xbeamSection.vStiffThickness
  const vStiffBottomOffset = xbeamSection.vStiffBottomOffset
  const vStiffWidth = xbeamSection.vStiffWidth
  const vStiffendFillet = xbeamSection.vStiffendFillet
  // const webThickness = xbeamSection.webThickness
  const scallopRadius = xbeamSection.scallopRadius
  // 추후 변수정리 및 웹을 기준으로 하는 방법에서 하부플랜지 기준높이로 바꿔야 양측의 다이아프램과 매칭이 가능함
  let xs = {
    bracketLength: xbeamSection.connectorLength,
    bracketWidth: xbeamSection.connectorWidth,
    bracketFilletR: 100,
    webHeight: 1500,
    webThickness: xbeamSection.webThickness,
    flangeWidth: xbeamSection.upperFlangeWidth,
    flangeThickness: xbeamSection.upperFlangeThickness,
    stiffThickness: 12,
    stiffWidth: 150,
    scallopRadius: xbeamSection.scallopRadius,
    webJointThickness: 10,
    webJointWidth: 350,
    webJointHeight: 1380,
    flangeJointThickness: 10,
    flangeJointLength: 520,
    flangeJointWidth: 130,
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

  // let result = {};
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

  let lwCot = (tl.x - bl.x) / (tl.y - bl.y);
  let rwCot = (tr.x - br.x) / (tr.y - br.y);
  let lwebPlate = [tl, { x: tl.x - xs.webHeight * lwCot, y: tl.y - xs.webHeight }, { x: tl.x + xs.bracketLength, y: tl.y - xs.webHeight + lGradient * xs.bracketLength },
    { x: tl.x + xs.bracketLength, y: ufl.y + uGradient * (xs.bracketLength - (ufl.x - tl.x)) }, ufl]
  result["lweb"] = vPlateGen(lwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3]);

  let rwebPlate = [tr, { x: tr.x - xs.webHeight * rwCot, y: tr.y - xs.webHeight }, { x: tr.x - xs.bracketLength, y: tr.y - xs.webHeight - lGradient * xs.bracketLength },
    { x: tr.x - xs.bracketLength, y: ufr.y - uGradient * (xs.bracketLength - (tr.x - ufr.x)) }, ufr]
  result["rweb"] = vPlateGen(rwebPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [0, 3]);

  let bracketPoint = [{ x: tl.x - (xs.webHeight + xs.flangeThickness) * lwCot, y: tl.y - xs.webHeight - xs.flangeThickness },
  { x: tr.x - (xs.webHeight + xs.flangeThickness) * rwCot, y: tr.y - xs.webHeight - xs.flangeThickness }, ufl, ufr];
  let bracketLengthList = [xs.bracketLength + (xs.webHeight + xs.flangeThickness) * lwCot,
  xs.bracketLength - (xs.webHeight + xs.flangeThickness) * rwCot,
  xs.bracketLength - (ufl.x - tl.x),
  xs.bracketLength - (tr.x - ufr.x)
  ];
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let grad = i < 2 ? lRad : uRad;
    let th1 = i < 2 ? Math.PI / 2 + grad : rightAngle
    let bracketLength = bracketLengthList[i];
    let lowerbracket1 = [{ x: 0, y: xs.bracketWidth / 2 }, { x: sign * 15, y: xs.bracketWidth / 2 }, { x: sign * 44, y: xs.bracketWidth / 2 - 82 }, { x: sign * bracketLength, y: xs.flangeWidth / 2 },
    { x: sign * bracketLength, y: -xs.flangeWidth / 2 }, { x: sign * 44, y: -xs.bracketWidth / 2 + 82 }, { x: sign * 15, y: -xs.bracketWidth / 2 }, { x: 0, y: -xs.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], xs.bracketFilletR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], xs.bracketFilletR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    let top2D = i < 2 ? false : true;
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, ToGlobalPoint(centerPoint, bracketPoint[i]), xs.flangeThickness, 0, centerPoint.skew, 0, grad,
      hPlateSide2D(0, sign * bracketLength / Math.cos(grad), xs.flangeThickness, 0, bracketPoint[i], grad, th1, Math.PI / 2 + grad), top2D, false)
    //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let webPlate = [lwebPlate[2], rwebPlate[2], rwebPlate[3], lwebPlate[3]]
  result["web"] = vPlateGen(webPlate, centerPoint, xs.webThickness, [], 0, null, null, [], [2, 3]);
  let uPoint = ToGlobalPoint(centerPoint, lwebPlate[3])
  let l = Math.sqrt((lwebPlate[3].x - rwebPlate[3].x) ** 2 + (lwebPlate[3].y - rwebPlate[3].y) ** 2)
  let uflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: l, y: -xs.flangeWidth / 2 }, { x: l, y: xs.flangeWidth / 2 }];
  result["uflange"] = hPlateGen(uflangePlate, uPoint, xs.flangeThickness, 0, uPoint.skew, 0, uRad,
    hPlateSide2D(0, l, xs.flangeThickness, 0, lwebPlate[3], uRad, Math.PI / 2 + uRad, Math.PI / 2 + uRad), true, false);
  let lPoint = ToGlobalPoint(centerPoint, lwebPlate[2])
  let ll = Math.sqrt((lwebPlate[2].x - rwebPlate[2].x) ** 2 + (lwebPlate[2].y - rwebPlate[2].y) ** 2)
  let lflangePlate = [{ x: 0, y: xs.flangeWidth / 2 }, { x: 0, y: -xs.flangeWidth / 2 }, { x: ll, y: -xs.flangeWidth / 2 }, { x: ll, y: xs.flangeWidth / 2 }];
  result["lflange"] = hPlateGen(lflangePlate, lPoint, xs.flangeThickness, -xs.flangeThickness, uPoint.skew, 0, lRad,
    hPlateSide2D(0, ll, -xs.flangeThickness, 0, lwebPlate[2], lRad, Math.PI / 2 + lRad, Math.PI / 2 + lRad), false, false);

  let joint = IbeamJoint(webPlate, centerPoint, xs, wBolt, fBolt)
  for (let i in joint) { result[i] = joint[i] }

  data = [ToGlobalPoint(centerPoint, { x: (lwebPlate[0].x + lwebPlate[1].x) / 2, y: (lwebPlate[0].y + lwebPlate[1].y) / 2, z: (lwebPlate[0].z + lwebPlate[1].z) / 2 }),
  ToGlobalPoint(centerPoint, { x: (rwebPlate[0].x + rwebPlate[1].x) / 2, y: (rwebPlate[0].y + rwebPlate[1].y) / 2, z: (rwebPlate[0].z + rwebPlate[1].z) / 2 })]; //[cbWeb[0].x, tlength - cbWeb[3].x]; //임시 강역값 입력 20.03.24  by jhlim  
  // let webHeight = ((iTopNode2.y - iBottomNode2.y) + (jTopNode2.y - jBottomNode2.y))/2
  let section = [xs.flangeWidth, xs.flangeThickness, xs.flangeWidth, xs.flangeThickness, xs.webHeight, xs.webThickness];// [upperFlangeWidth,upperFlangeThickness,lowerFlangeWidth,lowerFlangeThickness,webHeight, webThickness ]
  let gradientX = (iPoint.gradientX + jPoint.gradientX) / 2
  let bottom = { x: (lwebPlate[2].x + rwebPlate[2].x) / 2, y: (lwebPlate[2].y + rwebPlate[2].y) / 2 }
  let top = { x: (ufl.x + ufr.x) / 2, y: (ufl.y + ufr.y) / 2 }
  let vStiffLength = top.y - bottom.y - vStiffBottomOffset
  let vStiffPlate = [{ x: 0, y: -xs.webThickness / 2 },
  { x: vStiffLength, y: -xs.webThickness / 2 },
  { x: vStiffLength, y: -xs.webThickness / 2 - vStiffWidth },
  { x: -(vStiffWidth) * gradientX, y: -xs.webThickness / 2 - vStiffWidth }]

  let vStiffTopFillet = Math.max(vStiffWidth - (xs.flangeWidth - xs.webThickness) / 2, 0)
  let vStiffPoint = []
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[1], vStiffPlate[0], vStiffPlate[3], scallopRadius, 4));
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[0], vStiffPlate[3], vStiffPlate[2], vStiffTopFillet, 1));
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[3], vStiffPlate[2], vStiffPlate[1], vStiffendFillet, 1));
  vStiffPoint.push(vStiffPlate[1])
  let ang90 = Math.PI / 2
  result['vStiffner'] = hPlateGenV2(vStiffPoint, centerPoint, top, vStiffThickness, -vStiffThickness / 2, centerPoint.skew, 0, ang90, ang90, ang90, true, null)
  return { result, data, section }
}

export function XbeamK0(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection, sectionDB) {
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
  const hFrameEndOffset = xbeamSection.hFrameEndOffset
  const diaFrameEndOffset = xbeamSection.diaFrameEndOffset
  const tFrame = xbeamSection.tFrameName
  const bFrame = xbeamSection.bFrameName
  const dFrame = xbeamSection.dFrameName
  const pts1 = PTS(tFrame, true, 1, sectionDB)
  const pts2 = PTS(bFrame, true, 1, sectionDB)
  const pts3 = PTS(dFrame, true, 1, sectionDB)


  let wBolt = {
    dia: 22,
    size: 37,
    t: 14,
  }

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

  let tl = { x: iSectionPoint.web[1][2].x - dOffset, y: iSectionPoint.web[1][2].y - dz };
  let tr = { x: jSectionPoint.web[0][2].x + dOffset, y: jSectionPoint.web[0][2].y + dz };
  let bl = { x: iSectionPoint.web[1][3].x - dOffset, y: iSectionPoint.web[1][3].y - dz };
  let br = { x: jSectionPoint.web[0][3].x + dOffset, y: jSectionPoint.web[0][3].y + dz };

  const iCot = (tl.x - bl.x) / (tl.y - bl.y)
  const jCot = (tr.x - br.x) / (tr.y - br.y)
  let framePoints = [ //frame 기준 포인트
    { x: tl.x - topOffset * iCot, y: tl.y - topOffset },
    { x: tr.x - topOffset * jCot, y: tr.y - topOffset },
    { x: br.x + bottomOffset * jCot, y: br.y + bottomOffset },
    { x: bl.x + bottomOffset * iCot, y: bl.y + bottomOffset },
  ]
  let bottomCenter = { x: (framePoints[2].x + framePoints[3].x) / 2, y: (framePoints[2].y + framePoints[3].y) / 2 }
  let topFrame = Kframe(framePoints[0], framePoints[1], hFrameEndOffset, hFrameEndOffset, pts1)
  let bottomFrame = Kframe(framePoints[3], framePoints[2], hFrameEndOffset, hFrameEndOffset, pts2)
  let leftFrame = Kframe(framePoints[0], bottomCenter, diaFrameEndOffset, diaFrameEndOffset, pts3)
  let rightFrame = Kframe(bottomCenter, framePoints[1], diaFrameEndOffset, diaFrameEndOffset, pts3)

  let topVec = Vector2D(framePoints[0], framePoints[1])
  let leftVec = Vector2D(framePoints[0], bottomCenter)
  let rightVec = Vector2D(bottomCenter, framePoints[1])
  let bottomVec = Vector2D(framePoints[3], framePoints[2])

  let boltLayout = [
    XYOffset(framePoints[0], topVec, hFrameEndOffset + 40, (pts1[0] + pts1[3]) / 2),
    XYOffset(framePoints[0], topVec, hFrameEndOffset + 120, (pts1[0] + pts1[3]) / 2),
    XYOffset(framePoints[0], topVec, hFrameEndOffset + 200, (pts1[0] + pts1[3]) / 2),
    XYOffset(framePoints[1], topVec, -hFrameEndOffset - 40, (pts1[0] + pts1[3]) / 2),
    XYOffset(framePoints[1], topVec, -hFrameEndOffset - 120, (pts1[0] + pts1[3]) / 2),
    XYOffset(framePoints[1], topVec, -hFrameEndOffset - 200, (pts1[0] + pts1[3]) / 2),
    XYOffset(framePoints[0], leftVec, diaFrameEndOffset + 40, (pts2[0] + pts2[3]) / 2),
    XYOffset(framePoints[0], leftVec, diaFrameEndOffset + 120, (pts2[0] + pts2[3]) / 2),
    XYOffset(framePoints[0], leftVec, diaFrameEndOffset + 200, (pts2[0] + pts2[3]) / 2),
    // XYOffset(framePoints[0],leftVec, diaFrameEndOffset + 280, (pts2[0]+pts2[3])/2 ),
    XYOffset(framePoints[1], rightVec, -diaFrameEndOffset - 40, (pts2[0] + pts2[3]) / 2),
    XYOffset(framePoints[1], rightVec, -diaFrameEndOffset - 120, (pts2[0] + pts2[3]) / 2),
    XYOffset(framePoints[1], rightVec, -diaFrameEndOffset - 200, (pts2[0] + pts2[3]) / 2),
    // XYOffset(framePoints[1],rightVec, -diaFrameEndOffset - 280, (pts2[0]+pts2[3])/2 ),
    XYOffset(framePoints[3], bottomVec, hFrameEndOffset + 40, (pts3[0] + pts3[3]) / 2),
    XYOffset(framePoints[3], bottomVec, hFrameEndOffset + 120, (pts3[0] + pts3[3]) / 2),
    XYOffset(framePoints[3], bottomVec, hFrameEndOffset + 200, (pts3[0] + pts3[3]) / 2),
    // XYOffset(framePoints[3],bottomVec, hFrameEndOffset + 280, (pts3[0]+pts3[3])/2 ),
    XYOffset(framePoints[2], bottomVec, -hFrameEndOffset - 40, (pts3[0] + pts3[3]) / 2),
    XYOffset(framePoints[2], bottomVec, -hFrameEndOffset - 120, (pts3[0] + pts3[3]) / 2),
    XYOffset(framePoints[2], bottomVec, -hFrameEndOffset - 200, (pts3[0] + pts3[3]) / 2),
    // XYOffset(framePoints[2],bottomVec, -hFrameEndOffset - 280, (pts3[0]+pts3[3])/2 ),
  ]
  let boltLayout2 = []
  boltLayout.forEach(elem => boltLayout2.push([elem.x, elem.y]))
  let Bolt = {
    size: wBolt.size, dia: wBolt.dia, t: wBolt.t, l: gussetThickness * 2,
    layout: boltLayout2, isUpper: false
  };
  let centerGusset = [
    XYOffset(bottomCenter, bottomVec, -gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
    XYOffset(bottomCenter, bottomVec, gussetCenterWidth / 2, pts2[3] - gussetWeldingOffset),
    XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
    XYOffset(bottomCenter, rightVec, (diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
    XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
    XYOffset(bottomCenter, leftVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
  ];
  result['centerGusset'] = vPlateGen(centerGusset, centerPoint, gussetThickness, [], 0, null, null, [], [3, 4], null);
  result['centerGusset']['bolt'] = Bolt
  let leftTopGusset = [
    { x: tl.x - gussetWeldingOffset * iCot, y: tl.y - gussetWeldingOffset },
    XYOffset(framePoints[0], topVec, hFrameEndOffset + gussetBondingLength, pts1[0] + gussetWeldingOffset),
    XYOffset(framePoints[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[0] + gussetWeldingOffset),
    XYOffset(framePoints[0], leftVec, diaFrameEndOffset + gussetBondingLength, pts3[3] - gussetWeldingOffset),
    { x: tl.x - (gussetWeldingOffset + gussetTopWidth) * iCot, y: tl.y - (gussetWeldingOffset + gussetTopWidth) },
  ];
  result['leftTopGusset'] = vPlateGen(leftTopGusset, centerPoint, gussetThickness, [], 0, null, null, [], [0, 2], null)
  let rightTopGusset = [
    { x: tr.x - gussetWeldingOffset * jCot, y: tr.y - gussetWeldingOffset },
    XYOffset(framePoints[1], topVec, -(hFrameEndOffset + gussetBondingLength), pts1[0] + gussetWeldingOffset),
    XYOffset(framePoints[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[0] + gussetWeldingOffset),
    XYOffset(framePoints[1], rightVec, -(diaFrameEndOffset + gussetBondingLength), pts3[3] - gussetWeldingOffset),
    { x: tr.x - (gussetWeldingOffset + gussetTopWidth) * jCot, y: tr.y - (gussetWeldingOffset + gussetTopWidth) },
  ];
  result['rightTopGusset'] = vPlateGen(rightTopGusset, centerPoint, gussetThickness, [], 0, null, null, [], [0, 2], null)
  let leftBottomGusset = [
    { x: bl.x + gussetWeldingOffset * iCot, y: bl.y + gussetWeldingOffset },
    XYOffset(framePoints[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[3] - gussetWeldingOffset),
    XYOffset(framePoints[3], bottomVec, hFrameEndOffset + gussetBondingLength, pts2[0] + gussetWeldingOffset),
    { x: bl.x + (gussetWeldingOffset + gussetBottomWidth) * iCot, y: bl.y + (gussetWeldingOffset + gussetBottomWidth) },
  ];
  result['leftBottomGusset'] = vPlateGen(leftBottomGusset, centerPoint, gussetThickness, [], 0, null, null, [], null, null)
  let rightBottomGusset = [
    { x: br.x + gussetWeldingOffset * jCot, y: br.y + gussetWeldingOffset },
    XYOffset(framePoints[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[3] - gussetWeldingOffset),
    XYOffset(framePoints[2], bottomVec, -(hFrameEndOffset + gussetBondingLength), pts2[0] + gussetWeldingOffset),
    { x: br.x + (gussetWeldingOffset + gussetBottomWidth) * jCot, y: br.y + (gussetWeldingOffset + gussetBottomWidth) },
  ];
  result['rightBottomGusset'] = vPlateGen(rightBottomGusset, centerPoint, gussetThickness, [], 0, null, null, [], null, null)
  result['topFrame1'] = vFrameGen(topFrame[0], centerPoint, pts1[4], gussetThickness / 2, [0, 3, 1, 2], null)
  result['topFrame2'] = vFrameGen(topFrame[1], centerPoint, pts1[5], gussetThickness / 2, [0, 3, 1, 2], null)
  result['bottomFrame1'] = vFrameGen(bottomFrame[0], centerPoint, pts2[4], gussetThickness / 2, null, null)
  result['bottomFrame2'] = vFrameGen(bottomFrame[1], centerPoint, pts2[5], gussetThickness / 2, null, null)
  result['leftFrame1'] = vFrameGen(leftFrame[0], centerPoint, pts3[4], gussetThickness / 2, null, null)
  result['leftFrame2'] = vFrameGen(leftFrame[1], centerPoint, pts3[5], gussetThickness / 2, null, null)
  result['righttFrame1'] = vFrameGen(rightFrame[0], centerPoint, pts3[4], gussetThickness / 2, null, null)
  result['rightFrame2'] = vFrameGen(rightFrame[1], centerPoint, pts3[5], gussetThickness / 2, null, null)

  let dummyPoints = [...framePoints, bottomCenter]
  dummyPoints.forEach(function (elem) { data.push(ToGlobalPoint(centerPoint, elem)) })
  let section = [tFrame, bFrame, dFrame];   //사용자로부터 받은 단면요소의 값을 객체로 저장
  return { result, data, section }
}