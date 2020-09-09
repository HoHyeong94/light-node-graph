import {ConvexBufferGeometry} from './convex/ConvexGeometry'
import * as THREE from "three";
import { PointLength } from './geometryFunc';

// import {Main} from './mainFunction'

export function LineView(linepoints, initPoint){
    var group = new THREE.Group();
    var geometry = new THREE.Geometry();
    const xInit = initPoint.x
    const yInit = initPoint.y
    const zInit = initPoint.z
    for (let i = 0; i<linepoints.length;i++){
        geometry.vertices.push( 
        new THREE.Vector3	(linepoints[i].x - xInit,linepoints[i].y - yInit,	linepoints[i].z - zInit));
    }
    var line = new THREE.Line(
        geometry, new THREE.LineBasicMaterial( {color: 0xffff00} )
    );
    group.add(line);
    return group
}

export function GirderFrameView(gridPoint,stationDictList,nameToPointDict,xbeamData,initPoint){
    var group = new THREE.Group();
    const xInit = initPoint.x
    const yInit = initPoint.y
    const zInit = initPoint.z
    for (let j = 0; j<gridPoint.length;j++){
      for (let i=0; i<gridPoint[j].length;i++){
        for (let k=0;k<gridPoint[j][i].length - 1;k++){
          let sStation = gridPoint[j][i][k]
          let eStation = gridPoint[j][i][k+1]
          let spts = nameToPointDict[stationDictList[j][i][sStation]];
          let epts = nameToPointDict[stationDictList[j][i][eStation]];
          var newgeometry = new THREE.Geometry();
          newgeometry.vertices.push(new THREE.Vector3	(spts.x - xInit,	spts.y - yInit,	spts.z - zInit));
          newgeometry.vertices.push(new THREE.Vector3	(epts.x - xInit,	epts.y - yInit,	epts.z - zInit));
          group.add(new THREE.Line(newgeometry, new THREE.LineBasicMaterial({ color: 0x0000ff })));
        }
      }
    }
    for (let i = 0; i<xbeamData.length; i++){
      let spts = nameToPointDict[xbeamData[i].iNode];
      let epts = nameToPointDict[xbeamData[i].jNode];
      var newgeometry = new THREE.Geometry();
      newgeometry.vertices.push(new THREE.Vector3	(spts.x - xInit,	spts.y - yInit,	spts.z - zInit));
      newgeometry.vertices.push(new THREE.Vector3	(epts.x - xInit,	epts.y - yInit,	epts.z - zInit));
      group.add(new THREE.Line(newgeometry, new THREE.LineBasicMaterial({ color: 0xff00ff })));
    }
    return group
}

export function DiaView(nameToPointDict, diaDict,initPoint){
    var group = new THREE.Group();
    // var meshMaterial = new THREE.MeshLambertMaterial( {
    //     color: 0x00ffff,
    //     emissive: 0x44aaaa,
    //     opacity: 1,
    //     side:THREE.DoubleSide,
    //     transparent: false,
    //     wireframe : false
    //   } );
    var meshMaterial = new THREE.MeshNormalMaterial()
    for (let diakey in diaDict){
       let point = nameToPointDict[diakey]
       for (let partkey in diaDict[diakey]){
       let shapeNode = diaDict[diakey][partkey].points
       let Thickness = diaDict[diakey][partkey].Thickness
       let zPosition = diaDict[diakey][partkey].z
       let rotationY = diaDict[diakey][partkey].rotationY
       let rotationX = diaDict[diakey][partkey].rotationX
       let hole = diaDict[diakey][partkey].hole
       group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
        }
    }
    return group
}

export function XbeamView(diaDict,initPoint){
    var group = new THREE.Group();
    // var meshMaterial = new THREE.MeshLambertMaterial( {
    //     color: 0x00ffff,
    //     emissive: 0x44aaaa,
    //     opacity: 1,
    //     side:THREE.DoubleSide,
    //     transparent: false,
    //     wireframe : false
    //   } );
    var meshMaterial = new THREE.MeshNormalMaterial()
    meshMaterial.side = THREE.DoubleSide
    for (let diakey in diaDict){
    //    let point = nameToPointDict[diakey]
       for (let partkey in diaDict[diakey]){
       let shapeNode = diaDict[diakey][partkey].points
       let Thickness = diaDict[diakey][partkey].Thickness
       let zPosition = diaDict[diakey][partkey].z
       let rotationY = diaDict[diakey][partkey].rotationY
       let rotationX = diaDict[diakey][partkey].rotationX
       let hole = diaDict[diakey][partkey].hole
       let point = diaDict[diakey][partkey].point
       group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
        }
    }
    return group
}

