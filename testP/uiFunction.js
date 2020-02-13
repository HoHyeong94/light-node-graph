import { PointGenerator, LineMatch,  OffsetLine, SplinePointGenerator } from "./nodeGenerator";
import _ from "lodash";


export function GirderLayoutGenerator(girderLayoutInput, hLine, VerticalDataList, SuperElevation) {
    let result = {
        masterLine: { },
        girderLine :[],
        centralSupportPoint:[],
        girderSupportPoint :[],
        girderSpanPoint:[]
    }
    let girderInfoObj = {
        number: 0,
        baseLine: { },
        alignOffset: 0,
        girderLine: { },
        outerBeam: false
    }
    // let GirderLengthObj = {
    //     crTotalLength: 0,
    //     girderTotalLength: 0,
    //     crSpanLength: [],
    //     griderSpanLength: []
    // }
    let supportDataList = girderLayoutInput.supportData
    // let beginShapeDataList = girderLayoutInput.SEShape.start   // 시점부
    // let endShapeDataList = girderLayoutInput.SEShape.end       // 종점부
    let girderDataList = girderLayoutInput.getGirderList
    let supportStation = girderLayoutInput.baseValue.bridgeBeginStation;
    for (let i = 0; i < hLine.length; i++) {
        if (hLine[i].slaveOrMaster == true) {
            result.masterLine = {...hLine[i]}
        }
    }
    let i = 0
    let girderInfoList = []
    for (let j = 0; j < girderDataList.length;j++) {
        let girderInfo = { ...girderInfoObj }
        girderInfo.number = i
        for (let k = 0; k < hLine.length; k++) {
            if ('align' + String(k + 1) == girderDataList[j].baseAlign) {
                girderInfoObj.baseLine = hLine[k]
            }
        }
        girderInfo.girderLine = OffsetLine(girderDataList[j].alignOffset,girderInfoObj.baseLine)
        girderInfo.alignOffset = girderDataList[j].alignOffset
        girderInfo.outerBeam = girderDataList[j].isBeam? true : false
        girderInfoList.push(girderInfo)
        i += 1
    }
    //console.log(supportDataList)
    result.centralSupportPoint.push(PointGenerator(supportStation, result.masterLine,supportDataList[0].angle))
    for (i = 1; i < supportDataList.length; i++) {
            supportStation = supportStation + supportDataList[i].spanLength
            result.centralSupportPoint.push(PointGenerator(supportStation, result.masterLine,supportDataList[i].angle))
    }
    for (let i = 0; i< girderInfoList.length;i++) {
        result.girderSupportPoint.push(SupportSkewPointGenerator(result.centralSupportPoint, result.masterLine, girderInfoList[i].girderLine, supportDataList, VerticalDataList, SuperElevation))
        result.girderLine.push(girderInfoList[i].girderLine);
    }
    for (let i = 0; i < result.girderSupportPoint.length;i++){ // i:girderIndex
        let PointsList = [];
        for (let j = 1; j < result.girderSupportPoint[i].length -2 ;j++){ // j:supportIndex
            let Points = [];
            Points.push(result.girderSupportPoint[i][j])
            for (let k = 0; k < girderInfoList[i].girderLine.points.length;k++){
                if (girderInfoList[i].girderLine.points[k].masterStationNumber>result.girderSupportPoint[i][j].masterStationNumber 
                    && girderInfoList[i].girderLine.points[k].masterStationNumber < result.girderSupportPoint[i][j+1].masterStationNumber){
                Points.push(girderInfoList[i].girderLine.points[k]);
                }
            }
            Points.push(result.girderSupportPoint[i][j+1])
            PointsList.push(Points)
        }
        result.girderSpanPoint.push(PointsList);
    }
    return result
}

