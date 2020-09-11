import { sceneAdder, THREE } from "global"
import {CylinderModelView} from "./module"

export function Cylinderview() {
    this.addInput("length", "arr");
    this.addInput("rotate","degree")
    this.addInput("position","arr")
    
  }
Cylinderview.prototype.onExecute = function () {
    console.log("시작")  
    console.log(this.getInputData(0))
    console.log(this.getInputData(1))
    console.log(this.getInputData(2))
    let tmpMesh = CylinderModelView(this.getInputData(0),this.getInputData(1),this.getInputData(2))
    sceneAdder({name:'cy', layer:0, mesh:tmpMesh, meta:{part:this.getInputData(2)}});
    
    //console.log(tmpMesh)
    //console.log(getInputData(2))
  }
