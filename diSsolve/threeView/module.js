import { THREE } from "global";

export function LineView(linepoints, initPoint, color) {
    var group = new THREE.Group();
    var geometry = new THREE.Geometry();
    const xInit = initPoint.x
    const yInit = initPoint.y
    const zInit = initPoint.z
    for (let i = 0; i < linepoints.length; i++) {
        geometry.vertices.push(
            new THREE.Vector3(linepoints[i].x - xInit, linepoints[i].y - yInit, linepoints[i].z - zInit));
    }
    var colorCode = color ? color : 0xffff00  //  : 
    var line = new THREE.Line(
        geometry, new THREE.LineBasicMaterial({ color: parseInt(colorCode,16) })
    );
    group.add(line);
    return group
}

export function SteelBoxView(steelBoxDict, initPoint) {
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
    for (let key in steelBoxDict) {

        steelBoxDict[key]["points"].forEach(function (plist) {
            if (plist.length > 0) {
                let geometry = new THREE.Geometry();
                for (let i = 0; i < plist.length; i++) {
                    geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
                }

                for (let i = 0; i < plist.length / 4 - 1; i++) {
                    for (let j = 0; j < 4; j++) {
                        let k = j + 1 === 4 ? 0 : j + 1
                        geometry.faces.push(new THREE.Face3(i * 4 + j, i * 4 + k, (i + 1) * 4 + j));
                        geometry.faces.push(new THREE.Face3(i * 4 + k, (i + 1) * 4 + k, (i + 1) * 4 + j));
                    }
                    if (i === 0) {
                        geometry.faces.push(new THREE.Face3(0, 1, 2));
                        geometry.faces.push(new THREE.Face3(0, 2, 3));
                    } else if (i === (plist.length / 4 - 2)) {
                        geometry.faces.push(new THREE.Face3((i + 1) * 4, (i + 1) * 4 + 1, (i + 1) * 4 + 2));
                        geometry.faces.push(new THREE.Face3((i + 1) * 4, (i + 1) * 4 + 2, (i + 1) * 4 + 3));
                    }
                }

                geometry.computeFaceNormals();
                group.add(new THREE.Mesh(geometry, meshMaterial));
            }
        })
    }
    return group
}

export function DiaView(diaDict, initPoint) {
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
    for (let diakey in diaDict) {
        for (let partkey in diaDict[diakey]) {
            let shapeNode = diaDict[diakey][partkey].points
            let Thickness = diaDict[diakey][partkey].Thickness
            let zPosition = diaDict[diakey][partkey].z
            let rotationY = diaDict[diakey][partkey].rotationY
            let rotationX = diaDict[diakey][partkey].rotationX
            let hole = diaDict[diakey][partkey].hole
            let point = diaDict[diakey].point ? diaDict[diakey].point : diaDict[diakey][partkey].point
            if (partkey !== "point") {
                group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
            }
        }
    }
    return group
}

export function diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial) {
    var shape = new THREE.Shape();
    var shapeNodeVectors = []
    for (let i = 0; i < shapeNode.length; i++) {
        shapeNodeVectors.push(new THREE.Vector2(shapeNode[i].x, shapeNode[i].y))
    }
    shape.setFromPoints(shapeNodeVectors)
    if (hole.length > 0) {
        var holeVectors = []
        for (let i = 0; i < hole.length; i++) {
            holeVectors.push(new THREE.Vector2(hole[i].x, hole[i].y))
        }
        var holeShape = new THREE.Shape();
        holeShape.setFromPoints(holeVectors)
        shape.holes.push(holeShape)
    }

    var geometry = new THREE.ExtrudeBufferGeometry(shape, { depth: Thickness, steps: 1, bevelEnabled: false });
    var mesh = new THREE.Mesh(geometry, meshMaterial);
    var rad = Math.atan(- point.normalCos / point.normalSin) + Math.PI / 2  //+ 

    mesh.rotation.set(rotationX, rotationY, 0); //(rotationY - 90)*Math.PI/180
    mesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), rad);
    mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
    mesh.translateZ(zPosition)
    return mesh
}

