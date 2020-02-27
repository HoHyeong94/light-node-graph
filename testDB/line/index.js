import {
  LineToThree,
  LineGenerator,
  VerticalPositionGenerator
} from "./module";

export function Line() {
  this.addInput("horizon", "arr");
  this.addInput("vertical", "arr");
  this.addInput("superElevation", "arr");
  this.addInput("beginStation", "number");
  this.addInput("slaveOrMaster", "boolean");
  this.addOutput("line", "line");
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
  this.setOutputData(0, line);
};
