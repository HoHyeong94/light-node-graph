// import makerjs from 'makerjs'
import { THREE, sceneAdder } from "global";
import { PointLength } from "../geometryModule"
import { PointGenerator } from "../line/module"
import { splineCoefficient, splineProp } from "../girder/module"
// import {PointLength, hBracingPlate} from './geometryFunc'
import { ToGlobalPoint, ToGlobalPoint2 } from '../geometryModule'

export function GirderLayoutView(girderLayout) { //종단/평면선형에서의 거더 배치 뷰
    let scale = 0.01; // scale 은 추후 외부에서 받아오는 변수로 지정할 계획임
    let group = new THREE.Group();
    let skewLength = 5000;
    let aquaLine = new THREE.LineBasicMaterial({ color: 0x00ffff });
    let redLine = new THREE.LineBasicMaterial({ color: 0xff0000 });
    let redDotLine = new THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 30, gapSize: 10, });
    let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
    let leftLine = [];
    let rightLine = [];
    let label = [];
    let fontSize = 80;
    let initPoint = { x: girderLayout.masterLine.HorizonDataList[0][0], y: girderLayout.masterLine.HorizonDataList[0][1] }
    let layerNum = 3;
    let sign = - 1;
    for (let key in girderLayout.gridKeyPoint) {
        let pt = girderLayout.gridKeyPoint[key]
        let angle = (girderLayout.gridKeyPoint[key].skew - 90) * Math.PI / 180
        let pt1 = {
            x: pt.x + (pt.normalCos * Math.cos(angle) - pt.normalSin * Math.sin(angle)) * skewLength / Math.cos(angle),
            y: pt.y + (pt.normalCos * Math.sin(angle) + pt.normalSin * Math.cos(angle)) * skewLength / Math.cos(angle)
        }
        let pt2 = {
            x: pt.x - (pt.normalCos * Math.cos(angle) - pt.normalSin * Math.sin(angle)) * skewLength / Math.cos(angle),
            y: pt.y - (pt.normalCos * Math.sin(angle) + pt.normalSin * Math.cos(angle)) * skewLength / Math.cos(angle)
        }
        let bar = [{ x: (pt1.x - initPoint.x) * scale, y: (pt1.y - initPoint.y) * scale },
        { x: (pt2.x - initPoint.x) * scale, y: (pt2.y - initPoint.y) * scale }];

        let rot = Math.atan2(pt.normalSin, pt.normalCos)
        if (rot >= Math.PI / 2) { rot = rot - Math.PI }
        sign = sign === 1 ? -1 : 1;
        let cos = Math.cos(rot)
        let sin = Math.sin(rot)
        let dimLine = [{ x: (pt.x - initPoint.x) * scale, y: (pt.y - initPoint.y) * scale },
        { x: (pt.x - initPoint.x) * scale + sign * cos * fontSize * 2 - sin * fontSize * 2, y: (pt.y - initPoint.y) * scale + sign * sin * fontSize * 2 + cos * fontSize * 2 },
        { x: (pt.x - initPoint.x) * scale + sign * cos * fontSize * 8 - sin * fontSize * 2, y: (pt.y - initPoint.y) * scale + sign * sin * fontSize * 8 + cos * fontSize * 2 }];
        let station = pt.masterStationNumber;
        label.push({
            text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
            anchor: [(pt.x - initPoint.x) * scale + sign * cos * fontSize * 5 - sin * fontSize * 2.25, (pt.y - initPoint.y) * scale + sign * sin * fontSize * 5 + cos * fontSize * 2.25, 0],
            rotation: rot,
            align: "center",
            fontSize: fontSize / 4
        });

        label.push({
            text: "x:" + (pt.x / 1000).toFixed(4) + ", y:" + (pt.y / 1000).toFixed(4),
            anchor: [(pt.x - initPoint.x) * scale + sign * cos * fontSize * 5 - sin * fontSize * 1.75, (pt.y - initPoint.y) * scale + sign * sin * fontSize * 5 + cos * fontSize * 1.75, 0],
            rotation: rot,
            align: "center",
            fontSize: fontSize / 4
        });

        leftLine.push(bar[0]);
        rightLine.push(bar[1])
        group.add(LineMesh(dimLine, redLine))
        group.add(LineMesh(bar, aquaLine))
    }
    for (let i in girderLayout.girderLine) {
        let girderLine = [];
        for (let j in girderLayout.girderLine[i]) {
            girderLine.push({
                x: (girderLayout.girderLine[i][j].x - initPoint.x) * scale,
                y: (girderLayout.girderLine[i][j].y - initPoint.y) * scale
            })
        }
        group.add(LineMesh(girderLine, redDotLine, -1))
    }
    group.add(LineMesh(leftLine, aquaLine))
    group.add(LineMesh(rightLine, aquaLine))
    group.add(LabelInsert(label, textMaterial, layerNum))  //layer number is 3

    let group2 = new THREE.Group();
    let vl = girderLayout.masterLine.VerticalDataList
    initPoint = { x: vl[0][0], y: vl[0][1] }
    let xscale = 0.003;//종단선형뷰하고 동일한 스케일을 유지하도록
    let yscale = 0.02;
    let topLine = [];
    let botLine = [];
    for (let key in girderLayout.gridKeyPoint) {
        let pt = girderLayout.gridKeyPoint[key]
        let pt1 = {
            x: (pt.masterStationNumber - initPoint.x) * xscale,
            y: (pt.z - initPoint.y) * yscale + fontSize / 4
        }
        let pt2 = {
            x: (pt.masterStationNumber - initPoint.x) * xscale,
            y: (pt.z - initPoint.y) * yscale - fontSize / 4
        }
        group2.add(LineMesh([pt1, pt2], aquaLine))
        topLine.push(pt1);
        botLine.push(pt2);
    }
    group2.add(LineMesh(topLine, aquaLine))
    group2.add(LineMesh(botLine, aquaLine))

    return { plan: group, side: group2 }
}

export function LineSideView(masterLine) {  //종단선형뷰
    let xscale = 0.003;
    let yscale = 0.02;
    let fontSize = 80;
    let layerNum = 4;
    let group = new THREE.Group();
    let redLine = new THREE.LineBasicMaterial({ color: 0xff0000 });
    let blueLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
    let greenLine = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    let whiteLine = new THREE.LineBasicMaterial({ color: 0xffffff });
    let grayLine = new THREE.LineBasicMaterial({ color: 0x888888 });
    let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff

    let vl = masterLine.VerticalDataList
    let points = [];
    let linePoints = [];
    let label = [];
    let initPoint = { x: vl[0][0], y: vl[0][1] }
    let leftGrad = [];
    let rightGrad = [];

    for (let i in masterLine.points) {
        linePoints.push({ x: (masterLine.points[i].masterStationNumber - initPoint.x) * xscale, y: (masterLine.points[i].z - initPoint.y) * yscale })
    }
    for (let i in vl) {
        let x = (vl[i][0] - initPoint.x) * xscale;
        let y = (vl[i][1] - initPoint.y) * yscale
        points.push({ x, y });
        let bar = [{ x, y },
        { x, y: -5 * fontSize }];
        group.add(LineMesh(bar, redLine))
        let station = vl[i][0]
        label.push({
            text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
            anchor: [x - fontSize / 4, - 5 * fontSize, 0],
            rotation: Math.PI / 2,
            align: "left",
            fontSize: fontSize / 4
        });
        let el = vl[i][1] / 1000
        label.push({
            text: "EL. " + el.toFixed(4),
            anchor: [x + fontSize / 4, - 5 * fontSize, 0],
            rotation: Math.PI / 2,
            align: "left",
            fontSize: fontSize / 4
        });

    }
    for (let i in masterLine.parabolaData) {
        let x1 = (masterLine.parabolaData[i][0] - initPoint.x) * xscale
        let x2 = (masterLine.parabolaData[i][1] - initPoint.x) * xscale
        let y1 = (masterLine.parabolaData[i][2] - initPoint.y) * yscale
        let y2 = (masterLine.parabolaData[i][3] - initPoint.y) * yscale
        group.add(LineMesh([{ x: x1, y: y1 }, { x: x1, y: - 5 * fontSize }, { x: x2, y: - 5 * fontSize }, { x: x2, y: y2 }], blueLine))
        label.push({
            text: "L=" + (masterLine.parabolaData[i][4] / 1000).toFixed(4),
            anchor: [(x1 + x2) / 2, - 5.25 * fontSize, 0],
            rotation: 0,
            align: "center",
            fontSize: fontSize / 4
        });
        let station = masterLine.parabolaData[i][0];
        label.push({
            text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
            anchor: [x1 - fontSize / 4, - 5 * fontSize, 0],
            rotation: Math.PI / 2,
            align: "left",
            fontSize: fontSize / 4
        });
        let el = masterLine.parabolaData[i][2] / 1000
        label.push({
            text: "EL. " + el.toFixed(4),
            anchor: [x1 + fontSize / 4, - 5 * fontSize, 0],
            rotation: Math.PI / 2,
            align: "left",
            fontSize: fontSize / 4
        });
        station = masterLine.parabolaData[i][1];
        label.push({
            text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
            anchor: [x2 - fontSize / 4, - 5 * fontSize, 0],
            rotation: Math.PI / 2,
            align: "left",
            fontSize: fontSize / 4
        });
        el = masterLine.parabolaData[i][3] / 1000
        label.push({
            text: "EL. " + el.toFixed(4),
            anchor: [x2 + fontSize / 4, - 5 * fontSize, 0],
            rotation: Math.PI / 2,
            align: "left",
            fontSize: fontSize / 4
        });

    }

    for (let i = 0; i < masterLine.tangent.length; i++) {
        let x = ((vl[i][0] + vl[i + 1][0]) / 2 - initPoint.x) * xscale;
        let y = ((vl[i][1] + vl[i + 1][1]) / 2 - initPoint.y) * yscale
        let rot = Math.atan(masterLine.tangent[i]) * yscale / xscale;
        label.push({
            text: "S=" + (masterLine.tangent[i] * 100).toFixed(2) + "%",
            anchor: [x, y + 0.25 * fontSize, 0],
            rotation: rot,
            align: "center",
            fontSize: fontSize / 4
        });
    }

    let offset = -15 * fontSize;
    let superElCenter = [];
    for (let i in masterLine.SuperElevation) {
        let x = (masterLine.SuperElevation[i][0] - initPoint.x) * xscale
        let y = offset;
        group.add(LineMesh([{ x, y: y + 5 * fontSize }, { x, y: y - 8 * fontSize }], redLine))
        superElCenter.push({ x, y })
        leftGrad.push({ x, y: y + fontSize / 2 * masterLine.SuperElevation[i][1] })
        rightGrad.push({ x, y: y + fontSize / 2 * masterLine.SuperElevation[i][2] })
        let station = masterLine.SuperElevation[i][0];
        label.push({
            text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
            anchor: [x - fontSize / 4, y - 8 * fontSize, 0],
            rotation: Math.PI / 2,
            align: "left",
            fontSize: fontSize / 4
        });
    }
    for (let i = 0; i < 11; i++) {
        group.add(LineMesh([{ x: superElCenter[0].x, y: offset + (5 - i) * fontSize }, { x: superElCenter[superElCenter.length - 1].x, y: offset + (5 - i) * fontSize }], grayLine))
        label.push({
            text: (10 - i * 2).toFixed(0) + "%",
            anchor: [superElCenter[0].x - fontSize, offset + (5 - i) * fontSize, 0],
            rotation: 0,
            align: "center",
            fontSize: fontSize / 4
        });
    }
    group.add(LineMesh(superElCenter, redLine))
    group.add(LineMesh(leftGrad, blueLine, 1))
    group.add(LineMesh(rightGrad, greenLine, 1))
    group.add(LineMesh(linePoints, whiteLine, 1))
    group.add(LineMesh(points, blueLine))
    group.add(LabelInsert(label, textMaterial, layerNum))  //layer number is 3

    return group
}

