export function partProperty(width, thickness, Dy, Dz, cos) {
    // cos는 수직부재 1, 수평부재 0
    const sin = Math.sqrt(1 - cos ** 2)
    let area = width * thickness
    let Ioyy = width * thickness / 12 * ((width * cos) ** 2 + (thickness * sin) ** 2)
    let Iozz = width * thickness / 12 * ((width * sin) ** 2 + (thickness * cos) ** 2)
    return { area, Ioyy, Iozz, Dy, Dz }
}

const SectionAnalysisInput = {
    isDoubleComposite: true,
    isClosedTop: true,
    B1: 0,  //강거더 하부 내부폭
    B2: 0,  //강거더 상부 내부폭
    B3: 0,  //바닥판 콘크리트 폭    //슬래브에 대한 정보는 외부에서 받아와야 함
    wlw: 0,   //좌측웹 폭
    wrw: 0,    //우측웹 폭
    wuf: 0,    //상부플랜지 폭
    wlf: 0,    //하부플랜지 폭
    H: 0,   //강거더 높이
    tlf: 0,  //하부플랜지 두께
    tuf: 0,  //상부플랜지두께
    tw: 0,  //웹두께
    Tcu: 0, //바닥판콘크리트 두께   //슬래브에 대한 정보는 외부에서 받아와야 함
    Th: 0,  //헌치두께              //슬래브에 대한 정보는 외부에서 받아와야 함
    Tcl: 0, //지점콘크리트 두께     //지점콘크리트에 대한 입력 변수 추가
    blf: 0, //하부플랜지 외부폭
    buf: 0, //상부플랜지 외부폭
    Urib: { thickness: 0, height: 0, layout: [] },
    Lrib: { thickness: 0, height: 0, layout: [] },
    horizontal_bracing: { d0: 0, vbArea: 0, dbArea: 0 }, //수직보강재 간격, 수평브레이싱 수직, 사재 단면적
}



const materials = {
    slabConc: { name: "slabConc", elast: 28825.3, shearElast: 12318.5, poissonRatio: 0.17 }, // 강도와 재료 입력으로 자동생성
    bottomConc: { name: "lowerConc", elast: 31209.5, shearElast: 13337.4, poissonRatio: 0.17 },
    Steel: { name: "steelBox", elast: 210000, shearElast: 81000, poissonRatio: 0.3 },
    rebar: { name: "rebar", elast: 200000, shearElast: 80000, poissonRatio: 0.3 },

    // [
    //     [
    //         "slabConc",
    //         28825.3,
    //         12318.5,
    //         0.17,
    //         25
    //     ],
    //     [
    //         "lowerConc",
    //         31209.5,
    //         13337.4,
    //         0.17,
    //         25
    //     ],
    //     [
    //         "steelBox",
    //         210000,
    //         81000,
    //         0.3,
    //         78.5
    //     ],
    //     [
    //         "rebar",
    //         200000,
    //         80000,
    //         0.3,
    //         78.5
    //     ]
    // ]
}
const xbeamInput = {
    tfw: 0,
    tft: 0,
    wh: 0,
    wt: 0,
    bfw: 0,
    bft: 0,
}
const slab = { T: 270, W: 2000, Th: 0 }    // 슬래브에 대한 변수는 추후 외부에서 받아와야 함!

