import { THREE } from "global";
import { ToGlobalPoint, ToGlobalPoint2, PlateRestPoint, WebPoint, Kframe, scallop, Fillet2D, PlateSize, PlateSize2, PointLength } from "../geometryModule"
import { PTS } from "../DB/module"
import { IbeamJoint } from "../splice/module"

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
      result[gridkey] = uBoxDia1(webPoints, gridPoint[gridkey], skew, uflangePoints, uflange, lrib, diaSection, sectionDB);
    } else if (diaphragmLayout[i][section] == "diaType2") {
      result[gridkey] = boxDiaHole1(webPoints, gridPoint[gridkey], skew, uflange, urib, lrib, diaSection);
    } else if (diaphragmLayout[i][section] == "DYdia0") {
      result[gridkey] = DYdia0(
        webPoints,
        gridPoint[gridkey],
        skew,
        lflange,
        diaSection
      );
    } else if (diaphragmLayout[i][section] == "DYdia1") {
      result[gridkey] = DYdia1(
        webPoints,
        gridPoint[gridkey],
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
      result[gridkey] = DYVstiff1(webPoints, gridPoint[gridkey], skew, uflangePoints, vSection)
    } else if (vStiffLayout[i][section] === "DYvStiff0") {
      result[gridkey] = DYVstiff0(webPoints, gridPoint[gridkey], skew, uflangePoints, vSection)
    }
    result[gridkey].point = gridPoint[gridkey] // 추후 삭제필요
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
  let result = {};
  const from = 0;
  const to = 1;
  const leftToright = 2;
  const section = 3;
  // const platelayout = 4;
  // let hBracingDict = {};
  // let hBracingPlateDict = {};
  let right = true;


  for (let i = 0; i < hBracingLayout.length; i++) {
    if (hBracingLayout[i][section] === "hBracingType1") {
      let hBSection = hBracingectionList[hBracingLayout[i][section]];
      let pk1 = hBracingLayout[i][from];
      let pk2 = hBracingLayout[i][to];
      let webPoints1 = [
        sectionPointDict[pk1].forward.web[0][0],
        sectionPointDict[pk1].forward.web[0][1],
        sectionPointDict[pk1].forward.web[1][0],
        sectionPointDict[pk1].forward.web[1][1]
      ];
      let webPoints2 = [
        sectionPointDict[pk2].forward.web[0][0],
        sectionPointDict[pk2].forward.web[0][1],
        sectionPointDict[pk2].forward.web[1][0],
        sectionPointDict[pk2].forward.web[1][1]
      ];
      let webPoints = [];
      if (hBracingLayout[i][leftToright]) {
        webPoints = [webPoints1[0],webPoints1[1],webPoints2[2],webPoints2[3]];
      } else {
        webPoints = [webPoints1[2],webPoints1[3],webPoints2[0],webPoints2[1]];
      }
      let point1 = pointDict[pk1];
      let point2 = pointDict[pk2];

      result[pk1 + pk2] = hBracingSection(point1, point2, webPoints, hBSection, sectionDB);
      if (hBracingLayout[i][4]) {
        right = hBracingLayout[i][leftToright] ? false : true;
        result[pk1 + pk2]["p1"] = hBracingPlate(point1, right, webPoints1, hBSection);
      }
      if (hBracingLayout[i][5]) {
        right = hBracingLayout[i][leftToright] ? true : false;
        result[pk1 + pk2]["p2"] = hBracingPlate(point2, right, webPoints2, hBSection);
      }
    }
  }

  return result;
}

export function JackupStiffDict(gridPoint,
  sectionPointDict,
  jackupData, // position, layoutList, length, height, thickness, chamfer
) {
  let result = {}
  for (let i in jackupData) {
    let gridkey = jackupData[i][0]
    let webPoints = sectionPointDict[gridkey].forward.web
    result[gridkey + i] = jackup0(webPoints, gridPoint[gridkey], jackupData[i])
  }
  return result
}

export function jackup0(webPoints, point, jackupData) {
  //ds 입력변수
  let result = {};
  let layout = jackupData[1];
  let length = jackupData[2];
  let height = jackupData[3];
  let thickness = jackupData[4];
  let chamfer = jackupData[5];
  //  임시 입력변수

  const bl = webPoints[0][0];
  const bl2 = webPoints[0][3];
  const tl = webPoints[0][1];
  const br = webPoints[1][0];
  const br2 = webPoints[1][3];

  const tr = webPoints[1][1];
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)

  let upperPoints = [
    { x: bl.x + lwCot * length, y: bl.y + length },
    { x: br.x + rwCot * length, y: br.y + length },
    { x: bl2.x + lwCot * length, y: bl2.y + length },
    { x: br2.x + rwCot * length, y: br2.y + length }

  ];

  let left = PlateRestPoint(bl, upperPoints[0], 0, 0, height)
  let leftPoints = [];
  leftPoints.push(left[0])
  leftPoints.push(left[1]);
  leftPoints.push(...scallop(left[1], left[2], left[3], chamfer, 1));
  leftPoints.push(left[3])
  let right = PlateRestPoint(br, upperPoints[1], 0, 0, -height)
  let rightPoints = [];
  rightPoints.push(right[0])
  rightPoints.push(right[1]);
  rightPoints.push(...scallop(right[1], right[2], right[3], chamfer, 1));
  rightPoints.push(right[3])
  let left1 = PlateRestPoint(bl2, upperPoints[2], 0, 0, -height)
  let leftPoints2 = [];
  leftPoints2.push(left1[0])
  leftPoints2.push(left1[1]);
  leftPoints2.push(...scallop(left1[1], left1[2], left1[3], chamfer, 1));
  leftPoints2.push(left1[3])
  let right1 = PlateRestPoint(br2, upperPoints[3], 0, 0, height)
  let rightPoints2 = [];
  rightPoints2.push(right1[0])
  rightPoints2.push(right1[1]);
  rightPoints2.push(...scallop(right1[1], right1[2], right1[3], chamfer, 1));
  rightPoints2.push(right1[3])

  for (let i in layout) {
    let newPoint = ToGlobalPoint2(point, { x: 0, y: layout[i] })
    result["left1" + i] = vPlateGen(leftPoints, newPoint, thickness, [], 15, null, null, [], [3, 0], [1, 2, 4, 0])
    result["left2" + i] = vPlateGen(leftPoints2, newPoint, thickness, [], 15, null, null, [], [3, 0], null)
    result["right1" + i] = vPlateGen(rightPoints, newPoint, thickness, [], 15, null, null, [], [3, 0], null)
    result["right2" + i] = vPlateGen(rightPoints2, newPoint, thickness, [], 15, null, null, [], [3, 0], null)
  }
  return result
}

export function DYVstiff0(webPoints, point, skew, uflangePoint, ds) {
  //ds 입력변수
  let result = {};
  let dsi = {
    stiffWidth: 150,
    stiffThickness: 12,
    scallopRadius: 35,
    chamfer: 130,
  } //  임시 입력변수

  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)

  let lowerPoints = [
    { x: bl.x, y: bl.y },
    { x: br.x, y: br.y }
  ];

  let left = PlateRestPoint(lowerPoints[0], tl, 0, gradient, dsi.stiffWidth)

  result["left"] = vPlateGen(left, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2], [1, 2, 3, 0])

  let right = PlateRestPoint(lowerPoints[1], tr, 0, gradient, -dsi.stiffWidth)

  result["right"] = vPlateGen(right, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2], null)

  return result
}


