// import { defaultValues } from "./defaultValues";
import { LiteGraph } from "global";
import "./inputNodes"
import {MasterLine} from "./line/index"
import {GirderLayout,GridPoint, StationList} from "./girder/index"
import {SectionPoint, DeckPoint} from "./section/index"
import {SteelBox } from "./steelBox/index"
import { VstiffDict, DiaDict, HBracing } from "./stiffner/index"
import { Xbeam } from "./xbeam/index"
import { LineViewer, SteelPlateView, InitPoint, DiaPhragmView,HorBracingView, DeckView, BarrierView, SpliceBoltView, RebarView, StudView, AnalysisView } from "./threeView/index"
import { SectionViewer, TopViewer, SideViewer, LineDraw, LineSideDraw, GirderLayoutDraw, GirderGeneralView1 } from "./drawingView/index"
import { Support, SapJoint, SapFrame } from "./analysis/index"
import { SectionDB } from "./DB/index"
import { SplicePart } from "./splice/index"
import { BarrierPoint } from "./barrier/index"
import { DeckRebar } from "./rebar/index"
import { Stud } from "./stud/index"

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
LiteGraph.registerNodeType("nexivil/support",Support);
LiteGraph.registerNodeType("nexivil/sapJoint",SapJoint);
LiteGraph.registerNodeType("nexivil/sapFrame",SapFrame);
LiteGraph.registerNodeType("nexivil/SectionDB",SectionDB);
LiteGraph.registerNodeType("HMECS/splice", SplicePart)
LiteGraph.registerNodeType("HMECS/barrier", BarrierPoint)
LiteGraph.registerNodeType("HMECS/DeckRebar", DeckRebar)
LiteGraph.registerNodeType("HMECS/Stud", Stud)


LiteGraph.registerNodeType("3DVIEW/LineView",LineViewer);
LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);
LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);
LiteGraph.registerNodeType("3DVIEW/HorBracingView", HorBracingView);
LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);
LiteGraph.registerNodeType("3DVIEW/deckView", DeckView);
LiteGraph.registerNodeType("3DVIEW/BarrierView", BarrierView);
LiteGraph.registerNodeType("3DVIEW/SpliceBoltView", SpliceBoltView);
LiteGraph.registerNodeType("3DVIEW/RebarView", RebarView);
LiteGraph.registerNodeType("3DVIEW/StudView", StudView);
LiteGraph.registerNodeType("3DVIEW/AnalysisView", AnalysisView);

LiteGraph.registerNodeType("Drawing/SectionView", SectionViewer );
LiteGraph.registerNodeType("Drawing/TopView", TopViewer );
LiteGraph.registerNodeType("Drawing/SideView", SideViewer );
LiteGraph.registerNodeType("Drawing/LineDraw", LineDraw );
LiteGraph.registerNodeType("Drawing/LineSideDraw", LineSideDraw );
LiteGraph.registerNodeType("Drawing/GirderLayoutDraw", GirderLayoutDraw );
LiteGraph.registerNodeType("Drawing/GirderGeneralView1", GirderGeneralView1 );


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