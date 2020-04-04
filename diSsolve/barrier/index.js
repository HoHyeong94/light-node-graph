import { BarrierSectionPoint } from "./module"

export function BarrierPoint(){
    this.addInput("masterLine","line");
    this.addInput("centerLineStation","centerLineStation");
    this.addInput("slabInfo","slabInfo");
    this.addInput("slabLayout","arr");
    this.addInput("pointDict","pointDict");
    this.addOutput("BarrierPointDict","DeckPointDict");
  }

  BarrierPoint.prototype.onExecute = function(){
    this.setOutputData(0,BarrierSectionPoint(
        this.getInputData(0),
        this.getInputData(1),
        this.getInputData(2),
        this.getInputData(3),
        this.getInputData(4)
      ))
  }