export function LineDrawView(masterLine, slaveLines) {  //평면선형 그리기
    let scale = 0.01;
    let group = new THREE.Group();
    let meshes = [];
    let IPpoints = [];
    let linePoints = [];
    let segPoints = [];
    let label = [];
    let redLine = new THREE.LineBasicMaterial({ color: 0xff0000 });
    let blueLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
    let whiteLine = new THREE.LineBasicMaterial({ color: 0xffffff });
    let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
    let fontSize = 80
    let segName = { 0: "ETC", 1: "BTC", 2: "BC", 3: "EC" }

    let initPoint = { x: masterLine.HorizonDataList[0][0], y: masterLine.HorizonDataList[0][1] }
    for (let i in masterLine.HorizonDataList) {
        IPpoints.push({ x: (masterLine.HorizonDataList[i][0] - initPoint.x) * scale, y: (masterLine.HorizonDataList[i][1] - initPoint.y) * scale })
    }
    for (let i in masterLine.points) {
        let station = masterLine.points[i].masterStationNumber / 1000
        if ((station % 20).toFixed(0) === "0") {
            linePoints.push({ x: (masterLine.points[i].x - initPoint.x) * scale, y: (masterLine.points[i].y - initPoint.y) * scale })
            let rot = Math.atan2(masterLine.points[i].normalSin, masterLine.points[i].normalCos)
            if (rot >= Math.PI / 2) { rot = rot - Math.PI }
            let cos = Math.cos(rot)
            let sin = Math.sin(rot)
            let bar = [{ x: (masterLine.points[i].x - initPoint.x) * scale + cos * fontSize / 4, y: (masterLine.points[i].y - initPoint.y) * scale + sin * fontSize / 4 },
            { x: (masterLine.points[i].x - initPoint.x) * scale - cos * fontSize / 4, y: (masterLine.points[i].y - initPoint.y) * scale - sin * fontSize / 4 }];
            group.add(LineMesh(bar, whiteLine))
            label.push({
                text: (masterLine.points[i].masterStationNumber / 1000).toFixed(4),
                anchor: [bar[0].x + cos * fontSize / 4, bar[0].y + sin * fontSize / 4, 0],
                rotation: rot,
                align: "left",
                fontSize: fontSize / 4
            })
        }
    }

    for (let i = 1; i < masterLine.segments.start.length; i++) {
        let station = masterLine.segments.start[i];
        let pt = PointGenerator(station, masterLine, 90);
        let rot = Math.atan2(pt.normalSin, pt.normalCos)
        if (rot >= Math.PI / 2) { rot = rot - Math.PI }
        let cos = Math.cos(rot)
        let sin = Math.sin(rot)
        let bar = [{ x: (pt.x - initPoint.x) * scale + cos * fontSize * 6, y: (pt.y - initPoint.y) * scale + sin * fontSize * 6 },
        { x: (pt.x - initPoint.x) * scale, y: (pt.y - initPoint.y) * scale }];
        group.add(LineMesh(bar, redLine))
        label.push({
            text: "STA. " + Math.floor(station / 1000000).toFixed(0) + "K+" + ((station % 1000000) / 1000).toFixed(4),
            anchor: [bar[1].x + cos * fontSize * 4 + sin * fontSize / 4, bar[1].y + sin * fontSize * 4 - cos * fontSize / 4, 0],
            rotation: rot,
            align: "center",
            fontSize: fontSize / 4
        });
        label.push({
            text: segName[i % 4],
            anchor: [bar[1].x + cos * fontSize * 4 - sin * fontSize / 4, bar[1].y + sin * fontSize * 4 + cos * fontSize / 4, 0],
            rotation: rot,
            align: "center",
            fontSize: fontSize / 4
        });

    }


    for (let i = 0; i < IPpoints.length; i++) {
        let circle = new THREE.EllipseCurve(IPpoints[i].x, IPpoints[i].y, 20, 20)
        let cp = circle.getPoints(16);
        let circlegeo = new THREE.Geometry().setFromPoints(cp)
        let IPCircle = new THREE.Line(circlegeo, redLine)
        group.add(IPCircle)
        let ipName = i === 0 ? "BP" : i === (IPpoints.length - 1) ? "EP" : "IP" + i
        label.push({
            text: ipName,
            anchor: [IPpoints[i].x, IPpoints[i].y + 100, 0],
            rotation: 0,
            fontSize: fontSize
        })

    }
    group.add(LineMesh(linePoints, whiteLine))
    group.add(LineMesh(IPpoints, blueLine))
    group.add(LabelInsert(label, textMaterial, 3))  //layer number is 3

    return group
}

function LabelInsert(label, textMaterial, layer) {
    let group = new THREE.Group()
    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        // loader.load('fonts/noto_sans_kr_regular.json', function (font) {
        // //console.log(font)
        // var font = {generateShapes:(messagem , num)=>{}}
        for (let i in label) {
            var shapes = font.generateShapes(label[i].text, label[i].fontSize);
            var geometry = new THREE.ShapeBufferGeometry(shapes);
            if (label[i].align === "left") {
                geometry.translate(0, -label[i].fontSize / 2, 0);
            }
            else {
                var xMid
                geometry.computeBoundingBox();
                xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                geometry.translate(xMid, -label[i].fontSize / 2, 0);
            }

            if (label[i].rotation) {
                geometry.rotateZ(label[i].rotation)
            }
            geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
            // make shape ( N.B. edge view not visible )
            let textMesh = new THREE.Mesh(geometry, textMaterial);
            textMesh.layers.set(layer)
            group.add(textMesh);
        }
    });
    return group// text.position.z = 0;
}

function ShapePlanView(partDict, pointDict, partkeyNameList, index1, index2, sc, initPoint, r, lineMaterial) { //횡단면도 그리기
    // //console.log(partDict)    
    // let result = {models:{},layer:color };
    let meshes = [];

    for (let pk in partDict) {
        let point = pointDict[pk]
        for (let partkey of partkeyNameList) {
            if (partDict[pk].hasOwnProperty(partkey)) {
                if (partDict[pk][partkey].rotationX !== Math.PI / 2) {
                    let globalPts = [];
                    let pts = [];
                    for (let i in partDict[pk][partkey].points) {
                        globalPts.push(ToGlobalPoint2(point, partDict[pk][partkey].points[i]))
                    }
                    for (let i in globalPts) {
                        let x = (globalPts[i].x - initPoint.x) * sc
                        let y = (globalPts[i].y - initPoint.y) * sc
                        pts.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x })
                    }
                    meshes.push(sectionMesh(pts, lineMaterial));
                    // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                }
                else {
                    let globalPts = [];
                    let pts = [];
                    let points = [{ x: partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].z },
                    { x: partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].z },
                    { x: partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].Thickness + partDict[pk][partkey].z },
                    { x: partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].Thickness + partDict[pk][partkey].z }]
                    for (let i in points) {
                        globalPts.push(ToGlobalPoint2(point, points[i]))
                    }
                    for (let i in globalPts) {
                        let x = (globalPts[i].x - initPoint.x) * sc
                        let y = (globalPts[i].y - initPoint.y) * sc
                        pts.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x })
                    }
                    meshes.push(sectionMesh(pts, lineMaterial));
                    // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                }
            }
        }
    }
    return meshes
}

