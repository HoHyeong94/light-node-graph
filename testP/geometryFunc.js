import * as THREE from "three";
import {ToGlobalPoint} from './threejsDisplay';


// girderSectionPointList is must be ordered by left to right

export function sectionPoint(sectionInfo, pointSectionInfo, gradient){
    const height = pointSectionInfo.forward.height;
    const centerThickness = 270 //  slab변수 추가
    const lwb = {x: - sectionInfo.B/2, y:-sectionInfo.H}
    const lwt = {x: - sectionInfo.UL, y:0}
    const rwb = {x: sectionInfo.B/2, y:-sectionInfo.H}
    const rwt = {x: sectionInfo.UR, y:0}
    let forward = {};
    let backward = {};
    let ps = {};
    let skew = pointSectionInfo.forward.skew; // gridPoint의 skew가 있어 사용여부 확인후 삭제요망
    for (let i = 0; i < 2;i++){
        if (i === 0) {
            ps = pointSectionInfo.forward
        } else {
            ps = pointSectionInfo.backward
        }
        let slabThickness = ps.slabThickness - centerThickness
        
        let Rib = {}
        for (let j in ps.lRibLO){
        let lRib = [{x:ps.lRibLO[j] - ps.lRibThk/2,y:-height},{x:ps.lRibLO[j]- ps.lRibThk/2,y:-height+ps.lRibH},
                    {x:ps.lRibLO[j] + ps.lRibThk/2,y:-height+ps.lRibH},{x:ps.lRibLO[j] + ps.lRibThk/2,y:-height}]
        let keyname = "lRib" + j
        Rib[keyname] = lRib                    
         }

         
        // leftWeb
        let lw1 = WebPoint(lwb,lwt,0,-height) //{x:blwX,y:-height}
        let lw2 = WebPoint(lwb,lwt,gradient,-slabThickness) //{x:tlwX,y:gradient*tlwX - slabThickness}
        let lWeb = PlateRestPoint(lw1,lw2,0,gradient,-ps.webThk);
        // rightWeb
        let rw1 = WebPoint(rwb,rwt,0,-height) //{x:brwX,y:-height}
        let rw2 = WebPoint(rwb,rwt,gradient,-slabThickness) //{x:trwX,y:gradient*trwX - slabThickness}
        let rWeb = PlateRestPoint(rw1,rw2,0,gradient,ps.webThk);
        // bottomplate
        let b1 = {x:lw1.x - sectionInfo.C1,y:-height}
        let b2 = {x:rw1.x + sectionInfo.D1,y:-height}
        let bottomPlate = PlateRestPoint(b1,b2,null,null,-ps.lFlangeThk)
        // TopPlate
        let tl1 = {x: lw2.x - sectionInfo.C, y: lw2.y + gradient*(- sectionInfo.C)};
        let tl2 = {x: lw2.x - sectionInfo.C + ps.uFlangeW, y: lw2.y + gradient*(- sectionInfo.C + ps.uFlangeW)};
        let topPlate1 = PlateRestPoint(tl1,tl2,-1/gradient,-1/gradient,ps.uFlangeThk);
        let tr1 = {x: rw2.x + sectionInfo.D, y: rw2.y + gradient*(sectionInfo.D)};
        let tr2 = {x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient*(sectionInfo.D - ps.uFlangeW)};
        let topPlate2 = PlateRestPoint(tr1,tr2,-1/gradient,-1/gradient,ps.uFlangeThk);;
        if (i===0){
            forward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb, ...Rib}    
        }else {
            backward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb, ...Rib}    
        }
    }
    return {forward, backward}
  }

  export function diaphragmSection(webPoints, skew, uflangePoint, ds){ //ribPoint needed
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
    let newleftline = [
      {x:leftline[0].x - (ds.spc - lcos * ds.pts[0]) / ltan, y: leftline[0].y - (ds.spc - lcos * ds.pts[0])},
      {x:leftline[1].x + (ds.spc - lsin * ds.pts[0]), y: leftline[1].y + ltan * (ds.spc - lsin * ds.pts[0])}
    ]
    let [leftframe1,leftframe2] = Kframe(newleftline[1],newleftline[0],0,0,ds.pts)
    result["leftframe1"] = {points:leftframe1, Thickness:ds.pts[3],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}
    result["leftframe2"] = {points:leftframe2, Thickness:ds.pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
      size:{Label:"L-100x100x10x"+PointLength(...newleftline).toFixed(0)},
      anchor:[[newleftline[1].x-20,newleftline[1].y],[newleftline[0].x-20,newleftline[0].y]]}
    
    let rightline = [{x:ds.spc*gsin,y:ds.spc*gcos},lowerTopPoints[2]]
    let rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x)**2 + (rightline[1].y - rightline[0].y)**2)
    let rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x)
    let rsin = rcos * rtan
    let newrightline = [
      {x:rightline[0].x - (ds.spc + rcos * ds.pts[0]) / rtan, y: rightline[0].y - (ds.spc + rcos * ds.pts[0])},
      {x:rightline[1].x - (ds.spc - rsin * ds.pts[0]), y: rightline[1].y - rtan * (ds.spc - rsin * ds.pts[0])}
    ]
    let [rightframe1,rightframe2] = Kframe(newrightline[0],newrightline[1],0,0,ds.pts)
    result["rightframe1"] = {points:rightframe1, Thickness:ds.pts[3],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}
    result["rightframe2"] = {points:rightframe2, Thickness:ds.pts[4],z: ds.sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[],
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

export function hBracingPlate(right, webPoints, hBSection){
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

  return {plate: {points:plateShape,Thickness: sideTopThickness,z:position.y, rotationX:0, rotationY:rotationY,hole:[]}}
}

export function SplicePlate(iPoint, iSectionPoint){
  let result = {}
  let iNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[0])
  let jNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[1])
  let centerPoint = {
    x:(iNode.x + jNode.x)/2,
    y:(iNode.y + jNode.y)/2,
    z:(iNode.z + jNode.z)/2,
    normalCos: iPoint.normalCos,
    normalSin: iPoint.normalSin,
  }
  let Web = [{x:-900, y:-250},{x:-900, y:250},{x:900, y:250},{x:900, y:-250}]
  let WebBolt = [{startPoint:{x:800, y:150},P:100,G:100,pNum:4,gNum:17,size:37,t:14,l:54},]
  let lWebAngle = Math.PI-Math.atan((iSectionPoint.lWeb[1].y - iSectionPoint.lWeb[0].y)/(iSectionPoint.lWeb[1].x - iSectionPoint.lWeb[0].x))
  let rWebAngle = Math.PI-Math.atan((iSectionPoint.rWeb[1].y - iSectionPoint.rWeb[0].y)/(iSectionPoint.rWeb[1].x - iSectionPoint.rWeb[0].x))
  result["lWeb"]={points:Web,point:centerPoint,
                 Thickness:20,z:14, rotationX:0, rotationY:lWebAngle,hole:[],bolt:WebBolt}
  result["lWeb2"]={points:Web,point:centerPoint,
  Thickness:-20,z:0, rotationX:0, rotationY:lWebAngle,hole:[]}

  iNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[0])
  jNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1])
  centerPoint = {x:(iNode.x + jNode.x)/2,
              y:(iNode.y + jNode.y)/2,
              z:(iNode.z + jNode.z)/2,
              normalCos: iPoint.normalCos,
              normalSin: iPoint.normalSin,
            }
  result["rWeb"]={points:Web,point:centerPoint,
    Thickness:20,z:14, rotationX:0, rotationY:rWebAngle,hole:[],bolt:WebBolt}
  result["rWeb2"]={points:Web,point:centerPoint,
    Thickness:-20,z:0, rotationX:0, rotationY:rWebAngle,hole:[]}
  
  iNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[1])
  centerPoint = {...iNode,
              normalCos: iPoint.normalCos,
              normalSin: iPoint.normalSin,
            }
  let TopFlange = [{x:-200, y:-250},{x:-200, y:250},{x:200, y:250},{x:200, y:-250}]
  let TopFlangeBolt = [{startPoint:{x:160, y:150},P:100,G:80,pNum:4,gNum:2,size:37,t:14,l:54},
                      {startPoint:{x:-80, y:150},P:100,G:80,pNum:4,gNum:2,size:37,t:14,l:54}]

  result["lTop"]={points:TopFlange,point:centerPoint,  Thickness:20,z:14, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[],bolt:TopFlangeBolt}
  result["lTop2"]={points:[{x:-200, y:-250},{x:-200, y:250},{x:-40, y:250},{x:-40, y:-250}],
    point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
  result["lTop3"]={points:[{x:40, y:-250},{x:40, y:250},{x:200, y:250},{x:200, y:-250}],
    point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}

  iNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1])
    centerPoint = {...iNode,
                normalCos: iPoint.normalCos,
                normalSin: iPoint.normalSin,
              }
  
  result["rTop"]={points:TopFlange,point:centerPoint,  Thickness:20,z:14, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[],bolt:TopFlangeBolt}
  result["rTop2"]={points:[{x:-200, y:-250},{x:-200, y:250},{x:-40, y:250},{x:-40, y:-250}],
    point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
  result["rTop3"]={points:[{x:40, y:-250},{x:40, y:250},{x:200, y:250},{x:200, y:-250}],
    point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
  

  let BP = iSectionPoint.bottomPlate
  iNode = ToGlobalPoint(iPoint, BP[0])
  jNode = ToGlobalPoint(iPoint, BP[1])
  centerPoint = {x:(iNode.x + jNode.x)/2,
              y:(iNode.y + jNode.y)/2,
              z:(iNode.z + jNode.z)/2,
              normalCos: iPoint.normalCos,
              normalSin: iPoint.normalSin,
            }
  let bottomFlange = [{x:BP[0].x, y:-250},{x:BP[0].x, y:250},{x:BP[1].x, y:250},{x:BP[1].x, y:-250}]
  let bottomFlangeBolt = [{startPoint:{x:BP[0].x+40, y:150},P:100,G:80,pNum:4,gNum:1,size:37,t:14,l:54},
                          {startPoint:{x:BP[1].x-40, y:150},P:100,G:80,pNum:4,gNum:1,size:37,t:14,l:54},
                          {startPoint:{x:BP[1].x-172, y:150},P:100,G:140,pNum:4,gNum:6,size:37,t:14,l:54},
                          {startPoint:{x:BP[0].x+172, y:150},P:100,G:-140,pNum:4,gNum:6,size:37,t:14,l:54}]

  result["bottom1"]={points:[{x:BP[0].x, y:-250},{x:BP[0].x, y:250},{x:BP[0].x+80, y:250},{x:BP[0].x+80, y:-250}],
    point:centerPoint,  Thickness:20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:0,hole:[],bolt:bottomFlangeBolt}
  result["bottom2"]={points:[{x:BP[1].x, y:-250},{x:BP[1].x, y:250},{x:BP[1].x-80, y:250},{x:BP[1].x-80, y:-250}],
    point:centerPoint,  Thickness:20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:0,hole:[]}
  result["bottom3"]={points:[{x:BP[0].x+132, y:-250},{x:BP[0].x+132, y:250},{x:BP[1].x-132, y:250},{x:BP[1].x-132, y:-250}],
    point:centerPoint,  Thickness:20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:0,hole:[]}
  result["bottom4"]={points:bottomFlange,
    point:centerPoint,  Thickness:-20,z:-14, rotationX:Math.atan(iPoint.gradientX), rotationY:0,hole:[]}
  // result["bottom2"]={points:[{x:-200, y:-250},{x:-200, y:250},{x:-40, y:250},{x:-40, y:-250}],
  //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
  // result["bottom3"]={points:[{x:40, y:-250},{x:40, y:250},{x:200, y:250},{x:200, y:-250}],
  //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}





  
  
  
  return result
}


export function XbeamSection(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection){
  const result = {}
  const connectorLength = xbeamSection.connectorLength
  const connectorWidth = xbeamSection.connectorWidth
  const upperFlangeThickness = xbeamSection.upperFlangeThickness
  const upperFlangeWidth = xbeamSection.upperFlangeWidth
  const lowerFlangeThickness = xbeamSection.lowerFlangeThickness
  const lowerFlangeWidth = xbeamSection.lowerFlangeWidth
  const vStiffThickness = xbeamSection.vStiffThickness
  const vStiffBottomOffset = xbeamSection.vStiffBottomOffset
  const vStiffWidth  = xbeamSection.vStiffWidth
  const webThickness = xbeamSection.webThickness
  const vStiffendFillet = xbeamSection.vStiffendFillet
  const scallopRadius = xbeamSection.scallopRadius

  const cosec = Math.abs(1/Math.sin(iPoint.skew * Math.PI/180));
  const cot = Math.abs(1/Math.tan(iPoint.skew * Math.PI/180));
  const cos = cot/cosec

  // 기준점은 iTopNode라고 가정, 가로보는 반드시 skew각도와 일치해야함.
  let iNode = ToGlobalPoint(iPoint, iSectionPoint.rightTopPlate[0])
  let jNode = ToGlobalPoint(jPoint, jSectionPoint.leftTopPlate[0])
  let length = Math.sqrt((jNode.x - iNode.x)**2 + (jNode.y - iNode.y)**2)
  let vec = {x:(jNode.x - iNode.x)/length,y:(jNode.y - iNode.y)/length}
  let grd = (jNode.z - iNode.z)/length
  let grdSec = Math.sqrt(1+grd**2)
  let centerPoint = {
    x:(iNode.x + jNode.x)/2,
    y:(iNode.y + jNode.y)/2,
    z:(iNode.z + jNode.z)/2,
    normalCos: vec.x,
    normalSin: vec.y,
  }
  let lFlangeL = (iSectionPoint.rWeb[2].x - iSectionPoint.rightTopPlate[0].x) * cosec
  let rFlangeL = (jSectionPoint.lWeb[2].x - jSectionPoint.leftTopPlate[0].x) * cosec

  let iBottom = ToGlobalPoint(iPoint, iSectionPoint.bottomPlate[1])
  let jBottom = ToGlobalPoint(jPoint, jSectionPoint.bottomPlate[0])
  let lengthB = Math.sqrt((jBottom.x - iBottom.x)**2 + (jBottom.y - iBottom.y)**2)
  let vecB = {x:(jBottom.x - iBottom.x)/lengthB,y:(jBottom.y - iBottom.y)/lengthB}
  let grdB = (jBottom.z - iBottom.z)/lengthB
  let grdSecB = Math.sqrt(1+grdB**2)
  let bottomPoint = {
    x:(iBottom.x + jBottom.x)/2,
    y:(iBottom.y + jBottom.y)/2,
    z:(iBottom.z + jBottom.z)/2,
    normalCos: vecB.x,
    normalSin: vecB.y,
  }
  let lFlangeB = (iSectionPoint.rWeb[3].x - iSectionPoint.bottomPlate[1].x) * cosec
  let rFlangeB = (jSectionPoint.lWeb[3].x - jSectionPoint.bottomPlate[0].x) * cosec
  let gradientX = (iPoint.gradientX + jPoint.gradientX)/2 
  let vStiffLength = centerPoint.z - bottomPoint.z - vStiffBottomOffset
  let vStiffPlate = [{x: webThickness/2,y: -webThickness/2*gradientX},
    {x: webThickness/2,y:-vStiffLength -webThickness/2*gradientX},
    {x: webThickness/2 + vStiffWidth,y:-vStiffLength-webThickness/2*gradientX},
    {x: webThickness/2 + vStiffWidth,y:-(webThickness/2 + vStiffWidth)*gradientX}]
  let vStiffTopFillet = Math.max(vStiffWidth - (upperFlangeWidth - webThickness)/2,0) 
  let vStiffPoint = []
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[1],vStiffPlate[0],vStiffPlate[3],scallopRadius,4));
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[0],vStiffPlate[3],vStiffPlate[2],vStiffTopFillet,1));
  vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[3],vStiffPlate[2],vStiffPlate[1],vStiffendFillet,1));
  vStiffPoint.push(vStiffPlate[1]) 
  result['vStiffner'] = {
    points:vStiffPoint,
    Thickness:vStiffThickness,
    z: -vStiffThickness/2,
    rotationX: Math.PI/2,
    rotationY:Math.PI/2*3, 
    hole:[],
    point:centerPoint
  }

  result['cbUpperFlange'] = {
    points:[{x: (lFlangeL - length/2 + connectorLength)*grdSec,y:-upperFlangeWidth/2},
            {x:(lFlangeL - length/2 + connectorLength)*grdSec,y: upperFlangeWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSec,y: upperFlangeWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSec,y:-upperFlangeWidth/2},],
    Thickness:upperFlangeThickness,
    z: 0,
    rotationX: Math.atan(gradientX),
    rotationY:-Math.atan(grd), 
    hole:[],
    point:centerPoint
  }
  result['connectorLeftTop'] = {
    points:[{x: (- length/2 - connectorWidth/2*cot)*grdSec ,y: connectorWidth/2},
            {x: (lFlangeL - length/2 + connectorLength)*grdSec,y:upperFlangeWidth/2},
            {x: (lFlangeL - length/2 + connectorLength)*grdSec,y:-upperFlangeWidth/2},
            {x: (- length/2 + connectorWidth/2*cot)*grdSec, y: -connectorWidth/2}],
            
    Thickness:upperFlangeThickness,
    z: 0,
    rotationX: Math.atan(gradientX),
    rotationY:-Math.atan(grd), 
    hole:[],
    point:centerPoint
  }
  result['connectorRightTop'] = {
    points:[{x: (length/2 - connectorWidth/2*cot)*grdSec ,y: connectorWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSec,y:upperFlangeWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSec,y:-upperFlangeWidth/2},
            {x: (length/2 + connectorWidth/2*cot)*grdSec, y: -connectorWidth/2}],
    Thickness:upperFlangeThickness,
    z: 0,
    rotationX: Math.atan((iPoint.gradientX + jPoint.gradientX)/2),
    rotationY:-Math.atan(grd), 
    hole:[],
    point:centerPoint
  }

  result['cblowerFlange'] = {
    points:[{x: (lFlangeL - length/2 + connectorLength)*grdSecB,y:-lowerFlangeWidth/2},
            {x: (lFlangeL - length/2 + connectorLength)*grdSecB,y: lowerFlangeWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y: lowerFlangeWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y:-lowerFlangeWidth/2},],
    Thickness:lowerFlangeThickness,
    z: -lowerFlangeThickness,
    rotationX: 0,
    rotationY:-Math.atan(grdB), 
    hole:[],
    point:bottomPoint
  }
  result['connectorLeftBottom'] = {
    points:[{x: (- lengthB/2 - connectorWidth/2*cot)*grdSecB ,y: connectorWidth/2},
            {x: (lFlangeL - length/2 + connectorLength)*grdSecB,y:lowerFlangeWidth/2},
            {x: (lFlangeL - length/2 + connectorLength)*grdSecB,y:-lowerFlangeWidth/2},
            {x: (- lengthB/2 + connectorWidth/2*cot)*grdSecB, y: -connectorWidth/2}],
    Thickness:lowerFlangeThickness,
    z: -lowerFlangeThickness,
    rotationX: 0,
    rotationY:-Math.atan(grdB), 
    hole:[],
    point:bottomPoint
  }
  result['connectorRightBottom'] = {
    points:[{x: (lengthB/2 - connectorWidth/2*cot)*grdSecB ,y: connectorWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y:lowerFlangeWidth/2},
            {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y:-lowerFlangeWidth/2},
            {x: (lengthB/2 + connectorWidth/2*cot)*grdSecB, y: -connectorWidth/2}],
    Thickness:lowerFlangeThickness,
    z: -lowerFlangeThickness,
    rotationX: 0,
    rotationY:-Math.atan(grdB), 
    hole:[],
    point:bottomPoint
  }

  let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[2])
  let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[2])
  let cblength = Math.sqrt((jTopNode.x - iTopNode.x)**2 + (jTopNode.y - iTopNode.y)**2)
  let cbVec = {x:(jTopNode.x - iTopNode.x)/cblength,y:(jTopNode.y - iTopNode.y)/cblength}
  let gradient = (jTopNode.z - iTopNode.z)/cblength
  let iCos = (iPoint.normalCos * cbVec.x +iPoint.normalSin * cbVec.y).toFixed(6)*1
  let jCos =jPoint.normalCos * cbVec.x +jPoint.normalSin * cbVec.y

  let ibaseNode = {x:iSectionPoint.rWeb[2].x*cosec,y: iSectionPoint.rWeb[2].y}
  let iTopNode1 = {x:iSectionPoint.rightTopPlate[0].x * cosec, y:iSectionPoint.rightTopPlate[0].y}
  let jbaseNode = {x:ibaseNode.x + cblength, y:ibaseNode.y +jTopNode.z - iTopNode.z}
  let jTopNode1 =  {x:jbaseNode.x + (jSectionPoint.leftTopPlate[0].x - jSectionPoint.lWeb[2].x)*cosec, y:jbaseNode.y + jSectionPoint.leftTopPlate[0].y - jSectionPoint.lWeb[2].y}  
  
  
  let jBottomNode = {x:jbaseNode.x + (jSectionPoint.lWeb[3].x - jSectionPoint.lWeb[2].x)*cosec, y:jbaseNode.y + jSectionPoint.lWeb[3].y - jSectionPoint.lWeb[2].y}
  let jBottomNode1 = {x:jbaseNode.x + (jSectionPoint.bottomPlate[0].x - jSectionPoint.lWeb[2].x)*cosec, y:jbaseNode.y + jSectionPoint.bottomPlate[0].y - jSectionPoint.lWeb[2].y}  
  let iBottomNode1 = {x:iSectionPoint.bottomPlate[1].x*cosec,y:iSectionPoint.bottomPlate[1].y}
  let iBottomNode = {x:iSectionPoint.rWeb[3].x*cosec,y:iSectionPoint.rWeb[3].y}
  
  let a = (jBottomNode1.y - iBottomNode1.y) / (jBottomNode1.x - iBottomNode1.x)
  
  let iTopNode2 = {x:ibaseNode.x + connectorLength,y:ibaseNode.y + connectorLength * gradient}
  let iBottomNode2 = {x:iTopNode2.x, y: iBottomNode1.y + a*(iTopNode2.x - iBottomNode1.x)}
  let jTopNode2 = {x:jbaseNode.x - connectorLength,y: jbaseNode.y - connectorLength * gradient}
  let jBottomNode2 = {x:jTopNode2.x, y: iBottomNode1.y + a*(jTopNode2.x - iBottomNode1.x)}  

  let leftConnectorWeb = [
    ibaseNode,
    iTopNode1,
    iTopNode2,
    iBottomNode2,
    iBottomNode1,
    iBottomNode,
  ]
  result['leftConnectorWeb'] = {
    points:leftConnectorWeb,
    Thickness:xbeamSection.webThickness,
    z:-xbeamSection.webThickness/2,
    rotationX:Math.PI/2,
    rotationY:Math.acos(iCos)+Math.PI, 
    hole:[],
    point:iPoint
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
    points:rightConnectorWeb,
    Thickness:xbeamSection.webThickness,
    z:-xbeamSection.webThickness/2,
    rotationX:Math.PI/2,
    rotationY:Math.acos(iCos)+Math.PI, 
    hole:[],
    point:iPoint
  }
  let cbWeb = [
    iTopNode2,
    iBottomNode2,
    jBottomNode2,
    jTopNode2
  ]
  result['cbWeb'] = {
    points:cbWeb,
    Thickness:xbeamSection.webThickness,
    z:-xbeamSection.webThickness/2,
    rotationX:Math.PI/2,
    rotationY:Math.acos(iCos)+Math.PI, 
    hole:[],
    point:iPoint
  }
  // //console.log('icos:', iCos)   
  return result
}