export function DYVstiff1(webPoints, point, skew, uflangePoint, ds) {
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
  leftPoints.push(left[1]);
  leftPoints.push(left[2])
  leftPoints.push(...scallop(left[2], left[3], left[0], dsi.chamfer, 1));

  result["left"] = vPlateGen(leftPoints, point, dsi.stiffThickness, [1], dsi.scallopRadius, null, null, [], [1, 2], [1, 2, 4, 0])
  // {
  //   points: leftPoints,
  //   Thickness: dsi.stiffThickness,
  //   z: -dsi.stiffThickness / 2,
  //   rotationX: Math.PI / 2,
  //   rotationY: rotationY,
  //   hole: [],
  //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
  //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
  // }
  let right = PlateRestPoint(lowerPoints[1], tr, 0, gradient, -dsi.stiffWidth)
  let rightPoints = [];
  rightPoints.push(right[0])
  rightPoints.push(right[1]);
  rightPoints.push(right[2])
  rightPoints.push(...scallop(right[2], right[3], right[0], dsi.chamfer, 1));

  result["right"] = vPlateGen(rightPoints, point, dsi.stiffThickness, [1], dsi.scallopRadius, null, null, [], [1, 2])
  // {
  //   points: rightPoints,
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
  result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints, [2, 3], [0, 1, 2, 3]);

  let holeCenter1 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness }
  let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
  { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
  let hstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
  { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
  { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin },
  { x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin }]
  result["hstiff1"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter1), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D1, false, [1, 2])
  let holeCenter2 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }
  let hstiff2D2 = [{ x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
  { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
  { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin },
  { x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }]
  result["hstiff2"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter2), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D2, true, [1, 2])
  let holeCenter3 = { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 },
  { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
  let vstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
  { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }]
  result["vstiff1"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter3), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D1, true, [1, 2])
  let holeCenter4 = { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  let vstiff2D2 = [{ x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
  { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }]
  result["vstiff2"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter4), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D2, true)


  for (let i in dsi.supportStiffLayout) {
    let supportStiffCenter1 = { x: dsi.supportStiffLayout[i], y: tl.y + gradient * (dsi.supportStiffLayout[i] - tl.x) };
    let supportStiff1 = [{ x: 0, y: dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: dsi.webThickness / 2 },
    { x: supportStiffCenter1.y - bl.y, y: dsi.supportStiffWidth + dsi.webThickness / 2 }, { x: 0, y: dsi.supportStiffWidth + dsi.webThickness / 2 }];
    let supportStiff2 = [{ x: 0, y: -dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: -dsi.webThickness / 2 },
    { x: supportStiffCenter1.y - bl.y, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }, { x: 0, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }];
    let supportStiff2D = [
      { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2 - tl.x) },
      { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: bl.y },
      { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: bl.y },
      { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2 - tl.x) }
    ]
    result["supportStiff1" + i] = hPlateGen(supportStiff1, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, supportStiff2D, true);
    result["supportStiff2" + i] = hPlateGen(supportStiff2, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, null, true);
  }

  let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
  // let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 },
  //    { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
  // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }];
  // result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
  // let h11 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
  // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }];
  // result["h11"] = hPlateGen(h11, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
  let x0 = bl.x + lwCot * dsi.hstiffHeight;
  let x00 = dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness;
  let x1 = dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness;
  let x2 = dsi.supportStiffLayout[0] - dsi.supportStiffThickness / 2;
  let x3 = dsi.supportStiffLayout[0] + dsi.supportStiffThickness / 2;
  let x4 = dsi.supportStiffLayout[1] - dsi.supportStiffThickness / 2;
  let x5 = dsi.supportStiffLayout[1] + dsi.supportStiffThickness / 2;
  let x6 = dsi.supportStiffLayout[2] - dsi.supportStiffThickness / 2;
  let x7 = dsi.supportStiffLayout[2] + dsi.supportStiffThickness / 2;
  let x8 = br.x + rwCot * dsi.hstiffHeight;
  let w0 = dsi.webThickness / 2;
  let w1 = dsi.holeStiffHeight + dsi.webThickness / 2;
  let w2 = dsi.hstiffWidth2 + dsi.webThickness / 2;
  let w3 = dsi.hstiffWidth + dsi.webThickness / 2;

  let h2 = [
    [{ x: x0, y: -w3 }, { x: x00, y: -w1 }, { x: x00, y: - w0 }, { x: x0, y: - w0 }],
    [{ x: x1, y: -w1 }, { x: x2, y: -w2 }, { x: x2, y: - w0 }, { x: x1, y: - w0 }],
    [{ x: x3, y: -w2 }, { x: x4, y: -w2 }, { x: x4, y: - w0 }, { x: x3, y: - w0 }],
    [{ x: x5, y: -w2 }, { x: x6, y: -w2 }, { x: x6, y: - w0 }, { x: x5, y: - w0 }],
    [{ x: x7, y: -w2 }, { x: x8, y: -w3 }, { x: x8, y: - w0 }, { x: x7, y: - w0 }]];
  let h3 = [
    [{ x: x0, y: w3 }, { x: x00, y: w1 }, { x: x00, y: w0 }, { x: x0, y: w0 }],
    [{ x: x1, y: w1 }, { x: x2, y: w2 }, { x: x2, y: w0 }, { x: x1, y: w0 }],
    [{ x: x3, y: w2 }, { x: x4, y: w2 }, { x: x4, y: w0 }, { x: x3, y: w0 }],
    [{ x: x5, y: w2 }, { x: x6, y: w2 }, { x: x6, y: w0 }, { x: x5, y: w0 }],
    [{ x: x7, y: w2 }, { x: x8, y: w3 }, { x: x8, y: w0 }, { x: x7, y: w0 }]];
  let cpt = ToGlobalPoint(point, hStiffCenter)
  for (let i in h2) {
    let h2D = [{ x: h2[i][0].x, y: hStiffCenter.y },
    { x: h2[i][1].x, y: hStiffCenter.y },
    { x: h2[i][1].x, y: hStiffCenter.y + dsi.hstiffThickness },
    { x: h2[i][0].x, y: hStiffCenter.y + dsi.hstiffThickness }]
    result["h2" + i] = hPlateGen(h2[i], cpt, dsi.hstiffThickness, 0, point.skew, 0, 0, h2D, true);
    result["h3" + i] = hPlateGen(h3[i], cpt, dsi.hstiffThickness, 0, point.skew, 0, 0, null, true);
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
  result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints, [2, 3], [0, 1, 2, 3]);

  let holeCenter1 = { x: 0, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness }
  let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
  { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
  let hstiff2D1 = [{ x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
  { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
  { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin },
  { x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin }]
  result["hstiff1"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter1), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D1, false, [1, 2])

  let holeCenter2 = { x: 0, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }
  let hstiff2D2 = [{ x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
  { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
  { x: dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin },
  { x: -dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }]
  result["hstiff2"] = hPlateGen(hstiff1, ToGlobalPoint(point, holeCenter2), dsi.holeStiffThickness, 0, point.skew, 0, 0, hstiff2D2, true, [1, 2])

  let holeCenter3 = { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 },
  { x: dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
  let vstiff2D1 = [{ x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }]
  result["vstiff1"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter3), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D1, true, [0, 1])

  let holeCenter4 = { x: dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  let vstiff2D2 = [{ x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }]
  result["vstiff2"] = hPlateGen(vstiff1, ToGlobalPoint(point, holeCenter4), dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, vstiff2D2, true)

  let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
  let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 }, { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }
  ];
  let h2D1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: bl.y + dsi.hstiffHeight },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight },
  { x: - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness },
  { x: bl.x + lwCot * (dsi.hstiffHeight + dsi.hstiffThickness), y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness }
  ]
  result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0, h2D1);

  let h2 = [{ x: br.x + rwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 }, { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: br.x + rwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }
  ];
  let h2D2 = [{ x: br.x + rwCot * dsi.hstiffHeight, y: bl.y + dsi.hstiffHeight },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight },
  { x: dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness },
  { x: br.x + rwCot * (dsi.hstiffHeight + dsi.hstiffThickness), y: bl.y + dsi.hstiffHeight + dsi.hstiffThickness }
  ]
  result["h2"] = hPlateGen(h2, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0, h2D2);

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

  let webPlate = [{ x: tl.x - lwCot * dsi.webHeight, y: tl.y - dsi.webHeight },
  { x: tr.x - rwCot * dsi.webHeight, y: tr.y - dsi.webHeight }, tr, tl]; // 첫번째 면이 rib에 해당되도록
  let urib2 = urib
  urib2.ribHoleD = dsi.ribHoleD
  urib2.ribHoleR = dsi.ribHoleR
  result["webPlate"] = vPlateGen(webPlate, point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, null, [], [2, 3], [0, 1, 2, 3]);

  let centerPoint = ToGlobalPoint(point, { x: 0, y: -gradient * tl.x + tl.y - dsi.webHeight - dsi.upperTopThickness });
  // let l = (tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness)) - (tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos
  let webBottomPlate2 = [{ x: (tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: - dsi.upperTopWidth / 2 },
  { x: (tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: dsi.upperTopWidth / 2 },
  { x: (tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: dsi.upperTopWidth / 2 },
  { x: (tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness)) / gradCos, y: -dsi.upperTopWidth / 2 }];
  let webBottomPlate = [webPlate[0],
  { x: tl.x - lwCot * (dsi.webHeight + dsi.upperTopThickness), y: tl.y - dsi.webHeight - dsi.upperTopThickness },
  { x: tr.x - rwCot * (dsi.webHeight + dsi.upperTopThickness), y: tr.y - dsi.webHeight - dsi.upperTopThickness },
  webPlate[1]
  ]
  result["webBottomPlate"] = hPlateGen(webBottomPlate2, centerPoint, dsi.upperTopThickness, 0, point.skew, 0, -Math.atan(gradient), webBottomPlate, false, [0, 1])
  let stiffnerPoint = [[bl, webBottomPlate[1]],
  [br, webBottomPlate[2]]];
  for (let i = 0; i < stiffnerPoint.length; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], 0, gradient, stiffWidth)
    let side2D = i % 2 === 0 ? null : [0, 3, 2, 1];
    result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D);
  }

  return result
}