function GirderSideView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, lineMaterial) { //측면도 그리기
    // let result = {models:{},layer:lineMaterial }; 
    // let index = 1;
    let meshes = [];
    for (let part in steelBoxDict) {
        for (let name of keyNamelist) {
            if (part.includes(name)) {
                let ptsL1 = [];
                let ptsR1 = [];
                let ptsC1 = [];
                let ptsL2 = [];
                let ptsR2 = [];
                let ptsC2 = [];
                for (let j in steelBoxDict[part]["points"]) {
                    let pts1 = [];
                    let pts2 = [];
                    for (let i in steelBoxDict[part]["points"][j]) {
                        if (i % sectionPointNum === index1) {
                            let x = (steelBoxDict[part]["points"][j][i].x) * sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.z) * sc
                            pts1.push({ x, y })
                            // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        } else if (i % sectionPointNum === index2) {
                            let x = (steelBoxDict[part]["points"][j][i].x) * sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.z) * sc
                            pts2.push({ x, y })
                            // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        }
                    }
                    if (j == 0) {
                        ptsL1.push(...pts1)
                        ptsL2.push(...pts2)
                    }
                    if (j == 1) {
                        ptsR1.push(...pts1)
                        ptsR2.push(...pts2)
                    }
                    if (j == 2) {
                        ptsC1.push(...pts1)
                        ptsC2.push(...pts2)
                    }
                }
                if (ptsC1.length === 0) {
                    meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
                    meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
                } else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
                    if (ptsC1[0].x === ptsL1[ptsL1.length - 1].x) {
                        meshes.push(sectionMesh(
                            [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
                    } else {
                        meshes.push(sectionMesh(
                            [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
                    }
                }
                else if (ptsL1.length === 0 && ptsL1.length === 0) {
                    meshes.push(sectionMesh(
                        [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                }
            }

        }
    }
    return meshes
}


// function GeneralSideView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, r, lineMaterial) { //측면도 그리기
//     // let result = {models:{},layer:lineMaterial }; 
//     // let index = 1;
//     let meshes = [];
//     for (let part in steelBoxDict) {
//         for (let name of keyNamelist) {
//             if (part.includes(name)) {
//                 let ptsL1 = [];
//                 let ptsR1 = [];
//                 let ptsC1 = [];
//                 let ptsL2 = [];
//                 let ptsR2 = [];
//                 let ptsC2 = [];
//                 for (let j in steelBoxDict[part]["points"]) {
//                     let pts1 = [];
//                     let pts2 = [];
//                     for (let i in steelBoxDict[part]["points"][j]) {
//                         if (i % sectionPointNum === index1) {
//                             let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber) * sc
//                             let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z) * sc
//                             pts1.push({ x, y })
//                             // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
//                         } else if (i % sectionPointNum === index2) {
//                             let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber) * sc
//                             let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z) * sc
//                             pts2.push({ x, y })
//                             // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
//                         }
//                     }
//                     if (j == 0) {
//                         ptsL1.push(...pts1)
//                         ptsL2.push(...pts2)
//                     }
//                     if (j == 1) {
//                         ptsR1.push(...pts1)
//                         ptsR2.push(...pts2)
//                     }
//                     if (j == 2) {
//                         ptsC1.push(...pts1)
//                         ptsC2.push(...pts2)
//                     }
//                 }
//                 if (ptsC1.length === 0) {
//                     meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial));
//                     meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial));
//                 } else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
//                     if (ptsC1[0][0] === ptsL1[ptsL1.length - 1][0] && ptsC1[0][1] === ptsL1[ptsL1.length - 1][1]) {
//                         meshes.push(sectionMesh(
//                             [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
//                     } else {
//                         meshes.push(sectionMesh(
//                             [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
//                     }
//                 }
//                 else if (ptsL1.length === 0 && ptsL1.length === 0) {
//                     meshes.push(sectionMesh(
//                         [...ptsC1.reverse(), ...ptsC2], lineMaterial));
//                 }
//             }

//         }
//     }
//     return meshes
// }

function WebPlanView(steelBoxDict, keyNamelist, sectionPointNum, isTop, sc, initPoint, r, lineMaterial) { //강박스 일반도 그리기
    // let result = {models:{},layer:color };
    // let index = 1;
    let meshes = [];
    let index1 = 0;
    let index2 = 0;
    for (let part in steelBoxDict) {
        for (let name of keyNamelist) {
            if (part.includes(name)) {
                let ptsL1 = [];
                let ptsR1 = [];
                let ptsC1 = [];
                let ptsL2 = [];
                let ptsR2 = [];
                let ptsC2 = [];
                for (let j in steelBoxDict[part]["points"]) {
                    let pts1 = [];
                    let pts2 = [];
                    if (j == 0) {
                        index1 = 0;
                        index2 = 3;
                    }
                    if (j == 1) {
                        index1 = 0;
                        index2 = 3;
                    }
                    if (j == 2) {
                        index1 = isTop ? 1 : 0;
                        index2 = isTop ? 2 : 3;
                    }
                    for (let i in steelBoxDict[part]["points"][j]) {
                        if (i % sectionPointNum === index1) {
                            let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc
                            pts1.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x })
                            // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        } else if (i % sectionPointNum === index2) {
                            let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc
                            pts2.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x })
                            // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        }

                    }
                    if (j == 0) {
                        ptsL1.push(...pts1)
                        ptsL2.push(...pts2)
                    }
                    if (j == 1) {
                        ptsR1.push(...pts1)
                        ptsR2.push(...pts2)
                    }
                    if (j == 2) {
                        ptsC1.push(...pts1)
                        ptsC2.push(...pts2)
                    }
                }
                if (ptsC1.length === 0) {
                    if (isTop) {
                        meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial))
                    } else {
                        meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial))
                    }

                }
                else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {

                    if (isTop) {
                        if (ptsC1[0].x === ptsR1[ptsL1.length - 1].x && ptsC1[0].y === ptsR1[ptsL1.length - 1].y) {
                            meshes.push(sectionMesh(
                                [...ptsR1, ...ptsC1, ...ptsC2.reverse(), ...ptsR2.reverse()], lineMaterial));
                        } else {
                            meshes.push(sectionMesh(
                                [...ptsC1, ...ptsR1, ...ptsR2.reverse(), ...ptsC2.reverse()], lineMaterial));
                        }
                    } else {
                        if (ptsC1[0].x === ptsL1[ptsL1.length - 1].x && ptsC1[0].y === ptsL1[ptsL1.length - 1].y) {
                            meshes.push(sectionMesh(
                                [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsL2.reverse()], lineMaterial));
                        } else {
                            meshes.push(sectionMesh(
                                [...ptsC1, ...ptsL1, ...ptsL2.reverse(), ...ptsC2.reverse()], lineMaterial));
                        }
                    }
                }
                else if (ptsL1.length === 0 && ptsL1.length === 0) {
                    meshes.push(sectionMesh(
                        [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                }

            }
        }
    }
    return meshes
}


function GeneralPlanView(steelBoxDict, keyNamelist, sectionPointNum, index1, index2, sc, initPoint, r, lineMaterial) { //강박스 일반도 그리기
    // let result = {models:{},layer:color };
    // let index = 1;
    let meshes = [];
    for (let part in steelBoxDict) {
        for (let name of keyNamelist) {
            if (part.includes(name)) {
                let ptsL1 = [];
                let ptsR1 = [];
                let ptsC1 = [];
                let ptsL2 = [];
                let ptsR2 = [];
                let ptsC2 = [];
                for (let j in steelBoxDict[part]["points"]) {
                    let pts1 = [];
                    let pts2 = [];
                    for (let i in steelBoxDict[part]["points"][j]) {
                        if (i % sectionPointNum === index1) {
                            let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc
                            pts1.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x })
                            // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        } else if (i % sectionPointNum === index2) {
                            let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x) * sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y) * sc
                            pts2.push({ x: Math.cos(r) * x - Math.sin(r) * y, y: Math.cos(r) * y + Math.sin(r) * x })
                            // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        }

                    }
                    if (j == 0) {
                        ptsL1.push(...pts1)
                        ptsL2.push(...pts2)
                    }
                    if (j == 1) {
                        ptsR1.push(...pts1)
                        ptsR2.push(...pts2)
                    }
                    if (j == 2) {
                        ptsC1.push(...pts1)
                        ptsC2.push(...pts2)
                    }
                }
                if (ptsC1.length === 0) {
                    meshes.push(sectionMesh([...ptsL1, ...ptsL2.reverse()], lineMaterial))
                    meshes.push(sectionMesh([...ptsR1, ...ptsR2.reverse()], lineMaterial))
                    // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsL1,...ptsL2.reverse()]);
                    // index +=1
                    // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsR1,...ptsR2.reverse()]);
                    // index +=1    
                }

                else if (ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0) {
                    if (ptsC1[0].x === ptsL1[ptsL1.length - 1].x && ptsC1[0].y === ptsL1[ptsL1.length - 1].y) {
                        meshes.push(sectionMesh(
                            [...ptsL1, ...ptsC1, ...ptsC2.reverse(), ...ptsR1.reverse(), ...ptsR2, ...ptsL2.reverse()], lineMaterial));
                    } else {
                        meshes.push(sectionMesh(
                            [...ptsL1.reverse(), ...ptsC1.reverse(), ...ptsC2, ...ptsR1, ...ptsR2.reverse(), ...ptsL2], lineMaterial));
                    }
                }
                else if (ptsL1.length === 0 && ptsL1.length === 0) {
                    meshes.push(sectionMesh(
                        [...ptsC1.reverse(), ...ptsC2], lineMaterial));
                }

            }
        }
    }
    return meshes
}

function roundedRect(x, y, rot, width, height, radius, lineMaterial) { //마크 테두리
    let shape = new THREE.Shape()
    shape.moveTo(-width / 2, -height / 2 + radius);
    shape.lineTo(-width / 2, height / 2 - radius);
    shape.quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2);
    shape.lineTo(width / 2 - radius, height / 2);
    shape.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius);
    shape.lineTo(width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2);
    shape.lineTo(-width / 2 + radius, -height / 2);
    shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2, -height / 2 + radius);
    let points = shape.getPoints();
    let geometry = new THREE.BufferGeometry().setFromPoints(points)
    geometry.rotateZ(rot)
    geometry.translate(x, y, 0)
    // //console.log("geo", geometry)
    return new THREE.Line(geometry, lineMaterial)
}

