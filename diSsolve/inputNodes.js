import { defaultValues } from "./defaultValues";
import { LiteGraph, meshArr, THREE } from "global";

const {
  horizon,
  vertical,
  superElevation,
  girderLayoutInput,
  SEShape,
  girderBaseInfo,
  xbeamLayout,
  xbeamSectionList,
  diaphragmLayout,
  diaphragmSectionList,
  vStiffLayout,
  vStiffSectionList,
  hBracingLayout,
  hBracingSectionList
} = defaultValues;

function HorizonInput(){
  this.addOutput("horizon","horizon")
}
HorizonInput.prototype.onExecute = function() {
  this.setOutputData(0,horizon)
}
LiteGraph.registerNodeType("nexivil/Horizon", HorizonInput);

function VerticalInput(){
  this.addOutput("vertical","vertical")
}
VerticalInput.prototype.onExecute = function() {
  this.setOutputData(0,vertical)
}
LiteGraph.registerNodeType("nexivil/vertical", VerticalInput);

function SuperElevationInput(){
  this.addOutput("superElevation","superElevation")
}
SuperElevationInput.prototype.onExecute = function() {
  this.setOutputData(0,superElevation)
}
LiteGraph.registerNodeType("nexivil/superElevation", SuperElevationInput);