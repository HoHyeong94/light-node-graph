import { sceneAdder, THREE } from "global";
import { sectionView } from "./module"
// import { LineToThree } from "../line/module";

export function SectionViewer(){
  this.addInput("sectionName","arr");
  this.addInput("sectionPointDict","sectionPointDict");
  this.addInput("diaDict","diaDict");
}

SectionViewer.prototype.onExecute = function() {
}

SectionViewer.prototype.on3DExecute = function() {
  let gridlist = this.getInputData(0); //["G1D1", "G1D2", "G1D10"];
  let sectionPointDict = this.getInputData(1);
  let diaDict = this.getInputData(2);
//   let svgAll = { models: {} };
  let i = 0;
  let offset = 5000;
  for (let value of gridlist) {
    let sectionPoint = sectionPointDict[value].forward;
    let diaPoint = diaDict[value];
    let group = sectionView(value, sectionPoint, diaPoint);
    for (let j in group){
        group[j].position.set(i*offset,0,0)
        sceneAdder({layer:1, mesh:group[j]},"section" + value + j);
    }
    // // svgAll.models[value].origin = [i * offset, 0];
    i += 1;
  }
};