export function DYdia3(webPoints, point, skew, uflange, ds) {
  let result = {};
  let dsi = {
    webHeight: 576,//상부플렌지를 기준으로 보강재의 높이를 의미함, 명칭변경필요
    flangeThickness: 12,
    flangeWidth: 250,
    // upperHeight: 900,
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
    flangeJointLength: 480,
    flangeJointWidth: 80,
    flangeJointThickness: 10,
  } //  임시 입력변수
  // let xs = {
  //   webThickness: 12,
  //   flangeWidth: 250,
  //   flangeThickness: 12,
  //   webJointThickness: 10,
  //   webJointWidth: 330,
  //   webJointHeight: 440,
  //   flangeJointThickness: 10,
  //   flangeJointLength: 480,
  //   flangeJointWidth: 80,
  // }

  let wBolt = {
    P: 90,
    G: 75,
    pNum: 5,
    gNum: 2,
    dia: 22,
    size: 37,
    t: 14,
  }
  let fBolt = {
    P: 170,
    G: 75,
    pNum: 2,
    gNum: 3,
    dia: 22,
    size: 37,
    t: 14,
  }


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
  const gradRadian = -Math.atan(gradient)

  let upperPlate = [
    uflange[0][1],
    { x: uflange[0][1].x - gradSin * dsi.flangeThickness, y: uflange[0][1].y + gradCos * dsi.flangeThickness },
    { x: uflange[1][1].x - gradSin * dsi.flangeThickness, y: uflange[1][1].y + gradCos * dsi.flangeThickness },
    uflange[1][1]
  ]
  let lowerPlate = [
    { x: tl.x - lwCot * dsi.webHeight, y: tl.y - dsi.webHeight },
    { x: tl.x - lwCot * (dsi.webHeight + dsi.flangeThickness), y: tl.y - dsi.webHeight - dsi.flangeThickness },
    { x: tr.x - rwCot * (dsi.webHeight + dsi.flangeThickness), y: tr.y - dsi.webHeight - dsi.flangeThickness },
    { x: tr.x - rwCot * dsi.webHeight, y: tr.y - dsi.webHeight }
  ];

  let bracketPoint = [ToGlobalPoint(point, lowerPlate[1]),
  ToGlobalPoint(point, lowerPlate[2]),
  ToGlobalPoint(point, upperPlate[0]),
  ToGlobalPoint(point, upperPlate[3])];
  let bracketSide = [[lowerPlate[0], lowerPlate[1]],
  [lowerPlate[3], lowerPlate[2]],
  [upperPlate[0], upperPlate[1]],
  [upperPlate[3], upperPlate[2]]]
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let bracketLength = i < 2 ? dsi.bracketLength : dsi.bracketLength - (uflange[0][1].x - tl.x);
    let bracket2D = PlateRestPoint(bracketSide[i][0], bracketSide[i][1], gradient, gradient, sign * bracketLength);
    let lowerbracket1 = [{ x: 0, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.flangeWidth / 2 }, { x: sign * bracketLength, y: dsi.flangeWidth / 2 },
    { x: sign * bracketLength, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.bracketWidth / 2 }, { x: 0, y: -dsi.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], dsi.bracketScallopR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], dsi.bracketScallopR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    let top2D = i < 2 ? false : true;
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, bracketPoint[i], dsi.flangeThickness, 0, point.skew, 0, gradRadian, bracket2D, top2D)
    // {
    //   points: bracketShape,
    //   Thickness: i < 2 ? dsi.flangeThickness : dsi.flangeThickness,
    //   z: 0,
    //   rotationX: 0,
    //   rotationY: gradRadian,
    //   hole: [],
    //   point: bracketPoint[i],
    //   // size : PlateSize2(lowerPlate,1,dsi.lowerTopThickness,dsi.lowerTopwidth),
    //   // anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    // }
  }

  let stiffnerPoint = [[bl, lowerPlate[1]], [br, lowerPlate[2]]];
  for (let i = 0; i < stiffnerPoint.length; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], 0, gradient, stiffWidth)
    let side2D = i % 2 === 0 ? null : [0, 3, 2, 1];
    result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D);
  }
  let webBracketPoint = [[lowerPlate[0], tl], [lowerPlate[3], tr]];
  for (let i = 0; i < webBracketPoint.length; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.bracketLength : -dsi.bracketLength;
    let stiffner = PlateRestPoint(webBracketPoint[i][0], webBracketPoint[i][1], gradient, gradient, stiffWidth)
    result["webBracket" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2]);
  }

  let webPlate = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient },
  { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient },
  { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient },
  { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient }];

  result["webPlate"] = vPlateGen(webPlate, point, dsi.webThickness, [], dsi.scallopRadius, null, null, [], [2, 3], [0, 1, 2, 3]);

  let upperflange = [
    { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient },
    { x: tl.x + dsi.bracketLength, y: tl.y + dsi.bracketLength * gradient + dsi.flangeThickness },
    { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient + dsi.flangeThickness },
    { x: tr.x - dsi.bracketLength, y: tr.y - dsi.bracketLength * gradient }];
  let uPoint = ToGlobalPoint(point, { x: 0, y: -gradient * tl.x + tl.y })
  let upperflangeL = Math.sqrt((upperflange[3].x - upperflange[0].x) ** 2 + (upperflange[3].y - upperflange[0].y) ** 2)
  let upperflange2 = [{ x: -upperflangeL / 2, y: dsi.flangeWidth / 2 },
  { x: -upperflangeL / 2, y: - dsi.flangeWidth / 2 },
  { x: upperflangeL / 2, y: - dsi.flangeWidth / 2 },
  { x: upperflangeL / 2, y: dsi.flangeWidth / 2 }]
  result["upperflange"] = hPlateGen(upperflange2, uPoint, dsi.flangeThickness, 0, point.skew, 0, gradRadian, upperflange, true, [0, 1])
  // result["upperflange"] = { points: upperflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  let lowerflange = [
    { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient - dsi.flangeThickness },
    { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y + dsi.bracketLength * gradient },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient },
    { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.bracketLength * gradient - dsi.flangeThickness }];
  let lPoint = ToGlobalPoint(point, { x: 0, y: -gradient * lowerflange[0].x + lowerflange[0].y })
  let lowerflangeL = Math.sqrt((lowerflange[3].x - lowerflange[0].x) ** 2 + (lowerflange[3].y - lowerflange[0].y) ** 2)
  let lowerflange2 = [{ x: -lowerflangeL / 2, y: dsi.flangeWidth / 2 },
  { x: -lowerflangeL / 2, y: - dsi.flangeWidth / 2 },
  { x: lowerflangeL / 2, y: - dsi.flangeWidth / 2 },
  { x: lowerflangeL / 2, y: dsi.flangeWidth / 2 }]
  result["lowerflange"] = hPlateGen(lowerflange2, lPoint, dsi.flangeThickness, 0, point.skew, 0, gradRadian, lowerflange, false, [0, 1])
  // result["lowerflange"] = { points: lowerflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

  let joint = IbeamJoint(webPlate, point, dsi, wBolt, fBolt)
  for (let i in joint) { result[i] = joint[i] }
  return result
}


export function DYdia2(webPoints, point, skew, uflangePoint, ds) {
  let result = {};
  let dsi = {
    lowerHeight: 300,
    flangeThickness: 12,
    flangeWidth: 250,
    upperHeight: 900,
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
    flangeJointLength: 480,
    flangeJointWidth: 80,
    flangeJointThickness: 10,
  } //  임시 입력변수

  // let xs = {
  //   webThickness: 12,
  //   flangeWidth: 250,
  //   flangeThickness: 12,
  //   webJointThickness: 10,
  //   webJointWidth: 330,
  //   webJointHeight: 440,
  //   flangeJointThickness: 10,
  //   flangeJointLength: 480,
  //   flangeJointWidth: 80,
  // }

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
    dia: 22,
    size: 37,
    t: 14,
  }


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
    { x: bl.x + lwCot * (dsi.lowerHeight - dsi.flangeThickness), y: bl.y + dsi.lowerHeight - dsi.flangeThickness },
    { x: br.x + rwCot * (dsi.lowerHeight - dsi.flangeThickness), y: br.y + dsi.lowerHeight - dsi.flangeThickness },
    { x: br.x + rwCot * dsi.lowerHeight, y: br.y + dsi.lowerHeight }
  ];
  let upperPlate = [
    { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
    { x: bl.x + lwCot * (dsi.upperHeight + dsi.flangeThickness), y: bl.y + dsi.upperHeight + dsi.flangeThickness },
    { x: br.x + rwCot * (dsi.upperHeight + dsi.flangeThickness), y: br.y + dsi.upperHeight + dsi.flangeThickness },
    { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
  ]
  let bracketPoint = [ToGlobalPoint(point, lowerPlate[1]),
  ToGlobalPoint(point, lowerPlate[2]),
  ToGlobalPoint(point, upperPlate[0]),
  ToGlobalPoint(point, upperPlate[3])];
  let bracketSide = [[lowerPlate[0], lowerPlate[1]],
  [lowerPlate[3], lowerPlate[2]],
  [upperPlate[1], upperPlate[0]],
  [upperPlate[2], upperPlate[3]],
  ]
  for (let i = 0; i < 4; i++) {
    let sign = i % 2 === 0 ? 1 : -1;
    let bracket2D = PlateRestPoint(bracketSide[i][0], bracketSide[i][1], 0, 0, sign * dsi.bracketLength)
    let lowerbracket1 = [{ x: 0, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.bracketWidth / 2 }, { x: sign * 20, y: dsi.flangeWidth / 2 }, { x: sign * dsi.bracketLength, y: dsi.flangeWidth / 2 },
    { x: sign * dsi.bracketLength, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.flangeWidth / 2 }, { x: sign * 20, y: -dsi.bracketWidth / 2 }, { x: 0, y: -dsi.bracketWidth / 2 }];
    let bracketShape = [lowerbracket1[0], lowerbracket1[1], ...Fillet2D(lowerbracket1[1], lowerbracket1[2], lowerbracket1[3], dsi.bracketScallopR, 4),
    lowerbracket1[3], lowerbracket1[4], ...Fillet2D(lowerbracket1[4], lowerbracket1[5], lowerbracket1[6], dsi.bracketScallopR, 4),
    lowerbracket1[6], lowerbracket1[7]];
    let thickness = i < 2 ? dsi.flangeThickness : dsi.flangeThickness
    let top2D = i < 2 ? false : true;
    result["bracket" + i.toFixed(0)] = hPlateGen(bracketShape, bracketPoint[i], thickness, 0, point.skew, 0, 0, bracket2D, top2D);
  }
  let stiffnerPoint = [[bl, lowerPlate[1]],
  [br, lowerPlate[2]],
  [tl, upperPlate[1]],
  [tr, upperPlate[2]]]
  for (let i = 0; i < 4; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let tan1 = i < 2 ? 0 : gradient;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], tan1, 0, stiffWidth);
    let side2D = i % 2 === 0 ? null : [0, 3, 2, 1];
    result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D)
  }

  let webBracketPoint = [[lowerPlate[0], upperPlate[0]], [lowerPlate[3], upperPlate[3]]];
  for (let i = 0; i < 2; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.bracketLength : -dsi.bracketLength;
    let stiffner = PlateRestPoint(webBracketPoint[i][0], webBracketPoint[i][1], 0, 0, stiffWidth)
    result["webBracket" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.webThickness, [0, 1], dsi.scallopRadius, null, null, [], [1, 2])
  }

  let webPlate = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y },
  { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y },
  { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y },
  { x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y }];

  result["webPlate"] = vPlateGen(webPlate, point, dsi.webThickness, [], 0, null, null, [], [2, 3], [0, 1, 2, 3])

  let upperflange = [{ x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y },
  { x: upperPlate[0].x + dsi.bracketLength, y: upperPlate[0].y + dsi.flangeThickness },
  { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y + dsi.flangeThickness },
  { x: upperPlate[3].x - dsi.bracketLength, y: upperPlate[3].y }]
  let uPoint = ToGlobalPoint(point, upperflange[0])
  let upperflangeL = upperPlate[3].x - upperPlate[0].x - 2 * dsi.bracketLength
  let upperflange2 = [{ x: 0, y: dsi.flangeWidth / 2 },
  { x: 0, y: - dsi.flangeWidth / 2 },
  { x: upperflangeL, y: - dsi.flangeWidth / 2 },
  { x: upperflangeL, y: dsi.flangeWidth / 2 }]
  result["upperflange"] = hPlateGen(upperflange2, uPoint, dsi.flangeThickness, 0, point.skew, 0, 0, upperflange, true, [0, 1])
  // { points: upperflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }
  let lowerflange = [{ x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y },
  { x: lowerPlate[0].x + dsi.bracketLength, y: lowerPlate[0].y - dsi.flangeThickness },
  { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y - dsi.flangeThickness },
  { x: lowerPlate[3].x - dsi.bracketLength, y: lowerPlate[3].y }]
  let lPoint = ToGlobalPoint(point, lowerflange[1])
  let lowerflangeL = lowerflange[3].x - lowerflange[0].x
  let lowerflange2 = [{ x: 0, y: dsi.flangeWidth / 2 },
  { x: 0, y: - dsi.flangeWidth / 2 },
  { x: lowerflangeL, y: - dsi.flangeWidth / 2 },
  { x: lowerflangeL, y: dsi.flangeWidth / 2 }]
  result["lowerflange"] = hPlateGen(lowerflange2, lPoint, dsi.flangeThickness, 0, point.skew, 0, 0, lowerflange, false, [0, 1])
  // { points: lowerflange, Thickness: dsi.flangeWidth, z: - dsi.flangeWidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [], }

  let joint = IbeamJoint(webPlate, point, dsi, wBolt, fBolt)
  for (let i in joint) { result[i] = joint[i] }

  return result
}

