import { PlateRestPoint, WebPoint, ZMove, ToGlobalPoint } from "../geometryModule"
import { LineMatch2 } from "../girder/module"
import { OffsetPoint } from "../line/module"


export function SectionPointDict(pointDict, girderBaseInfo, slabInfo, slabLayout) {
    let result = {};
    let slabToGirder = slabInfo.slabToGirder;

    for (let k in pointDict) {
        if (k.substr(0, 1) === "G") {
            let point = pointDict[k];
            let girderIndex = k.substr(1, 1) - 1;
            let baseInput = {}
            let station = point.masterStationNumber;
            let isFlat = girderBaseInfo[girderIndex].section.isFlat;
            let gradient = isFlat ? 0 : point.gradientY;
            let skew = point.skew;
            let pointSectionInfo = PointSectionInfo(station, skew, girderBaseInfo[girderIndex], slabLayout, pointDict);
            let sectionInfo = girderBaseInfo[girderIndex].section;

            const centerThickness = slabInfo.slabThickness + slabInfo.haunchHeight; //  slab변수 추가
            //   const height = pointSectionInfo.forward.height + centerThickness;
            const lwb = { x: - sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
            const lwt = { x: - sectionInfo.UL, y: - centerThickness };
            const rwb = { x: sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
            const rwt = { x: sectionInfo.UR, y: -centerThickness };
            let forward = {};
            let backward = {};
            let ps = {};
            // let skew = pointSectionInfo.forward.skew; // gridPoint의 skew가 있어 사용여부 확인후 삭제요망
            for (let i = 0; i < 2; i++) {
                if (i === 0) {
                    ps = pointSectionInfo.forward
                } else {
                    ps = pointSectionInfo.backward
                }
                let bottomY = ps.height + centerThickness;
                let topY = slabToGirder ? ps.slabThickness + slabInfo.haunchHeight : centerThickness;

                let Rib = {}
                for (let j in ps.lRibLO) {
                    let lRib = [{ x: ps.lRibLO[j] - ps.lRibThk / 2, y: -bottomY }, { x: ps.lRibLO[j] - ps.lRibThk / 2, y: -bottomY + ps.lRibH },
                    { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -bottomY + ps.lRibH }, { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -bottomY }]
                    let keyname = "lRib" + j
                    Rib[keyname] = lRib
                }


                // leftWeb
                let lw1 = WebPoint(lwb, lwt, 0, -bottomY) //{x:blwX,y:-height}
                let lw2 = WebPoint(lwb, lwt, gradient, -topY) //{x:tlwX,y:gradient*tlwX - slabThickness}
                let lWeb = PlateRestPoint(lw1, lw2, 0, gradient, -ps.webThk);
                // rightWeb
                let rw1 = WebPoint(rwb, rwt, 0, -bottomY) //{x:brwX,y:-height}
                let rw2 = WebPoint(rwb, rwt, gradient, -topY) //{x:trwX,y:gradient*trwX - slabThickness}
                let rWeb = PlateRestPoint(rw1, rw2, 0, gradient, ps.webThk);
                // bottomplate
                let b1 = { x: lw1.x - sectionInfo.C1, y: -bottomY }
                let b2 = { x: rw1.x + sectionInfo.D1, y: -bottomY }
                let bottomPlate = PlateRestPoint(b1, b2, null, null, -ps.lFlangeThk)

                // newbottomplate
                let lflange = [[], [], []];
                let newbl1 = { x: lw1.x - ps.lFlangeC, y: -bottomY };
                let newbl2 = { x: lw1.x - ps.lFlangeC + ps.lFlangeW, y: -bottomY };
                let newbr1 = { x: rw1.x + ps.lFlangeC, y: -bottomY };
                let newbr2 = { x: rw1.x + ps.lFlangeC - ps.lFlangeW, y: -bottomY };
                if (newbl2.x < newbr2.x) { //양측의 플렌지가 서로 중첩될 경우
                    lflange[0] = PlateRestPoint(newbl1, newbl2, null, null, -ps.lFlangeThk);//gradient가 0인 경우, inf에 대한 예외처리 필요
                    lflange[1] = PlateRestPoint(newbr1, newbr2, null, null, -ps.lFlangeThk);;
                } else {
                    lflange[2] = PlateRestPoint(newbl1, newbr1, null, null, -ps.lFlangeThk);;
                }

                let tan = gradient === 0 ? null : -1 / gradient;
                // TopPlate
                let tl1 = { x: lw2.x - sectionInfo.C, y: lw2.y + gradient * (- sectionInfo.C) };
                let tl2 = { x: lw2.x - sectionInfo.C + ps.uFlangeW, y: lw2.y + gradient * (- sectionInfo.C + ps.uFlangeW) };
                let topPlate1 = PlateRestPoint(tl1, tl2, tan, tan, ps.uFlangeThk);//gradient가 0인 경우, inf에 대한 예외처리 필요
                let tr1 = { x: rw2.x + sectionInfo.D, y: rw2.y + gradient * (sectionInfo.D) };
                let tr2 = { x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient * (sectionInfo.D - ps.uFlangeW) };
                let topPlate2 = PlateRestPoint(tr1, tr2, tan, tan, ps.uFlangeThk);;
                // newTopPlate
                let uflange = [[], [], []];
                let newtl1 = { x: lw2.x - ps.uFlangeC, y: lw2.y + gradient * (- ps.uFlangeC) };
                let newtl2 = { x: lw2.x - ps.uFlangeC + ps.uFlangeW, y: lw2.y + gradient * (- ps.uFlangeC + ps.uFlangeW) };
                let newtr1 = { x: rw2.x + ps.uFlangeC, y: rw2.y + gradient * (ps.uFlangeC) };
                let newtr2 = { x: rw2.x + ps.uFlangeC - ps.uFlangeW, y: rw2.y + gradient * (ps.uFlangeC - ps.uFlangeW) };

                if (newtl2.x < newtr2.x) { //양측의 플렌지가 서로 중첩될 경우
                    uflange[0] = PlateRestPoint(newtl1, newtl2, tan, tan, ps.uFlangeThk);//gradient가 0인 경우, inf에 대한 예외처리 필요
                    uflange[1] = PlateRestPoint(newtr1, newtr2, tan, tan, ps.uFlangeThk);;
                } else {
                    uflange[2] = PlateRestPoint(newtl1, newtr1, tan, tan, ps.uFlangeThk);;
                }
                let uflangeSide = [-topY, -topY + ps.uFlangeThk]
                let lflangeSide = [-bottomY, -bottomY - ps.lFlangeThk]
                let webSide = [-bottomY, -topY]
                baseInput = {
                    isDoubleComposite: false, // 추후 PointSectionInfo에 관련 변수 추가
                    isClosedTop: tl2.x < tr1.x ? true : false,
                    B1: rw1.x - lw1.x,                                 //강거더 하부 내부폭
                    B2: rw2.x - lw2.x,                                 //강거더 상부 내부폭
                    B3: 3500,  //바닥판 콘크리트 폭                      //슬래브에 대한 정보는 외부에서 받아와야 함
                    wlw: Point2DLength(lw1, lw2),                       //좌측웹 폭
                    wrw: Point2DLength(rw1, rw2),                       //우측웹 폭
                    wuf: tl2.x < tr1.x ? ps.uFlangeW : tr2.x - tl1.x,       //상부플랜지 폭
                    wlf: b2.x - b1.x,                           //하부플랜지 폭
                    H: bottomY - topY,                           //강거더 높이
                    tlf: ps.lFlangeThk,                                //하부플랜지 두께
                    tuf: ps.uFlangeThk,                                 //상부플랜지두께
                    tw: ps.webThk,                                      //웹두께
                    Tcu: ps.slabThickness,                              //바닥판콘크리트 두께          
                    Th: slabInfo.haunchHeight,                                   //헌치두께
                    Tcl: 0,                       //지점콘크리트 두께     //지점콘크리트에 대한 입력 변수 추가
                    blf: (sectionInfo.C1 + sectionInfo.D1) / 2,            //하부플랜지 외부폭
                    buf: (sectionInfo.C + sectionInfo.D) / 2,             //상부플랜지 외부폭
                    Urib: { thickness: ps.uRibThk, height: ps.uRibH, layout: ps.uRibLO },
                    Lrib: { thickness: ps.lRibThk, height: ps.lRibH, layout: ps.lRibLO },
                    horizontal_bracing: { d0: 2500, vbArea: 50, dbArea: 50 }, //수직보강재 간격, 수평브레이싱 수직, 사재 단면적
                }
                if (i === 0) {
                    forward = { input: baseInput, skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib, uflange, lflange, web: [lWeb, rWeb], uflangeSide, lflangeSide, webSide }
                } else {
                    backward = { input: baseInput, skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib, uflange, lflange, web: [lWeb, rWeb], uflangeSide, lflangeSide, webSide }
                }
            }
            result[k] = { forward, backward }
        }
    }
    return result
}

export function PointSectionInfo(station, skew, girderBaseInfo, slabLayout, pointDict) {
    let forward = {
        height: 0,
        slabThickness: 0,
        skew: skew,
        uFlangeC: 0,//캔틸레버길이를 의미함
        uFlangeW: 0,//
        uFlangeThk: 0,
        lFlangeC: 0,//캘틸레버길이를 의미함
        lFlangeW: 0,//
        lFlangeThk: 0,
        webThk: 0,
        uRibH: 0,
        uRibThk: 0,
        uRibLO: [],
        lRibH: 0,
        lRibThk: 0,
        lRibLO: [],
    };
    let backward = {
        height: 0,
        slabThickness: 0,
        skew: skew,
        uFlangeC: 0,
        uFlangeW: 0,
        uFlangeThk: 0,
        lFlangeC: 0,//캘틸레버길이를 의미함
        lFlangeW: 0,//
        lFlangeThk: 0,
        webThk: 0,
        uRibH: 0,
        uRibThk: 0,
        uRibLO: [],
        lRibH: 0,
        lRibThk: 0,
        lRibLO: [],
    };

    let R = 0;
    let x1 = 0;
    let deltaH = 0;
    let L = 0;
    let height = 0;
    let heightb = 0;
    for (let i = 0; i < girderBaseInfo.height.length; i++) {
        let sp = pointDict[girderBaseInfo.height[i][0]];
        let ep = pointDict[girderBaseInfo.height[i][1]];
        if (station >= sp.masterStationNumber && station < ep.masterStationNumber) {
            deltaH = girderBaseInfo.height[i][2] - girderBaseInfo.height[i][3]
            L = ep.masterStationNumber - sp.masterStationNumber;
            if (girderBaseInfo.height[i][4] == "circle") {
                if (deltaH > 0) {
                    R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH)
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i][3] + (R - Math.sqrt(R ** 2 - x1 ** 2));
                } else if (deltaH < 0) {
                    R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH)
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i][2] + (R - Math.sqrt(R ** 2 - x1 ** 2))
                } else {
                    height = girderBaseInfo.height[i][2]
                }
            } else if (girderBaseInfo.height[i][4] == "parabola") {
                if (deltaH > 0) {
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i][3] + deltaH / L ** 2 * x1 ** 2;
                } else if (deltaH < 0) {
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i][2] - deltaH / L ** 2 * x1 ** 2;
                } else {
                    height = girderBaseInfo.height[i][2]
                }
            } else {  //straight
                x1 = station - sp.masterStationNumber;
                height = girderBaseInfo.height[i][2] - x1 / L * deltaH
            }
        }

        if (station > sp.masterStationNumber && station <= ep.masterStationNumber) {
            deltaH = girderBaseInfo.height[i][2] - girderBaseInfo.height[i][3];
            L = ep.masterStationNumber - sp.masterStationNumber;
            if (girderBaseInfo.height[i][4] == "circle") {
                if (deltaH > 0) {
                    R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH)
                    x1 = ep.masterStationNumber - station;
                    heightb = girderBaseInfo.height[i][3] + (R - Math.sqrt(R ** 2 - x1 ** 2));
                } else if (deltaH < 0) {
                    R = Math.abs((L ** 2 + deltaH ** 2) / 2 / deltaH)
                    x1 = station - sp.masterStationNumber;
                    heightb = girderBaseInfo.height[i][2] + (R - Math.sqrt(R ** 2 - x1 ** 2))
                } else {
                    heightb = girderBaseInfo.height[i][2]
                }
            } else if (girderBaseInfo.height[i][4] == "parabola") {
                if (deltaH > 0) {
                    x1 = ep.masterStationNumber - station;
                    heightb = girderBaseInfo.height[i][3] + deltaH / L ** 2 * x1 ** 2;
                } else if (deltaH < 0) {
                    x1 = station - sp.masterStationNumber;
                    heightb = girderBaseInfo.height[i][2] - deltaH / L ** 2 * x1 ** 2;
                } else {
                    heightb = girderBaseInfo.height[i][2]
                }
            } else {  //straight
                x1 = station - sp.masterStationNumber;
                heightb = girderBaseInfo.height[i][2] - x1 / L * deltaH
            }
        }
    }
    forward.height = height;    //
    backward.height = heightb === 0 ? height : heightb;   //형고가 불연속인 경우, 단부절취의 경우 수정이 필요함
    // position:0, T:1, H:2
    let slabThickness = 0;
    for (let i = 0; i < slabLayout.length - 1; i++) {
        let ss = pointDict[slabLayout[i][0]].masterStationNumber;
        let es = pointDict[slabLayout[i + 1][0]].masterStationNumber
        if (station >= ss && station <= es) {
            let x = station - ss
            let l = es - ss
            slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l
        }
    }

    forward.slabThickness = slabThickness;
    backward.slabThickness = slabThickness;

    var uFlange = girderBaseInfo.uFlange.filter(function (element) {
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
    })
    if (uFlange.length > 0) {
        forward.uFlangeThk = uFlange[0][2]
        forward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber)
        forward.uFlangeC = uFlange[0][5] + (uFlange[0][6] - uFlange[0][5]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber)
    }
    uFlange = girderBaseInfo.uFlange.filter(function (element) {
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
    })
    if (uFlange.length > 0) {
        backward.uFlangeThk = uFlange[0][2]
        backward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber)
        backward.uFlangeC = uFlange[0][5] + (uFlange[0][6] - uFlange[0][5]) * (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber)
    }

    var lFlange = girderBaseInfo.lFlange.filter(function (element) {
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
    })
    if (lFlange.length > 0) {
        forward.lFlangeThk = lFlange[0][2]
        forward.lFlangeW = lFlange[0][3] + (lFlange[0][4] - lFlange[0][3]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber)
        forward.lFlangeC = lFlange[0][5] + (lFlange[0][6] - lFlange[0][5]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber)
    }
    lFlange = girderBaseInfo.lFlange.filter(function (element) {
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
    })
    if (lFlange.length > 0) {
        backward.lFlangeThk = lFlange[0][2]
        backward.lFlangeW = lFlange[0][3] + (lFlange[0][4] - lFlange[0][3]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber)
        backward.lFlangeC = lFlange[0][5] + (lFlange[0][6] - lFlange[0][5]) * (station - pointDict[lFlange[0][0]].masterStationNumber) / (pointDict[lFlange[0][1]].masterStationNumber - pointDict[lFlange[0][0]].masterStationNumber)
    }

    var web = girderBaseInfo.web.filter(function (element) {
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
    })
    if (web.length > 0) {
        forward.webThk = web[0][2]
    }
    web = girderBaseInfo.web.filter(function (element) {
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
    })
    if (web.length > 0) {
        backward.webThk = web[0][2]
    }

    var uRib = girderBaseInfo.uRib.filter(function (element) {
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
    })
    if (uRib.length > 0) {
        forward.uRibThk = uRib[0][2]
        forward.uRibH = uRib[0][3]
        forward.uRibLO = uRib[0][4]
    }
    uRib = girderBaseInfo.uRib.filter(function (element) {
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
    })
    if (uRib.length > 0) {
        backward.uRibThk = uRib[0][2]
        backward.uRibH = uRib[0][3]
        backward.uRibLO = uRib[0][4]
    }

    var lRib = girderBaseInfo.lRib.filter(function (element) {
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
    })
    if (lRib.length > 0) {
        forward.lRibThk = lRib[0][2]
        forward.lRibH = lRib[0][3]
        forward.lRibLO = lRib[0][4]
    }
    lRib = girderBaseInfo.lRib.filter(function (element) {
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
    })
    if (lRib.length > 0) {
        backward.lRibThk = lRib[0][2]
        backward.lRibH = lRib[0][3]
        backward.lRibLO = lRib[0][4]
    }

    return { forward, backward }
}

