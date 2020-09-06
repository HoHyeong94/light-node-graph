import { THREE, SpriteText } from "global";
// import { analysisOutput } from "../DB/module"

export function AnalysisModel(node, frame) {
    let modelGroup = new THREE.Group();
    let selfweightGroup = new THREE.Group();
    let slabweightGroup = new THREE.Group();
    let barrierGroup = new THREE.Group();
    let pavementGroup = new THREE.Group();
    let laneGroup = new THREE.Group();



    let layer = 2; //frame Layer
    let material = new THREE.PointsMaterial({ color: 0xff0000, size: 300 });
    let geometry = new THREE.Geometry(); // 추후에 bufferGeometry로 변경요망
    let initPoint = node.node.data[0].coord
    let greenLine = new THREE.LineBasicMaterial({ color: 0x00ff00 })
    let aquaLine = new THREE.LineBasicMaterial({ color: 0x00ffff })
    let yellowLine = new THREE.LineBasicMaterial({ color: 0xffff00 })
    let circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let redDotLine = new THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 300, gapSize: 100, });
    let redLine = new THREE.LineBasicMaterial({ color: 0xff0000 })
    let elemDict = {};
    for (let i in node.node.data) {
        let pt = new THREE.Vector3(
            node.node.data[i].coord[0] - initPoint[0],
            node.node.data[i].coord[1] - initPoint[1],
            node.node.data[i].coord[2] - initPoint[2])
        geometry.vertices.push(pt)
        let text = new SpriteText(node.node.data[i].nodeNum, 150);
        text.position.set(pt.x, pt.y, pt.z)
        text.layers.set(layer);
        text.backgroundColor = "red"
        modelGroup.add(text)
    }

    for (let i in node.rigid.data) {
        let mNum = node.rigid.data[i].master - 1
        for (let j in node.rigid.data[i].slave) {
            let sNum = node.rigid.data[i].slave[j] - 1
            let geo = new THREE.Geometry();
            geo.vertices.push(geometry.vertices[mNum], geometry.vertices[sNum])
            modelGroup.add(new THREE.Line(geo, aquaLine));
        }
    }

    for (let i in frame.frame.data) {
        let geo = new THREE.Geometry();
        let iNum = frame.frame.data[i].iNode - 1
        let jNum = frame.frame.data[i].jNode - 1
        elemDict[frame.frame.data[i].number] = [iNum, jNum]
        geo.vertices.push(geometry.vertices[iNum], geometry.vertices[jNum])
        modelGroup.add(new THREE.Line(geo, greenLine));

        let text = new SpriteText(frame.frame.data[i].number, 150, "red");
        text.position.set(
            (geometry.vertices[iNum].x + geometry.vertices[jNum].x) / 2,
            (geometry.vertices[iNum].y + geometry.vertices[jNum].y) / 2,
            (geometry.vertices[iNum].z + geometry.vertices[jNum].z) / 2)
        text.layers.set(layer);
        modelGroup.add(text)
    }


    // group.add(new THREE.Points(geometry, material));
    for (let i in frame.selfWeight.data) {
        let geo = new THREE.Geometry();
        let ivec = geometry.vertices[elemDict[frame.selfWeight.data[i].elem][0]]
        let jvec = geometry.vertices[elemDict[frame.selfWeight.data[i].elem][1]]
        let izload = frame.selfWeight.data[i].Uzp[0] * 0.2
        let jzload = frame.selfWeight.data[i].Uzp[1] * 0.2
        geo.vertices.push(ivec,
            new THREE.Vector3(ivec.x, ivec.y, ivec.z + izload),
            new THREE.Vector3(jvec.x, jvec.y, jvec.z + jzload),
            jvec)
        selfweightGroup.add(new THREE.Line(geo, aquaLine));
    }

    for (let i in frame.slabWeight.data) {
        let geo = new THREE.Geometry();
        let ivec = geometry.vertices[elemDict[frame.slabWeight.data[i].elem][0]]
        let jvec = geometry.vertices[elemDict[frame.slabWeight.data[i].elem][1]]
        let a = frame.slabWeight.data[i].RD[0]
        let b = frame.slabWeight.data[i].RD[1]
        let nivec = new THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a)
        let njvec = new THREE.Vector3(ivec.x * (1 - b) + jvec.x * b, ivec.y * (1 - b) + jvec.y * b, ivec.z * (1 - b) + jvec.z * b)
        let izload = -1 * frame.slabWeight.data[i].Uzp[0] * 10
        let jzload = -1 * frame.slabWeight.data[i].Uzp[1] * 10
        geo.vertices.push(nivec,
            new THREE.Vector3(nivec.x, nivec.y, nivec.z + izload),
            new THREE.Vector3(njvec.x, njvec.y, njvec.z + jzload),
            njvec)
        slabweightGroup.add(new THREE.Line(geo, aquaLine));
    }

    for (let i in frame.barrier.data) {
        let geo = new THREE.Geometry();
        let ivec = geometry.vertices[elemDict[frame.barrier.data[i].elem][0]]
        let jvec = geometry.vertices[elemDict[frame.barrier.data[i].elem][1]]
        let a = frame.barrier.data[i].RD
        let nivec = new THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a)
        let izload = -1 * frame.barrier.data[i].Uz / 10
        geo.vertices.push(nivec,
            new THREE.Vector3(nivec.x, nivec.y, nivec.z + izload))
        barrierGroup.add(new THREE.Line(geo, aquaLine));
    }

    for (let i in frame.pavement.data) {
        let geo = new THREE.Geometry();
        let ivec = geometry.vertices[elemDict[frame.pavement.data[i].elem][0]]
        let jvec = geometry.vertices[elemDict[frame.pavement.data[i].elem][1]]
        let a = frame.pavement.data[i].RD[0]
        let b = frame.pavement.data[i].RD[1]
        let nivec = new THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a)
        let njvec = new THREE.Vector3(ivec.x * (1 - b) + jvec.x * b, ivec.y * (1 - b) + jvec.y * b, ivec.z * (1 - b) + jvec.z * b)
        let izload = -1 * frame.pavement.data[i].Uzp[0] * 10
        let jzload = -1 * frame.pavement.data[i].Uzp[1] * 10
        geo.vertices.push(nivec,
            new THREE.Vector3(nivec.x, nivec.y, nivec.z + izload),
            new THREE.Vector3(njvec.x, njvec.y, njvec.z + jzload),
            njvec)
        pavementGroup.add(new THREE.Line(geo, aquaLine));
    }

    for (let i in frame.laneList) {
        let geo = new THREE.Geometry();
        for (let j in frame.laneList[i]) {
            let loadData = frame[frame.laneList[i][j]].data[0]
            let ivec = geometry.vertices[elemDict[loadData.elem][0]]
            let jvec = geometry.vertices[elemDict[loadData.elem][1]]
            let a = loadData.RD
            let nivec = new THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a)
            geo.vertices.push(nivec)
        }
        let line = new THREE.Line(geo, redDotLine)
        line.computeLineDistances();
        laneGroup.add(line);
    }



    let arrow = 200;
    for (let i in node.boundary.data) {
        // let arrow = new THREE.Group();
        let nodeNum = node.boundary.data[i].nodeNum - 1
        let vec = geometry.vertices[nodeNum]
        let localData = node.local.data.find(function (elem) { return elem.nodeNum === node.boundary.data[i].nodeNum })
        let geo = new THREE.Geometry();
        if (node.boundary.data[i].DOF[0] === false) {
            geo.vertices.push(
                new THREE.Vector3(-1000, 0, 0),
                new THREE.Vector3(1000, 0, 0),
                new THREE.Vector3(-1000, 0, 0),
                new THREE.Vector3(-1000 + arrow, arrow, 0),
                new THREE.Vector3(-1000, 0, 0),
                new THREE.Vector3(-1000 + arrow, -arrow, 0),
                new THREE.Vector3(1000, 0, 0),
                new THREE.Vector3(1000 - arrow, arrow, 0),
                new THREE.Vector3(1000, 0, 0),
                new THREE.Vector3(1000 - arrow, -arrow, 0),
            )
        }
        if (node.boundary.data[i].DOF[1] === false) {
            geo.vertices.push(
                new THREE.Vector3(0, -1000, 0),
                new THREE.Vector3(0, 1000, 0),
                new THREE.Vector3(0, -1000, 0),
                new THREE.Vector3(arrow, -1000 + arrow, 0),
                new THREE.Vector3(0, -1000, 0),
                new THREE.Vector3(-arrow, -1000 + arrow, 0),
                new THREE.Vector3(0, 1000, 0),
                new THREE.Vector3(arrow, 1000 - arrow, 0),
                new THREE.Vector3(0, 1000, 0),
                new THREE.Vector3(-arrow, 1000 - arrow, 0),
            )
        }
        if (node.boundary.data[i].DOF[0] && node.boundary.data[i].DOF[1]) {
            let circle = new THREE.CircleGeometry(arrow, 16);
            circle.translate(vec.x, vec.y, vec.z)
            modelGroup.add(new THREE.Mesh(circle, circleMaterial));
        }
        geo.rotateZ(localData.ANG * Math.PI / 180)
        geo.translate(vec.x, vec.y, vec.z)
        modelGroup.add(new THREE.LineSegments(geo, yellowLine));

        // group.add(arrow)
    }

    return { AnalysisModel: modelGroup, LCselfweight: selfweightGroup, LCslabweight: slabweightGroup, LCbarrier: barrierGroup, LCpavement: pavementGroup }
}

