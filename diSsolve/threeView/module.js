import { THREE } from "global";

export function LineView(linepoints, initPoint, color){
    var group = new THREE.Group();
    var geometry = new THREE.Geometry();
    const xInit = initPoint.x
    const yInit = initPoint.y
    const zInit = initPoint.z
    for (let i = 0; i<linepoints.length;i++){
        geometry.vertices.push( 
        new THREE.Vector3	(linepoints[i].x - xInit,linepoints[i].y - yInit,	linepoints[i].z - zInit));
    }
    var colorCode = color? color:0xffff00
    var line = new THREE.Line(
        geometry, new THREE.LineBasicMaterial( {color: colorCode} )
    );
    group.add(line);
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