export function DYdia0(webPoints, point, skew, lflangePoint, ds) {
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

  // const topY = 270; // 슬래브두께 + 헌치값이 포함된 값. 우선 변수만 입력
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  // const rotationY = (skew - 90) * Math.PI / 180
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
  let lowerPlateL = lflangePoint[1][1].x - lflangePoint[0][1].x
  let lowerPlate2 = [{ x: 0, y: dsi.lowerWidth / 2 }, { x: 0, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: dsi.lowerWidth / 2 }]
  let lPoint = ToGlobalPoint(point, lflangePoint[0][1])
  result["lowerPlate"] = hPlateGen(lowerPlate2, lPoint, dsi.lowerThickness, - dsi.lowerThickness, point.skew, 0, 0, lowerPlate, false, [0, 1])

  let upperPlate = [
    { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
    { x: bl.x + lwCot * (dsi.upperHeight + dsi.upperThickness), y: bl.y + dsi.upperHeight + dsi.upperThickness },
    { x: br.x + rwCot * (dsi.upperHeight + dsi.upperThickness), y: br.y + dsi.upperHeight + dsi.upperThickness },
    { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
  ]
  let upperPlateL = upperPlate[3].x - upperPlate[0].x
  let upperPlate2 = [{ x: 0, y: dsi.upperWidth / 2 }, { x: 0, y: -dsi.upperWidth / 2 }, { x: upperPlateL, y: - dsi.upperWidth / 2 }, { x: upperPlateL, y: dsi.upperWidth / 2 }];
  let uPoint = ToGlobalPoint(point, upperPlate[0]);
  result["upperPlate"] = hPlateGen(upperPlate2, uPoint, dsi.upperThickness, 0, point.skew, 0, 0, upperPlate, true, [0, 1])

  let centerPlate = [bl, br, upperPlate[3], upperPlate[0]]
  result["centerPlate"] = vPlateGen(centerPlate, point, dsi.centerThickness, [0, 1, 2, 3], dsi.scallopRadius, null, null, [], [2, 3], [0, 1, 2, 3])

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
  stiffnerPoints.push(...Fillet2D(addedPoint[1], addedPoint[2], stiffner[3], dsi.filletR, 4));
  stiffnerPoints.push(stiffner[3]);
  result["stiffner1"] = vPlateGen(stiffnerPoints, point, dsi.stiffThickness, [], dsi.scallopRadius, null, null, []);

  stiffnerPoint = [tr, upperPlate[2]]
  tan1 = gradient;
  stiffner = PlateRestPoint(stiffnerPoint[0], stiffnerPoint[1], tan1, 0, -stiffWidth)
  addedPoint = [{ x: upperPlate[2].x - dsi.stiffWidth2, y: upperPlate[2].y },
  { x: upperPlate[2].x - dsi.stiffWidth2, y: upperPlate[2].y + 50 },
  { x: upperPlate[2].x - dsi.stiffWidth, y: upperPlate[2].y + 50 + dsi.stiffWidth2 - dsi.stiffWidth }];
  stiffnerPoints = [];
  stiffnerPoints.push(stiffner[0]);
  stiffnerPoints.push(stiffner[1]);
  stiffnerPoints.push(addedPoint[0], addedPoint[1])
  stiffnerPoints.push(...Fillet2D(addedPoint[1], addedPoint[2], stiffner[3], dsi.filletR, 4))
  stiffnerPoints.push(stiffner[3])
  result["stiffner2"] = vPlateGen(stiffnerPoints, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, [1, 2, 10, 0]);

  return result
}

export function DYdia1(webPoints, point, skew, uflangePoint, ds) {
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
    { x: bl.x + lwCot * (dsi.lowerHeight - dsi.lowerThickness), y: bl.y + dsi.lowerHeight - dsi.lowerThickness },
    { x: br.x + rwCot * (dsi.lowerHeight - dsi.lowerThickness), y: br.y + dsi.lowerHeight - dsi.lowerThickness },
    { x: br.x + rwCot * dsi.lowerHeight, y: br.y + dsi.lowerHeight }
  ];
  let lowerPlateL = lowerPlate[3].x - lowerPlate[0].x;
  let lowerPlate2 = [{ x: 0, y: dsi.lowerWidth / 2 }, { x: 0, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: -dsi.lowerWidth / 2 }, { x: lowerPlateL, y: dsi.lowerWidth / 2 }];
  let lPoint = ToGlobalPoint(point, lowerPlate[0]);
  result["lowerPlate"] = hPlateGen(lowerPlate2, lPoint, dsi.lowerThickness, -dsi.lowerThickness, point.skew, 0, 0, lowerPlate, false, [0, 1]);

  let upperPlate = [
    { x: bl.x + lwCot * dsi.upperHeight, y: bl.y + dsi.upperHeight },
    { x: bl.x + lwCot * (dsi.upperHeight + dsi.upperThickness), y: bl.y + dsi.upperHeight + dsi.upperThickness },
    { x: br.x + rwCot * (dsi.upperHeight + dsi.upperThickness), y: br.y + dsi.upperHeight + dsi.upperThickness },
    { x: br.x + rwCot * dsi.upperHeight, y: br.y + dsi.upperHeight }
  ];
  let upperPlateL = upperPlate[3].x - upperPlate[0].x
  let upperPlate2 = [{ x: 0, y: dsi.upperWidth / 2 }, { x: 0, y: -dsi.upperWidth / 2 }, { x: upperPlateL, y: - dsi.upperWidth / 2 }, { x: upperPlateL, y: dsi.upperWidth / 2 }];
  let uPoint = ToGlobalPoint(point, upperPlate[0]);
  result["upperPlate"] = hPlateGen(upperPlate2, uPoint, dsi.upperThickness, 0, point.skew, 0, 0, upperPlate, true, [0, 1])

  let centerPlate = [lowerPlate[0], lowerPlate[3], upperPlate[3], upperPlate[0]]
  result["centerPlate"] = vPlateGen(centerPlate, point, dsi.centerThickness, [0, 1, 2, 3], dsi.scallopRadius, null, null, [], [2, 3], [0, 1, 2, 3])

  let stiffnerPoint = [[bl, lowerPlate[1]],
  [br, lowerPlate[2]],
  [tl, upperPlate[1]],
  [tr, upperPlate[2]]]
  for (let i = 0; i < 4; i++) {
    let stiffWidth = i % 2 === 0 ? dsi.stiffWidth : -dsi.stiffWidth;
    let tan1 = i < 2 ? 0 : gradient;
    let stiffner = PlateRestPoint(stiffnerPoint[i][0], stiffnerPoint[i][1], tan1, 0, stiffWidth)
    let side2D = i % 2 === 0 ? [0, 3, 2, 1] : null;
    result["stiffner" + i.toFixed(0)] = vPlateGen(stiffner, point, dsi.stiffThickness, [0, 1], dsi.scallopRadius, null, null, [], null, side2D)
  }
  return result
}

export function uBoxDia1(webPoints, point, skew, uflangePoint, uflange, lrib, ds, sectionDB) { //ribPoint needed
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
    bl, br,
    { x: br.x + rwCot * ds.lowerHeight, y: br.y + ds.lowerHeight },
    { x: bl.x + lwCot * ds.lowerHeight, y: bl.y + ds.lowerHeight }
  ];
  let lowerTopPoints = [lowerPlate[3],
  { x: bl.x + lwCot * (ds.lowerHeight + ds.lowerTopThickness), y: bl.y + (ds.lowerHeight + ds.lowerTopThickness) },
  { x: br.x + rwCot * (ds.lowerHeight + ds.lowerTopThickness), y: bl.y + (ds.lowerHeight + ds.lowerTopThickness) },
  lowerPlate[2]];

  let lrib2 = lrib
  lrib2.ribHoleD = ds.ribHoleD;
  lrib2.ribHoleR = ds.ribHoleR;
  lrib2.type = 0;
  // let lowerweldingLine = [lowerPlate[0], lowerPlate[1], lowerPlate[2], lowerPlate[3]]
  result["lowershape"] = vPlateGen(lowerPlate, point, ds.lowerThickness, [0, 1], ds.scallopRadius, null, lrib2, [], null, [0, 1, 2, 3])
  // {
  //   points: lowerPoints, Thickness: ds.lowerThickness, z: -ds.lowerThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: PlateSize(lowerPlate, 1, ds.lowerThickness),
  //   anchor: [[lowerPlate[0].x, lowerPlate[0].y - 50], [lowerPlate[3].x, lowerPlate[3].y - 50]],
  //   welding: [{ Line: lowerweldingLine, type: "FF", value1: 6 }]
  // }
  let lowerTop = [{ x: lowerPlate[2].x, y: - ds.lowerTopwidth / 2 }, { x: lowerPlate[2].x, y: ds.lowerTopwidth / 2 },
  { x: lowerPlate[3].x, y: ds.lowerTopwidth / 2 }, { x: lowerPlate[3].x, y: - ds.lowerTopwidth / 2 }]
  let centerPoint = ToGlobalPoint(point, { x: 0, y: lowerPlate[2].y })
  result["lowerTopShape"] = hPlateGen(lowerTop, centerPoint, ds.lowerTopThickness, 0, skew, 0, 0, lowerTopPoints, false, [0, 1])
  // {
  //   points: lowerTopPoints, Thickness: ds.lowerTopwidth, z: -ds.lowerTopwidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: PlateSize2(lowerPlate, 1, ds.lowerTopThickness, ds.lowerTopwidth),
  //   anchor: [[lowerTopPoints[1].x, lowerTopPoints[1].y + 50], [lowerTopPoints[2].x, lowerTopPoints[2].y + 50]]
  // }

  ///upper stiffener
  let upperPlate = [{ x: tl.x, y: tl.y }, { x: tl.x - lwCot * ds.upperHeight, y: tl.y - ds.upperHeight },
  { x: tr.x - rwCot * ds.upperHeight, y: tr.y - ds.upperHeight }, { x: tr.x, y: tr.y }];
  // let upperPoints = [...scallop(upperPlate[3], upperPlate[0], upperPlate[1], ds.scallopRadius, 4),
  // upperPlate[1], upperPlate[2], ...scallop(upperPlate[2], upperPlate[3], upperPlate[0], ds.scallopRadius, 4)];

  result["upper"] = vPlateGen(upperPlate, point, ds.upperThickness, [0, 3], ds.scallopRadius, null, null, [], [0, 3], [0, 3, 2, 1])
  // {
  //   points: upperPoints, Thickness: ds.upperThickness, z: -ds.upperThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: PlateSize(upperPlate, 1, ds.upperThickness),
  //   anchor: [[upperPlate[0].x, upperPlate[0].y - 50], [upperPlate[3].x, upperPlate[3].y - 50]]
  // }

  //upperTopPlate
  let gradRadian = Math.atan(gradient);
  let gcos = Math.cos(gradRadian + Math.PI / 2)
  let gtan = Math.tan(gradRadian + Math.PI / 2)
  let gsin = Math.sin(gradRadian + Math.PI / 2)

  if (uflange[0].length > 0) {
    let upperTop = [
      { x: uflange[0][1].x, y: -ds.upperTopwidth / 2 }, { x: uflange[0][1].x, y: ds.upperTopwidth / 2 },
      { x: uflange[1][1].x, y: ds.upperTopwidth / 2 }, { x: uflange[1][1].x, y: - ds.upperTopwidth / 2 }
    ]
    let cp = ToGlobalPoint(point, { x: 0, y: tl.y - gradient * tl.x })
    let upperTopPoints = PlateRestPoint(uflange[0][1], uflange[1][1], gtan, gtan, ds.upperTopThickness)
    result["upperTopShape"] = hPlateGen(upperTop, cp, ds.upperTopThickness, 0, skew, 0, -gradRadian, upperTopPoints, true, [0, 1])
    // {
    //   points: upperTopPoints, Thickness: ds.upperTopwidth, z: -ds.upperTopwidth / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
    //   size: PlateSize2(upperTopPoints, 0, ds.upperTopThickness, ds.upperTopwidth),
    //   anchor: [[upperTopPoints[0].x, upperTopPoints[0].y + 50], [upperTopPoints[1].x, upperTopPoints[1].y + 50]]
    // }
  }
  ////left side stiffner
  let leftPlate = PlateRestPoint(
    WebPoint(bl, tl, 0, bl.y + (ds.lowerHeight + ds.lowerTopThickness)),
    WebPoint(bl, tl, 0, tl.y - (ds.upperHeight + ds.leftsideTopThickness) * gsin), 0, gradient, ds.sideHeight)
  // let leftweldingLine = [leftPlate[3], leftPlate[0], leftPlate[1], leftPlate[2]]
  result["leftPlateShape"] = vPlateGen(leftPlate, point, ds.sideThickness, [], 0, null, null, [], null, [0, 3, 1, 2]);
  // {
  //   points: leftPlate, Thickness: ds.sideThickness, z: -ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: PlateSize(leftPlate, 0, ds.sideThickness),
  //   anchor: [[leftPlate[0].x + 50, leftPlate[0].y], [leftPlate[1].x + 50, leftPlate[1].y]],
  //   welding: [{ Line: leftweldingLine, type: "FF", value1: 6 }]
  // }
  //   ////right side stiffner
  let rightPlate = PlateRestPoint(
    WebPoint(br, tr, 0, br.y + (ds.lowerHeight + ds.lowerTopThickness)),
    WebPoint(br, tr, 0, tr.y - (ds.upperHeight + ds.leftsideTopThickness) * gsin), 0, gradient, -ds.sideHeight)
  result["rightPlateShape"] = vPlateGen(rightPlate, point, ds.sideThickness, [], 0, null, null, [], null, null);
  // {
  //   points: rightPlate, Thickness: ds.sideThickness, z: -ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: PlateSize(rightPlate, 0, ds.sideThickness),
  //   anchor: [[rightPlate[0].x - 50, rightPlate[0].y], [rightPlate[1].x - 50, rightPlate[1].y]]
  // }
  let cp1 = ToGlobalPoint(point, { x: 0, y: leftPlate[1].y - gradient * leftPlate[1].x })
  ////leftside top plate
  let leftTop = [
    { x: leftPlate[1].x / gsin, y: - ds.leftsideToplength / 2 }, { x: leftPlate[1].x / gsin, y: ds.leftsideToplength / 2 },
    { x: leftPlate[1].x / gsin + ds.leftsideTopwidth, y: ds.leftsideToplength / 2 }, { x: leftPlate[1].x / gsin + ds.leftsideTopwidth, y: - ds.leftsideToplength / 2 }
  ];

  let leftTopPlate = PlateRestPoint(
    upperPlate[1], { x: upperPlate[1].x + ds.leftsideTopwidth * gsin, y: upperPlate[1].y - ds.leftsideTopwidth * gcos },
    1 / lwCot, -1 / gradient, -ds.leftsideTopThickness);

  result["leftTopPlateShape"] = hPlateGen(leftTop, cp1, ds.leftsideTopThickness, 0, skew, 0, -gradRadian, leftTopPlate, true, [0, 1]);
  // {
  //   points: leftTopPlate, Thickness: ds.leftsideToplength, z: -ds.leftsideToplength / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: PlateSize2(leftTopPlate, 0, ds.leftsideTopThickness, ds.leftsideToplength),
  //   anchor: [[leftTopPlate[0].x + 50, leftTopPlate[0].y + 50], [leftTopPlate[1].x + 50, leftTopPlate[1].y + 50]]
  // }
  ////rightside top plate
  let rightTop = [
    { x: rightPlate[1].x / gsin, y: - ds.rightsideToplength / 2 }, { x: rightPlate[1].x / gsin, y: ds.rightsideToplength / 2 },
    { x: rightPlate[1].x / gsin - ds.rightsideTopwidth, y: ds.rightsideToplength / 2 }, { x: rightPlate[1].x / gsin - ds.rightsideTopwidth, y: - ds.rightsideToplength / 2 }
  ];
  let rightTopPlate = PlateRestPoint(
    upperPlate[2], { x: upperPlate[2].x - ds.rightsideTopwidth * gsin, y: upperPlate[2].y + ds.rightsideTopwidth * gcos },
    1 / rwCot, -1 / gradient, -ds.rightsideTopThickness);
  // let cp2 = ToGlobalPoint(point, rightPlate[1])
  result["rightTopPlateShape"] = hPlateGen(rightTop, cp1, ds.rightsideTopThickness, 0, skew, 0, -gradRadian, rightTopPlate, true, [0, 1]);
  // {
  //   points: rightTopPlate, Thickness: ds.rightsideToplength, z: -ds.rightsideToplength / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: PlateSize2(rightTopPlate, 0, ds.rightsideTopThickness, ds.rightsideToplength),
  //   anchor: [[rightTopPlate[1].x - 80, rightTopPlate[1].y + 50], [rightTopPlate[0].x - 80, rightTopPlate[0].y + 50]]
  // }
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
  result["leftframe1"] = vFrameGen(leftframe1, point, pts[4], ds.sideThickness / 2, null, null);
  result["leftframe2"] = vFrameGen(leftframe2, point, pts[5], ds.sideThickness / 2, null, null)

  // { points: leftframe1, Thickness: pts[4], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [] }
  // result["leftframe2"] = 
  // {
  //   points: leftframe2, Thickness: pts[5], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: { Label: "L-100x100x10x" + PointLength(...newleftline).toFixed(0) },
  //   anchor: [[newleftline[1].x - 20, newleftline[1].y], [newleftline[0].x - 20, newleftline[0].y]]
  // }

  let rightline = [{ x: ds.spc * gsin, y: -topY - ds.spc * gcos }, lowerTopPoints[2]]
  let rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x) ** 2 + (rightline[1].y - rightline[0].y) ** 2)
  let rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x)
  let rsin = rcos * rtan
  let newrightline = [
    { x: rightline[0].x - (ds.spc + rcos * pts[3]) / rtan, y: rightline[0].y - (ds.spc + rcos * pts[3]) },
    { x: rightline[1].x - (ds.spc - rsin * pts[3]), y: rightline[1].y - rtan * (ds.spc - rsin * pts[3]) }
  ]
  let [rightframe1, rightframe2] = Kframe(newrightline[0], newrightline[1], 0, 0, pts)
  result["rightframe1"] = vFrameGen(rightframe1, point, pts[4], ds.sideThickness / 2, null, null);
  result["rightframe2"] = vFrameGen(rightframe2, point, pts[5], ds.sideThickness / 2, null, null);
  // {
  //   points: rightframe2, Thickness: pts[5], z: ds.sideThickness / 2, rotationX: Math.PI / 2, rotationY: rotationY, hole: [],
  //   size: { Label: "L-100x100x10x" + PointLength(...newrightline).toFixed(0) },
  //   anchor: [[newrightline[0].x + 20, newrightline[0].y], [newrightline[1].x + 20, newrightline[1].y]]
  // }
  return result
}