export function AnalysisResult(node, frame, output, loadCase, forceNum) {
    let group = new THREE.Group();
    let geometry = new THREE.Geometry(); // 추후에 bufferGeometry로 변경요망
    let initPoint = node.node.data[0].coord
    let greenLine = new THREE.LineBasicMaterial({ color: 0x00ff00 })
    let aquaLine = new THREE.LineBasicMaterial({ color: 0x00ffff })
    let yellowLine = new THREE.LineBasicMaterial({ color: 0xffff00 })
    let circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let redDotLine = new THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 300, gapSize: 100, });
    let redLine = new THREE.LineBasicMaterial({ color: 0xff0000 })
    let elemDict = {};
    let analysisOutput = { "force": [] }
    if (output) {
        analysisOutput = output;
    }

    // console.log("analysisOutput", analysisOutput["force"], loadCase, forceNum)
    for (let i in node.node.data) {
        let pt = new THREE.Vector3(
            node.node.data[i].coord[0] - initPoint[0],
            node.node.data[i].coord[1] - initPoint[1],
            node.node.data[i].coord[2] - initPoint[2])
        geometry.vertices.push(pt)
    }

    for (let i in frame.frame.data) {
        let iNum = frame.frame.data[i].iNode - 1
        let jNum = frame.frame.data[i].jNode - 1
        elemDict[frame.frame.data[i].number] = [iNum, jNum]
    }


    // 해석결과 보기 함수
    // test //
    let maxValue = null;
    let minValue = null;

    for (let elemNum in analysisOutput["force"]) {
        for (let seg in analysisOutput["force"][elemNum]) {
            let newValue = analysisOutput["force"][elemNum][seg][loadCase][forceNum]
            if (!maxValue || newValue > maxValue) {
                maxValue = newValue
            }
            if (!minValue || newValue < minValue) {
                minValue = newValue
            }
        }
    }
    let scaler = 5000 / Math.max(Math.abs(maxValue), Math.abs(minValue))
    for (let elemNum in analysisOutput["force"]) {
        let ivec = geometry.vertices[elemDict[elemNum][0]]
        let jvec = geometry.vertices[elemDict[elemNum][1]]
        let geo = new THREE.Geometry();
        for (let seg in analysisOutput["force"][elemNum]) {
            let a = seg * 1;
            let nivec = new THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a)
            let izload = analysisOutput["force"][elemNum][seg][loadCase][forceNum] * scaler
            if (seg === "0.00000") {
                geo.vertices.push(new THREE.Vector3(nivec.x, nivec.y, nivec.z))
            }
            geo.vertices.push(new THREE.Vector3(nivec.x, nivec.y, nivec.z + izload))
            if (seg === "1.00000") {
                geo.vertices.push(new THREE.Vector3(nivec.x, nivec.y, nivec.z))
            }
            group.add(new THREE.Line(geo, redLine));
        }
    }

    // let influenceElem = "16"

    // for (let i in frame.laneList) {
    //     let geo = new THREE.Geometry();
    //     let geo2 = new THREE.Geometry();
    //     for (let j in frame.laneList[i]) {
    //         let loadData = frame[frame.laneList[i][j]].data[0]
    //         let ivec = geometry.vertices[elemDict[loadData.elem][0]]
    //         let jvec = geometry.vertices[elemDict[loadData.elem][1]]
    //         let a = loadData.RD
    //         let izload = analysisOutput.force[influenceElem]["0.00000"][frame.laneList[i][j]][5] * 1000000
    //         let nivec = new THREE.Vector3(ivec.x * (1 - a) + jvec.x * a, ivec.y * (1 - a) + jvec.y * a, ivec.z * (1 - a) + jvec.z * a)
    //         let nivec2 = new THREE.Vector3(nivec.x, nivec.y, nivec.z + izload)
    //         geo.vertices.push(nivec2)
    //         geo2.vertices.push(nivec, nivec2)
    //     }
    //     group.add(new THREE.Line(geo, yellowLine));
    //     group.add(new THREE.LineSegments(geo2, yellowLine));
    // }
    // delete analysisOutput.disp
    // for (let elem in analysisOutput.force) {
    //     if (!frame.girderElemList.includes(elem * 1)) {
    //         delete analysisOutput.force[elem]
    //     }
    // }

    // console.log("newSapOutput", analysisOutput)
    return group
}

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
        geometry, new THREE.LineBasicMaterial({ color: parseInt(colorCode, 16) })
    );
    group.add(line);
    return group
}

