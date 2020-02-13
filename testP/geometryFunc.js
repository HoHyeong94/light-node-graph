import * as THREE from "three";
import {ToGlobalPoint} from './threejsDisplay';

export function sectionPoint(sectionInfo, pointSectionInfo, gradient){
    const lWebCot = (sectionInfo.B/2 - sectionInfo.UL) / sectionInfo.H;
    const rWebCot = (sectionInfo.UR - sectionInfo.B/2) / sectionInfo.H;
    const lWebCos = sectionInfo.H / Math.sqrt((sectionInfo.B/2 - sectionInfo.UL)**2 + sectionInfo.H**2);
    const rWebCos = sectionInfo.H / Math.sqrt((sectionInfo.UR - sectionInfo.B/2)**2 + sectionInfo.H**2);
    const height = pointSectionInfo.forward.height;
    const deltaH = height - sectionInfo.H;
    const centerThickness = 270 //  slab변수 추가
    let forward = {};
    let backward = {};
    let ps = {}
    let skew = pointSectionInfo.forward.skew
    for (let i = 0; i < 2;i++){
        if (i === 0) {
            ps = pointSectionInfo.forward
        } else {
            ps = pointSectionInfo.backward
        }
        let lfThickness = ps.lFlangeThk;
        let webThickness = ps.webThk;
        let ufWidth = ps.uFlangeW;
        let ufThickness = ps.uFlangeThk;
        let lwt = webThickness / lWebCos;
        let rwt = webThickness / rWebCos;
        let slabThickness = ps.slabThickness - centerThickness
        // leftWeb
        let blwX = - sectionInfo.B/2 - deltaH * lWebCot;
        let tlwX = (- sectionInfo.UL - slabThickness * lWebCot) / (1 - gradient * lWebCot);
        let lWeb = [
            {x: blwX, y: - height},
            {x: tlwX, y: gradient*tlwX - slabThickness},
            {x: (tlwX - lwt), y: gradient*(tlwX - lwt) - slabThickness},
            {x: (blwX - lwt), y: - height},
        ];
        // rightWeb
        let brwX = sectionInfo.B/2 -deltaH * rWebCot;
        let trwX = (sectionInfo.UR - slabThickness * rWebCot) / (1 - gradient * rWebCot);
        let rWeb = [
            {x: brwX, y: - height},
            {x: trwX, y: gradient*trwX- slabThickness},
            {x: (trwX + rwt), y: gradient*(trwX + rwt)- slabThickness},
            {x: (brwX + rwt), y: - height}
        ];
        // bottomplate
        let blx= - sectionInfo.B/2 - deltaH * lWebCot -sectionInfo.C1;
        let brx= sectionInfo.B/2 -deltaH * rWebCot + sectionInfo.D1;
        let bottomPlate = [
        {x: blx, y:  - height},
        {x: brx, y:  - height},
        {x: brx, y:  - height - lfThickness},
        {x: blx, y:  - height - lfThickness}

        ]
        // TopPlate
        let gcos = 1 / Math.sqrt(1 + gradient**2);
        let gsin = gradient * gcos;
        let addedX = - gsin * ufThickness;
        let addedZ = gcos * ufThickness;
        let tlx = (- sectionInfo.UL - sectionInfo.C - slabThickness * lWebCot) / (1 - gradient * lWebCot);
        let tlx2 = (- sectionInfo.UL - sectionInfo.C + ufWidth - slabThickness * lWebCot) / (1 - gradient * lWebCot);
        let trx = (sectionInfo.UR + sectionInfo.D - slabThickness * rWebCot) / (1 - gradient * rWebCot);
        let trx2 = (sectionInfo.UR + sectionInfo.D - ufWidth - slabThickness * rWebCot) / (1 - gradient * rWebCot);
        let topPlate1 = [
            {x: tlx, y: gradient*tlx- slabThickness},
            {x: tlx2, y: gradient*tlx2 - slabThickness},
            {x: (tlx2 + addedX), y: gradient*(tlx2 + addedX) + addedZ - slabThickness},
            {x: (tlx + addedX), y: gradient*(tlx + addedX) + addedZ- slabThickness}
        ];
        let topPlate2 = [
            {x: trx, y: gradient*trx- slabThickness},
            {x: trx2, y: gradient*trx2- slabThickness},
            {x: (trx2 + addedX), y: gradient*(trx2 + addedX) + addedZ- slabThickness},
            {x: (trx + addedX), y: gradient*(trx + addedX) + addedZ- slabThickness}
        ]
        if (i===0){
            forward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb}    
        }else {
            backward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb}    
        }
    }

    return {forward, backward}
  }


  export function diaphragmSection(webPoints, skew, uflangePoint, diaSection){ //ribPoint needed
    // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
    const bl = webPoints[0];
    const tl = webPoints[1];
    const br = webPoints[2];
    const tr = webPoints[3];
    var rotationY = (skew - 90)*Math.PI/180
    const lwCot = (tl.x - bl.x)/(tl.y-bl.y)
    const rwCot = (tr.x - br.x)/(tr.y-br.y)

    var lowerHeight = diaSection.lowerHeight;
    var lowerThickness = diaSection.lowerThickness;
    var lowerTopThickness = diaSection.lowerTopThickness;
    var lowerTopwidth = diaSection.lowerTopwidth;
    var upperThickness = diaSection.upperThickness;
    var longiRibHeight = diaSection.longiRibHeight;
    var longiRibRayout = diaSection.longiRibRayout;
    var upperHeight = diaSection.upperHeight;
    var sideHeight = diaSection.sideHeight;
    var sideThickness = diaSection.sideThickness;
    var leftsideTopwidth = diaSection.leftsideTopwidth;
    var leftsideTopThickness = diaSection.leftsideTopThickness;
    var leftsideToplength = diaSection.leftsideToplength;
    var rightsideTopwidth = diaSection.rightsideTopwidth;
    var rightsideTopThickness = diaSection.rightsideTopThickness;
    var rightsideToplength = diaSection.rightsideToplength;
    var upperTopThickness = diaSection.upperTopThickness;
    var upperTopwidth = diaSection.upperTopwidth;
    // added variables
    var scallopRadius = diaSection.scallopRadius;
    var ribHoleD = diaSection.ribHoleD;
    var ribHoleR = diaSection.ribHoleR;
    //L100x100x10 section point, origin = (0,0)
    var spc = diaSection.spc;
    var pts = diaSection.pts;

    ///lower stiffener
    var lowerPlate = [
      {x:bl.x + lwCot * lowerHeight,y:bl.y + lowerHeight}, bl, br,
      {x:br.x + rwCot * lowerHeight,y:br.y + lowerHeight}
    ];
    var lowerPoints = [];
    lowerPoints.push(lowerPlate[0]);
    // points.push(plate[1]);
    lowerPoints = lowerPoints.concat(scallop(tl,bl,br,scallopRadius,4));
    //// longitudinal stiffner holes
    for (let i=0; i<longiRibRayout.length;i++){
      lowerPoints.push({x:longiRibRayout[i] - ribHoleD, y:lowerPlate[1].y});
      var curve = new THREE.ArcCurve(longiRibRayout[i],lowerPlate[1].y + longiRibHeight, ribHoleR, Math.PI,0,true);
      var dummyVectors = curve.getPoints(8)
      for (let i = 0; i< dummyVectors.length;i++){
        lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y})
      }
      lowerPoints.push({x:longiRibRayout[i] + ribHoleD,y:lowerPlate[1].y});
    }
    ////
    lowerPoints = lowerPoints.concat(scallop(bl,br,tr,scallopRadius,4));
    lowerPoints.push(lowerPlate[3]);
    ////
    var lowerTopPoints = [lowerPlate[0],
                          {x:bl.x + lwCot * (lowerHeight+lowerTopThickness), y:bl.y + (lowerHeight+lowerTopThickness)},
                          {x:br.x + rwCot * (lowerHeight+lowerTopThickness), y:bl.y + (lowerHeight+lowerTopThickness)},
                          lowerPlate[3]];
    
    ///upper stiffener
    var upperPlate = [];
    upperPlate.push({x:tl.x, y:tl.y});
    upperPlate.push({x:tl.x - lwCot * upperHeight,y: tl.y -upperHeight});
    upperPlate.push({x:tr.x - rwCot * upperHeight,y: tr.y -upperHeight});
    upperPlate.push({x:tr.x, y:tr.y});
    var upperPoints = [];
    upperPoints = upperPoints.concat(scallop(upperPlate[3],upperPlate[0],upperPlate[1],scallopRadius,4));
    upperPoints.push(upperPlate[1]);
    upperPoints.push(upperPlate[2]);
    upperPoints = upperPoints.concat(scallop(upperPlate[2],upperPlate[3],upperPlate[0],scallopRadius,4));
    //upperTopPlate
    var gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 )
    var gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
    var upperTopPoints = [
      {x: uflangePoint[0].x, y: uflangePoint[0].y},
      {x: uflangePoint[0].x + gcos* upperTopThickness, y: uflangePoint[0].y + gsin* upperTopThickness},
      {x: uflangePoint[2].x + gcos* upperTopThickness, y: uflangePoint[2].y + gsin* upperTopThickness},
      {x: uflangePoint[2].x, y: uflangePoint[2].y}
    ];
    ////left side stiffner
    var leftPlate = [
      {x:bl.x + lwCot * (lowerHeight+lowerTopThickness),y:bl.y + (lowerHeight+lowerTopThickness)}, 
      {x:bl.x + lwCot * (lowerHeight+lowerTopThickness) + sideHeight*gsin,y:bl.y + (lowerHeight+lowerTopThickness)},
      {x:tl.x - lwCot * (upperHeight+leftsideTopThickness)*gsin + sideHeight * gsin,y:tl.y - (upperHeight+leftsideTopThickness)*gsin - sideHeight * gcos},
      {x:tl.x - lwCot * (upperHeight+leftsideTopThickness)*gsin, y:tl.y - (upperHeight+leftsideTopThickness)*gsin}
    ]