export function boltView(spliceDict,initPoint){
    var group = new THREE.Group();
    // var meshMaterial = new THREE.MeshNormalMaterial()
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        emissive: 0x000000,
        opacity: 1,
        side:THREE.DoubleSide,
        transparent: false,
        wireframe : false
    } );
    for (let key in spliceDict){
    //    let point = nameToPointDict[diakey]

       for (let partkey in spliceDict[key]){
            let Thickness = spliceDict[key][partkey].Thickness
            let zPosition = spliceDict[key][partkey].z
            let rotationY = spliceDict[key][partkey].rotationY+Math.PI/2
            let rotationX = spliceDict[key][partkey].rotationX
            let point = spliceDict[key][partkey].point
            if (spliceDict[key][partkey].bolt){
                let bolt = spliceDict[key][partkey].bolt
                for (let k in bolt){
                    for (let i = 0;i<bolt[k].gNum;i++){
                        for (let j=0;j<bolt[k].pNum;j++){
                            let xtranslate = bolt[k].startPoint.x - i*bolt[k].G
                            let ytranslate= bolt[k].startPoint.y - j*bolt[k].P
                            group.add(boltMesh(point, bolt[k], zPosition+Thickness, rotationX, rotationY,[xtranslate,ytranslate], initPoint, meshMaterial))
                        }
                    }
                }
            }
        }
    }
    return group
}

export function boltMesh(point, bolt, zPosition, rotationX, rotationY, XYtranslate,initPoint, meshMaterial){
    var radius = bolt.size/2
    var geometry = new THREE.CylinderBufferGeometry(radius,radius,bolt.t*2+bolt.l,6,1)
    var mesh = new THREE.Mesh(geometry, meshMaterial);
    var rad = Math.atan( - point.normalCos/point.normalSin) + Math.PI/2  //+ 
    mesh.rotation.set(rotationX,rotationY,Math.PI/2); //(rotationY - 90)*Math.PI/180
    mesh.rotateOnWorldAxis(new THREE.Vector3(0,0,1),rad);
    mesh.position.set(point.x - initPoint.x, point.y- initPoint.y, point.z- initPoint.z)
    mesh.translateY(zPosition-bolt.l/2)
    mesh.translateX(XYtranslate[1])
    mesh.translateZ(XYtranslate[0])
    return mesh
}







export function HBracingPlateView(nameToPointDict, hBraicngPlateDict, initPoint){
    var group = new THREE.Group();
    // var meshMaterial = new THREE.MeshLambertMaterial( {
    //     color: 0x00ffff,
    //     emissive: 0x44aaaa,
    //     opacity: 1,
    //     side:THREE.DoubleSide,
    //     transparent: false,
    //     wireframe : false
    //   } );
    var meshMaterial = new THREE.MeshNormalMaterial()
    for (let pk in hBraicngPlateDict){
       let point = nameToPointDict[pk]
       for (let partkey in hBraicngPlateDict[pk]){
       let shapeNode = hBraicngPlateDict[pk][partkey].points
       let Thickness = hBraicngPlateDict[pk][partkey].Thickness
       let zPosition = hBraicngPlateDict[pk][partkey].z
       let rotationY = hBraicngPlateDict[pk][partkey].rotationY
       let rotationX = hBraicngPlateDict[pk][partkey].rotationX
       let hole = hBraicngPlateDict[pk][partkey].hole
       group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
        }
    }
    return group
}



export function HBracingView(hBracingDict,initPoint){
    var group = new THREE.Group();
    // var meshMaterial = new THREE.MeshLambertMaterial( {
    //     color: 0x00ffff,
    //     emissive: 0x44aaaa,
    //     opacity: 1,
    //     side:THREE.DoubleSide,
    //     transparent: false,
    //     wireframe : false
    //   } );
    var meshMaterial = new THREE.MeshNormalMaterial()
    for (let i in hBracingDict){
       group.add(convexMesh(hBracingDict[i].points[0],initPoint,meshMaterial))
       group.add(convexMesh(hBracingDict[i].points[1],initPoint,meshMaterial))
    }
    return group
}

