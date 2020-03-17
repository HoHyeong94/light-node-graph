import { LiteGraph } from "global";
import { SectionPointDict } from "./module"

export function SectionPoint(){
  this.addInput("gridPoint","gridPoint");
  this.addInput("girderBaseInfo","girderBaseInfo");
  this.addInput("slabInfo","slabInfo");
  this.addInput("slabLayout","arr");
  this.addOutput("sectionPointDict","sectionPointDict");
}

SectionPoint.prototype.onExecute = function() {
  const gridPoint = this.getInputData(0);
  const girderBaseInfo = this.getInputData(1);
  const slabInfo = this.getInputData(2);
  const slabLayout = this.getInputData(3);
  let sectionPointDict = SectionPointDict(gridPoint,girderBaseInfo,slabInfo,slabLayout)
  this.setOutputData(0, sectionPointDict)
}

