import { partQntt } from "./module"

export function MaterialQntt() {
    this.addInput("diaDict", "diaDict");
    this.addOutput("data", "arr")
}

MaterialQntt.prototype.onExecute = function () {
    const result = partQntt(this.getInputData(0))
    this.setOutputData(0, result)
}