export function LineMesh(linepoints, initPoint, color) {
    let geometry = new THREE.Geometry();
    const xInit = initPoint.x
    const yInit = initPoint.y
    const zInit = initPoint.z
    for (let i = 0; i < linepoints.length; i++) {
        geometry.vertices.push(
            new THREE.Vector3(linepoints[i].x - xInit, linepoints[i].y - yInit, linepoints[i].z - zInit));
    }
    let colorCode = color ? color : 0xffff00  //  : 
    let line = new THREE.Line(
        geometry, new THREE.LineBasicMaterial({ color: parseInt(colorCode, 16) })
    );
    return line
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
        if (!key.includes("Side")) {
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
    var boltMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        opacity: 1,
        transparent: false,
        wireframe: false
    });
    var meshMaterial = new THREE.MeshNormalMaterial()
    for (let diakey in diaDict) {
        for (let partkey in diaDict[diakey]) {
            if (partkey !== "point") {
                let shapeNode = diaDict[diakey][partkey].points
                let Thickness = diaDict[diakey][partkey].Thickness
                let zPosition = diaDict[diakey][partkey].z
                let rotationY = diaDict[diakey][partkey].rotationY
                let rotationX = diaDict[diakey][partkey].rotationX
                let hole = diaDict[diakey][partkey].hole
                let point = diaDict[diakey][partkey].point ? diaDict[diakey][partkey].point : diaDict[diakey].point;
                group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
                if (diaDict[diakey][partkey].bolt) {
                    let Thickness = diaDict[diakey][partkey].Thickness
                    let zPosition = diaDict[diakey][partkey].z
                    let rotationY = diaDict[diakey][partkey].rotationY + Math.PI / 2
                    let rotationX = diaDict[diakey][partkey].rotationX
                    let point = diaDict[diakey][partkey].point
                    let bolt = diaDict[diakey][partkey].bolt
                    // 볼트배치 자동계산 모듈 // 2020.7.7 by drlim
                    let boltZ = bolt.isUpper ? zPosition + Thickness - bolt.l / 2 : zPosition + bolt.l / 2
                    if (bolt.layout) {
                        for (let i in bolt.layout) {
                            group.add(boltMesh(point, bolt, boltZ, rotationX, rotationY, bolt.layout[i], initPoint, boltMaterial))
                            // dummyList.push(instancedBoltMesh(point, bolt, boltZ, rotationX, rotationY,bolt.layout[i], initPoint))
                        }
                    }
                }
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
    var rad = Math.atan2(- point.normalCos, point.normalSin) + Math.PI / 2  //+ 

    mesh.rotation.set(rotationX, rotationY, 0); //(rotationY - 90)*Math.PI/180
    mesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), rad);
    mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
    mesh.translateZ(zPosition)
    return mesh
}