export function PointToDraw(point, scale, initPoint, rotate, xOffset, yOffset) { //DrawingPointConverter
    let cos = point.normalCos
    let sin = point.normalSin
    let x0 = (point.x - initPoint.x - sin * xOffset - cos * yOffset) * scale;
    let y0 = (point.y - initPoint.y + cos * xOffset - sin * yOffset) * scale;
    return { x: Math.cos(rotate) * x0 - Math.sin(rotate) * y0, y: Math.cos(rotate) * y0 + Math.sin(rotate) * x0 }
}

export function GridMarkView(girderStation, scale, initPoint, rotate, layout, girderIndex) {   //그리드 마크와 보조선 그리기 + 치수선도 포함해서 그릭기

    let redLine = new THREE.LineBasicMaterial({ color: 0xff0000 });
    let redDotLine = new THREE.LineDashedMaterial({ color: 0xff0000, dashSize: 300, gapSize: 100, });
    let geo = new THREE.Geometry();
    let dimgeo = new THREE.Geometry();
    let fontSize = 80;
    let meshes = [];
    let labels = [];
    let rot = 0;

    let dummy0 = {};
    let dummy1 = {};
    let dummy2 = {};
    let dummy3 = {};
    let dummy4 = {};
    let dummy5 = {};
    let sideViewOffset = layout.sideViewOffset * scale;
    let markOffset = layout.gridMarkWidth
    let segLength = 0;
    let totalLength = 0;
    let dummyLength = 0;
    let dummyLength2 = 0;

    // for (let i = 0; i < girderStation.length; i++) {
    let girderLine = [];
    let girderSideLine = [];
    let dimLine = []; //8개, w와 동일한 개수
    // let dimWF = [];
    // 지지선 입력체계 수립필요 2020.5.22 by dr.lim
    let dimName = ["Girder Length", "Splice", "Top Plate", "", "", "Bottom Plate", "Web", "V-Stiffener", ""]
    let w = [1.8 * markOffset, 1.6 * markOffset, 1.4 * markOffset, 1.2 * markOffset, -1.2 * markOffset, -1.4 * markOffset,
    sideViewOffset + 1.6 * markOffset, sideViewOffset + 1.4 * markOffset, sideViewOffset + 1.2 * markOffset];    //dim line 기준점
    w.forEach(function (x) { dimLine.push([]) })
    for (let j = 0; j < girderStation.length; j++) {
        let gridObj = girderStation[j];
        let cos = gridObj.point.normalCos;
        let sin = gridObj.point.normalSin;
        rot = Math.atan2(cos, - sin) + rotate;
        // if (j !== 0) { segLength = splineProp(dummy0, gridObj.point).length };
        // totalLength += segLength;
        totalLength = gridObj.point.girderStation
        // //console.log("totalLength", totalLength)
        dummy0 = gridObj.point;
        girderLine.push(PointToDraw(gridObj.point, scale, initPoint, rotate, 0, 0));
        girderSideLine.push({ x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset, z: 0 })

        for (let k = 0; k < w.length; k++) {
            if (k > 5) {
                dimLine[k].push({ x: (totalLength) * scale, y: w[k] });
            }
            else {
                dimLine[k].push(PointToDraw(gridObj.point, scale, initPoint, rotate, 0, w[k]));
            }
        }
        if (j === 0) {
            let position = PointToDraw(gridObj.point, scale, initPoint, rotate, -500, 0);
            labels.push({
                text: "GIRDER-" + girderIndex + " C.L.",
                anchor: [position.x, position.y, 0],
                rotation: rot,
                fontSize: fontSize * scale
            });
            for (let k = 0; k < w.length; k++) {
                if (dimName[k] !== "") {
                    let anchor = {};
                    let p1 = {};
                    let p2 = dimLine[k][j];
                    if (k > 5) {
                        anchor = { x: dimLine[k][j].x - 1000 * scale, y: dimLine[k][j].y + fontSize * 0.75 };
                        p1 = { x: dimLine[k][j].x - 1000 * scale, y: dimLine[k][j].y };
                    } else {
                        anchor = PointToDraw(gridObj.point, scale, initPoint, rotate, -1000, w[k] + fontSize * 0.75);
                        p1 = PointToDraw(gridObj.point, scale, initPoint, rotate, -1000, w[k]);
                    }
                    dimgeo.vertices.push(
                        new THREE.Vector3(p2.x, p2.y, 0),
                        new THREE.Vector3(p1.x, p1.y, 0));
                    labels.push({
                        text: dimName[k],
                        anchor: [anchor.x, anchor.y, 0],
                        rotation: k > 5 ? 0 : rot,
                        fontSize: fontSize * scale,
                        align: "left"
                    });
                }
            }
        }
        if (j === 0 || j === girderStation.length - 1) { //거더총길이
            dimgeo.vertices.push(
                new THREE.Vector3(dimLine[0][j].x, dimLine[0][j].y, 0),
                new THREE.Vector3(dimLine[1][j].x, dimLine[1][j].y, 0));
        }
        if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP")) {   //현장이음부
            dimgeo.vertices.push(
                new THREE.Vector3(dimLine[1][j].x, dimLine[1][j].y, 0),
                new THREE.Vector3(dimLine[2][j].x, dimLine[2][j].y, 0));
            if (j !== 0) {
                let dimProp = splineProp(dummy1, gridObj.point)
                // //console.log("spline", dimProp,dummy1,gridObj.point)
                let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[1] + fontSize * 0.75)   //fontSize에 대한 값을 scale 적용않고 정의
                labels.push({
                    text: dimProp.length.toFixed(0),
                    anchor: [position.x, position.y, 0],
                    rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                    fontSize: fontSize * scale
                });
            }
            dummy1 = gridObj.point

        }
        if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("TF")) { //상부플렌지 이음
            dimgeo.vertices.push(
                new THREE.Vector3(dimLine[2][j].x, dimLine[2][j].y, 0),
                new THREE.Vector3(dimLine[3][j].x, dimLine[3][j].y, 0));
            if (j !== 0) {
                let dimProp = splineProp(dummy2, gridObj.point)
                let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[2] + fontSize * 0.75)   //fontSize에 대한 값을 scale 적용않고 정의
                labels.push({
                    text: dimProp.length.toFixed(0),
                    anchor: [position.x, position.y, 0],
                    rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                    fontSize: fontSize * scale
                });
            }
            dummy2 = gridObj.point

        }
        if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("BF")) {  //하부플렌지 이음
            dimgeo.vertices.push(
                new THREE.Vector3(dimLine[4][j].x, dimLine[4][j].y, 0),
                new THREE.Vector3(dimLine[5][j].x, dimLine[5][j].y, 0));
            if (j !== 0) {
                let dimProp = splineProp(dummy4, gridObj.point)
                let position = PointToDraw(dimProp.midPoint, scale, initPoint, rotate, 0, w[5] + fontSize * 0.75)   //fontSize에 대한 값을 scale 적용않고 정의
                labels.push({
                    text: dimProp.length.toFixed(0),
                    anchor: [position.x, position.y, 0],
                    rotation: Math.atan2(dimProp.midPoint.normalCos, - dimProp.midPoint.normalSin) + rotate,
                    fontSize: fontSize * scale
                });
            }
            dummy4 = gridObj.point
        }
        if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("SP") || gridObj.key.includes("WF")) {   //웹플렌지 이음
            // let pt1 = { x: totalLength * scale, y: (sideViewOffset + 1.4 * markOffset) * scale, z: 0 }
            dimgeo.vertices.push(
                new THREE.Vector3(dimLine[6][j].x, dimLine[6][j].y, 0),
                new THREE.Vector3(dimLine[7][j].x, dimLine[7][j].y, 0));
            // new THREE.Vector3(totalLength * scale, (sideViewOffset + 1.2 * markOffset) * scale, 0),
            // new THREE.Vector3(pt1.x, pt1.y, pt1.z));
            if (j !== 0) {
                let position = { x: (totalLength + dummyLength) / 2 * scale, y: (w[6] + fontSize * 0.75) * scale }
                labels.push({
                    text: (totalLength - dummyLength).toFixed(0),
                    anchor: [position.x, position.y, 0],
                    rotation: 0,
                    fontSize: fontSize * scale
                });
            }
            dummyLength = totalLength;

        }

        if (j === 0 || j === girderStation.length - 1 || gridObj.key.includes("V") || gridObj.key.includes("D") || gridObj.key.substr(2, 1) === "S"
            && gridObj.key.substr(3, 1) !== "P") {  // 그리드 기호에 대해서 한번 대대적인 수정이 필요할 것으로 판단됨
            dimgeo.vertices.push(//치수선 라벨
                new THREE.Vector3(dimLine[7][j].x, dimLine[7][j].y, 0),
                new THREE.Vector3(dimLine[8][j].x, dimLine[8][j].y, 0));
            if (j !== 0) {
                let position = { x: (totalLength + dummyLength2) / 2 * scale, y: (w[7] + fontSize * 0.75) * scale }
                labels.push({
                    text: (totalLength - dummyLength2).toFixed(0),
                    anchor: [position.x, position.y, 0],
                    rotation: 0,
                    fontSize: fontSize * scale
                });
            }
            dummyLength2 = totalLength;
        }


        if (gridObj.key.substr(2, 1) !== "K" && !gridObj.key.includes("CR")) { //station.substr(0,2)==="G1" && 
        let markTop = 0
        if (gridObj.key.substr(2, 1) === "S" || gridObj.key.substr(2, 1) === "V" || gridObj.key.substr(2, 1) === "D" || gridObj.key.substr(2, 1) === "T" ){
            markTop = 300
        }
            let position = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, markOffset + markTop);
            meshes.push(roundedRect(position.x, position.y, rot, 400 * scale, 200 * scale, 100 * scale, redLine));
            labels.push({
                text: gridObj.key,
                anchor: [position.x, position.y, 0],
                rotation: rot,
                fontSize: fontSize * scale
            });
            let pt1 = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, markOffset + markTop - 100);
            let pt2 = PointToDraw(gridObj.point, scale, initPoint, rotate, 0, - markOffset + 100);
            geo.vertices.push(
                new THREE.Vector3(pt1.x, pt1.y, 0),
                new THREE.Vector3(pt2.x, pt2.y, 0));

            // side View gridMark
            position = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset + (300 + markTop) * scale, z: 0 };
            meshes.push(roundedRect(position.x, position.y, 0, 400 * scale, 200 * scale, 100 * scale, redLine));
            labels.push({
                text: gridObj.key,
                anchor: [position.x, position.y, 0],
                rotation: 0,
                fontSize: fontSize * scale
            });
            pt1 = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset + (200 + markTop) * scale, z: 0 };
            pt2 = { x: totalLength * scale, y: (gridObj.point.z - initPoint.z) * scale + sideViewOffset, z: 0 };
            geo.vertices.push(
                new THREE.Vector3(pt1.x, pt1.y, 0),
                new THREE.Vector3(pt2.x, pt2.y, 0));


        }
    }

    meshes.push(LineMesh(girderLine, redDotLine, 0));
    meshes.push(LineMesh(girderSideLine, redDotLine, 0));
    for (let k = 0; k < w.length; k++) {
        if (dimName[k] !== "") {
            meshes.push(LineMesh(dimLine[k], redLine, 0))
        }
    }
    // meshes.push(LineMesh(dimWF, redLine,0))
    // dimLine.forEach(function (dim) { meshes.push(LineMesh(dim, redLine, 0)) });
    // }
    let segLine = new THREE.LineSegments(geo, redLine);
    segLine.computeLineDistances();
    let dimSegLine = new THREE.LineSegments(dimgeo, redLine);
    meshes.push(segLine);
    meshes.push(dimSegLine);

    return { meshes, labels }
}