export function HBracingPlateView(hBraicngPlateDict, initPoint) {
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
    for (let pk in hBraicngPlateDict) {
        //    let point = pointDict[pk]
        for (let partkey in hBraicngPlateDict[pk]) {
            if (partkey!=="point"){
                let shapeNode = hBraicngPlateDict[pk][partkey].points
                let Thickness = hBraicngPlateDict[pk][partkey].Thickness
                let zPosition = hBraicngPlateDict[pk][partkey].z
                let rotationY = hBraicngPlateDict[pk][partkey].rotationY
                let rotationX = hBraicngPlateDict[pk][partkey].rotationX
                let hole = hBraicngPlateDict[pk][partkey].hole
                let point = hBraicngPlateDict[pk].point ? hBraicngPlateDict[pk].point : hBraicngPlateDict[pk][partkey].point
                group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
            }
        }
    }
    return group
}

export function HBracingView(hBracingDict, initPoint) {
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
    for (let i in hBracingDict) {
        group.add(convexMesh(hBracingDict[i].points[0], initPoint, meshMaterial))
        group.add(convexMesh(hBracingDict[i].points[1], initPoint, meshMaterial))
    }
    return group
}

export function convexMesh(plist, initPoint, meshMaterial) {
    let geometry = new THREE.Geometry();
    for (let i in plist) {
        geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
    }
    let j = plist.length / 2
    for (let i = 0; i < j; i++) {
        let k = i + 1 === j ? 0 : i + 1
        geometry.faces.push(new THREE.Face3(k, i, i + j));
        geometry.faces.push(new THREE.Face3(k, i + j, k + j));
    }
    geometry.computeFaceNormals();
    return new THREE.Mesh(geometry, meshMaterial)
}

export function DeckPointView(deckPointDict, initPoint, opacity) {
    let group = new THREE.Group();
    var meshMaterial = new THREE.MeshLambertMaterial({
        color: 0x000000,
        emissive: 0x777777,
        opacity: opacity,
        // side: THREE.DoubleSide,
        transparent: true,
        wireframe: false
    });
    // let meshMaterial = new THREE.MeshNormalMaterial()
    //     meshMaterial.side = THREE.DoubleSide
    let pNum = deckPointDict[0].slabUpperPoints.length + deckPointDict[0].slabLowerPoints.length
    let geometry = new THREE.Geometry();
    for (let key in deckPointDict) {
        deckPointDict[key].slabUpperPoints.forEach(function (Point) {
            geometry.vertices.push(new THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z))
        })
        deckPointDict[key].slabLowerPoints.reverse().forEach(function (Point) {
            geometry.vertices.push(new THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z))
        })
    }
    for (let i = 0; i < deckPointDict.length - 1; i++) {
        for (let j = 0; j < pNum; j++) {
            let k = j === pNum-1? 0: j+1;
            geometry.faces.push(new THREE.Face3(i * pNum + j, i * pNum + k, (i + 1) * pNum + j));
            geometry.faces.push(new THREE.Face3(i * pNum + k, (i + 1) * pNum + k, (i + 1) * pNum + j));
        }
        if (i===0){
            geometry.faces.push(new THREE.Face3(i * pNum, (i + 1) * pNum - 1, i * pNum + 1));
            geometry.faces.push(new THREE.Face3(i * pNum + 1, i * pNum + 3, i * pNum + 2));
            for (let j = 1; j < pNum -3;j++){
                geometry.faces.push(new THREE.Face3((i+1) * pNum - j, (i + 1) * pNum - j -1, i * pNum + 1));
            }
        } else if (i === deckPointDict.length -2){
            geometry.faces.push(new THREE.Face3((i+1) * pNum, (i+1) * pNum + 1, (i + 2) * pNum - 1, ));
            geometry.faces.push(new THREE.Face3((i+1) * pNum + 1, (i+1) * pNum + 2 , (i+1) * pNum + 3 ));
            for (let j = 1; j < pNum -3;j++){
                geometry.faces.push(new THREE.Face3((i+2) * pNum - j, (i+1) * pNum + 1, (i + 2) * pNum - j -1 ));
            }
        }
    }
    geometry.computeFaceNormals();
    group.add(new THREE.Mesh(geometry, meshMaterial));

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

    // let bolt0 = { startPoint: { x: 800, y: 150 }, P: 100, G: 100, pNum: 4, gNum: 17, size: 37, t: 14, l: 54 }
    // var radius = bolt0.size/2
    // var geometry = new THREE.CylinderBufferGeometry(radius,radius,bolt0.t*2+bolt0.l,6,1)
    // let dummyList = [];
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
                            // dummyList.push(instancedBoltMesh(point, bolt[k], zPosition+Thickness, rotationX, rotationY,[xtranslate,ytranslate], initPoint))
                        }
                    }
                }
            }
        }
    }
    // console.log("dummyList",dummyList)
    // let mesh = new THREE.InstancedMesh(geometry, meshMaterial,dummyList.length)
    // mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
    // for (let i in dummyList){
    //     mesh.setMatrixAt(i,dummyList[i].matrix)
    // }
    // mesh.instanceMatrix.needsUpdate = true;
    // group.add(mesh)
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

