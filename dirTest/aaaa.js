function ThreeRenderer() {
  this.addInput("mesh", "meshxx");
}

ThreeRenderer.prototype.onExecute = function() {
  ThreeRenderAction(this.getInputData(0));
};

LiteGraph.registerNodeType("nexivil/threerenderer", ThreeRenderer);