import { SplicePlate } from "./module"

export function SplicePart() {
    this.addInput("spliceLayout","spliceLayout")
    this.addInput("spliceSectionList","spliceSectionList")
    this.addInput("gridPoint","gridPoint")
    this.addInput("sectionPointDict","sectionPointDict")
    this.addOutput("diaDict", "diaDict");
}

SplicePart.prototype.onExecute = function () {
    //T형강일 경우, 역T를 기준으로 하단좌측이 원점, y축 수평, z축 수직
    //L형강일 경우, ㄴ자를 기준으로 하단좌측이 원점, y축 수평, z축 수직
    let gridPoint = this.getInputData(2);;
    let sectionPointDict = this.getInputData(3);
    let spliceDict = {};
    for (let key in gridPoint) {
        if (key.includes("SP")) {
          spliceDict[key] = SplicePlate(gridPoint[key], sectionPointDict[key].forward)
        }
      }
    
    this.setOutputData(0, spliceDict)
}