export function instancedBoltMesh(point, bolt, zPosition, rotationX, rotationY, XYtranslate,initPoint){
    var dummy = new THREE.Object3D();
    var rad = Math.atan( - point.normalCos/point.normalSin) + Math.PI/2  //+ 
    dummy.rotation.set(rotationX,rotationY,Math.PI/2); //(rotationY - 90)*Math.PI/180
    dummy.rotateOnWorldAxis(new THREE.Vector3(0,0,1),rad);
    dummy.position.set(point.x - initPoint.x, point.y- initPoint.y, point.z- initPoint.z)
    dummy.translateY(zPosition-bolt.l/2)
    dummy.translateX(XYtranslate[1])
    dummy.translateZ(XYtranslate[0])
    dummy.updateMatrix();
    return dummy
}

export function StudMeshView(studList, initPoint){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        emissive: 0x000000,
        opacity: 1,
        side:THREE.DoubleSide,
        transparent: false,
        wireframe : false
    } );
    for (let i in studList){
        var geometry = new THREE.CylinderBufferGeometry(studList[i].stud.dia/2,studList[i].stud.dia/2,studList[i].stud.height,8,1)
        let rotationX = Math.atan(studList[i].gradientX)
        let rotationY = Math.atan(studList[i].gradientY)
        for (let j in studList[i].points){
            var mesh = new THREE.Mesh(geometry, meshMaterial)
            mesh.rotation.set(rotationX, rotationY,0)
            mesh.position.set(point.x - initPoint.x, point.y- initPoint.y, point.z- initPoint.z)
            group.add(mesh)
        }
    }
    return group
}

export function BarrierPointView(deckSection,initPoint,opacity){
    let group = new THREE.Group();
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x000000,
        emissive: 0x777777,
        opacity: opacity,
        // side:THREE.DoubleSide,
        transparent: true,
        wireframe : false
      } );
    // let meshMaterial = new THREE.MeshNormalMaterial()
    //     meshMaterial.side = THREE.DoubleSide
    
    let pNum = deckSection[0].points.length
    let geometry = new THREE.Geometry();
    for (let key in deckSection){
        deckSection[key].points.forEach(function(Point){
                geometry.vertices.push(new THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z))
        })
    }
    
    for (let i =0;i<deckSection.length -1 ;i++ ){
        for (let j = 0;j<pNum-1;j++){
            geometry.faces.push(new THREE.Face3(i*pNum+j,(i+1)*pNum+j,i*pNum+j+1));
            geometry.faces.push(new THREE.Face3(i*pNum+j+1,(i+1)*pNum+j,(i+1)*pNum+j+1));
        }
        if (i ===0){
            for (let j=1;j<pNum-1;j++){
               geometry.faces.push(new THREE.Face3(i, i + j, i + j +1));
            }
        }else if (i === deckSection.length -2){
            for (let j=1;j<pNum-1;j++){
                geometry.faces.push(new THREE.Face3((i + 1)*pNum, (i + 1)*pNum + j + 1, (i + 1)*pNum + j));
             }
        }
    }
    geometry.computeFaceNormals();
    group.add( new THREE.Mesh(geometry,meshMaterial) );
    return group
}