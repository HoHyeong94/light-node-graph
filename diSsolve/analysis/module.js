export function partProperty(width,thickness,Dy,Dz,cos) {
    // cos는 수직부재 1, 수평부재 0
    const sin = Math.sqrt(1-cos**2)
    let area = width * thickness
    let Ioyy = width * thickness / 12 * ((width * cos) ** 2  + (thickness*sin) ** 2 ) 
    let Iozz = width * thickness / 12 * ((width * sin) ** 2  + (thickness*cos) ** 2 )
    return {area,Ioyy,Iozz,Dy,Dz}
}

const SectionAnalysisInput = {
    Double_composite : true,
    Closed_top : true,
    B1 : 0 ,  //강거더 하부 내부폭
    B2 : 0 ,  //강거더 상부 내부폭
    B3 : 0 ,  //바닥판 콘크리트 폭
    wlw : 0,   //좌측웹 폭
    wrw : 0,    //우측웹 폭
    wuf : 0,    //상부플랜지 폭
    wlf : 0,    //하부플랜지 폭
    H : 0 ,   //강거더 높이
    tlf : 0 ,  //하부플랜지 두께
    tuf : 0 ,  //상부플랜지두께
    tw : 0 ,  //웹두께
    Tcu : 0 , //바닥판콘크리트 두께
    Th : 0 ,  //헌치두께
    Tcl : 0 , //지점콘크리트 두께
    blf : 0 , //하부플랜지 외부폭
    buf : 0 , //상부플랜지 외부폭
    Urib : {thickness :0 , height : 0, layout:[]}, 
    Lrib : {thickness :0 , height : 0, layout:[]},
    horizontal_bracing : {d0:0, vbArea:0, dbArea:0}, //수직보강재 간격, 수평브레이싱 수직, 사재 단면적
}

const materials = {
    slabConc: { name: "slabConc", elast: 28825.3, shearElast: 12318.5, poissonRatio: 0.17 }, // 강도와 재료 입력으로 자동생성
    bottomConc: { name: "lowerConc", elast: 31209.5, shearElast: 13337.4, poissonRatio: 0.17 },
    Steel: { name: "steelBox", elast: 210000, shearElast: 81000, poissonRatio: 0.3 },
    rebar: { name: "rebar", elast: 200000, shearElast: 80000, poissonRatio: 0.3 },
}

export function DCBsection(sa, materials) {
    let resultSection = {}
    let n1 = materials.Steel.elast / materials.slabConc.elast;  //상부바닥판 탄성계수비
    let n2 = materials.Steel.elast / materials.BottomConc.elast;  //하부콘크리트 탄성계수비
    let lcos = sa.H/sa.wlw
    let rcos = sa.H/sa.wrw
    let sb = [];
    
    if(sa.Closed_top){
        sb.push(partProperty(sa.wuf,sa.tuf,sa.H/2 + sa.tuf/2, sa.B2/2, 0))
        sb.push(partProperty(sa.wuf,sa.tuf,sa.H/2 + sa.tuf/2, -sa.B2/2, 0))
    }else{
        sb.push(partProperty(sa.wuf,sa.tuf,sa.H/2 + sa.tuf/2, 0, 0))
    }
    sb.push(partProperty(sa.wlf,sa.tlf,-sa.H/2 - sa.tlf/2, 0, 0))
    sb.push(partProperty(sa.ww,sa.tw,0, -(sa.B2 + sa.B1)/4, lcos))
    sb.push(partProperty(sa.ww,sa.tw,0, (sa.B2 + sa.B1)/4, rcos))
    sa.Urib.layout.forEach(function(elem){
        sb.push(partProperty(sa.Urib.height, sa.Urib.thickness, sa.H/2 - sa.Urib.height/2, elem, 1))
    })
    sa.Lrib.layout.forEach(function(elem){
        sb.push(partProperty(sa.Lrib.height, sa.Lrib.thickness, -sa.H/2 + sa.Lrib.height/2, elem, 1))
    })
    let stage1 = {}
    let stage2 = {}
    let stage3 = {}

    //비틀림 강성 계산을 위한 수평브레이싱 등가 두께 계산
    
    if (input.Closed_top === false) {
        let hb = sa.horizontal_bracingbracing
        let bracing_length = Math.Sqrt(hb.d0 ** 2 + sa.B2 ** 2)
        //tr = material.Steel.elast / material.Steel.shear_elast * .lamda * .B2 / (bracing_length ^ 3 / .horizontal_bracing.Area + 2 / 3 * .B2 / (.b_2 * .t2))
        let tr = materials.Steel.elast / materials.Steel.shear_elast * hb.d0 * sa.B2 / (bracing_length ** 3 / hb.dbArea + 2 / 3 * sa.B2 / (sa.wuf * sa.tuf)) //<--- 임시로 작성
        stage1.Ixx = 4 * ((sa.B2 + sa.B1) * sa.H / 2) ** 2 / (sa.B2 / tr + sa.wlw / sa.tw  + sa.wrw / sa.tw + sa.B1 / sa.tlf)
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
        stage1.A += sb[i].ara
        ADy += sb[i].area * sb[i].Dy
        ADz += sb[i].area * sb[i].Dz
    }
    stage1.Cy = ADy / stage1.A
    stage1.Cz = ADz / stage1.A
    stage1.Iyy = 0;
    stage1.Izz = 0;
    for (let i of sb) {
        stage1.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage1.Cy) ** 2
        stage1.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage1.Cz) ** 2
    }

    //단일합성후 합성단면의 단면계수 계산
    let botConc = partProperty(sa.B1 / n2,sa.Tcl,-sa.H/2 + sa.Tcl/2, 0, 0)
    sb.push(botConc)
    if (input.Double_composite === false) {
        stage2 = stage1
    } else {
        ADy += botConc.area * botConc.Dy
        ADz += botConc.area * botConc.Dz
        stage2.A = stage1.A + botConc.area;
        stage2.Cy = ADy  / stage2.A
        stage2.Cz = ADz  / stage2.A
        stage2.Iyy = 0;
        stage2.Izz = 0;
        for (let i of sb) {
            stage2.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - stage2.Cy) ** 2
            stage2.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - stage2.Cz) ** 2
        }
    }
    //이중합성후 합성단면의 단면계수 계산
    let deckConc = partProperty(sa.B3 / n1, sa.Tcu, sa.H/2 + sa.Tcu/2 + sa.Th, 0, 0)
    sb.push(deckConc)
    ADy += botConc.area * botConc.Dy
    ADz += botConc.area * botConc.Dz
    stage3.A = resultSection.A + deckConc.area;
    stage3.Cy = ADy / stage3.A
    stage3.Cz = ADz / stage3.A
    stage3.Iyy = 0;
    stage3.Izz = 0;
    for (let i of sb) {
        stage3.Iyy += sb[i].Ioyy + sb[i].area * (sb[i].Dy - resultSection.Cy2) ** 2
        stage3.Izz += sb[i].Iozz + sb[i].area * (sb[i].Dz - resultSection.Cz2) ** 2
    }
    return [stage1,stage2,stage3]
}
