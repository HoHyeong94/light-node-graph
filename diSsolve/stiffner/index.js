// import { LiteGraph, meshArr } from "global";
import {DiaShapeDict, VstiffShapeDict, HBracingDict, JackupStiffDict, HorStiffDict } from "./module"


export function DiaDict(){
    this.addInput("gridPoint","gridPoint");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("diaphragmLayout","arr");
  this.addInput("diaphragmSectionList","diaphragmSectionList");
  this.addInput("sectionDB","sectionDB");
  this.addOutput("diaDict","diaDict");
}

DiaDict.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const sectionPointDict = this.getInputData(1);
  const diaphragmLayout = this.getInputData(2);
  const diaphragmSectionList = this.getInputData(3);

  const result = DiaShapeDict(gridPoint, sectionPointDict,diaphragmLayout,diaphragmSectionList, this.getInputData(4))
  this.setOutputData(0, result)
}

export function VstiffDict(){
    this.addInput("gridPoint","gridPoint");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("vStiffLayout","arr");
  this.addInput("vStiffSectionList","vStiffSectionList");
  this.addInput("sectionDB","sectionDB");
  this.addOutput("diaDict","diaDict");
}

VstiffDict.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const sectionPointDict = this.getInputData(1);
  const vStiffLayout = this.getInputData(2);
  const vStiffSectionList = this.getInputData(3);
  const result = VstiffShapeDict(gridPoint, sectionPointDict,vStiffLayout,vStiffSectionList, this.getInputData(4))
  this.setOutputData(0, result)
}


export function HBracing(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("hBracingLayout","arr");
    this.addInput("hBracingSectionList","hBracingSectionList");
    this.addInput("sectionDB","sectionDB");
    this.addOutput("diaDict","diaDict");
  }
  
  HBracing.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const sectionPointDict = this.getInputData(1);
    const hBracingLayout = this.getInputData(2);
    const hBracingSectionList = this.getInputData(3);
    const result = HBracingDict(gridPoint, sectionPointDict,hBracingLayout,hBracingSectionList,this.getInputData(4))
    this.setOutputData(0, result)
  }

  export function JackupDict(){
    this.addInput("gridPoint","gridPoint");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("jackupData","arr");
  this.addOutput("diaDict","diaDict");
}

JackupDict.prototype.onExecute = function() {
    const gridPoint = this.getInputData(0);
    const sectionPointDict = this.getInputData(1);
  const jackupData = this.getInputData(2);
  const result = JackupStiffDict(gridPoint, sectionPointDict, jackupData)
  this.setOutputData(0, result)
}

export function HstiffDict(){
  this.addInput("gridPoint","gridPoint");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("hstiffLayout","arr");
  this.addOutput("diaDict","diaDict");
}

HstiffDict.prototype.onExecute = function(){
  const result = HorStiffDict(this.getInputData(0), this.getInputData(0), this.getInputData(0))
  this.setOutputData(0, result)
}

