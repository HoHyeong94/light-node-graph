import { ToGlobalPoint, ToGlobalPoint3, DividingPoint } from "../geometryModule"
import { OffsetPoint } from "../line/module"

export function AbutPointGen(girderLayout, slabLayout) {
    let masterPoint = girderLayout.startPoint
    let leftOffset = slabLayout[0][3]
    let rightOffset = slabLayout[0][4]
    let leftPoint = ToGlobalPoint(masterPoint, {x:leftOffset, y : masterPoint.leftGradient * leftOffset})//OffsetPoint(masterPoint, masterLine, leftOffset);
    let rightPoint = ToGlobalPoint(masterPoint, {x:rightOffset, y : masterPoint.rightGradient * rightOffset})//OffsetPoint(masterPoint, masterLine, rightOffset);
    leftPoint["offset"] = leftOffset;
    rightPoint["offset"] = rightOffset;
    let masterPoint1 = girderLayout.endPoint
    let leftOffset1 = slabLayout[slabLayout.length -1][3]
    let rightOffset1 = slabLayout[slabLayout.length -1][4]
    let leftPoint1 = ToGlobalPoint(masterPoint1, {x:leftOffset1, y : masterPoint1.leftGradient * leftOffset1})//OffsetPoint(masterPoint, masterLine, leftOffset);
    let rightPoint1 = ToGlobalPoint(masterPoint1, {x:rightOffset1, y : masterPoint1.rightGradient * rightOffset1})//OffsetPoint(masterPoint, masterLine, rightOffset);
    leftPoint1["offset"] = leftOffset1;
    rightPoint1["offset"] = rightOffset1;

    return {start : [leftPoint, masterPoint, rightPoint], end : [leftPoint1, masterPoint1, rightPoint1]}
}
export function AbutModelGen(abutPoints, abutInput, supportData) {
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
    let supportList = [];
    for (let key in supportData) {
        if (supportData[key].basePointName.substr(2, 2) === "S1") {
            supportList.push([supportData[key].point.offset, supportData[key].point.z, supportData[key].solePlateThck, 400]);
        }
    }
    supportList.sort(function (a, b) { return a[0] < b[0] ? -1 : 1; });
    let absZ = abutPoints[1].z;
    let upt0 = []
    let lpt0 = []
    let upt1 = []
    let lpt1 = []
    for (let i = 0; i < supportList.length; i++) {
        let z1 = supportList[i][1] - supportList[i][2] - supportList[i][3] - absZ
        let z2 = tempInput.ELsub + tempInput.footHeight - absZ
        let x0 = 0;
        let x1 = 0;
        if (i === 0){
            x0 = abutPoints[0].offset;
            x1 = (supportList[i][0] + supportList[i + 1][0]) / 2 
        }else if (i === supportList.length -1){
            x0 = (supportList[i-1][0] + supportList[i][0]) / 2
            x1 = abutPoints[2].offset
        } else {
            x0 = (supportList[i-1][0] + supportList[i][0]) / 2
            x1 = (supportList[i][0] + supportList[i + 1][0]) / 2 
        }
        let nCp0 = ToGlobalPoint(abutPoints[1], { x: x0, y: 0 }) 
        let nCp1 = ToGlobalPoint(abutPoints[1], { x: x1, y: 0 })
        upt0.push(ToGlobalPoint3(nCp0, { x: 0, y: z1 }))
        upt0.push(ToGlobalPoint3(nCp1, { x: 0, y: z1 }))
        upt1.push(ToGlobalPoint3(nCp0, { x: tempInput.supportDepth, y: z1 }))
        upt1.push(ToGlobalPoint3(nCp1, { x: tempInput.supportDepth, y: z1 }))
        lpt0.push(ToGlobalPoint3(nCp0, { x: 0, y: z2 }))
        lpt0.push(ToGlobalPoint3(nCp1, { x: 0, y: z2 }))
        lpt1.push(ToGlobalPoint3(nCp0, { x: tempInput.supportDepth, y: z2 }))
        lpt1.push(ToGlobalPoint3(nCp1, { x: tempInput.supportDepth, y: z2 }))
    }
    let ptGroup = []
    let ptNum = supportList.length * 2
    for (let i = 0; i<ptNum; i+=2){
        ptGroup.push([i, i+1, ptNum -(i + 2), ptNum -( i+1 )])
    }
    model["wall"] = { "points": [[...upt0, ...lpt0.reverse()],[...upt1, ...lpt1.reverse()]],"ptGroup" : ptGroup }

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
        { x: -tempInput.backWallThick + tempInput.backHaunchThick, y: -totalH + tempInput.footHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH + tempInput.footHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH },
        { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH },
        { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH + tempInput.footHeight },
        // { x: tempInput.supportDepth, y: -totalH + tempInput.footHeight },
        // { x: tempInput.supportDepth, y: -totalH + tempInput.backHaunchHeight + abutHeight },
        { x: 0, y: -totalH + tempInput.footHeight }, //+ tempInput.backHaunchHeight + abutHeight },
        ]);
        points[index].forEach(npt => model["Start"]["points"][index].push(ToGlobalPoint3(abutPoints[index], npt)))
    }
    model["Start"]["ptGroup"] = [[0, 1, 2, 5, 6, 11], [2, 3, 4, 5], [7, 8, 9, 10]]; 
    //우선 직각인 날개벽을 예시로함
    for (let index of [0, 2]) {
        let nameKey = index === 0 ? "left" : "right";
        let sign = index === 0 ? 1 : -1;
        let pt1 = {};

        let pt2 = {};
        // let npt = [];
        let wingPoints = [
            { x: points[index][0].x - tempInput.wingLength, y: points[index][0].y - tempInput.wingLength * tempInput.wingGradient },
            { x: points[index][0].x - tempInput.wingLength, y: points[index][0].y - tempInput.wingLength * tempInput.wingGradient - tempInput.wingH1 },
            { x: points[index][7].x, y: points[index][0].y - tempInput.wingLength * tempInput.wingGradient - tempInput.wingH1 - tempInput.wingH2 },
            points[index][7], points[index][6], points[index][5], points[index][4], points[index][3], points[index][2], points[index][1]]

        let wingPt1 = [];
        wingPoints.forEach(pt => wingPt1.push(ToGlobalPoint3(abutPoints[index], pt)))
        let cos = abutPoints[index].normalCos;
        let sin = abutPoints[index].normalSin;
        let dx = sign * tempInput.wingWallThick * cos;
        let dy = sign * tempInput.wingWallThick * sin;
        let dz = sign * tempInput.wingWallThick * abutPoints[index].gradientY;
        // console.log(wingPoints, wingPt1)
        let wingPt2 = [{ x: wingPt1[0].x + dx, y: wingPt1[0].y + dy, z: wingPt1[0].z + dz },
        { x: wingPt1[1].x + dx, y: wingPt1[1].y + dy, z: wingPt1[1].z },
        { x: wingPt1[2].x + dx, y: wingPt1[2].y + dy, z: wingPt1[2].z },
        { x: wingPt1[3].x + dx, y: wingPt1[3].y + dy, z: wingPt1[3].z },];
        for (let i of [6, 5, 4, 3, 2, 1]) {
            pt1 = model["Start"]["points"][index][i];
            pt2 = model["Start"]["points"][1][i];
            let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2)
            let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2)
            wingPt2.push(DividingPoint(pt1, pt2, tempInput.wingWallThick * l / l2D));
        }
        model[nameKey + "Wing"] = { "points": [wingPt1, wingPt2], "ptGroup": [[0, 7, 8, 9], [0, 1, 2, 6, 7], [2, 3, 4, 5, 6]] }

        let theta = Math.atan2(points[index][4].y - points[index][5].y, points[index][4].x - points[index][5].x);
        // Math.tan(theta/2) * tempInput.wingHaunch // 추후 방향을 고려하여 일반화 필요함
        let HPt = []
        dx = tempInput.wingHaunch * sin
        dy = - tempInput.wingHaunch * cos
        for (let i of [4, 5, 6, 7]) {
            dz = i === 5 || i === 6 ? - Math.tan(theta / 2 - Math.PI / 4) * tempInput.wingHaunch : 0;
            pt1 = wingPt1[i];
            pt2 = wingPt2[i];
            let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2)
            let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2)
            let hpt1 = { x: wingPt2[i].x + dx, y: wingPt2[i].y + dy, z: wingPt2[i].z + dz }
            let hpt2 = DividingPoint(pt1, pt2, (tempInput.wingWallThick + tempInput.wingHaunch) * l / l2D);
            HPt.push([wingPt2[i], hpt1, hpt2]);
        }
        let HPt2 = [];
        for (let i of [8, 9]) {
            dz = i === 9 ? - tempInput.wingHaunch * tempInput.wingGradient : 0;
            pt1 = wingPt1[i];
            pt2 = wingPt2[i];
            let l = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2 + (pt1.z - pt2.z) ** 2)
            let l2D = Math.sqrt((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2)
            let hpt1 = { x: wingPt2[i].x + dx, y: wingPt2[i].y + dy, z: wingPt2[i].z + dz }
            let hpt2 = DividingPoint(pt1, pt2, (tempInput.wingWallThick + tempInput.wingHaunch) * l / l2D);
            HPt2.push([wingPt2[i], hpt1, hpt2]);
        }
        model[nameKey + "WingH1"] = { "points": HPt, }
        model[nameKey + "WingH2"] = { "points": HPt2, }
    }

    return model
}