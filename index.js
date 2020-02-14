import { add, minus } from "./a/chunk0";
import { Main } from "./testP/mainFunction";
import { defaultValues } from "./testP/defaultValues";
import { LiteGraph , meshArr , THREE} from 'global';

import {
  LineView,
  
} from "./testP/threejsDisplay";

const {
  horizon, vertical, superElevation, girderLayoutInput, SEShape, girderBaseInfo, xbeamLayout, xbeamSectionList, diaphragmLayout,
  diaphragmSectionList, vStiffLayout, vStiffSectionList, hBracingLayout, hBracingSectionList
} = defaultValues

export default function main() {
  
  const a = add(1, 13)
  const b = minus(31, 2)
  return { a, b }
}

function MainFunction() {
  this.addInput("mesh", "meshxx");
}

MainFunction.prototype.onExecute = function () {
  var group = new THREE.Group();
  let linedata = Main(
    horizon, vertical, superElevation, girderLayoutInput, SEShape, girderBaseInfo, xbeamLayout, xbeamSectionList, diaphragmLayout,
    diaphragmSectionList, vStiffLayout, vStiffSectionList, hBracingLayout, hBracingSectionList
  );

  const initPoint = linedata.gridPoint.nameToPointDict["G1S1"];

    group.add(LineView(linedata.p[0], initPoint));
    console.log(group)

    meshArr.current.push({id:0,mesh:group})
};

LiteGraph.registerNodeType("nexivil/mainfunction", MainFunction);