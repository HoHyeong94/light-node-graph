// import { LiteGraph, THREE, sceneAdder } from "global";
import { MasterLineData, } from "./module"

export function MasterLine(){
  this.addInput("horizon","arr");
  this.addInput("vertical","arr");
  this.addInput("superElevation","arr");
  this.addInput("beginStation","number");
  // this.addInput("slaveOrMaster","boolean");
  this.addOutput("points","points");
  this.addOutput("line","line");
}
MasterLine.prototype.onExecute = function() {

  const horizonDataList = this.getInputData(0);
  const verticalDataList = this.getInputData(1);
  const superElevation = this.getInputData(2);
  const beginStation = this.getInputData(3); //769452.42;
  let line = MasterLineData(horizonDataList,verticalDataList,superElevation,beginStation);
  this.points= line.points;
  this.setOutputData(0,line.points);
  this.setOutputData(1,line);
}

// MasterLine.prototype.on3DExecute = function() {
//   let initPoint = { x: 178341809.1588868,
//                     y: 552237726.8852764,
//                     z: 26934.34284538262}
//   let mesh = LineToThree(this.points,initPoint)
//   sceneAdder({id:0,mesh:mesh});
// };
