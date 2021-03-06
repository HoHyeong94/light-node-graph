import { GirderLayoutGenerator, GridPointGenerator2 } from "./module";

export function GirdersGen() {
  this.addInput("girderlayoutInput", "arr");
  this.addInput("masterLine", "arr");
  this.addInput("line", "arr");
  this.addOutput("girderLayout", "arr");
}

GirdersGen.prototype.onExecute = function() {
  const girderlayoutInput = this.getInputData(0);
  const mLine = this.getInputData(1);
  const hLine = this.getInputData(2);
  const result = GirderLayoutGenerator(girderlayoutInput, mLine, hLine);
  result.input = girderlayoutInput;
  this.setOutputData(0, result);
};

export function GridPoint() {
  this.addInput("gridPointInput", "obj");
  this.addInput("masterLine", "arr");
  this.addInput("girderLayout", "arr");
  this.addOutput("gridPoint", "arr");
}

GridPoint.prototype.onExecute = function() {
  const line = this.getInputData(1);
  const girderLayout = this.getInputData(2);
  const {
    SEShape,
    diaPhragmLocate,
    vStiffLocate,
    splice,
    joint,
    height,
    taperedPoint
  } = this.getInputData(0);
  const { verticalDataList, superElevation } = this.getInputData(1).input;
  const startSkew = girderLayout.input.supportData[0].angle;
  const endSkew =
    girderLayout.input.supportData[girderLayout.input.supportData.length - 1].angle;

  const result = GridPointGenerator2(
    line,
    girderLayout,
    SEShape,
    startSkew,
    endSkew,
    verticalDataList,
    superElevation,
    diaPhragmLocate,
    vStiffLocate,
    splice,
    joint,
    height,
    taperedPoint
  );
  this.setOutputData(0, result);
};