export function DeckSectionPoint(
    masterLine,
    centerLineStations,
    girderLayout,
    slabInfo,
    slabLayout,
    girderBaseInfo,
    pointDict,
) {
    let result = [];
    // let slab1 = [];
    // let slab2 = [];
    const position = 0;
    const T = 1;
    const H = 2;
    // const leftOffset = 3;
    // const rightOffset = 4;

    let centerSlabThickness = slabInfo.slabThickness;
    let haunch = slabInfo.haunchHeight;
    let endT = 0;
    let leftOffset = 0;
    let rightOffset = 0;
    let slabThickness = 0;
    


    for (let i = 1; i < centerLineStations.length - 1; i++) {

        let masterPoint = centerLineStations[i].point
        let masterStation = masterPoint.masterStationNumber;
        let deckSectionPoint = [];
        //deckSectionInfo로 분리예정
        for (let i = 0; i < slabLayout.length - 1; i++) {
            let ss = pointDict[slabLayout[i][position]].masterStationNumber;
            let es = pointDict[slabLayout[i + 1][position]].masterStationNumber;
            if (masterStation >= ss && masterStation <= es) {
                let x = masterStation - ss;
                let l = es - ss;
                leftOffset = slabLayout[i][3] * (l - x) / l + slabLayout[i + 1][3] * (x) / l;
                rightOffset = slabLayout[i][4] * (l - x) / l + slabLayout[i + 1][4] * (x) / l;
                slabThickness = slabLayout[i][H] * (l - x) / l + slabLayout[i + 1][H] * (x) / l;
                endT = slabLayout[i][T] * (l - x) / l + slabLayout[i + 1][T] * (x) / l;
            }
        }
        //deckSectionInfo로 분리예정
        let leftPoint = OffsetPoint(masterPoint, masterLine, leftOffset);
        let rightPoint = OffsetPoint(masterPoint, masterLine, rightOffset);

        let slabUpperPoints = [leftPoint,
            masterPoint,
            rightPoint];

        deckSectionPoint.push({ x: leftOffset, y: leftPoint.z - endT }, { x: leftOffset, y: leftPoint.z }, { x: 0, y: masterPoint.z }, { x: rightOffset, y: rightPoint.z }, { x: rightOffset, y: rightPoint.z - endT })
        let slabLowerPoints = [];
        slabLowerPoints.push({ x: leftPoint.x, y: leftPoint.y, z: leftPoint.z - endT });
        let offsetPoint = [leftOffset];
        let glw = [];
        for (let j in girderLayout.girderLine) {
            // let gridName = "G" + (j * 1 + 1) + slabLayout[i].position.substr(2, 2)
            let girderLine = girderLayout.girderLine[j];
            let girderPoint = LineMatch2(masterPoint, masterLine, girderLine);
            let lw = UflangePoint(girderPoint, pointDict, girderBaseInfo[j], slabInfo, slabLayout);
            lw.forEach(elem => glw.push({x : elem.x + girderPoint.offset, y: elem.y + girderPoint.z}))
            //haunch포인트에 대한 내용을 위의함수에 포함하여야 함. 
            //추후 three.js union함수를 통한 바닥판 계산을 하는것은 어떨지 고민중
            lw.forEach(element => slabLowerPoints.push(ToGlobalPoint(girderPoint, element)));
            offsetPoint.push(girderPoint.offset);
        }
        deckSectionPoint.push(...glw.reverse());
        offsetPoint.push(rightOffset);
        slabLowerPoints.push({ x: rightPoint.x, y: rightPoint.y, z: rightPoint.z - endT });
        result.push({ name: masterStation, key: centerLineStations[i].key, slabUpperPoints, slabLowerPoints, offsetPoint, deckSectionPoint, slabHeight : slabThickness + haunch});

    }
    return result //{ slab1, slab2 }
}
//UflangePoint는 상부플랜지 헌치의 하단좌표를 출력하는 함수임
export function UflangePoint(girderPoint, pointDict, girderBaseInfo, slabInfo, slabLayout) {

    let slabToGirder = slabInfo.slabToGirder;
    let points = [];
    let station = girderPoint.masterStationNumber;
    let isFlat = girderBaseInfo.section.isFlat;
    let gradient = isFlat ? 0 : girderPoint.gradientY;
    let skew = girderPoint.skew;
    let pointSectionInfo = PointSectionInfo(station, skew, girderBaseInfo, slabLayout, pointDict) // slabThickness만 필요한 경우에는 흠...
    let sectionInfo = girderBaseInfo.section
    let ps = pointSectionInfo.forward.uFlangeW === 0 ? pointSectionInfo.backward : pointSectionInfo.forward;
    // let slabThickness = ps.slabThickness - slabInfo.slabThickness
    const centerThickness = slabInfo.slabThickness + slabInfo.haunchHeight; //  slab변수 추가
    let topY = slabToGirder ? ps.slabThickness + slabInfo.haunchHeight : centerThickness;

    //   const height = pointSectionInfo.forward.height + centerThickness;
    const lwb = { x: - sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
    const lwt = { x: - sectionInfo.UL, y: - centerThickness };
    const rwb = { x: sectionInfo.B / 2, y: -sectionInfo.H - centerThickness };
    const rwt = { x: sectionInfo.UR, y: -centerThickness };

    // let lw2 = WebPoint(lwb, lwt, gradient, -slabThickness) //{x:tlwX,y:gradient*tlwX - slabThickness}
    // let rw2 = WebPoint(rwb, rwt, gradient, -slabThickness) //{x:trwX,y:gradient*trwX - slabThickness}

    let lw2 = WebPoint(lwb, lwt, gradient, -topY) //{x:tlwX,y:gradient*tlwX - slabThickness}
    let rw2 = WebPoint(rwb, rwt, gradient, -topY) //{x:trwX,y:gradient*trwX - slabThickness}
    // TopPlate
    // let tl1 = { x: lw2.x - sectionInfo.C - slabInfo.w1, y: lw2.y + gradient * (- sectionInfo.C - slabInfo.w1) };
    // let tl2 = { x: lw2.x - sectionInfo.C + ps.uFlangeW + slabInfo.w1, y: lw2.y + gradient * (- sectionInfo.C + ps.uFlangeW + slabInfo.w1) };
    // let tr1 = { x: rw2.x + sectionInfo.D + slabInfo.w1, y: rw2.y + gradient * (sectionInfo.D + slabInfo.w1) };
    // let tr2 = { x: rw2.x + sectionInfo.D - ps.uFlangeW - slabInfo.w1, y: rw2.y + gradient * (sectionInfo.D - ps.uFlangeW - slabInfo.w1) };
    let w1 = slabInfo.w1; //헌치돌출길이
    let hl1 = slabInfo.haunchHeight + (- gradient + girderPoint.gradientY) * (- ps.uFlangeC - w1)//헌치높이
    let hl2 = slabInfo.haunchHeight + (- gradient + girderPoint.gradientY) * (- ps.uFlangeC + ps.uFlangeW + w1)//헌치높이
    let tl0 = { x: lw2.x - ps.uFlangeC - w1 - hl1 * 3 , y: lw2.y + slabInfo.haunchHeight + girderPoint.gradientY * (- ps.uFlangeC - w1) };
    let tl1 = { x: lw2.x - ps.uFlangeC - w1, y: lw2.y + gradient * (- ps.uFlangeC - w1) };
    let tl2 = { x: lw2.x - ps.uFlangeC + ps.uFlangeW + w1, y: lw2.y + gradient * (- ps.uFlangeC + ps.uFlangeW + w1) };
    let tl3 = { x: lw2.x - ps.uFlangeC + ps.uFlangeW + w1 + hl2 * 3 , y: lw2.y + slabInfo.haunchHeight + girderPoint.gradientY * (- ps.uFlangeC + ps.uFlangeW + w1) };


    let tr1 = { x: rw2.x + ps.uFlangeC + w1, y: rw2.y + gradient * (ps.uFlangeC + w1) };
    let tr2 = { x: rw2.x + ps.uFlangeC - ps.uFlangeW - w1, y: rw2.y + gradient * (ps.uFlangeC - ps.uFlangeW - w1) };


    let dummy = [tl0, tl1, tl2,tl3, tr1, tr2];
    dummy.sort(function (a, b) { return a.x < b.x ? -1 : 1; })
    points.push(...dummy) //이렇게 하면 절대위치에 대한 답을 얻을수가 없음. girderLayout도 호출해야함. 차라리 섹션포인트에서 보간법을 이용해서 좌표를 받아오는 것도 하나의 방법일듯함
    // }
    return points
}

export function Point2DLength(point1, point2) {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
}