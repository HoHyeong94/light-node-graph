import { defaultValues, addedValues } from "./defaultValues";
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

const {
  SlabInfo,
  supportFixed,
  supportData,
  diaPhragmLocate,
  vStiffLocate,
  splice,
  joint,
  height,
  taperedPoint,  
} = addedValues

function HorizonInput(){
  this.addOutput("horizon","horizon")
}
HorizonInput.prototype.onExecute = function() {
  this.setOutputData(0,horizon)
}
LiteGraph.registerNodeType("HMInput/Horizon", HorizonInput);

function VerticalInput(){
  this.addOutput("vertical","vertical")
}
VerticalInput.prototype.onExecute = function() {
  this.setOutputData(0,vertical)
}
LiteGraph.registerNodeType("HMInput/vertical", VerticalInput);

function SuperElevationInput(){
  this.addOutput("superElevation","superElevation")
}
SuperElevationInput.prototype.onExecute = function() {
  this.setOutputData(0,superElevation)
}
LiteGraph.registerNodeType("HMInput/superElevation", SuperElevationInput);


function GirderLayoutInput(){
  this.addOutput("girderLayoutInput","girderLayoutInput")
}
GirderLayoutInput.prototype.onExecute = function() {
  this.setOutputData(0,girderLayoutInput)
}
LiteGraph.registerNodeType("HMInput/girderLayoutInput", GirderLayoutInput);

function SEShapeInput(){
  this.addOutput("SEShape","SEShape")
}
SEShapeInput.prototype.onExecute = function() {
  this.setOutputData(0,SEShape)
}
LiteGraph.registerNodeType("HMInput/SEShape", SEShapeInput);

function GirderBaseInfo(){
  this.addOutput("girderBaseInfo","girderBaseInfo")
}
GirderBaseInfo.prototype.onExecute = function() {
  this.setOutputData(0,girderBaseInfo)
}
LiteGraph.registerNodeType("HMInput/girderBaseInfo", GirderBaseInfo);


function DiaphragmInput(){
  this.addOutput("diaphragmLayout","diaphragmLayout")
  this.addOutput("diaphragmSectionList","diaphragmSectionList")
}
DiaphragmInput.prototype.onExecute = function() {
  this.setOutputData(0,diaphragmLayout)
  this.setOutputData(1,diaphragmSectionList)
}
LiteGraph.registerNodeType("HMInput/diaphragmInput", DiaphragmInput);

function VStiffInput(){
  this.addOutput("vStiffLayout","vStiffLayout")
  this.addOutput("vStiffSectionList","vStiffSectionList")
}
VStiffInput.prototype.onExecute = function() {
  this.setOutputData(0,vStiffLayout)
  this.setOutputData(1,vStiffSectionList)
}
LiteGraph.registerNodeType("HMInput/vStiffInput", VStiffInput);



function GridPointInput(){
  this.addOutput("diaPhragmLocate","diaPhragmLocate")
  this.addOutput("vStiffLocate","vStiffLocate")
  this.addOutput("splice","splice")
  this.addOutput("joint","joint")
  this.addOutput("height","height")
  this.addOutput("taperedPoint","taperedPoint")
}
GridPointInput.prototype.onExecute = function() {
  this.setOutputData(0,diaPhragmLocate)
  this.setOutputData(1,vStiffLocate)
  this.setOutputData(2,splice)
  this.setOutputData(3,joint)
  this.setOutputData(4,height)
  this.setOutputData(5,taperedPoint)
}
LiteGraph.registerNodeType("HMInput/gridPointInput", GridPointInput);
//git