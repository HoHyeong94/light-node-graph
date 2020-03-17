<<<<<<< HEAD:diSsolve/girderNodes.js
// import { LiteGraph, meshArr, THREE } from "global";
import {GirderLayoutGenerator2, GridPointGenerator3} from "./girderModule"
// import {_} from "global";

export function GirderLayout(){
  this.addInput("MasterLine","line");
  this.addInput("SlaveLine","line");
  this.addInput("girderlayoutInput","girderlayoutInput");
  
  this.addOutput("girderLayout","girderLayout");
}

GirderLayout.prototype.onExecute = function() {
  const masterLine = this.getInputData(0);
  const slaveLine = [this.getInputData(1)];
  const girderLayoutInput = this.getInputData(2);
  const result = GirderLayoutGenerator2(masterLine, slaveLine, girderLayoutInput)
  this.setOutputData(0, result)
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

=======
// import { LiteGraph, meshArr, THREE } from "global";
// import {GirderLayoutGenerator, GridPointGenerator2} from "./girderModule"
// import {_} from "global";

// function Girder(){
//   this.addInput("girderlayoutInput","girderlayoutInput");
//   this.addInput("line","line");
//   this.addInput("vertical","vertical");
//   this.addInput("superElevation","superElevation");
//   this.addOutput("girderLayout","girderLayout");
// }

// Girder.prototype.onExecute = function() {
//   const girderlayoutInput = this.getInputData(0);
//   const hLine = [this.getInputData(1)];
//   const verticalDataList = this.getInputData(2);
//   const superElevation = this.getInputData(3);
//   const result = GirderLayoutGenerator(girderlayoutInput, hLine, verticalDataList,superElevation)
//   this.setOutputData(0, result)
// }

// LiteGraph.registerNodeType("nexivil/Girder", Girder);


// function GridPoint(){
//   this.addInput("girderlayoutInput","girderlayoutInput");
//   this.addInput("line","line");
//   this.addInput("girderLayout","girderLayout");
//   this.addInput("SEShape","SEShape");
//   this.addInput("vertical","vertical");
//   this.addInput("superElevation","superElevation");
//   this.addInput("diaPhragmLocate","diaPhragmLocate");
//   this.addInput("vStiffLocate","vStiffLocate");
//   this.addInput("splice","splice");
//   this.addInput("joint","joint");
//   this.addInput("height","height");
//   this.addInput("taperedPoint","taperedPoint");
//   this.addOutput("gridPoint","gridPoint");
// }

// GridPoint.prototype.onExecute = function() {
//   const line = this.getInputData(1);
//   const girderLayout = this.getInputData(2);
//   const SEShape = this.getInputData(3);
//   const startSkew = this.getInputData(0).supportData[0].angle;
//   const endSkew = this.getInputData(0).supportData[this.getInputData(0).supportData.length - 1].angle;
//   const verticalDataList = this.getInputData(4);
//   const superElevation = this.getInputData(5);
//   const diaPhragmLocate = this.getInputData(6);
//   const vStiffLocate = this.getInputData(7);
//   const splice = this.getInputData(8);
//   const joint = this.getInputData(9);
//   const height = this.getInputData(10);
//   const taperedPoint  = this.getInputData(11);
  
//   const result = GridPointGenerator2(line, girderLayout, SEShape, startSkew, endSkew, 
//                                     verticalDataList, superElevation,diaPhragmLocate, 
//                                     vStiffLocate, splice, joint, height,taperedPoint)
//   this.setOutputData(0, result)
//   console.log(result)
// }

>>>>>>> backup:diSsolve/girder/girderNodes.js
// LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);