// r is rotation angle to radian
export function topDraw(steelBoxDict, hBracing, diaDict, vstiffDict, xbeamDict, gridPoint, initPoint, girderStation) {
    let group = new THREE.Group();
    let layNum = 6;
    const hBracingDict = hBracing.hBracingDict
    const hBracingPlateDict = hBracing.hBracingPlateDict

    let sc = 0.500;
    let r = Math.PI - Math.atan((gridPoint["G1K6"].y - gridPoint["G1K1"].y) / (gridPoint["G1K6"].x - gridPoint["G1K1"].x))
    let aqua = new THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
    let green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
    let topPlate = GeneralPlanView(steelBoxDict, ["TopPlate"], 4, 0, 1, sc, initPoint, r, aqua)
    topPlate.forEach(function (mesh) { group.add(mesh) });
    let webPlate = GeneralPlanView(steelBoxDict, ["LeftWeB", "RightWeB"], 4, 1, 2, sc, initPoint, r, green)
    webPlate.forEach(function (mesh) { group.add(mesh) });
    // let diaphragm = ShapePlanView(diaDict, gridPoint, ["topPlate", "upperTopShape", "leftTopPlateShape"], 0, 1, sc, initPoint, r, green);
    // diaphragm.forEach(function (mesh) { group.add(mesh) });
    let bracingPlate = ShapePlanView(hBracingPlateDict, gridPoint, ["plate"], 0, 1, sc, initPoint, r, green);
    bracingPlate.forEach(function (mesh) { group.add(mesh) });
    // let vStiffner = ShapePlanView(vstiffDict, gridPoint, ["upperframe1", "upperframe2"], 0, 3, sc, initPoint, r, green);
    // vStiffner.forEach(function (mesh) { group.add(mesh) });
    let bracing = GeneralPlanView(hBracingDict, [""], 4, 0, 1, sc, initPoint, r, green);
    bracing.forEach(function (mesh) { group.add(mesh) });

    for (let i in diaDict) {
        for (let key in diaDict[i]) {
            let TopMesh = PartTopMesh(diaDict[i][key], sc, initPoint, r)
            TopMesh.forEach(function (mesh) {
                group.add(mesh)
            });
        }
    }

    for (let i in vstiffDict) {
        for (let key in vstiffDict[i]) {
            let TopMesh = PartTopMesh(vstiffDict[i][key], sc, initPoint, r)
            TopMesh.forEach(function (mesh) {
                group.add(mesh)
            });
        }
    }

    for (let i in xbeamDict) {
        for (let key in xbeamDict[i]) {
            let TopMesh = PartTopMesh(xbeamDict[i][key], sc, initPoint, r)
            TopMesh.forEach(function (mesh) {
                group.add(mesh)
            });
        }
    }



    // let gridMark = GridMarkView(girderStation[0], sc, initPoint, r, 1400)
    // gridMark.meshes.forEach(function (mesh) { group.add(mesh) });
    // group.add(LabelInsert(gridMark.labels, new THREE.MeshBasicMaterial({ color: 0xffffff }), layNum))

    return group
}

export function GirderGeneralDraw1(girderStation, layout) {
    // let layout = {
    //     layer : 5,
    //     scale : 1,
    //     girderOffset : 24000,
    //     gridMarkWidth : 1500,
    // }
    let group = new THREE.Group();
    // let layerNum = 5;
    let scale = layout.scale
    let girderOffset = layout.girderOffset * scale;
    let gridMarkWidth = layout.gridMarkWidth * scale; // unit : mm
    for (let i = 0; i < girderStation.length; i++) {
        let initPoint = girderStation[i][0].point
        let endPoint = girderStation[i][girderStation[i].length - 1].point
        let rotate = Math.PI - Math.atan((endPoint.y - initPoint.y) / (endPoint.x - initPoint.x))
        let gridMark = GridMarkView(girderStation[i], scale, initPoint, rotate, layout, i + 1)
        gridMark.meshes.forEach(function (mesh) {
            mesh.position.set(0, -i * girderOffset, 0);
            group.add(mesh);
        }); 
        let label = LabelInsert(gridMark.labels, new THREE.MeshBasicMaterial({ color: 0xffffff }), layout.layer)
        label.position.set(0, -i * girderOffset, 0);
        group.add(label)
    }
    return group
}

export function XbeamSection(xbeamDict, girderStation, layout) {
    let group = new THREE.Group();
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
    let scale = layout.scale;
    let girderOffset = layout.girderOffset * scale;  //24000;
    let sideViewOffset = layout.sideViewOffset * scale; // -8000 * scale;
    let sectionViewOffset = layout.sectionViewOffset * scale;; 
    let initZ = [];
    let supportNum = layout.supportNum; //3; // layout 변수안에서 자동계산되어야 함. 
    let xoffset = 20000;
    let girderNum = layout.girderNum; //girderStation.length // layout 변수안에서 자동계산되어야 함. 

    for (let j = 0; j < supportNum; j++) {
        for (let i = 0; i < girderNum; i++) {
            let girderPoint = girderStation[i].find(obj => obj.key.includes("G" + (i + 1) + "S" + (j + 1)))
            if (i === 0) { initZ.push(girderPoint.point.z) }
        }
    }

    for (let j = 0; j < supportNum; j++) {
        for (let i = 0; i < girderNum - 1; i++) {
            let key = ("G" + (i + 1) + "S" + (j + 1)) + "G" + (i + 2) + "S" + (j + 1)
            if (xbeamDict[key]) {
                let centerPoint
                for (let k in xbeamDict[key]) {
                    if (xbeamDict[key][k].point.offset) {
                        centerPoint = xbeamDict[key][k].point
                        break;
                    }
                }
                let meshes = DiaSectionMesh(xbeamDict[key], lineMaterial);
                meshes.forEach(function (mesh) {
                    mesh.translateX(centerPoint.offset + j * xoffset);
                    mesh.translateY(sectionViewOffset + centerPoint.z - initZ[j]);
                    // position.set(offset + j * xoffset, sectionViewOffset + girderPoint.point.z - initZ[j], 0)
                    group.add(mesh)
                })

            }
        }
    }
    return group
}




export function PartGeneralDraw(diaDict, girderStation, layout) {
    
    let group = new THREE.Group();
    // let layerNum = 5;
        // let layout = {
    //     layer : 5,
    //     scale : 1,
    //     girderOffset : 24000,
    //     sideViewOffset : -8000,
    //     sectionViewOffset : 16000
    //     gridMarkWidth : 1500,
    // }
    let scale = layout.scale; //layout.scale
    let girderOffset = layout.girderOffset * scale;
    let sideViewOffset = layout.sideViewOffset * scale;
    let sectionViewOffset = layout.sectionViewOffset * scale;
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
    let initPoint = [];
    let endPoint = [];
    let rotate = [];
    // let boltlocate = [];

    for (let i in girderStation) {
        initPoint.push(girderStation[i][0].point)
        endPoint.push(girderStation[i][girderStation[i].length - 1].point)
        rotate.push(Math.PI - Math.atan((endPoint[i].y - initPoint[i].y) / (endPoint[i].x - initPoint[i].x)))
    }

    let initZ = [];
    let supportNum = layout.supportNum; // layout 변수안에서 자동계산되어야 함. 
    let xoffset = 20000;
    let girderNum = layout.girderNum // layout 변수안에서 자동계산되어야 함. 

    for (let j = 0; j < supportNum; j++) {
        for (let i = 0; i < girderNum; i++) {
            let girderPoint = girderStation[i].find(obj => obj.key.includes("G" + (i + 1) + "S" + (j + 1)))
            if (i === 0) { initZ.push(girderPoint.point.z) }
            let offset = girderPoint.point.offset
            if (diaDict[girderPoint.key]) {
                let diaMesh = DiaSectionMesh(diaDict[girderPoint.key], lineMaterial)
                diaMesh.forEach(function (mesh) {
                    mesh.translateX(offset + j * xoffset);
                    mesh.translateY(sectionViewOffset + girderPoint.point.z - initZ[j]);
                    // position.set(offset + j * xoffset, sectionViewOffset + girderPoint.point.z - initZ[j], 0)
                    group.add(mesh)
                })
            }
        }
    }



    for (let i in diaDict) {
        for (let key in diaDict[i]) {
            let index = i.substr(1, 1) * 1 - 1; //거더번호

            let TopMesh = PartTopMesh(diaDict[i][key], scale, initPoint[index], rotate[index])
            TopMesh.forEach(function (mesh) {
                mesh.translateY(-index * girderOffset)
                group.add(mesh)
            });

            let sideMesh = PartSideMesh(diaDict[i][key], scale, initPoint[index])
            sideMesh.forEach(function (mesh) {
                mesh.translateY(sideViewOffset - index * girderOffset)
                group.add(mesh)
            });
        }
    }
    return group
}