// export function HBracingPlateView(hBraicngPlateDict, initPoint) {
//     var group = new THREE.Group();
//     // var meshMaterial = new THREE.MeshLambertMaterial( {
//     //     color: 0x00ffff,
//     //     emissive: 0x44aaaa,
//     //     opacity: 1,
//     //     side:THREE.DoubleSide,
//     //     transparent: false,
//     //     wireframe : false
//     //   } );
//     var meshMaterial = new THREE.MeshNormalMaterial()
//     for (let pk in hBraicngPlateDict) {
//         //    let point = pointDict[pk]
//         for (let partkey in hBraicngPlateDict[pk]) {
//             if (partkey !== "point") {
//                 let shapeNode = hBraicngPlateDict[pk][partkey].points
//                 let Thickness = hBraicngPlateDict[pk][partkey].Thickness
//                 let zPosition = hBraicngPlateDict[pk][partkey].z
//                 let rotationY = hBraicngPlateDict[pk][partkey].rotationY
//                 let rotationX = hBraicngPlateDict[pk][partkey].rotationX
//                 let hole = hBraicngPlateDict[pk][partkey].hole
//                 let point = hBraicngPlateDict[pk].point ? hBraicngPlateDict[pk].point : hBraicngPlateDict[pk][partkey].point
//                 group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial))
//             }
//         }
//     }
//     return group
// }

// export function HBracingView(hBracingDict, initPoint) {
//     var group = new THREE.Group();
//     // var meshMaterial = new THREE.MeshLambertMaterial( {
//     //     color: 0x00ffff,
//     //     emissive: 0x44aaaa,
//     //     opacity: 1,
//     //     side:THREE.DoubleSide,
//     //     transparent: false,
//     //     wireframe : false
//     //   } );
//     var meshMaterial = new THREE.MeshNormalMaterial()
//     for (let i in hBracingDict) {
//         group.add(convexMesh(hBracingDict[i].points[0], initPoint, meshMaterial))
//         group.add(convexMesh(hBracingDict[i].points[1], initPoint, meshMaterial))
//     }
//     return group
// }

