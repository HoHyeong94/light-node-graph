// import { LiteGraph, meshArr } from "global";
import {DiaShapeDict, VstiffShapeDict, HBracingDict} from "./module"


export function DiaDict(){
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("diaphragmLayout","arr");
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
  this.addInput("vStiffLayout","arr");
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

export function HBracing(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("hBracingLayout","arr");
    this.addInput("hBracingSectionList","hBracingSectionList");
    this.addOutput("hBracingDict","hBracingDict");
  }
  
  HBracing.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const sectionPointDict = this.getInputData(1);
    const hBracingLayout = this.getInputData(2);
    const hBracingSectionList = this.getInputData(3);
    const result = HBracingDict(gridPoint, sectionPointDict,hBracingLayout,hBracingSectionList)
    this.setOutputData(0, result)
  }