export function GirderGridStation(girderLayout, diaphragmDistance,minDistance){
    let girderNumber = girderLayout.girderSupportPoint.length
    let spanNumber = girderLayout.girderSpanPoint[0].length
    let gridStationList = [];
    let md = minDistance; //Mindistance
    let minStation = 0;
    let maxStation = 0;
    let remainder = 0;
    for (let i = 0; i<girderNumber;i++){
        let spanStationList = [];
        for (let j = 1; j< spanNumber+1;j++){
            let gridStation = {
                diaphragm : [],
                vStiffner : [],
                connection : []
            };
            minStation = girderLayout.girderSupportPoint[i][j].masterStationNumber
            maxStation = girderLayout.girderSupportPoint[i][j+1].masterStationNumber
            remainder = Math.abs(girderLayout.centralSupportPoint[j+1].masterStationNumber
                - girderLayout.centralSupportPoint[j].masterStationNumber) % diaphragmDistance
            if (remainder === 0){
                remainder = diaphragmDistance;
            }else {
                remainder = (remainder - diaphragmDistance) / 2
            }
            let diaStation = girderLayout.centralSupportPoint[j].masterStationNumber + remainder;
            let vStiffStation = diaStation - diaphragmDistance/2;
            let connectStation = vStiffStation - diaphragmDistance/4;
            //console.log(minStation,maxStation,diaStation,vStiffStation,connectStation)
             while(minStation + md < diaStation ){
                 diaStation -=diaphragmDistance
                };
                
            while(maxStation - md > diaStation){
                if (diaStation > minStation + md){
                    gridStation.diaphragm.push(diaStation.toFixed(4)*1)
                };
                diaStation += diaphragmDistance;
            };
            while(minStation + md < vStiffStation ){
                vStiffStation -=diaphragmDistance};
            while(maxStation - md > vStiffStation){
                if (vStiffStation > minStation + md){
                    gridStation.vStiffner.push(vStiffStation.toFixed(4)*1)
                };
                vStiffStation += diaphragmDistance;
            };
            while(minStation + md < connectStation){
                connectStation -=diaphragmDistance/2};
            while(maxStation - md > connectStation){
                if (connectStation > minStation + md){
                    gridStation.connection.push(connectStation.toFixed(4)*1)
                };
                connectStation += diaphragmDistance/2;
            };
            spanStationList.push(gridStation)
        };
        gridStationList.push(spanStationList);
        };
    return gridStationList
}

function SupportSkewPointGenerator(centralSupportPoint, masterLine, girderLine, supportDatalist, VerticalDataList, SuperElevation) {
  let resultPoint = []
  for (let i = 0; i < centralSupportPoint.length; i++) {
    let skew = supportDatalist[i].angle
    if (skew !== 0) {
        let dummyPoint = LineMatch(centralSupportPoint[i], masterLine, girderLine, skew, VerticalDataList, SuperElevation)
        resultPoint.push(dummyPoint)
    } else {
      console.log('Skew value is not available');
      resultPoint = null;
    }
}   
  return resultPoint
}