export function PartTopMesh(Part, scale, initPoint, rotate) {
    let meshes = [];
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
    let green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
    let red = new THREE.MeshBasicMaterial({ color: 0xff0000 });   // white 0xffffff

    // let index = i.substr(1, 1) * 1 - 1; //거더번호
    // let rotationY = Part.rotationY;
    let centerPoint = Part.point;
    let cos = Math.cos(Part.rotationY)
    let cosx = Math.cos(Part.rotationX)
    if (Part.topView) {
        let newPt = [];
        Part.topView.forEach(function (pt) {
            let x = (pt.x - initPoint.x) * scale
            let y = (pt.y - initPoint.y) * scale
            newPt.push({ x: Math.cos(rotate) * x - Math.sin(rotate) * y, y: Math.cos(rotate) * y + Math.sin(rotate) * x })
        })
        let mesh = sectionMesh(newPt, green)
        meshes.push(mesh);
        // }
    }
    if (Part.bolt) {
        if (Part.bolt.isUpper === false) { //복부에 위치하는 볼트의 경우 모두 상단기준면임을 근거로 함. 2020.7.7 by drlim
            let boltDia = Part.bolt.dia;
            let circle = new THREE.EllipseCurve(0, 0, boltDia / 2, boltDia / 2);
            let cp = circle.getPoints(16);
            let circlegeo = new THREE.Geometry().setFromPoints(cp);
            // if (Part.bolt.isUpper === false) { //복부에 위치하는 볼트의 경우 모두 상단기준면임을 근거로 함. 2020.7.7 by drlim
            let rot = Math.atan2(centerPoint.normalCos, - centerPoint.normalSin) + rotate;
            let lcos = Math.cos(rot);
            let lsin = Math.sin(rot);
            let pts = [];
            let newPt = [];
            let points = [];
            for (let k in Part.bolt.layout) {
                let x = Part.bolt.layout[k][0];
                let y = Part.bolt.layout[k][1];
                let gpt = ToGlobalPoint(centerPoint, { x: x * cos, y: 0 })
                let th = y * cosx;
                let dx = centerPoint.normalSin * th;
                let dy = centerPoint.normalCos * th;
                pts.push({ x: gpt.x - dx, y: gpt.y + dy })
            }
            pts.forEach(function (pt) {
                let x = (pt.x - initPoint.x) * scale
                let y = (pt.y - initPoint.y) * scale
                newPt.push({ x: Math.cos(rotate) * x - Math.sin(rotate) * y, y: Math.cos(rotate) * y + Math.sin(rotate) * x })
            })
            newPt.forEach(function (pt) {
                points.push({ x: pt.x + (lcos * boltDia) * scale, y: pt.y + (lsin * boltDia) * scale });
                points.push({ x: pt.x - (lcos * boltDia) * scale, y: pt.y - (lsin * boltDia) * scale });
                points.push({ x: pt.x - (lsin * boltDia) * scale, y: pt.y + (lcos * boltDia) * scale });
                points.push({ x: pt.x + (lsin * boltDia) * scale, y: pt.y - (lcos * boltDia) * scale });
            })
            newPt.forEach(function (pt) {
                let boltCircle = new THREE.Line(circlegeo, green);
                boltCircle.position.set(pt.x, pt.y, 0);
                meshes.push(boltCircle)
            })
            let mesh = LineSegMesh(points, red, 0)
            meshes.push(mesh)
        }
    }
    return meshes
}

export function PartSideMesh(Part, scale, initPoint, rotate) {
    let meshes = [];
    // let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
    let green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
    let red = new THREE.MeshBasicMaterial({ color: 0xff0000 });   // white 0xffffff
    let rotationY = Part.rotationY;
    let centerPoint = Part.point;
    // let cos = Math.cos(Part.rotationY)
    // let cosx = Math.cos(Part.rotationX)

    if (Part.sideView) {
        let newPt = [];
        Part.sideView.forEach(function (pt) {
            let x = (pt.x) * scale
            let y = (pt.y - initPoint.z) * scale
            newPt.push({ x, y });
        })
        let mesh = sectionMesh(newPt, green)
        // mesh.position.set(0, sideViewOffset - index * girderOffset, 0);
        meshes.push(mesh)

        if (Part.bolt) {
            let boltDia = Part.bolt.dia;
            let circle = new THREE.EllipseCurve(0, 0, boltDia / 2, boltDia / 2);
            let cp = circle.getPoints(16);
            let circlegeo = new THREE.Geometry().setFromPoints(cp);

            if (rotationY > Math.PI / 4 || rotationY < -Math.PI / 4) {
                // let dz = 0
                let points = [];
                // if (typeof side2D === "number") { dz = side2D } // 해당내용은 실행이 안될수밖에 없음
                let X = (centerPoint.girderStation) * scale;
                let Y = ((Part.sideView[0].y + Part.sideView[2].y) / 2 - initPoint.z) * scale;
                for (let k in Part.bolt.layout) {
                    let y = Part.bolt.layout[k][0];
                    let x = Part.bolt.layout[k][1];
                    points.push({ x: X + (x + boltDia) * scale, y: Y + (y * Math.sin(rotationY)) * scale });
                    points.push({ x: X + (x - boltDia) * scale, y: Y + (y * Math.sin(rotationY)) * scale });
                    points.push({ x: X + (x) * scale, y: Y + (y * Math.sin(rotationY) + boltDia) * scale });
                    points.push({ x: X + (x) * scale, y: Y + (y * Math.sin(rotationY) - boltDia) * scale });
                    let boltCircle = new THREE.Line(circlegeo, green);
                    boltCircle.position.set(X + x * scale, Y + (y * Math.sin(rotationY)) * scale, 0);
                    meshes.push(boltCircle)
                }
                let mesh = LineSegMesh(points, red, 0)
                meshes.push(mesh)
            }
        }
    }

    return meshes
}

export function GirderGeneralDraw2(sectionPointDict, girderStation, steelBoxDict, deckPointDict, layout) {
    
    let group = new THREE.Group();
    // let layerNum = 5;
        // let layout = {
    //     layer : 5,
    //     scale : 1,
    //     girderOffset : 24000,
    //     sideViewOffset : -8000,
    //     sectionViewOffset : 16000
    //     gridMarkWidth : 1500,
    // }
    let scale = layout.scale;
    let girderOffset = layout.girderOffset * scale;
    let sideViewOffset = layout.sideViewOffset * scale;
    let sectionViewOffset = layout.sectionViewOffset * scale;
    // let gridMarkWidth = layout.gridMarkWidth * scale; // unit : mm

    let aqua = new THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
    let green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff
    let white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let magenta = new THREE.MeshBasicMaterial({ color: 0xff00ff });

    for (let i = 0; i < girderStation.length; i++) {
        let initPoint = girderStation[i][0].point
        let endPoint = girderStation[i][girderStation[i].length - 1].point
        let rotate = Math.PI - Math.atan((endPoint.y - initPoint.y) / (endPoint.x - initPoint.x))
        let topPlate = GeneralPlanView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "TopPlate"], 4, 0, 1, scale, initPoint, rotate, aqua)
        topPlate.forEach(function (mesh) {
            mesh.position.set(0, -i * girderOffset, 0);
            group.add(mesh)
        });
        let webPlate = WebPlanView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "LeftWeB", "G" + (i + 1).toFixed(0) + "RightWeB"], 4, true, scale, initPoint, rotate, green)
        webPlate.forEach(function (mesh) {
            mesh.position.set(0, -i * girderOffset, 0);
            group.add(mesh)
        });
        let Urib = GeneralPlanView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "uRib"], 4, 0, 3, scale, initPoint, rotate, magenta)
        Urib.forEach(function (mesh) {
            mesh.position.set(0, -i * girderOffset, 0);
            group.add(mesh)
        });



        let topSide = GirderSideView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "TopSide"], 2, 0, 1, scale, initPoint, aqua)
        topSide.forEach(function (mesh) {
            mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
            group.add(mesh)
        });
        let bottomSide = GirderSideView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "BottomSide"], 2, 0, 1, scale, initPoint, aqua)
        bottomSide.forEach(function (mesh) {
            mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
            group.add(mesh)
        });
        let webSide = GirderSideView(steelBoxDict, ["G" + (i + 1).toFixed(0) + "WebSide"], 2, 0, 1, scale, initPoint, aqua)
        webSide.forEach(function (mesh) {
            mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
            group.add(mesh)
        });

        let girderSection = GirderSectionView(deckPointDict, sectionPointDict, girderStation, scale, sectionViewOffset);
        girderSection.meshes.forEach(function (mesh) {
            // mesh.position.set(0, sideViewOffset - i * girderOffset, 0);
            group.add(mesh)
        });
        group.add(LabelInsert(girderSection.labels, white, layout.layer));
        // let gridMark = GridMarkView(girderStation[i], scale, initPoint, rotate, layout, i + 1)
        // gridMark.meshes.forEach(function (mesh) {
        //     mesh.position.set(0, -i * girderOffset, 0);
        //     group.add(mesh);
        // });
        // let label = LabelInsert(gridMark.labels, white, layout.layer)
        // label.position.set(0, -i * girderOffset, 0);
        // group.add(label)
    }
    return group
}

