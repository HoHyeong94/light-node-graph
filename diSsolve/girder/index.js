// import { LiteGraph, meshArr, THREE } from "global";
import {GirderLayoutGenerator2, GridPointGenerator3,GridStationList} from "./module"
// import {_} from "global";

export function GirderLayout(){
  this.addInput("MasterLine","line");
  this.addInput("SlaveLine","line");
  this.addInput("girderlayoutInput","girderlayoutInput");
  
  this.addOutput("girderLayout","girderLayout");
  this.addOutput("supportCount","number");
  this.addOutput("girderCount","number");
}

GirderLayout.prototype.onExecute = function() {
  const masterLine = this.getInputData(0);
  const slaveLine = [this.getInputData(1)];
  const girderLayoutInput = this.getInputData(2);
  const result = GirderLayoutGenerator2(masterLine, slaveLine, girderLayoutInput);
  let supportNum = girderLayoutInput.supportData.length -2;
  let girderNum = girderLayoutInput.getGirderList.length;
  this.setOutputData(0, result);
  this.setOutputData(1, supportNum);
  this.setOutputData(2, girderNum);
}

// LiteGraph.registerNodeType("nexivil/Girder", Girder);


export function GridPoint(){
  this.addInput("girderLayout","girderLayout");
  this.addInput("SEShape","SEShape");
  this.addInput("GridInput","GridInput");
  this.addOutput("gridPoint","gridPoint");
}

GridPoint.prototype.onExecute = function() {
  const girderLayout = this.getInputData(0);
  const SEShape = this.getInputData(1);
  const gridInput = this.getInputData(2);
    
  const result = GridPointGenerator3(girderLayout, SEShape, gridInput)
  this.setOutputData(0, result)
}

// LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);

export function StationList(){
  this.addInput("gridPoint","gridPoint");
  this.addOutput("centerLineStation","centerLineStation");
  this.addOutput("girderStation","girderStation");
}

StationList.prototype.onExecute = function() {
  const gridPoint = this.getInputData(0);
    
  const result = GridStationList(gridPoint)
  this.setOutputData(0, result.centerLine)
  this.setOutputData(1, result.girder)
}