// Cy, Cz 0: left, bottom 1: center, 2: right, top
export function PTS(name, Yinverse, Cy, sectionDB) {
    let pts = [0, 0, 0, 0, 0, 0];
    let base = 0;
    switch (Cy) {
        case 0:
            base = Yinverse ? sectionDB[name].shape[1] : 0;
            break;
        case 1:
            base = Yinverse ? sectionDB[name].Cy : -sectionDB[name].Cy
            break;
        case 2:
            base = Yinverse ? 0 : - sectionDB[name].shape[1];
            break;
        default:
            base = 0;
    }
    let sign = Yinverse ? 1 : -1;
    if (sectionDB[name].type === "L") {
        pts[0] = base
        pts[1] = base - sign * sectionDB[name].shape[2]
        pts[2] = pts[1]
        pts[3] = base - sign * sectionDB[name].shape[1]
        pts[4] = sectionDB[name].shape[0]
        pts[5] = sectionDB[name].shape[3]
    } else if (sectionDB[name].type === "T") {
        pts[0] = base - sign * sectionDB[name].shape[1]
        pts[1] = base
        pts[2] = base - sign * sectionDB[name].Cy - sectionDB[name].shape[2]/2
        pts[3] = base - sign * sectionDB[name].Cy + sectionDB[name].shape[2]/2
        pts[4] = -sectionDB[name].shape[3]
        pts[5] = -sectionDB[name].shape[0]
    }
    // 각 형강에 대한 결과 순서가 통일성이 없음 추후 수정 바람 20.03.25 by drlim
    return pts
}