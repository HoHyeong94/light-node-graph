import { SectionPointDict, DeckSectionPoint } from "./module"

export function SectionPoint(){
  this.addInput("gridPoint","gridPoint");
  this.addInput("girderBaseInfo","girderBaseInfo");
  this.addInput("slabInfo","slabInfo");
  this.addInput("slabLayout","arr");
  this.addOutput("sectionPointDict","sectionPointDict");
}

SectionPoint.prototype.onExecute = function() {
  const gridPoint = this.getInputData(0);
  const girderBaseInfo = this.getInputData(1);
  const slabInfo = this.getInputData(2);
  const slabLayout = this.getInputData(3);
  let sectionPointDict = SectionPointDict(gridPoint,girderBaseInfo,slabInfo,slabLayout)
  this.setOutputData(0, sectionPointDict)
}


export function DeckPoint(){
    this.addInput("masterLine","line");
    this.addInput("centerLineStation","centerLineStation");
    this.addInput("girderStation","girderStation");
    this.addInput("girderLayout","girderLayout");
    this.addInput("slabInfo","slabInfo");
    this.addInput("slabLayout","arr");
    this.addInput("girderBaseInfo","arr");
    this.addInput("pointDict","pointDict");
    this.addOutput("DeckPointDict","DeckPointDict");
    this.addOutput("DeckLinetDict","DeckLineDict");
  }

  DeckPoint.prototype.onExecute = function(){
    let deck = DeckSectionPoint(
      this.getInputData(0),
      this.getInputData(1),
      this.getInputData(2),
      this.getInputData(3),
      this.getInputData(4),
      this.getInputData(5),
      this.getInputData(6),
      this.getInputData(7)
    )
    this.setOutputData(0,deck.deckPointDict)
    this.setOutputData(1,deck.deckLineDict)
  }