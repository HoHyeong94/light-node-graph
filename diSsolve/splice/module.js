import { ToGlobalPoint } from "../geometryModule"
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
 