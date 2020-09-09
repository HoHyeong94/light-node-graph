import { scene, THREE } from "global";
import {CylinderModelView } from "./module"

export function Cylinderview() {
    this.addInput("top", "number");
    this.addInput("bottom","number")
    this.addInput("height", "number");
    
  }


  
Cylinderview.prototype.onExecute = function () {
    
    
    let tmpMesh = CylinderModelView(this.getInputData(0), this.getInputData(1),this.getInputData(2))
    scene(tmpMesh);
    
    //console.log(tmpMesh)
    //console.log(getInputData(2))
  }