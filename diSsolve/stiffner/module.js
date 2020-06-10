import { THREE } from "global";

import { ToGlobalPoint, PlateRestPoint, WebPoint, Kframe, scallop, Fillet2D, PlateSize, PlateSize2, PointLength } from "../geometryModule"
import { PTS } from "../DB/module"

export function DiaShapeDict(
  gridPoint,
  sectionPointDict,
  diaphragmLayout,
  diaphragmSectionList,
  sectionDB
) {
  const position = 0;
  const section = 1;
  let result = {};
  for (let i = 0; i < diaphragmLayout.length; i++) {
    let gridkey = diaphragmLayout[i][position];
    let diaSection = diaphragmSectionList[diaphragmLayout[i][section]];
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
    let lflange = sectionPointDict[gridkey].forward.lflange
    let uflange = sectionPointDict[gridkey].forward.uflange
    let skew = sectionPointDict[gridkey].forward.skew;
    let urib = sectionPointDict[gridkey].forward.input.Urib;
    let lrib = sectionPointDict[gridkey].forward.input.Lrib;
    if (diaphragmLayout[i][section] == "diaType1") {
      result[gridkey] = diaphragmSection(
        webPoints,
        skew,
        uflangePoints,
        diaSection,
        sectionDB
      );
    } else if (diaphragmLayout[i][section] == "diaType2") {
      result[gridkey] = diaphragmSection2(
        webPoints,
        skew,
        uflangePoints,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia0") {
      result[gridkey] = DYdia0(
        webPoints,
        skew,
        lflange,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia1") {
      result[gridkey] = DYdia1(
        webPoints,
        skew,
        uflangePoints,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia2") {
      result[gridkey] = DYdia2(
        webPoints,
        gridPoint[gridkey],
        skew,
        uflangePoints,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia3") {
      result[gridkey] = DYdia3(
        webPoints,
        gridPoint[gridkey],
        skew,
        uflange,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia4") {
      result[gridkey] = DYdia4(
        webPoints,
        gridPoint[gridkey],
        skew,
        urib,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia5") {
      result[gridkey] = DYdia5(
        webPoints,
        gridPoint[gridkey],
        urib,
        lrib,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia6") {
      result[gridkey] = DYdia6(
        webPoints,
        gridPoint[gridkey],
        urib,
        lrib,
        diaSection
      );
    }

    result[gridkey].point = gridPoint[gridkey];
  }

  return result;
}

export function VstiffShapeDict(
  gridPoint,
  sectionPointDict,
  vStiffLayout,
  vStiffSectionList,
  sectionDB
) {
  const position = 0;
  const section = 1;
  let result = {};
  for (let i = 0; i < vStiffLayout.length; i++) {
    let gridkey = vStiffLayout[i][position];
    let vSection = vStiffSectionList[vStiffLayout[i][section]];
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
    if (vStiffLayout[i][section] === "vStiffType1") {
      result[gridkey] = vStiffSection(webPoints, skew, uflangePoints, vSection, sectionDB);
    }
    else if (vStiffLayout[i][section] === "DYvStiff1") {
      result[gridkey] = DYVstiff1(webPoints, skew, uflangePoints, vSection)
    }
    result[gridkey].point = gridPoint[gridkey]
  }

  return result;
}

export function HBracingDict(
  pointDict,
  sectionPointDict,
  hBracingLayout,
  hBracingectionList,
  sectionDB
) {
  const from = 0;
  const to = 1;
  const leftToright = 2;
  const section = 3;
  const platelayout = 4;
  let hBracingDict = {};
  let hBracingPlateDict = {};
  let right = true;
  for (let i = 0; i < hBracingLayout.length; i++) {
    if (hBracingLayout[i][section] === "hBracingType1") {
      let hBSection = hBracingectionList[hBracingLayout[i][section]];
      let pk1 = hBracingLayout[i][from];
      let pk2 = hBracingLayout[i][to];
      let webPoints = [];
      if (hBracingLayout[i][leftToright]) {
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
      let point1 = pointDict[pk1];
      let point2 = pointDict[pk2];

      hBracingDict[pk1 + pk2] = hBracingSection(point1, point2, webPoints, hBSection, sectionDB);
      if (hBracingLayout[i][platelayout][0]) {
        right = hBracingLayout[i][leftToright] ? false : true;
        let webPoints1 = [
          sectionPointDict[pk1].forward.lWeb[0],
          sectionPointDict[pk1].forward.lWeb[1],
          sectionPointDict[pk1].forward.rWeb[0],
          sectionPointDict[pk1].forward.rWeb[1]
        ];
        hBracingPlateDict[pk1] = hBracingPlate(point1, right, webPoints1, hBSection);
      }
      if (hBracingLayout[i][platelayout][1]) {
        right = hBracingLayout[i][leftToright] ? true : false;
        let webPoints2 = [
          sectionPointDict[pk2].forward.lWeb[0],
          sectionPointDict[pk2].forward.lWeb[1],
          sectionPointDict[pk2].forward.rWeb[0],
          sectionPointDict[pk2].forward.rWeb[1]
        ];
        hBracingPlateDict[pk2] = hBracingPlate(point2, right, webPoints2, hBSection);
      }
    }
  }

  return { hBracingDict, hBracingPlateDict };
}


export function DYVstiff1(webPoints, skew, uflangePoint, ds) {
  //ds 입력변수
  let result = {};
  let dsi = {
    lowerSpacing: 50,
    stiffWidth: 150,
    stiffThickness: 12,
    scallopRadius: 35,
    chamfer: 130,
  } //  임시 입력변수

  const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const rotationY = (skew - 90) * Math.PI / 180
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)

  let lowerPoints = [
    { x: bl.x + lwCot * dsi.lowerSpacing, y: bl.y + dsi.lowerSpacing },
    { x: br.x + rwCot * dsi.lowerSpacing, y: br.y + dsi.lowerSpacing }
  ];

  let left = PlateRestPoint(lowerPoints[0], tl, 0, gradient, dsi.stiffWidth)
  let leftPoints = [];
  leftPoints.push(left[0])
  leftPoints.push(...scallop(left[0], left[1], left[2], dsi.scallopRadius, 4));
  leftPoints.push(left[2])
  leftPoints.push(...scallop(left[2], left[3], left[0], dsi.chamfer, 1));

  result["left"] = {
    points: leftPoints,
    Thickness: dsi.stiffThickness,
    z: -dsi.stiffThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let right = PlateRestPoint(lowerPoints[1], tr, 0, gradient, -dsi.stiffWidth)
  let rightPoints = [];
  rightPoints.push(right[0])
  rightPoints.push(...scallop(right[0], right[1], right[2], dsi.scallopRadius, 4));
  rightPoints.push(right[2])
  rightPoints.push(...scallop(right[2], right[3], right[0], dsi.chamfer, 1));

  result["rightLower"] = {
    points: rightPoints,
    Thickness: dsi.stiffThickness,
    z: -dsi.stiffThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  return result
}

export function DYdia6(webPoints, point, urib, lrib, ds) {
  let result = {};
  let dsi = {
    webThickness: 12,
    hstiffWidth: 270,
    hstiffWidth2: 200,
    hstiffThickness: 12,
    hstiffHeight: 610,
    scallopRadius: 35,
    ribHoleD: 42,
    ribHoleR: 25,
    holeBottomY: 550, //y축은 중앙이 기준
    holeCenterOffset: -679,
    holeWidth: 450,
    holeHeight: 700,
    holeFilletR: 100,
    holeStiffThickness: 10,
    holeStiffhl: 610,
    holeStiffvl: 860,
    holeStiffmargin: 20,
    holeStiffHeight: 100,
    supportStiffLayout: [-200, 0, 200],
    supportStiffWidth: 265,
    supportStiffThickness: 26,
  } //  임시 입력변수
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)

  let urib2 = urib
  urib2.ribHoleD = dsi.ribHoleD
  urib2.ribHoleR = dsi.ribHoleR
  let lrib2 = lrib
  lrib2.ribHoleD = dsi.ribHoleD
  lrib2.ribHoleR = dsi.ribHoleR
  lrib.type = 1; //하부리브 스캘럽

  let holeRect = [{ x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY }, { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY },
  { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight }, { x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight }];
  let holePoints = [];
  holePoints.push(...Fillet2D(holeRect[0], holeRect[1], holeRect[2], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[1], holeRect[2], holeRect[3], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[2], holeRect[3], holeRect[0], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[3], holeRect[0], holeRect[1], dsi.holeFilletR, 4));
  result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints);

  let holeCenter1 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness }
  let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
  { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
  result["hstiff1"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter1), dsi.holeStiffThickness, 0, point.skew, 0, 0)
  let holeCenter2 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }
  result["hstiff2"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter2), dsi.holeStiffThickness, 0, point.skew, 0, 0)
  let holeCenter3 = { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 },
  { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
  result["vstiff1"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter3), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2)
  let holeCenter4 = { x: + dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  result["vstiff2"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter4), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2)


  for (let i in dsi.supportStiffLayout) {
    let supportStiffCenter1 = { x: dsi.supportStiffLayout[i], y: tl.y + gradient * (dsi.supportStiffLayout[i] - tl.x) };
    let supportStiff1 = [{ x: 0, y: dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: dsi.webThickness / 2 },
    { x: supportStiffCenter1.y - bl.y, y: dsi.supportStiffWidth + dsi.webThickness / 2 }, { x: 0, y: dsi.supportStiffWidth + dsi.webThickness / 2 }];
    let supportStiff2 = [{ x: 0, y: -dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: -dsi.webThickness / 2 },
    { x: supportStiffCenter1.y - bl.y, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }, { x: 0, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }];
    result["supportStiff1" + i] = hPlateGen(supportStiff1, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2);
    result["supportStiff2" + i] = hPlateGen(supportStiff2, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2);
  }

  let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
  let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 }, { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
  { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }];
  result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
  let h11 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
  { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }];
  result["h11"] = hPlateGen(h11, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);

  let x1 = dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness;
  let x2 = dsi.supportStiffLayout[0] - dsi.supportStiffThickness/2;
  let x3 = dsi.supportStiffLayout[0] + dsi.supportStiffThickness/2;
  let x4 = dsi.supportStiffLayout[1] - dsi.supportStiffThickness/2;
  let x5 = dsi.supportStiffLayout[1] + dsi.supportStiffThickness/2;
  let x6 = dsi.supportStiffLayout[2] - dsi.supportStiffThickness/2;
  let x7 = dsi.supportStiffLayout[2] + dsi.supportStiffThickness/2;
  let x8 = br.x + rwCot * dsi.hstiffHeight;
  let w0 = dsi.webThickness / 2;
  let w1 = dsi.holeStiffHeight + dsi.webThickness / 2;
  let w2 = dsi.hstiffWidth2 + dsi.webThickness / 2;
  let w3 = dsi.hstiffWidth + dsi.webThickness / 2;
  
  let h2 = [[{ x: x1, y: -w1}, { x: x2, y: -w2 },{ x: x2, y: - w0},{ x: x1, y: - w0}],
  [{ x: x3, y: -w2}, { x: x4, y: -w2 },{ x: x4, y: - w0},{ x: x3, y: - w0}],
  [{ x: x5, y: -w2}, { x: x6, y: -w2 },{ x: x6, y: - w0},{ x: x5, y: - w0}],
  [{ x: x7, y: -w2}, { x: x8, y: -w3 },{ x: x8, y: - w0},{ x: x7, y: - w0}]];
  let h3 = [[{ x: x1, y: w1}, { x: x2, y: w2 },{ x: x2, y: w0},{ x: x1, y: w0}],
  [{ x: x3, y: w2}, { x: x4, y: w2 },{ x: x4, y: w0},{ x: x3, y: w0}],
  [{ x: x5, y: w2}, { x: x6, y: w2 },{ x: x6, y: w0},{ x: x5, y: w0}],
  [{ x: x7, y: w2}, { x: x8, y: w3 },{ x: x8, y: w0},{ x: x7, y: w0}]];
  let cpt = ToGlobalPoint(point, hStiffCenter)
  for (let i in h2){
  result["h2"+i] = hPlateGen(h2[i], cpt, dsi.hstiffThickness, 0, point.skew, 0, 0);
  result["h3"+i] = hPlateGen(h3[i], cpt, dsi.hstiffThickness, 0, point.skew, 0, 0);
  }
  return result
}

export function DYdia5(webPoints, point, urib, lrib, ds) {
  let result = {};
  let dsi = {
    webThickness: 12,
    hstiffWidth: 270,
    hstiffThickness: 12,
    hstiffHeight: 362,
    scallopRadius: 35,
    ribHoleD: 42,
    ribHoleR: 25,
    holeBottomY: 330, //y축은 중앙이 기준
    holeWidth: 700,
    holeHeight: 700,
    holeFilletR: 100,
    holeStiffThickness: 10,
    holeStiffhl: 860,
    holeStiffvl: 860,
    holeStiffmargin: 20,
    holeStiffHeight: 100,

  } //  임시 입력변수
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)

  let urib2 = urib
  urib2.ribHoleD = dsi.ribHoleD
  urib2.ribHoleR = dsi.ribHoleR
  let lrib2 = lrib
  lrib2.ribHoleD = dsi.ribHoleD
  lrib2.ribHoleR = dsi.ribHoleR
  lrib.type = 0; //하부리브 스캘럽
  let holeRect = [{ x: dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY }, { x: -dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY },
  { x: -dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight }, { x: dsi.holeWidth / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight }];
  let holePoints = [];
  holePoints.push(...Fillet2D(holeRect[0], holeRect[1], holeRect[2], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[1], holeRect[2], holeRect[3], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[2], holeRect[3], holeRect[0], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[3], holeRect[0], holeRect[1], dsi.holeFilletR, 4));
  result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints);

  let holeCenter1 = { x: 0, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness }
  let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
  { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
  result["hstiff1"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter1), dsi.holeStiffThickness, 0, point.skew, 0, 0)

  let holeCenter2 = { x: 0, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }
  result["hstiff2"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter2), dsi.holeStiffThickness, 0, point.skew, 0, 0)

  let holeCenter3 = { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 },
  { x: dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
  result["vstiff1"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter3), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2)

  let holeCenter4 = { x: dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  result["vstiff2"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter4), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2)

  let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
  let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 }, { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }
  ];
  result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);

  let h2 = [{ x: br.x + rwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 }, { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: br.x + rwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }
  ];
  result["h2"] = hPlateGen(h2, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);

  let h3 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }
  ];
  result["h3"] = hPlateGen(h3, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
  let h4 = [{ x: br.x + rwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: br.x + rwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }
  ];
  result["h4"] = hPlateGen(h4, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
  return result
}

export function DYdia4(webPoints, point, skew, urib, ds) {

  let result = {};
  let dsi = {
    webHeight: 576,//상부플렌지를 기준으로 보강재의 높이를 의미함, 명칭변경필요
    // lowerThickness: 12,
    // lowerWidth: 250,
    // upperThickness: 12,
    // upperWidth: 250,
    upperTopThickness: 10,
    upperTopWidth: 200,
    webThickness: 12,
    stiffWidth: 160,
    stiffThickness: 12,
    scallopRadius: 35,
    ribHoleD: 42,
    ribHoleR: 25,
  } //  임시 입력변수

  const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const rotationY = (point.skew - 90) * Math.PI / 180
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)
  const gradCos = (tr.x - tl.x) / Math.sqrt((tr.x - tl.x) ** 2 + (tr.y - tl.y) ** 2)
  // const gradSin = gradient * gradCos

  let upperPlate = [{ x: tl.x - lwCot * dsi.webHeight, y: tl.y - dsi.webHeight },
  { x: tr.x - rwCot * dsi.webHeight, y: tr.y - dsi.webHeight }, tr, tl]; // 첫번째 면이 rib에 해당되도록
  let urib2 = urib
  urib2.ribHoleD = dsi.ribHoleD
  urib2.ribHoleR = dsi.ribHoleR
  result["upperPlate"] = vPlateGen(upperPlate, point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, null, []);
  let centerPoint = ToGlobalPoint(point, { x: tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness), y: tl.y - dsi.webHeight - dsi.upperTopThickness });
  let l = (tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness) - (tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness))) / gradCos
  let upperTopPoints = [{ x: 0, y: - dsi.upperTopWidth / 2 }, { x: 0, y: dsi.upperTopWidth / 2 },
  { x: l, y: dsi.upperTopWidth / 2 }, { x: l, y: -dsi.upperTopWidth / 2 }]
  result["upperTopPlate"] = hPlateGen(upperTopPoints, centerPoint, dsi.upperTopThickness, 0, point.skew, 0, -Math.atan(gradient))
  let stiffnerPoint = [[bl, { x: tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness), y: tl.y - dsi.webHeight - dsi.upperTopThickness }],
  [br, { x: tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness), y: tr.y - dsi.webHeight - dsi.upperTopThickness }]];
  for (let i = 0; i < stiffnerPoint.length; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], 0, gradient, stiffWidth)
    result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, []);
  }

  return result
}