// export function convexMesh(plist, initPoint, meshMaterial) {
//     let geometry = new THREE.Geometry();
//     for (let i in plist) {
//         geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
//     }
//     let j = plist.length / 2
//     for (let i = 0; i < j; i++) {
//         let k = i + 1 === j ? 0 : i + 1
//         geometry.faces.push(new THREE.Face3(k, i, i + j));
//         geometry.faces.push(new THREE.Face3(k, i + j, k + j));
//     }
//     geometry.computeFaceNormals();
//     return new THREE.Mesh(geometry, meshMaterial)
// }

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
            let k = j === pNum - 1 ? 0 : j + 1;
            geometry.faces.push(new THREE.Face3(i * pNum + j, i * pNum + k, (i + 1) * pNum + j));
            geometry.faces.push(new THREE.Face3(i * pNum + k, (i + 1) * pNum + k, (i + 1) * pNum + j));
        }
        if (i === 0) {
            // let numList = []
            // for (let i = 0; i < pNum; i++) { numList.push(i) }
            // let br = 0;
            // let v1 = new THREE.Vector3(geometry.vertices[0].x - geometry.vertices[pNum - 1].x, geometry.vertices[0].y - geometry.vertices[pNum - 1].y, geometry.vertices[0].z - geometry.vertices[pNum - 1].z)
            // let v2 = new THREE.Vector3(geometry.vertices[1].x - geometry.vertices[0].x, geometry.vertices[1].y - geometry.vertices[0].y, geometry.vertices[1].z - geometry.vertices[0].z)
            // v1.cross(v2)
            // console.log("check", v1, pNum, numList)
            // geometry.faces.push(new THREE.Face3(pNum - 1, 0, 1));
            // while (numList.length > 2) {
            //     let eraseList = [];
            //     // numList.forEach(num => dummy.push[num])
            //     for (let j = 0; j < numList.length - 2; j += 2) {
            //         let a1 = geometry.vertices[numList[j]];
            //         let a2 = geometry.vertices[numList[j + 1]];
            //         let a3 = geometry.vertices[numList[j + 2]];
            //         let b1 = new THREE.Vector3(a2.x - a1.x, a2.y - a1.y, a2.z - a1.z);
            //         let b2 = new THREE.Vector3(a3.x - a2.x, a3.y - a2.y, a3.z - a2.z);
            //         b1.cross(b2)
            //         console.log("check", b1, b1.length(), v1, v1.length())
            //         if (b1.length() < 10) {
            //             eraseList.push(numList[j + 1])
            //         } else {
            //             let dotp = b1.dot(v1)
            //             if (dotp > 0) {
            //                 geometry.faces.push(new THREE.Face3(numList[j + 2], numList[j + 1], numList[j]));
            //                 eraseList.push(numList[j + 1])
            //             }
            //         }

            //     }
            //     eraseList.forEach(num => numList.splice(numList.indexOf(num), 1))
            //     if (br > 100) { 
            //         console.log("check", br)
            //         break; }
            //     br++;
            // }
            geometry.faces.push(new THREE.Face3(0, pNum - 1, 1));
            geometry.faces.push(new THREE.Face3(1, 3, 2));
            for (let j = 1; j < pNum - 3; j++) {
                geometry.faces.push(new THREE.Face3(pNum - j, pNum - j - 1, 1));
            }
        }
        else if (i === deckPointDict.length - 2) {
            geometry.faces.push(new THREE.Face3((i + 1) * pNum, (i + 1) * pNum + 1, (i + 2) * pNum - 1));
            geometry.faces.push(new THREE.Face3((i + 1) * pNum + 1, (i + 1) * pNum + 2, (i + 1) * pNum + 3));
            for (let j = 1; j < pNum - 3; j++) {
                geometry.faces.push(new THREE.Face3((i + 2) * pNum - j, (i + 1) * pNum + 1, (i + 2) * pNum - j - 1));
            }
        }
    }
    geometry.computeFaceNormals();
    group.add(new THREE.Mesh(geometry, meshMaterial));

    return group
}

