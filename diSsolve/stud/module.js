import { ToGlobalPoint } from "../geometryModule"

const studInfo = {
    dia: 25,
    height: 150,
    headDia: 38,
    headDepth: 10,
}

const topPlateStudLayout = [{
    start: "G1K1",
    end: "G1SP1",
    startOffset: 200,
    endOffset: 200,
    spacing: 450,

    outSideMargin: 100,
    inSideMargin: 100,
    minNum: 3, //개구부에서부터 간격이 고정되는 스터드의 개수를 의미함
    maxNum: 5,
    maxDist: 435   //
}]
const bottomPlateStudLayout = [{
    start: "G1K1",
    end: "G1SP1",
    startOffset: 200,
    endOffset: 200,
    spacing: 450,

    outSideMargin: 100,
    inSideMargin: 100,
    minNum: 3, //하단 종리브로 인하여 간격에 대한 값을 받아야 할듯함.
    maxNum: 5,
    maxDist: 435   //
}]
const WebPlateStudLayout = [{
    start: "G1K1",
    end: "G1SP1",
    startOffset: 200,
    endOffset: 200,
    spacing: 450,

    outSideMargin: 100, //상단 기준면이 되어야 할듯
    inSideMargin: 100,  //하단 기준면이 되어야 할듯
    minNum: 3,
    maxNum: 5,
    maxDist: 435   //
}]

const innerPlateStudLayout = [{
    start: "G1K1",
    end: "G1SP1",
    startOffset: 200,
    endOffset: 200,
    spacing: 450,
    outSideMargin: 100, //상단 기준면이 되어야 할듯
    inSideMargin: 100,  //하단 기준면이 되어야 할듯
    minNum: 1, //개구부에서부터 간격이 고정됨
    maxNum: 2,
    maxDist: 200   //
}]

const diaPhragmStudLayout = [{
    position: "G1K1",
    forward: true,
    backward: true,
    spacing: 450,
    outSideMargin: 100,
    inSideMargin: 100,
    minNum: 3, //개구부에서부터 간격이 고정됨
    maxNum: 5,
    maxDist: 435   //
}]

// stud의 각 위치좌표를 생성하는 함수
export function StudPoint(girderStation, sectionPointDict, topPlateStudLayout) {
    //1차적으로는 station을 기준으로 배치하고 향후 옵션(곡선교에 대한)을 추가해서, 실간격을 반영할지 여부를 판단할 것임.
    // const topPlateStudLayout = [{
    //     start : "G1K1",
    //     end : "G1SP1",
    //     startOffset : 200,
    //     endOffset : 200,
    //     spacing : 450,

    //     outSideMargin : 100,
    //     inSideMargin : 100,
    //     minNum : 3, //개구부에서부터 간격이 고정되는 스터드의 개수를 의미함
    //     maxNum : 5,
    //     maxDist : 435   //
    // }]

    const studInfo = {
        dia: 25,
        height: 150,
        headDia: 38,
        headDepth: 10,
    }

    let studList = [];
    for (let i in topPlateStudLayout) {
        let ts = {
            start: topPlateStudLayout[i][0],
            end: topPlateStudLayout[i][1],
            startOffset: topPlateStudLayout[i][2],
            endOffset: topPlateStudLayout[i][3],
            spacing: topPlateStudLayout[i][4],
            outSideMargin: topPlateStudLayout[i][5],
            inSideMargin: topPlateStudLayout[i][6],
            minNum: topPlateStudLayout[i][7],
            maxNum: topPlateStudLayout[i][8],
            minDist: 100,  //라이트그래프 인풋변수 수정 필요
            maxDist: topPlateStudLayout[i][9],
            layout : [70,105,105]
        };

        const sp = ts.start
        let girderIndex = sp.substr(1, 1) * 1 - 1
        let gridKeys = []
        let gridPoints = []
        let cr = false

        for (let j in girderStation[girderIndex]) {
            if (girderStation[girderIndex][j].key === ts.start) {
                cr = true
            }
            if (cr) {
                gridKeys.push(girderStation[girderIndex][j].key)
                gridPoints.push(girderStation[girderIndex][j].point)
            }
            if ((girderStation[girderIndex][j].key === ts.end)) {
                cr = false
            }
        }
        let totalLength = 0;
        let segLength = 0;
        for (let j = 0; j < gridKeys.length - 1; j++) {

            let points = [];
            let spts = [];
            let epts = [];

            for (let p = 0; p < 3; p++) {
                let startFlangePoints = sectionPointDict[gridKeys[j]].forward.uflange[p];
                let endFlangePoints = sectionPointDict[gridKeys[j + 1]].backward.uflange[p];
                if (startFlangePoints.length > 0 && endFlangePoints.length > 0) {
                    let startNode = startFlangePoints[3]
                    let endNode = endFlangePoints[3]
                    let sign = p === 1? -1 : 1;
                    // for (let k = 0; k < ts.minNum; k++) {
                    //     let dx = sign * ts.outSideMargin + sign * k * ts.minDist
                    //     spts.push({ x: startNode.x + dx, y: startNode.y + dx * gridPoints[j].gradientY });
                    //     epts.push({ x: endNode.x + dx, y: endNode.y + dx * gridPoints[j + 1].gradientY });
                    // }
                    let dx = 0
                    for (let k in ts.layout) {
                        let sp = sign * ts.layout[k]
                        dx += sp
                        spts.push({ x: startNode.x + dx, y: startNode.y + dx * gridPoints[j].gradientY });
                        epts.push({ x: endNode.x + dx, y: endNode.y + dx * gridPoints[j + 1].gradientY });
                    }
                }
            }


            let globalSpts = [];
            let globalEpts = [];
            spts.forEach(function (elem) { globalSpts.push(ToGlobalPoint(gridPoints[j], elem)) })
            epts.forEach(function (elem) { globalEpts.push(ToGlobalPoint(gridPoints[j + 1], elem)) })
            segLength = Math.sqrt((globalSpts[0].x - globalEpts[0].x) ** 2 + (globalSpts[0].y - globalEpts[0].y) ** 2)
            totalLength += segLength
            let remainder = (totalLength - ts.startOffset) % ts.spacing;
            let sNum = segLength - remainder > 0 ? Math.floor((segLength - remainder) / ts.spacing) + 1 : 0

            for (let l = 0; l < spts.length; l++) {
                for (let k = 0; k < sNum; k++) {
                    let x = 0;
                    if (j < gridKeys.length - 2 || k > 0) {
                        x = remainder + k * ts.spacing;
                    } else {
                        x = ts.endOffset;
                    }
                    points.push({
                        x: x / segLength * globalSpts[l].x + (segLength - x) / segLength * globalEpts[l].x,
                        y: x / segLength * globalSpts[l].y + (segLength - x) / segLength * globalEpts[l].y,
                        z: x / segLength * globalSpts[l].z + (segLength - x) / segLength * globalEpts[l].z
                    })

                }
            }

            studList.push({ points: points, gradientX: 0, gradientY: gridPoints[j].gradientY, stud: studInfo })
            // sectionPointDict[gridKeys[j]].backward.leftTopPlate[3]
        }



    }


    return studList
}