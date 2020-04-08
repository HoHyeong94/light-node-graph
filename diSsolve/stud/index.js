import { StudPoint } from "./module"

export function Stud(){
    this.addInput("girderStation","girderStation");
    this.addInput("sectionPointDict","sectionPointDict");
    this.addInput("studLayout","arr");
    this.addOutput("studList","studList");
  }
  
  Stud.prototype.onExecute = function() {
    const result = StudPoint(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    this.setOutputData(0, result)
  }