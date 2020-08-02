import { sceneAdder, THREE } from "global";
import { sectionView, topDraw, sideDraw, LineDrawView, LineSideView, GirderLayoutView, 
  XbeamSection,  GirderGeneralDraw1, GirderGeneralDraw2, PartGeneralDraw } from "./module"
// import { LineToThree } from "../line/module";

export function SectionViewer(){
  this.addInput("sectionName","arr");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("diaDict","diaDict");
  this.addInput("layOut","number")
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
  const metaData={part:"section"}
  for (let value of gridlist) {
    let sectionPoint = sectionPointDict[value].forward;
    let diaPoint = diaDict[value];
    let group = sectionView(value, sectionPoint, diaPoint);
    // for (let j in group){
    //     
    //     sceneAdder({layer:1, mesh:group[j]},"section" + value + j);
    // }
    group.position.set(i*offset, -5000 * this.getInputData(3),0)
    sceneAdder({name:`section${value}`, layer:1, mesh:group, meta:metaData});
    // sceneAdder(group,[1, "section", value]);
    // // svgAll.models[value].origin = [i * offset, 0];
    i += 1;
  }
};



export function TopViewer(){
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("hBracingDict","hBracingDict");
  this.addInput("diaDict","diaDict");
  this.addInput("vstiffDict","diaDict");
  this.addInput("xbeamDict","diaDict");
  this.addInput("gridPoint","gridPoint");
  this.addInput("initPoint","point");
  this.addInput("girderStation","girderStation");
}

TopViewer.prototype.onExecute = function() {
}

TopViewer.prototype.on3DExecute = function() {
  let offset = 5000;
  let group = topDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5),this.getInputData(6), this.getInputData(7))
  // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
  group.position.set(0,-offset,0)
  sceneAdder({name:"topView", layer:6, mesh:group, meta:{part:"topView"}});

  // sceneAdder(group,[6, "topView", "total"]);
};

export function GirderGeneralView1(){
  this.addInput("girderStation","girderStation");
  this.addInput("layout","layout");
}

GirderGeneralView1.prototype.onExecute = function() {
}

GirderGeneralView1.prototype.on3DExecute = function() {
  let group = GirderGeneralDraw1(this.getInputData(0),this.getInputData(1))
  sceneAdder({name:"GirderGeneralView1", layer:this.getInputData(1).layer, mesh:group, meta:{part:"GirderGeneralView"}});
  // sceneAdder({layer:this.getInputData(1).layer, mesh:group},"GirderGeneralView1");
  // sceneAdder(group, [this.getInputData(1), "GirderGeneralView1", "total"] );
};

export function GirderGeneralView2(){
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("girderStation","girderStation");
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("deckPointDict","deckPointDict");
  this.addInput("layout","layout");
}

GirderGeneralView2.prototype.onExecute = function() {
}

GirderGeneralView2.prototype.on3DExecute = function() {
  let group = GirderGeneralDraw2(this.getInputData(0),this.getInputData(1),this.getInputData(2), this.getInputData(3), this.getInputData(4))
  sceneAdder({name:"GirderGeneralView2", layer:this.getInputData(4).layer, mesh:group, meta:{part:"GirderGeneralView"}});

  // sceneAdder({layer:this.getInputData(4).layer, mesh:group},"GirderGeneralView2");
  // sceneAdder(group, [this.getInputData(4), "GirderGeneralView2", "total"]);
};


export function PartGeneralView(){
  this.addInput("diaDict","diaDict");
  this.addInput("girderStation","girderStation");
  this.addInput("layout","layout");
  this.addInput("key","string");
}

PartGeneralView.prototype.onExecute = function() {
}