export function SteelBoxView(steelBoxDict,initPoint){
    let group = new THREE.Group();
    // var meshMaterial = new THREE.MeshLambertMaterial( {
    //     color: 0x00ff00,
    //     emissive: 0x44aa44,
    //     opacity: 1,
    //     side:THREE.DoubleSide,
    //     transparent: false,
    //     wireframe : false
    //   } );
    let meshMaterial = new THREE.MeshNormalMaterial()
        meshMaterial.side = THREE.DoubleSide
    let pk1 = ""
    let pk2 = ""
    for (let key in steelBoxDict){
        
        steelBoxDict[key]["points"].forEach(function(plist){
            if(plist.length>0){
            let geometry = new THREE.Geometry();
            for (let i = 0; i< plist.length;i++){
                geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
            }
        
            for (let i = 0; i< plist.length/4 -1;i++){
                for (let j= 0; j<4;j++){
                    let k = j+1 === 4? 0: j+1
                    geometry.faces.push(new THREE.Face3(i*4+j,i*4+k,(i+1)*4+j));
                    geometry.faces.push(new THREE.Face3(i*4+k,(i+1)*4+k,(i+1)*4+j));
                }
                if (i===0){
                    geometry.faces.push(new THREE.Face3(0,1,2));
                    geometry.faces.push(new THREE.Face3(0,2,3));
                }else if(i===(plist.length/4 -2)){
                    geometry.faces.push(new THREE.Face3((i+1)*4,(i+1)*4+1,(i+1)*4+2));
                    geometry.faces.push(new THREE.Face3((i+1)*4,(i+1)*4+2,(i+1)*4+3));
                }
            }
            
            geometry.computeFaceNormals();
            group.add( new THREE.Mesh(geometry,meshMaterial) );
            }
        })
    }
    return group
}

export function plateMesh2(point1, point2, plist1, plist2, initPoint, meshMaterial){
    let plist = [];
    let geometry = new THREE.Geometry();
    plist1.forEach(element => plist.push(ToGlobalPoint(point1, element)))
    plist2.forEach(element => plist.push(ToGlobalPoint(point2, element))) 
    for (let i in plist){
        geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
    }
    let j = plist.length/2
    for (let i = 0; i<j;i++){
        let k = i+1===j?0:i+1
        geometry.faces.push(new THREE.Face3(k,i,i+j));
        geometry.faces.push(new THREE.Face3(k,i+j,k+j));
    }
    geometry.computeFaceNormals();
    return new THREE.Mesh(geometry,meshMaterial)
}

