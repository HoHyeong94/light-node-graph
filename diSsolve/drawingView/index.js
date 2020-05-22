import { sceneAdder, THREE } from "global";
import { sectionView, topDraw, sideDraw, LineDrawView, LineSideView, GirderLayoutView, GirderGeneralDraw1, GirderGeneralDraw2 } from "./module"
// import { LineToThree } from "../line/module";

export function SectionViewer(){
  this.addInput("sectionName","arr");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("diaDict","diaDict");
}

SectionViewer.prototype.onExecute = function() {
}

SectionViewer.prototype.on3DExecute = function() {
  let gridlist = this.getInputData(0); //["G1D1", "G1D2", "G1D10"];
  let sectionPointDict = this.getInputData(1);
  let diaDict = this.getInputData(2);
//   let svgAll = { models: {} };
  let i = 0;
  let offset = 5000;
  for (let value of gridlist) {
    let sectionPoint = sectionPointDict[value].forward;
    let diaPoint = diaDict[value];
    let group = sectionView(value, sectionPoint, diaPoint);
    // for (let j in group){
    //     
    //     sceneAdder({layer:1, mesh:group[j]},"section" + value + j);
    // }
    group.position.set(i*offset,0,0)
    sceneAdder({layer:1, mesh:group},"section" + value);
    // // svgAll.models[value].origin = [i * offset, 0];
    i += 1;
  }
};



export function TopViewer(){
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("hBracingDict","hBracingDict");
  this.addInput("diaDict","diaDict");
  this.addInput("vstiffDict","diaDict");
  this.addInput("gridPoint","gridPoint");
  this.addInput("initPoint","point");
  this.addInput("girderStation","girderStation");
}

TopViewer.prototype.onExecute = function() {
}

TopViewer.prototype.on3DExecute = function() {
  let offset = 5000;
  let group = topDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5),this.getInputData(6))
  // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
  group.position.set(0,-offset,0)
  sceneAdder({layer:1, mesh:group},"topView");
};

export function GirderGeneralView1(){
  this.addInput("girderStation","girderStation");
  this.addInput("layerNumber","number");
}

GirderGeneralView1.prototype.onExecute = function() {
}

GirderGeneralView1.prototype.on3DExecute = function() {
  let group = GirderGeneralDraw1(this.getInputData(0),this.getInputData(1))
  sceneAdder({layer:this.getInputData(1), mesh:group},"GirderGeneralView1");
};

export function GirderGeneralView2(){
  this.addInput("girderStation","girderStation");
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("layerNumber","number");
}

GirderGeneralView2.prototype.onExecute = function() {
}

GirderGeneralView2.prototype.on3DExecute = function() {
  let group = GirderGeneralDraw2(this.getInputData(0),this.getInputData(1),this.getInputData(2))
  sceneAdder({layer:this.getInputData(2), mesh:group},"GirderGeneralView2");
};


export function SideViewer(){
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("hBracingDict","hBracingDict");
  this.addInput("diaDict","diaDict");
  this.addInput("vstiffDict","diaDict");
  this.addInput("gridPoint","gridPoint");
  this.addInput("initPoint","point");
}

SideViewer.prototype.onExecute = function() {
}

SideViewer.prototype.on3DExecute = function() {
  let offset = 15000;
  let group = sideDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5))
  // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
  group.position.set(0,-offset,0)
  sceneAdder({layer:1, mesh:group},"SideView");
};

export function LineDraw(){
  this.addInput("masterLine","line");
  this.addInput("slaveLine","line");
}

LineDraw.prototype.onExecute = function() {
}

LineDraw.prototype.on3DExecute = function() {
  let group = LineDrawView(this.getInputData(0),this.getInputData(1))
  sceneAdder({layer:3, mesh:group},"LineView")
}

export function LineSideDraw(){
  this.addInput("masterLine","line");
}

LineSideDraw.prototype.onExecute = function() {
}

LineSideDraw.prototype.on3DExecute = function() {
  let group = LineSideView(this.getInputData(0))
  sceneAdder({layer:4, mesh:group},"LineSideView")
}

export function GirderLayoutDraw(){
  this.addInput("girderLayout","girderLayout");
}

GirderLayoutDraw.prototype.onExecute = function() {
}

GirderLayoutDraw.prototype.on3DExecute = function() {
  let group = GirderLayoutView(this.getInputData(0))
  sceneAdder({layer:3, mesh:group.plan},"GirderLayout")
  sceneAdder({layer:4, mesh:group.side},"GirderLayoutSide")
}


