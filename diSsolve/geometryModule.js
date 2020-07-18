import { THREE } from "global";

export function ToGlobalPoint(Point, node2D){
    let newPoint = {
        x:0, y:0, z:0
    }
    const cos = Point.normalCos;
    const sin = Point.normalSin;
    let skewCot = 0;
    let skew = Point.skew? Point.skew : 90;
    if (Point.skew !=90){
        skewCot = - 1 / Math.tan(skew * Math.PI/180) 
    };
    let X = node2D.x
    let Y = X * skewCot; 
    let Z = node2D.y

    newPoint.x = Point.x + X * cos - Y*sin;
    newPoint.y = Point.y + X * sin + Y*cos;
    newPoint.z = Point.z + Z;
    newPoint.s = Point.masterStationNumber;
    newPoint.skew = skew;
    newPoint.normalCos = cos;
    newPoint.normalSin = sin;
    newPoint.girderStation = Point.girderStation;
    return newPoint
}

export function ToGlobalPoint2(Point, node2D){
  let newPoint = {
      x:0, y:0, z:0
  }
  let skew = Point.skew? Point.skew : 90;
  const cos = Point.normalCos;
  const sin = Point.normalSin;
  // let skewCot = 0;
  // if (Point.skew !=90){
  //     skewCot = - 1 / Math.tan(Point.skew * Math.PI/180) 
  // };
  let X = node2D.x
  let Y = node2D.y
  let Z = 0

  newPoint.x = Point.x + X * cos - Y*sin 
  newPoint.y = Point.y + X * sin + Y*cos
  newPoint.z = Point.z + Z
  newPoint.s = Point.masterStationNumber
  newPoint.skew = skew;
  newPoint.normalCos = cos;
  newPoint.normalSin = sin;
  newPoint.girderStation = Point.girderStation + Y;
  
  return newPoint
}



export function WebPoint(point1, point2, tan1, H){
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

export function PlateRestPoint(point1, point2, tan1, tan2, thickness){
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
    let sign = a > 0 ? 1 : -1;
    let alpha = thickness * Math.sqrt(1 + 1/a**2);
    x3 = tan1 === null? point1.x:(-a * alpha + b + tan1 * point1.x - point1.y) / (tan1 - a)
    x4 = tan2 === null? point2.x:(-a * alpha + b + tan2 * point2.x - point2.y) / (tan2 - a);
    y3 = a ===0? point1.y + thickness : a * (x3 - alpha) + b 
    y4 = a ===0? point2.y + thickness : a * (x4 - alpha) + b
  }
  return [point1,point2,{x:x4,y:y4},{x:x3,y:y3}]
}

export function Kframe(node1, node2, ioffset, joffset, pts){
  let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2)
  let vec = Vector(node1, node2)
  let plate1 = [ XYOffset(node1,vec,ioffset,pts[0]),
                XYOffset(node1,vec,ioffset,pts[1]),
                XYOffset(node1,vec,(length-joffset),pts[1]),
                XYOffset(node1,vec,(length-joffset),pts[0]), ]
  let plate2 = [ XYOffset(node1,vec,ioffset,pts[2]),
                XYOffset(node1,vec,ioffset,pts[3]),
                XYOffset(node1,vec,(length-joffset),pts[3]),
                XYOffset(node1,vec,(length-joffset),pts[2]),]
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

export function scallop(point1,point2,point3,radius,smoothness){
  let points = [];
  let v1 = new THREE.Vector2(point1.x - point2.x, point1.y - point2.y).normalize();
  let v2 = new THREE.Vector2(point3.x - point2.x, point3.y - point2.y).normalize();
  for (let i = 0; i < smoothness+1 ; i++){
    let v3 = new THREE.Vector2().addVectors(v1.clone().multiplyScalar(smoothness - i), v2.clone().multiplyScalar(i)).setLength(radius);
    points.push({x: v3.x + point2.x, y: v3.y +point2.y});
  }
  return points
}

export function DividingPoint(point1, point2, length){
  //length is distance from point1 to new point in directing point2
  let result = {};
  if (point1.z && point2.z){
    let a = length / Math.sqrt((point1.x- point2.x)**2+(point1.y- point2.y)**2+(point1.z- point2.z)**2);
    result = {x:(1-a)*point1.x + a * point2.x, y:(1-a)*point1.y + a * point2.y,z:(1-a)*point1.z + a * point2.z};
  } else {
    let a = length / Math.sqrt((point1.x- point2.x)**2+(point1.y- point2.y)**2);
    result = {x:(1-a)*point1.x + a * point2.x, y:(1-a)*point1.y + a * point2.y, z : 0 };
  }
  
  return result
}

export function Fillet2D(point1, point2, point3, radius, smoothness){
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

export function PlateSize(points,index,thickness){
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

export function PlateSize2(points,index,thickness,width){
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

export function PointLength(point1,point2){
  return Math.sqrt((point1.x-point2.x)**2 + (point1.y-point2.y)**2)
}

export function ZOffsetLine(points, z) {
  let result = [];
  let vec = [];
  let cos = [];
  let err = 0.001;
  for (let i = 0; i < points.length - 1; i++) {
    let l = Math.sqrt((points[i].x - points[i + 1].x) ** 2 + (points[i].y - points[i + 1].y) ** 2 + (points[i].z - points[i + 1].z) ** 2);
    vec.push({ x: (points[i + 1].x - points[i].x) / l, y: (points[i + 1].y - points[i].y) / l, z: (points[i + 1].z - points[i].z) / l })
    cos.push(Math.sqrt((points[i].x - points[i + 1].x) ** 2 + (points[i].y - points[i + 1].y) ** 2) / l)
  }
  if (cos[0] == 0) {
    result.push(ZMove(points[0], z));
  } else {
    result.push(ZMove(points[0], z / cos[0]));
  }
  for (let i = 0; i < vec.length - 1; i++) {
    let costheta = -vec[i + 1].x * vec[i].x - vec[i + 1].y * vec[i].y - vec[i + 1].z * vec[i].z
    if (costheta >= 1 - err || costheta <= -1 + err) {
      if (cos[i] == 0) {
        result.push(ZMove(points[i + 1], z));
      } else {
        result.push(ZMove(points[i + 1], z / cos[i]));
      }
    } else {
      if (costheta){
        let sinHalftheta = Math.sqrt((1 - costheta) / 2);
        let z2 = sinHalftheta === 0 ? z : z / sinHalftheta;
        let vecSum = { x: (vec[i + 1].x - vec[i].x), y: (vec[i + 1].y - vec[i].y), z: (vec[i + 1].z - vec[i].z) }
        let l2 = Math.sqrt(vecSum.x ** 2 + vecSum.y ** 2 + vecSum.z ** 2)
        result.push({ x: points[i + 1].x + vecSum.x / l2 * z2, y: points[i + 1].y + vecSum.y / l2 * z2, z: points[i + 1].z + vecSum.z / l2 * z2 });
      }
    }
  }

  result.push(ZMove(points[points.length - 1], z / cos[cos.length - 1]));
  return result
}

export function ZMove(point, z) {
  return { x: point.x, y: point.y, z: point.z + z }
}