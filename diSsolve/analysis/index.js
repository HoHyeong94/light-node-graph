import { SupportGenerator, SapJointGenerator } from "./module"

export function Support() {
    this.addInput("supportFixed", "boolean");
    this.addInput("supportLayout", "arr");
    this.addInput("gridPoint", "gridPoint");
    this.addOutput("supportdata", "supportdata");
}

Support.prototype.onExecute = function () {
    const result = SupportGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    this.setOutputData(0, result)
}

export function SapJoint() {
    this.addInput("girderStation", "girderStation");
    this.addInput("supportData", "supportData");
    this.addInput("xbeamData", "xbeamData");
    this.addOutput("nodeInput", "nodeInput");
}

SapJoint.prototype.onExecute = function () {
    const result = SapJointGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    this.setOutputData(0, result)
}