export function GridPointGenerator(masterLine,girderLayout, gridStationList, SEShape, startSkew, endSkew, VerticalDataList, SuperElevation){
    let gridPointStation = [];
    let stationDictList = [];
    const girderNumber = gridStationList.length;
    const spanNumber = gridStationList[0].length
    let nameToPointDict = {};
    let pointName = "";
    for (let i = 0; i< girderNumber;i++){
        let ptsList = []
        let stationDict = []
        let dNum = 1;
        let vNum = 1;
        let cNum = 1;
        let kNum = 1;
        for (let j = 0; j<spanNumber;j++){
            let stationToNameDict = {}
            let skewedStation = []
            if (j===0){
                let masterPoint = girderLayout.centralSupportPoint[0]
                let offset = 0;
                for (let k = 0; k<3;k++){
                    pointName = "G" + (i+1) + "K" + kNum;
                    kNum +=1;
                    if (k ===0){
                        offset = SEShape.start.A + SEShape.start.D // neede to minus sign
                    }else if (k===1){
                        offset = SEShape.start.A + SEShape.start.D + SEShape.start.F // neede to minus sign
                    }else{
                        offset = SEShape.start.A + SEShape.start.D + SEShape.start.F + SEShape.start.G
                    }
                let skew = OffsetSkewCalculator(masterPoint, startSkew, offset, masterLine)
                let centerPoint = PointGenerator(masterPoint.masterStationNumber + offset,masterLine, skew);
                let skewPoint = LineMatch(centerPoint, masterLine, girderLayout.girderLine[i], skew, VerticalDataList, SuperElevation)                
                skewedStation.push(skewPoint.masterStationNumber);
                stationToNameDict[skewPoint.masterStationNumber] = pointName;
                nameToPointDict[pointName] = skewPoint;
                }
            }
            for (let k = 0; k<gridStationList[i][j].diaphragm.length;k++){
                pointName = "G" + (i+1) + "D" + dNum
                stationToNameDict[gridStationList[i][j].diaphragm[k]] = pointName
                let masterPoint = PointGenerator(gridStationList[i][j].diaphragm[k],masterLine);
                nameToPointDict[pointName] = SplinePointGenerator(masterPoint, girderLayout.girderSpanPoint[i][j],VerticalDataList, SuperElevation);
                dNum +=1;
            }
            for (let k = 0; k<gridStationList[i][j].vStiffner.length;k++){
                pointName = "G" + (i+1) + "V" + vNum
                stationToNameDict[gridStationList[i][j].vStiffner[k]] = pointName
                let masterPoint = PointGenerator(gridStationList[i][j].vStiffner[k],masterLine);
                nameToPointDict[pointName] = SplinePointGenerator(masterPoint, girderLayout.girderSpanPoint[i][j],VerticalDataList, SuperElevation);
                vNum +=1;
            }
            for (let k = 0; k<gridStationList[i][j].connection.length;k++){
                pointName = "G" + (i+1) + "C" + cNum
                stationToNameDict[gridStationList[i][j].connection[k]] = pointName
                let masterPoint = PointGenerator(gridStationList[i][j].connection[k],masterLine);
                nameToPointDict[pointName] = SplinePointGenerator(masterPoint, girderLayout.girderSpanPoint[i][j],VerticalDataList, SuperElevation);
                cNum +=1;
            }
            pointName = "G" + (i+1) + "S" + (j+1)
            stationToNameDict[girderLayout.girderSupportPoint[i][j+1].masterStationNumber] = pointName
            nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j+1];
            pointName = "G" + (i+1) + "S" + (j+2)
            stationToNameDict[girderLayout.girderSupportPoint[i][j+2].masterStationNumber] = pointName
            if (j===spanNumber -1){            
                nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j+2];
            }
            let pts = []
            pts.push(girderLayout.girderSpanPoint[i][j][0].masterStationNumber);
            pts.push(girderLayout.girderSpanPoint[i][j][girderLayout.girderSpanPoint[i][j].length-1].masterStationNumber);
            pts.push(...gridStationList[i][j].diaphragm);
            pts.push(...gridStationList[i][j].vStiffner);
            pts.push(...gridStationList[i][j].connection);
            let md = 1000; //mindistance, 단위수정시 check!
            for (let m = 0;m < skewedStation.length;m++){
                pts.forEach((item, index, array) =>{
                    if (item > skewedStation[m] - md && item < skewedStation[m] + md){
                    pts.splice(index,1)}
                })
            }
            pts.push(...skewedStation);
            pts.sort();
            // console.log(pts)
            ptsList.push(pts);
            stationDict.push(stationToNameDict)
        }
        gridPointStation.push(ptsList);
        stationDictList.push(stationDict)
    }
    return {gridPointStation, stationDictList, nameToPointDict}
}

// export function GirderHeightGenerator(station, girderBaseInfo,nameToPointDict){
//     let R = 0;
//     let x1 = 0;
//     let deltaH = 0;
//     let L = 0;
//     let height = 0;
//     for (let i = 0; i< girderBaseInfo.height.length;i++){
//         // if (station >= round(girder_height.span_start_station,1) && station <= round(girder_height.L2_start_station,1)){
//         //     result = girder_height.H1
//         //     break
//         // }else if (station > round(girder_height.L2_start_station,1) && station < round(girder_height.L2_end_station,1)){
//         //     L = girder_height.L2_end_station - girder_height.L2_start_station
//         //     delta_H = girder_height.H1 - girder_height.H2
//         //     x1 = girder_height.L2_end_station - station

