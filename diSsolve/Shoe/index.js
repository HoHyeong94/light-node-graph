import { sceneAdder, THREE } from "global"
import {ShoeModelView} from "./module"

export function ShoeView() {
    //this.addInput("length", "number");
    //this.addInput("thickness","number")
    //this.addInput("differ","number")
    //this.addInput("Ithickness","number")
    this.addInput("length","arr")
    this.addInput("rotate","arr")
    this.addInput("position","arr")
    
  }
ShoeView.prototype.onExecute = function () {

    console.log("호형2")
    let tmpMesh = ShoeModelView(this.getInputData(0),this.getInputData(1),this.getInputData(2))
    sceneAdder({name:'sh', layer:0, mesh:tmpMesh, meta:{part:this.getInputData(2)}});
    
    //console.log(tmpMesh)
    //console.log(getInputData(2))
  }
