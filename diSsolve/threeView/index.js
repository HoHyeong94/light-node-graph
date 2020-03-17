import { sceneAdder } from "global";
import {LineView, SteelBoxView, DiaView, HBracingView, HBracingPlateView} from "./module"

export function LineViewer(){
  this.addInput("points","points");
  this.addInput("initPoint","point");
  this.addInput("color","number");
}
LineViewer.prototype.onExecute = function() {
}

LineViewer.prototype.on3DExecute = function() {
  const points = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const color = this.getInputData(2);
  let mesh = LineView(points,initPoint,color)
  sceneAdder({id:0,mesh:mesh});
};

export function SteelPlateView(){
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("Point","Point");
}

SteelPlateView.prototype.onExecute = function() {
  const steeBoxDict = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const group = SteelBoxView(steeBoxDict,initPoint);
  sceneAdder({ id: 0, mesh: group}); 
}

export function DiaPhragmView(){
  this.addInput("gridPoint","gridPoint");
  this.addInput("diaDict","diaDict");
  this.addInput("Point","Point");
}

DiaPhragmView.prototype.onExecute = function() {
  const pointDict = this.getInputData(0);
  const diaDict = this.getInputData(1);
  const initPoint = this.getInputData(2);
  const group = DiaView(pointDict, diaDict,initPoint);
  sceneAdder({ id: 0, mesh: group}); 
}

export function HorBracingView(){
    this.addInput("gridPoint","gridPoint");
    this.addInput("hBracingDict","hBracingDict");
    this.addInput("Point","Point");
  }
  
  HorBracingView.prototype.onExecute = function() {
    const pointDict = this.getInputData(0);
    const hb = this.getInputData(1);
    const initPoint = this.getInputData(2);
    const group = HBracingView(hb.hBracingDict,initPoint);
    const group2 = HBracingPlateView(pointDict, hb.hBracingPlateDict,initPoint);
    sceneAdder({ id: 0, mesh: group}); 
    sceneAdder({ id: 0, mesh: group2}); 
  }
  

export function InitPoint(){
  this.addInput("gridPoint","gridPoint");
  this.addOutput("Point","Point");
}

InitPoint.prototype.onExecute = function() {
  this.getInputData(0);
  this.setOutputData(0, this.getInputData(0)["G1S1"])
}