//         let sp = nameToPointDict[girderBaseInfo.height[i].start];
//         let ep = nameToPointDict[girderBaseInfo.height[i].end];
//         if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
//             deltaH = girderBaseInfo.height[i].startH - girderBaseInfo.height[i].endH
//             L = ep.masterStationNumber - sp.masterStationNumber;
//             if (girderBaseInfo.height[i].type == "circle"){
//                 if (deltaH>0){
//                     R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
//                     x1 = ep.masterStationNumber - station;
//                     height = girderBaseInfo.height[i].endH + (R -Math.sqrt(R**2 - x1**2));
//                 }else if (deltaH<0){
//                     R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
//                     x1 = station - sp.masterStationNumber;
//                     height = girderBaseInfo.height[i].startH + (R -Math.sqrt(R**2 - x1**2))
//                 }else{
//                     height = girderBaseInfo.height[i].startH
//                 }
//             }else if (girderBaseInfo.height[i].type == "parabola"){
//                 if (deltaH>0){
//                     x1 = ep.masterStationNumber - station;
//                     height = girderBaseInfo.height[i].endH + deltaH / L**2 * x1**2;
//                 }else if (deltaH<0){
//                     x1 = station - sp.masterStationNumber;
//                     height = girderBaseInfo.height[i].startH - deltaH / L**2 * x1**2;
//                 }else{
//                     height = girderBaseInfo.height[i].startH
//                 }
//             }else{  //straight
//                 x1 = station - sp.masterStationNumber;
//                 height = girderBaseInfo.height[i].startH - x1/L * deltaH
//             }
//             break;
//         }
//     }
//     return height.toFixed(4)*1
// }

