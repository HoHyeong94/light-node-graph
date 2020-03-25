import { THREE } from "global";

import {ToGlobalPoint, PlateRestPoint, WebPoint, Kframe, scallop, Fillet2D ,PlateSize, PlateSize2, PointLength} from "../geometryModule"
import {PTS} from "../DB/module"

export function DiaShapeDict(
  gridPoint,
  sectionPointDict,
  diaphragmLayout,
  diaphragmSectionList,
  sectionDB
) {
  const position = 0;
  const section = 1 ;
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
    let skew = sectionPointDict[gridkey].forward.skew;
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
    }
    result[gridkey].point = gridPoint[gridkey];
  }
  
  return result;
}

export function VstiffShapeDict(
  gridPoint,
  sectionPointDict,
  vStiffLayout,
  vStiffSectionList
) {
  const position = 0;
  const section = 1 ;
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
    result[gridkey] = vStiffSection(webPoints, skew, uflangePoints, vSection);
    result[gridkey].point = gridPoint[gridkey]
  }
  
  return result;
}

export function HBracingDict(
    pointDict,
    sectionPointDict,
    hBracingLayout,
    hBracingectionList
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
  
      hBracingDict[pk1 + pk2] = hBracingSection(point1, point2, webPoints, hBSection);
      if (hBracingLayout[i][platelayout[0]]) {
        right = hBracingLayout[i][leftToright] ? false : true;
        let webPoints1 = [
          sectionPointDict[pk1].forward.lWeb[0],
          sectionPointDict[pk1].forward.lWeb[1],
          sectionPointDict[pk1].forward.rWeb[0],
          sectionPointDict[pk1].forward.rWeb[1]
        ];
        hBracingPlateDict[pk1] = hBracingPlate(point1, right, webPoints1, hBSection);
      }
      if (hBracingLayout[i][platelayout[1]]) {
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
  
    return { hBracingDict, hBracingPlateDict };
  }

export function diaphragmSection(webPoints, skew, uflangePoint, ds, sectionDB){ //ribPoint needed
    // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
    let result = {}
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    const rotationY = (skew - 90)*Math.PI/180
    const lwCot = (tl.x - bl.x)/(tl.y-bl.y)
    const rwCot = (tr.x - br.x)/(tr.y-br.y)
    const gradient = (tr.y- tl.y)/(tr.x-tl.x)

    ///lower stiffener
    let lowerPlate = [
      {x:bl.x + lwCot * ds.lowerHeight,y:bl.y + ds.lowerHeight}, bl, br,
      {x:br.x + rwCot * ds.lowerHeight,y:br.y + ds.lowerHeight}
    ];
    let lowerPoints = [];
    lowerPoints.push(lowerPlate[0]);
    lowerPoints = lowerPoints.concat(scallop(tl,bl,br,ds.scallopRadius,4));
    //// longitudinal stiffner holes
    for (let i=0; i<ds.longiRibRayout.length;i++){
      lowerPoints.push({x:ds.longiRibRayout[i] - ds.ribHoleD, y:lowerPlate[1].y});
      let curve = new THREE.ArcCurve(ds.longiRibRayout[i],lowerPlate[1].y + ds.longiRibHeight, ds.ribHoleR, Math.PI,0,true);
      let dummyVectors = curve.getPoints(8)
      for (let i = 0; i< dummyVectors.length;i++){
        lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y})
      }
      lowerPoints.push({x:ds.longiRibRayout[i] + ds.ribHoleD,y:lowerPlate[1].y});
    }
    lowerPoints = lowerPoints.concat(scallop(bl,br,tr,ds.scallopRadius,4));
    lowerPoints.push(lowerPlate[3]);
    let lowerTopPoints = [lowerPlate[0],
                          {x:bl.x + lwCot * (ds.lowerHeight+ds.lowerTopThickness), y:bl.y + (ds.lowerHeight+ds.lowerTopThickness)},
                          {x:br.x + rwCot * (ds.lowerHeight+ds.lowerTopThickness), y:bl.y + (ds.lowerHeight+ds.lowerTopThickness)},
                          lowerPlate[3]];
    result["lowerTopShape"] = {
      points:lowerTopPoints,Thickness:ds.lowerTopwidth,z:-ds.lowerTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size : PlateSize2(lowerPlate,1,ds.lowerTopThickness,ds.lowerTopwidth),
      anchor : [[lowerTopPoints[1].x,lowerTopPoints[1].y + 50],[lowerTopPoints[2].x,lowerTopPoints[2].y + 50]]
    }
    let lowerweldingLine = [lowerPlate[0],lowerPlate[1],lowerPlate[2],lowerPlate[3]]
    result["lowershape"]= {
      points:lowerPoints,Thickness:ds.lowerThickness,z:-ds.lowerThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[], 
      size: PlateSize(lowerPlate,1,ds.lowerThickness),
      anchor:[[lowerPlate[0].x,lowerPlate[0].y - 50],[lowerPlate[3].x,lowerPlate[3].y - 50]],
      welding:[{Line:lowerweldingLine,type:"FF",value1:6}]
    }
    ///upper stiffener
    let upperPlate = [{x:tl.x, y:tl.y},{x:tl.x - lwCot * ds.upperHeight,y: tl.y -ds.upperHeight},
                      {x:tr.x - rwCot * ds.upperHeight,y: tr.y -ds.upperHeight},{x:tr.x, y:tr.y}];
    let upperPoints = [...scallop(upperPlate[3],upperPlate[0],upperPlate[1],ds.scallopRadius,4),
      upperPlate[1],upperPlate[2],...scallop(upperPlate[2],upperPlate[3],upperPlate[0],ds.scallopRadius,4)];

    result["upper"] = {
      points:upperPoints,Thickness:ds.upperThickness,z:-ds.upperThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size: PlateSize(upperPlate,1,ds.upperThickness),
      anchor:[[upperPlate[0].x,upperPlate[0].y - 50],[upperPlate[3].x,upperPlate[3].y - 50]]
    } 
    //upperTopPlate
    
    let gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 )
    let gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
    let gtan = (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
    if (uflangePoint[0].x < uflangePoint[2].x){
    let upperTopPoints = PlateRestPoint(uflangePoint[0],uflangePoint[2],gtan,gtan,ds.upperTopThickness)
    result["upperTopShape"]= {
      points:upperTopPoints,Thickness:ds.upperTopwidth,z:-ds.upperTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size: PlateSize2(upperTopPoints,0,ds.upperTopThickness,ds.upperTopwidth),
      anchor:[[upperTopPoints[0].x,upperTopPoints[0].y + 50],[upperTopPoints[1].x,upperTopPoints[1].y + 50]]
    }
  }
    ////left side stiffner
    let leftPlate = PlateRestPoint(
      WebPoint(bl,tl,0,bl.y + (ds.lowerHeight+ds.lowerTopThickness)),
      WebPoint(bl,tl,0,tl.y - (ds.upperHeight+ds.leftsideTopThickness)*gsin),0,gradient,ds.sideHeight )
    let leftweldingLine = [leftPlate[3],leftPlate[0],leftPlate[1],leftPlate[2]]
    result["leftPlateShape"] = {points:leftPlate, Thickness:ds.sideThickness,z:-ds.sideThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size: PlateSize(leftPlate,0,ds.sideThickness),
      anchor:[[leftPlate[0].x + 50,leftPlate[0].y],[leftPlate[1].x  + 50,leftPlate[1].y]],
      welding:[{Line:leftweldingLine,type:"FF",value1:6}]
    }

    
//   ////right side stiffner
    let rightPlate = PlateRestPoint(
      WebPoint(br,tr,0,br.y + (ds.lowerHeight+ds.lowerTopThickness)),
      WebPoint(br,tr,0,tr.y - (ds.upperHeight+ds.leftsideTopThickness)*gsin),0,gradient,-ds.sideHeight )
    result["rightPlateShape"] = {points:rightPlate, Thickness:ds.sideThickness,z:-ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size: PlateSize(rightPlate,0,ds.sideThickness),
      anchor:[[rightPlate[0].x - 50,rightPlate[0].y],[rightPlate[1].x  - 50,rightPlate[1].y]]
    }
    ////leftside top plate
    let leftTopPlate = PlateRestPoint(
      upperPlate[1],{x:upperPlate[1].x + ds.leftsideTopwidth*gsin, y: upperPlate[1].y - ds.leftsideTopwidth * gcos},
      1/lwCot,-1/gradient,-ds.leftsideTopThickness)
    result["leftTopPlateShape"] = {points:leftTopPlate, Thickness:ds.leftsideToplength,z:-ds.leftsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size: PlateSize2(leftTopPlate,0,ds.leftsideTopThickness,ds.leftsideToplength),
      anchor:[[leftTopPlate[0].x + 50,leftTopPlate[0].y+50],[leftTopPlate[1].x  + 50,leftTopPlate[1].y+50]]
    }
    ////rightside top plate
    let rightTopPlate = PlateRestPoint(
      upperPlate[2],{x:upperPlate[2].x - ds.rightsideTopwidth*gsin, y: upperPlate[2].y + ds.rightsideTopwidth * gcos},
      1/rwCot,-1/gradient,-ds.rightsideTopThickness)
    result["rightTopPlateShape"] = {points:rightTopPlate, Thickness:ds.rightsideToplength,z:-ds.rightsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size: PlateSize2(rightTopPlate,0,ds.rightsideTopThickness,ds.rightsideToplength),
      anchor:[[rightTopPlate[1].x  - 80,rightTopPlate[1].y+50],[rightTopPlate[0].x - 80,rightTopPlate[0].y + 50]]
    }
    // k-frame diaphragm
    let leftline =  [{x:-ds.spc*gsin,y:-ds.spc*gcos},lowerTopPoints[1]]
    let lcos = (leftline[1].x - leftline[0].x) / Math.sqrt((leftline[1].x - leftline[0].x)**2 + (leftline[1].y - leftline[0].y)**2)
    let ltan = (leftline[1].y - leftline[0].y) / (leftline[1].x - leftline[0].x)
    let lsin = lcos * ltan
    // 슬래브 기준두께에 따라 브레이싱의 상단좌표가 이동해야 하나, 현재 기준은 0,0을 기준점으로 하고 있어 수정이 필요함 20.03.17 by drlim
    let pts = PTS(ds.dFrameName,false,1,sectionDB)
    let newleftline = [
      {x:leftline[0].x - (ds.spc - lcos * pts[2]) / ltan, y: leftline[0].y - (ds.spc - lcos * pts[2])},
      {x:leftline[1].x + (ds.spc - lsin * pts[2]), y: leftline[1].y + ltan * (ds.spc - lsin * pts[2])}
    ]
    let [leftframe1,leftframe2] = Kframe(newleftline[1],newleftline[0],0,0,pts)
    result["leftframe1"] = {points:leftframe1, Thickness:pts[3],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}
    result["leftframe2"] = {points:leftframe2, Thickness:pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size:{Label:"L-100x100x10x"+PointLength(...newleftline).toFixed(0)},
      anchor:[[newleftline[1].x-20,newleftline[1].y],[newleftline[0].x-20,newleftline[0].y]]}
    
    let rightline = [{x:ds.spc*gsin,y:ds.spc*gcos},lowerTopPoints[2]]
    let rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x)**2 + (rightline[1].y - rightline[0].y)**2)
    let rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x)
    let rsin = rcos * rtan
    let newrightline = [
      {x:rightline[0].x - (ds.spc + rcos * pts[2]) / rtan, y: rightline[0].y - (ds.spc + rcos * pts[2])},
      {x:rightline[1].x - (ds.spc - rsin * pts[2]), y: rightline[1].y - rtan * (ds.spc - rsin * pts[2])}
    ]
    let [rightframe1,rightframe2] = Kframe(newrightline[0],newrightline[1],0,0,pts)
    result["rightframe1"] = {points:rightframe1, Thickness:pts[3],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}
    result["rightframe2"] = {points:rightframe2, Thickness:pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size:{Label:"L-100x100x10x"+PointLength(...newrightline).toFixed(0)},
      anchor:[[newrightline[0].x+20,newrightline[0].y],[newrightline[1].x+20,newrightline[1].y]]
    }
      return result
  }

  export function diaphragmSection2(webPoints, skew, uflangePoint, diaSection){ //ribPoint needed
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

    const gradient =  (tr.y - tl.y) / (tr.x - tl.x)

    const lwCot = (tl.x - bl.x)/(tl.y-bl.y)
    const rwCot = (tr.x - br.x)/(tr.y-br.y)
    const cosec = Math.abs(1/Math.sin(skew * Math.PI/180));
    const sec = Math.abs(1/Math.cos(skew * Math.PI/180));
    const cot = Math.abs(1/Math.tan(skew * Math.PI/180));
    const rotationY = (skew - 90)*Math.PI/180

    let vstiffX1 = (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness
    let vstiffX2 = holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness
    let vstiffX3 = vStiffLayout[0] - vStiffThickness / 2
    let vstiffX4 = vStiffLayout[0] + vStiffThickness / 2
    let vstiffX5 = vStiffLayout[1] - vStiffThickness / 2
    let vstiffX6 = vStiffLayout[1] + vStiffThickness / 2

    let hStiff1 = [
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot - (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
    ]
    let hStiff2 = [
      {x: vstiffX2,y: -(vstiffX2) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
      {x: vstiffX2,y: -(vstiffX2) * cot - (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot - (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot - (hStiffWidth + plateThickness/2) * cosec},
    ]
    let hStiff3 = [
      {x: vstiffX4,y: -(vstiffX4) * cot - (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX4,y: -(vstiffX4) * cot - (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot - (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot - (hStiffWidth + plateThickness/2) * cosec},
    ]
    let hStiff4 = [
      {x: vstiffX6,y: -(vstiffX6) * cot - (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX6,y: -(vstiffX6) * cot - (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
    ]
    result['hStiff1'] = {points:hStiff1,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff2'] = {points:hStiff2,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff3'] = {points:hStiff3,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff4'] = {points:hStiff4,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}

    let hStiff5 = [
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot + (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
    ]
    let hStiff6 = [
      {x: vstiffX2,y: -(vstiffX2) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
      {x: vstiffX2,y: -(vstiffX2) * cot + (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot + (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot + (hStiffWidth + plateThickness/2) * cosec},
    ]
    let hStiff7 = [
      {x: vstiffX4,y: -(vstiffX4) * cot + (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX4,y: -(vstiffX4) * cot + (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot + (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot + (hStiffWidth + plateThickness/2) * cosec},
    ]
    let hStiff8 = [
      {x: vstiffX6,y: -(vstiffX6) * cot + (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX6,y: -(vstiffX6) * cot + (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
    ]
    result['hStiff5'] = {points:hStiff5,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff6'] = {points:hStiff6,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff7'] = {points:hStiff7,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff8'] = {points:hStiff8,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}

    // let ribHoleD = diaSection.ribHoleD;
    // let ribHoleR = diaSection.ribHoleR;

    // hole stiffner
    let holeVStiff1 = [
      {x: holeRightOffset / cosec + holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
      {x: holeRightOffset / cosec+ holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
      {x: holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
      {x: holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
    ]
    result['holeVStiff1'] = { 
      points:holeVStiff1,
      Thickness: holeVstiffnerhight ,
      z: holeVStiff1[0].x * cot + plateThickness/2,
      rotationX:Math.PI/2,
      rotationY:0,
      hole:[]}

    let holeVStiff2 = [
      {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
      {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
      {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
      {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
    ]
    result['holeVStiff2'] = { 
      points:holeVStiff2,
      Thickness: holeVstiffnerhight ,
      z: holeVStiff2[0].x * cot + plateThickness/2,
      rotationX:Math.PI/2,
      rotationY:0,
      hole:[]}

    let holeHStiff1 = [
        {x: (holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2)*cot},
        {x: (holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2)*cot},
        {x: (holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2)*cot + holeHstiffnerHeight * cosec},
        {x: (holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2)*cot + holeHstiffnerHeight * cosec},
      ]
    result['holeHStiff1'] = { 
      points:holeHStiff1,
      Thickness: holeHstiffnerThickness ,
      z: bl.y + holeBottomOffset + holeHeight + holeStiffSpacing,
      rotationX:0,
      rotationY:0,
      hole:[]}

    result['holeHStiff2'] = { 
      points:holeHStiff1,
      Thickness: - holeHstiffnerThickness ,
      z: bl.y + holeBottomOffset - holeStiffSpacing,
      rotationX:0,
      rotationY:0,
      hole:[]}


    // vertical stiffener 
    for (let i = 0; i<vStiffLayout.length;i++){
      let name = 'verticalStiffner' + (i+1)
      let Points = [ 
        {x:vStiffLayout[i] - vStiffThickness / 2,y: bl.y},
        {x:vStiffLayout[i] + vStiffThickness / 2,y: bl.y},
        {x:vStiffLayout[i] + vStiffThickness / 2,y: tl.y  + ((vStiffLayout[i] + vStiffThickness / 2) - tl.x) * gradient},
        {x:vStiffLayout[i] - vStiffThickness / 2,y: tl.y + ((vStiffLayout[i] - vStiffThickness / 2)- tl.x) * gradient},
      ]
      result[name] = { 
          points:Points,
          Thickness:vStiffWidth,
          z: vStiffLayout[i] * cot - vStiffWidth/2,
          rotationX:Math.PI/2,
          rotationY:0,
          hole:[]}
    }

    // topPlate
    if (uflangePoint[0].x < uflangePoint[2].x){
    let topPlate = [
      {x:uflangePoint[0].x,y:-uflangePoint[0].x * cot + topPlateWidth/2 *cosec },
      {x:uflangePoint[0].x,y:-uflangePoint[0].x * cot - topPlateWidth/2 *cosec },
      {x:uflangePoint[2].x,y:-uflangePoint[2].x * cot - topPlateWidth/2 *cosec },
      {x:uflangePoint[2].x,y:-uflangePoint[2].x * cot + topPlateWidth/2 *cosec },
    ]
    result['topPlate'] = { 
      points:topPlate,
      Thickness:topPlateThickness,
      z: tl.y - tl.x * gradient,
      rotationX:0,
      rotationY:-Math.atan(gradient),
      hole:[]}
    }

    ///lower stiffener
    let mainPlate = [
      {x: tl.x * cosec, y:tl.y}, 
      {x: bl.x * cosec, y:bl.y}, 
      {x: br.x * cosec, y:br.y}, 
      {x: tr.x * cosec, y:tr.y}, 
    ];
    let diaPoints = [];
    diaPoints = diaPoints.concat(scallop(mainPlate[3],mainPlate[0],mainPlate[1],scallopRadius,4));
    // points.push(plate[1]);
    diaPoints = diaPoints.concat(scallop(mainPlate[0],mainPlate[1],mainPlate[2],scallopRadius,4));
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
    diaPoints = diaPoints.concat(scallop(mainPlate[1],mainPlate[2],mainPlate[3],scallopRadius,4));
    diaPoints = diaPoints.concat(scallop(mainPlate[2],mainPlate[3],mainPlate[0],scallopRadius,4));
    ////

    let holePoints = []
    let holeRect = [
      {x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset },
      {x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset },
      {x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
      {x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
    ]
    holePoints = holePoints.concat(Fillet2D(holeRect[0], holeRect[1], holeRect[2], holeFilletR, 4))
    holePoints = holePoints.concat(Fillet2D(holeRect[1], holeRect[2], holeRect[3], holeFilletR, 4))
    holePoints = holePoints.concat(Fillet2D(holeRect[2], holeRect[3], holeRect[0], holeFilletR, 4))
    holePoints = holePoints.concat(Fillet2D(holeRect[3], holeRect[0], holeRect[1], holeFilletR, 4))
    result['mainPlate'] = {points:diaPoints,Thickness:plateThickness,z:- plateThickness/2,rotationX:Math.PI/2,rotationY:rotationY, hole:holePoints}
      
    return result
  }

  export function vStiffSection(webPoints, skew, uflangePoint, vSection){

    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    let gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 )
    let gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
    const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
    const rwCot = (tr.x - br.x)/(tr.y-br.y);
    const lcos = (tl.x - bl.x) / Math.sqrt((tl.x - bl.x)**2 + (tl.y - bl.y)**2);
    const lsin = lcos / lwCot;
    const rcos = (tr.x - br.x) / Math.sqrt((tr.x - br.x)**2 + (tr.y - br.y)**2);
    const rsin = rcos / rwCot;

    let sideHeight = vSection.sideHeight;
    let sideThickness = vSection.sideThickness;
    let upperHeight = vSection.upperHeight;
    let bottomOffset = vSection.bottomOffset;
    let scallopRadius = vSection.scallopRadius;
    let sideScallopOffset = vSection.sideScallopOffset;
    //L100x100x10 section point, origin = (0,0)
    let spc = vSection.spc;
    let pts = vSection.pts;
    let rotationY = (skew - 90)*Math.PI/180
  ///left stiffener
    let leftplate = [
      tl,
      {x:bl.x + lwCot * bottomOffset, y : bl.y + bottomOffset },
      {x:bl.x + lwCot * bottomOffset + lsin*sideHeight, y : bl.y + bottomOffset - lcos*sideHeight},
      {x:tl.x + gsin * sideHeight, y : tl.y + gcos * sideHeight },
    ]
    let leftPoints = [];
    leftPoints = leftPoints.concat(scallop(leftplate[3],leftplate[0],leftplate[1],scallopRadius,4));
    leftPoints.push(leftplate[1])
    leftPoints = leftPoints.concat(scallop(leftplate[1],leftplate[2],leftplate[3],sideHeight-sideScallopOffset,1));
    leftPoints.push(leftplate[3])
  
    ///right stiffener
    let rightplate = [
      tr,
      {x:br.x + rwCot * bottomOffset, y : br.y + bottomOffset },
      {x:br.x + rwCot * bottomOffset - rsin * sideHeight, y : br.y + bottomOffset + rcos*sideHeight},
      {x:tr.x - gsin * sideHeight, y : tr.y - gcos * sideHeight },
    ]
    let rightPoints = [...scallop(rightplate[3],rightplate[0],rightplate[1],scallopRadius,4), rightplate[1],
                      ...scallop(rightplate[1],rightplate[2],rightplate[3],sideHeight-sideScallopOffset,1), rightplate[3]];
    ////upper bracing
    let node1 = {x:tl.x - lwCot * upperHeight + gsin * spc , y: tl.y - upperHeight + gcos * spc}
    let node2 = {x:tr.x - rwCot * upperHeight - gsin * spc , y: tr.y - upperHeight - gcos * spc}
    let [upperframe1,upperframe2] = Kframe(node1,node2,0,0,pts)
  return {
    leftshape: {points:leftPoints,Thickness:sideThickness,z: -sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}, 
    rightShape: {points:rightPoints,Thickness:sideThickness,z:-sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
    upperframe1:{points:upperframe1, Thickness:pts[3],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
    upperframe2:{points:upperframe2, Thickness:pts[4],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
   }
}


export function hBracingSection(point1, point2, webPoints, hBSection){
  // let sideToplength = 700;
  // let sideTopwidth = 300;
  // let B = 2000;
  // let H = 2500;
  // let ULR = 1300;

  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];

  const lwCot = (tl.x - bl.x)/(tl.y-bl.y)
  const rwCot = (tr.x - br.x)/(tr.y-br.y)

  let upperHeight = hBSection.upperHeight;
  let sideTopThickness = hBSection.sideTopThickness;
  let spc = hBSection.spc
  let pts = hBSection.pts

  let node1 = {x:tl.x - lwCot * (upperHeight + sideTopThickness),y: tl.y -(upperHeight + sideTopThickness)};
  let node2 = {x:tr.x - rwCot * (upperHeight + sideTopThickness),y: tr.y -(upperHeight + sideTopThickness)};
  let Brline = [
    ToGlobalPoint(point1, node1),
    ToGlobalPoint(point2, node2)
  ];
  let Vector = [Brline[1].x - Brline[0].x, 
                Brline[1].y - Brline[0].y, 
                Brline[1].z - Brline[0].z]
  let VectorLength = Math.sqrt(Vector[0]**2 + Vector[1]**2 + Vector[2]**2)
  let normalCos = Vector[1] / VectorLength;
  let normalSin = - Vector[0] / VectorLength;
  let newBrLine = [{x: Brline[0].x + Vector[0] * spc / VectorLength,
                    y: Brline[0].y + Vector[1] * spc / VectorLength,
                    z: Brline[0].z + Vector[2] * spc / VectorLength},
                    {x: Brline[1].x - Vector[0] * spc / VectorLength,
                      y: Brline[1].y - Vector[1] * spc / VectorLength,
                      z: Brline[1].z - Vector[2] * spc / VectorLength}]
  let pointslist = 
    [{x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z},
    {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z},
    {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z + pts[4]},
    {x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z + pts[4]},
    {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z},
    {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z},    
    {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z + pts[4]},
    {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z + pts[4]},
  ]
  let pointslist2 =
  [
    {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z},
    {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z},
    {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z + pts[5]},
    {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z + pts[5]},
    {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z},
    {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z},
    {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z + pts[5]},
    {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z + pts[5]},
    ];
  
  return { line:Brline, points:[pointslist, pointslist2,[]]};
}

export function hBracingPlate(point, right, webPoints, hBSection){
  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];
  const lwCot = (tl.x - bl.x)/(tl.y-bl.y)
  const rwCot = (tr.x - br.x)/(tr.y-br.y)

  let upperHeight = hBSection.upperHeight;
  let sideTopThickness = hBSection.sideTopThickness;
  let sideToplength = hBSection. sideToplength
  let sideTopwidth = hBSection. sideTopwidth
  let scallopHeight = hBSection. scallopHeight
  let scallopRadius = hBSection. scallopRadius
  let scallopBottom = hBSection. scallopBottom
   
  let position = {};
  let rotationY = Math.atan((tr.y - tl.y)/(tr.x-tl.x));
  if (right){
    position = {x:tr.x - rwCot * (upperHeight + sideTopThickness),y:  -(upperHeight + sideTopThickness)};
    rotationY = -rotationY
  }else{
    position = {x:tl.x - lwCot * (upperHeight + sideTopThickness),y:  -(upperHeight + sideTopThickness)}; 
  }
  let rotation = (right)? Math.PI/2 : -Math.PI/2;
  let cos = Math.cos(rotation);
  let sin = Math.sin(rotation);
  let curve = new THREE.ArcCurve(0,scallopHeight,scallopRadius,Math.PI,0,true);
  let curvePoint = curve.getPoints(8);
  let ps = [];
  ps.push({x:-sideToplength/2, y:sideTopwidth});
  ps.push({x:-sideToplength/2, y: 0});
  ps.push({x:-scallopBottom, y:0});
  
  for (let i=0; i < 9;i++){
    ps.push({x:curvePoint[i].x,y:curvePoint[i].y})  
  };
  ps.push({x:scallopBottom, y:0});
  ps.push({x:sideToplength/2, y:0});
  ps.push({x:sideToplength/2, y:sideTopwidth});
  let plateShape = []
  for (let i=0; i<ps.length;i++){
    plateShape.push({x:position.x + ps[i].x *cos - ps[i].y*sin, y: ps[i].y*cos + ps[i].x*sin})
  }

  return {point:point, plate: {points:plateShape,Thickness: sideTopThickness,z:position.y, rotationX:0, rotationY:rotationY,hole:[]}}
}