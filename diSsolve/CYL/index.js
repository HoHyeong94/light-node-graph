import { sceneAdder, THREE } from "global";
import {LoftModelView } from "./module"

export function LoftView() {
    this.addInput("top", "number");
    this.addInput("bottom","number")
    this.addInput("height", "number");
  }


  
LoftView.prototype.onExecute = function () {
    
    
    let tmpMesh = LoftModelView(getInputData(0), getInputData(1),getInputData(2))
    sceneAdder(tmpMesh);
    
    //console.log(tmpMesh)
    console.log(getInputData(2))
  }