export function PointSectionInfo(station,skew, girderBaseInfo,nameToPointDict){
    let forward = {
        height : 0,
        slabThickness :0,
        skew:skew,
        uFlangeW : 0,
        uFlangeThk : 0, 
        lFlangeThk : 0, 
        webThk : 0, 
        uRibH : 0,
        uRibThk : 0, 
        uRibLO : [],
        lRibH : 0,
        lRibThk : 0,
        lRibLO : [],
    };
    let backward = {
        height : 0,
        slabThickness :0,
        skew:skew,
        uFlangeW : 0,
        uFlangeThk : 0, 
        lFlangeThk : 0, 
        webThk : 0, 
        uRibH : 0,
        uRibThk : 0, 
        uRibLO : [],
        lRibH : 0,
        lRibThk : 0,
        lRibLO : [],
    };
    
    let R = 0;
    let x1 = 0;
    let deltaH = 0;
    let L = 0;
    let height = 0;
    for (let i = 0; i< girderBaseInfo.height.length;i++){
        let sp = nameToPointDict[girderBaseInfo.height[i].start];
        let ep = nameToPointDict[girderBaseInfo.height[i].end];
        if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
            deltaH = girderBaseInfo.height[i].startH - girderBaseInfo.height[i].endH
            L = ep.masterStationNumber - sp.masterStationNumber;
            if (girderBaseInfo.height[i].type == "circle"){
                if (deltaH>0){
                    R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i].endH + (R -Math.sqrt(R**2 - x1**2));
                }else if (deltaH<0){
                    R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i].startH + (R -Math.sqrt(R**2 - x1**2))
                }else{
                    height = girderBaseInfo.height[i].startH
                }
            }else if (girderBaseInfo.height[i].type == "parabola"){
                if (deltaH>0){
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i].endH + deltaH / L**2 * x1**2;
                }else if (deltaH<0){
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i].startH - deltaH / L**2 * x1**2;
                }else{
                    height = girderBaseInfo.height[i].startH
                }
            }else{  //straight
                x1 = station - sp.masterStationNumber;
                height = girderBaseInfo.height[i].startH - x1/L * deltaH
            }
            break;
        }
    }
    forward.height = height;
    backward.height = height;


    let slabThickness = 0;
    for (let i = 0; i< girderBaseInfo.slabThickness.length;i++){
        let sp = nameToPointDict[girderBaseInfo.slabThickness[i].start];
        let ep = nameToPointDict[girderBaseInfo.slabThickness[i].end];
        if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
            deltaH = girderBaseInfo.slabThickness[i].startH - girderBaseInfo.slabThickness[i].endH
            L = ep.masterStationNumber - sp.masterStationNumber;
            //straight
            x1 = station - sp.masterStationNumber;
            slabThickness = girderBaseInfo.slabThickness[i].startH - x1/L * deltaH
            break;
        }else{
            slabThickness = 270; // slab thickness추후 예외상황없도록 수정
        }
    }
    forward.slabThickness = slabThickness;
    backward.slabThickness = slabThickness;

    var uFlange = girderBaseInfo.uFlange.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(uFlange.length>0){
        forward.uFlangeThk = uFlange[0].thickness
        forward.uFlangeW = uFlange[0].startW + (uFlange[0].endW - uFlange[0].startW)* (station - nameToPointDict[uFlange[0].start].masterStationNumber) / (nameToPointDict[uFlange[0].end].masterStationNumber - nameToPointDict[uFlange[0].start].masterStationNumber)
    }
    uFlange = girderBaseInfo.uFlange.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(uFlange.length>0){
        backward.uFlangeThk = uFlange[0].thickness
        backward.uFlangeW = uFlange[0].startW + (uFlange[0].endW - uFlange[0].startW)* (station - nameToPointDict[uFlange[0].start].masterStationNumber) / (nameToPointDict[uFlange[0].end].masterStationNumber - nameToPointDict[uFlange[0].start].masterStationNumber)
    }

    var lFlange = girderBaseInfo.lFlange.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(lFlange.length>0){
        forward.lFlangeThk = lFlange[0].thickness
    }
    lFlange = girderBaseInfo.lFlange.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(lFlange.length>0){
        backward.lFlangeThk = lFlange[0].thickness
    }

    var web = girderBaseInfo.web.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(web.length>0){
        forward.webThk = web[0].thickness
    }
    web = girderBaseInfo.web.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(web.length>0){
        backward.webThk = web[0].thickness
    }

    var uRib = girderBaseInfo.uRib.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(uRib.length>0){
        forward.uRibThk = uRib[0].thickness
        forward.uRibH = uRib[0].height
        forward.uRibLO = uRib[0].layout
    }
    uRib = girderBaseInfo.uRib.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(uRib.length>0){
        backward.uRibThk = uRib[0].thickness
        backward.uRibH = uRib[0].height
        backward.uRibLO = uRib[0].layout
    }

    var lRib = girderBaseInfo.lRib.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(lRib.length>0){
        forward.lRibThk = lRib[0].thickness
        forward.lRibH = lRib[0].height
        forward.lRibLO = lRib[0].layout
    }
    lRib = girderBaseInfo.lRib.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(lRib.length>0){
        backward.lRibThk = lRib[0].thickness
        backward.lRibH = lRib[0].height
        backward.lRibLO = lRib[0].layout
    }

    return {forward, backward}
}

export function OffsetSkewCalculator(masterPoint, masterSkew, offset, masterLine){
    const startSkew = masterSkew
    let offsetStation = masterPoint.masterStationNumber + offset
    const offsetPoint = PointGenerator(offsetStation, masterLine)
    let sign = 1;
    if (masterPoint.normalCos * offsetPoint.normalSin - masterPoint.normalSin * offsetPoint.normalCos >= 0){
        sign = 1;
    }else{
        sign = -1;
    }
    let deltaSkew = (Math.acos(masterPoint.normalCos * offsetPoint.normalCos + masterPoint.normalSin * offsetPoint.normalSin) * 180 / Math.PI).toFixed(4)*1
    let offsetSkew = startSkew - sign * (deltaSkew)
    if (offsetSkew > 90){ offsetSkew -= 180;}
    else if (offsetSkew< -90){ offsetSkew +=180;}
    return offsetSkew
}