//I형 가로보의 시공단계별 단면계수 생성
export function Isection(xi, materials, slab) {

    let stage1 = {};
    let stage2 = {};
    let stage3 = {};
    let n1 = materials[2][1] / materials[0][1];  //상부바닥판 탄성계수비
    let isteel = [];
    let tfw = xi[0]
    let tft = xi[1]
    let bfw = xi[2]
    let bft = xi[3]
    let wh = xi[4]
    let wt = xi[5]
    isteel.push(partProperty(tfw, tft, wh / 2 + tft / 2, 0, 0))
    isteel.push(partProperty(bfw, bft, -wh / 2 - bft / 2, 0, 0))
    isteel.push(partProperty(wh, wt, 0, 0, 1))

    //합성전 강재 단면
    let ADy = 0;
    let ADz = 0;

    stage1.A = 0;
    for (let i in isteel) {
        stage1.A += isteel[i].area
        ADy += isteel[i].area * isteel[i].Dy
        ADz += isteel[i].area * isteel[i].Dz
    }
    stage1.Cy = ADy / stage1.A
    stage1.Cz = ADz / stage1.A
    stage1.Iyy = 0;
    stage1.Izz = 0;
    stage1.Ixx = 0;  // 추후 비틀림 강성에 대한 값을 계산하여야 함
    for (let i in isteel) {
        stage1.Iyy += isteel[i].Ioyy + isteel[i].area * (isteel[i].Dy - stage1.Cy) ** 2
        stage1.Izz += isteel[i].Iozz + isteel[i].area * (isteel[i].Dz - stage1.Cz) ** 2
    }
    // 단일 합성후 가로보단면 변화 없음
    stage2 = stage1
    //이중합성후 합성단면의 단면계수 계산
    let deckConc = partProperty(slab.W / n1, slab.T, wh / 2 + slab.T / 2 + slab.Th, 0, 0)
    isteel.push(deckConc)
    ADy += deckConc.area * deckConc.Dy
    ADz += deckConc.area * deckConc.Dz
    stage3.A = stage2.A + deckConc.area;
    stage3.Cy = ADy / stage3.A
    stage3.Cz = ADz / stage3.A
    stage3.Iyy = 0;
    stage3.Izz = 0;
    stage3.Ixx = 0; // 추후 비틀림 강성에 대한 값을 계산하여야 함
    for (let i in isteel) {
        stage3.Iyy += isteel[i].Ioyy + isteel[i].area * (isteel[i].Dy - stage3.Cy) ** 2
        stage3.Izz += isteel[i].Iozz + isteel[i].area * (isteel[i].Dz - stage3.Cz) ** 2
    }

    return [stage1, stage2, stage3]
}
//이중합성 거더의 시공단계별 단면계수 생성
export function DCBsection(sa, materials) {
    let n1 = materials[2][1] / materials[0][1];  //상부바닥판 탄성계수비
    let n2 = materials[2][1] / materials[1][1];  //하부콘크리트 탄성계수비
    let lcos = sa.H / Math.sqrt(sa.H ** 2 + ((sa.B2 - sa.B1) / 2) ** 2)
    let rcos = lcos
    let sb = [];

    if (sa.isClosedTop) {
        sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, sa.B2 / 2, 0))
        sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, -sa.B2 / 2, 0))
    } else {
        sb.push(partProperty(sa.wuf, sa.tuf, sa.H / 2 + sa.tuf / 2, 0, 0))
    }
    sb.push(partProperty(sa.wlf, sa.tlf, -sa.H / 2 - sa.tlf / 2, 0, 0))
    sb.push(partProperty(sa.wlw, sa.tw, 0, -(sa.B2 + sa.B1) / 4, lcos))
    sb.push(partProperty(sa.wrw, sa.tw, 0, (sa.B2 + sa.B1) / 4, rcos))
    sa.Urib.layout.forEach(function (elem) {
        sb.push(partProperty(sa.Urib.height, sa.Urib.thickness, sa.H / 2 - sa.Urib.height / 2, elem, 1))
    })
    sa.Lrib.layout.forEach(function (elem) {
        sb.push(partProperty(sa.Lrib.height, sa.Lrib.thickness, -sa.H / 2 + sa.Lrib.height / 2, elem, 1))
    })
    let stage1 = {}
    let stage2 = {}
    let stage3 = {}

    //비틀림 강성 계산을 위한 수평브레이싱 등가 두께 계산

    if (sa.isClosedTop === false) {
        let hb = sa.horizontal_bracingbracing
        let bracing_length = Math.Sqrt(hb.d0 ** 2 + sa.B2 ** 2)
        //tr = material.Steel.elast / material.Steel.shear_elast * .lamda * .B2 / (bracing_length ^ 3 / .horizontal_bracing.Area + 2 / 3 * .B2 / (.b_2 * .t2))
        let tr = materials[2][1] / materials[2][2] * hb.d0 * sa.B2 / (bracing_length ** 3 / hb.dbArea + 2 / 3 * sa.B2 / (sa.wuf * sa.tuf)) //<--- 임시로 작성
        stage1.Ixx = 4 * ((sa.B2 + sa.B1) * sa.H / 2) ** 2 / (sa.B2 / tr + sa.wlw / sa.tw + sa.wrw / sa.tw + sa.B1 / sa.tlf)
    } else {
        stage1.Ixx = 4 * ((sa.B2 + sa.B1) * sa.H / 2) ** 2 / (sa.B2 / sa.tuf + sa.wlw / sa.tw + sa.wrw / sa.tw + sa.B1 / sa.tlf)
    }
    //가로보 시공 후 또는 바닥판 타설후 비틀림 강성은 의미가 없으므로, 해석시에는 합성전후 거더의 비틀림강성이 동일하다고 가정한다.
    stage2.Ixx = stage1.Ixx
    stage3.Ixx = stage1.Ixx

    //합성전 강재 단면
    let ADy = 0;
    let ADz = 0;

    stage1.A = 0;
    for (let i in sb) {
        stage1.A += sb[i].area
        ADy += sb[i].area * sb[i].Dy
        ADz += sb[i].area * sb[i].Dz
    }
    stage1.Cy = ADy / stage1.A
    stage1.Cz = ADz / stage1.A
    stage1.Iyy = 0;
    stage1.Izz = 0;
    for (let i in sb) {
        stage1.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage1.Cy) ** 2
        stage1.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage1.Cz) ** 2
    }

    //단일합성후 합성단면의 단면계수 계산
    let botConc = partProperty(sa.B1 / n2, sa.Tcl, -sa.H / 2 + sa.Tcl / 2, 0, 0)
    sb.push(botConc)
    if (sa.isDoubleComposite === false) {
        stage2 = stage1
    } else {
        ADy += botConc.area * botConc.Dy
        ADz += botConc.area * botConc.Dz
        stage2.A = stage1.A + botConc.area;
        stage2.Cy = ADy / stage2.A
        stage2.Cz = ADz / stage2.A
        stage2.Iyy = 0;
        stage2.Izz = 0;
        for (let i in sb) {
            stage2.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage2.Cy) ** 2
            stage2.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage2.Cz) ** 2
        }
    }
    //이중합성후 합성단면의 단면계수 계산
    let deckConc = partProperty(sa.B3 / n1, sa.Tcu, sa.H / 2 + sa.Tcu / 2 + sa.Th, 0, 0)
    sb.push(deckConc)
    ADy += deckConc.area * deckConc.Dy
    ADz += deckConc.area * deckConc.Dz
    stage3.A = stage2.A + deckConc.area;
    stage3.Cy = ADy / stage3.A
    stage3.Cz = ADz / stage3.A
    stage3.Iyy = 0;
    stage3.Izz = 0;
    for (let i in sb) {
        stage3.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage3.Cy) ** 2
        stage3.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage3.Cz) ** 2
    }
    return [stage1, stage2, stage3]
}

