import { sceneAdder, THREE } from "global"
import {CylinderModelView,CylinderLotation } from "./module"

export function Cylinderview() {
    this.addInput("length", "arr");
    //this.addInput("bottom","number")
   // this.addInput("height", "number");
    this.addInput("rotate","degree")
    
  }
Cylinderview.prototype.onExecute = function () {
    
    
    let tmpMesh = CylinderModelView(this.getInputData(0),this.getInputData(1))
    sceneAdder({name:'cy', layer:0, mesh:tmpMesh, meta:{part:this.getInputData(2)}});
    
    //console.log(tmpMesh)
    //console.log(getInputData(2))
  }
