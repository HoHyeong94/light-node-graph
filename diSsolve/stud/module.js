import { ToGlobalPoint } from "../geometryModule"

const studInfo = {
    dia : 25,
    height : 150,
    headDia : 38,
    headDepth : 10,
}

const topPlateStudLayout = [{
    start : "G1K1",
    end : "G1SP1",
    startOffset : 200,
    endOffset : 200,
    spacing : 450,

    outSideMargin : 100,
    inSideMargin : 100,
    minNum : 3, //개구부에서부터 간격이 고정되는 스터드의 개수를 의미함
    maxNum : 5,
    maxDist : 435   //
}]
const bottomPlateStudLayout = [{
    start : "G1K1",
    end : "G1SP1",
    startOffset : 200,
    endOffset : 200,
    spacing : 450,

    outSideMargin : 100,
    inSideMargin : 100,
    minNum : 3, //하단 종리브로 인하여 간격에 대한 값을 받아야 할듯함.
    maxNum : 5,
    maxDist : 435   //
}]
const WebPlateStudLayout = [{
    start : "G1K1",
    end : "G1SP1",
    startOffset : 200,
    endOffset : 200,
    spacing : 450,

    outSideMargin : 100, //상단 기준면이 되어야 할듯
    inSideMargin : 100,  //하단 기준면이 되어야 할듯
    minNum : 3,          
    maxNum : 5,
    maxDist : 435   //
}]

const innerPlateStudLayout = [{
    start : "G1K1",
    end : "G1SP1",
    startOffset : 200,
    endOffset : 200,
    spacing : 450,
    outSideMargin : 100, //상단 기준면이 되어야 할듯
    inSideMargin : 100,  //하단 기준면이 되어야 할듯
    minNum : 1, //개구부에서부터 간격이 고정됨
    maxNum : 2,
    maxDist : 200   //
}]

const diaPhragmStudLayout = [{
    position : "G1K1",
    forward : true,
    backward : true,
    spacing : 450,
    outSideMargin : 100,
    inSideMargin : 100,
    minNum : 3, //개구부에서부터 간격이 고정됨
    maxNum : 5,
    maxDist : 435   //
}]

// stud의 각 위치좌표를 생성하는 함수
export function StudPoint(girderStation, sectionPointDict, topPlateStudLayout){ 
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
    let studList = [];
    for (let i in topPlateStudLayout){
        const ts = {start : topPlateStudLayout[i][0], 
                    end : topPlateStudLayout[i][1],
                    startOffset : topPlateStudLayout[i][2],
                    endOffset : topPlateStudLayout[i][3],
                    spacing : topPlateStudLayout[i][4],
                    outSideMargin : topPlateStudLayout[i][5],
                    inSideMargin : topPlateStudLayout[i][6],
                    minNum : topPlateStudLayout[i][7], 
                    maxNum : topPlateStudLayout[i][8],
                    maxDist : topPlateStudLayout[i][9] 
         };

        const girderIndex = ts.start.substr(1,1) * 1 -1
        let sp = GridPoint[ts.start];
        let ep = GridPoint[ts.end];
        let gridKeys = []
        let gridPoints = []
        let cr = false

        for (let j in girderStation[girderIndex]){
            if (girderStation[girderIndex][j].key === ts.start){
                cr = true
            }
                if (cr){
                    gridKeys.push(girderStation[girderIndex][j].key)
                    gridPoints.push(girderStation[girderIndex][j].point)
                }
            if ((girderStation[girderIndex][j].key === ts.end)){
                cr = false
            }
        }

        for (let j = 0; j < gridKeys.length -1 ;j++){
            let leftinode = sectionPointDict[gridKeys[j]].forward.leftTopPlate[3]
            let leftjnode = sectionPointDict[gridKeys[j]].forward.leftTopPlate[2]
            let rightinode = sectionPointDict[gridKeys[j]].forward.leftTopPlate[3]
            let rightjnode = sectionPointDict[gridKeys[j]].forward.leftTopPlate[2]
            let points = [ToGlobalPoint(gridPoints[j],leftinode), 
                        ToGlobalPoint(gridPoints[j],leftjnode),
                        ToGlobalPoint(gridPoints[j],rightinode),
                        ToGlobalPoint(gridPoints[j],rightjnode)]
            studList.push({ points : points, gradientX : 0, gradientY : gridPoints[j].gradientY})
            
            // sectionPointDict[gridKeys[j]].backward.leftTopPlate[3]
        }
        


    }


    return studList
}