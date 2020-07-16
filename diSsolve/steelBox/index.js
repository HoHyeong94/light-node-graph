// import { sceneAdder } from "global";
import { SteelBoxDict2 } from "./module";

export function SteelBox(){
  this.addInput("girderStation","girderStation");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("entrance","entrance");
  this.addOutput("steelBoxDict","steelBoxDict");
}

SteelBox.prototype.onExecute = function() {
  this.setOutputData(0, SteelBoxDict2(this.getInputData(0), this.getInputData(1), this.getInputData(2)))
}