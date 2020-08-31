import { AbutModelGen, AbutPointGen } from "./module"

export function AbutPoint(){
    this.addInput("girderLayout","girderLayout");
    this.addInput("slabLayout","arr");
    this.addOutput("startAbutPoint","arr");
    this.addOutput("endAbutPoint","arr");
  }
  
  AbutPoint.prototype.onExecute = function() {
    const result = AbutPointGen(this.getInputData(0), this.getInputData(1))
    this.setOutputData(0, result.start)
    this.setOutputData(1, result.end)
  }

  export function AbutModel(){
    this.addInput("abutPoint","arr");
    this.addInput("abutInput","abutInput");
    this.addInput("supportData","supportData");
    this.addOutput("model","model");
    this.addOutput("diaDict","diaDict");
  }
  
  AbutModel.prototype.onExecute = function() {
    const result = AbutModelGen(this.getInputData(0), this.getInputData(1), this.getInputData(2))
    this.setOutputData(0, result.model)
    this.setOutputData(1, result.part)
  }
