import { sceneAdder } from "global";
import {LineView, SteelBoxView, DiaView, HBracingView, HBracingPlateView, DeckPointView, boltView, BarrierPointView} from "./module"

export function LineViewer(){
  this.addInput("points","points");
  this.addInput("initPoint","point");
  this.addInput("color","number");
}
LineViewer.prototype.onExecute = function() {
}

LineViewer.prototype.on3DExecute = function() {
  const points = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const color = this.getInputData(2);
  let mesh = LineView(points,initPoint,color)
  sceneAdder({layer:1, mesh:mesh},"line");
};

export function SteelPlateView(){
  this.addInput("steelBoxDict","steelBoxDict");
  this.addInput("Point","Point");
}

SteelPlateView.prototype.onExecute = function() {
  const steeBoxDict = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const group = SteelBoxView(steeBoxDict,initPoint);
  sceneAdder({ layer: 0, mesh: group},"steelbox"); 
}

export function DiaPhragmView(){
  this.addInput("diaDict","diaDict");
  this.addInput("Point","Point");
}

DiaPhragmView.prototype.onExecute = function() {
  const diaDict = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const group = DiaView(diaDict,initPoint);
  let n = Math.random().toFixed(5)
  console.log("random", n)
  sceneAdder({ layer: 0, mesh: group},"dia-"+ n ); 
}

export function HorBracingView(){
    this.addInput("hBracingDict","hBracingDict");
    this.addInput("Point","Point");
  }
  
  HorBracingView.prototype.onExecute = function() {
    const hb = this.getInputData(0);
    const initPoint = this.getInputData(1);
    const group = HBracingView(hb.hBracingDict,initPoint);
    const group2 = HBracingPlateView(hb.hBracingPlateDict,initPoint);
    sceneAdder({ layer: 0, mesh: group}, "hbracing"); 
    sceneAdder({ layer: 0, mesh: group2},"hbracingPlate"); 
  }
  
  export function DeckView(){
    this.addInput("deckPointDict","deckPointDict");  
    this.addInput("Point","Point");
    this.addInput("opacity","number")
  }
  
  DeckView.prototype.onExecute = function() {
    sceneAdder({ layer: 0, 
        mesh: DeckPointView(this.getInputData(0),this.getInputData(1),this.getInputData(2))
    },"deck"); 
  }

  export function SpliceBoltView(){
    this.addInput("spliceDict","diaDict");  
    this.addInput("Point","Point");
  }
  
  SpliceBoltView.prototype.onExecute = function() {
    sceneAdder({ layer: 0, 
        mesh: boltView(this.getInputData(0),this.getInputData(1))
    },"bolt"); 
  }


  export function BarrierView(){
    this.addInput("deckPointDict","deckPointDict");  
    this.addInput("Point","Point");
    this.addInput("opacity","number")
  }
  
  BarrierView.prototype.onExecute = function() {
    const decPoint = this.getInputData(0)
    for (let key in decPoint){
      sceneAdder({ layer: 0, 
          mesh: BarrierPointView(decPoint[key],this.getInputData(1),this.getInputData(2))
      },"Barrier"+key);
    }
  }

  



export function InitPoint(){
  this.addInput("gridPoint","gridPoint");
  this.addOutput("Point","Point");
}

InitPoint.prototype.onExecute = function() {
  this.getInputData(0);
  this.setOutputData(0, this.getInputData(0)["G1S1"])
}