// export function sideDraw(steelBoxDict, hBracing, diaDict, vstiffDict, gridPoint, initPoint) {
//     let group = new THREE.Group();

//     const hBracingDict = hBracing.hBracingDict
//     const hBracingPlateDict = hBracing.hBracingPlateDict

//     let sc = 0.500;
//     let r = Math.PI - Math.atan((gridPoint["G1K6"].y - gridPoint["G1K1"].y) / (gridPoint["G1K6"].x - gridPoint["G1K1"].x))
//     let aqua = new THREE.MeshBasicMaterial({ color: 0x00ffff });   // white 0xffffff
//     let green = new THREE.MeshBasicMaterial({ color: 0x00ff00 });   // white 0xffffff


//     // let side = GeneralSideView(steelBoxDict, ["G1LeftWeB"], 4, 0, 1, sc, initPoint, r, aqua)
//     // side.forEach(function (mesh) { group.add(mesh) });

//     let textMesh;
//     let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
//     let label = [];

//     var loader = new THREE.FontLoader();
//     loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
//         // //console.log(font)
//         // var font = {generateShapes:(messagem , num)=>{}}
//         for (let i in label) {
//             var shapes = font.generateShapes(label[i].text, label[i].fontSize);
//             var geometry = new THREE.ShapeBufferGeometry(shapes);
//             var xMid
//             geometry.computeBoundingBox();
//             xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
//             geometry.translate(xMid, -label[i].fontSize / 2, 0);
//             if (label[i].rotation) {
//                 geometry.rotateZ(label[i].rotation)
//             }
//             geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
//             // make shape ( N.B. edge view not visible )
//             textMesh = new THREE.Mesh(geometry, textMaterial);
//             textMesh.layers.set(1)
//             group.add(textMesh);
//         }
//         // text.position.z = 0;
//     });

//     return group
// }




export function LineMesh(point0, lineMaterial, z) {
    let points = []
    let z1 = z ? z : 0;
    for (let i in point0) {
        points.push(new THREE.Vector3(point0[i].x, point0[i].y, z1))
    }
    let geometry = new THREE.Geometry().setFromPoints(points)
    let result = new THREE.Line(geometry, lineMaterial)
    result.computeLineDistances();
    return result
}

export function LineSegMesh(point0, lineMaterial, z) {
    let points = []
    let z1 = z ? z : 0;
    for (let i in point0) {
        points.push(new THREE.Vector3(point0[i].x, point0[i].y, z1))
    }
    let geometry = new THREE.Geometry().setFromPoints(points)
    let result = new THREE.LineSegments(geometry, lineMaterial)
    result.computeLineDistances();
    return result
}


function sectionMesh(point0, lineMaterial) {
    let points = []
    for (let i in point0) {
        points.push(new THREE.Vector3(point0[i].x, point0[i].y, 0))
    }
    let geometry = new THREE.Geometry().setFromPoints(points)
    return new THREE.LineLoop(geometry, lineMaterial)
}

export function GirderSectionView(deckPointDict, sectionPointDict, girderStation, scale, yoffset) {
    let meshes = [];
    let labels = []
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
    let xoffset = 20000;
    let initZ = [];
    let girderNum = girderStation.length
    let deck = deckPointDict.filter(obj => obj.key.includes("CRS"))
    let spanNum = deck.length
    let dims = [];

    // let section = { "uflange": [[], [], []], "lflange": [[], [], []], "web": [[], [], []], "deck": [[], [], []] }
    for (let j = 0; j < spanNum; j++) {
        let webDim = [];
        let heightDim = [];
        for (let i = 0; i < girderNum; i++) {
            let girderPoint = girderStation[i].find(obj => obj.key.includes("G" + (i + 1) + "S" + (j + 1)))
            if (i === 0) { initZ.push(girderPoint.point.z) }
            let offset = girderPoint.point.offset
            let sectionPoint = sectionPointDict[girderPoint.key]
            for (let key in sectionPoint.forward) {
                if (key === "uflange" || key === "lflange" || key === "web" || key === "URib" || key === "LRib") {
                    // //console.log("check",sectionPoint)
                    for (let k in sectionPoint.forward[key]) {
                        if (sectionPoint.forward[key][k].length > 0) {
                            let pts = [];
                            sectionPoint.forward[key][k].forEach(pt => pts.push(
                                { x: pt.x + offset + j * xoffset, y: pt.y + yoffset + girderPoint.point.z - initZ[j] }))
                            meshes.push(sectionMesh(pts, lineMaterial))
                            if (key === "web") {
                                webDim.push(pts[1]);
                                heightDim = [pts[0], pts[1]]
                            }
                        }
                    }
                }
            }
            let gpt = { x: offset + j * xoffset, y: yoffset + girderPoint.point.z - initZ[j] - deck[j].slabHeight }
            dims.push(Dimension([heightDim[0], gpt], 1, 1, 1, false, false, 0))

        }
        let deckPt = [];
        deck[j].deckSectionPoint.forEach(pt => deckPt.push({ x: pt.x + j * xoffset, y: pt.y + yoffset - initZ[j] }))
        meshes.push(sectionMesh(deckPt, lineMaterial))

        dims.push(Dimension([deckPt[1], ...webDim, deckPt[3]], 0, 1, 1, true, true, 0))
        dims.push(Dimension([deckPt[1], deckPt[2], deckPt[3]], 0, 1, 1, true, true, 1))
        dims.push(Dimension([deckPt[1], deckPt[3]], 0, 1, 1, true, true, 2))
        dims.push(Dimension([deckPt[0], deckPt[1]], 0, 1, 1, false, false, 1))
        // dims.push(Dimension([heightDim[0], heightDim[1]], 0, 1, 1, false, true,1)) // 각 거더별 형고를 표현해야 하는데, 웹의 높이 출력
    }
    for (let i in dims) {
        meshes.push(...dims[i].meshes);
        labels.push(...dims[i].labels);
    }
    return { meshes, labels }
}


export function sectionView(sectionName, sectionPoint, diaPoint) { //횡단면도
    // var makerjs = require('makerjs');
    let sc = 1;
    // let sections = {models:{ }};
    // let captions = { models: {} };
    // let weldings = { models: {} };
    let titlePosition = 1000;
    let titleSize = 100;
    let labelSize = 50;
    // let group = []
    let group = new THREE.Group();
    let label = [];
    let weldings = [];

    let textMesh;
    let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });   // white 0xffffff
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00
    // let red = new THREE.LineBasicMaterial({ color: 0xff0000 });    // green 0x00ff00
    // let green = new THREE.LineBasicMaterial({ color: 0x00ff00 });    // green 0x00ff00

    label.push({    //sectiontitle
        text: sectionName,
        anchor: [0, titlePosition, 0],
        fontSize: titleSize
    })

    let circle = new THREE.EllipseCurve(0, titlePosition, titleSize * 2.5, titleSize * 2.5);
    let cp = circle.getPoints(16);
    let circlegeo = new THREE.Geometry().setFromPoints(cp);
    let titleCircle = new THREE.Line(circlegeo, lineMaterial);
    group.add(titleCircle)

    for (var key in sectionPoint) {
        if (key === "uflange" || key === "lflange" || key === "web" || key === "URib" || key === "LRib") {
            // //console.log("check",sectionPoint)
            for (let k in sectionPoint[key]) {
                if (sectionPoint[key][k].length > 0) {
                    group.add(sectionMesh(sectionPoint[key][k], lineMaterial))
                }
            }
        }
        // if (sectionPoint[key].constructor === Array) {
        //     group.add(sectionMesh(sectionPoint[key], lineMaterial))
        // }
    }

    let diaMesh = DiaSectionMesh(diaPoint, lineMaterial)
    diaMesh.forEach(mesh => group.add(mesh));

    //     if (diaPoint[key].size) {
    //         label.push({
    //             text: diaPoint[key].size.Label,
    //             anchor: [(diaPoint[key].anchor[0][0] + diaPoint[key].anchor[1][0]) / 2, (diaPoint[key].anchor[0][1] + diaPoint[key].anchor[1][1]) / 2, 0],
    //             rotation: Math.atan((diaPoint[key].anchor[1][1] - diaPoint[key].anchor[0][1]) / (diaPoint[key].anchor[1][0] - diaPoint[key].anchor[0][0])),
    //             fontSize: labelSize
    //         })
    //     }
    //     if (diaPoint[key].welding) {
    //         for (let i in diaPoint[key].welding) {
    //             weldings.push(weldingMark(diaPoint[key].welding[i], 0.8, sc, 200, true, true, false, false))
    //         }
    //     }
    let dims = [];
    if (sectionPoint.uflange[0].length >0){
        dims.push(Dimension([sectionPoint.uflange[0][0], sectionPoint.uflange[1][0]], 0, sc, 1, true, true, 2))   //top1
        dims.push(Dimension([sectionPoint.uflange[0][0], sectionPoint.uflange[0][1], sectionPoint.uflange[1][1], sectionPoint.uflange[1][0]], 0, sc, 1, true, true, 1)) //top2
    } else {
        dims.push(Dimension([sectionPoint.uflange[2][0], sectionPoint.uflange[2][1]], 0, sc, 1, true, true, 1))   //top1
    }
    dims.push(Dimension([sectionPoint.web[1][0], sectionPoint.web[1][1]], 1, sc, 1, false, true, 2)) //right1
    // dims.push(Dimension([sectionPoint.rWeb[0], diaPoint.lowerTopShape.points[3], diaPoint.lowerTopShape.points[2], diaPoint.rightTopPlateShape.points[3], diaPoint.rightTopPlateShape.points[0], sectionPoint.rWeb[1]], 5, sc, 1, false, true, 1)) //right2
    dims.push(Dimension([sectionPoint.web[0][0], sectionPoint.web[0][1]], 1, sc, 1, false, false, 2)) //left1
    // dims.push(Dimension([sectionPoint.lWeb[0], diaPoint.lowerTopShape.points[0], diaPoint.lowerTopShape.points[1], diaPoint.leftTopPlateShape.points[3], diaPoint.leftTopPlateShape.points[0], sectionPoint.lWeb[1]], 5, sc, 1, false, false, 1)) // left2
    
    if (sectionPoint.lflange[0].length > 0){
        dims.push(Dimension([sectionPoint.lflange[0][0], sectionPoint.lflange[1][0]], 0, sc, 1, true, false, 3)) //botoom2
        dims.push(Dimension([sectionPoint.lflange[0][0], sectionPoint.web[0][0], sectionPoint.web[1][0], sectionPoint.lflange[1][0]], 0, sc, 1, true, false, 2)) //bottom1
        dims.push(Dimension([sectionPoint.lflange[0][0], sectionPoint.lflange[0][1], sectionPoint.lflange[1][1], sectionPoint.lflange[1][0]], 0, sc, 1, true, false, 1)) //botoom2
    } else {
        dims.push(Dimension([sectionPoint.lflange[2][0], sectionPoint.web[0][0], sectionPoint.web[1][0], sectionPoint.lflange[2][1]], 0, sc, 1, true, false, 1)) //bottom1
        dims.push(Dimension([sectionPoint.lflange[2][0], sectionPoint.lflange[2][1]], 0, sc, 1, true, false, 2)) //botoom2
    }
    // // layer coloers : aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow

    for (let i in dims) {
        dims[i].meshes.forEach(function (mesh) { group.add(mesh) })
        dims[i].labels.forEach(function (elem) { label.push(elem) })
    }
    // for (let i in weldings) {
    //     weldings[i].meshes.forEach(function (mesh) { group.add(mesh) })
    //     weldings[i].labels.forEach(function (elem) { label.push(elem) })
    // }

    group.add(LabelInsert(label, textMaterial, 1))  //layer number is 1
    return group
}


