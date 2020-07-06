import { ToGlobalPoint } from "../geometryModule"
import { vPlateGen, hPlateGen, } from "../stiffner/module"

export function SplicePlate(iPoint, iSectionPoint) {
  let result = {}

  let sp = {
    webThickness: iSectionPoint.input.tw,
    uflangeWidth: iSectionPoint.input.wuf,
    lflangeWidth: iSectionPoint.input.luf,
    uflangeThickness: iSectionPoint.input.tuf,
    lflangeThickness: iSectionPoint.input.tlf,
  }
  let xs = {
    webJointThickness: 20,
    webJointWidth: 600,
    webJointHeight: 1800,
    uflangeJointThickness: 20,
    lflangeJointThickness: 20,
    // flangeJointLength: 500,
    uflangeJointLength: 600,
    lflangeJointLength: 600,
    margin2 : 20, //종방향 부재와의 간격
  }

  let wBolt = {
    P: 100,
    G: 100,
    pNum: 2,
    gNum: 17,
    size: 37,
    t: 14,
    margin: 100,
  }

  let fBolt = {
    P: 75,
    G: 75,
    pNum: 2,
    gNum: 6,
    size: 37,
    t: 14,
    margin: 100,  // 볼트의 연단거리
    
  }
  let gradient = (iSectionPoint.web[1][1].y - iSectionPoint.web[0][1].y) / (iSectionPoint.web[1][1].x - iSectionPoint.web[0][1].x)

  let Web = [{ x: -xs.webJointHeight / 2, y: - xs.webJointWidth / 2 },
  { x: -xs.webJointHeight / 2, y: xs.webJointWidth / 2 },
  { x: xs.webJointHeight / 2, y: xs.webJointWidth / 2 },
  { x: xs.webJointHeight / 2, y: - xs.webJointWidth / 2 }]
  let WebBolt = [{
    startPoint: { x: xs.webJointHeight / 2 - wBolt.margin, y: xs.webJointWidth / 2 - wBolt.margin },
    P: wBolt.P, G: wBolt.G, pNum: wBolt.pNum, gNum: wBolt.gNum, size: wBolt.size, t: wBolt.t, l: xs.webJointThickness * 2 + sp.webThickness
  },
  {
    startPoint: { x: xs.webJointHeight / 2 - wBolt.margin, y: - xs.webJointWidth / 2 + wBolt.margin },
    P: - wBolt.P, G: wBolt.G, pNum: wBolt.pNum, gNum: wBolt.gNum, size: wBolt.size, t: wBolt.t, l: xs.webJointThickness * 2 + sp.webThickness
  }]

  for (let i = 0; i < 2; i++) {
    let iNode = iSectionPoint.web[i][0]
    let jNode = iSectionPoint.web[i][1]
    let centerPoint = ToGlobalPoint(iPoint, { x: (iNode.x + jNode.x) / 2, y: (iNode.y + jNode.y) / 2 })
    let lWebAngle = Math.PI - Math.atan((jNode.y - iNode.y) / (jNode.x - iNode.x))
    let partName = i === 0 ? "lWeb" : "rWeb";
    let side2D = i === 0 ? true : false;
    result[partName] = hPlateGen(Web, centerPoint, xs.webJointThickness, sp.webThickness, 90, 0, lWebAngle, null, false, side2D)
    result[partName].bolt = WebBolt;
    result[partName + "2"] = hPlateGen(Web, centerPoint, xs.webJointThickness, - xs.webJointThickness, 90, 0, lWebAngle, null, false, false)
  }

  let uPoint = { x: 0, y: - iSectionPoint.web[0][1].x * gradient + iSectionPoint.web[0][1].y };
  let centerPoint = ToGlobalPoint(iPoint, uPoint)
  if (iSectionPoint.uflange[2].length > 0) { //폐합

  } else { // 개구
    for (let i = 0; i < 2; i++) {
      let lx = Math.sqrt((iSectionPoint.web[i][1].x - uPoint.x) ** 2 + (iSectionPoint.web[i][1].y - uPoint.y) ** 2)
      let sign = i === 0 ? -1 : 1;
      let TopFlange = [{ x: sign * (lx + iSectionPoint.input.buf), y: -xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf), y: xs.uflangeJointLength / 2 },
      { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: - xs.uflangeJointLength / 2 }]
      let TopFlangeBolt = [{ startPoint: { x: TopFlange[2].x + sign * fBolt.margin, y: TopFlange[2].y - fBolt.margin },
        P: fBolt.P, G: - sign * fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: 2 * xs.uflangeJointThickness + sp.uflangeThickness},
        {startPoint:{ x: TopFlange[3].x + sign * fBolt.margin, y: TopFlange[3].y + fBolt.margin },
      P: - fBolt.P, G: - sign * fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: 2 * xs.uflangeJointThickness + sp.uflangeThickness}]
      let keyName = i === 0 ? "lTop" : "rTop";
      let side2D = i===0? [0,1] : null;
      result[keyName] = hPlateGen(TopFlange, centerPoint, xs.uflangeJointThickness, sp.uflangeThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, true, side2D)
      result[keyName].bolt = TopFlangeBolt;
      let TopFlange2 = [{ x: sign * (lx + iSectionPoint.input.buf), y: -xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf), y: xs.uflangeJointLength / 2 },
        { x: sign * (lx - sp.webThickness - xs.margin2), y: xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: - xs.uflangeJointLength / 2 }]
      let TopFlange3 = [{ x: sign * (lx - xs.margin2), y: -xs.uflangeJointLength / 2 }, { x: sign * (lx - xs.margin2), y: xs.uflangeJointLength / 2 },
          { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: xs.uflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.buf - iSectionPoint.input.wuf), y: - xs.uflangeJointLength / 2 }]

      result[keyName + "2"] = hPlateGen(TopFlange2, centerPoint, xs.uflangeJointThickness, - xs.uflangeJointThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, false, side2D)
      result[keyName + "3"] = hPlateGen(TopFlange3, centerPoint, xs.uflangeJointThickness, - xs.uflangeJointThickness, 90, Math.atan(iPoint.gradientX), -Math.atan(gradient), null, false, null)
    }
  }

  let lPoint = { x: 0, y: iSectionPoint.web[0][0].y };
  centerPoint = ToGlobalPoint(iPoint, lPoint)
  if (iSectionPoint.uflange[2].length > 0) { //폐합

  } else { // 개구
    for (let i = 0; i < 2; i++) {
      let lx = Math.sqrt((iSectionPoint.web[i][0].x - lPoint.x) ** 2 + (iSectionPoint.web[i][0].y - lPoint.y) ** 2)
      let sign = i === 0 ? -1 : 1;
      let BottomFlange = [{ x: sign * (lx + iSectionPoint.input.blf), y: -xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf), y: xs.lflangeJointLength / 2 },
      { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: - xs.lflangeJointLength / 2 }]
      let BottomFlangeBolt = [{ startPoint: { x: BottomFlange[2].x + sign * fBolt.margin, y: BottomFlange[2].y - fBolt.margin },
        P: fBolt.P, G: - sign * fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: 2 * xs.lflangeJointThickness + sp.lflangeThickness},
        {startPoint:{ x: BottomFlange[3].x + sign * fBolt.margin, y: BottomFlange[3].y + fBolt.margin },
      P: - fBolt.P, G: - sign * fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: 2 * xs.lflangeJointThickness + sp.lflangeThickness}]
      let keyName = i === 0 ? "lBottom" : "rBottom";
      let side2D = i===0? [0,1] : null;
      result[keyName] = hPlateGen(BottomFlange, centerPoint, xs.lflangeJointThickness, - sp.lflangeThickness- xs.lflangeJointThickness, 90, Math.atan(iPoint.gradientX),0, null, true, side2D)
      let TopFlange2 = [{ x: sign * (lx + iSectionPoint.input.blf), y: -xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf), y: xs.lflangeJointLength / 2 },
        { x: sign * (lx - sp.webThickness - xs.margin2), y: xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: - xs.lflangeJointLength / 2 }]
      let TopFlange3 = [{ x: sign * (lx - xs.margin2), y: -xs.lflangeJointLength / 2 }, { x: sign * (lx - xs.margin2), y: xs.lflangeJointLength / 2 },
          { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: xs.lflangeJointLength / 2 }, { x: sign * (lx + iSectionPoint.input.blf - iSectionPoint.input.wlf), y: - xs.lflangeJointLength / 2 }]
      result[keyName + "2"] = hPlateGen(TopFlange2, centerPoint, xs.lflangeJointThickness,  0, 90, Math.atan(iPoint.gradientX), 0, null, false, side2D)
      result[keyName + "2"].bolt = BottomFlangeBolt;
      result[keyName + "3"] = hPlateGen(TopFlange3, centerPoint, xs.lflangeJointThickness,  0, 90, Math.atan(iPoint.gradientX), 0, null, false, null)
    }
  }

  // iNode = ToGlobalPoint(iPoint, iSectionPoint.Web[0][1])
  // centerPoint = {
  //   ...iNode,
  //   normalCos: iPoint.normalCos,
  //   normalSin: iPoint.normalSin,
  // }
  // let TopFlange = [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }]
  // let TopFlangeBolt = [{ startPoint: { x: 160, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 2, size: 37, t: 14, l: 54 },
  // { startPoint: { x: -80, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 2, size: 37, t: 14, l: 54 }]

  // result["lTop"] = { points: TopFlange, point: centerPoint, Thickness: 20, z: 14, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: [], bolt: TopFlangeBolt }
  // result["lTop2"] = {
  //   points: [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: -40, y: 250 }, { x: -40, y: -250 }],
  //   point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
  // }
  // result["lTop3"] = {
  //   points: [{ x: 40, y: -250 }, { x: 40, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }],
  //   point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
  // }

  // iNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1])
  // centerPoint = {
  //   ...iNode,
  //   normalCos: iPoint.normalCos,
  //   normalSin: iPoint.normalSin,
  // }

  // result["rTop"] = { points: TopFlange, point: centerPoint, Thickness: 20, z: 14, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: [], bolt: TopFlangeBolt }
  // result["rTop2"] = {
  //   points: [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: -40, y: 250 }, { x: -40, y: -250 }],
  //   point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
  // }
  // result["rTop3"] = {
  //   points: [{ x: 40, y: -250 }, { x: 40, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }],
  //   point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
  // }


  // let BP = iSectionPoint.bottomPlate
  // iNode = ToGlobalPoint(iPoint, BP[0])
  // jNode = ToGlobalPoint(iPoint, BP[1])
  // centerPoint = {
  //   x: (iNode.x + jNode.x) / 2,
  //   y: (iNode.y + jNode.y) / 2,
  //   z: (iNode.z + jNode.z) / 2,
  //   normalCos: iPoint.normalCos,
  //   normalSin: iPoint.normalSin,
  // }
  // let bottomFlange = [{ x: BP[0].x, y: -250 }, { x: BP[0].x, y: 250 }, { x: BP[1].x, y: 250 }, { x: BP[1].x, y: -250 }]
  // let bottomFlangeBolt = [{ startPoint: { x: BP[0].x + 40, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 1, size: 37, t: 14, l: 54 },
  // { startPoint: { x: BP[1].x - 40, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 1, size: 37, t: 14, l: 54 },
  // { startPoint: { x: BP[1].x - 172, y: 150 }, P: 100, G: 140, pNum: 4, gNum: 6, size: 37, t: 14, l: 54 },
  // { startPoint: { x: BP[0].x + 172, y: 150 }, P: 100, G: -140, pNum: 4, gNum: 6, size: 37, t: 14, l: 54 }]

  // result["bottom1"] = {
  //   points: [{ x: BP[0].x, y: -250 }, { x: BP[0].x, y: 250 }, { x: BP[0].x + 80, y: 250 }, { x: BP[0].x + 80, y: -250 }],
  //   point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: [], bolt: bottomFlangeBolt
  // }
  // result["bottom2"] = {
  //   points: [{ x: BP[1].x, y: -250 }, { x: BP[1].x, y: 250 }, { x: BP[1].x - 80, y: 250 }, { x: BP[1].x - 80, y: -250 }],
  //   point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
  // }
  // result["bottom3"] = {
  //   points: [{ x: BP[0].x + 132, y: -250 }, { x: BP[0].x + 132, y: 250 }, { x: BP[1].x - 132, y: 250 }, { x: BP[1].x - 132, y: -250 }],
  //   point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
  // }
  // result["bottom4"] = {
  //   points: bottomFlange,
  //   point: centerPoint, Thickness: 20, z: -20 - 14, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
  // }
  // result["bottom2"]={points:[{x:-200, y:-250},{x:-200, y:250},{x:-40, y:250},{x:-40, y:-250}],
  //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
  // result["bottom3"]={points:[{x:40, y:-250},{x:40, y:250},{x:200, y:250},{x:200, y:-250}],
  //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}

  return result
}

