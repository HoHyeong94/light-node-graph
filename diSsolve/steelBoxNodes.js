import { LiteGraph, meshArr } from "global";
import { SteelBoxDict, SteelBoxView } from "./steelBoxModule";

function SteelBox(){
  this.addInput("gridPoint","gridPoint");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addOutput("steelBoxDict","steelBoxDict");
}

SteelBox.prototype.onExecute = function() {
  const gridPointList = this.getInputData(0).gridPointStation;
  const stationDictList = this.getInputData(0).stationDictList;
  const nameToPointDict = this.getInputData(0).nameToPointDict;
  const sectionPointDict = this.getInputData(1);
  const result = SteelBoxDict(gridPointList,stationDictList,nameToPointDict, sectionPointDict)
  
  this.setOutputData(0, result)
}

LiteGraph.registerNodeType("HMECS/steelBox", SteelBox);

function SteelPlateView(){
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("Point","Point");
}

SteelPlateView.prototype.onExecute = function() {
  const steeBoxDict = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const group = SteelBoxView(steeBoxDict,initPoint);
  meshArr.current.push({ id: 0, mesh: group}); 
}

LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);


function InitPoint(){
  this.addInput("gridPoint","gridPoint");
  this.addOutput("Point","Point");
}

InitPoint.prototype.onExecute = function() {
  this.getInputData(0);
  this.setOutputData(0, this.getInputData(0).nameToPointDict["G1S1"])
}

LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);