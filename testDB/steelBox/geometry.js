export function ToGlobalPoint(Point, node2D){
    let newPoint = {
        x:0, y:0, z:0
    }
    const cos = - Point.normalCos;
    const sin = - Point.normalSin;
    let skewCot = 0;
    if (Point.skew !=90){
        skewCot = - 1 / Math.tan(Point.skew * Math.PI/180) 
    };
    let X = node2D.x
    let Y = X * skewCot; 
    let Z = node2D.y

    newPoint.x = Point.x + X * cos - Y*sin 
    newPoint.y = Point.y + X * sin + Y*cos
    newPoint.z = Point.z + Z
    newPoint.s = Point.masterStationNumber
    
    return newPoint
}