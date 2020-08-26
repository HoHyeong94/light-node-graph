import { ToGlobalPoint3, DividingPoint } from "../geometryModule"
import { OffsetPoint } from "../line/module"

export function AbutPointGen(girderLayout, masterLine, slabLayout) {
    let masterPoint = girderLayout.startPoint
    let leftOffset = slabLayout[0][3]
    let rightOffset = slabLayout[0][4]
    let leftPoint = OffsetPoint(masterPoint, masterLine, leftOffset);
    let rightPoint = OffsetPoint(masterPoint, masterLine, rightOffset);
    return [leftPoint, masterPoint, rightPoint]
}
export function AbutModelGen(abutPoints, abutInput, sectionPointDict, supportLayout) {
    let model = {}; // for loftModel
    const tempInput = {
        backWallThick: 800,
        backWallHeight: 2800,
        backHaunchHeight: 600,
        backHaunchThick: 600,
        approachDepth: 300,
        approachHeight: 800,
        supportDepth: 1400,
        ELsub: 18000,
        footHeight: 1600,
        footLengthB: 3700,
        footLengthf: 1600,
        LeanConcT: 100,
        LeanConcL: 100,
        wingWallThick: 800,
        wingLength: 6500,
        wingH1: 1500,
        wingH2: 2600,
        wingL1: 2600,
        wingGradient: 0.02,
        wingHaunch: 300,
    };
    let abutDepth = 2500; // 거더높이 + 하부플렌지두께 + 솔플레이트두께 + 받침높이 + 페데스탈높이 중 최대깊이
    let abutHeight = 5000;
    let points = []
    model["Start"] = { "points": [], "ptGroup": [] }
    for (let index in abutPoints) {
        model["Start"]["points"].push([]);
        let totalH = abutPoints[index].z - tempInput.ELsub
        points.push([{ x: 0, y: 0 },//시점을 기준으로 시계반대방향 순
        { x: -tempInput.backWallThick + tempInput.approachDepth, y: 0 },
        { x: -tempInput.backWallThick + tempInput.approachDepth, y: -tempInput.approachHeight },
        { x: -tempInput.backWallThick, y: -tempInput.approachHeight },
        { x: -tempInput.backWallThick, y: -tempInput.backWallHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick, y: -tempInput.backWallHeight - tempInput.backHaunchHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick, y: -totalH + tempInput.backHaunchHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH + tempInput.backHaunchHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH },
        { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH },
        { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH + tempInput.backHaunchHeight },
        { x: tempInput.supportDepth, y: -totalH + tempInput.backHaunchHeight },
        { x: tempInput.supportDepth, y: -totalH + tempInput.backHaunchHeight + abutHeight },
        { x: 0, y: -totalH + tempInput.backHaunchHeight + abutHeight },
        ]);
        points[index].forEach(npt => model["Start"]["points"][index].push(ToGlobalPoint3(abutPoints[index], npt)))
    }
    model["Start"]["ptGroup"] = [[0, 1, 2, 13], [2, 3, 4, 5, 13], [5, 6, 13], [6, 11, 12, 13], [7, 8, 9, 10]];
    //우선 직각인 날개벽을 예시로함
    let pt1 = {};
    let pt2 = {};
    // let npt = [];
    let wingPoints = [
        { x: points[0][0].x - tempInput.wingLength, y: points[0][0].y - tempInput.wingLength * tempInput.wingGradient },
        { x: points[0][0].x - tempInput.wingLength, y: points[0][0].y - tempInput.wingLength * tempInput.wingGradient - tempInput.wingH1 },
        { x: points[0][7].x, y: points[0][0].y - tempInput.wingLength * tempInput.wingGradient - tempInput.wingH1 - tempInput.wingH2 },
        points[0][7], points[0][6], points[0][5], points[0][4], points[0][3], points[0][2], points[0][1]]

    let wingPt1 = [];
    wingPoints.forEach(pt => wingPt1.push(ToGlobalPoint3(abutPoints[0], pt)))
    let cos = abutPoints[0].normalCos;
    let sin = abutPoints[0].normalSin;
    let dx = tempInput.wingWallThick * cos;
    let dy = tempInput.wingWallThick * sin;
    let dz = 0;
    // console.log(wingPoints, wingPt1)
    let wingPt2 = [{ x: wingPt1[0].x + dx, y: wingPt1[0].y + dy, z: wingPt1[0].z },
    { x: wingPt1[1].x + dx, y: wingPt1[1].y + dy, z: wingPt1[1].z },
    { x: wingPt1[2].x + dx, y: wingPt1[2].y + dy, z: wingPt1[2].z },
    { x: wingPt1[3].x + dx, y: wingPt1[3].y + dy, z: wingPt1[3].z },];
    for (let i of [6, 5, 4, 3, 2, 1]) {
        pt1 = model["Start"]["points"][0][i];
        pt2 = model["Start"]["points"][1][i];
        let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2)
        let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2)
        wingPt2.push(DividingPoint(pt1, pt2, tempInput.wingWallThick * l / l2D));
    }
    model["leftWing"] = { "points": [wingPt1, wingPt2], "ptGroup": [[0, 7, 8, 9], [0, 1, 2, 6, 7], [2, 3, 4, 5, 6]] }

    let HPt = []
    for (let i of [4, 5, 6, 7]) {
        dx = tempInput.wingHaunch * sin
        dy = - tempInput.wingHaunch * cos
        dz = 0
        pt1 = wingPt1[i];
        pt2 = wingPt2[i];
        let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2)
        let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2)
        let hpt1 = {x : wingPt2[i].x +dx, y : wingPt2[i].y +dy, z : wingPt2[i].z+dz}
        let hpt2 = DividingPoint(pt1, pt2, (tempInput.wingWallThick + tempInput.wingHaunch) * l / l2D);
        HPt.push([wingPt2[i],hpt1, hpt2 ]);
    }
    model["leftWingH1"] = { "points": HPt, }
    return model
}