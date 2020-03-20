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
    var colorCode = color ? color : 0xffff00
    var line = new THREE.Line(
        geometry, new THREE.LineBasicMaterial({ color: colorCode })
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
            let shapeNode = hBraicngPlateDict[pk][partkey].points
            let Thickness = hBraicngPlateDict[pk][partkey].Thickness
            let zPosition = hBraicngPlateDict[pk][partkey].z
            let rotationY = hBraicngPlateDict[pk][partkey].rotationY
            let rotationX = hBraicngPlateDict[pk][partkey].rotationX
            let hole = hBraicngPlateDict[pk][partkey].hole
            let point = diaDict[diakey].point ? diaDict[diakey].point : diaDict[diakey][partkey].point
            group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
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
        side: THREE.DoubleSide,
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
            let k = j < pNum-1? j:0;
            geometry.faces.push(new THREE.Face3(i * pNum + k, i * pNum + k + 1, (i + 1) * pNum + k));
            geometry.faces.push(new THREE.Face3(i * pNum + k + 1, (i + 1) * pNum + k, (i + 1) * pNum + k + 1));
        }
    }
    geometry.computeFaceNormals();
    group.add(new THREE.Mesh(geometry, meshMaterial));

    return group
}