export function SteelBoxGirder(gridPoint, stationDictList,sectionPointDict,nameToPointDict,initPoint){
    var group = new THREE.Group();
    // var meshMaterial = new THREE.MeshLambertMaterial( {
    //     color: 0x00ff00,
    //     emissive: 0x44aa44,
    //     opacity: 1,
    //     side:THREE.DoubleSide,
    //     transparent: false,
    //     wireframe : false
    //   } );
    var meshMaterial = new THREE.MeshNormalMaterial()
      meshMaterial.side = THREE.DoubleSide
    let pk1 = ""
    let pk2 = ""
    for (let i = 0; i < gridPoint.length;i++){
        for (let j = 0; j < gridPoint[i].length;j++){
        for (let k = 0; k < gridPoint[i][j].length -1;k++){
            pk1 = stationDictList[i][j][gridPoint[i][j][k]]
            pk2  = stationDictList[i][j][gridPoint[i][j][k+1]]
            let point1 = nameToPointDict[pk1];
            let point2 = nameToPointDict[pk2];
            let plist1
            let plist2

            // let plist1 = sectionPointDict[pk1].forward.bottomPlate;
            // let plist2 = sectionPointDict[pk2].backward.bottomPlate;
            // group.add( plateMesh2(point1, point2,plist1, plist2,initPoint, meshMaterial) );

            plist1 = sectionPointDict[pk1].forward.lWeb;
            plist2 = sectionPointDict[pk2].backward.lWeb
            if(pk1.substring(2) ==="K1"){
                group.add( plateMeshHole(point1, point2,plist1, plist2,initPoint, meshMaterial) );
            }else{
                group.add( plateMesh2(point1, point2,plist1, plist2,initPoint, meshMaterial) );
            }
            
            plist1 = sectionPointDict[pk1].forward.rWeb;
            plist2 = sectionPointDict[pk2].backward.rWeb
            if(pk1.substring(2) ==="K1"){
            group.add( plateMeshHole(point1, point2,plist1, plist2,initPoint, meshMaterial) );
            }else{
            group.add( plateMesh2(point1, point2,plist1, plist2,initPoint, meshMaterial) );
            }

            // plist1 = sectionPointDict[pk1].forward.rightTopPlate;
            // plist2 = sectionPointDict[pk2].backward.rightTopPlate
            // group.add( plateMesh2(point1, point2,plist1, plist2,initPoint, meshMaterial) );

            // plist1 = sectionPointDict[pk1].forward.leftTopPlate;
            // plist2 = sectionPointDict[pk2].backward.leftTopPlate
            // group.add( plateMesh2(point1, point2,plist1, plist2,initPoint, meshMaterial) );
            }
        }
    }
    return group
}



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

export function ToGlobalPoint2(Point, node2D){
    let newPoint = {
        x:0, y:0, z:0
    }
    const cos = - Point.normalCos;
    const sin = - Point.normalSin;
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
    
    return newPoint
}
// export function plateMesh(point1, point2, plist1, plist2, initPoint, meshMaterial){
//     let plist = [];
//     for (let i = 0; i< plist1.length;i++){ plist.push(ToGlobalPoint(point1, plist1[i])) }
//     for (let i = 0; i< plist2.length;i++){ plist.push(ToGlobalPoint(point2, plist2[i])) }
    
//     // let pts = [];
//     // for (let i = 0; i<p.length;i++){
//     //     pts.push(new THREE.Vector3	(p[i].x - initPoint.x, p[i].y - initPoint.y, p[i].z - initPoint.z))
//     // }
//     // var meshGeometry = new ConvexBufferGeometry( pts );
//     return convexMesh(plist,initPoint,meshMaterial);
// }

