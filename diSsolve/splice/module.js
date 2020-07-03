import { ToGlobalPoint } from "../geometryModule"
import { vPlateGen, hPlateGen, hPlateGen2 } from "../stiffner/module"

export function SplicePlate(iPoint, iSectionPoint) {
    let result = {}
    let iNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[0])
    let jNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[1])
    let centerPoint = {
      x: (iNode.x + jNode.x) / 2,
      y: (iNode.y + jNode.y) / 2,
      z: (iNode.z + jNode.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
    }
    let Web = [{ x: -900, y: -250 }, { x: -900, y: 250 }, { x: 900, y: 250 }, { x: 900, y: -250 }]
    let WebBolt = [{ startPoint: { x: 800, y: 150 }, P: 100, G: 100, pNum: 4, gNum: 17, size: 37, t: 14, l: 54 },]
    let lWebAngle = Math.PI - Math.atan((iSectionPoint.lWeb[1].y - iSectionPoint.lWeb[0].y) / (iSectionPoint.lWeb[1].x - iSectionPoint.lWeb[0].x))
    let rWebAngle = Math.PI - Math.atan((iSectionPoint.rWeb[1].y - iSectionPoint.rWeb[0].y) / (iSectionPoint.rWeb[1].x - iSectionPoint.rWeb[0].x))
    result["lWeb"] = {
      points: Web, point: centerPoint,
      Thickness: 20, z: 14, rotationX: 0, rotationY: lWebAngle, hole: [], bolt: WebBolt
    }
    result["lWeb2"] = {
      points: Web, point: centerPoint,
      Thickness: 20, z: -20, rotationX: 0, rotationY: lWebAngle, hole: []
    }
  
    iNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[0])
    jNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1])
    centerPoint = {
      x: (iNode.x + jNode.x) / 2,
      y: (iNode.y + jNode.y) / 2,
      z: (iNode.z + jNode.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
    }
    result["rWeb"] = {
      points: Web, point: centerPoint,
      Thickness: 20, z: 14, rotationX: 0, rotationY: rWebAngle, hole: [], bolt: WebBolt
    }
    result["rWeb2"] = {
      points: Web, point: centerPoint,
      Thickness: 20, z: -20, rotationX: 0, rotationY: rWebAngle, hole: []
    }
  
    iNode = ToGlobalPoint(iPoint, iSectionPoint.lWeb[1])
    centerPoint = {
      ...iNode,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
    }
    let TopFlange = [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }]
    let TopFlangeBolt = [{ startPoint: { x: 160, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 2, size: 37, t: 14, l: 54 },
    { startPoint: { x: -80, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 2, size: 37, t: 14, l: 54 }]
  
    result["lTop"] = { points: TopFlange, point: centerPoint, Thickness: 20, z: 14, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: [], bolt: TopFlangeBolt }
    result["lTop2"] = {
      points: [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: -40, y: 250 }, { x: -40, y: -250 }],
      point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
    }
    result["lTop3"] = {
      points: [{ x: 40, y: -250 }, { x: 40, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }],
      point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
    }
  
    iNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1])
    centerPoint = {
      ...iNode,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
    }
  
    result["rTop"] = { points: TopFlange, point: centerPoint, Thickness: 20, z: 14, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: [], bolt: TopFlangeBolt }
    result["rTop2"] = {
      points: [{ x: -200, y: -250 }, { x: -200, y: 250 }, { x: -40, y: 250 }, { x: -40, y: -250 }],
      point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
    }
    result["rTop3"] = {
      points: [{ x: 40, y: -250 }, { x: 40, y: 250 }, { x: 200, y: 250 }, { x: 200, y: -250 }],
      point: centerPoint, Thickness: 20, z: -20, rotationX: Math.atan(iPoint.gradientX), rotationY: Math.atan(-iPoint.gradientY), hole: []
    }
  
  
    let BP = iSectionPoint.bottomPlate
    iNode = ToGlobalPoint(iPoint, BP[0])
    jNode = ToGlobalPoint(iPoint, BP[1])
    centerPoint = {
      x: (iNode.x + jNode.x) / 2,
      y: (iNode.y + jNode.y) / 2,
      z: (iNode.z + jNode.z) / 2,
      normalCos: iPoint.normalCos,
      normalSin: iPoint.normalSin,
    }
    let bottomFlange = [{ x: BP[0].x, y: -250 }, { x: BP[0].x, y: 250 }, { x: BP[1].x, y: 250 }, { x: BP[1].x, y: -250 }]
    let bottomFlangeBolt = [{ startPoint: { x: BP[0].x + 40, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 1, size: 37, t: 14, l: 54 },
    { startPoint: { x: BP[1].x - 40, y: 150 }, P: 100, G: 80, pNum: 4, gNum: 1, size: 37, t: 14, l: 54 },
    { startPoint: { x: BP[1].x - 172, y: 150 }, P: 100, G: 140, pNum: 4, gNum: 6, size: 37, t: 14, l: 54 },
    { startPoint: { x: BP[0].x + 172, y: 150 }, P: 100, G: -140, pNum: 4, gNum: 6, size: 37, t: 14, l: 54 }]
  
    result["bottom1"] = {
      points: [{ x: BP[0].x, y: -250 }, { x: BP[0].x, y: 250 }, { x: BP[0].x + 80, y: 250 }, { x: BP[0].x + 80, y: -250 }],
      point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: [], bolt: bottomFlangeBolt
    }
    result["bottom2"] = {
      points: [{ x: BP[1].x, y: -250 }, { x: BP[1].x, y: 250 }, { x: BP[1].x - 80, y: 250 }, { x: BP[1].x - 80, y: -250 }],
      point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
    }
    result["bottom3"] = {
      points: [{ x: BP[0].x + 132, y: -250 }, { x: BP[0].x + 132, y: 250 }, { x: BP[1].x - 132, y: 250 }, { x: BP[1].x - 132, y: -250 }],
      point: centerPoint, Thickness: 20, z: 0, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
    }
    result["bottom4"] = {
      points: bottomFlange,
      point: centerPoint, Thickness: 20, z: -20 - 14, rotationX: Math.atan(iPoint.gradientX), rotationY: 0, hole: []
    }
    // result["bottom2"]={points:[{x:-200, y:-250},{x:-200, y:250},{x:-40, y:250},{x:-40, y:-250}],
    //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
    // result["bottom3"]={points:[{x:40, y:-250},{x:40, y:250},{x:200, y:250},{x:200, y:-250}],
    //   point:centerPoint,  Thickness:-20,z:0, rotationX:Math.atan(iPoint.gradientX), rotationY:Math.atan(-iPoint.gradientY),hole:[]}
  
    return result
  }
 
  export function IbeamJoint(webPoints, centerPoint,xs, wBolt, fBolt){
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
    let uGradient = (webPoints[3].y-webPoints[2].y)/(webPoints[3].x -webPoints[2].x);
    let lGradient = (webPoints[1].y-webPoints[0].y)/(webPoints[1].x -webPoints[0].x);
    let uRad = -Math.atan(uGradient)
    let lRad = -Math.atan(lGradient)

    /////////////////////////////////// to the Joint function //////////////////////////////////////////
  let origin1 = { x: (webPoints[0].x + webPoints[3].x) / 2, y: (webPoints[0].y +webPoints[3].y) / 2 }
  let origin2 = { x: (webPoints[1].x + webPoints[2].x) / 2, y: (webPoints[1].y +webPoints[2].y) / 2 }
  let webPoint1 = ToGlobalPoint(centerPoint, origin1)
  let webPoint2 = ToGlobalPoint(centerPoint, origin2)
  let WebBolt = [{ startPoint: { x: xs.webJointWidth / 2 - 40, y: xs.webJointHeight / 2 - 40 }, P: wBolt.P , G: wBolt.G, pNum: wBolt.pNum, gNum: wBolt.gNum, size: wBolt.size, t: wBolt.t, l: xs.webJointThickness * 2 + xs.webThickness },
  { startPoint: { x: -(xs.webJointWidth / 2 - 40), y: xs.webJointHeight / 2 - 40 }, P: wBolt.P, G: -wBolt.G, pNum: wBolt.pNum, gNum: wBolt.gNum, size: wBolt.size, t: wBolt.t, l: xs.webJointThickness * 2 + xs.webThickness }]
  let webJoint1 = [{ x: - xs.webJointWidth / 2, y: - xs.webJointHeight / 2 },
  { x: xs.webJointWidth / 2, y: - xs.webJointHeight / 2 },
  { x: xs.webJointWidth / 2, y: xs.webJointHeight / 2 },
  { x: - xs.webJointWidth / 2, y: xs.webJointHeight / 2 }];
  let webJoint2D1 = TranslatePoints(origin1, webJoint1)
  result["webJoint1"] = hPlateGen2(webJoint1, webPoint1, xs.webJointThickness, xs.webThickness / 2, centerPoint.skew, Math.PI / 2 , rotationY, webJoint2D1)
  result["webJoint1"]["bolt"] = WebBolt
  result["webJoint2"] = hPlateGen(webJoint1, webPoint1, xs.webJointThickness, - xs.webJointThickness - xs.webThickness / 2, centerPoint.skew, Math.PI / 2 , rotationY)
  let webJoint2D3 = TranslatePoints(origin2, webJoint1)
  result["webJoint3"] = hPlateGen2(webJoint1, webPoint2, xs.webJointThickness, xs.webThickness / 2, centerPoint.skew, Math.PI / 2 , rotationY, webJoint2D3)
  result["webJoint3"]["bolt"] = WebBolt
  result["webJoint4"] = hPlateGen(webJoint1, webPoint2, xs.webJointThickness, - xs.webJointThickness - xs.webThickness / 2, centerPoint.skew, Math.PI / 2 , rotationY)

  // flange Joint
  let joint2D = [{ x: - xs.flangeJointLength / 2, y: 0 }, { x: xs.flangeJointLength / 2, y: 0 },
                  { x: xs.flangeJointLength / 2, y: xs.flangeJointThickness },{ x: - xs.flangeJointLength / 2, y: xs.flangeJointThickness }]
  let joint1 = [{ x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
  { x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 }]
  let joint2 = [{ x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 +  xs.flangeJointWidth },
  { x: - xs.flangeJointLength / 2, y: - xs.flangeWidth / 2 + xs.flangeJointWidth }]
  let joint3 = [{ x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 },
  { x: xs.flangeJointLength / 2, y: xs.flangeWidth / 2 - xs.flangeJointWidth },
  { x: - xs.flangeJointLength / 2, y: xs.flangeWidth / 2 - xs.flangeJointWidth }]
  
  let flangeBolt = [{ startPoint: { x: joint1[2].x - 40, y: joint1[2].y - 40 }, P: fBolt.P, G: fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness },
  { startPoint: { x: joint1[3].x + 40, y: joint1[2].y - 40 }, P:  fBolt.P, G: -fBolt.G, pNum: fBolt.pNum, gNum: fBolt.gNum, size: fBolt.size, t: fBolt.t, l: xs.flangeJointThickness * 2 + xs.flangeThickness }]

  let uPoint1 = ToGlobalPoint(centerPoint, webPoints[3])
  let uPoint2 = ToGlobalPoint(centerPoint, webPoints[2])

  result["upperJoint1"] = hPlateGen2(joint1, uPoint1, xs.flangeJointThickness, xs.flangeThickness, centerPoint.skew, 0, uRad, TransLatePoints({x:webPoints[3].x,y:webPoints[3].y + xs.flangeThickness}, joint2D, uRad));
  result["upperJoint1"].bolt = flangeBolt
  result["upperJoint2"] = hPlateGen(joint2, uPoint1, xs.flangeJointThickness,  - xs.flangeJointThickness, centerPoint.skew, 0, uRad);
  result["upperJoint3"] = hPlateGen(joint3, uPoint1, xs.flangeJointThickness,  - xs.flangeJointThickness, centerPoint.skew, 0, uRad);
  result["upperJoint11"] = hPlateGen(joint1, uPoint2, xs.flangeJointThickness, xs.flangeThickness, centerPoint.skew, 0, uRad);
  result["upperJoint11"].bolt = flangeBolt
  result["upperJoint22"] = hPlateGen(joint2, uPoint2, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad);
  result["upperJoint33"] = hPlateGen(joint3, uPoint2, xs.flangeJointThickness, - xs.flangeJointThickness, centerPoint.skew, 0, uRad);

  let lPoint1 = ToGlobalPoint(centerPoint, webPoints[0])
  let lPoint2 = ToGlobalPoint(centerPoint, webPoints[1])

  result["lowerJoint1"] = hPlateGen(joint1, lPoint1, xs.flangeJointThickness, - xs.flangeThickness- xs.flangeJointThickness, centerPoint.skew, 0, lRad);
  result["lowerJoint2"] = hPlateGen(joint2, lPoint1, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
  result["lowerJoint2"].bolt = flangeBolt
  result["lowerJoint3"] = hPlateGen(joint3, lPoint1, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
  result["lowerJoint11"] = hPlateGen(joint1, lPoint2, xs.flangeJointThickness, -xs.flangeThickness - xs.flangeJointThickness, centerPoint.skew, 0, lRad);
  result["lowerJoint22"] = hPlateGen(joint2, lPoint2, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
  result["lowerJoint22"].bolt = flangeBolt
  result["lowerJoint33"] = hPlateGen(joint3, lPoint2, xs.flangeJointThickness, 0, centerPoint.skew, 0, lRad);
/////////////////////////////////// to the function //////////////////////////////////////////
    return result
}

export function TranslatePoints(origin, points, radian){
  let result = [];
    if(radian){
      let cos = Math.cos(radian)
      let sin = Math.sin(radian)
      points.forEach(pt => result.push({x : origin.x + cos*pt.x - sin*pt.y, y:origin.y + sin*pt.x + cos*pt.y}))
    }else{
      points.forEach(pt => result.push({x : origin.x + pt.x, y:origin.y + pt.y}))
    }
  return result
}