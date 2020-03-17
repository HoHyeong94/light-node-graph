// import { sceneAdder } from "global";
import { SteelBoxDict2 } from "./module";

export function SteelBox(){
  this.addInput("girderStation","girderStation");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addOutput("steelBoxDict","steelBoxDict");
}

SteelBox.prototype.onExecute = function() {
  const girderStation = this.getInputData(0);
  const sectionPointDict = this.getInputData(1);
  const result = SteelBoxDict2(girderStation, sectionPointDict)
  this.setOutputData(0, result)
}