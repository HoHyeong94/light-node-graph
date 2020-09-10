import { sceneAdder, THREE } from "global"
import { VectorModelView } from "./module"



export function VectorView() {
    this.addInput("point1", "arr");
    this.addInput("point2","arr")
    this.addInput("point3", "arr");
    
  }


  
VectorView.prototype.onExecute = function () {
    
    
    let tmpMesh = VectorModelView(this.getInputData(0),this.getInputData(1),this.getInputData(2))
    sceneAdder({name:'vec', layer:0, mesh:tmpMesh, meta:{part:this.getInputData(2)}});
    
    //console.log(tmpMesh)
    //console.log(getInputData(2))
  }

