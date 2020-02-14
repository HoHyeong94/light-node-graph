import {ConvexBufferGeometry} from './convex/ConvexGeometry'
import { THREE } from "global";

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
    //return group
    return geometry;
}

export function GirderFrameView(gridPoint,stationDictList,nameToPointDict,xbeamData,initPoint){
    let mergedGeo = new THREE.Geometry();
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
          mergedGeo.mergeMesh(new THREE.Line(newgeometry, new THREE.LineBasicMaterial({ color: 0x0000ff })))
          //mergedGeo.merge()
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
      mergedGeo.mergeMesh(new THREE.Line(newgeometry, new THREE.LineBasicMaterial({ color: 0xff00ff })))
    }
    //return group
    // mergedGeo.mergeMesh(group)
    return mergedGeo
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

export function XbeamView(nameToPointDict, diaDict,initPoint){
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



export function HBracingView(hBracingList,initPoint){
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
    for (let i = 0; i<hBracingList.length;i++){
       for (let j = 0; j<hBracingList[i].pointlist.length;j++){
       group.add(convexMesh(hBracingList[i].pointlist[j],initPoint,meshMaterial))
        }
    }
    return group
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
    let pk1 = ""
    let pk2 = ""
    for (let i = 0; i < gridPoint.length;i++){
        for (let j = 0; j < gridPoint[i].length;j++){
        for (let k = 0; k < gridPoint[i][j].length -1;k++){
            pk1 = stationDictList[i][j][gridPoint[i][j][k]]
            pk2  = stationDictList[i][j][gridPoint[i][j][k+1]]
            let point1 = nameToPointDict[pk1];
            let point2 = nameToPointDict[pk2];

            let plist1 = sectionPointDict[pk1].forward.bottomPlate;
            let plist2 = sectionPointDict[pk2].backward.bottomPlate;
            group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

            plist1 = sectionPointDict[pk1].forward.lWeb;
            plist2 = sectionPointDict[pk2].backward.lWeb
            group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

            plist1 = sectionPointDict[pk1].forward.rWeb;
            plist2 = sectionPointDict[pk2].backward.rWeb
            group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

            plist1 = sectionPointDict[pk1].forward.rightTopPlate;
            plist2 = sectionPointDict[pk2].backward.rightTopPlate
            group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

            plist1 = sectionPointDict[pk1].forward.leftTopPlate;
            plist2 = sectionPointDict[pk2].backward.leftTopPlate
            group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );
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
    
    return newPoint
}
export function plateMesh(point1, point2, plist1, plist2, initPoint, meshMaterial){
    let plist = [];
    for (let i = 0; i< plist1.length;i++){ plist.push(ToGlobalPoint(point1, plist1[i])) }
    for (let i = 0; i< plist2.length;i++){ plist.push(ToGlobalPoint(point2, plist2[i])) }
    // let pts = [];
    // for (let i = 0; i<p.length;i++){
    //     pts.push(new THREE.Vector3	(p[i].x - initPoint.x, p[i].y - initPoint.y, p[i].z - initPoint.z))
    // }
    // var meshGeometry = new ConvexBufferGeometry( pts );
    return convexMesh(plist,initPoint,meshMaterial);
}

export function convexMesh(plist,initPoint,meshMaterial){
    let pts = [];
    for (let i = 0; i<plist.length;i++){
        pts.push(new THREE.Vector3	(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
    }
    var meshGeometry = new ConvexBufferGeometry( pts );
    return new THREE.Mesh( meshGeometry, meshMaterial );
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

