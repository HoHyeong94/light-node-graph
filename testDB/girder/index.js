import { GirderLayoutGenerator } from "./module";

export function GirdersGen() {
  this.addInput("girderlayoutInput", "arr");
  this.addInput("masterline", "arr");
  this.addInput("line", "arr");
  this.addOutput("girderLayout", "arr");
}

GirdersGen.prototype.onExecute = function() {
  const girderlayoutInput = this.getInputData(0);
  const mLine = this.getInputData(1);
  const hLine = this.getInputData(2);
  const result = GirderLayoutGenerator(
    girderlayoutInput,
    mLine,
    hLine
  );
  this.setOutputData(0, result);
};
