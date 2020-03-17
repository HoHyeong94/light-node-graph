// import { defaultValues } from "./defaultValues";
import { LiteGraph } from "global";
import "./inputNodes"
<<<<<<< HEAD
import {MasterLine} from "./lineNodes"
import {GirderLayout,GridPoint} from "./girderNodes"
import {SectionPoint} from "./sectionPointNodes"
import "./steelBoxNodes"
import "./stiffnerNodes"
=======
import {MasterLine} from "./line/index"
import {GirderLayout,GridPoint, StationList} from "./girder/index"
import {SectionPoint} from "./section/index"
import {SteelBox } from "./steelBox/index"
import { VstiffDict, DiaDict } from "./stiffner/index"
import { LineViewer, SteelPlateView, InitPoint, DiaPhragmView } from "./threeView/index"
>>>>>>> backup

LiteGraph.registerNodeType("nexivil/MasterLine", MasterLine);
LiteGraph.registerNodeType("nexivil/GirderLayout", GirderLayout);
LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);
<<<<<<< HEAD
LiteGraph.registerNodeType("nexivil/SectionPoint", SectionPoint);
=======
LiteGraph.registerNodeType("nexivil/GridStationList", StationList);
LiteGraph.registerNodeType("nexivil/SectionPoint", SectionPoint);
LiteGraph.registerNodeType("HMECS/steelBox", SteelBox);

LiteGraph.registerNodeType("HMECS/vStiffDict", VstiffDict);
LiteGraph.registerNodeType("HMECS/diaDict", DiaDict);



LiteGraph.registerNodeType("3DVIEW/LineView",LineViewer);
LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);
LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);
LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);


>>>>>>> backup
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