import { ZMove, ZOffsetLine } from "../geometryModule"
import { MasterPointGenerator, OffsetPoint } from "../line/module"

export function DeckRebarPoint(
    masterLine,
    pointDict,
    deckSection,
    slabInfo,
    slabLayout,
    rebar1,
    rebar2,
    rebar11
) {
    let name = 0;
    let type = 1;
    let Var = 2;
    let leftCover = 3;
    let rightCover = 4;
    let isUpper = 5;
    let cover = 6;
    let spacing = 7;
    let dia = 8;
    let skew = 9;
    let start = 10;
    let end = 11;
    let startOffset = 12;
    let endOffset = 13;

    let r1 = [];
    let r2 = [];
    for (let rNum in rebar1) {
        let left1 = {};
        let right1 = {};
        let sp = pointDict[rebar1[rNum][start]];
        let ep = pointDict[rebar1[rNum][end]];
        let station = sp.masterStationNumber + rebar1[rNum][startOffset];
        let zOffset = 0; //slabInfo.slabThickness + slabInfo.haunchHeight
        let iter = 0;
        while (station <= ep.masterStationNumber + rebar1[rNum][endOffset]) {
            let mp1 = MasterPointGenerator(station, masterLine);
            // let mp2 = MasterPointGenerator(ep.masterStationNumber + rebar1[0].endOffset,masterLine);

            for (let i = 0; i < slabLayout.length - 1; i++) {
                let ss = pointDict[slabLayout[i][0]].masterStationNumber;
                let es = pointDict[slabLayout[i + 1][0]].masterStationNumber
                if (mp1.masterStationNumber >= ss && mp1.masterStationNumber <= es) {
                    let x = mp1.masterStationNumber - ss
                    let l = es - ss
                    let leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l
                    let rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l
                    let slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l
                    let z = rebar1[rNum][isUpper] ? zOffset - rebar1[rNum][cover] : zOffset - slabThickness + rebar1[rNum][cover]
                    left1 = OffsetPoint(mp1, masterLine, leftOffset + rebar1[rNum][leftCover]);
                    right1 = OffsetPoint(mp1, masterLine, rightOffset - rebar1[rNum][rightCover]);
                    if (rebar1[rNum][type] === "C") {
                        r1.push([ZMove(left1, zOffset - slabThickness + rebar1[rNum][Var][0]),
                        ZMove(left1, z), ZMove(mp1, z), ZMove(right1, z),
                        ZMove(right1, zOffset - slabThickness + rebar1[rNum][Var][0]),
                        ]);
                    } else {
                        r1.push([ZMove(left1, z), ZMove(mp1, z), ZMove(right1, z),]);
                    }
                    break;
                }
            }
            station += rebar1[rNum][spacing];
            //   iter ++;
            //   if (iter>100){break;}
        }
    }

    let tSlab = [];
    let bSlab = [];
    deckSection.forEach(function(elem){
        tSlab.push({name : elem.name, points : elem.slabUpperPoints});
        bSlab.push({name : elem.name, points : elem.slabLowerPoints});
    })

    for (let rNum in rebar2) {
        let bPts = []
        let lrebar = [];
        let slabLine = rebar2[rNum][isUpper] ? tSlab : bSlab;
        let sp = pointDict[rebar2[rNum][start]].masterStationNumber;
        let ep = pointDict[rebar2[rNum][end]].masterStationNumber;
        let cov = rebar2[rNum][isUpper] ? -rebar2[rNum][cover] : rebar2[rNum][cover];
        slabLine.forEach(function (elem) {
            if (elem.name >= sp && elem.name <= ep) {
                bPts.push(ZOffsetLine(elem.points, cov))
            }
        })
        
        // console.log(ZOffsetLine(deckSection.slab2[18].points,70))
        let iMax = bPts.length - 1
        let spt = longiRebarEndPoints(bPts[0], bPts[1], rebar2[rNum][startOffset], true)
        let ept = longiRebarEndPoints(bPts[iMax - 1], bPts[iMax], rebar2[rNum][endOffset], false)
        lrebar.push(InterPolation2(spt, rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]))
        for (let i = 1; i < iMax; i++) {
            lrebar.push(InterPolation2(bPts[i], rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]))
        }
        lrebar.push(InterPolation2(ept, rebar2[rNum][spacing], rebar2[rNum][leftCover], rebar2[rNum][rightCover], rebar2[rNum][Var]))
        for (let i = 0; i < lrebar[0].length; i++) {
            let pts = []
            for (let j = 0; j < lrebar.length; j++) {
                if (lrebar[j][i]){
                    pts.push(lrebar[j][i])
                 }
            }
            r2.push(pts)
        }
    }


    let isLeft = 3;
    let isRight = 4;
    spacing = 5;
    dia = 6;
    skew = 7;
    start = 8;
    end = 9;
    startOffset = 10;
    endOffset = 11;


    for (let rNum in rebar11) {
        let left1 = {};
        let right1 = {};
        let sp = pointDict[rebar11[rNum][start]];
        let ep = pointDict[rebar11[rNum][end]];
        let station = sp.masterStationNumber + rebar11[rNum][startOffset];
        let zOffset = 0; //slabInfo.slabThickness + slabInfo.haunchHeight
        let iter = 0;
        while (station <= ep.masterStationNumber + rebar11[rNum][endOffset]) {
            let mp1 = MasterPointGenerator(station, masterLine);
            // let mp2 = MasterPointGenerator(ep.masterStationNumber + rebar1[0].endOffset,masterLine);
            for (let i = 0; i < slabLayout.length - 1; i++) {
                let ss = pointDict[slabLayout[i][0]].masterStationNumber;
                let es = pointDict[slabLayout[i + 1][0]].masterStationNumber
                if (mp1.masterStationNumber >= ss && mp1.masterStationNumber <= es) {
                    let x = mp1.masterStationNumber - ss
                    let l = es - ss
                    let leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l
                    let rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l
                    let slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l
                    let endT = slabLayout[i][1] * (l - x) / l + slabLayout[i + 1][1] * (x) / l
                    if (rebar11[rNum][isLeft]) {
                        let rebarPts = []
                        let offset = 0;
                        for (let j = 2; j < rebar11[rNum][Var].length; j++) {
                            offset += rebar11[rNum][Var][j]
                            rebarPts.push(OffsetPoint(mp1, masterLine, leftOffset + offset))
                        }
                        r1.push([ZMove(rebarPts[0], zOffset - endT + rebar11[rNum][Var][0]),
                        ZMove(rebarPts[1], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                        ZMove(rebarPts[2], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                        ZMove(rebarPts[3], zOffset - rebar11[rNum][Var][1])])
                    }
                    if (rebar11[rNum][isRight]) {
                        let rebarPts = []
                        let offset = 0;
                        for (let j = 2; j < rebar11[rNum][Var].length; j++) {
                            offset += rebar11[rNum][Var][j]
                            rebarPts.push(OffsetPoint(mp1, masterLine, rightOffset - offset))
                        }
                        r1.push([ZMove(rebarPts[0], zOffset - endT + rebar11[rNum][Var][0]),
                        ZMove(rebarPts[1], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                        ZMove(rebarPts[2], zOffset - slabThickness - slabInfo.haunchHeight + rebar11[rNum][Var][0]),
                        ZMove(rebarPts[3], zOffset - rebar11[rNum][Var][1])])
                    }
                }
            }
            station += rebar1[rNum].spacing;
        }
    }

    return { r1, r2, }
}

//   export function InterPolation(point1, point2, spacing) {
//     let result = [];
//     let length = Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
//     let remainder = length % spacing
//     let x = 0
//     for (let i = 0; i < length / spacing; i++) {
//       result.push({
//         x: point1.x * (length - x) / length + point2.x * x / length,
//         y: point1.y * (length - x) / length + point2.y * x / length,
//         z: point1.z * (length - x) / length + point2.z * x / length
//       })
//       x = remainder > 0 && i === 1 ? x + remainder / 2 + spacing / 2 : x + spacing;
//       result.push(point2)
//     }

//     return result
//   }

export function InterPolation2(points, spacing, leftCover, rightCover, variables) {
    let result = [];
    let distanceList = [0];
    let accLength = 0;
    for (let i = 0; i < points.length - 1; i++) {
        let l = Math.sqrt((points[i + 1].x - points[i].x) ** 2 + (points[i + 1].y - points[i].y) ** 2);
        accLength += l;
        distanceList.push(accLength);
    }

    let W = (accLength - leftCover - rightCover)
    let remainder = W % spacing

    let x = leftCover
    for (let i = 0; i < W / spacing + 1; i++) {
        if (variables == false || variables.length === 0 || x <= leftCover + variables[0] || x >= leftCover + W - variables[1]) {
            for (let j = 0; j < distanceList.length - 1; j++) {
                if (x >= distanceList[j] && x <= distanceList[j + 1]) {
                    let segX = x - distanceList[j]
                    let segL = distanceList[j + 1] - distanceList[j]
                    result.push({
                        x: points[j].x * (segL - segX) / segL + points[j + 1].x * segX / segL,
                        y: points[j].y * (segL - segX) / segL + points[j + 1].y * segX / segL,
                        z: points[j].z * (segL - segX) / segL + points[j + 1].z * segX / segL
                    })
                    break;
                }
            }
        }
        x = remainder > 0 && (i === 0 || i === Math.floor(W / spacing)) ? x + remainder / 2 + spacing / 2 : x + spacing;
        // result.push(points[points.length-1])
    }
    if (result.length < 1 ){
    }
    return result
}

export function longiRebarEndPoints(startPoints, endPoints, Offset, isStart) {
    let result = [];
    for (let i in startPoints) {

        let segL = Math.sqrt((endPoints[i].x - startPoints[i].x) ** 2 + (endPoints[i].y - startPoints[i].y) ** 2);
        let segX = isStart ? Offset : segL + Offset;
        result.push({
            x: startPoints[i].x * (segL - segX) / segL + endPoints[i].x * segX / segL,
            y: startPoints[i].y * (segL - segX) / segL + endPoints[i].y * segX / segL,
            z: startPoints[i].z * (segL - segX) / segL + endPoints[i].z * segX / segL
        })
    }

    return result
}




