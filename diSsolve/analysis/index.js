import { SupportGenerator, SapJointGenerator, SapFrameGenerator, CompositeJointGen, CompositeFrameGen } from "./module"

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
    this.addOutput("nodeNumDict", "nodeNumDict");
    this.addOutput("nodeInput", "nodeInput");
}

SapJoint.prototype.onExecute = function () {
    const result = SapJointGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    this.setOutputData(0, result.nodeNumDict)
    this.setOutputData(1, result.input)
}

export function SapFrame() {
    this.addInput("girderStation", "girderStation");
    this.addInput("sectionPointDict", "sectionPointDict");
    this.addInput("xbeamData", "xbeamData");
    this.addInput("supportData", "supportData");
    this.addInput("nodeNumDict", "nodeNumDict");
    this.addInput("materials", "arr");
    this.addInput("sectionDB", "sectionDB");
    this.addOutput("sectionPropDict", "sectionPropDict");
    this.addOutput("frameInput", "frameInput");
}

SapFrame.prototype.onExecute = function () {
    const result = SapFrameGenerator(this.getInputData(0), this.getInputData(1), this.getInputData(2),this.getInputData(3),this.getInputData(4),this.getInputData(5),this.getInputData(6))
    this.setOutputData(0, result.sectionPropDict)
    this.setOutputData(1, result.input)
}


export function CompositeJoint() {
    this.addInput("nodeInput", "nodeInput");
    this.addInput("nodeNumDict", "nodeNumDict");
    this.addInput("deckLineDict", "deckLineDict");
    this.addOutput("nodeNumDict", "nodeNumDict");
    this.addOutput("nodeInput", "nodeInput");
}

CompositeJoint.prototype.onExecute = function () {
    const result = CompositeJointGen(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    this.setOutputData(0, result.nodeNumDict)
    this.setOutputData(1, result.input)
}

export function CompositeFrame() {
    this.addInput("nodeNumDict", "nodeNumDict");
    this.addInput("frameInput", "frameInput");
    this.addInput("deckLineDict", "deckLineDict");
    this.addOutput("frameInput", "frameInput");
}

CompositeFrame.prototype.onExecute = function () {
    const result = CompositeFrameGen(this.getInputData(0), this.getInputData(1),this.getInputData(2))
    this.setOutputData(0, result)
}
