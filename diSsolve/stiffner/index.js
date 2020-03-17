// import { LiteGraph, meshArr } from "global";
import {DiaShapeDict, VstiffShapeDict} from "./module"


export function DiaDict(){
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

export function VstiffDict(){
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
