export function SectionDB() {
    this.addOutput("sectionDB", "sectionDB");
}

SectionDB.prototype.onExecute = function () {
    //T형강일 경우, 역T를 기준으로 하단좌측이 원점, y축 수평, z축 수직
    //L형강일 경우, ㄴ자를 기준으로 하단좌측이 원점, y축 수평, z축 수직
    const result = {
        "T150x150x6.5x9": { type: "T", shape: [150, 150, 6.5, 9], A: 2266.5, Ixx: 122669.3, Iyy: 4598193, Izz: 2534477, Cy: 75, Cz: 34.8276 },
        "L100x100x10": { type: "L", shape: [100, 100, 10, 10], A: 1900, Ixx: 63300, Iyy: 1750000, Izz: 1750000, Cy: 28.2, Cz: 28.2 },
        "L150x150x12": { type: "L", shape: [150, 150, 12, 12], A: 3477, Ixx: 166000, Iyy: 7400000, Izz: 7400000, Cy: 41.4, Cz: 41.4 }
    }
    this.setOutputData(0, result)
}


