import { DeckRebarPoint } from "./module"

export function DeckRebar() {
    this.addInput("masterLine","masterLine")
    this.addInput("gridPoint","gridPoint")
    this.addInput("deckPointDict","deckPointDict")
    this.addInput("slabInfo","slabInfo")
    this.addInput("slabLayout","slabLayout")
    this.addInput("rebar1","rebar1")
    this.addInput("rebar2","rebar2")
    this.addInput("rebar11","rebar11")
    this.addOutput("deckRebar", "deckRebar");
}

DeckRebar.prototype.onExecute = function () {
    let masterLine = this.getInputData(0);
    let pointDict = this.getInputData(1);
    let deckSection = this.getInputData(2);
    let slabInfo = this.getInputData(3);
    let slabLayout = this.getInputData(4);
    let rebar1 = this.getInputData(5);
    let rebar2 = this.getInputData(6);
    let rebar11  = this.getInputData(7);         

    
    this.setOutputData(0, DeckRebarPoint(
        masterLine,
        pointDict,  
        deckSection,
        slabInfo,
        slabLayout,
        rebar1,
        rebar2,
        rebar11
    ))
}