//   ////right side stiffner
    var rightPlate = [
      {x:br.x + rwCot * (lowerHeight+lowerTopThickness), y:br.y + (lowerHeight+lowerTopThickness)}, 
      {x:br.x + rwCot * (lowerHeight+lowerTopThickness) - sideHeight*gsin,y:br.y + (lowerHeight+lowerTopThickness)},
      {x:tr.x - rwCot * (upperHeight+leftsideTopThickness)*gsin - sideHeight * gsin,y:tr.y - (upperHeight+leftsideTopThickness)*gsin + sideHeight * gcos},
      {x:tr.x - rwCot * (upperHeight+leftsideTopThickness)*gsin, y:tr.y - (upperHeight+leftsideTopThickness)*gsin}
    ]
  ////leftside top plate
  var leftTopPlate = [
    leftPlate[3],
    upperPlate[1],
    {x:upperPlate[1].x + leftsideTopwidth*gsin, y: upperPlate[1].y - leftsideTopwidth * gcos  },
    {x:upperPlate[1].x + leftsideTopwidth*gsin - leftsideTopThickness*gcos, y: upperPlate[1].y - leftsideTopwidth * gcos - leftsideTopThickness*gsin }
  ]
  ////rightside top plate
  var rightTopPlate = [
    rightPlate[3],
    upperPlate[2],
    {x:upperPlate[2].x - rightsideTopwidth*gsin, y: upperPlate[2].y + rightsideTopwidth * gcos  },
    {x:upperPlate[2].x - rightsideTopwidth*gsin - rightsideTopThickness*gcos, y: upperPlate[2].y + rightsideTopwidth * gcos - rightsideTopThickness*gsin }
  ] 
  // k-frame diaphragm
    var leftline =  [{x:-spc*gsin,y:-spc*gcos},lowerTopPoints[1]]
    var lcos = (leftline[1].x - leftline[0].x) / Math.sqrt((leftline[1].x - leftline[0].x)**2 + (leftline[1].y - leftline[0].y)**2)
    var ltan = (leftline[1].y - leftline[0].y) / (leftline[1].x - leftline[0].x)
    var lsin = lcos * ltan
    var newleftline = [
      {x:leftline[0].x - (spc - lcos * pts[0]) / ltan, y: leftline[0].y - (spc - lcos * pts[0])},
      {x:leftline[1].x + (spc - lsin * pts[0]), y: leftline[1].y + ltan * (spc - lsin * pts[0])}
    ]
    var leftframe1 = [
      {x:newleftline[0].x + pts[0] * lsin,y:newleftline[0].y - pts[0] * lcos},
      {x:newleftline[0].x + pts[1] * lsin,y:newleftline[0].y - pts[1] * lcos},
      {x:newleftline[1].x + pts[1] * lsin,y:newleftline[1].y - pts[1] * lcos},
      {x:newleftline[1].x + pts[0] * lsin,y:newleftline[1].y - pts[0] * lcos}
    ]
    var leftframe2 = [
      {x:newleftline[0].x + pts[1] * lsin,y:newleftline[0].y - pts[1] * lcos},
      {x:newleftline[0].x + pts[2] * lsin,y:newleftline[0].y - pts[2] * lcos},
      {x:newleftline[1].x + pts[2] * lsin,y:newleftline[1].y - pts[2] * lcos},
      {x:newleftline[1].x + pts[1] * lsin,y:newleftline[1].y - pts[1] * lcos}
    ]
    var rightline = [{x:spc*gsin,y:spc*gcos},lowerTopPoints[2]]
    var rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x)**2 + (rightline[1].y - rightline[0].y)**2)
    var rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x)
    var rsin = rcos * rtan
    var newrightline = [
      {x:rightline[0].x - (spc + rcos * pts[0]) / rtan, y: rightline[0].y - (spc + rcos * pts[0])},
      {x:rightline[1].x - (spc - rsin * pts[0]), y: rightline[1].y - rtan * (spc - rsin * pts[0])}
    ]
    var rightframe1 = [
      {x:newrightline[0].x - pts[0] * rsin,y:newrightline[0].y + pts[0] * rcos},
      {x:newrightline[0].x - pts[1] * rsin,y:newrightline[0].y + pts[1] * rcos},
      {x:newrightline[1].x - pts[1] * rsin,y:newrightline[1].y + pts[1] * rcos},
      {x:newrightline[1].x - pts[0] * rsin,y:newrightline[1].y + pts[0] * rcos}
    ]
    var rightframe2 = [
      {x:newrightline[0].x - pts[1] * rsin,y:newrightline[0].y + pts[1] * rcos},
      {x:newrightline[0].x - pts[2] * rsin,y:newrightline[0].y + pts[2] * rcos},
      {x:newrightline[1].x - pts[2] * rsin,y:newrightline[1].y + pts[2] * rcos},
      {x:newrightline[1].x - pts[1] * rsin,y:newrightline[1].y + pts[1] * rcos}
    ]
      return {
        lowershape:{points:lowerPoints,Thickness:lowerThickness,z:-lowerThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]}, 
        lowerTopShape: {points:lowerTopPoints,Thickness:lowerTopwidth,z:-lowerTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        upperShape: {points:upperPoints,Thickness:upperThickness,z:-upperThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        upperTopShape:{points:upperTopPoints,Thickness:upperTopwidth,z:-upperTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        leftPlateShape:{points:leftPlate, Thickness:sideThickness,z:-sideThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        rightPlateShape:{points:rightPlate, Thickness:sideThickness,z:-sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        leftTopPlateShape:{points:leftTopPlate, Thickness:leftsideToplength,z:-leftsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        rightTopPlateShape:{points:rightTopPlate, Thickness:rightsideToplength,z:-rightsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        leftframe1:{points:leftframe1, Thickness:pts[3],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        leftframe2:{points:leftframe2, Thickness:pts[4],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        rightframe1:{points:rightframe1, Thickness:pts[3],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        rightframe2:{points:rightframe2, Thickness:pts[4],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
      }
  }

  export function diaphragmSection2(webPoints, skew, uflangePoint, diaSection){ //ribPoint needed
    // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
    const result = {}
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
    // var longiRibHeight = diaSection.longiRibHeight;
    // var longiRibRayout = diaSection.longiRibRayout;
    const holeVstiffnerThickness = diaSection.holeVstiffnerThickness
    const holeVstiffnerhight = diaSection.holeVstiffnerhight
    const holeVstiffnerLength = diaSection.holeVstiffnerLength
    const holeHstiffnerThickness = diaSection.holeHstiffnerThickness
    const holeHstiffnerHeight = diaSection.holeHstiffnerHeight
    const holeHstiffnerLength = diaSection.holeHstiffnerLength
    const holeStiffSpacing = diaSection.holeStiffSpacing
    // added variables
    var scallopRadius = diaSection.scallopRadius;


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

    var hStiff1 = [
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot - (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
    ]
    var hStiff2 = [
      {x: vstiffX2,y: -(vstiffX2) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
      {x: vstiffX2,y: -(vstiffX2) * cot - (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot - (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot - (hStiffWidth + plateThickness/2) * cosec},
    ]
    var hStiff3 = [
      {x: vstiffX4,y: -(vstiffX4) * cot - (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX4,y: -(vstiffX4) * cot - (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot - (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot - (hStiffWidth + plateThickness/2) * cosec},
    ]
    var hStiff4 = [
      {x: vstiffX6,y: -(vstiffX6) * cot - (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX6,y: -(vstiffX6) * cot - (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
    ]
    result['hStiff1'] = {points:hStiff1,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff2'] = {points:hStiff2,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff3'] = {points:hStiff3,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff4'] = {points:hStiff4,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}

    var hStiff5 = [
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
      {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot + (plateThickness/2) * cosec},
      {x: vstiffX1 ,y:-(vstiffX1) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
    ]
    var hStiff6 = [
      {x: vstiffX2,y: -(vstiffX2) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
      {x: vstiffX2,y: -(vstiffX2) * cot + (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot + (plateThickness/2) * cosec},
      {x: vstiffX3 ,y:-(vstiffX3) * cot + (hStiffWidth + plateThickness/2) * cosec},
    ]
    var hStiff7 = [
      {x: vstiffX4,y: -(vstiffX4) * cot + (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX4,y: -(vstiffX4) * cot + (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot + (plateThickness/2) * cosec},
      {x: vstiffX5 ,y:-(vstiffX5) * cot + (hStiffWidth + plateThickness/2) * cosec},
    ]
    var hStiff8 = [
      {x: vstiffX6,y: -(vstiffX6) * cot + (hStiffWidth + plateThickness/2) * cosec},
      {x: vstiffX6,y: -(vstiffX6) * cot + (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (plateThickness/2) * cosec},
      {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
    ]
    result['hStiff5'] = {points:hStiff5,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff6'] = {points:hStiff6,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff7'] = {points:hStiff7,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}
    result['hStiff8'] = {points:hStiff8,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]}

    // var ribHoleD = diaSection.ribHoleD;
    // var ribHoleR = diaSection.ribHoleR;

    // hole stiffner
    var holeVStiff1 = [
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

    var holeVStiff2 = [
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

      var holeHStiff1 = [
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
    var topPlate = [
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


    ///lower stiffener
    var mainPlate = [
      {x: tl.x * cosec, y:tl.y}, 
      {x: bl.x * cosec, y:bl.y}, 
      {x: br.x * cosec, y:br.y}, 
      {x: tr.x * cosec, y:tr.y}, 
    ];
    var diaPoints = [];
    diaPoints = diaPoints.concat(scallop(mainPlate[3],mainPlate[0],mainPlate[1],scallopRadius,4));
    // points.push(plate[1]);
    diaPoints = diaPoints.concat(scallop(mainPlate[0],mainPlate[1],mainPlate[2],scallopRadius,4));
    //// longitudinal stiffner holes
    // for (let i=0; i<longiRibRayout.length;i++){
    //   lowerPoints.push({x:longiRibRayout[i] - ribHoleD, y:lowerPlate[1].y});
    //   var curve = new THREE.ArcCurve(longiRibRayout[i],lowerPlate[1].y + longiRibHeight, ribHoleR, Math.PI,0,true);
    //   var dummyVectors = curve.getPoints(8)
    //   for (let i = 0; i< dummyVectors.length;i++){
    //     lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y})
    //   }
    //   lowerPoints.push({x:longiRibRayout[i] + ribHoleD,y:lowerPlate[1].y});
    // }
    ////
    diaPoints = diaPoints.concat(scallop(mainPlate[1],mainPlate[2],mainPlate[3],scallopRadius,4));
    diaPoints = diaPoints.concat(scallop(mainPlate[2],mainPlate[3],mainPlate[0],scallopRadius,4));
    ////

    var holePoints = []
    var holeRect = [
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
    var gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 )
    var gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x)
    const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
    const rwCot = (tr.x - br.x)/(tr.y-br.y);
    const lcos = (tl.x - bl.x) / Math.sqrt((tl.x - bl.x)**2 + (tl.y - bl.y)**2);
    const lsin = lcos / lwCot;
    const rcos = (tr.x - br.x) / Math.sqrt((tr.x - br.x)**2 + (tr.y - br.y)**2);
    const rsin = rcos / rwCot;

    var sideHeight = vSection.sideHeight;
    var sideThickness = vSection.sideThickness;
    var upperHeight = vSection.upperHeight;
    var bottomOffset = vSection.bottomOffset;
    var scallopRadius = vSection.scallopRadius;
    var sideScallopOffset = vSection.sideScallopOffset;
    //L100x100x10 section point, origin = (0,0)
    var spc = vSection.spc;
    var pts = vSection.pts;
    var rotationY = (skew - 90)*Math.PI/180
  ///left stiffener
    var leftplate = [
      tl,
      {x:bl.x + lwCot * bottomOffset, y : bl.y + bottomOffset },
      {x:bl.x + lwCot * bottomOffset + lsin*sideHeight, y : bl.y + bottomOffset - lcos*sideHeight},
      {x:tl.x + gsin * sideHeight, y : tl.y + gcos * sideHeight },
    ]
    var leftPoints = [];
    leftPoints = leftPoints.concat(scallop(leftplate[3],leftplate[0],leftplate[1],scallopRadius,4));
    leftPoints.push(leftplate[1])
    leftPoints = leftPoints.concat(scallop(leftplate[1],leftplate[2],leftplate[3],sideHeight-sideScallopOffset,1));
    leftPoints.push(leftplate[3])
  
    ///right stiffener
    var rightplate = [
      tr,
      {x:br.x + rwCot * bottomOffset, y : br.y + bottomOffset },
      {x:br.x + rwCot * bottomOffset - rsin * sideHeight, y : br.y + bottomOffset + rcos*sideHeight},
      {x:tr.x - gsin * sideHeight, y : tr.y - gcos * sideHeight },
    ]
    var rightPoints = [];
    rightPoints = rightPoints.concat(scallop(rightplate[3],rightplate[0],rightplate[1],scallopRadius,4));
    rightPoints.push(rightplate[1])
    rightPoints = rightPoints.concat(scallop(rightplate[1],rightplate[2],rightplate[3],sideHeight-sideScallopOffset,1));
    rightPoints.push(rightplate[3])
    ////upper bracing
    var upperline =  [
      {x:tl.x - lwCot * upperHeight + gsin * spc , y: tl.y - upperHeight + gcos * spc},
      {x:tr.x - rwCot * upperHeight - gsin * spc , y: tr.y - upperHeight - gcos * spc}]
    var upperframe1 = [
      {x:upperline[0].x + pts[0] * gcos,y:upperline[0].y + pts[0] * gsin},
      {x:upperline[0].x + pts[1] * gcos, y:upperline[0].y + pts[1] * gsin},
      {x:upperline[1].x + pts[1] * gcos, y:upperline[1].y + pts[1] * gsin},
      {x:upperline[1].x + pts[0] * gcos, y:upperline[1].y + pts[0] * gsin}
    ]
    var upperframe2 = [
      {x:upperline[0].x + pts[1] * gcos,y:upperline[0].y + pts[1] * gsin},
      {x:upperline[0].x + pts[2] * gcos, y:upperline[0].y + pts[2] * gsin},
      {x:upperline[1].x + pts[2] * gcos, y:upperline[1].y + pts[2] * gsin},
      {x:upperline[1].x + pts[1] * gcos, y:upperline[1].y + pts[1] * gsin}
    ]
  return {
    leftshape: {points:leftPoints,Thickness:sideThickness,z: -sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}, 
    rightShape: {points:rightPoints,Thickness:sideThickness,z:-sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
    upperframe1:{points:upperframe1, Thickness:pts[3],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
    upperframe2:{points:upperframe2, Thickness:pts[4],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
   }
}


export function hBracingSection(point1, point2, webPoints, hBSection){
  // var sideToplength = 700;
  // var sideTopwidth = 300;
  // var B = 2000;
  // var H = 2500;
  // var ULR = 1300;

  const bl = webPoints[0];
  const tl = webPoints[1];
  const br = webPoints[2];
  const tr = webPoints[3];

  const lwCot = (tl.x - bl.x)/(tl.y-bl.y)
  const rwCot = (tr.x - br.x)/(tr.y-br.y)

  var upperHeight = hBSection.upperHeight;
  var sideTopThickness = hBSection.sideTopThickness;
  var spc = hBSection.spc
  var pts = hBSection.pts

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
  let convexpointslist = [
    [{x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z},
    {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z},
    {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z},
    {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z},
    {x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z + pts[4]},
    {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z + pts[4]},
    {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z + pts[4]},
    {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z + pts[4]},
  ],
  [
    {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z},
    {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z},
    {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z},
    {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z},
    {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z + pts[5]},
    {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z + pts[5]},
    {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z + pts[5]},
    {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z + pts[5]},

    ]
  ];

  return { line:Brline, pointlist: convexpointslist, }
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
  var curve = new THREE.ArcCurve(0,scallopHeight,scallopRadius,Math.PI,0,true);
  var curvePoint = curve.getPoints(8);
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
  let iCos = iPoint.normalCos * cbVec.x +iPoint.normalSin * cbVec.y
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
  // console.log(result)

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
    let plate1 = [
      XYOffset(node1,vec,ioffset,pts[0]),
      XYOffset(node1,vec,ioffset,pts[1]),
      XYOffset(node1,vec,(length-joffset),pts[1]),
      XYOffset(node1,vec,(length-joffset),pts[0]),
    // {x:node1.x + vec.x *ioffset - vec.y* pts[0], y: node1.y + vec.y * ioffset + vec.x* pts[0]},
    // {x:node1.x + vec.x *ioffset - vec.y* pts[1], y: node1.y + vec.y * ioffset + vec.x* pts[1]},
    // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[1], y: node1.y + vec.y * (length - joffset) + vec.x* pts[1]},
    // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[0], y: node1.y + vec.y * (length - joffset) + vec.x* pts[0]},
  ]
  let plate2 = [
    XYOffset(node1,vec,ioffset,pts[1]),
    XYOffset(node1,vec,ioffset,pts[2]),
    XYOffset(node1,vec,(length-joffset),pts[2]),
    XYOffset(node1,vec,(length-joffset),pts[1]),
    // {x:node1.x + vec.x *ioffset - vec.y* pts[1], y: node1.y + vec.y * ioffset + vec.x* pts[1]},
    // {x:node1.x + vec.x *ioffset - vec.y* pts[2], y: node1.y + vec.y * ioffset + vec.x* pts[2]},
    // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[2], y: node1.y + vec.y * (length - joffset) + vec.x* pts[2]},
    // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[1], y: node1.y + vec.y * (length - joffset) + vec.x* pts[1]},
  ]
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
  var points = [];
  var v1 = new THREE.Vector2(point1.x - point2.x, point1.y - point2.y).normalize();
  var v2 = new THREE.Vector2(point3.x - point2.x, point3.y - point2.y).normalize();
  for (let i = 0; i < smoothness+1 ; i++){
    var v3 = new THREE.Vector2().addVectors(v1.clone().multiplyScalar(smoothness - i), v2.clone().multiplyScalar(i)).setLength(radius);
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
  var p1 = {x: point2.x + v1.x * l2, y:point2.y + v1.y*l2}
  var p2 = {x: point2.x + v2.x * l2, y:point2.y + v2.y*l2}
  var vc1 = {x: p1.x - centerPoint.x, y:p1.y - centerPoint.y}
  var vc2 = {x: p2.x- centerPoint.x, y:p2.y - centerPoint.y}
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

function filletPolyline(geometry, radius, smoothness) {
  var points = geometry.vertices
  var newGeometry = new THREE.Geometry();
  var v1 = new THREE.Vector3();
  var v2 = new THREE.Vector3();
  var v3 = new THREE.Vector3();
  var vc1 = new THREE.Vector3();
  var vc2 = new THREE.Vector3();
  var center = new THREE.Vector3();
  var ang
  var l1

  newGeometry.vertices.push(points[0])
  for (let i = 1; i < points.length - 1; i++) {
    //console.log(points[i].x);
    v1.subVectors(points[i - 1], points[i]).normalize();
    v2.subVectors(points[i + 1], points[i]).normalize();
    ang = Math.acos(v1.dot(v2))
    l1 = radius / Math.sin(ang / 2)
    v3.addVectors(v1, v2).setLength(l1);
    center.addVectors(points[i], v3);
    var p1 = new THREE.Vector3().addVectors(points[i], v1.multiplyScalar(radius / Math.tan(ang / 2)))
    var p2 = new THREE.Vector3().addVectors(points[i], v2.multiplyScalar(radius / Math.tan(ang / 2)))
    vc1.subVectors(p1, center);
    vc2.subVectors(p2, center);

    newGeometry.vertices.push(p1)
    for (let j = 0; j < smoothness; j++) {
      var dirVec = new THREE.Vector3().addVectors(vc1.clone().multiplyScalar(smoothness - j), vc2.clone().multiplyScalar(j + 1)).setLength(radius);
      newGeometry.vertices.push(new THREE.Vector3().addVectors(center, dirVec));
    }
    newGeometry.vertices.push(p2)
  }
  newGeometry.vertices.push(points[points.length - 1])
  //var line2 = new THREE.Line(newGeometry,line.material);
  //scene.add(line2)
  return newGeometry;
}

function makeStirrup(height, width, extend, rebarDia, material) {
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(extend, 0, 0))
  geometry.vertices.push(new THREE.Vector3(0, 0, 0))
  geometry.vertices.push(new THREE.Vector3(0, height, 0))
  geometry.vertices.push(new THREE.Vector3(width, height, 0))
  geometry.vertices.push(new THREE.Vector3(width, 0, rebarDia))
  geometry.vertices.push(new THREE.Vector3(0, 0, rebarDia))
  geometry.vertices.push(new THREE.Vector3(0, extend, rebarDia))
  return geometry;
}