export function DYdia3(webPoints, point, skew, uflange, ds) {
  let result = {};
  let dsi = {
    webHeight: 576,//상부플렌지를 기준으로 보강재의 높이를 의미함, 명칭변경필요
    lowerThickness: 12,
    lowerWidth: 250,
    // upperHeight: 900,
    upperThickness: 12,
    upperWidth: 250,
    webThickness: 12,
    stiffWidth: 150,
    stiffThickness: 12,
    scallopRadius: 35,
    bracketWidth: 450,
    bracketLength: 529,
    bracketScallopR: 100,
    webJointWidth: 330,
    webJointHeight: 440,
    webJointThickness: 10,
    upperJointLength: 480,
    upperJointWidth: 80,
    upperJointThickness: 10,
    lowerJointLength: 480,
    lowerJointWidth: 80,
    lowerJointThickness: 10,
  } //  임시 입력변수

  const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const rotationY = (point.skew - 90) * Math.PI / 180
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)
  const gradCos = (tr.x - tl.x) / Math.sqrt((tr.x - tl.x) ** 2 + (tr.y - tl.y) ** 2)
  const gradSin = gradient * gradCos

  let upperPlate = [
    uflange[0][1],
    { x: uflange[0][1].x - gradSin * dsi.upperThickness, y: uflange[0][1].y + gradCos * dsi.upperThickness },
    { x: uflange[0][1].x - gradSin * dsi.upperThickness, y: uflange[0][1].y + gradCos * dsi.upperThickness },
    uflange[1][1]
  ]
  let lowerPlate = [
    { x: tl.x - lwCot * dsi.webHeight, y: tl.y - dsi.webHeight },
    { x: tl.x - lwCot * (dsi.webHeight + dsi.lowerThickness), y: tl.y - dsi.webHeight - dsi.lowerThickness },
    { x: tr.x - rwCot * (dsi.webHeight + dsi.lowerThickness), y: tr.y - dsi.webHeight - dsi.lowerThickness },
    { x: tr.x - rwCot * dsi.webHeight, y: tr.y - dsi.webHeight }
  ];

  let bracketPoint = [ToGlobalPoint(point, lowerPlate[1]),
  ToGlobalPoint(point, lowerPlate[2]),
  ToGlobalPoint(point, upperPlate[0]),
  ToGlobalPoint(point, upperPlate[3])];
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let bracketLength = i < 2 ? dsi.bracketLength : dsi.bracketLength - (uflange[0][1].x - tl.x);
    let lowerbracket1 = [{ x: 0, y: dsi.bracketWidth / 2 }, { x: sign * 100, y: dsi.bracketWidth / 2 }, { x: sign * 100, y: dsi.lowerWidth / 2 }, { x: sign * bracketLength, y: dsi.lowerWidth / 2 },
    { x: sign * bracketLength, y: -dsi.lowerWidth / 2 }, { x: sign * 100, y: -dsi.lowerWidth / 2 }, { x: sign * 100, y: -dsi.bracketWidth / 2 }, { x: 0, y: -dsi.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], dsi.bracketScallopR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], dsi.bracketScallopR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    result["bracket" + i.toFixed(0)] = {
      points: bracketShape,
      Thickness: i < 2 ? dsi.lowerThickness : dsi.upperThickness,
      z: 0,
      rotationX: 0,
      rotationY: -Math.atan(gradient),
      hole: [],
      point: bracketPoint[i],
      // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
  }

  let stiffnerPoint = [[bl, lowerPlate[0]], [br, lowerPlate[3]]];
  for (let i = 0; i < stiffnerPoint.length; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], 0, gradient, stiffWidth)
    let stiffnerPoints = [];
    stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
    stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
    stiffnerPoints.push(stiffner[2], stiffner[3])
    result["stiffner" + i.toFixed(0)] = {
      points: stiffnerPoints,
      Thickness: dsi.webThickness,
      z: -dsi.webThickness / 2,
      rotationX: Math.PI / 2,
      rotationY: rotationY,
      hole: [],
      // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
  }
  let webBracketPoint = [[lowerPlate[0], tl], [lowerPlate[3], tr]];
  for (let i = 0; i < webBracketPoint.length; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.bracketLength : -dsi.bracketLength;
    let stiffner = PlateRestPoint(webBracketPoint[i][0], webBracketPoint[i][1], gradient, gradient, stiffWidth)
    let stiffnerPoints = [];
    stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
    stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
    stiffnerPoints.push(stiffner[2], stiffner[3])
    result["webBracket" + i.toFixed(0)] = {
      points: stiffnerPoints,
      Thickness: dsi.webThickness,
      z: -dsi.webThickness / 2,
      rotationX: Math.PI / 2,
      rotationY: rotationY,
      hole: [],
      // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
  }

  let webPlate = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient },
  { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient },
  { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient },
  { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient }];

  result["webPlate"] = {
    points: webPlate,
    Thickness: dsi.webThickness,
    z: -dsi.webThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }

  let webJoint1 = [{ x: (webPlate[0].x + webPlate[3].x) / 2 - dsi.webJointWidth / 2, y: (webPlate[0].y + webPlate[3].y) / 2 - dsi.webJointHeight / 2 },
  { x: (webPlate[0].x + webPlate[3].x) / 2 + dsi.webJointWidth / 2, y: (webPlate[0].y + webPlate[3].y) / 2 - dsi.webJointHeight / 2 },
  { x: (webPlate[0].x + webPlate[3].x) / 2 + dsi.webJointWidth / 2, y: (webPlate[0].y + webPlate[3].y) / 2 + dsi.webJointHeight / 2 },
  { x: (webPlate[0].x + webPlate[3].x) / 2 - dsi.webJointWidth / 2, y: (webPlate[0].y + webPlate[3].y) / 2 + dsi.webJointHeight / 2 }];
  result["webJoint1"] = {
    points: webJoint1, Thickness: dsi.webJointThickness, z: dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  result["webJoint2"] = {
    points: webJoint1, Thickness: dsi.webJointThickness, z: -dsi.webJointThickness - dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let webJoint3 = [{ x: (webPlate[1].x + webPlate[2].x) / 2 - dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 - dsi.webJointHeight / 2 },
  { x: (webPlate[1].x + webPlate[2].x) / 2 + dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 - dsi.webJointHeight / 2 },
  { x: (webPlate[1].x + webPlate[2].x) / 2 + dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 + dsi.webJointHeight / 2 },
  { x: (webPlate[1].x + webPlate[2].x) / 2 - dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 + dsi.webJointHeight / 2 }];
  result["webJoint3"] = {
    points: webJoint3, Thickness: dsi.webJointThickness, z: dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  result["webJoint4"] = {
    points: webJoint3, Thickness: dsi.webJointThickness, z: -dsi.webJointThickness - dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }

  let upperflange = [
    { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient + dsi.upperThickness },
    { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient },
    { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient },
    { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient + dsi.upperThickness }];

  result["upperflange"] = { points: upperflange, Thickness: dsi.upperWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  let upperJoint1 = [{ x: upperflange[0].x - dsi.upperJointLength / 2, y: upperflange[0].y - dsi.upperJointLength / 2 * gradient },
  { x: upperflange[0].x + dsi.upperJointLength / 2, y: upperflange[0].y + dsi.upperJointLength / 2 * gradient },
  { x: upperflange[0].x + dsi.upperJointLength / 2, y: upperflange[0].y + dsi.upperJointLength / 2 * gradient + dsi.upperJointThickness },
  { x: upperflange[0].x - dsi.upperJointLength / 2, y: upperflange[0].y - dsi.upperJointLength / 2 * gradient + dsi.upperJointThickness }]
  let upperJoint2 = [{ x: upperflange[1].x - dsi.upperJointLength / 2, y: upperflange[1].y - dsi.upperJointLength / 2 * gradient },
  { x: upperflange[1].x + dsi.upperJointLength / 2, y: upperflange[1].y + dsi.upperJointLength / 2 * gradient },
  { x: upperflange[1].x + dsi.upperJointLength / 2, y: upperflange[1].y + dsi.upperJointLength / 2 * gradient - dsi.upperJointThickness },
  { x: upperflange[1].x - dsi.upperJointLength / 2, y: upperflange[1].y - dsi.upperJointLength / 2 * gradient - dsi.upperJointThickness }]
  let upperJoint11 = [{ x: upperflange[3].x - dsi.upperJointLength / 2, y: upperflange[3].y - dsi.upperJointLength / 2 * gradient },
  { x: upperflange[3].x + dsi.upperJointLength / 2, y: upperflange[3].y + dsi.upperJointLength / 2 * gradient },
  { x: upperflange[3].x + dsi.upperJointLength / 2, y: upperflange[3].y + dsi.upperJointLength / 2 * gradient + dsi.upperJointThickness },
  { x: upperflange[3].x - dsi.upperJointLength / 2, y: upperflange[3].y - dsi.upperJointLength / 2 * gradient + dsi.upperJointThickness }]
  let upperJoint22 = [{ x: upperflange[2].x - dsi.upperJointLength / 2, y: upperflange[2].y - dsi.upperJointLength / 2 * gradient },
  { x: upperflange[2].x + dsi.upperJointLength / 2, y: upperflange[2].y + dsi.upperJointLength / 2 * gradient },
  { x: upperflange[2].x + dsi.upperJointLength / 2, y: upperflange[2].y + dsi.upperJointLength / 2 * gradient - dsi.upperJointThickness },
  { x: upperflange[2].x - dsi.upperJointLength / 2, y: upperflange[2].y - dsi.upperJointLength / 2 * gradient - dsi.upperJointThickness }]

  result["upperJoint1"] = { points: upperJoint1, Thickness: dsi.upperWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint2"] = { points: upperJoint2, Thickness: dsi.upperJointWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint3"] = { points: upperJoint2, Thickness: dsi.upperJointWidth, z: dsi.upperWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint11"] = { points: upperJoint11, Thickness: dsi.upperWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint22"] = { points: upperJoint22, Thickness: dsi.upperJointWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint33"] = { points: upperJoint22, Thickness: dsi.upperJointWidth, z: dsi.upperWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

  let lowerflange = [
    { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient - dsi.lowerThickness },
    { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient - dsi.lowerThickness }];

  result["lowerflange"] = { points: lowerflange, Thickness: dsi.lowerWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  let lowerJoint1 = [{ x: lowerflange[0].x - dsi.lowerJointLength / 2, y: lowerflange[0].y - dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[0].x + dsi.lowerJointLength / 2, y: lowerflange[0].y + dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[0].x + dsi.lowerJointLength / 2, y: lowerflange[0].y + dsi.lowerJointLength / 2 * gradient - dsi.lowerJointThickness },
  { x: lowerflange[0].x - dsi.lowerJointLength / 2, y: lowerflange[0].y - dsi.lowerJointLength / 2 * gradient - dsi.lowerJointThickness }]
  let lowerJoint2 = [{ x: lowerflange[1].x - dsi.lowerJointLength / 2, y: lowerflange[1].y - dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[1].x + dsi.lowerJointLength / 2, y: lowerflange[1].y + dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[1].x + dsi.lowerJointLength / 2, y: lowerflange[1].y + dsi.lowerJointLength / 2 * gradient + dsi.lowerJointThickness },
  { x: lowerflange[1].x - dsi.lowerJointLength / 2, y: lowerflange[1].y - dsi.lowerJointLength / 2 * gradient + dsi.lowerJointThickness }]
  let lowerJoint11 = [{ x: lowerflange[3].x - dsi.lowerJointLength / 2, y: lowerflange[3].y - dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[3].x + dsi.lowerJointLength / 2, y: lowerflange[3].y + dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[3].x + dsi.lowerJointLength / 2, y: lowerflange[3].y + dsi.lowerJointLength / 2 * gradient - dsi.lowerJointThickness },
  { x: lowerflange[3].x - dsi.lowerJointLength / 2, y: lowerflange[3].y - dsi.lowerJointLength / 2 * gradient - dsi.lowerJointThickness }]
  let lowerJoint22 = [{ x: lowerflange[2].x - dsi.lowerJointLength / 2, y: lowerflange[2].y - dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[2].x + dsi.lowerJointLength / 2, y: lowerflange[2].y + dsi.lowerJointLength / 2 * gradient },
  { x: lowerflange[2].x + dsi.lowerJointLength / 2, y: lowerflange[2].y + dsi.lowerJointLength / 2 * gradient + dsi.lowerJointThickness },
  { x: lowerflange[2].x - dsi.lowerJointLength / 2, y: lowerflange[2].y - dsi.lowerJointLength / 2 * gradient + dsi.lowerJointThickness }]

  result["lowerJoint1"] = { points: lowerJoint1, Thickness: dsi.lowerWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint2"] = { points: lowerJoint2, Thickness: dsi.lowerJointWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint3"] = { points: lowerJoint2, Thickness: dsi.lowerJointWidth, z: dsi.lowerWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint11"] = { points: lowerJoint11, Thickness: dsi.lowerWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint22"] = { points: lowerJoint22, Thickness: dsi.lowerJointWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint33"] = { points: lowerJoint22, Thickness: dsi.lowerJointWidth, z: dsi.lowerWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

  return result
}


export function DYdia2(webPoints, point, skew, uflangePoint, ds) {
  let result = {};
  let dsi = {
    lowerHeight: 300,
    lowerThickness: 12,
    lowerWidth: 250,
    upperHeight: 900,
    upperThickness: 12,
    upperWidth: 250,
    webThickness: 12,
    stiffWidth: 150,
    stiffThickness: 12,
    scallopRadius: 35,
    bracketWidth: 450,
    bracketLength: 529,
    bracketScallopR: 100,
    webJointWidth: 330,
    webJointHeight: 440,
    webJointThickness: 10,
    upperJointLength: 480,
    upperJointWidth: 80,
    upperJointThickness: 10,
    lowerJointLength: 480,
    lowerJointWidth: 80,
    lowerJointThickness: 10,
  } //  임시 입력변수

  const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const rotationY = (point.skew - 90) * Math.PI / 180
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)

  ///lower stiffener
  let lowerPlate = [
    { x: bl.x + lwCot * dsi.lowerHeight, y: bl.y + dsi.lowerHeight },
    { x: bl.x + lwCot * (dsi.lowerHeight + dsi.lowerThickness), y: bl.y + dsi.lowerHeight + dsi.lowerThickness },
    { x: br.x + rwCot * (dsi.lowerHeight + dsi.lowerThickness), y: br.y + dsi.lowerHeight + dsi.lowerThickness },
    { x: br.x + rwCot * dsi.lowerHeight, y: br.y + dsi.lowerHeight }
  ];
  let upperPlate = [
    { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
    { x: bl.x + lwCot * (dsi.upperHeight - dsi.upperThickness), y: bl.y + dsi.upperHeight - dsi.upperThickness },
    { x: br.x + rwCot * (dsi.upperHeight - dsi.upperThickness), y: br.y + dsi.upperHeight - dsi.upperThickness },
    { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
  ]
  let bracketPoint = [ToGlobalPoint(point, lowerPlate[0]),
  ToGlobalPoint(point, lowerPlate[3]),
  ToGlobalPoint(point, upperPlate[1]),
  ToGlobalPoint(point, upperPlate[2])];
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let lowerbracket1 = [{ x: 0, y: dsi.bracketWidth / 2 }, { x: sign * 100, y: dsi.bracketWidth / 2 }, { x: sign * 100, y: dsi.lowerWidth / 2 }, { x: sign * dsi.bracketLength, y: dsi.lowerWidth / 2 },
    { x: sign * dsi.bracketLength, y: -dsi.lowerWidth / 2 }, { x: sign * 100, y: -dsi.lowerWidth / 2 }, { x: sign * 100, y: -dsi.bracketWidth / 2 }, { x: 0, y: -dsi.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], dsi.bracketScallopR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], dsi.bracketScallopR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    result["bracket" + i.toFixed(0)] = {
      points: bracketShape,
      Thickness: i < 2 ? dsi.lowerThickness : dsi.upperThickness,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      hole: [],
      point: bracketPoint[i],
      // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
  }
  let stiffnerPoint = [[bl, lowerPlate[0]],
  [br, lowerPlate[3]],
  [tl, upperPlate[0]],
  [tr, upperPlate[3]]]
  for (let i = 0; i < 4; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let tan1 = i < 2 ? 0 : gradient;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], tan1, 0, stiffWidth)
    let stiffnerPoints = [];
    stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
    stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
    stiffnerPoints.push(stiffner[2], stiffner[3])
    result["stiffner" + i.toFixed(0)] = {
      points: stiffnerPoints,
      Thickness: dsi.webThickness,
      z: -dsi.webThickness / 2,
      rotationX: Math.PI / 2,
      rotationY: rotationY,
      hole: [],
      // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
  }

  let webBracketPoint = [[lowerPlate[1], upperPlate[1]], [lowerPlate[2], upperPlate[2]]];
  for (let i = 0; i < 2; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.bracketLength : -dsi.bracketLength;
    let stiffner = PlateRestPoint(webBracketPoint[i][0], webBracketPoint[i][1], 0, 0, stiffWidth)
    let stiffnerPoints = [];
    stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
    stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
    stiffnerPoints.push(stiffner[2], stiffner[3])
    result["webBracket" + i.toFixed(0)] = {
      points: stiffnerPoints,
      Thickness: dsi.stiffThickness,
      z: -dsi.stiffThickness / 2,
      rotationX: Math.PI / 2,
      rotationY: rotationY,
      hole: [],
      // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
  }

  let webPlate = [{ x: lowerPlate[1].x + dsi.bracketLength, y: lowerPlate[1].y },
  { x: lowerPlate[2].x - dsi.bracketLength, y: lowerPlate[2].y },
  { x: upperPlate[2].x - dsi.bracketLength, y: upperPlate[2].y },
  { x: upperPlate[1].x + dsi.bracketLength, y: upperPlate[1].y }];

  result["webPlate"] = {
    points: webPlate,
    Thickness: dsi.webThickness,
    z: -dsi.webThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let webPoint = ToGlobalPoint( point, {x: (webPlate[0].x + webPlate[3].x) / 2, y: (webPlate[0].y + webPlate[3].y) / 2})
  let WebBolt = [{ startPoint: { x: dsi.webJointWidth/2 -40, y: dsi.webJointHeight / 2 - 40 }, P: 90, G: 75, pNum: 5, gNum: 2, size: 37, t: 14, l: dsi.webJointThickness * 2 + dsi.webThickness  },
                 { startPoint: { x: -(dsi.webJointWidth/2 -40), y: dsi.webJointHeight / 2 -40 }, P: 90, G: -75, pNum: 5, gNum: 2, size: 37, t: 14, l: dsi.webJointThickness * 2 + dsi.webThickness }]

  let webJoint1 = [{ x: - dsi.webJointWidth / 2, y: - dsi.webJointHeight / 2 },
  { x: dsi.webJointWidth / 2, y: - dsi.webJointHeight / 2 },
  { x: dsi.webJointWidth / 2, y: dsi.webJointHeight / 2 },
  { x: - dsi.webJointWidth / 2, y: dsi.webJointHeight / 2 }];

  result["webJoint1"] = {
    points: webJoint1, Thickness: dsi.webJointThickness, z: dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    point : webPoint, bolt : WebBolt,
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  result["webJoint2"] = {
    points: webJoint1, Thickness: dsi.webJointThickness, z: -dsi.webJointThickness - dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    point : webPoint,
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let webJoint3 = [{ x: (webPlate[1].x + webPlate[2].x) / 2 - dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 - dsi.webJointHeight / 2 },
  { x: (webPlate[1].x + webPlate[2].x) / 2 + dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 - dsi.webJointHeight / 2 },
  { x: (webPlate[1].x + webPlate[2].x) / 2 + dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 + dsi.webJointHeight / 2 },
  { x: (webPlate[1].x + webPlate[2].x) / 2 - dsi.webJointWidth / 2, y: (webPlate[1].y + webPlate[2].y) / 2 + dsi.webJointHeight / 2 }];
  result["webJoint3"] = {
    points: webJoint3, Thickness: dsi.webJointThickness, z: dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  result["webJoint4"] = {
    points: webJoint3, Thickness: dsi.webJointThickness, z: -dsi.webJointThickness - dsi.webThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let upperflange = [{ x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y },
  { x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y - dsi.upperThickness },
  { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y - dsi.upperThickness },
  { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y }]
  result["upperflange"] = { points: upperflange, Thickness: dsi.upperWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  let upperJoint1 = [{ x: upperflange[0].x - dsi.upperJointLength / 2, y: upperflange[0].y },
  { x: upperflange[0].x + dsi.upperJointLength / 2, y: upperflange[0].y },
  { x: upperflange[0].x + dsi.upperJointLength / 2, y: upperflange[0].y + dsi.upperJointThickness },
  { x: upperflange[0].x - dsi.upperJointLength / 2, y: upperflange[0].y + dsi.upperJointThickness }]
  let upperJoint2 = [{ x: upperflange[1].x - dsi.upperJointLength / 2, y: upperflange[1].y },
  { x: upperflange[1].x + dsi.upperJointLength / 2, y: upperflange[1].y },
  { x: upperflange[1].x + dsi.upperJointLength / 2, y: upperflange[1].y - dsi.upperJointThickness },
  { x: upperflange[1].x - dsi.upperJointLength / 2, y: upperflange[1].y - dsi.upperJointThickness }]
  let upperJoint11 = [{ x: upperflange[3].x - dsi.upperJointLength / 2, y: upperflange[3].y },
  { x: upperflange[3].x + dsi.upperJointLength / 2, y: upperflange[3].y },
  { x: upperflange[3].x + dsi.upperJointLength / 2, y: upperflange[3].y + dsi.upperJointThickness },
  { x: upperflange[3].x - dsi.upperJointLength / 2, y: upperflange[3].y + dsi.upperJointThickness }]
  let upperJoint22 = [{ x: upperflange[2].x - dsi.upperJointLength / 2, y: upperflange[2].y },
  { x: upperflange[2].x + dsi.upperJointLength / 2, y: upperflange[2].y },
  { x: upperflange[2].x + dsi.upperJointLength / 2, y: upperflange[2].y - dsi.upperJointThickness },
  { x: upperflange[2].x - dsi.upperJointLength / 2, y: upperflange[2].y - dsi.upperJointThickness }]

  result["upperJoint1"] = { points: upperJoint1, Thickness: dsi.upperWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint2"] = { points: upperJoint2, Thickness: dsi.upperJointWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint3"] = { points: upperJoint2, Thickness: dsi.upperJointWidth, z: dsi.upperWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint11"] = { points: upperJoint11, Thickness: dsi.upperWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint22"] = { points: upperJoint22, Thickness: dsi.upperJointWidth, z: - dsi.upperWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["upperJoint33"] = { points: upperJoint22, Thickness: dsi.upperJointWidth, z: dsi.upperWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

  let lowerflange = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y },
  { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.lowerThickness },
  { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y + dsi.lowerThickness },
  { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y }]
  result["lowerflange"] = { points: lowerflange, Thickness: dsi.lowerWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  let lowerJoint1 = [{ x: lowerflange[0].x - dsi.lowerJointLength / 2, y: lowerflange[0].y },
  { x: lowerflange[0].x + dsi.lowerJointLength / 2, y: lowerflange[0].y },
  { x: lowerflange[0].x + dsi.lowerJointLength / 2, y: lowerflange[0].y - dsi.lowerJointThickness },
  { x: lowerflange[0].x - dsi.lowerJointLength / 2, y: lowerflange[0].y - dsi.lowerJointThickness }];
  let lowerJoint2 = [{ x: lowerflange[1].x - dsi.lowerJointLength / 2, y: lowerflange[1].y },
  { x: lowerflange[1].x + dsi.lowerJointLength / 2, y: lowerflange[1].y },
  { x: lowerflange[1].x + dsi.lowerJointLength / 2, y: lowerflange[1].y + dsi.lowerJointThickness },
  { x: lowerflange[1].x - dsi.lowerJointLength / 2, y: lowerflange[1].y + dsi.lowerJointThickness }]
  let lowerJoint11 = [{ x: lowerflange[3].x - dsi.lowerJointLength / 2, y: lowerflange[3].y },
  { x: lowerflange[3].x + dsi.lowerJointLength / 2, y: lowerflange[3].y },
  { x: lowerflange[3].x + dsi.lowerJointLength / 2, y: lowerflange[3].y - dsi.lowerJointThickness },
  { x: lowerflange[3].x - dsi.lowerJointLength / 2, y: lowerflange[3].y - dsi.lowerJointThickness }];
  let lowerJoint22 = [{ x: lowerflange[2].x - dsi.lowerJointLength / 2, y: lowerflange[2].y },
  { x: lowerflange[2].x + dsi.lowerJointLength / 2, y: lowerflange[2].y },
  { x: lowerflange[2].x + dsi.lowerJointLength / 2, y: lowerflange[2].y + dsi.lowerJointThickness },
  { x: lowerflange[2].x - dsi.lowerJointLength / 2, y: lowerflange[2].y + dsi.lowerJointThickness }]

  result["lowerJoint1"] = { points: lowerJoint1, Thickness: dsi.lowerWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint2"] = { points: lowerJoint2, Thickness: dsi.lowerJointWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint3"] = { points: lowerJoint2, Thickness: dsi.lowerJointWidth, z: dsi.lowerWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint11"] = { points: lowerJoint11, Thickness: dsi.lowerWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint22"] = { points: lowerJoint22, Thickness: dsi.lowerJointWidth, z: - dsi.lowerWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  result["lowerJoint33"] = { points: lowerJoint22, Thickness: dsi.lowerJointWidth, z: dsi.lowerWidth / 2 - dsi.upperJointWidth, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

  return result
}

export function DYdia0(webPoints, skew, lflangePoint, ds) {
  let result = {};
  let dsi = {
    // lowerHeight: 300,
    lowerThickness: 12,
    lowerWidth: 250,
    upperHeight: 576,
    upperThickness: 12,
    upperWidth: 250,
    centerThickness: 12,
    stiffWidth: 150,
    stiffWidth2: 300,
    filletR: 200,
    stiffThickness: 12,
    scallopRadius: 35,
  } //  임시 입력변수

  const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const rotationY = (skew - 90) * Math.PI / 180
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)


  ///lower stiffener
  let lowerPlate = [
    lflangePoint[0][1],
    { x: lflangePoint[0][1].x, y: lflangePoint[0][1].y - dsi.lowerThickness },
    { x: lflangePoint[1][1].x, y: lflangePoint[1][1].y - dsi.lowerThickness },
    lflangePoint[1][1]
  ];
  result["lowerPlate"] = {
    points: lowerPlate,
    Thickness: dsi.lowerWidth,
    z: -dsi.lowerWidth / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let upperPlate = [
    { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
    { x: bl.x + lwCot * (dsi.upperHeight + dsi.upperThickness), y: bl.y + dsi.upperHeight + dsi.upperThickness },
    { x: br.x + rwCot * (dsi.upperHeight + dsi.upperThickness), y: br.y + dsi.upperHeight + dsi.upperThickness },
    { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
  ]
  result["upperPlate"] = {
    points: upperPlate,
    Thickness: dsi.upperWidth,
    z: -dsi.upperWidth / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }

  let centerPlate = [bl, br, upperPlate[3], upperPlate[0]]
  let centerPoints = [];
  centerPoints.push(...scallop(centerPlate[0], centerPlate[1], centerPlate[2], dsi.scallopRadius, 4));
  centerPoints.push(...scallop(centerPlate[1], centerPlate[2], centerPlate[3], dsi.scallopRadius, 4));
  centerPoints.push(...scallop(centerPlate[2], centerPlate[3], centerPlate[0], dsi.scallopRadius, 4));
  centerPoints.push(...scallop(centerPlate[3], centerPlate[0], centerPlate[1], dsi.scallopRadius, 4));

  result["centerPlate"] = {
    points: centerPoints,
    Thickness: dsi.centerThickness,
    z: -dsi.centerThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let stiffnerPoint = [tl, upperPlate[1]]
  let stiffWidth = dsi.stiffWidth;
  let tan1 = gradient;
  let stiffner = PlateRestPoint(stiffnerPoint[0], stiffnerPoint[1], tan1, 0, stiffWidth)
  let addedPoint = [{ x: upperPlate[1].x + dsi.stiffWidth2, y: upperPlate[1].y },
  { x: upperPlate[1].x + dsi.stiffWidth2, y: upperPlate[1].y + 50 },
  { x: upperPlate[1].x + dsi.stiffWidth, y: upperPlate[1].y + 50 + dsi.stiffWidth2 - dsi.stiffWidth }];

  let stiffnerPoints = [];
  stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
  stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
  stiffnerPoints.push(addedPoint[0], addedPoint[1])
  stiffnerPoints.push(...Fillet2D(addedPoint[1], addedPoint[2], stiffner[3], dsi.filletR, 4))
  stiffnerPoints.push(stiffner[3])
  result["stiffner1"] = {
    points: stiffnerPoints,
    Thickness: dsi.stiffThickness,
    z: -dsi.stiffThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }

  stiffnerPoint = [tr, upperPlate[2]]
  tan1 = gradient;
  stiffner = PlateRestPoint(stiffnerPoint[0], stiffnerPoint[1], tan1, 0, -stiffWidth)
  addedPoint = [{ x: upperPlate[2].x - dsi.stiffWidth2, y: upperPlate[2].y },
  { x: upperPlate[2].x - dsi.stiffWidth2, y: upperPlate[2].y + 50 },
  { x: upperPlate[2].x - dsi.stiffWidth, y: upperPlate[2].y + 50 + dsi.stiffWidth2 - dsi.stiffWidth }];
  stiffnerPoints = [];
  stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
  stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
  stiffnerPoints.push(addedPoint[0], addedPoint[1])
  stiffnerPoints.push(...Fillet2D(addedPoint[1], addedPoint[2], stiffner[3], dsi.filletR, 4))
  stiffnerPoints.push(stiffner[3])
  result["stiffner2"] = {
    points: stiffnerPoints,
    Thickness: dsi.stiffThickness,
    z: -dsi.stiffThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  return result
}

export function DYdia1(webPoints, skew, uflangePoint, ds) {
  //ds 입력변수
  let result = {};
  let dsi = {
    lowerHeight: 300,
    lowerThickness: 12,
    lowerWidth: 250,
    upperHeight: 900,
    upperThickness: 12,
    upperWidth: 250,
    centerThickness: 12,
    stiffWidth: 150,
    stiffThickness: 12,
    scallopRadius: 35,
  } //  임시 입력변수

  const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const rotationY = (skew - 90) * Math.PI / 180
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)


  ///lower stiffener
  let lowerPlate = [
    { x: bl.x + lwCot * dsi.lowerHeight, y: bl.y + dsi.lowerHeight },
    { x: bl.x + lwCot * (dsi.lowerHeight + dsi.lowerThickness), y: bl.y + dsi.lowerHeight + dsi.lowerThickness },
    { x: br.x + rwCot * (dsi.lowerHeight + dsi.lowerThickness), y: br.y + dsi.lowerHeight + dsi.lowerThickness },
    { x: br.x + rwCot * dsi.lowerHeight, y: br.y + dsi.lowerHeight }
  ];
  result["lowerPlate"] = {
    points: lowerPlate,
    Thickness: dsi.lowerWidth,
    z: -dsi.lowerWidth / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let upperPlate = [
    { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
    { x: bl.x + lwCot * (dsi.upperHeight - dsi.upperThickness), y: bl.y + dsi.upperHeight - dsi.upperThickness },
    { x: br.x + rwCot * (dsi.upperHeight - dsi.upperThickness), y: br.y + dsi.upperHeight - dsi.upperThickness },
    { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
  ]
  result["upperPlate"] = {
    points: upperPlate,
    Thickness: dsi.upperWidth,
    z: -dsi.upperWidth / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }

  let centerPlate = [lowerPlate[1], lowerPlate[2], upperPlate[2], upperPlate[1]]
  let centerPoints = [];
  centerPoints.push(...scallop(centerPlate[0], centerPlate[1], centerPlate[2], dsi.scallopRadius, 4));
  centerPoints.push(...scallop(centerPlate[1], centerPlate[2], centerPlate[3], dsi.scallopRadius, 4));
  centerPoints.push(...scallop(centerPlate[2], centerPlate[3], centerPlate[0], dsi.scallopRadius, 4));
  centerPoints.push(...scallop(centerPlate[3], centerPlate[0], centerPlate[1], dsi.scallopRadius, 4));

  result["centerPlate"] = {
    points: centerPoints,
    Thickness: dsi.centerThickness,
    z: -dsi.centerThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: rotationY,
    hole: [],
    // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  }
  let stiffnerPoint = [[bl, lowerPlate[0]],
  [br, lowerPlate[3]],
  [tl, upperPlate[0]],
  [tr, upperPlate[3]]]
  for (let i = 0; i < 4; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let tan1 = i < 2 ? 0 : gradient;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], tan1, 0, stiffWidth)
    let stiffnerPoints = [];
    stiffnerPoints.push(...scallop(stiffner[3], stiffner[0], stiffner[1], dsi.scallopRadius, 4));
    stiffnerPoints.push(...scallop(stiffner[0], stiffner[1], stiffner[2], dsi.scallopRadius, 4));
    stiffnerPoints.push(stiffner[2], stiffner[3])
    result["stiffner" + i.toFixed(0)] = {
      points: stiffnerPoints,
      Thickness: dsi.centerThickness,
      z: -dsi.centerThickness / 2,
      rotationX: Math.PI / 2,
      rotationY: rotationY,
      hole: [],
      // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
      // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
  }
  // let leftLower = PlateRestPoint(bl, lowerPlate[0], 0, 0, dsi.stiffWidth)
  // let leftLowerPoints = [];
  // leftLowerPoints.push(...scallop(leftLower[3], leftLower[0], leftLower[1], dsi.scallopRadius, 4));
  // leftLowerPoints.push(...scallop(leftLower[0], leftLower[1], leftLower[2], dsi.scallopRadius, 4));
  // leftLowerPoints.push(leftLower[2], leftLower[3])
  // result["leftLower"] = {
  //   points: leftLowerPoints,
  //   Thickness: dsi.stiffThickness,
  //   z: -dsi.stiffThickness / 2,
  //   rotationX: Math.PI / 2,
  //   rotationY: rotationY,
  //   hole: [],
  //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
  //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  // }
  // let rightLower = PlateRestPoint(br, lowerPlate[3], 0, 0, -dsi.stiffWidth)
  // let rightLowerPoints = [];
  // rightLowerPoints.push(...scallop(rightLower[3], rightLower[0], rightLower[1], dsi.scallopRadius, 4));
  // rightLowerPoints.push(...scallop(rightLower[0], rightLower[1], rightLower[2], dsi.scallopRadius, 4));
  // rightLowerPoints.push(rightLower[2], rightLower[3])
  // result["rightLower"] = {
  //   points: rightLowerPoints,
  //   Thickness: dsi.stiffThickness,
  //   z: -dsi.stiffThickness / 2,
  //   rotationX: Math.PI / 2,
  //   rotationY: rotationY,
  //   hole: [],
  //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
  //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  // }

  // let leftupper = PlateRestPoint(tl, upperPlate[0], gradient, 0, dsi.stiffWidth)
  // let leftupperPoints = [];
  // leftupperPoints.push(...scallop(leftupper[3], leftupper[0], leftupper[1], dsi.scallopRadius, 4));
  // leftupperPoints.push(...scallop(leftupper[0], leftupper[1], leftupper[2], dsi.scallopRadius, 4));
  // leftupperPoints.push(leftupper[2], leftupper[3])
  // result["leftupper"] = {
  //   points: leftupperPoints,
  //   Thickness: dsi.stiffThickness,
  //   z: -dsi.stiffThickness / 2,
  //   rotationX: Math.PI / 2,
  //   rotationY: rotationY,
  //   hole: [],
  //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
  //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  // }

  // let rightupper = PlateRestPoint(tr, upperPlate[3], gradient, 0, -dsi.stiffWidth)
  // let rightupperPoints = [];
  // rightupperPoints.push(...scallop(rightupper[3], rightupper[0], rightupper[1], dsi.scallopRadius, 4));
  // rightupperPoints.push(...scallop(rightupper[0], rightupper[1], rightupper[2], dsi.scallopRadius, 4));
  // rightupperPoints.push(rightupper[2], rightupper[3])
  // result["rightupper"] = {
  //   points: rightupperPoints,
  //   Thickness: dsi.stiffThickness,
  //   z: -dsi.stiffThickness / 2,
  //   rotationX: Math.PI / 2,
  //   rotationY: rotationY,
  //   hole: [],
  //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
  //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  // }





  return result
}

export function diaphragmSection(webPoints, skew, uflangePoint, ds, sectionDB) { //ribPoint needed
  // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
  const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  let result = {}
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const rotationY = (skew - 90) * Math.PI / 180
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)

  ///lower stiffener
  let lowerPlate = [
    { x: bl.x + lwCot * ds.lowerHeight, y: bl.y + ds.lowerHeight }, bl, br,
    { x: br.x + rwCot * ds.lowerHeight, y: br.y + ds.lowerHeight }
  ];
  let lowerPoints = [];
  lowerPoints.push(lowerPlate[0]);
  lowerPoints = lowerPoints.concat(scallop(tl, bl, br, ds.scallopRadius, 4));
  //// longitudinal stiffner holes
  for (let i = 0; i < ds.longiRibRayout.length; i++) {
    lowerPoints.push({ x: ds.longiRibRayout[i] - ds.ribHoleD, y: lowerPlate[1].y });
    let curve = new THREE.ArcCurve(ds.longiRibRayout[i], lowerPlate[1].y + ds.longiRibHeight, ds.ribHoleR, Math.PI, 0, true);
    let dummyVectors = curve.getPoints(8)
    for (let i = 0; i < dummyVectors.length; i++) {
      lowerPoints.push({ x: dummyVectors[i].x, y: dummyVectors[i].y })
    }
    lowerPoints.push({ x: ds.longiRibRayout[i] + ds.ribHoleD, y: lowerPlate[1].y });
  }
  lowerPoints = lowerPoints.concat(scallop(bl, br, tr, ds.scallopRadius, 4));
  lowerPoints.push(lowerPlate[3]);
  let lowerTopPoints = [lowerPlate[0],
  { x: bl.x + lwCot * (ds.lowerHeight + ds.lowerTopThickness), y: bl.y + (ds.lowerHeight + ds.lowerTopThickness) },
  { x: br.x + rwCot * (ds.lowerHeight + ds.lowerTopThickness), y: bl.y + (ds.lowerHeight + ds.lowerTopThickness) },
  lowerPlate[3]];
  result["lowerTopShape"] = {
    points: lowerTopPoints, Thickness: ds.lowerTopwidth, z: -ds.lowerTopwidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: PlateSize2(lowerPlate, 1, ds.lowerTopThickness, ds.lowerTopwidth),
    anchor: [[lowerTopPoints[1].x, lowerTopPoints[1].y + 50], [lowerTopPoints[2].x, lowerTopPoints[2].y + 50]]
  }
  let lowerweldingLine = [lowerPlate[0], lowerPlate[1], lowerPlate[2], lowerPlate[3]]
  result["lowershape"] = {
    points: lowerPoints, Thickness: ds.lowerThickness, z: -ds.lowerThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: PlateSize(lowerPlate, 1, ds.lowerThickness),
    anchor: [[lowerPlate[0].x, lowerPlate[0].y - 50], [lowerPlate[3].x, lowerPlate[3].y - 50]],
    welding: [{ Line: lowerweldingLine, type: "FF", value1: 6 }]
  }
  ///upper stiffener
  let upperPlate = [{ x: tl.x, y: tl.y }, { x: tl.x - lwCot * ds.upperHeight, y: tl.y - ds.upperHeight },
  { x: tr.x - rwCot * ds.upperHeight, y: tr.y - ds.upperHeight }, { x: tr.x, y: tr.y }];
  let upperPoints = [...scallop(upperPlate[3], upperPlate[0], upperPlate[1], ds.scallopRadius, 4),
  upperPlate[1], upperPlate[2], ...scallop(upperPlate[2], upperPlate[3], upperPlate[0], ds.scallopRadius, 4)];

  result["upper"] = {
    points: upperPoints, Thickness: ds.upperThickness, z: -ds.upperThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: PlateSize(upperPlate, 1, ds.upperThickness),
    anchor: [[upperPlate[0].x, upperPlate[0].y - 50], [upperPlate[3].x, upperPlate[3].y - 50]]
  }
  //upperTopPlate

  let gcos = (uflangePoint[1].x - uflangePoint[0].x) / Math.sqrt((uflangePoint[1].x - uflangePoint[0].x) ** 2 + (uflangePoint[1].y - uflangePoint[0].y) ** 2)
  let gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
  let gtan = (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
  if (uflangePoint[0].x < uflangePoint[2].x) {
    let upperTopPoints = PlateRestPoint(uflangePoint[0], uflangePoint[2], gtan, gtan, ds.upperTopThickness)
    result["upperTopShape"] = {
      points: upperTopPoints, Thickness: ds.upperTopwidth, z: -ds.upperTopwidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
      size: PlateSize2(upperTopPoints, 0, ds.upperTopThickness, ds.upperTopwidth),
      anchor: [[upperTopPoints[0].x, upperTopPoints[0].y + 50], [upperTopPoints[1].x, upperTopPoints[1].y + 50]]
    }
  }
  ////left side stiffner
  let leftPlate = PlateRestPoint(
    WebPoint(bl, tl, 0, bl.y + (ds.lowerHeight + ds.lowerTopThickness)),
    WebPoint(bl, tl, 0, tl.y - (ds.upperHeight + ds.leftsideTopThickness) * gsin), 0, gradient, ds.sideHeight)
  let leftweldingLine = [leftPlate[3], leftPlate[0], leftPlate[1], leftPlate[2]]
  result["leftPlateShape"] = {
    points: leftPlate, Thickness: ds.sideThickness, z: -ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: PlateSize(leftPlate, 0, ds.sideThickness),
    anchor: [[leftPlate[0].x + 50, leftPlate[0].y], [leftPlate[1].x + 50, leftPlate[1].y]],
    welding: [{ Line: leftweldingLine, type: "FF", value1: 6 }]
  }


  //   ////right side stiffner
  let rightPlate = PlateRestPoint(
    WebPoint(br, tr, 0, br.y + (ds.lowerHeight + ds.lowerTopThickness)),
    WebPoint(br, tr, 0, tr.y - (ds.upperHeight + ds.leftsideTopThickness) * gsin), 0, gradient, -ds.sideHeight)
  result["rightPlateShape"] = {
    points: rightPlate, Thickness: ds.sideThickness, z: -ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: PlateSize(rightPlate, 0, ds.sideThickness),
    anchor: [[rightPlate[0].x - 50, rightPlate[0].y], [rightPlate[1].x - 50, rightPlate[1].y]]
  }
  ////leftside top plate
  let leftTopPlate = PlateRestPoint(
    upperPlate[1], { x: upperPlate[1].x + ds.leftsideTopwidth * gsin, y: upperPlate[1].y - ds.leftsideTopwidth * gcos },
    1 / lwCot, -1 / gradient, -ds.leftsideTopThickness)
  result["leftTopPlateShape"] = {
    points: leftTopPlate, Thickness: ds.leftsideToplength, z: -ds.leftsideToplength / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: PlateSize2(leftTopPlate, 0, ds.leftsideTopThickness, ds.leftsideToplength),
    anchor: [[leftTopPlate[0].x + 50, leftTopPlate[0].y + 50], [leftTopPlate[1].x + 50, leftTopPlate[1].y + 50]]
  }
  ////rightside top plate
  let rightTopPlate = PlateRestPoint(
    upperPlate[2], { x: upperPlate[2].x - ds.rightsideTopwidth * gsin, y: upperPlate[2].y + ds.rightsideTopwidth * gcos },
    1 / rwCot, -1 / gradient, -ds.rightsideTopThickness)
  result["rightTopPlateShape"] = {
    points: rightTopPlate, Thickness: ds.rightsideToplength, z: -ds.rightsideToplength / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: PlateSize2(rightTopPlate, 0, ds.rightsideTopThickness, ds.rightsideToplength),
    anchor: [[rightTopPlate[1].x - 80, rightTopPlate[1].y + 50], [rightTopPlate[0].x - 80, rightTopPlate[0].y + 50]]
  }
  // k-frame diaphragm
  let leftline = [{ x: -ds.spc * gsin, y: -topY - ds.spc * gcos }, lowerTopPoints[1]]
  let lcos = (leftline[1].x - leftline[0].x) / Math.sqrt((leftline[1].x - leftline[0].x) ** 2 + (leftline[1].y - leftline[0].y) ** 2)
  let ltan = (leftline[1].y - leftline[0].y) / (leftline[1].x - leftline[0].x)
  let lsin = lcos * ltan
  // 슬래브 기준두께에 따라 브레이싱의 상단좌표가 이동해야 하나, 현재 기준은 0,0을 기준점으로 하고 있어 수정이 필요함 20.03.17 by drlim
  let pts = PTS(ds.dFrameName, false, 1, sectionDB)
  let newleftline = [
    { x: leftline[0].x - (ds.spc - lcos * pts[3]) / ltan, y: leftline[0].y - (ds.spc - lcos * pts[3]) },
    { x: leftline[1].x + (ds.spc - lsin * pts[3]), y: leftline[1].y + ltan * (ds.spc - lsin * pts[3]) }
  ]
  let [leftframe1, leftframe2] = Kframe(newleftline[1], newleftline[0], 0, 0, pts)
  result["leftframe1"] = { points: leftframe1, Thickness: pts[4], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] }
  result["leftframe2"] = {
    points: leftframe2, Thickness: pts[5], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: { Label: "L-100x100x10x" + PointLength(...newleftline).toFixed(0) },
    anchor: [[newleftline[1].x - 20, newleftline[1].y], [newleftline[0].x - 20, newleftline[0].y]]
  }

  let rightline = [{ x: ds.spc * gsin, y: -topY - ds.spc * gcos }, lowerTopPoints[2]]
  let rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x) ** 2 + (rightline[1].y - rightline[0].y) ** 2)
  let rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x)
  let rsin = rcos * rtan
  let newrightline = [
    { x: rightline[0].x - (ds.spc + rcos * pts[3]) / rtan, y: rightline[0].y - (ds.spc + rcos * pts[3]) },
    { x: rightline[1].x - (ds.spc - rsin * pts[3]), y: rightline[1].y - rtan * (ds.spc - rsin * pts[3]) }
  ]
  let [rightframe1, rightframe2] = Kframe(newrightline[0], newrightline[1], 0, 0, pts)
  result["rightframe1"] = { points: rightframe1, Thickness: pts[4], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] }
  result["rightframe2"] = {
    points: rightframe2, Thickness: pts[5], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    size: { Label: "L-100x100x10x" + PointLength(...newrightline).toFixed(0) },
    anchor: [[newrightline[0].x + 20, newrightline[0].y], [newrightline[1].x + 20, newrightline[1].y]]
  }
  return result
}

export function diaphragmSection2(webPoints, skew, uflangePoint, diaSection) { //ribPoint needed
  // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
  let result = {}
  const plateThickness = diaSection.plateThickness;
  const holeBottomOffset = diaSection.holeBottomOffset;
  const holeRightOffset = diaSection.holeRightOffset;
  const holeFilletR = diaSection.holeFilletR;
  const holeHeight = diaSection.holeHeight;
  const holeWidth = diaSection.holeWidth;
  const vStiffThickness = diaSection.vStiffThickness;
  const vStiffWidth = diaSection.vStiffWidth;
  const vStiffLayout = diaSection.vStiffLayout;
  const topPlateWidth = diaSection.topPlateWidth;
  const topPlateThickness = diaSection.topPlateThickness;

  const hStiffThickness = diaSection.hStiffThickness
  const hStiffWidth = diaSection.hStiffWidth
  const hStiffBottomOffset = diaSection.hStiffBottomOffset
  // let longiRibHeight = diaSection.longiRibHeight;
  // let longiRibRayout = diaSection.longiRibRayout;
  const holeVstiffnerThickness = diaSection.holeVstiffnerThickness
  const holeVstiffnerhight = diaSection.holeVstiffnerhight
  const holeVstiffnerLength = diaSection.holeVstiffnerLength
  const holeHstiffnerThickness = diaSection.holeHstiffnerThickness
  const holeHstiffnerHeight = diaSection.holeHstiffnerHeight
  const holeHstiffnerLength = diaSection.holeHstiffnerLength
  const holeStiffSpacing = diaSection.holeStiffSpacing
  // added letiables
  let scallopRadius = diaSection.scallopRadius;


  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];

  const gradient = (tr.y - tl.y) / (tr.x - tl.x)

  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const cosec = Math.abs(1 / Math.sin(skew * Math.PI / 180));
  const sec = Math.abs(1 / Math.cos(skew * Math.PI / 180));
  const cot = Math.abs(1 / Math.tan(skew * Math.PI / 180));
  const rotationY = (skew - 90) * Math.PI / 180

  let vstiffX1 = (holeRightOffset - holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness
  let vstiffX2 = holeRightOffset / cosec + holeStiffSpacing + holeVstiffnerThickness
  let vstiffX3 = vStiffLayout[0] - vStiffThickness / 2
  let vstiffX4 = vStiffLayout[0] + vStiffThickness / 2
  let vstiffX5 = vStiffLayout[1] - vStiffThickness / 2
  let vstiffX6 = vStiffLayout[1] + vStiffThickness / 2

  let hStiff1 = [
    { x: bl.x + hStiffBottomOffset * lwCot, y: -(bl.x + hStiffBottomOffset * lwCot) * cot - (hStiffWidth + plateThickness / 2) * cosec },
    { x: bl.x + hStiffBottomOffset * lwCot, y: -(bl.x + hStiffBottomOffset * lwCot) * cot - (plateThickness / 2) * cosec },
    { x: vstiffX1, y: -(vstiffX1) * cot - (plateThickness / 2) * cosec },
    { x: vstiffX1, y: -(vstiffX1) * cot - (holeVstiffnerhight + plateThickness / 2) * cosec },
  ]
  let hStiff2 = [
    { x: vstiffX2, y: -(vstiffX2) * cot - (holeVstiffnerhight + plateThickness / 2) * cosec },
    { x: vstiffX2, y: -(vstiffX2) * cot - (plateThickness / 2) * cosec },
    { x: vstiffX3, y: -(vstiffX3) * cot - (plateThickness / 2) * cosec },
    { x: vstiffX3, y: -(vstiffX3) * cot - (hStiffWidth + plateThickness / 2) * cosec },
  ]
  let hStiff3 = [
    { x: vstiffX4, y: -(vstiffX4) * cot - (hStiffWidth + plateThickness / 2) * cosec },
    { x: vstiffX4, y: -(vstiffX4) * cot - (plateThickness / 2) * cosec },
    { x: vstiffX5, y: -(vstiffX5) * cot - (plateThickness / 2) * cosec },
    { x: vstiffX5, y: -(vstiffX5) * cot - (hStiffWidth + plateThickness / 2) * cosec },
  ]
  let hStiff4 = [
    { x: vstiffX6, y: -(vstiffX6) * cot - (hStiffWidth + plateThickness / 2) * cosec },
    { x: vstiffX6, y: -(vstiffX6) * cot - (plateThickness / 2) * cosec },
    { x: br.x + hStiffBottomOffset * rwCot, y: -(br.x + hStiffBottomOffset * rwCot) * cot - (plateThickness / 2) * cosec },
    { x: br.x + hStiffBottomOffset * rwCot, y: -(br.x + hStiffBottomOffset * rwCot) * cot - (hStiffWidth + plateThickness / 2) * cosec },
  ]
  result['hStiff1'] = { points: hStiff1, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }
  result['hStiff2'] = { points: hStiff2, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }
  result['hStiff3'] = { points: hStiff3, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }
  result['hStiff4'] = { points: hStiff4, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }

  let hStiff5 = [
    { x: bl.x + hStiffBottomOffset * lwCot, y: -(bl.x + hStiffBottomOffset * lwCot) * cot + (hStiffWidth + plateThickness / 2) * cosec },
    { x: bl.x + hStiffBottomOffset * lwCot, y: -(bl.x + hStiffBottomOffset * lwCot) * cot + (plateThickness / 2) * cosec },
    { x: vstiffX1, y: -(vstiffX1) * cot + (plateThickness / 2) * cosec },
    { x: vstiffX1, y: -(vstiffX1) * cot + (holeVstiffnerhight + plateThickness / 2) * cosec },
  ]
  let hStiff6 = [
    { x: vstiffX2, y: -(vstiffX2) * cot + (holeVstiffnerhight + plateThickness / 2) * cosec },
    { x: vstiffX2, y: -(vstiffX2) * cot + (plateThickness / 2) * cosec },
    { x: vstiffX3, y: -(vstiffX3) * cot + (plateThickness / 2) * cosec },
    { x: vstiffX3, y: -(vstiffX3) * cot + (hStiffWidth + plateThickness / 2) * cosec },
  ]
  let hStiff7 = [
    { x: vstiffX4, y: -(vstiffX4) * cot + (hStiffWidth + plateThickness / 2) * cosec },
    { x: vstiffX4, y: -(vstiffX4) * cot + (plateThickness / 2) * cosec },
    { x: vstiffX5, y: -(vstiffX5) * cot + (plateThickness / 2) * cosec },
    { x: vstiffX5, y: -(vstiffX5) * cot + (hStiffWidth + plateThickness / 2) * cosec },
  ]
  let hStiff8 = [
    { x: vstiffX6, y: -(vstiffX6) * cot + (hStiffWidth + plateThickness / 2) * cosec },
    { x: vstiffX6, y: -(vstiffX6) * cot + (plateThickness / 2) * cosec },
    { x: br.x + hStiffBottomOffset * rwCot, y: -(br.x + hStiffBottomOffset * rwCot) * cot + (plateThickness / 2) * cosec },
    { x: br.x + hStiffBottomOffset * rwCot, y: -(br.x + hStiffBottomOffset * rwCot) * cot + (hStiffWidth + plateThickness / 2) * cosec },
  ]
  result['hStiff5'] = { points: hStiff5, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }
  result['hStiff6'] = { points: hStiff6, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }
  result['hStiff7'] = { points: hStiff7, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }
  result['hStiff8'] = { points: hStiff8, Thickness: hStiffThickness, z: bl.y + hStiffBottomOffset, rotationX: 0, rotationY: 0, hole: [] }

  // let ribHoleD = diaSection.ribHoleD;
  // let ribHoleR = diaSection.ribHoleR;

  // hole stiffner
  let holeVStiff1 = [
    { x: holeRightOffset / cosec + holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight / 2 - holeVstiffnerLength / 2 },
    { x: holeRightOffset / cosec + holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight / 2 + holeVstiffnerLength / 2 },
    { x: holeRightOffset / cosec + holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight / 2 + holeVstiffnerLength / 2 },
    { x: holeRightOffset / cosec + holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight / 2 - holeVstiffnerLength / 2 },
  ]
  result['holeVStiff1'] = {
    points: holeVStiff1,
    Thickness: holeVstiffnerhight,
    z: holeVStiff1[0].x * cot + plateThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: []
  }

  let holeVStiff2 = [
    { x: (holeRightOffset - holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight / 2 - holeVstiffnerLength / 2 },
    { x: (holeRightOffset - holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight / 2 + holeVstiffnerLength / 2 },
    { x: (holeRightOffset - holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight / 2 + holeVstiffnerLength / 2 },
    { x: (holeRightOffset - holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight / 2 - holeVstiffnerLength / 2 },
  ]
  result['holeVStiff2'] = {
    points: holeVStiff2,
    Thickness: holeVstiffnerhight,
    z: holeVStiff2[0].x * cot + plateThickness / 2,
    rotationX: Math.PI / 2,
    rotationY: 0,
    hole: []
  }

  let holeHStiff1 = [
    { x: (holeRightOffset - holeWidth / 2) / cosec - holeHstiffnerLength / 2, y: -((holeRightOffset - holeWidth / 2) / cosec - holeHstiffnerLength / 2) * cot },
    { x: (holeRightOffset - holeWidth / 2) / cosec + holeHstiffnerLength / 2, y: -((holeRightOffset - holeWidth / 2) / cosec + holeHstiffnerLength / 2) * cot },
    { x: (holeRightOffset - holeWidth / 2) / cosec + holeHstiffnerLength / 2, y: -((holeRightOffset - holeWidth / 2) / cosec + holeHstiffnerLength / 2) * cot + holeHstiffnerHeight * cosec },
    { x: (holeRightOffset - holeWidth / 2) / cosec - holeHstiffnerLength / 2, y: -((holeRightOffset - holeWidth / 2) / cosec - holeHstiffnerLength / 2) * cot + holeHstiffnerHeight * cosec },
  ]
  result['holeHStiff1'] = {
    points: holeHStiff1,
    Thickness: holeHstiffnerThickness,
    z: bl.y + holeBottomOffset + holeHeight + holeStiffSpacing,
    rotationX: 0,
    rotationY: 0,
    hole: []
  }

  result['holeHStiff2'] = {
    points: holeHStiff1,
    Thickness: - holeHstiffnerThickness,
    z: bl.y + holeBottomOffset - holeStiffSpacing,
    rotationX: 0,
    rotationY: 0,
    hole: []
  }


  // vertical stiffener 
  for (let i = 0; i < vStiffLayout.length; i++) {
    let name = 'verticalStiffner' + (i + 1)
    let Points = [
      { x: vStiffLayout[i] - vStiffThickness / 2, y: bl.y },
      { x: vStiffLayout[i] + vStiffThickness / 2, y: bl.y },
      { x: vStiffLayout[i] + vStiffThickness / 2, y: tl.y + ((vStiffLayout[i] + vStiffThickness / 2) - tl.x) * gradient },
      { x: vStiffLayout[i] - vStiffThickness / 2, y: tl.y + ((vStiffLayout[i] - vStiffThickness / 2) - tl.x) * gradient },
    ]
    result[name] = {
      points: Points,
      Thickness: vStiffWidth,
      z: vStiffLayout[i] * cot - vStiffWidth / 2,
      rotationX: Math.PI / 2,
      rotationY: 0,
      hole: []
    }
  }

  // topPlate
  if (uflangePoint[0].x < uflangePoint[2].x) {
    let topPlate = [
      { x: uflangePoint[0].x, y: -uflangePoint[0].x * cot + topPlateWidth / 2 * cosec },
      { x: uflangePoint[0].x, y: -uflangePoint[0].x * cot - topPlateWidth / 2 * cosec },
      { x: uflangePoint[2].x, y: -uflangePoint[2].x * cot - topPlateWidth / 2 * cosec },
      { x: uflangePoint[2].x, y: -uflangePoint[2].x * cot + topPlateWidth / 2 * cosec },
    ]
    result['topPlate'] = {
      points: topPlate,
      Thickness: topPlateThickness,
      z: tl.y - tl.x * gradient,
      rotationX: 0,
      rotationY: -Math.atan(gradient),
      hole: []
    }
  }

  ///lower stiffener
  let mainPlate = [
    { x: tl.x * cosec, y: tl.y },
    { x: bl.x * cosec, y: bl.y },
    { x: br.x * cosec, y: br.y },
    { x: tr.x * cosec, y: tr.y },
  ];
  let diaPoints = [];
  diaPoints = diaPoints.concat(scallop(mainPlate[3], mainPlate[0], mainPlate[1], scallopRadius, 4));
  // points.push(plate[1]);
  diaPoints = diaPoints.concat(scallop(mainPlate[0], mainPlate[1], mainPlate[2], scallopRadius, 4));
  //// longitudinal stiffner holes
  // for (let i=0; i<longiRibRayout.length;i++){
  //   lowerPoints.push({x:longiRibRayout[i] - ribHoleD, y:lowerPlate[1].y});
  //   let curve = new THREE.ArcCurve(longiRibRayout[i],lowerPlate[1].y + longiRibHeight, ribHoleR, Math.PI,0,true);
  //   let dummyVectors = curve.getPoints(8)
  //   for (let i = 0; i< dummyVectors.length;i++){
  //     lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y})
  //   }
  //   lowerPoints.push({x:longiRibRayout[i] + ribHoleD,y:lowerPlate[1].y});
  // }
  ////
  diaPoints = diaPoints.concat(scallop(mainPlate[1], mainPlate[2], mainPlate[3], scallopRadius, 4));
  diaPoints = diaPoints.concat(scallop(mainPlate[2], mainPlate[3], mainPlate[0], scallopRadius, 4));
  ////

  let holePoints = []
  let holeRect = [
    { x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset },
    { x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset },
    { x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
    { x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
  ]
  holePoints = holePoints.concat(Fillet2D(holeRect[0], holeRect[1], holeRect[2], holeFilletR, 4))
  holePoints = holePoints.concat(Fillet2D(holeRect[1], holeRect[2], holeRect[3], holeFilletR, 4))
  holePoints = holePoints.concat(Fillet2D(holeRect[2], holeRect[3], holeRect[0], holeFilletR, 4))
  holePoints = holePoints.concat(Fillet2D(holeRect[3], holeRect[0], holeRect[1], holeFilletR, 4))
  result['mainPlate'] = { points: diaPoints, Thickness: plateThickness, z: - plateThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: holePoints }

  return result
}

export function vStiffSection(webPoints, skew, uflangePoint, vSection, sectionDB) {

  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  let gcos = (uflangePoint[1].x - uflangePoint[0].x) / Math.sqrt((uflangePoint[1].x - uflangePoint[0].x) ** 2 + (uflangePoint[1].y - uflangePoint[0].y) ** 2)
  let gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y);
  const rwCot = (tr.x - br.x) / (tr.y - br.y);
  const lcos = (tl.x - bl.x) / Math.sqrt((tl.x - bl.x) ** 2 + (tl.y - bl.y) ** 2);
  const lsin = lcos / lwCot;
  const rcos = (tr.x - br.x) / Math.sqrt((tr.x - br.x) ** 2 + (tr.y - br.y) ** 2);
  const rsin = rcos / rwCot;

  let sideHeight = vSection.sideHeight;
  let sideThickness = vSection.sideThickness;
  let upperHeight = vSection.upperHeight;
  let bottomOffset = vSection.bottomOffset;
  let scallopRadius = vSection.scallopRadius;
  let sideScallopOffset = vSection.sideScallopOffset;
  //L100x100x10 section point, origin = (0,0)
  let spc = vSection.spc;
  let pts = PTS(vSection.tFrameName, false, 0, sectionDB)
  // let pts = vSection.pts;
  let rotationY = (skew - 90) * Math.PI / 180
  ///left stiffener
  let leftplate = [
    tl,
    { x: bl.x + lwCot * bottomOffset, y: bl.y + bottomOffset },
    { x: bl.x + lwCot * bottomOffset + lsin * sideHeight, y: bl.y + bottomOffset - lcos * sideHeight },
    { x: tl.x + gsin * sideHeight, y: tl.y - gcos * sideHeight },
  ]
  let leftPoints = [];
  leftPoints = leftPoints.concat(scallop(leftplate[3], leftplate[0], leftplate[1], scallopRadius, 4));
  leftPoints.push(leftplate[1])
  leftPoints = leftPoints.concat(scallop(leftplate[1], leftplate[2], leftplate[3], sideHeight - sideScallopOffset, 1));
  leftPoints.push(leftplate[3])

  ///right stiffener
  let rightplate = [
    tr,
    { x: br.x + rwCot * bottomOffset, y: br.y + bottomOffset },
    { x: br.x + rwCot * bottomOffset - rsin * sideHeight, y: br.y + bottomOffset + rcos * sideHeight },
    { x: tr.x - gsin * sideHeight, y: tr.y + gcos * sideHeight },
  ]
  let rightPoints = [...scallop(rightplate[3], rightplate[0], rightplate[1], scallopRadius, 4), rightplate[1],
  ...scallop(rightplate[1], rightplate[2], rightplate[3], sideHeight - sideScallopOffset, 1), rightplate[3]];
  ////upper bracing
  let node1 = { x: tl.x - lwCot * upperHeight + gsin * spc, y: tl.y - upperHeight + gcos * spc }
  let node2 = { x: tr.x - rwCot * upperHeight - gsin * spc, y: tr.y - upperHeight - gcos * spc }
  let [upperframe1, upperframe2] = Kframe(node1, node2, 0, 0, pts)
  return {
    leftshape: { points: leftPoints, Thickness: sideThickness, z: -sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] },
    rightShape: { points: rightPoints, Thickness: sideThickness, z: -sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] },
    upperframe1: { points: upperframe1, Thickness: pts[4], z: sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] },
    upperframe2: { points: upperframe2, Thickness: pts[5], z: sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] },
  }
}


export function hBracingSection(point1, point2, webPoints, hBSection, sectionDB) {
  // let sideToplength = 700;
  // let sideTopwidth = 300;
  // let B = 2000;
  // let H = 2500;
  // let ULR = 1300;

  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];

  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)

  let upperHeight = hBSection.upperHeight;
  let sideTopThickness = hBSection.sideTopThickness;
  let spc = hBSection.spc
  let pts = PTS(hBSection.dFrameName, false, 1, sectionDB) //hBSection.pts

  let node1 = { x: tl.x - lwCot * (upperHeight + sideTopThickness), y: tl.y - (upperHeight + sideTopThickness) };
  let node2 = { x: tr.x - rwCot * (upperHeight + sideTopThickness), y: tr.y - (upperHeight + sideTopThickness) };
  let Brline = [
    ToGlobalPoint(point1, node1),
    ToGlobalPoint(point2, node2)
  ];
  let Vector = [Brline[1].x - Brline[0].x,
  Brline[1].y - Brline[0].y,
  Brline[1].z - Brline[0].z]
  let VectorLength = Math.sqrt(Vector[0] ** 2 + Vector[1] ** 2 + Vector[2] ** 2)
  let normalCos = Vector[1] / VectorLength;
  let normalSin = - Vector[0] / VectorLength;
  let newBrLine = [{
    x: Brline[0].x + Vector[0] * spc / VectorLength,
    y: Brline[0].y + Vector[1] * spc / VectorLength,
    z: Brline[0].z + Vector[2] * spc / VectorLength
  },
  {
    x: Brline[1].x - Vector[0] * spc / VectorLength,
    y: Brline[1].y - Vector[1] * spc / VectorLength,
    z: Brline[1].z - Vector[2] * spc / VectorLength
  }]
  let pointslist =
    [{ x: newBrLine[0].x + normalCos * pts[0], y: newBrLine[0].y + normalSin * pts[0], z: newBrLine[0].z },
    { x: newBrLine[0].x + normalCos * pts[1], y: newBrLine[0].y + normalSin * pts[1], z: newBrLine[0].z },
    { x: newBrLine[0].x + normalCos * pts[1], y: newBrLine[0].y + normalSin * pts[1], z: newBrLine[0].z + pts[4] },
    { x: newBrLine[0].x + normalCos * pts[0], y: newBrLine[0].y + normalSin * pts[0], z: newBrLine[0].z + pts[4] },
    { x: newBrLine[1].x + normalCos * pts[0], y: newBrLine[1].y + normalSin * pts[0], z: newBrLine[1].z },
    { x: newBrLine[1].x + normalCos * pts[1], y: newBrLine[1].y + normalSin * pts[1], z: newBrLine[1].z },
    { x: newBrLine[1].x + normalCos * pts[1], y: newBrLine[1].y + normalSin * pts[1], z: newBrLine[1].z + pts[4] },
    { x: newBrLine[1].x + normalCos * pts[0], y: newBrLine[1].y + normalSin * pts[0], z: newBrLine[1].z + pts[4] },
    ]
  let pointslist2 =
    [
      { x: newBrLine[0].x + normalCos * pts[2], y: newBrLine[0].y + normalSin * pts[2], z: newBrLine[0].z },
      { x: newBrLine[0].x + normalCos * pts[3], y: newBrLine[0].y + normalSin * pts[3], z: newBrLine[0].z },
      { x: newBrLine[0].x + normalCos * pts[3], y: newBrLine[0].y + normalSin * pts[3], z: newBrLine[0].z + pts[5] },
      { x: newBrLine[0].x + normalCos * pts[2], y: newBrLine[0].y + normalSin * pts[2], z: newBrLine[0].z + pts[5] },
      { x: newBrLine[1].x + normalCos * pts[2], y: newBrLine[1].y + normalSin * pts[2], z: newBrLine[1].z },
      { x: newBrLine[1].x + normalCos * pts[3], y: newBrLine[1].y + normalSin * pts[3], z: newBrLine[1].z },
      { x: newBrLine[1].x + normalCos * pts[3], y: newBrLine[1].y + normalSin * pts[3], z: newBrLine[1].z + pts[5] },
      { x: newBrLine[1].x + normalCos * pts[2], y: newBrLine[1].y + normalSin * pts[2], z: newBrLine[1].z + pts[5] },
    ];

  return { line: Brline, points: [pointslist, pointslist2, []] };
}

export function hBracingPlate(point, right, webPoints, hBSection) {
  const topY = 270; //슬래브두께 + 헌치가 포함된 값이어야함.
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)

  let upperHeight = hBSection.upperHeight;
  let sideTopThickness = hBSection.sideTopThickness;
  let sideToplength = hBSection.sideToplength
  let sideTopwidth = hBSection.sideTopwidth
  let scallopHeight = hBSection.scallopHeight
  let scallopRadius = hBSection.scallopRadius
  let scallopBottom = hBSection.scallopBottom

  let position = {};
  let rotationY = Math.atan((tr.y - tl.y) / (tr.x - tl.x));
  if (right) {
    position = { x: tr.x - rwCot * (upperHeight + sideTopThickness), y: - topY - (upperHeight + sideTopThickness) };
    rotationY = -rotationY
  } else {
    position = { x: tl.x - lwCot * (upperHeight + sideTopThickness), y: - topY - (upperHeight + sideTopThickness) };
  }
  let rotation = (right) ? Math.PI / 2 : -Math.PI / 2;
  let cos = Math.cos(rotation);
  let sin = Math.sin(rotation);
  let curve = new THREE.ArcCurve(0, scallopHeight, scallopRadius, Math.PI, 0, true);
  let curvePoint = curve.getPoints(8);
  let ps = [];
  ps.push({ x: -sideToplength / 2, y: sideTopwidth });
  ps.push({ x: -sideToplength / 2, y: 0 });
  ps.push({ x: -scallopBottom, y: 0 });

  for (let i = 0; i < 9; i++) {
    ps.push({ x: curvePoint[i].x, y: curvePoint[i].y })
  };
  ps.push({ x: scallopBottom, y: 0 });
  ps.push({ x: sideToplength / 2, y: 0 });
  ps.push({ x: sideToplength / 2, y: sideTopwidth });
  let plateShape = []
  for (let i = 0; i < ps.length; i++) {
    plateShape.push({ x: position.x + ps[i].x * cos - ps[i].y * sin, y: ps[i].y * cos + ps[i].x * sin })
  }

  return { point: point, plate: { points: plateShape, Thickness: sideTopThickness, z: position.y, rotationX: 0, rotationY: rotationY, hole: [] } }
}

// 판요소 생성시 기준점은 좌측하단을 기준으로 반드시 시계반대방향으로 회전할 것
export function vPlateGen(points, centerPoint, Thickness, scallopVertex, scallopR, urib, lrib, holePoints) {
  let skew = centerPoint.skew;

  const bl = points[0];
  const br = points[1];
  const tl = points[3];
  const tr = points[2];

  const gradient = (tr.y - tl.y) / (tr.x - tl.x)
  const gradient2 = (br.y - bl.y) / (br.x - bl.x)

  const cosec = 1 / Math.sin(skew * Math.PI / 180);
  const rotationY = (skew - 90) * Math.PI / 180

  let mainPlate = [];
  points.forEach(pt => mainPlate.push({ x: pt.x * cosec, y: pt.y }));

  let upperPoints = [];
  if (urib) {
    for (let i = 0; i < urib.layout.length; i++) {
      upperPoints.push({ x: urib.layout[i] * cosec - urib.ribHoleD, y: tl.y + gradient * (urib.layout[i] - urib.ribHoleD - tl.x) });
      let curve = new THREE.ArcCurve(urib.layout[i] * cosec, tl.y + gradient * (urib.layout[i] - tl.x) - urib.height, urib.ribHoleR, Math.PI, 0, false);
      let dummyVectors = curve.getPoints(8)
      for (let i = 0; i < dummyVectors.length; i++) {
        upperPoints.push({ x: dummyVectors[i].x, y: dummyVectors[i].y })
      }
      upperPoints.push({ x: urib.layout[i] * cosec + urib.ribHoleD, y: tl.y + gradient * (urib.layout[i] + urib.ribHoleD - tl.x) });
    }
  }
  let lowerPoints = [];
  if (lrib) {
    if (lrib.type == 0) {
      for (let i = 0; i < lrib.layout.length; i++) {
        lowerPoints.push({ x: lrib.layout[i] * cosec - lrib.ribHoleD, y: bl.y + gradient2 * (lrib.layout[i] - lrib.ribHoleD - bl.x) });
        let curve = new THREE.ArcCurve(lrib.layout[i] * cosec, bl.y + gradient2 * (lrib.layout[i] - bl.x) + lrib.height, lrib.ribHoleR, Math.PI, 0, true);
        let dummyVectors = curve.getPoints(8)
        for (let i = 0; i < dummyVectors.length; i++) {
          lowerPoints.push({ x: dummyVectors[i].x, y: dummyVectors[i].y })
        }
        lowerPoints.push({ x: lrib.layout[i] * cosec + lrib.ribHoleD, y: bl.y + gradient2 * (lrib.layout[i] + lrib.ribHoleD - bl.x) });
      }
    } else if (lrib.type === 1) {
      for (let i = 0; i < lrib.layout.length; i++) {
        let dummyPoints = [];
        dummyPoints.push({ x: lrib.layout[i] * cosec - lrib.thickness / 2 - 1, y: bl.y + gradient2 * (lrib.layout[i] - lrib.thickness / 2 - 1 - bl.x) },
          { x: lrib.layout[i] * cosec - lrib.thickness / 2 - 1, y: bl.y + gradient2 * (lrib.layout[i] - bl.x) + lrib.height + 1 },
          { x: lrib.layout[i] * cosec + lrib.thickness / 2 + 1, y: bl.y + gradient2 * (lrib.layout[i] - bl.x) + lrib.height + 1 },
          { x: lrib.layout[i] * cosec + lrib.thickness / 2 + 1, y: bl.y + gradient2 * (lrib.layout[i] + lrib.thickness / 2 + 1 - bl.x) })
        lowerPoints.push(...scallop(bl, dummyPoints[0], dummyPoints[1], 10, 1));
        lowerPoints.push(dummyPoints[1], dummyPoints[2]);
        lowerPoints.push(...scallop(dummyPoints[2], dummyPoints[3], br, 10, 1));
      }
    }
  }
  let resultPoints = [];
  for (let i = 0; i < points.length; i++) {
    if (scallopVertex.includes(i)) {
      let former = i === 0 ? mainPlate.length - 1 : i - 1;
      let latter = i === mainPlate.length - 1 ? 0 : i + 1;
      resultPoints.push(...scallop(mainPlate[former], mainPlate[i], mainPlate[latter], scallopR, 4));
    } else {
      resultPoints.push(mainPlate[i])
    }
    if (i === 0) {
      resultPoints.push(...lowerPoints);
    } else if (i === 2) {
      resultPoints.push(...upperPoints.reverse());
    }
  }

  let result = { points: resultPoints, Thickness: Thickness, z: - Thickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: holePoints }

  return result
}

export function hPlateGen(points, centerPoint, Thickness, z, skew, rotationX, rotationY) {
  const cosec = 1 / Math.sin(skew * Math.PI / 180);
  const cot = - 1 / Math.tan(skew * Math.PI / 180);
  let resultPoints = [];
  points.forEach(pt => resultPoints.push({ x: pt.x, y: pt.x * cot + pt.y * cosec }))

  let result = { points: resultPoints, Thickness: Thickness, z: z, rotationX: rotationX, rotationY: rotationY, hole: [], point: centerPoint }
  return result
}