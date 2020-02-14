import { add, minus } from "./a/chunk0";
import { Main } from "./testP/mainFunction";
import { defaultValues } from "./testP/defaultValues";
import { LiteGraph, meshArr, THREE } from "global";

import {
  LineView,
  GirderFrameView,
  SteelBoxGirder,
  XbeamView,
  DiaView,
  HBracingView,
  HBracingPlateView
} from "./testP/threejsDisplay";

const {
  horizon,
  vertical,
  superElevation,
  girderLayoutInput,
  SEShape,
  girderBaseInfo,
  xbeamLayout,
  xbeamSectionList,
  diaphragmLayout,
  diaphragmSectionList,
  vStiffLayout,
  vStiffSectionList,
  hBracingLayout,
  hBracingSectionList
} = defaultValues;

export default function main() {
  const a = add(1, 13);
  const b = minus(31, 2);
  return { a, b };
}

function MainFunction() {
  this.addInput("mesh", "meshxx");
}

MainFunction.prototype.onExecute = function() {
  var group = new THREE.Group();
  let linedata = Main(
    horizon,
    vertical,
    superElevation,
    girderLayoutInput,
    SEShape,
    girderBaseInfo,
    xbeamLayout,
    xbeamSectionList,
    diaphragmLayout,
    diaphragmSectionList,
    vStiffLayout,
    vStiffSectionList,
    hBracingLayout,
    hBracingSectionList
  );

  const initPoint = linedata.gridPoint.nameToPointDict["G1S1"];

  let [line , linegeo] = LineView(linedata.p[0], initPoint)
  group.add(line);

  // group.add(
  //   GirderFrameView(
  //     linedata.gridPoint.gridPointStation,
  //     linedata.gridPoint.stationDictList,
  //     linedata.gridPoint.nameToPointDict,
  //     linedata.xbeamData,
  //     initPoint
  //   )
  // );


  // let girder = GirderFrameView(
  //   linedata.gridPoint.gridPointStation,
  //   linedata.gridPoint.stationDictList,
  //   linedata.gridPoint.nameToPointDict,
  //   linedata.xbeamData,
  //   initPoint
  // )
  // group.add(
  //   SteelBoxGirder(
  //     linedata.gridPoint.gridPointStation,
  //     linedata.gridPoint.stationDictList,
  //     linedata.sectionPointDict,
  //     linedata.gridPoint.nameToPointDict,
  //     initPoint
  //   )
  // );

  // let sbg = SteelBoxGirder(
  //   linedata.gridPoint.gridPointStation,
  //   linedata.gridPoint.stationDictList,
  //   linedata.sectionPointDict,
  //   linedata.gridPoint.nameToPointDict,
  //   initPoint
  // )
  // //xbeamView//
  // group.add(
  //   XbeamView(
  //     linedata.gridPoint.nameToPointDict,
  //     linedata.xbeamSectionDict,
  //     initPoint
  //   )
  // );
  // //diaphragmView//
  // group.add(
  //   DiaView(linedata.gridPoint.nameToPointDict, linedata.diaDict, initPoint)
  // );
  // group.add(
  //   DiaView(linedata.gridPoint.nameToPointDict, linedata.vStiffDict, initPoint)
  // );
  // group.add(LineView(linedata.hBracingList[0].line, initPoint));
  // group.add(LineView(linedata.hBracingList[1].line, initPoint));
  // group.add(HBracingView(linedata.hBracingList, initPoint));
  // group.add(
  //   HBracingPlateView(
  //     linedata.gridPoint.nameToPointDict,
  //     linedata.hBracingPlateDict,
  //     initPoint
  //   )
  // );

  meshArr.current.push({ id: 0, mesh: group , geo:linegeo });
};

LiteGraph.registerNodeType("nexivil/mainfunction", MainFunction);