export function boltView(spliceDict, initPoint) {
    var group = new THREE.Group();
    // var meshMaterial = new THREE.MeshNormalMaterial()
    var meshMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        opacity: 1,
        side: THREE.DoubleSide,
        transparent: false,
        wireframe: false
    });
    let boltIs = false
    // let bolt0 = { startPoint: { x: 800, y: 150 }, P: 100, G: 100, pNum: 4, gNum: 17, size: 37, t: 14, l: 54 }
    // var radius = bolt0.size/2
    // var geometry = new THREE.CylinderBufferGeometry(radius,radius,bolt0.t*2+bolt0.l,6,1)
    // let dummyList = [];
    // for (let key in spliceDict) {
    //    let point = nameToPointDict[diakey]
    for (let partkey in spliceDict) {
        if (spliceDict[partkey].bolt) {
            let Thickness = spliceDict[partkey].Thickness
            let zPosition = spliceDict[partkey].z
            let rotationY = spliceDict[partkey].rotationY + Math.PI / 2
            let rotationX = spliceDict[partkey].rotationX
            let point = spliceDict[partkey].point
            let bolt = spliceDict[partkey].bolt
            // 볼트배치 자동계산 모듈 // 2020.7.7 by drlim
            let boltZ = bolt.isUpper ? zPosition + Thickness - bolt.l / 2 : zPosition + bolt.l / 2
            if (bolt.layout) {
                for (let i in bolt.layout) {
                    group.add(boltMesh(point, bolt, boltZ, rotationX, rotationY, bolt.layout[i], initPoint, meshMaterial))
                    // dummyList.push(instancedBoltMesh(point, bolt, boltZ, rotationX, rotationY,bolt.layout[i], initPoint))
                }
                boltIs = true
            }
        }
    }
    // }
    // console.log("dummyList",dummyList)
    // let mesh = new THREE.InstancedMesh(geometry, meshMaterial,dummyList.length)
    // mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage );
    // for (let i in dummyList){
    //     mesh.setMatrixAt(i,dummyList[i].matrix)
    // }
    // mesh.instanceMatrix.needsUpdate = true;
    // group.add(mesh)
    let result = boltIs ? group : null;
    return result
}

export function boltMesh(point, bolt, zPosition, rotationX, rotationY, XYtranslate, initPoint, meshMaterial) {
    var radius = bolt.size / 2
    var geometry = new THREE.CylinderBufferGeometry(radius, radius, bolt.t * 2 + bolt.l, 6, 1)
    var mesh = new THREE.Mesh(geometry, meshMaterial);
    var rad = Math.atan2(- point.normalCos, point.normalSin) + Math.PI / 2  //+ 
    mesh.rotation.set(rotationX, rotationY, Math.PI / 2); //(rotationY - 90)*Math.PI/180
    mesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), rad);
    mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
    mesh.translateY(zPosition)
    mesh.translateX(XYtranslate[1])
    mesh.translateZ(XYtranslate[0])
    return mesh
}

export function instancedBoltMesh(point, bolt, zPosition, rotationX, rotationY, XYtranslate, initPoint) {
    var dummy = new THREE.Object3D();
    var rad = Math.atan2(- point.normalCos, point.normalSin) + Math.PI / 2  //+ 
    dummy.rotation.set(rotationX, rotationY, Math.PI / 2); //(rotationY - 90)*Math.PI/180
    dummy.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), rad);
    dummy.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
    dummy.translateY(zPosition)
    dummy.translateX(XYtranslate[1])
    dummy.translateZ(XYtranslate[0])
    dummy.updateMatrix();
    return dummy
}

export function StudMeshView(studList, initPoint) {
    let group = new THREE.Group();
    var meshMaterial = new THREE.MeshNormalMaterial();
    // var meshMaterial = new THREE.MeshLambertMaterial( {
    //     color: 0xffffff,
    //     emissive: 0x000000,
    //     opacity: 1,
    //     side:THREE.DoubleSide,
    //     transparent: false,
    //     wireframe : false
    // } );
    for (let i in studList) {
        var geometry = new THREE.CylinderBufferGeometry(studList[i].stud.dia / 2, studList[i].stud.dia / 2, studList[i].stud.height, 8, 1)
        var geometry2 = new THREE.CylinderBufferGeometry(studList[i].stud.headDia / 2, studList[i].stud.headDia / 2, studList[i].stud.headDepth, 8, 1)
        let rotationX = Math.atan(studList[i].gradientX)
        let rotationY = Math.atan(studList[i].gradientY)
        let instanceList = [];
        let instanceList2 = [];
        for (let j in studList[i].points) {
            let point = studList[i].points[j]
            // instance mesh test
            let dummy = new THREE.Object3D();
            let dummy2 = new THREE.Object3D();
            dummy.rotation.set(rotationX + Math.PI / 2, rotationY, 0)
            dummy.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
            dummy.translateY(studList[i].stud.height / 2)
            dummy2.rotation.set(rotationX + Math.PI / 2, rotationY, 0)
            dummy2.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
            dummy2.translateY(studList[i].stud.height - studList[i].stud.headDepth / 2)
            dummy.updateMatrix();
            dummy2.updateMatrix();
            instanceList.push(dummy);
            instanceList2.push(dummy2);

            // instance mesh test
            // var mesh = new THREE.Mesh(geometry, meshMaterial)
            // var mesh2 = new THREE.Mesh(geometry2, meshMaterial)
            // mesh.rotation.set(rotationX + Math.PI / 2, rotationY, 0)
            // mesh.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
            // mesh.translateY(studList[i].stud.height / 2)
            // mesh2.rotation.set(rotationX + Math.PI / 2, rotationY, 0)
            // mesh2.position.set(point.x - initPoint.x, point.y - initPoint.y, point.z - initPoint.z)
            // mesh2.translateY(studList[i].stud.height - studList[i].stud.headDepth / 2)
            // group.add(mesh)
            // group.add(mesh2)
            // }

        }
        let mesh = new THREE.InstancedMesh(geometry, meshMaterial, instanceList.length)
        let mesh2 = new THREE.InstancedMesh(geometry2, meshMaterial, instanceList2.length)
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        mesh2.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        for (let i in instanceList) {
            mesh.setMatrixAt(i, instanceList[i].matrix)
        }
        for (let i in instanceList2) {
            mesh2.setMatrixAt(i, instanceList2[i].matrix)
        }
        mesh.instanceMatrix.needsUpdate = true;
        mesh2.instanceMatrix.needsUpdate = true;
        group.add(mesh)
        group.add(mesh2)
    }
    return group
}

