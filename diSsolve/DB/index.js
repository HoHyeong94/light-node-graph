export function SectionDB() {
    this.addOutput("sectionDB", "sectionDB");
}

SectionDB.prototype.onExecute = function () {
    //T형강일 경우, 역T를 기준으로 하단좌측이 원점, y축 수평, z축 수직
    //L형강일 경우, ㄴ자를 기준으로 하단좌측이 원점, y축 수평, z축 수직
    const result = {
        "T150x150x6.5x9": { type: "T", shape: [150, 150, 6.5, 9], A: 2266.5, Ix: 122669.3, Iy: 4598193, Iz: 2534477, Cy: 75, Cz: 34.8276 },
        "L100x100x10": { type: "L", shape: [100, 100, 10, 10], A: 1900, Ix: 63300, Iy: 1750000, Iz: 1750000, Cy: 28.2, Cz: 28.2 },
        "L150x150x12": { type: "L", shape: [150, 150, 12, 12], A: 3477, Ix: 166000, Iy: 7400000, Iz: 7400000, Cy: 41.4, Cz: 41.4 }
    }
    this.setOutputData(0, result)
}


