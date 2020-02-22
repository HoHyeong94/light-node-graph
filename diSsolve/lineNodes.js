import { LiteGraph, meshArr, THREE } from "global";
import {_} from "global";
import {LineToThree, LineGenerator, VerticalPositionGenerator} from "./lineModule"

function Line(){
  this.addInput("horizon","horizon");
  this.addInput("vertical","vertical");
  this.addInput("superElevation","superElevation");
  this.addInput("beginStation","number");
  this.addInput("slaveOrMaster","boolean");
  this.addOutput("points","points");
  this.addOutput("line","line");
}
Line.prototype.onExecute = function() {

  const horizonDataList = this.getInputData(0);
  const verticalDataList = this.getInputData(1);
  const superElevation = this.getInputData(2);
  const beginStation = this.getInputData(3); //769452.42;
  const slaveOrMaster = this.getInputData(4); //true;
  
  const input = { beginStation, horizonDataList, slaveOrMaster };

  let line = LineGenerator(input);
  let zPosition = 0;
  //   let line2 = OffsetLine(20,line)
  for (let i = 0; i < line.points.length; i++) {
    zPosition = VerticalPositionGenerator(
      verticalDataList,
      superElevation,
      line.points[i]
    ).elevation;
    line.points[i].z = zPosition;
  }
  this.setOutputData(0,line.points);
  this.setOutputData(1,line);
}
LiteGraph.registerNodeType("nexivil/lineGenerator", Line);


function LineView(){
  this.addInput("points","points");
  this.addInput("point","point");
}

LineView.prototype.onExecute = function() {
  const points = this.getInputData(0);
  const initPoint = this.getInputData(1);
  const group = LineToThree(points,initPoint);
  meshArr.current.push({ id: 0, mesh: group}); 
}

LiteGraph.registerNodeType("3DVIEW/lineView", LineView);