export function boxDiaHole1(webPoints, point, skew, uflange, urib, lrib, diaSection) { //ribPoint needed
  // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
  // dia6에서 가져옴 200811
  let result = {}
  let isLeft = false;
  let sign = isLeft ? 1 : -1;
  let dsi = {
    webThickness: diaSection.plateThickness,
    hstiffWidth: diaSection.hStiffWidth,
    hstiffWidth2: diaSection.vStiffWidth,
    hstiffThickness: diaSection.hStiffThickness,
    hstiffHeight: diaSection.hStiffBottomOffset,
    scallopRadius: diaSection.scallopRadius,
    ribHoleD: 42,
    ribHoleR: 25,
    holeBottomY: diaSection.holeBottomOffset, //y축은 중앙이 기준
    holeCenterOffset: sign * diaSection.holeRightOffset - sign * diaSection.holeWidth / 2,
    holeWidth: sign * diaSection.holeWidth,
    holeHeight: diaSection.holeHeight,
    holeFilletR: diaSection.holeFilletR,
    holeStiffThickness: diaSection.holeVstiffnerThickness,
    holeStiffhl: diaSection.holeHstiffnerLength,
    holeStiffvl: diaSection.holeVstiffnerLength,
    holeStiffmargin: diaSection.holeStiffSpacing,
    holeStiffHeight: diaSection.holeVstiffnerhight,
    supportStiffLayout: diaSection.vStiffLayout,
    supportStiffWidth: diaSection.vStiffWidth,
    supportStiffThickness: diaSection.vStiffThickness,
  } //  임시 입력변수

  // const plateThickness = diaSection.plateThickness;
  // const holeBottomOffset = diaSection.holeBottomOffset;
  // const holeCenterOffset = diaSection.holeRightOffset - diaSection.holeWidth / 2;
  // const holeFilletR = diaSection.holeFilletR;
  // const holeHeight = diaSection.holeHeight;
  // const holeWidth = diaSection.holeWidth;
  // const vStiffThickness = diaSection.vStiffThickness;
  // const vStiffWidth = diaSection.vStiffWidth;
  // const vStiffLayout = diaSection.vStiffLayout;
  const topPlateWidth = diaSection.topPlateWidth;
  const topPlateThickness = diaSection.topPlateThickness;

  // const hStiffThickness = diaSection.hStiffThickness
  // const hStiffWidth = diaSection.hStiffWidth
  // const hStiffBottomOffset = diaSection.hStiffBottomOffset
  // let longiRibHeight = diaSection.longiRibHeight;
  // let longiRibRayout = diaSection.longiRibRayout;
  // const holeVstiffnerThickness = diaSection.holeVstiffnerThickness
  // const holeVstiffnerhight = diaSection.holeVstiffnerhight
  // const holeVstiffnerLength = diaSection.holeVstiffnerLength
  // const holeHstiffnerThickness = diaSection.holeHstiffnerThickness
  // const holeStiffHeight = diaSection.holeHstiffnerHeight
  // const holeStiffhl = diaSection.holeHstiffnerLength
  // const holeStiffmargin = diaSection.holeStiffSpacing
  // // added letiables
  // let scallopRadius = diaSection.scallopRadius;


  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const gradient = (tr.y - tl.y) / (tr.x - tl.x)
  const lwCot = (tl.x - bl.x) / (tl.y - bl.y)
  const rwCot = (tr.x - br.x) / (tr.y - br.y)
  const cosec = Math.abs(1 / Math.sin(skew * Math.PI / 180));
  const cot = Math.abs(1 / Math.tan(skew * Math.PI / 180));
  const ang90 = Math.PI / 2

  let urib2 = urib
  urib2.ribHoleD = dsi.ribHoleD
  urib2.ribHoleR = dsi.ribHoleR
  let lrib2 = lrib
  lrib2.ribHoleD = dsi.ribHoleD
  lrib2.ribHoleR = dsi.ribHoleR
  lrib.type = 1; //하부리브 스캘럽

  let holeRect = [{ x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY }, { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY },
  { x: -dsi.holeWidth / 2 + dsi.holeCenterOffset - sign * 100, y: bl.y + dsi.holeBottomY + dsi.holeHeight }, { x: dsi.holeWidth / 2 + dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight }];
  let holePoints = [];
  holePoints.push(...Fillet2D(holeRect[0], holeRect[1], holeRect[2], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[1], holeRect[2], holeRect[3], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[2], holeRect[3], holeRect[0], dsi.holeFilletR, 4));
  holePoints.push(...Fillet2D(holeRect[3], holeRect[0], holeRect[1], dsi.holeFilletR, 4));
  result["mainPlate"] = vPlateGen([bl, br, tr, tl], point, dsi.webThickness, [0, 1, 2, 3], dsi.scallopRadius, urib2, lrib2, holePoints, [2, 3], [0, 1, 2, 3]);

  let holeCenter1 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness }
  let hstiff1 = [{ x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 }, { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
  { x: dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: -dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
  // let hstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
  // { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin - dsi.holeStiffThickness },
  // { x: dsi.holeCenterOffset + dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin },
  // { x: dsi.holeCenterOffset - dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY - dsi.holeStiffmargin }]
  result["hstiff1"] = hPlateGenV2(hstiff1, point, holeCenter1, dsi.holeStiffThickness, 0, point.skew, 0, 0, ang90, ang90, false, [1, 2])
  let hstiff2 = [{ x: - sign * (dsi.holeStiffhl / 2 + 100), y: dsi.webThickness / 2 }, { x: sign * dsi.holeStiffhl / 2, y: dsi.webThickness / 2 },
  { x: sign * dsi.holeStiffhl / 2, y: dsi.webThickness / 2 + dsi.holeStiffHeight }, { x: - sign * (dsi.holeStiffhl / 2 + 100), y: dsi.webThickness / 2 + dsi.holeStiffHeight }];
  let holeCenter2 = { x: dsi.holeCenterOffset, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }
  // let hstiff2D2 = [{ x: dsi.holeCenterOffset - sign * (dsi.holeStiffhl / 2 + 100), y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
  // { x: dsi.holeCenterOffset + sign * dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin + dsi.holeStiffThickness },
  // { x: dsi.holeCenterOffset + sign * dsi.holeStiffhl / 2, y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin },
  // { x: dsi.holeCenterOffset - sign * (dsi.holeStiffhl / 2 + 100), y: bl.y + dsi.holeBottomY + dsi.holeHeight + dsi.holeStiffmargin }]
  result["hstiff2"] = hPlateGenV2(hstiff2, point, holeCenter2, dsi.holeStiffThickness, 0, point.skew, 0, 0, ang90, ang90, true, [1, 2])
  let holeCenter3 = { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign * (100 / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  let vstiff1 = [{ x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 }, { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 },
  { x: dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }, { x: -dsi.holeStiffvl / 2, y: -dsi.webThickness / 2 - dsi.holeStiffHeight }];
  let vStiffRad = Math.atan(sign * dsi.holeHeight / 100)
  // let vcos = Math.cos(- vStiffRad - Math.PI/2)
  // let vsin = Math.sin(- vStiffRad - Math.PI/2)
  // let x1 = - sign* (dsi.holeStiffThickness);
  // let x2 = 0;
  // let y1 = dsi.holeStiffvl / 2;
  // let y2 = - dsi.holeStiffvl / 2;
  // let vstiff2D1 = [{ x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign* ( 100/2 + dsi.holeStiffmargin) + x1 * vcos - y1 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x1 * vsin + y1 * vcos },
  // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign * ( 100/2 + dsi.holeStiffmargin) + x1 * vcos - y2 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x1 * vsin + y2 * vcos },
  // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign* ( 100/2 + dsi.holeStiffmargin) + x2 * vcos - y2 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x2 * vsin + y2 * vcos },
  // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - sign* ( 100/2 + dsi.holeStiffmargin) + x2 * vcos - y1 * vsin, y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + x2 * vsin + y1 * vcos }]
  result["vstiff1"] = hPlateGenV2(vstiff1, point, holeCenter3, dsi.holeStiffThickness, 0, point.skew, 0, vStiffRad, ang90, ang90, true, [1, 2])
  let holeCenter4 = { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 }
  // let vstiff2D2 = [{ x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin + dsi.holeStiffThickness), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 },
  // { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin + dsi.holeStiffThickness), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  // { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2 },
  // { x: dsi.holeCenterOffset + dsi.holeWidth / 2 + sign * (dsi.holeStiffmargin), y: bl.y + dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 }]
  result["vstiff2"] = hPlateGenV2(vstiff1, point, holeCenter4, dsi.holeStiffThickness, 0, point.skew, 0, Math.PI / 2, ang90, ang90, true, null)


  for (let i in dsi.supportStiffLayout) {
    let supportStiffCenter1 = { x: dsi.supportStiffLayout[i], y: tl.y + gradient * (dsi.supportStiffLayout[i] - tl.x) };
    let supportStiff1 = [{ x: 0, y: dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: dsi.webThickness / 2 },
    { x: supportStiffCenter1.y - bl.y, y: dsi.supportStiffWidth + dsi.webThickness / 2 }, { x: 0, y: dsi.supportStiffWidth + dsi.webThickness / 2 }];
    let supportStiff2 = [{ x: 0, y: -dsi.webThickness / 2 }, { x: supportStiffCenter1.y - bl.y, y: -dsi.webThickness / 2 },
    { x: supportStiffCenter1.y - bl.y, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }, { x: 0, y: - dsi.supportStiffWidth - dsi.webThickness / 2 }];
    let supportStiff2D = [
      { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2 - tl.x) },
      { x: dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, y: bl.y },
      { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: bl.y },
      { x: dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, y: tl.y + gradient * (dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2 - tl.x) }
    ]
    result["supportStiff1" + i] = hPlateGen(supportStiff1, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, supportStiff2D, true);
    result["supportStiff2" + i] = hPlateGen(supportStiff2, ToGlobalPoint(point, supportStiffCenter1), dsi.supportStiffThickness, -dsi.supportStiffThickness / 2, point.skew, 0, Math.PI / 2, null, true);
  }

  let hStiffCenter = { x: 0, y: bl.y + dsi.hstiffHeight };
  // let h1 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.hstiffWidth - dsi.webThickness / 2 },
  //    { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: -dsi.holeStiffHeight - dsi.webThickness / 2 },
  // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: - dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: - dsi.webThickness / 2 }];
  // result["h1"] = hPlateGen(h1, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);
  // let h11 = [{ x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.hstiffWidth + dsi.webThickness / 2 }, { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.holeStiffHeight + dsi.webThickness / 2 },
  // { x: dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, y: dsi.webThickness / 2 }, { x: bl.x + lwCot * dsi.hstiffHeight, y: dsi.webThickness / 2 }];
  // result["h11"] = hPlateGen(h11, ToGlobalPoint(point, hStiffCenter), dsi.hstiffThickness, 0, point.skew, 0, 0);

  let w0 = dsi.webThickness / 2;
  let w1 = dsi.holeStiffHeight + dsi.webThickness / 2;
  let w2 = dsi.hstiffWidth + dsi.webThickness / 2;
  let w3 = dsi.hstiffWidth2 + dsi.webThickness / 2;

  let hx = [[bl.x + lwCot * dsi.hstiffHeight, w2], [br.x + rwCot * dsi.hstiffHeight, w2]];
  if (dsi.hstiffHeight < dsi.holeBottomY + dsi.holeHeight / 2 + dsi.holeStiffvl / 2 && dsi.hstiffHeight > dsi.holeBottomY + dsi.holeHeight / 2 - dsi.holeStiffvl / 2) {
    hx.push([dsi.holeCenterOffset - dsi.holeWidth / 2 - dsi.holeStiffmargin - dsi.holeStiffThickness, w1],
      [dsi.holeCenterOffset + dsi.holeWidth / 2 + dsi.holeStiffmargin + dsi.holeStiffThickness, w1])
  }
  for (let i in dsi.supportStiffLayout) {
    hx.push([dsi.supportStiffLayout[i] - dsi.supportStiffThickness / 2, w3]);
    hx.push([dsi.supportStiffLayout[i] + dsi.supportStiffThickness / 2, w3]);
  }
  hx.sort(function (a, b) { return a[0] - b[0] })
  let h2 = [];
  let h3 = [];
  for (let i = 0; i < hx.length / 2; i++) {
    h2.push([{ x: hx[i * 2][0], y: -(hx[i * 2][1] - 10) },
    { x: hx[i * 2][0] + 10, y: -hx[i * 2][1] },
    { x: hx[i * 2 + 1][0] - 10, y: -hx[i * 2 + 1][1] },
    { x: hx[i * 2 + 1][0], y: -(hx[i * 2 + 1][1] - 10) },
    { x: hx[i * 2 + 1][0], y: -(w0 + 10) },
    { x: hx[i * 2 + 1][0] - 10, y: -w0 },
    { x: hx[i * 2][0] + 10, y: -w0 },
    { x: hx[i * 2][0], y: -(w0 + 10) }]);
    h3.push([{ x: hx[i * 2][0], y: (hx[i * 2][1] - 10) },
    { x: hx[i * 2][0] + 10, y: hx[i * 2][1] },
    { x: hx[i * 2 + 1][0] - 10, y: hx[i * 2 + 1][1] },
    { x: hx[i * 2 + 1][0], y: (hx[i * 2 + 1][1] - 10) },
    { x: hx[i * 2 + 1][0], y: (w0 + 10) },
    { x: hx[i * 2 + 1][0] - 10, y: w0 },
    { x: hx[i * 2][0] + 10, y: w0 },
    { x: hx[i * 2][0], y: (w0 + 10) }]);
  }
  let cpt = ToGlobalPoint(point, hStiffCenter)
  for (let i in h2) {
    // let h2D = [{ x: h2[i][0].x, y: hStiffCenter.y },
    // { x: h2[i][3].x, y: hStiffCenter.y },
    // { x: h2[i][3].x, y: hStiffCenter.y + dsi.hstiffThickness },
    // { x: h2[i][0].x, y: hStiffCenter.y + dsi.hstiffThickness }]
    result["h2" + i] = hPlateGenV2(h2[i], point, hStiffCenter, dsi.hstiffThickness, 0, point.skew, 0, 0, ang90, ang90, true, [2, 6]);
    result["h3" + i] = hPlateGenV2(h3[i], point, hStiffCenter, dsi.hstiffThickness, 0, point.skew, 0, 0, null, null, true, [2, 6]);
  }

  let gradRadian = Math.atan(gradient);
  let gsec = 1 / Math.cos(gradRadian);
  let gtan = Math.tan(gradRadian + Math.PI / 2)
  // topPlate
  if (uflange[0].length > 0) {
    let topPlate2D = PlateRestPoint(uflange[0][1], uflange[1][1], gtan, gtan, topPlateThickness);
    let topPlate = [
      { x: uflange[0][1].x, y: topPlateWidth / 2 },
      { x: uflange[0][1].x, y: - topPlateWidth / 2 },
      { x: uflange[1][1].x, y: - topPlateWidth / 2 },
      { x: uflange[1][1].x, y: topPlateWidth / 2 },
    ]
    let cp = ToGlobalPoint(point, { x: 0, y: tl.y - tl.x * gradient })
    let cp2 = { x: 0, y: tl.y - tl.x * gradient }
    const ang90 = Math.PI / 2
    result['topPlate'] = hPlateGenV2(topPlate, point, cp2, topPlateThickness, 0, skew, 0, -gradRadian, ang90, ang90, true, [0, 1])
  }
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
  let result = {};
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
  // let normalCos = Vector[1] / VectorLength;
  // let normalSin = - Vector[0] / VectorLength;
  let centerPoint = {
    x:(Brline[1].x + Brline[0].x)/2,
    y:(Brline[1].y + Brline[0].y)/2,
    z: (Brline[1].z + Brline[0].z)/2,
    normalCos : Vector[1] / VectorLength,
    normalSin : - Vector[0] / VectorLength,
    offset : point1.offset + (node1.x + node2.x)/2
  };
  let [frame1, frame2] = Kframe({x:0,y: -VectorLength/2}, {x:0,y: VectorLength/2}, spc, spc, pts)
  let z1 =  pts[4]>0? 0: pts[4]
  let z2 =  pts[5]>0? 0: pts[5]
  result['frame1'] = hPlateGen(frame1, centerPoint, Math.abs(pts[4]),z1,90,Math.atan(Vector[2]/VectorLength),0,null,true,null)
  result['frame2'] = hPlateGen(frame2, centerPoint, Math.abs(pts[5]),z2,90,Math.atan(Vector[2]/VectorLength),0,null,true,null)
  return result 
}

export function hBracingPlate(point, right, webPoints, hBSection) {
  // const topY = 270; //슬래브두께 + 헌치가 포함된 값이어야함.
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
    position = { x: tr.x - rwCot * (upperHeight + sideTopThickness), y: tr.y - (upperHeight + sideTopThickness) };
    rotationY = -rotationY
  } else {
    position = { x: tl.x - lwCot * (upperHeight + sideTopThickness), y: tl.y - (upperHeight + sideTopThickness) };
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

  return hPlateGen(plateShape, point, sideTopThickness, position.y, 90, 0, rotationY,null,true,null)
  // { point: point, plate: { points: plateShape, Thickness: sideTopThickness, z: position.y, rotationX: 0, rotationY: rotationY, hole: [] } }
}

// 판요소 생성시 기준점은 좌측하단을 기준으로 반드시 시계반대방향으로 회전할 것
export function vPlateGen(points, centerPoint, Thickness, scallopVertex, scallopR, urib, lrib, holePoints, top2D, side2D) {
  let skew = centerPoint.skew;

  const bl = points[0];
  const br = points[1];
  const tl = points[3];
  const tr = points[2];

  const gradient = (tr.y - tl.y) / (tr.x - tl.x)
  const gradient2 = (br.y - bl.y) / (br.x - bl.x)

  const cosec = 1 / Math.sin(skew * Math.PI / 180);
  const rotationY = (skew - 90) * Math.PI / 180

  let topView = null;
  let sideView = null;

  if (top2D) {
    let pt1 = { x: points[top2D[0]].x * cosec, y: 0 }
    let pt2 = { x: points[top2D[1]].x * cosec, y: 0 }
    let gpt1 = ToGlobalPoint(centerPoint, pt1);
    let gpt2 = ToGlobalPoint(centerPoint, pt2);
    let th = Thickness / 2 * cosec;
    let dx = centerPoint.normalSin * th;
    let dy = centerPoint.normalCos * th;
    topView = [{ x: gpt1.x - dx, y: gpt1.y + dy },
    { x: gpt1.x + dx, y: gpt1.y - dy },
    { x: gpt2.x + dx, y: gpt2.y - dy },
    { x: gpt2.x - dx, y: gpt2.y + dy }];
  }

  if (side2D) {
    let bottomY = centerPoint.z + (points[side2D[0]].y - points[side2D[1]].y) / (points[side2D[0]].x - points[side2D[1]].x) * (- points[side2D[1]].x) + points[side2D[1]].y;
    let topY = centerPoint.z + (points[side2D[2]].y - points[side2D[3]].y) / (points[side2D[2]].x - points[side2D[3]].x) * (- points[side2D[3]].x) + points[side2D[3]].y;
    let X = centerPoint.girderStation;
    sideView = [
      { x: X + Thickness / 2, y: bottomY },
      { x: X - Thickness / 2, y: bottomY },
      { x: X - Thickness / 2, y: topY },
      { x: X + Thickness / 2, y: topY },
    ]
  }

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

  let result = {
    points2D: resultPoints, points: resultPoints, Thickness: Thickness, z: - Thickness / 2,
    rotationX: Math.PI / 2, rotationY: rotationY, hole: holePoints, point: centerPoint, topView, sideView
  }

  return result
}


export function vFrameGen(points, centerPoint, Thickness, z, top2D, side2D) {
  let skew = centerPoint.skew;
  const cosec = 1 / Math.sin(skew * Math.PI / 180);
  const rotationY = (skew - 90) * Math.PI / 180
  let topView = null;
  let sideView = null;
  if (top2D) {
    let pt1 = { x: points[top2D[0]].x * cosec, y: 0 }
    let pt2 = { x: points[top2D[1]].x * cosec, y: 0 }
    let gpt1 = ToGlobalPoint(centerPoint, pt1);
    let gpt2 = ToGlobalPoint(centerPoint, pt2);
    // let th = Thickness * cosec;
    let dx1 = centerPoint.normalSin * (Thickness + z) * cosec;
    let dy1 = centerPoint.normalCos * (Thickness + z) * cosec;
    let dx2 = centerPoint.normalSin * (z) * cosec;
    let dy2 = centerPoint.normalCos * (z) * cosec;
    topView = [{ x: gpt1.x + dx1, y: gpt1.y - dy1 },
    { x: gpt1.x + dx2, y: gpt1.y - dy2 },
    { x: gpt2.x + dx2, y: gpt2.y - dy2 },
    { x: gpt2.x + dx1, y: gpt2.y - dy1 }];
  }

  if (side2D) {
    let bottomY = centerPoint.z + (points[side2D[0]].y - points[side2D[1]].y) / (points[side2D[0]].x - points[side2D[1]].x) * (- points[side2D[1]].x) + points[side2D[1]].y;
    let topY = centerPoint.z + (points[side2D[2]].y - points[side2D[3]].y) / (points[side2D[2]].x - points[side2D[3]].x) * (- points[side2D[3]].x) + points[side2D[3]].y;
    let X = centerPoint.girderStation;
    sideView = [
      { x: X - Thickness, y: bottomY },
      { x: X - Thickness - z, y: bottomY },
      { x: X - Thickness - z, y: topY },
      { x: X - Thickness, y: topY },
    ]
  }
  let result = {
    points2D: points, points: points, Thickness: Thickness, z: z,
    rotationX: Math.PI / 2, rotationY: rotationY, hole: [], point: centerPoint, topView, sideView
  }

  return result
}


// export function hPlateGen(points, centerPoint, Thickness, z, skew, rotationX, rotationY) {
//   const cosec = 1 / Math.sin(skew * Math.PI / 180);
//   const cot = - 1 / Math.tan(skew * Math.PI / 180);
//   let resultPoints = [];
//   points.forEach(pt => resultPoints.push({ x: pt.x, y: pt.x * cot + pt.y * cosec }))

//   let result = { points: resultPoints, Thickness: Thickness, z: z, rotationX: rotationX, rotationY: rotationY, hole: [], point: centerPoint }
//   return result
// }

export function hPlateGen(points, centerPoint, Thickness, z, skew, rotationX, rotationY, points2D, top2D, side2D) {
  const cosec = 1 / Math.sin(skew * Math.PI / 180);
  const cot = - 1 / Math.tan(skew * Math.PI / 180);
  let cos = Math.cos(rotationY)
  let cosx = Math.cos(rotationX)
  let resultPoints = [];
  let topView = null;
  let sideView = null;

  points.forEach(pt => resultPoints.push({ x: pt.x, y: pt.x * cot + pt.y * cosec }))
  if (top2D) {
    topView = [];
    if (rotationY < Math.PI / 2 && rotationY > -Math.PI / 2) {
      resultPoints.forEach(function (pt) {
        let gpt = ToGlobalPoint(centerPoint, { x: pt.x * cos, y: 0 })
        let th = pt.y * cosx;
        let dx = centerPoint.normalSin * th;
        let dy = centerPoint.normalCos * th;
        topView.push({ x: gpt.x - dx, y: gpt.y + dy })
      });
    } else if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
      let gpt = ToGlobalPoint(centerPoint, { x: resultPoints[0].x * cos, y: 0 })
      for (let i = 0; i < 4; i++) {
        let sign = rotationY > 0 ? 1 : -1
        let th = i < 2 ? resultPoints[0].y * cosx : resultPoints[3].y * cosx;
        let dx = centerPoint.normalSin * th;
        let dy = centerPoint.normalCos * th;
        let dx2 = 0 < i && i < 3 ? sign * centerPoint.normalCos * z : sign * centerPoint.normalCos * (z + Thickness)
        let dy2 = 0 < i && i < 3 ? sign * centerPoint.normalSin * z : sign * centerPoint.normalSin * (z + Thickness)
        topView.push({ x: gpt.x - dx + dx2, y: gpt.y + dy + dy2 })
      }
    }
    // console.log("check", topView)
  }
  if (side2D || side2D === 0) {
    let cos = Math.cos(rotationX);
    let sin = Math.sin(rotationX);
    sideView = [];
    if (rotationY < Math.PI / 4 && rotationY > -Math.PI / 4) {
      let x1 = points[side2D[0]].y
      let x2 = points[side2D[1]].y
      let X = centerPoint.girderStation;
      let Y = centerPoint.z;
      let pts = [{ x: X + x1 * cos - z * sin, y: Y + x1 * sin + z * cos },
      { x: X + x2 * cos - z * sin, y: Y + x2 * sin + z * cos },
      { x: X + x2 * cos - (Thickness + z) * sin, y: Y + x2 * sin + (Thickness + z) * cos },
      { x: X + x1 * cos - (Thickness + z) * sin, y: Y + x1 * sin + (Thickness + z) * cos }]
      pts.forEach(pt => sideView.push(pt))

    } else { //if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
      // let sign = rotationY > 0 ? 1 : -1
      let dz = 0
      if (typeof side2D === "number") { dz = side2D }
      let X = centerPoint.girderStation;
      let Y = centerPoint.z + dz;
      points.forEach(pt => sideView.push({ x: X + pt.y, y: Y + pt.x * Math.sin(rotationY) }))
    }
  }

  let result = { points2D: points2D, points: resultPoints, Thickness: Thickness, z: z, rotationX: rotationX, rotationY: rotationY, hole: [], point: centerPoint, topView, sideView }
  return result
}

export function hPlateGenV2(points, Point, relativeCP, Thickness, z, skew, rotationX, rotationY, th1, th2, top2D, side2D) {
  const centerPoint = ToGlobalPoint(Point, relativeCP);
  const cosec = 1 / Math.sin(skew * Math.PI / 180);
  const cot = - 1 / Math.tan(skew * Math.PI / 180);
  let cos = Math.cos(rotationY)
  let cosx = Math.cos(rotationX)
  let resultPoints = [];
  let topView = null;
  let sideView = null;

  points.forEach(pt => resultPoints.push({ x: pt.x, y: pt.x * cot + pt.y * cosec }))
  if (top2D) {
    let yList = [];
    resultPoints.forEach(elem => yList.push(elem.y))
    topView = [];
    if (rotationY < Math.PI / 2 && rotationY > -Math.PI / 2) {
      resultPoints.forEach(function (pt) {
        let gpt = ToGlobalPoint(centerPoint, { x: pt.x * cos, y: 0 })
        let th = pt.y * cosx;
        let dx = centerPoint.normalSin * th;
        let dy = centerPoint.normalCos * th;
        topView.push({ x: gpt.x - dx, y: gpt.y + dy })
      });
    } else if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
      let gpt = ToGlobalPoint(centerPoint, { x: resultPoints[0].x * cos, y: 0 })
      for (let i = 0; i < 4; i++) {
        let sign = rotationY > 0 ? 1 : -1
        let th = i < 2 ? Math.min(...yList) * cosx : Math.max(...yList) * cosx;
        let dx = centerPoint.normalSin * th;
        let dy = centerPoint.normalCos * th;
        let dx2 = 0 < i && i < 3 ? sign * centerPoint.normalCos * z : sign * centerPoint.normalCos * (z + Thickness)
        let dy2 = 0 < i && i < 3 ? sign * centerPoint.normalSin * z : sign * centerPoint.normalSin * (z + Thickness)
        topView.push({ x: gpt.x - dx + dx2, y: gpt.y + dy + dy2 })
      }
    }
    // console.log("check", topView)
  }
  if (side2D || side2D === 0) {
    let cos = Math.cos(rotationX);
    let sin = Math.sin(rotationX);
    sideView = [];
    if (rotationY < Math.PI / 4 && rotationY > -Math.PI / 4) {
      let x1 = points[side2D[0]].y
      let x2 = points[side2D[1]].y
      let X = centerPoint.girderStation;
      let Y = centerPoint.z;
      let pts = [{ x: X + x1 * cos - z * sin, y: Y + x1 * sin + z * cos },
      { x: X + x2 * cos - z * sin, y: Y + x2 * sin + z * cos },
      { x: X + x2 * cos - (Thickness + z) * sin, y: Y + x2 * sin + (Thickness + z) * cos },
      { x: X + x1 * cos - (Thickness + z) * sin, y: Y + x1 * sin + (Thickness + z) * cos }]
      pts.forEach(pt => sideView.push(pt))

    } else { //if (rotationY === Math.PI / 2 || rotationY === - Math.PI / 2) {
      // let sign = rotationY > 0 ? 1 : -1
      let dz = 0
      if (typeof side2D === "number") { dz = side2D }
      let X = centerPoint.girderStation;
      let Y = centerPoint.z + dz;
      points.forEach(pt => sideView.push({ x: X + pt.y, y: Y + pt.x * Math.sin(rotationY) }))
    }
  }
  let points2D = null;
  if (th1 && th2) {
    let xList = [];
    points.forEach(elem => xList.push(elem.x))
    points2D = hPlateSide2D(Math.min(...xList), Math.max(...xList), Thickness, z, relativeCP, rotationY, th1, th2);
  } 
  let result = { points2D: points2D, points: resultPoints, Thickness: Thickness, z: z, rotationX: rotationX, rotationY: rotationY, hole: [], point: centerPoint, topView, sideView }
  return result
}

export function hPlateSide2D(x1, x2, t, z, cp, rot, th1, th2) {
  let result = [];
  // x1, x2, cp에 대한 rot 회전이전의 상대좌표 x값
  // t 판의 두께, th1, th2, x1,x2 꼭지점의 각(x축기준 시계반대방향각), rot는 시계방향각으로 부호를 반대로 적용
  // 판의 두께는 항상 양수의 값을 가져야 함
  // 글로벌 좌표기준 z방향  offset 거리
  let cos = Math.cos(-rot);
  let sin = Math.sin(-rot);
  let pts = [{ x: x1, y: z }, { x: x2, y: z },
  { x: x2 + t / Math.tan(th2), y: t + z }, { x: x1 + t / Math.tan(th1), y: t + z }];
  pts.forEach(pt => result.push({ x: cp.x + pt.x * cos - pt.y * sin, y: cp.y + pt.x * sin + pt.y * cos }))
  return result
}