export function XbeamSectionK(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection){
  const result = {}
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
  const pts = xbeamSection.pts

  let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1])
  let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[1])

  let length = Math.sqrt((jTopNode.x - iTopNode.x)**2 + (jTopNode.y - iTopNode.y)**2)
  let xlength = Math.abs(jTopNode.x - iTopNode.x)
  let vec = {x:(jTopNode.x - iTopNode.x)/length,y:(jTopNode.y - iTopNode.y)/length}
  let grd = (jTopNode.z - iTopNode.z)/length
  let grdSec = Math.sqrt(1+grd**2)

  let centerPoint = {
    x:(iTopNode.x + jTopNode.x)/2,
    y:(iTopNode.y + jTopNode.y)/2,
    z:(iTopNode.z + jTopNode.z)/2,
    normalCos: vec.x,
    normalSin: vec.y,
  }

  const iCot = (iSectionPoint.rWeb[1].x - iSectionPoint.rWeb[0].x)/(iSectionPoint.rWeb[1].y-iSectionPoint.rWeb[0].y)
  const jCot = (jSectionPoint.lWeb[1].x - jSectionPoint.lWeb[0].x)/(jSectionPoint.lWeb[1].y-jSectionPoint.lWeb[0].y)
  let iheight  = iSectionPoint.rWeb[1].y-iSectionPoint.rWeb[0].y
  let jheight = jSectionPoint.rWeb[1].y-jSectionPoint.rWeb[0].y
  let points = [
    {x: -xlength/2 - topOffset * iCot, y: -xlength/2*grd -topOffset },
    {x: xlength/2 - topOffset * jCot, y: xlength/2*grd -topOffset },
    {x: xlength/2 - (jheight - bottomOffset) * jCot, y: xlength/2*grd -(jheight - bottomOffset) },
    {x: -xlength/2 - (iheight - bottomOffset) * iCot, y: -xlength/2*grd -(iheight - bottomOffset) },
  ]
  let bottomCenter = {x:(points[2].x + points[3].x)/2, y:(points[2].y + points[3].y)/2}
  let topFrame = Kframe(points[0],points[1],hFrameEndOffset,hFrameEndOffset,pts)
  let bottomFrame = Kframe(points[3],points[2],hFrameEndOffset,hFrameEndOffset,pts)
  let leftFrame = Kframe(points[0],bottomCenter,diaFrameEndOffset,diaFrameEndOffset,pts)
  let rightFrame = Kframe(bottomCenter,points[1],diaFrameEndOffset,diaFrameEndOffset,pts)

  let topVec = Vector(points[0], points[1])
  let leftVec = Vector(points[0], bottomCenter)
  let rightVec = Vector(bottomCenter, points[1])
  let bottomVec = Vector(points[3], points[2])
  
  let leftTopGussetPlate = [
    {x: -xlength/2 - gussetWeldingOffset * iCot, y: -xlength/2*grd -gussetWeldingOffset },
    XYOffset(points[0],topVec,hFrameEndOffset + gussetBondingLength,pts[0]+gussetWeldingOffset),
    XYOffset(points[0],leftVec,diaFrameEndOffset + gussetBondingLength,pts[0]+gussetWeldingOffset),
    XYOffset(points[0],leftVec,diaFrameEndOffset + gussetBondingLength,pts[2]-gussetWeldingOffset),
    {x: -xlength/2 - (gussetWeldingOffset + gussetTopWidth) * iCot, y: -xlength/2*grd -(gussetWeldingOffset + gussetTopWidth) },
  ]
  result['centerGusset'] = {
    points:[
      XYOffset(bottomCenter,bottomVec,-gussetCenterWidth/2,pts[2]-gussetWeldingOffset),
      XYOffset(bottomCenter,bottomVec,gussetCenterWidth/2,pts[2]-gussetWeldingOffset),
      XYOffset(bottomCenter,rightVec,(diaFrameEndOffset + gussetBondingLength),pts[2]-gussetWeldingOffset),
      XYOffset(bottomCenter,rightVec,(diaFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
      XYOffset(bottomCenter,leftVec,-(diaFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
      XYOffset(bottomCenter,leftVec,-(diaFrameEndOffset + gussetBondingLength),pts[2]-gussetWeldingOffset),
    ],
    Thickness:gussetThickness,
    z:-gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['leftTopGusset'] = {
    points:leftTopGussetPlate,
    Thickness:gussetThickness,
    z:-gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['rightTopGusset'] = {
    points:[
      {x: xlength/2 - gussetWeldingOffset * jCot, y: xlength/2*grd -gussetWeldingOffset },
      XYOffset(points[1],topVec,-(hFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
      XYOffset(points[1],rightVec,-(diaFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
      XYOffset(points[1],rightVec,-(diaFrameEndOffset + gussetBondingLength),pts[2]-gussetWeldingOffset),
      {x: xlength/2 - (gussetWeldingOffset + gussetTopWidth) * jCot, y: xlength/2*grd -(gussetWeldingOffset + gussetTopWidth) },
    ],
    Thickness:gussetThickness,
    z:-gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['leftBottomGusset'] = {
    points:[
      {x: -xlength/2 - (iheight - gussetWeldingOffset) * iCot, y: -xlength/2*grd -(iheight - gussetWeldingOffset)},
      XYOffset(points[3],bottomVec,hFrameEndOffset + gussetBondingLength,pts[2] -gussetWeldingOffset),
      XYOffset(points[3],bottomVec,hFrameEndOffset + gussetBondingLength,pts[0] +gussetWeldingOffset),
      {x: -xlength/2 - (iheight - gussetWeldingOffset - gussetBottomWidth) * iCot, y: -xlength/2*grd -(iheight - gussetWeldingOffset - gussetBottomWidth) },
    ],
    Thickness:gussetThickness,
    z:-gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }

  result['rightBottomGusset'] = {
    points:[
      {x: xlength/2 - (jheight - gussetWeldingOffset) * jCot, y: xlength/2*grd -(jheight - gussetWeldingOffset)},
      XYOffset(points[2],bottomVec, -(hFrameEndOffset + gussetBondingLength),pts[2] -gussetWeldingOffset),
      XYOffset(points[2],bottomVec, -(hFrameEndOffset + gussetBondingLength),pts[0] +gussetWeldingOffset),
      {x: xlength/2 - (jheight - gussetWeldingOffset - gussetBottomWidth) * jCot, y: xlength/2*grd -(jheight - gussetWeldingOffset - gussetBottomWidth) },
    ],
    Thickness:gussetThickness,
    z:-gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }

  result['topFrame1'] = {
    points:topFrame[0],
    Thickness:pts[3],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['topFrame2'] = {
    points:topFrame[1],
    Thickness:pts[4],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  // //console.log(result)

  result['bottomFrame1'] = {
    points:bottomFrame[0],
    Thickness:pts[3],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['bottomFrame2'] = {
    points:bottomFrame[1],
    Thickness:pts[4],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }

  result['leftFrame1'] = {
    points:leftFrame[0],
    Thickness:pts[3],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['leftFrame2'] = {
    points:leftFrame[1],
    Thickness:pts[4],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['righttFrame1'] = {
    points:rightFrame[0],
    Thickness:pts[3],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }
  result['rightFrame2'] = {
    points:rightFrame[1],
    Thickness:pts[4],
    z:gussetThickness/2,
    rotationX:Math.PI/2,
    rotationY:0, 
    hole:[],
    point:centerPoint
  }

  return result
}

export function Kframe(node1, node2, ioffset, joffset, pts){
  let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2)
  let vec = Vector(node1, node2)
  let plate1 = [ XYOffset(node1,vec,ioffset,pts[0]),
                XYOffset(node1,vec,ioffset,pts[1]),
                XYOffset(node1,vec,(length-joffset),pts[1]),
                XYOffset(node1,vec,(length-joffset),pts[0]), ]
  let plate2 = [ XYOffset(node1,vec,ioffset,pts[1]),
                XYOffset(node1,vec,ioffset,pts[2]),
                XYOffset(node1,vec,(length-joffset),pts[2]),
                XYOffset(node1,vec,(length-joffset),pts[1]),]
  return [plate1, plate2]
}

export function XYOffset(node, vector, xoffset, yoffset){
  return {
    x:node.x + vector.x *xoffset - vector.y* yoffset, 
    y: node.y + vector.y * xoffset + vector.x* yoffset}
  }
export function Vector(node1,node2){
  let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2)
  return {x :(node2.x-node1.x)/length, y:(node2.y-node1.y)/length }
}

function scallop(point1,point2,point3,radius,smoothness){
  let points = [];
  let v1 = new THREE.Vector2(point1.x - point2.x, point1.y - point2.y).normalize();
  let v2 = new THREE.Vector2(point3.x - point2.x, point3.y - point2.y).normalize();
  for (let i = 0; i < smoothness+1 ; i++){
    let v3 = new THREE.Vector2().addVectors(v1.clone().multiplyScalar(smoothness - i), v2.clone().multiplyScalar(i)).setLength(radius);
    points.push({x: v3.x + point2.x, y: v3.y +point2.y});
  }
  return points
}


function Fillet2D(point1, point2, point3, radius, smoothness){
  let lv1 = Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2)  
  let lv2 = Math.sqrt((point3.x - point2.x)**2 + (point3.y - point2.y)**2)  
  let v1 = {x: (point1.x - point2.x)/lv1, y:(point1.y - point2.y)/lv1 }
  let v2 = {x: (point3.x - point2.x)/lv2, y:(point3.y - point2.y)/lv2 }
  let ang = Math.acos(v1.x*v2.x + v1.y*v2.y)
  let l1 = radius / Math.sin(ang / 2) / Math.sqrt((v1.x+v2.x)**2+(v1.y+v2.y)**2)
  let v3 = {x : (v1.x+v2.x) * l1, y : (v1.y+v2.y) * l1}
  let centerPoint = {x: point2.x + v3.x, y:point2.y + v3.y}
  let l2 = radius / Math.tan(ang / 2)
  let p1 = {x: point2.x + v1.x * l2, y:point2.y + v1.y*l2}
  let p2 = {x: point2.x + v2.x * l2, y:point2.y + v2.y*l2}
  let vc1 = {x: p1.x - centerPoint.x, y:p1.y - centerPoint.y}
  let vc2 = {x: p2.x- centerPoint.x, y:p2.y - centerPoint.y}
  let points = []
  points.push(p1)
    for (let j = 0; j < smoothness; j++) {
      let dirVec = {x:vc1.x * (smoothness - j) + vc2.x * (j+1) , y: vc1.y * (smoothness - j) + vc2.y * (j+1)}
      let l3 = radius / Math.sqrt(dirVec.x**2+dirVec.y**2)
      points.push({x: centerPoint.x + dirVec.x * l3, y:centerPoint.y + dirVec.y * l3});
    }
  points.push(p2)
  return points
 }

function PlateRestPoint(point1, point2, tan1, tan2, thickness){
  let x3
  let x4
  let y3
  let y4
  if (point1.x === point2.x){
    x3 = point1.x + thickness 
    x4 = point2.x + thickness
    y3 = tan1 === null? null : tan1 * (x3 - point1.x) + point1.y;
    y4 = tan2 === null? null : tan2 * (x4 - point2.x) + point2.y
  }else{
    let a = (point1.y - point2.y) / (point1.x - point2.x);
    let b = point1.y - a * point1.x;
    let alpha = thickness * Math.sqrt(1 + 1/a**2);
    x3 = tan1 === null? point1.x:(-a * alpha + b + tan1 * point1.x - point1.y) / (tan1 - a)
    x4 = tan2 === null? point2.x:(-a * alpha + b + tan2 * point2.x - point2.y) / (tan2 - a);
    y3 = a ===0? point1.y + thickness : a * (x3 - alpha) + b 
    y4 = a ===0? point2.y + thickness : a * (x4 - alpha) + b
  }
  return [point1,point2,{x:x4,y:y4},{x:x3,y:y3}]
}
//// point1, point2 two point of web, tan1 is gradient, H is height
function WebPoint(point1, point2, tan1, H){
  let x
  let y
  if (point1.x === point2.x){
    x = point1.x
    y = tan1 === null? null : tan1 * (x) + H;
  }else{
    let a = (point1.y - point2.y) / (point1.x - point2.x);
    let b = point1.y - a * point1.x;
    x = tan1 === null? point1.x:(b - H) / (tan1 - a)
    y = a * (x) + b 
  }
  return {x,y}
}
//// 다각형 points를 받아 index절점을 기준으로 길이 높이가 최소가 되는 사각형을 계산
function PlateSize(points,index,thickness){
  let index2
  index2 = index === points.length-1? 0 : index + 1;
  let a = Math.atan2(points[index2].y -points[index].y,points[index2].x -points[index].x );
  let xs = [];
  let ys = [];
  for (let i =0;i<points.length;i++){
    xs.push(points[i].x * Math.cos(-a) - points[i].y * Math.sin(-a))
    ys.push(points[i].x * Math.sin(-a) + points[i].y * Math.cos(-a))
  }
  let Length = Math.max(...xs) - Math.min(...xs)
  let Height = Math.max(...ys) - Math.min(...ys)
  return {L:Length,T:thickness,H:Height,Label:"PL-"+Height.toFixed(0) + 'x' + thickness.toFixed(0) + 'x' + Length.toFixed(0)}
}

function PlateSize2(points,index,thickness,width){
  let index2
  index2 = index === points.length-1? 0 : index + 1;
  let a = Math.atan2(points[index2].y -points[index].y,points[index2].x -points[index].x );
  let xs = [];
  for (let i =0;i<points.length;i++){
    xs.push(points[i].x * Math.cos(-a) - points[i].y * Math.sin(-a))
  }
  let Length = Math.max(...xs) - Math.min(...xs)
  let Height = width
  return {L:Length,T:thickness,H:Height,Label:"PL-"+Height.toFixed(0) + 'x' + thickness.toFixed(0) + 'x' + Length.toFixed(0)}
}



function PlateWelding(points,sidelist,type,value1,value2,value3){
  let weldingLength = 0
  for (let index in sidelist){
    if (sidelist[index]>0){
    weldingLength += PointLength(points[index],points[index+1])
  }
  }
  return {type:type,value1:value1,value2:value2,value3:value3,Length:weldingLength}
}

export function PointLength(point1,point2){
  return Math.sqrt((point1.x-point2.x)**2 + (point1.y-point2.y)**2)
}

function makeStirrup(height, width, extend, rebarDia, material) {
  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(extend, 0, 0))
  geometry.vertices.push(new THREE.Vector3(0, 0, 0))
  geometry.vertices.push(new THREE.Vector3(0, height, 0))
  geometry.vertices.push(new THREE.Vector3(width, height, 0))
  geometry.vertices.push(new THREE.Vector3(width, 0, rebarDia))
  geometry.vertices.push(new THREE.Vector3(0, 0, rebarDia))
  geometry.vertices.push(new THREE.Vector3(0, extend, rebarDia))
  return geometry;
}