export function SupportGenerator(supportFixed, supportData, gridPoint) {
    let support = {}
    let girderHeight = 2000;    //임시로 2000이라고 가정함. 추후 girderSection정보로부터 받아올수 있도록 함.
    let fixedPoint = []
    let isFixed = false
    let angle = 0;
    let sign = 1;
    let type = ""
    let name = ""
    let point = {}
    const dof = {
        고정단: [true, true, true, false, false, false],
        양방향단: [false, false, true, false, false, false],
        횡방향가동: [true, false, true, false, false, false],
        종방향가동: [false, true, true, false, false, false],
    }
    let fixedCoord = { x: 0, y: 0, z: 0 }
    // 고정단기준이 체크되지 않거나, 고정단이 없을 경우에는 접선방향으로 받침을 계산함
    if (supportFixed) {
        fixedPoint = supportData.filter(function (value) { return value[1] == '고정단' })
    }
    if (fixedPoint.length > 0) {
        isFixed = true
        let fixed = gridPoint[fixedPoint[0].point];
        let skew = fixed.skew * Math.PI / 180
        let offset = fixedPoint[0].offset
        fixedCoord = {
            x: fixed.x - (Math.cos(skew) * (-1) * fixed.normalSin - Math.sin(skew) * fixed.normalCos) * offset,
            y: fixed.y - (Math.sin(skew) * (-1) * fixed.normalSin + Math.cos(skew) * fixed.normalCos) * offset,
            z: fixed.z - girderHeight
        }
    }

    for (let index in supportData) {
        name = supportData[index][0] //.point
        type = supportData[index][1] //.type
        let offset = supportData[index][2] //.offset
        point = gridPoint[name]
        console.log(name, point)
        let skew = point.skew * Math.PI / 180
        let newPoint = {
            x: point.x - (Math.cos(skew) * (-1) * point.normalSin - Math.sin(skew) * point.normalCos) * offset,
            y: point.y - (Math.sin(skew) * (-1) * point.normalSin + Math.cos(skew) * point.normalCos) * offset,
            z: point.z - girderHeight
        }
        if (isFixed && name !== fixedPoint[0].point) {

            if (name.slice(2) === fixedPoint[0].point.slice(2)) {
                angle = Math.atan2(newPoint.y - fixedCoord.y, newPoint.x - fixedCoord.x) * 180 / Math.PI + 90;
            } else {
                angle = Math.atan2(newPoint.y - fixedCoord.y, newPoint.x - fixedCoord.x) * 180 / Math.PI;
            }
        } else {
            sign = point.normalCos >= 0 ? 1 : -1;
            angle = sign * Math.acos(-point.normalSin) * 180 / Math.PI;
        }
        support[index] = {
            angle: angle > 90 ? angle - 180 : angle < -90 ? angle + 180 : angle,
            point: newPoint,
            basePointName: name,
            key: "SPPT" + index,
            type: dof[type], //[x,y,z,rx,ry,rz]
        }
    }
    return support

}
/**
<summary>
각 요소별 포함하고 있는 노드의 리스트를 출력 및 sap.s2k 인풋결과 출력을 하며, 동시에 받침점에 대한 Local angle을 정의함
</summary>
<param name="girder_point_dict"></param>
<param name="xbeam_info"></param>
<param name="stringer_info"></param>
<returns></returns>
**/
export function SapJointGenerator(girderStation, supportNode, xbeamData) {//girder_layout, girder_point_dict, xbeam_info, stringer_info, support_data, all_beam_Section_info){
    let nodeNum = 1;
    let node = { command: "JOINT", data: [] };
    let local = { command: "LOCAL", data: [] }
    let boundary = { command: "RESTRAINT", data: [] }
    let rigid = { command: "CONSTRAINT", data: [] }
    let nodeNumDict = {};
    let dummycoord = [-1, -1, -1];

    for (let i in girderStation) {
        for (let j in girderStation[i]) {

            nodeNumDict[girderStation[i][j].key] = nodeNum
            if (dummycoord[0] !== girderStation[i][j].point.x ||
                dummycoord[1] !== girderStation[i][j].point.y ||
                dummycoord[2] !== girderStation[i][j].point.z) {
                node.data.push({ nodeNum: nodeNum, coord: [girderStation[i][j].point.x, girderStation[i][j].point.y, girderStation[i][j].point.z] })
                nodeNum++
                dummycoord = [girderStation[i][j].point.x, girderStation[i][j].point.y, girderStation[i][j].point.z];
            }
        }
    }
    // let supportNode = SupportGenerator(supportFixed, supportData, gridPoint) // <-- 추후 함수 밖으로 보내야함
    for (let i in supportNode) {
        node.data.push({ nodeNum: nodeNum, coord: [supportNode[i].point.x, supportNode[i].point.y, supportNode[i].point.z] })
        nodeNumDict[supportNode[i].key] = nodeNum
        local.data.push({ nodeNum: nodeNum, ANG: supportNode[i].angle })
        boundary.data.push({ nodeNum: nodeNum, DOF: supportNode[i].type })
        // rigid.data.push({ master: nodeNumDict[supportNode[i].basePointName], 
        //     slave: [nodeNumDict[supportNode[i].key]] }) //해당 결과가 sap에서 에러가 없는지 확인필요함.
        nodeNum++
    }
    //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[]}];
    for (let i in xbeamData) {
        if (xbeamData[i].isKframe) {
            for (let j in xbeamData[i].data) {
                node.data.push({ nodeNum: nodeNum, coord: [xbeamData[i].data[j].x, xbeamData[i].data[j].y, xbeamData[i].data[j].z] });
                nodeNumDict[xbeamData[i].key + "P" + j] = nodeNum
                nodeNum++
            }
            rigid.data.push({ master: nodeNumDict[xbeamData[i].inode], slave: [nodeNumDict[xbeamData[i].key + "P0"], nodeNumDict[xbeamData[i].key + "P3"]] })
            rigid.data.push({ master: nodeNumDict[xbeamData[i].jnode], slave: [nodeNumDict[xbeamData[i].key + "P1"], nodeNumDict[xbeamData[i].key + "P2"]] })
        }
    }
    // xbeam stringer에 대한 절점 추가 입력 필요
    // stringerLayout input 추가 필요
    return { nodeNumDict, input: { node, local, boundary, rigid } }
}
// 합성전단계에 대해서 일단 우선 생성
// stringer/외측빔에 대한 단면정보 생성은 추후 결정
export function AllSectionGenerator(girderStation, sectionPointDict, materials, xbeamData) {
    let sectionPropDict = {};
    for (let i in girderStation) {
        for (let j in girderStation[i]) {
            let key = girderStation[i][j].key
            let sa = sectionPointDict[key].forward.input
            let sa2 = sectionPointDict[key].backward.input
            sectionPropDict[key] = { forward: {}, backward: {} }
            sectionPropDict[key].forward = DCBsection(sa, materials)
            sectionPropDict[key].backward = DCBsection(sa2, materials)
        }
    }
    for (let i in xbeamData) {
        if (xbeamData[i].isKframe === false) {
            let slab = { W: 2000, T: 270, Th: 0 } //추후 자동으로 계산되어야 함 20.04.01 by dr.lim
            let key = xbeamData[i].key
            sectionPropDict[key] = Isection(xbeamData[i].section, materials, slab)
        }
    }
    return sectionPropDict;
}
function SectionCompare(section1, section2) {
    let result = true
    result = section1.A === section2.A && section1.Ixx && section2.Ixx && section1.Iyy === section2.Iyy
        && section1.Izz === section2.Izz ? true : false
    return result
}
export function SapFrameGenerator(girderStation, sectionPointDict, xbeamData, supportNode, nodeNumDict, materials, sectionDB) {//consStep, all_material, girder_section_info, all_beam_section_info){
    let step = 0;
    let allElement = []; // As New List(Of Element_3d)
    let elemNum = 1; // As Integer = 1
    // let sectionNameDict = {}
    let material = { command: "MATERIAL", data: [] }
    for (let i in materials) {
        material.data.push({
            NAME: materials[i][0],
            IDES: "C", // 강재는 S, concrte C
            M: materials[i][4] / 9.81 / 1000,  // ton to kN <-- 추후 수정필요
            W: materials[i][4] / 1000, // ton to kg
            E: materials[i][1] * 1,
            U: materials[i][3] * 1
        })
    }

    let sectionPropDict = AllSectionGenerator(girderStation, sectionPointDict, materials, xbeamData)
    let selfWeight = { command: "LOAD", type: "Distributed Span", Name: "SteelBox", data: [] }
    let sectionNum = 1;
    let tsectionNum = 1;
    let generalSectionList = [];
    let taperedSectionList = [];
    for (let i in girderStation) {
        let tempSection = { name: "temp", A: 0, Ixx: 0, Iyy: 0, Izz: 0 }
        for (let j = 0; j < girderStation[i].length - 1; j++) {
            let inode = girderStation[i][j].key
            let jnode = girderStation[i][j + 1].key
            if (nodeNumDict[inode] !== nodeNumDict[jnode]) {
                let sectionName = "noname" // 임시로 작성 추후 수정 바람.
                let section1 = sectionPropDict[inode].forward[step]
                let section2 = sectionPropDict[jnode].backward[step]
                if (SectionCompare(tempSection, section1)) {
                    if (SectionCompare(section1, section2)) {
                        sectionName = tempSection.name
                    }
                    else {
                        sectionName = "t" + tsectionNum
                        tsectionNum++
                        generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section2.A, I: [section2.Iyy, section2.Izz], J: section2.Ixx })
                        section2["name"] = sectionNum
                        taperedSectionList.push({
                            Name: sectionName,
                            type: "Nonpr",
                            Sec: [tempSection.name, sectionNum],  //isection, jsection
                            Eivar: [2, 1],  //EI variation 1: linear, 2: parabola, 3: cubic {EI22, EI33}
                            Vl: 1
                        })
                        sectionNum++
                    }
                }
                else {
                    if (SectionCompare(section1, section2)) {
                        sectionName = sectionNum
                        generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx })
                        section2["name"] = sectionNum
                        sectionNum++
                    } else {
                        sectionName = "t" + tsectionNum
                        tsectionNum++
                        generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx })
                        sectionNum++
                        generalSectionList.push({ NAME: sectionNum, Mat: materials[2][0], A: section2.A, I: [section2.Iyy, section2.Izz], J: section2.Ixx })
                        taperedSectionList.push({
                            Name: sectionName,
                            type: "Nonpr",
                            Sec: [sectionNum - 1, sectionNum],  //isection, jsection
                            Eivar: [2, 1],  //EI variation 1: linear, 2: parabola, 3: cubic {EI22, EI33}
                            Vl: 1
                        })
                        section2["name"] = sectionNum
                        sectionNum++
                    }

                }
                tempSection = section2;
                // sectionNameDict[sectionName] = [sectionPropDict[inode].forward, sectionPropDict[jnode].backward]
                let elem = {
                    iNode: nodeNumDict[inode],
                    jNode: nodeNumDict[jnode],
                    sectionName: sectionName, // node_group.Key & added_index,
                    endOffset: false,
                    number: elemNum
                }
                allElement.push(elem)
                let p1 = -1 * section1.A * material.data[2].W   //materials : steel
                let p2 = -1 * section2.A * material.data[2].W   //materials : steel
                selfWeight.data.push({ elem: elemNum, RD: [0, 1], Uzp: [p1, p2] })
                elemNum++
            }
        }
    }
    let DBSectionList = [];
    //xbeamData = [{inode:"key1", jnode:"key2",key : "X01", isKframe : true, data:[], section:[상형,하현,사재]}];
    for (let i in xbeamData) {
        if (xbeamData[i].isKframe) {
            let KLink = [[0, 1], [2, 4], [3, 4], [0, 4], [1, 4]] // 상현, 하현1, 하현2, 사재1, 사재2
            xbeamData[i].section.forEach(function (elem) {
                if (DBSectionList.includes(elem) === false) {
                    DBSectionList.push(elem)
                }
            })
            let sectionName = [xbeamData[i].section[0], xbeamData[i].section[1], xbeamData[i].section[1], xbeamData[i].section[2], xbeamData[i].section[2]]
            for (let j = 0; j < 5; j++) {
                let inode = xbeamData[i].key + "P" + KLink[j][0]
                let jnode = xbeamData[i].key + "P" + KLink[j][1]
                let elem = {
                    iNode: nodeNumDict[inode],
                    jNode: nodeNumDict[jnode],
                    sectionName: sectionName[j], // node_group.Key & added_index,
                    endOffset: false,
                    number: elemNum
                }
                allElement.push(elem)
                elemNum++
            }
        } else {
            let sectionName = xbeamData[i].key // 임시로 작성 추후 수정 바람.
            let section1 = sectionPropDict[xbeamData[i].key][step]
            generalSectionList.push({ NAME: sectionName, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx })
            // sectionNameDict[sectionName] = [sectionPropDict[sectionName]]  //가로보는 변단면 반영하지 않음.
            let elem = {
                iNode: nodeNumDict[xbeamData[i].inode],
                jNode: nodeNumDict[xbeamData[i].jnode],
                sectionName: sectionName, // node_group.Key & added_index,
                endOffset: true,
                number: elemNum,
                IOFF: xbeamData[i].data[0],
                JOFF: xbeamData[i].data[1]
            }
            allElement.push(elem)
            elemNum++
        }
    }

    DBSectionList.forEach(function (elem) {
        let section1 = sectionDB[elem]
        generalSectionList.push({ NAME: elem, Mat: materials[2][0], A: section1.A, I: [section1.Iyy, section1.Izz], J: section1.Ixx })
    })

    generalSectionList.push({ NAME: "rigid", Mat: materials[2][0], A: 1000000000, I: [10000000000, 10000000000], J: 10000000000 })

    for (let i in supportNode) {
        let elem = {
            iNode: nodeNumDict[supportNode[i].basePointName],
            jNode: nodeNumDict[supportNode[i].key],
            sectionName: "rigid", // node_group.Key & added_index,
            endOffset: false,
            number: elemNum,
        }
        allElement.push(elem)
        elemNum++
    }

    // deck, stringer  추후 작성
    // sectionDB운용방안 마련
    //    const materials = {
    //     slabConc: { name: "slabConc", elast: 28825.3, shearElast: 12318.5, poissonRatio: 0.17 w : 25}, // 강도와 재료 입력으로 자동생성
    //     bottomConc: { name: "lowerConc", elast: 31209.5, shearElast: 13337.4, poissonRatio: 0.17 },
    //     Steel: { name: "steelBox", elast: 210000, shearElast: 81000, poissonRatio: 0.3 },
    //     rebar: { name: "rebar", elast: 200000, shearElast: 80000, poissonRatio: 0.3 },
    // }


    let frame = { command: "FRAME", data: allElement };
    let section = { command: "FRAME SECTION", data: { generalSectionList, taperedSectionList } }
    return { sectionPropDict, input: { frame, section, material, selfWeight } }
}