PartGeneralView.prototype.on3DExecute = function() {
  let group = PartGeneralDraw(this.getInputData(0),this.getInputData(1),this.getInputData(2))
  let layer = this.getInputData(2).layer;
  let key = this.getInputData(3);
  // console.log("check", layer,key)
  sceneAdder({name:`${key}`, layer:layer, mesh:group, meta:{part:`${key}`}});

  // sceneAdder({layer:layer, mesh:group},key);
  // sceneAdder(group, [this.getInputData(4), "GirderGeneralView2", "total"]);
};


export function XbeamGeneralView(){
  this.addInput("diaDict","diaDict");
  this.addInput("girderStation","girderStation");
  this.addInput("layout","layout");
  this.addInput("key","string");
}

XbeamGeneralView.prototype.onExecute = function() {
}

XbeamGeneralView.prototype.on3DExecute = function() {
  let group = XbeamSection(this.getInputData(0),this.getInputData(1),this.getInputData(2))
  let layer = this.getInputData(2).layer;
  let key = this.getInputData(3);
  // console.log("check", layer,key)
  sceneAdder({name:`${key}`, layer:layer, mesh:group, meta:{part:`${key}`}});

  // sceneAdder({layer:layer, mesh:group},key);
  // sceneAdder(group, [this.getInputData(4), "GirderGeneralView2", "total"]);
};


// export function SideViewer(){
//   this.addInput("steelBoxDict","steelBoxDict");
//   this.addInput("hBracingDict","hBracingDict");
//   this.addInput("diaDict","diaDict");
//   this.addInput("vstiffDict","diaDict");
//   this.addInput("gridPoint","gridPoint");
//   this.addInput("initPoint","point");
// }

// SideViewer.prototype.onExecute = function() {
// }

// SideViewer.prototype.on3DExecute = function() {
//   let offset = 15000;
//   let group = sideDraw(this.getInputData(0),this.getInputData(1), this.getInputData(2), this.getInputData(3), this.getInputData(4),this.getInputData(5))
//   // topDraw(steelBoxDict,hBracingDict, diaDict, vstiffDict, nameToPointDict,initPoint)
//   group.position.set(0,-offset,0)
//   sceneAdder({layer:1, mesh:group},"SideView");
// };

export function LineDraw(){
  this.addInput("masterLine","line");
  this.addInput("slaveLine","line");
}

LineDraw.prototype.onExecute = function() {
}

LineDraw.prototype.on3DExecute = function() {
  let group = LineDrawView(this.getInputData(0),this.getInputData(1))
  sceneAdder({name:"LineView", layer:3, mesh:group, meta:{part:"LineView"}});

  // sceneAdder({layer:3, mesh:group},"LineView")
  // sceneAdder(group, [3, "LineView", "total"])
}

export function LineSideDraw(){
  this.addInput("masterLine","line");
}

LineSideDraw.prototype.onExecute = function() {
}

LineSideDraw.prototype.on3DExecute = function() {
  let group = LineSideView(this.getInputData(0))
  sceneAdder({name:"LineSideView", layer:4, mesh:group, meta:{part:"LineSideView"}});

  // sceneAdder({layer:4, mesh:group},"LineSideView")
  // sceneAdder(group, [4, "LineSideView", "total"]);
}

export function GirderLayoutDraw(){
  this.addInput("girderLayout","girderLayout");
}

GirderLayoutDraw.prototype.onExecute = function() {
}

GirderLayoutDraw.prototype.on3DExecute = function() {
  let group = GirderLayoutView(this.getInputData(0))
  sceneAdder({name:"GirderLayout", layer:3, mesh:group.planroup, meta:{part:"GirderLayout"}});
  sceneAdder({name:"GirderLayoutSide", layer:4, mesh:group.side, meta:{part:"GirderLayoutSide"}});

  // sceneAdder({layer:3, mesh:group.plan},"GirderLayout")
  // sceneAdder({layer:4, mesh:group.side},"GirderLayoutSide")
  // sceneAdder(group.plan, [3, "GirderLayout", "total"])
  // sceneAdder(group.side, [4, "GirderLayoutSide", "total"])
}


