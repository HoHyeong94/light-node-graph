import { LiteGraph, meshArr } from "global";
import {DiaShapeDict, DiaView, VstiffShapeDict} from "./stiffnerModule"


function DiaDict(){
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("diaphragmLayout","diaphragmLayout");
  this.addInput("diaphragmSectionList","diaphragmSectionList");
  this.addOutput("diaDict","diaDict");
}

DiaDict.prototype.onExecute = function() {
  const sectionPointDict = this.getInputData(0);
  const diaphragmLayout = this.getInputData(1);
  const diaphragmSectionList = this.getInputData(2);
  const result = DiaShapeDict(sectionPointDict,diaphragmLayout,diaphragmSectionList)
  this.setOutputData(0, result)
}
LiteGraph.registerNodeType("HMECS/diaDict", DiaDict);

function DiaPhragmView(){
  this.addInput("gridPoint","gridPoint");
  this.addInput("diaDict","diaDict");
  this.addInput("Point","Point");
}

DiaPhragmView.prototype.onExecute = function() {
  const nameToPointDict = this.getInputData(0).nameToPointDict
  const diaDict = this.getInputData(1);
  const initPoint = this.getInputData(2);
  const group = DiaView(nameToPointDict, diaDict,initPoint);
  meshArr.current.push({ id: 0, mesh: group}); 
}

LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);

function VstiffDict(){
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("vStiffLayout","vStiffLayout");
  this.addInput("vStiffSectionList","vStiffSectionList");
  this.addOutput("diaDict","diaDict");
}

VstiffDict.prototype.onExecute = function() {
  const sectionPointDict = this.getInputData(0);
  const vStiffLayout = this.getInputData(1);
  const vStiffSectionList = this.getInputData(2);
  const result = VstiffShapeDict(sectionPointDict,vStiffLayout,vStiffSectionList)
  this.setOutputData(0, result)
}
LiteGraph.registerNodeType("HMECS/vStiffDict", VstiffDict);

