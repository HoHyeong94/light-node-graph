import { ToGlobalPoint } from "../geometryModule"
const girderPoint = {
    "G1P0": { x: 0, y: 0, z: 2000, normalCos: 1, normalSin: 0 }, // masterStationNumber, girderStation이 없어서 toglobalPoint 함수에서 에러 발생여부 파악 그리고 예외처리
    "G1P1": { x: 0, y: 40000, z: 2000, normalCos: 1, normalSin: 0 },
}

const shapeData = [
    // [pointName, h1, h2, h3, h4, h5, l1, l2, l3] 순서주의
    ["G1P0", 160, 100, 920, 120, 200, 240, 230, 330],
    ["G1P1", 160, 100, 920, 120, 200, 240, 230, 330],
]

export function GirderPointGen(pointData){
    let result = {}
    for (let i in pointData){
        // let [name, benchmark, offset] = pointData[i];
        console.log(pointData[i][0], pointData[i][2])
        result[pointData[i][0]] = { x: 0, y: pointData[i][2], z: 2000 , normalCos: 1, normalSin: 0 }
    }
    return result
}

export function IGirderSection(pointDict, shapeData) {
    let model = {"girder":{"points":[], "ptGroup" : []}};
    let slabThickness = 300; //슬래브두께 + 헌치 + 포장두께 
    for (let i in shapeData) {
        let [name, h1, h2, h3, h4, h5, l1, l2, l3] = shapeData[i];
        let cp = pointDict[name];
        let pts = [
            { x: - l2/2, y: - slabThickness }, { x:  - l2/2, y: - slabThickness - h1 },
            { x: -l1 / 2, y: - slabThickness - h1 - h2 }, { x: -l1 / 2, y: - slabThickness - h1 - h2 - h3 },
            { x:  - l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 },
            { x:  - l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 - h5 }, { x: l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 - h5 },
            { x: l3 / 2, y: - slabThickness - h1 - h2 - h3 - h4 },
            { x: l1 / 2, y: - slabThickness - h1 - h2 - h3 },{ x: l1 / 2, y: - slabThickness - h1 - h2},
            { x: l2 / 2, y: - slabThickness - h1  },{ x: l2 / 2, y: - slabThickness},
        ];
        let newPts = [];
        pts.forEach(pt => newPts.push(ToGlobalPoint(cp,pt)));
        model.girder.points.push(newPts);
        model.girder.ptGroup = [[0,1,2,9,10,11], [2,3,8,9], [3,4,5,6,7,8]]
    }
    return model
}