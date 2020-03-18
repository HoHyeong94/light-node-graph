import { XbeamDict } from "./module"

export function Xbeam(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("xbeamLayout","arr");
    this.addInput("xbeamSectionList","xbeamSectionList");
    this.addOutput("xbeamDict","xbeamDict");
  }
  
  Xbeam.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const sectionPointDict = this.getInputData(1);
    const xbeamLayout = this.getInputData(2);
    const xbeamSectionList = this.getInputData(3);
    const result = XbeamDict(gridPoint, sectionPointDict, xbeamLayout, xbeamSectionList)
    this.setOutputData(0, result)
  }