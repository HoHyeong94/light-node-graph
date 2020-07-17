import { sceneAdder, THREE } from "global";
import { LineMesh, LineView, SteelBoxView, DiaView, HBracingView, HBracingPlateView, DeckPointView, boltView, BarrierPointView, StudMeshView, AnalysisModel } from "./module"
import { LineToThree } from "../line/module";

export function LineViewer() {
  this.addInput("points", "points");
  this.addInput("initPoint", "point");
  this.addInput("color", "string");
}
LineViewer.prototype.onExecute = function () {
}

LineViewer.prototype.on3DExecute = function () {
  const points = this.getInputData(0);
  const initPoint = this.getInputData(1) ? this.getInputData(1) : points[0];
  const color = this.getInputData(2);
  console.log(this.getInputData(1) ? true : false)
  console.log(initPoint, color)
  let mesh = LineView(points, initPoint, color)
  sceneAdder({ layer: 2, mesh: mesh }, "line");
  // sceneAdder(mesh, [2, "line","total"])
};

export function SteelPlateView() {
  this.addInput("steelBoxDict", "steelBoxDict");
  this.addInput("Point", "Point");
}

SteelPlateView.prototype.onExecute = function () {
  const steeBoxDict = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const group = SteelBoxView(steeBoxDict, initPoint);
  sceneAdder({ layer: 0, mesh: group }, "steelbox");
  // sceneAdder(group, [0, "steelBox","total"])
}

export function DiaPhragmView() {
  this.addInput("diaDict", "diaDict");
  this.addInput("Point", "Point");
  this.addInput("keyName", "string")
}

DiaPhragmView.prototype.onExecute = function () {
  const diaDict = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const keyName = this.getInputData(2);
  const group = DiaView(diaDict, initPoint);
  // let n = Math.random().toFixed(5)
  // console.log("random", n)
  sceneAdder({ layer: 0, mesh: group }, keyName);
  // sceneAdder(group, [0, "Part", keyName])
}

export function HorBracingView() {
  this.addInput("hBracingDict", "hBracingDict");
  this.addInput("Point", "Point");
}

HorBracingView.prototype.onExecute = function () {
  const hb = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const group = HBracingView(hb.hBracingDict, initPoint);
  const group2 = HBracingPlateView(hb.hBracingPlateDict, initPoint);
  sceneAdder({ layer: 0, mesh: group }, "hbracing");
  sceneAdder({ layer: 0, mesh: group2 }, "hbracingPlate");
  // sceneAdder(group, [0, "HBracing", "Bracing"])
  // sceneAdder(group2, [0, "HBracing", "Plate"])
}

export function DeckView() {
  this.addInput("deckPointDict", "deckPointDict");
  this.addInput("Point", "Point");
  this.addInput("opacity", "number")
}

DeckView.prototype.onExecute = function () {
  sceneAdder({
    layer: 0,
    mesh: DeckPointView(this.getInputData(0), this.getInputData(1), this.getInputData(2))
  }, "deck");
  // sceneAdder(DeckPointView(this.getInputData(0),this.getInputData(1),this.getInputData(2)), [0, "deck", "total"]); 
}

export function SpliceBoltView() {
  this.addInput("spliceDict", "diaDict");
  this.addInput("Point", "Point");
}

SpliceBoltView.prototype.onExecute = function () {
  // sceneAdder({ layer: 0, 
  //     mesh: boltView(this.getInputData(0),this.getInputData(1))
  // },"bolt"); 
  for (let key in this.getInputData(0)) {
    let boltMesh = boltView(this.getInputData(0)[key], this.getInputData(1))
    if (boltMesh) {
      boltMesh.userData["element"] = "bolt"
      sceneAdder({ layer: 0, mesh: boltMesh }, "bolt" + key);
      // sceneAdder(boltMesh, [0, "bolt", key]);
    }
  }
}

export function StudView() {
  this.addInput("studList", "studList");
  this.addInput("Point", "Point");
}

StudView.prototype.onExecute = function () {
  sceneAdder({
    layer: 0,
    mesh: StudMeshView(this.getInputData(0), this.getInputData(1))
  }, "stud");
  // sceneAdder( StudMeshView(this.getInputData(0),this.getInputData(1)), [0, "stud", "total"]); 
}

export function BarrierView() {
  this.addInput("deckPointDict", "deckPointDict");
  this.addInput("Point", "Point");
  this.addInput("opacity", "number")
}

BarrierView.prototype.onExecute = function () {
  const decPoint = this.getInputData(0)
  for (let key in decPoint) {
    let tmpMesh = BarrierPointView(decPoint[key], this.getInputData(1), this.getInputData(2))
    tmpMesh.userData["element"] = "Barrier"
    sceneAdder({
      layer: 0,
      mesh: tmpMesh
    }, "Barrier" + key);
    // sceneAdder( BarrierPointView(decPoint[key],this.getInputData(1),this.getInputData(2)), [0, "Barrier", key]);
  }
}

export function RebarView() {
  this.addInput("deckRebar", "deckRebar");
  this.addInput("Point", "Point");
}

RebarView.prototype.onExecute = function () {
  const deckRebar = this.getInputData(0)
  let group1 = new THREE.Group()
  let group2 = new THREE.Group()

  for (let i in deckRebar.r1) {
    group1.add(LineMesh(deckRebar.r1[i], this.getInputData(1), 0xff00ff))
    // sceneAdder(LineView(deckRebar.r1[i], this.getInputData(1),0xff00ff), [0, "rebar1", i])
  }
  for (let i in deckRebar.r2) {
    group2.add(LineMesh(deckRebar.r2[i], this.getInputData(1), 0x00ff00))
    // sceneAdder(LineView(deckRebar.r2[i], this.getInputData(1),0x00ff00), [0, "rebar2", i])
  }
  sceneAdder({ layer: 0, mesh: group1 }, "rebar1")
  sceneAdder({ layer: 0, mesh: group2 }, "rebar2")

}




export function InitPoint() {
  this.addInput("gridPoint", "gridPoint");
  this.addOutput("Point", "Point");
}

InitPoint.prototype.onExecute = function () {
  this.getInputData(0);
  this.setOutputData(0, this.getInputData(0)["G1S1"])
}


export function AnalysisView() {
  this.addInput("nodeInput", "nodeInput");
  this.addInput("frameInput", "frameInput");
  this.addOutput("temOut", "temOut");
}

AnalysisView.prototype.onExecute = function () {
  let result = AnalysisModel(this.getInputData(0), this.getInputData(1))
  sceneAdder({ layer: 2, mesh: result.group }, "analysis");
  // sceneAdder(AnalysisModel(this.getInputData(0),this.getInputData(1)),[2, "analysis", "total"]);
  this.setOutputData(0, result.analysisOutput)
}