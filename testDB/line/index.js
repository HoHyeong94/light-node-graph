import { meshArr } from "global";
import {
  LineToThree,
  LineGenerator,
  VerticalPositionGenerator,
  OffsetLine
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

  const input = {
    beginStation,
    horizonDataList,
    slaveOrMaster,
    verticalDataList,
    superElevation
  };

  let line = LineGenerator(input);
  this.points = line.points;
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

Line.prototype.on3DExecute = function() {
  meshArr.current.push({
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

export function LineOffset() {
  this.addInput("line", "line");
  this.addInput("offsets", 0);
  this.addOutput("lines", "arr");
}
LineOffset.prototype.onExecute = async function() {
  const line = this.getInputData(0);
  const offsets = this.getInputData(1);

  function offPerform(o) {
    return new Promise((res, rej) => {
      res(OffsetLine(line, o));
    });
  }

  if (Array.isArray(offsets)) {
    const tasks = offsets.map(offPerform);
    const r = await Promise.all(tasks);
    return this.setOutputData(0, r);
  }

  const r = await offPerform(offsets);
  return this.setOutputData(0, r);
};