export function IbeamJoint(webPoints, centerPoint, xs, wBolt, fBolt) {
  // webPoint는 반드시 좌측하단을 시작으로 시계반대방향순이어야함
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
  // 볼트 배치에 대한 인풋고려필요

  // let wBolt = {
  //   P:90,
  //   G:75,
  //   pNum:5,
  //   gNum:2,
  //   size:37,
  //   t:14,
  // }
  // let fBolt = {
  //   P:170,
  //   G:75,
  //   pNum:2,
  //   gNum:3,
  //   size:37,
  //   t:14,
  // }


  let result = {}
  const rotationY = (centerPoint.skew - 90) * Math.PI / 180
  let uGradient = (webPoints[3].y - webPoints[2].y) / (webPoints[3].x - webPoints[2].x);
  let lGradient = (webPoints[1].y - webPoints[0].y) / (webPoints[1].x - webPoints[0].x);
  let uRad = -Math.atan(uGradient)
  let lRad = -Math.atan(lGradient)

  /////////////////////////////////// to the Joint function //////////////////////////////////////////
  let origin1 = { x: (webPoints[0].x + webPoints[3].x) / 2, y: (webPoints[0].y + webPoints[3].y) / 2 }
  let origin2 = { x: (webPoints[1].x + webPoints[2].x) / 2, y: (webPoints[1].y + webPoints[2].y) / 2 }
  let webPoint1 = ToGlobalPoint(centerPoint, origin1)
  let webPoint2 = ToGlobalPoint(centerPoint, origin2)
  let WebBolt = [{ startPoint: { x: xs.webJointWidth / 2 - 40, y: xs.webJointHeight / 2 - 40 }, P: wBolt.P, G: wBolt.G, pNum: wBolt.pNum, gNum: wBolt.gNum, size: wBolt.size, t: wBolt.t, l: xs.webJointThickness * 2 + xs.webThickness },
  { startPoint: { x: -(xs.webJointWidth / 2 - 40), y: xs.webJointHeight / 2 - 40 }, P: wBolt.P, G: -wBolt.G, pNum: wBolt.pNum, gNum: wBolt.gNum, size: wBolt.size, t: wBolt.t, l: xs.webJointThickness * 2 + xs.webThickness }]
  let webJoint1 = [{ x: - xs.webJointWidth / 2, y: - xs.webJointHeight / 2 },
  { x: xs.webJointWidth / 2, y: - xs.webJointHeight / 2 },
  { x: xs.webJointWidth / 2, y: xs.webJointHeight / 2 },
  { x: - xs.webJointWidth / 2, y: xs.webJointHeight / 2 }];
  let webJoint2D1 = TranslatePoints(origin1, webJoint1)
  result["webJoint1"] = hPlateGen(webJoint1, webPoint1, xs.webJointThickness, xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY, webJoint2D1)
  result["webJoint1"]["bolt"] = WebBolt
  result["webJoint2"] = hPlateGen(webJoint1, webPoint1, xs.webJointThickness, - xs.webJointThickness - xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY)
  let webJoint2D3 = TranslatePoints(origin2, webJoint1)
  result["webJoint3"] = hPlateGen(webJoint1, webPoint2, xs.webJointThickness, xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY, webJoint2D3)
  result["webJoint3"]["bolt"] = WebBolt
  result["webJoint4"] = hPlateGen(webJoint1, webPoint2, xs.webJointThickness, - xs.webJointThickness - xs.webThickness / 2, centerPoint.skew, Math.PI / 2, rotationY)

  // flange Joint
  let joint2D = [{ x: - xs.flangeJointLength / 2, y: 0 }, { x: xs.flangeJointLength / 2, y: 0 },
  { x: xs.flangeJointLength / 2, y: xs.flangeJointThickness }, { x: - xs.flangeJointLength / 2, y: xs.flangeJointThickness }]
  let joint1 = [{ x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
  { x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 }]
  let joint2 = [{ x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 + xs.flangeJointWidth },
  { x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 + xs.flangeJointWidth }]
  let joint3 = [{ x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 - xs.flangeJointWidth },
  { x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 - xs.flangeJointWidth }]

  let flangeBolt = [{ startPoint: { x: joint1[2].x - 40, y: joint1[2].y - 40 }, P: fBolt.P, G: fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness },
  { startPoint: { x: joint1[3].x + 40, y: joint1[2].y - 40 }, P: fBolt.P, G: -fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness }]

  let uPoint1 = ToGlobalPoint(centerPoint, webPoints[3])
  let uPoint2 = ToGlobalPoint(centerPoint, webPoints[2])

  result["upperJoint1"] = hPlateGen(joint1, uPoint1, xs.flangeJointThickness, xs.flangeThickness, centerPoint.skew, 0, uRad,
    TranslatePoints(webPoints[3], joint2D, xs.flangeThickness, -uRad), true);
  result["upperJoint1"].bolt = flangeBolt
  result["upperJoint2"] = hPlateGen(joint2, uPoint1, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad,
    TranslatePoints(webPoints[3], joint2D, - xs.flangeJointThickness, -uRad));
  result["upperJoint3"] = hPlateGen(joint3, uPoint1, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad);
  result["upperJoint11"] = hPlateGen(joint1, uPoint2, xs.flangeJointThickness, xs.flangeThickness, centerPoint.skew, 0, uRad,
    TranslatePoints(webPoints[2], joint2D, xs.flangeThickness, -uRad), true);
  result["upperJoint11"].bolt = flangeBolt
  result["upperJoint22"] = hPlateGen(joint2, uPoint2, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad,
    TranslatePoints(webPoints[2], joint2D, - xs.flangeJointThickness, -uRad));
  result["upperJoint33"] = hPlateGen(joint3, uPoint2, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad);

  let lPoint1 = ToGlobalPoint(centerPoint, webPoints[0])
  let lPoint2 = ToGlobalPoint(centerPoint, webPoints[1])

  result["lowerJoint1"] = hPlateGen(joint1, lPoint1, xs.flangeJointThickness, - xs.flangeThickness - xs.flangeJointThickness, centerPoint.skew, 0, lRad,
    TranslatePoints(webPoints[0], joint2D, - xs.flangeThickness - xs.flangeJointThickness, -lRad));
  result["lowerJoint2"] = hPlateGen(joint2, lPoint1, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
  result["lowerJoint2"].bolt = flangeBolt
  result["lowerJoint3"] = hPlateGen(joint3, lPoint1, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad,
    TranslatePoints(webPoints[0], joint2D, 0, -lRad));
  result["lowerJoint11"] = hPlateGen(joint1, lPoint2, xs.flangeJointThickness, -xs.flangeThickness - xs.flangeJointThickness, centerPoint.skew, 0, lRad,
    TranslatePoints(webPoints[1], joint2D, - xs.flangeThickness - xs.flangeJointThickness, -lRad));
  result["lowerJoint22"] = hPlateGen(joint2, lPoint2, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
  result["lowerJoint22"].bolt = flangeBolt
  result["lowerJoint33"] = hPlateGen(joint3, lPoint2, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad,
    TranslatePoints(webPoints[1], joint2D, 0, -lRad));
  /////////////////////////////////// to the function //////////////////////////////////////////
  return result
}

export function TranslatePoints(origin, points, yoffset, radian) {
  let result = [];
  let yoff = yoffset ? yoffset : 0
  if (radian) {
    let cos = Math.cos(radian)
    let sin = Math.sin(radian)
    points.forEach(pt => result.push({ x: origin.x + cos * pt.x - sin * (pt.y + yoff), y: origin.y + sin * pt.x + cos * (pt.y + yoff) }))
  } else {
    points.forEach(pt => result.push({ x: origin.x + pt.x, y: origin.y + (pt.y + yoff) }))
  }

  return result
}