// import { defaultValues } from "./defaultValues";
import { LiteGraph } from "global";
import "./inputNodes"
import {MasterLine} from "./line/index"
import {GirderLayout,GridPoint, StationList} from "./girder/index"
import {SectionPoint, DeckPoint} from "./section/index"
import {SteelBox } from "./steelBox/index"
import { VstiffDict, DiaDict, HBracing } from "./stiffner/index"
import { Xbeam } from "./xbeam/index"
import { LineViewer, SteelPlateView, InitPoint, DiaPhragmView,HorBracingView } from "./threeView/index"

LiteGraph.registerNodeType("nexivil/MasterLine", MasterLine);
LiteGraph.registerNodeType("nexivil/GirderLayout", GirderLayout);
LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);
LiteGraph.registerNodeType("nexivil/GridStationList", StationList);
LiteGraph.registerNodeType("nexivil/SectionPoint", SectionPoint);
LiteGraph.registerNodeType("nexivil/DeckPoint", DeckPoint);
LiteGraph.registerNodeType("HMECS/steelBox", SteelBox);
LiteGraph.registerNodeType("HMECS/vStiffDict", VstiffDict);
LiteGraph.registerNodeType("HMECS/diaDict", DiaDict);
LiteGraph.registerNodeType("HMECS/hBracing", HBracing);
LiteGraph.registerNodeType("HMECS/xbeam", Xbeam);

LiteGraph.registerNodeType("3DVIEW/LineView",LineViewer);
LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);
LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);
LiteGraph.registerNodeType("3DVIEW/HorBracingView", HorBracingView);
LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);


// const {
//   horizon,
//   vertical,
//   superElevation,
//   girderLayoutInput,
//   SEShape,
//   girderBaseInfo,
//   xbeamLayout,
//   xbeamSectionList,
//   diaphragmLayout,
//   diaphragmSectionList,
//   vStiffLayout,
//   vStiffSectionList,
//   hBracingLayout,
//   hBracingSectionList
// } = defaultValues;

// function HorizonInput(){
//   this.addOutput("horizon","horizon")
// }
// HorizonInput.prototype.onExecute = function() {
//   this.setOutputData(0,horizon)
// }
// LiteGraph.registerNodeType("nexivil/Horizon", HorizonInput);