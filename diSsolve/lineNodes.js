import { LiteGraph, THREE, sceneAdder } from "global";
import {LineToThree, MasterLineData,  } from "./lineModule"

export function MasterLine(){
  this.addInput("horizon","horizon");
  this.addInput("vertical","vertical");
  this.addInput("superElevation","superElevation");
  this.addInput("beginStation","number");
  // this.addInput("slaveOrMaster","boolean");
  this.addOutput("points","points");
  this.addOutput("line","line");
}
MasterLine.prototype.onExecute = function() {

  const horizonDataList = this.getInputData(0);
  const verticalDataList = this.getInputData(1);
  const superElevation = this.getInputData(2);
  const beginStation = this.getInputData(3); //769452.42;
  const slaveOrMaster = this.getInputData(4); //true;
  
  // const input = { beginStation, horizonDataList, slaveOrMaster };

  let line = MasterLineData(horizonDataList,verticalDataList,superElevation,beginStation);
  // let zPosition = 0;
  // //   let line2 = OffsetLine(20,line)
  // for (let i = 0; i < line.points.length; i++) {
  //   zPosition = VerticalPositionGenerator(
  //     verticalDataList,
  //     superElevation,
  //     line.points[i]
  //   ).elevation;
  //   line.points[i].z = zPosition;
  // }
  this.setOutputData(0,line.points);
  this.setOutputData(1,line);
}
// LiteGraph.registerNodeType("nexivil/MasterLine", MasterLine);

MasterLine.prototype.on3DExecute = function() {
  sceneAdder({
    id: 0,
    mesh: LineToThree(this.points, {
      gradientX: 0.016485206229348726,
      gradientY: -0.02,
      masterStationNumber: 1208849.9976,
      normalCos: 0.5750740676992406,
      normalSin: -0.8181013486481056,
      offset: -36708.5424,
      skew: 90,
      stationNumber: 1208849.9976,
      virtual: false,
      x: 178341809.1588868,
      y: 552237726.8852764,
      z: 26934.34284538262
    })
  });
};





// function LineView(){
//   this.addInput("points","points");
//   this.addInput("point","point");
// }

// LineView.prototype.onExecute = function() {
//   const points = this.getInputData(0);
//   const initPoint = this.getInputData(1);
//   const group = LineToThree(points,initPoint);
//   meshArr.current.push({ id: 0, mesh: group}); 
// }

// LiteGraph.registerNodeType("3DVIEW/lineView", LineView);
