import { LiteGraph, meshArr } from "global";
import { SteelBoxDict, SteelBoxView } from "./module";

export function SteelBox() {
  this.addInput("gridPoint", "arr");
  this.addInput("sectionPointDict", "arr");
  this.addOutput("steelBoxDict", "arr");
}

SteelBox.prototype.onExecute = function() {
  const { gridPointList, stationDictList, nameToPointDict } = this.getInputData(
    0
  );
  const sectionPointDict = this.getInputData(1);
  const result = SteelBoxDict(
    gridPointList,
    stationDictList,
    nameToPointDict,
    sectionPointDict
  );

  this.setOutputData(0, result);
};



// function SteelPlateView() {
//   this.addInput("steelBoxDict", "steelBoxDict");
//   this.addInput("Point", "Point");
// }

// SteelPlateView.prototype.onExecute = function() {
//   const steeBoxDict = this.getInputData(0);
//   const initPoint = this.getInputData(1);
//   const group = SteelBoxView(steeBoxDict, initPoint);
//   meshArr.current.push({ id: 0, mesh: group });
// };

// LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);

// function InitPoint() {
//   this.addInput("gridPoint", "gridPoint");
//   this.addOutput("Point", "Point");
// }

// InitPoint.prototype.onExecute = function() {
//   this.getInputData(0);
//   this.setOutputData(0, this.getInputData(0).nameToPointDict["G1S1"]);
// };

// LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);
