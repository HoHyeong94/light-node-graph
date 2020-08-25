import { ToGlobalPoint3} from "../geometryModule"
import { OffsetPoint } from "../line/module"

export function AbutPointGen(girderLayout, masterLine, slabLayout){
    let masterPoint = girderLayout.startPoint
    let leftOffset = slabLayout[0][3]
    let rightOffset = slabLayout[0][4]
    let leftPoint = OffsetPoint(masterPoint, masterLine, leftOffset);
    let rightPoint = OffsetPoint(masterPoint, masterLine, rightOffset);
    return  [leftPoint, masterPoint, rightPoint]
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
        supportDepth : 1400,
        ELsub: 18000,
        footHeight: 1600,
        footLengthB: 3700,
        footLengthf: 1600,
        LeanConcT: 100,
        LeanConcL: 100
    };
    let abutDepth = 2500; // 거더높이 + 하부플렌지두께 + 솔플레이트두께 + 받침높이 + 페데스탈높이 중 최대깊이
    let abutHeight = 5000;
    model["Start"] = {"points" : [], "ptGroup" : []}
    for (let pt in abutPoints) {
        model["Start"]["points"].push([]);
        let totalH = abutPoints[pt].z - tempInput.ELsub
        let points = [{ x: 0, y: 0 },//시점을 기준으로 시계반대방향 순
        { x: -tempInput.backWallThick + tempInput.approachDepth, y: 0 },
        { x: -tempInput.backWallThick + tempInput.approachDepth, y: -tempInput.approachHeight },
        { x: -tempInput.backWallThick, y: -tempInput.approachHeight },
        { x: -tempInput.backWallThick, y: -tempInput.backWallHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick, y: -tempInput.backWallHeight - tempInput.backHaunchHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick, y: -totalH + tempInput.backHaunchHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH + tempInput.backHaunchHeight },
        { x: -tempInput.backWallThick + tempInput.backHaunchThick - tempInput.footLengthB, y: -totalH },
        { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH },
        { x: tempInput.supportDepth + tempInput.footLengthf, y: -totalH +  tempInput.backHaunchHeight},
        { x: tempInput.supportDepth, y: -totalH +  tempInput.backHaunchHeight},
        { x: tempInput.supportDepth, y: -totalH +  tempInput.backHaunchHeight + abutHeight},
        { x: 0, y: -totalH +  tempInput.backHaunchHeight + abutHeight},
        ];
        points.forEach(npt => model["Start"]["points"][pt].push(ToGlobalPoint3(abutPoints[pt], npt)))
    }
    model["Start"]["ptGroup"] = [[0,1,2,13], [2,3,4,5,13], [5,6,13],[6,11,12,13], [7,8,9,10]];
    return model
}