export function convexMesh(plist,initPoint,meshMaterial){
    let pts = [];
    for (let i = 0; i<plist.length;i++){
        pts.push(new THREE.Vector3	(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
    }
    var meshGeometry = new ConvexBufferGeometry( pts );
    return new THREE.Mesh( meshGeometry, meshMaterial );
}
function DividingPoint(point1, point2, length){
    //length is distance from point1 to new point in directing point2
    let a = length / Math.sqrt((point1.x- point2.x)**2+(point1.y- point2.y)**2+(point1.z- point2.z)**2)
    return {x:(1-a)*point1.x + a * point2.x, y:(1-a)*point1.y + a * point2.y,z:(1-a)*point1.z + a * point2.z}
}

export function plateMeshHole(point1, point2, plist1, plist2, initPoint, meshMaterial){
    let plist = [];
    const hole = {bottomOffset:300,height:1100,depth:250,filletR:150}
    let geometry = new THREE.Geometry();
    
    plist1.forEach(element => plist.push(ToGlobalPoint(point1, element)))
    plist2.forEach(element => plist.push(ToGlobalPoint(point2, element))) 
    let point8 = DividingPoint(plist[0],plist[1],hole.bottomOffset)
    let point9 = DividingPoint(plist[0],plist[1],hole.bottomOffset+hole.height)
    let point10 = DividingPoint(plist[3],plist[2],hole.bottomOffset+hole.height)
    let point11 = DividingPoint(plist[3],plist[2],hole.bottomOffset)
    let point12 = DividingPoint(plist[0],plist[4],hole.depth)
    let point13 = DividingPoint(plist[1],plist[5],hole.depth)
    let point14 = DividingPoint(plist[2],plist[6],hole.depth)
    let point15 = DividingPoint(plist[3],plist[7],hole.depth)
    let point16 = DividingPoint(point12,point13,hole.bottomOffset)
    let point17 = DividingPoint(point12,point13,hole.bottomOffset+hole.height)
    let point18 = DividingPoint(point15,point14,hole.bottomOffset+hole.height)
    let point19 = DividingPoint(point15,point14,hole.bottomOffset)
    plist.push(point8);
    plist.push(point9);
    plist.push(point10);
    plist.push(point11);
    plist.push(point12);
    plist.push(point13);
    plist.push(point14);
    plist.push(point15);
    plist.push(point16);
    plist.push(point17);
    plist.push(point18);
    plist.push(point19);
    
    // let plist3 = [0,plist1[1],plist1[2],3];
    // let plist4 = [0new ,plist1[1].new,plist1[2].new,3new];

    // let plist5 = [plist1[0],1,2,plist1[3]];
    // let plist6 = [plist1[0]new,1new,2new,plist1[3]new];

    // let plist7 = [plist1[0]new,plist1[1]new,plist1[2]new,plist1[3]new;
    // let plist8 = plist2;

    for (let i in plist){
        geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
    }
    let smoothness = 7
    fillet3D(geometry.vertices[8],geometry.vertices[16],geometry.vertices[17],hole.filletR,smoothness).forEach(element => geometry.vertices.push(element))
    fillet3D(geometry.vertices[16],geometry.vertices[17],geometry.vertices[9],hole.filletR,smoothness).forEach(element => geometry.vertices.push(element))
    fillet3D(geometry.vertices[11],geometry.vertices[19],geometry.vertices[18],hole.filletR,smoothness).forEach(element => geometry.vertices.push(element))
    fillet3D(geometry.vertices[19],geometry.vertices[18],geometry.vertices[10],hole.filletR,smoothness).forEach(element => geometry.vertices.push(element))
    for (let i = 0; i<smoothness+1;i++){
        geometry.faces.push(new THREE.Face3(16,20+i,21+i))
        geometry.faces.push(new THREE.Face3(17,20+i+smoothness+2,21+i+smoothness+2))
        geometry.faces.push(new THREE.Face3(19,20+i+(smoothness+2)*2,21+i+(smoothness+2)*2))
        geometry.faces.push(new THREE.Face3(18,20+i+(smoothness+2)*3,21+i+(smoothness+2)*3))
        geometry.faces.push(new THREE.Face3(20+i,21+i,21+i+(smoothness+2)*2))
        geometry.faces.push(new THREE.Face3(20+i,20+i+(smoothness+2)*2,21+i+(smoothness+2)*2))
        geometry.faces.push(new THREE.Face3(20+i+(smoothness+2),21+i+(smoothness+2),21+i+(smoothness+2)*3))
        geometry.faces.push(new THREE.Face3(20+i+(smoothness+2),20+i+(smoothness+2)*3,21+i+(smoothness+2)*3))
    }

    geometry.faces.push(new THREE.Face3(0,8,16));
    geometry.faces.push(new THREE.Face3(0,16,12));
    geometry.faces.push(new THREE.Face3(9,1,13));
    geometry.faces.push(new THREE.Face3(9,13,17));
    geometry.faces.push(new THREE.Face3(12,13,5));
    geometry.faces.push(new THREE.Face3(12,5,4));
    geometry.faces.push(new THREE.Face3(2,10,18));
    geometry.faces.push(new THREE.Face3(2,18,14));
    geometry.faces.push(new THREE.Face3(11,3,15));
    geometry.faces.push(new THREE.Face3(11,15,19));
    geometry.faces.push(new THREE.Face3(14,15,7));
    geometry.faces.push(new THREE.Face3(14,7,6));
    geometry.faces.push(new THREE.Face3(1,2,10));
    geometry.faces.push(new THREE.Face3(1,10,9));
    geometry.faces.push(new THREE.Face3(9,10,18));
    geometry.faces.push(new THREE.Face3(9,18,17));
    geometry.faces.push(new THREE.Face3(17,18,19));
    geometry.faces.push(new THREE.Face3(17,19,16));
    geometry.faces.push(new THREE.Face3(17,18,19));
    geometry.faces.push(new THREE.Face3(8,11,19));
    geometry.faces.push(new THREE.Face3(8,19,16));
    geometry.faces.push(new THREE.Face3(8,11,3));
    geometry.faces.push(new THREE.Face3(8,3,0));

    geometry.computeFaceNormals();
    return new THREE.Mesh(geometry,meshMaterial)
}

function fillet3D(point1, point2, point3, radius, smoothness) {
    let points = [point1, point2, point3]
    let newPoints = [];
    let v1 = new THREE.Vector3();
    let v2 = new THREE.Vector3();
    let v3 = new THREE.Vector3();
    let vc1 = new THREE.Vector3();
    let vc2 = new THREE.Vector3();
    let center = new THREE.Vector3();
    let ang
    let l1
  
       ////console.log(points[i].x);
      v1.subVectors(point1, point2).normalize();
      v2.subVectors(point3, point2).normalize();
      ang = Math.acos(v1.dot(v2))
      l1 = radius / Math.sin(ang / 2)
      v3.addVectors(v1, v2).setLength(l1);
      center.addVectors(point2, v3);
      let p1 = new THREE.Vector3().addVectors(point2, v1.multiplyScalar(radius / Math.tan(ang / 2)))
      let p2 = new THREE.Vector3().addVectors(point2, v2.multiplyScalar(radius / Math.tan(ang / 2)))
      vc1.subVectors(p1, center);
      vc2.subVectors(p2, center);
  
      newPoints.push(p1)
      for (let j = 0; j < smoothness; j++) {
        let dirVec = new THREE.Vector3().addVectors(vc1.clone().multiplyScalar(smoothness - j), vc2.clone().multiplyScalar(j + 1)).setLength(radius);
        newPoints.push(new THREE.Vector3().addVectors(center, dirVec));
      }
      newPoints.push(p2)
    //let line2 = new THREE.Line(newGeometry,line.material);
    //scene.add(line2)
    return newPoints;
  }

export function diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial){
    var shape = new THREE.Shape();
    var shapeNodeVectors = []
    for (let i = 0; i<shapeNode.length;i++){
        shapeNodeVectors.push(new THREE.Vector2( shapeNode[i].x,shapeNode[i].y))
    }
    shape.setFromPoints(shapeNodeVectors)
    if (hole.length > 0){
        var holeVectors = []
        for (let i = 0; i<hole.length;i++){
            holeVectors.push(new THREE.Vector2( hole[i].x, hole[i].y))
        }
        var holeShape = new THREE.Shape();
        holeShape.setFromPoints(holeVectors)
        shape.holes.push(holeShape)
    }

    var geometry = new THREE.ExtrudeBufferGeometry(shape,{depth: Thickness, steps: 1,bevelEnabled: false});
    var mesh = new THREE.Mesh(geometry, meshMaterial);
    var rad = Math.atan( - point.normalCos/point.normalSin) + Math.PI/2  //+ 
    
    mesh.rotation.set(rotationX,rotationY,0); //(rotationY - 90)*Math.PI/180
    mesh.rotateOnWorldAxis(new THREE.Vector3(0,0,1),rad);
    mesh.position.set(point.x - initPoint.x, point.y- initPoint.y, point.z- initPoint.z)
    mesh.translateZ(zPosition)
    return mesh
}



export function hPlateMesh(point, shapeNode, Thickness, zPosition, gradientX, gradientY,  initPoint, meshMaterial){
    var shape = new THREE.Shape();
    var shapeNodeVectors = []
    for (let i = 0; i<shapeNode.length;i++){
        shapeNodeVectors.push(new THREE.Vector2( shapeNode[i].x,shapeNode[i].y))
    }
    shape.setFromPoints(shapeNodeVectors)
    var geometry = new THREE.ExtrudeBufferGeometry(shape,{depth: Thickness, steps: 1,bevelEnabled: false});
    var mesh = new THREE.Mesh(geometry, meshMaterial);
    var rad = Math.atan( - point.normalCos/point.normalSin) + Math.PI/2
    mesh.rotation.set(0,Math.atan(gradientY),0);
    mesh.rotateOnWorldAxis(new THREE.Vector3(0,0,1),rad);
    mesh.position.set(point.x - initPoint.x, point.y- initPoint.y, point.z- initPoint.z)
    mesh.translateZ(zPosition)

    return mesh
}

