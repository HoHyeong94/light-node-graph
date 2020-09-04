import { IGirderSection } from "./module"

const girderPoint = {
    "G1P0": { x: 0, y: 0, z: 2000, normalCos: 1, normalSin: 0 }, // masterStationNumber, girderStation이 없어서 toglobalPoint 함수에서 에러 발생여부 파악 그리고 예외처리
    "G1P1": { x: 0, y: 40000, z: 2000, normalCos: 1, normalSin: 0 },
}

const shapeData = [
    // [pointName, h1, h2, h3, h4, h5, l1, l2, l3] 순서주의
    ["G1P0", 160, 100, 920, 120, 200, 240, 230, 330],
    ["G1P1", 160, 100, 920, 120, 200, 240, 230, 330],
]

export function IGirder(){
    this.addInput("girderPoint","arr");
    this.addInput("shapeData","arr");
    this.addOutput("model","model");
  }
  
  IGirder.prototype.onExecute = function() {
    const result = IGirderSection(girderPoint, shapeData)
    this.setOutputData(0, result)
  }