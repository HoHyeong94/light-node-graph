import { ToGlobalPoint3D } from "../geometryModule"
import { DiaShapeDict } from "../stiffner/module"
const girderPoint = {
    "G1P0": { x: 0, y: 0, z: 2000, normalCos: 1, normalSin: 0 }, // masterStationNumber, girderStation이 없어서 toglobalPoint 함수에서 에러 발생여부 파악 그리고 예외처리
    "G1P1": { x: 0, y: 40000, z: 2000, normalCos: 1, normalSin: 0 },
}

const shapeData = [
    // [pointName, h1, h2, h3, h4, h5, l1, l2, l3] 순서주의
    ["G1P0", 160, 100, 920, 120, 200, 240, 230, 330],
    ["G1P1", 160, 100, 920, 120, 200, 240, 230, 330],
]

export function GirderPointGen(pointData) {
    let result = {}
    for (let i in pointData) {
        // let [name, benchmark, offset] = pointData[i];
        if (pointData[i][0]) {
            result[pointData[i][0]] = { x: 0, y: pointData[i][2], z: 2000, normalCos: 1, normalSin: 0 }
        }
    }
    return result
}

export function IGirderSection(pointDict, shapeData) {
    let model = { "girder": { "points": [], "ptGroup": [], "cap": false } };
    let slabThickness = 300; //슬래브두께 + 헌치 + 포장두께

    const girderPoint = {
        "G1S1": { x: 0, y: 0, z: 2000, normalCos: 1, normalSin: 0 }, // masterStationNumber, girderStation이 없어서 toglobalPoint 함수에서 에러 발생여부 파악 그리고 예외처리
        "G1S2": { x: 0, y: 30000, z: 2000, normalCos: 1, normalSin: 0 },
    }
    const endShape = {
        b0: 600,
        b1: 500,
        h0: 1400,
        h1: 1300,
        d: 200
    }
    const tendon = [{ x: 0, y: 1125, h: 300, alpha: 7 },
    { x: 0, y: 750, h: 300, alpha: 5 },
    { x: 0, y: 375, h: 300, alpha: 2 },]


    let tanX = (endShape.b0 - endShape.b1) / endShape.d / 2;
    let tendonRegionL = [];
    let tendonRegionR = [];
    let k = tendon.length - 1;
    let upperZ = 0;
    let cp = pointDict[shapeData[0][0]];
    let [name, h1, h2, h3, h4, h5, l1, l2, l3] = shapeData[0];
    let bottomY = -slabThickness - h1 - h2 - h3 - h4 - h5;

    for (let i = 0; i < tendon.length; i++) {
        let rad = tendon[i].alpha * Math.PI / 180
        let dz = [- tendon[i].h / 2 * Math.tan(rad), tendon[i].h / 2 * Math.tan(rad)]
        if (i === 0) {
            tendonRegionL.push(ToGlobalPoint3D(cp, { x: - endShape.b1 / 2 - dz[0] * tanX, y: -slabThickness, z: dz[0] }));
            tendonRegionR.push(ToGlobalPoint3D(cp, { x: endShape.b1 / 2 + dz[0] * tanX, y: -slabThickness, z: dz[0] }));
            upperZ = dz[0];
        }
        tendonRegionL.push(ToGlobalPoint3D(cp, { x: - endShape.b1 / 2 - dz[0] * tanX, y: bottomY + tendon[i].y + tendon[i].h / 2, z: dz[0] }));
        tendonRegionL.push(ToGlobalPoint3D(cp, { x: - endShape.b1 / 2 - dz[1] * tanX, y: bottomY + tendon[i].y - tendon[i].h / 2, z: dz[1] }));
        tendonRegionR.push(ToGlobalPoint3D(cp, { x: endShape.b1 / 2 + dz[0] * tanX, y: bottomY + tendon[i].y + tendon[i].h / 2, z: dz[0] }));
        tendonRegionR.push(ToGlobalPoint3D(cp, { x: endShape.b1 / 2 + dz[1] * tanX, y: bottomY + tendon[i].y - tendon[i].h / 2, z: dz[1] }));
        if (i === k) {
            tendonRegionL.push(ToGlobalPoint3D(cp, { x: - endShape.b1 / 2 - dz[1] * tanX, y: -slabThickness - endShape.h1, z: dz[1] }));
            tendonRegionR.push(ToGlobalPoint3D(cp, { x: endShape.b1 / 2 + dz[1] * tanX, y: -slabThickness - endShape.h1, z: dz[1] }));
        }
    }

    for (let i =0; i< shapeData.length; i++) {
        if (shapeData[i][0]) {
            let [name, h1, h2, h3, h4, h5, l1, l2, l3] = shapeData[i];
            let cp = pointDict[name];
            let z = i===0? upperZ :i===shapeData.length -1 ? -upperZ : 0; 
            let pts = [
                { x: - b1 / 2, y: - slabThickness, z : z },
                { x: - l2 / 2, y: - slabThickness, z : 0 }, { x: - l2 / 2, y: - slabThickness - h1, z : 0 },
                { x: -l1 / 2, y: - slabThickness - h1 - h2, z : 0 }, { x: -l1 / 2, y: - slabThickness - h1 - h2 - h3, z : 0 },
                { x: - l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4, z : 0 },
                { x: - l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 - h5, z : 0 }, { x: l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 - h5, z : 0 },
                { x: l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4, z : 0 },
                { x: l1 / 2, y: - slabThickness - h1 - h2 - h3, z : 0 }, { x: l1 / 2, y: - slabThickness - h1 - h2, z : 0 },
                { x: l2 / 2, y: - slabThickness - h1, z : 0 }, { x: l2 / 2, y: - slabThickness, z : 0 },
                { x: b1 / 2, y: - slabThickness, z : z },
            ];
            let newPts = [];
            pts.forEach(pt => newPts.push(ToGlobalPoint3D(cp, pt)));
            model.girder.points.push(newPts);
            model.girder.ptGroup = [[0, 1, 2, 9, 10, 11], [2, 3, 8, 9], [3, 4, 5, 6, 7, 8]]
        }
    }


    let pts = [
        { x: - l2 / 2, y: - slabThickness }, { x: - l2 / 2, y: - slabThickness - h1 },
        { x: -l1 / 2, y: - slabThickness - h1 - h2 }, { x: -l1 / 2, y: - slabThickness - h1 - h2 - h3 },
        { x: - l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 },
        { x: - l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 - h5 }, { x: l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 - h5 },
        { x: l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 },
        { x: l1 / 2, y: - slabThickness - h1 - h2 - h3 }, { x: l1 / 2, y: - slabThickness - h1 - h2 },
        { x: l2 / 2, y: - slabThickness - h1 }, { x: l2 / 2, y: - slabThickness },
    ];

    let pts0 = [{ x: - endShape.b0 / 2, y: -slabThickness - endShape.h0 },
    { x: -endShape.b0 / 2, y: -slabThickness }, ...pts, { x: endShape.b0 / 2, y: -slabThickness },
    { x: endShape.b0 / 2, y: -slabThickness - endShape.h0 },]
    let cap1 = [];
    pts0.forEach(pt => cap1.push(ToGlobalPoint3D(cp, {x:pt.x, y:pt.y,z:endShape.d})));

    // let pts1 = [{ x: -endShape.b0 / 2, y: -slabThickness }, ...pts, { x: endShape.b0 / 2, y: -slabThickness }]
    // let newPts0 = [];
    // pts1.forEach(pt => newPts0.push(ToGlobalPoint(cp, pt)));

    // let pts2 = [{ x: -endShape.b1 / 2, y: pts[0].y }, ...pts, { x: endShape.b1 / 2, y: pts[0].y }]
    // let newPts1 = [];
    // pts2.forEach(pt => newPts1.push(ToGlobalPoint(cp, pt)));

    model["end1"] = { points: [cap1.slice(1,cap1.length-1), model.girder.points[0]], closed: false, cap: false };
    model["cap1"] = { points: [cap1] }



    let n = cap1.length - 1
    model["tendonCap1"] = { points: [[...tendonRegionL, cap1[0]], [...tendonRegionR, cap1[n]]], closed: false, cap: false };
    model["leftCap1"] = { points: [[cap1[0], cap1[1], ...tendonRegionL]] };
    model["rightCap1"] = { points: [[cap1[n], cap1[n - 1], ...tendonRegionR]] };

    return model
}