export function barrierSectionView(deckSection, initPoint, opacity) {
    let group = new THREE.Group();
    var meshMaterial = new THREE.MeshLambertMaterial({
        color: 0x000000,
        emissive: 0x777777,
        opacity: opacity,
        // side:THREE.DoubleSide,
        transparent: true,
        wireframe: false
    });
    // let meshMaterial = new THREE.MeshNormalMaterial()
    //     meshMaterial.side = THREE.DoubleSide

    let pNum = deckSection[0].points.length
    let geometry = new THREE.Geometry();
    for (let key in deckSection) {
        deckSection[key].points.forEach(function (Point) {
            geometry.vertices.push(new THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z))
        })
    }

    for (let i = 0; i < deckSection.length - 1; i++) {
        for (let j = 0; j < pNum - 1; j++) {
            geometry.faces.push(new THREE.Face3(i * pNum + j, (i + 1) * pNum + j, i * pNum + j + 1));
            geometry.faces.push(new THREE.Face3(i * pNum + j + 1, (i + 1) * pNum + j, (i + 1) * pNum + j + 1));
        }
        if (i === 0) {
            for (let j = 1; j < pNum - 1; j++) {
                geometry.faces.push(new THREE.Face3(i, i + j, i + j + 1));
            }
        } else if (i === deckSection.length - 2) {
            for (let j = 1; j < pNum - 1; j++) {
                geometry.faces.push(new THREE.Face3((i + 1) * pNum, (i + 1) * pNum + j + 1, (i + 1) * pNum + j));
            }
        }
    }
    geometry.computeFaceNormals();
    group.add(new THREE.Mesh(geometry, meshMaterial));
    return group
}


export function LoftModelView(model, initPoint) {
    let group = new THREE.Group();
    let meshMaterial = new THREE.MeshNormalMaterial()
    meshMaterial.side = THREE.DoubleSide

    let pNum = model.points[0].length
    let geometry = new THREE.Geometry();
    if (model.points.length === 1) {
        group.add(PolyRegion(model.points[0], meshMaterial, initPoint))
    } else {
        for (let i in model.points) {
            model.points[i].forEach(function (Point) {
                geometry.vertices.push(new THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z))
            })
        }
    }
    for (let i = 0; i < model.points.length - 1; i++) {
        for (let j = 0; j < pNum; j++) {
            let k = j < pNum - 1 ? j + 1 : 0
            if (k > 0 || model.closed === undefined || model.closed === true) {
                geometry.faces.push(new THREE.Face3(i * pNum + j, (i + 1) * pNum + j, i * pNum + k));
                geometry.faces.push(new THREE.Face3(i * pNum + k, (i + 1) * pNum + j, (i + 1) * pNum + k));
            }
        }
        if (model.cap === undefined || model.cap === true) {
            if (model.ptGroup) {
                if (i === 0) {
                    for (let g in model.ptGroup) {
                        for (let j = 1; j < model.ptGroup[g].length - 1; j++) {
                            geometry.faces.push(new THREE.Face3(model.ptGroup[g][0], model.ptGroup[g][j], model.ptGroup[g][j + 1]));
                        }
                    }
                }
                if (i === model.points.length - 2) {
                    for (let g in model.ptGroup) {
                        for (let j = 1; j < model.ptGroup[g].length - 1; j++) {
                            geometry.faces.push(new THREE.Face3((i + 1) * pNum + model.ptGroup[g][0],
                                (i + 1) * pNum + model.ptGroup[g][j + 1], (i + 1) * pNum + model.ptGroup[g][j]));
                        }
                    }
                }
            } else {
                if (i === 0) {
                    for (let j = 1; j < pNum - 1; j++) {
                        geometry.faces.push(new THREE.Face3(i, i + j, i + j + 1));
                    }
                }
                if (i === model.points.length - 2) {
                    for (let j = 1; j < pNum - 1; j++) {
                        geometry.faces.push(new THREE.Face3((i + 1) * pNum, (i + 1) * pNum + j + 1, (i + 1) * pNum + j));
                    }
                }
            }
        }
    }
    geometry.computeFaceNormals();
    group.add(new THREE.Mesh(geometry, meshMaterial));
    return group
}


