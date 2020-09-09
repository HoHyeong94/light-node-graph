import { sceneAdder, THREE } from "global";
import {CylinderModelView } from "./module"

export function Cylinderview() {
    this.addInput("top", "number");
    this.addInput("bottom","number")
    this.addInput("height", "number");
  }


  
Cylinderview.prototype.onExecute = function () {
    
    
    let tmpMesh = CylinderModelView(getInputData(0), getInputData(1),getInputData(2))
    sceneAdder(tmpMesh);
    
    //console.log(tmpMesh)
    console.log(getInputData(2))
  }