function DiaSectionMesh(diaPoint, lineMaterial) {
    let boltSize = 22; // 추후 외부에서 가져와야함, 20200708 by drlim 
    let boltcircle = new THREE.EllipseCurve(0, 0, boltSize / 2, boltSize / 2);
    let boltcp = boltcircle.getPoints(16);
    let boltcirclegeo = new THREE.Geometry().setFromPoints(boltcp);


    let red = new THREE.LineBasicMaterial({ color: 0xff0000 });    // green 0x00ff00
    let green = new THREE.LineBasicMaterial({ color: 0x00ff00 });    // green 0x00ff00

    let meshes = []
    let pts = [];
    let points = [];
    for (var key in diaPoint) {
        if (diaPoint[key].points2D) {
            meshes.push(sectionMesh(diaPoint[key].points2D, lineMaterial))
            if (diaPoint[key].bolt && diaPoint[key].rotationX === Math.PI / 2) {
                let cp = { x: (diaPoint[key].points2D[0].x + diaPoint[key].points2D[2].x) / 2, y: (diaPoint[key].points2D[0].y + diaPoint[key].points2D[2].y) / 2 }
                for (let k in diaPoint[key].bolt.layout) {
                    let x = diaPoint[key].bolt.layout[k][0];
                    let y = diaPoint[key].bolt.layout[k][1];
                    pts.push({ x: cp.x + x, y: cp.y + y })
                }
            }
        }
        if (diaPoint[key].hole) {
            meshes.push(sectionMesh(diaPoint[key].hole, lineMaterial))
        }
    }
    pts.forEach(function (pt) {
        points.push({ x: pt.x + (boltSize), y: pt.y });
        points.push({ x: pt.x - (boltSize), y: pt.y });
        points.push({ x: pt.x, y: pt.y + (boltSize) });
        points.push({ x: pt.x, y: pt.y - (boltSize) });
        let boltCircle = new THREE.Line(boltcirclegeo, green);
        boltCircle.position.set(pt.x, pt.y, 0)
        // boltCircle.translateX(pt.x)
        // boltCircle.translateY(pt.y)
        meshes.push(boltCircle)

    })
    let mesh = LineSegMesh(points, red, 0)
    meshes.push(mesh)
    return meshes
}


// 치수선 생성 프로그램 선, caption으로 구성해야할 듯함
// 다수의 포인트(points)의 연속된 치수선을 생성하는 모듈
function Dimension(points, index, scale, valueScale, isHorizontal, isTopOrRight, offsetIndex) {
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    let sign = (isTopOrRight) ? 1 : -1
    // let dim = {models:{}, paths:{}}
    let add = 200 * scale * sign;
    let fontSize = 80 * scale
    let extend = 20 * scale * sign
    let offset = offsetIndex * 200 * scale * sign + 20 * scale * sign
    // dim.layer = "red"
    let meshes = [];
    let labels = [];
    if (isHorizontal) {
        for (var key in points) {
            meshes.push(LineMesh([{ x: points[key].x, y: points[index].y + offset }, { x: points[key].x, y: points[index].y + add + offset + extend }], lineMaterial))
        }
        for (let i = 0; i < points.length - 1; i++) {
            meshes.push(LineMesh([{ x: points[i].x, y: points[index].y + add + offset }, { x: points[i + 1].x, y: points[index].y + add + offset }], lineMaterial))
            let value = valueScale * (Math.abs(points[i + 1].x - points[i].x))
            labels.push({
                text: value.toFixed(0),
                anchor: [(points[i].x + points[i + 1].x) / 2, points[index].y + add + offset + fontSize, 0],
                rotation: 0,
                fontSize: fontSize
            })
        }
    } else {
        for (var key in points) {
            meshes.push(LineMesh([{ x: points[index].x + offset, y: points[key].y }, { x: points[index].x + add + offset + extend, y: points[key].y }], lineMaterial))
        }
        for (let i = 0; i < points.length - 1; i++) {
            meshes.push(LineMesh([{ x: points[index].x + add + offset, y: points[i].y }, { x: points[index].x + add + offset, y: points[i + 1].y }], lineMaterial))
            let value = valueScale * (Math.abs(points[i + 1].y - points[i].y))
            labels.push({
                text: value.toFixed(0),
                anchor: [points[index].x + add + offset - fontSize, (points[i].y + points[i + 1].y) / 2, 0],
                rotation: Math.PI / 2,
                fontSize: fontSize
            })
        }
    }
    return { meshes, labels }
}

// locate is 0 to 1 relative point of welding line
function weldingMark(weldingObject, locate, scale, distance, isUpper, isRight, isXReverse, isYReverse) {
    // let welding = {models:{}, paths:{},caption:{},layer:'red'}
    // const sc = scale
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    let linelength = []

    let fontSize = 50 * scale
    let dummy
    let totallength = 0
    let point = {}
    let meshes = [];
    let labels = [];

    for (let i = 0; i < weldingObject.Line.length - 1; i++) {
        dummy = PointLength(weldingObject.Line[i], weldingObject.Line[i + 1])
        totallength += dummy
        linelength.push(totallength)
    }
    for (let i = 0; i < linelength.length; i++) {
        if (linelength[i] / totallength >= locate) {
            point['x'] = ((1 - locate) * weldingObject.Line[i].x + locate * weldingObject.Line[i + 1].x)
            point['y'] = ((1 - locate) * weldingObject.Line[i].y + locate * weldingObject.Line[i + 1].y)
            break;
        }
    }
    let xsign = isRight ? 1 : -1;
    let ysign = isUpper ? 1 : -1;
    let xsign2 = isXReverse ? - 1 : 1;
    let ysign2 = isYReverse ? -1 : 1;
    let point0 = { x: point.x, y: point.y }
    let point1 = { x: point0.x + (xsign * xsign2 * distance * 0.25), y: point0.y + (ysign * ysign2 * distance * 0.25) }
    let point2 = { x: point1.x + (xsign * distance * 0.75), y: point1.y + (ysign * distance * 0.75) }
    let point3 = { x: point2.x + (250), y: point2.y }
    meshes.push(LineMesh([point0, point1], lineMaterial))
    meshes.push(LineMesh([point1, point2], lineMaterial))
    meshes.push(LineMesh([point2, point3], lineMaterial))
    meshes.push(LineMesh([{ x: point.x + xsign * xsign2 * 30, y: point.y + ysign * ysign2 * 50 }, point0], lineMaterial))
    meshes.push(LineMesh([{ x: point.x + xsign * xsign2 * 50, y: point.y + ysign * ysign2 * 30 }, point0], lineMaterial))

    if (weldingObject.type === "FF") {
        meshes.push(LineMesh([{ x: point2.x + (100), y: point2.y + (50) }, { x: point2.x + (100), y: point2.y - (50) }], lineMaterial))
        meshes.push(LineMesh([{ x: point2.x + (100), y: point2.y + (50) }, { x: point2.x + (150), y: point2.y }], lineMaterial))
        meshes.push(LineMesh([{ x: point2.x + (100), y: point2.y - (50) }, { x: point2.x + (150), y: point2.y }], lineMaterial))
    }
    // else if (weldingObject.type==="F"){
    //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
    //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1] - (50)*sc],[point2[0] + (150)*sc,point2[1]])
    // }
    // else if (weldingObject.type==="K"){
    //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
    //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
    // }
    // else if (weldingObject.type==="V"){
    //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
    //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
    // }
    labels.push({
        text: weldingObject.value1.toFixed(0),
        anchor: [point2.x + 50, point2.y - 50, 0],
        rotation: 0,
        fontSize: fontSize
    })
    return { meshes, labels }
}