export function PolyRegion(points, meshMaterial, initPoint) {
    let pNum = points.length
    let geometry = new THREE.Geometry();
    points.forEach(function (Point) {
        geometry.vertices.push(new THREE.Vector3(Point.x - initPoint.x, Point.y - initPoint.y, Point.z - initPoint.z))
    })

    let numlist = [];
    for (let i = 0; i < pNum; i++) {
        numlist.push(i);
    }
    let normalVec = PolygonNormalVector(points)//[0, -1, 0];
  
    let iter = 0;
    // console.log(numlist);
    while (numlist.length > 3) {
        // console.log(iter, numlist);
        let vec = [];
        for (let i = 0; i < numlist.length; i++) {
            let k = i < numlist.length - 1 ? i + 1 : 0;
            vec.push({
                x: points[numlist[k]].x - points[numlist[i]].x,
                y: points[numlist[k]].y - points[numlist[i]].y,
                z: points[numlist[k]].z - points[numlist[i]].z
            });
        }
        let removeIndex = [];
        let diagonal = [];
        for (let j = 0; j < numlist.length; j++) {

            let i = j === 0 ? numlist.length - 1 : j - 1;
            let k = j < numlist.length - 1 ? j + 1 : 0;

            let tempVec = [vec[i].y * vec[j].z - vec[i].z * vec[j].y, vec[i].z * vec[j].x - vec[i].x * vec[j].z, vec[i].x * vec[j].y - vec[i].y * vec[j].x];
            let dotVec = tempVec[0] * normalVec[0] + tempVec[1] * normalVec[1] + tempVec[2] * normalVec[2];
            // console.log(tempVec, dotVec);
            // console.log(vec[i],vec[j])
            if (iter === 0) {
                if (Math.abs(dotVec) < 0.000000001) {
                    removeIndex.push(j);
                }
            } else {
                if (dotVec > 0.000000001) {
                    diagonal.push(Math.sqrt((vec[i].x + vec[j].x) ** 2 + (vec[i].y + vec[j].y) ** 2 + (vec[i].z + vec[j].z) ** 2));
                } else {
                    diagonal.push(1000000)
                }
            }
        }

        removeIndex.sort(function (a, b) { return b - a }); // 내림차순 정렬
        for (let i in removeIndex) {
            numlist.splice(removeIndex[i], 1);
        }

        if (diagonal.length > 0) {
            let j = diagonal.indexOf(Math.min(...diagonal))
            let i = j === 0 ? numlist.length - 1 : j - 1;
            let k = j < numlist.length - 1 ? j + 1 : 0;
            geometry.faces.push(new THREE.Face3(numlist[i], numlist[j], numlist[k]));
            numlist.splice(j, 1);
        }
        iter++;
        if (iter > pNum) { break; }
    }
    geometry.computeFaceNormals();
    return new THREE.Mesh(geometry, meshMaterial)
}

export function PolygonNormalVector(points) {
    let vec = [];
    let err = 0.0000001

    for (let i = 0; i < points.length; i++) {
        let k = i < points.length - 1 ? i + 1 : 0;
        vec.push({
            x: points[k].x - points[i].x,
            y: points[k].y - points[i].y,
            z: points[k].z - points[i].z
        });
    }
    let normals = [];
    for (let j = 0; j < vec.length; j++) {
        let i = j === 0 ? vec.length - 1 : j - 1;
        // let k = j < numlist.length - 1 ? j + 1 : 0;
        normals.push([vec[i].y * vec[j].z - vec[i].z * vec[j].y, vec[i].z * vec[j].x - vec[i].x * vec[j].z, vec[i].x * vec[j].y - vec[i].y * vec[j].x]);
        // let dotVec = tempVec[0] * normalVec[0] + tempVec[1] * normalVec[1] + tempVec[2] * normalVec[2];
    }

    let newNormals = [];
    normals.forEach(function(v){
        if (err < VectorLength(...v)){
            newNormals.push(v)
        }
    } )
    let pos = 1;
    let neg = 0;
    for (let i = 1; i < newNormals.length; i++) {
        let dot = newNormals[0][0] * newNormals[i][0] + newNormals[0][1] * newNormals[i][1] + newNormals[0][2] * newNormals[i][2]
        if (dot > err) {
            pos++
        } else if (dot < -err) {
            neg++
        }
    }

    let l = VectorLength(...newNormals[0])
    let sign = pos > neg? 1 : -1;
    let result = [newNormals[0][0]*sign/l,newNormals[0][1]*sign/l,newNormals[0][2]*sign/l ]
    return result
}

export function VectorLength(x, y, z){
 return Math.sqrt(x**2 + y**2 + z**2);
}

export function innerTriangle(point1, point2, point3, checkPoint){
    
}