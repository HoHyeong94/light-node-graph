// import { defaultValues } from "./defaultValues";
import { LiteGraph } from "global";
import "./inputNodes"
import {MasterLine} from "./line/index"
import {GirderLayout,GridPoint, StationList} from "./girder/index"
import {SectionPoint, DeckPoint} from "./section/index"
import {SteelBox } from "./steelBox/index"
import { VstiffDict, DiaDict, HBracing, JackupDict, HstiffDict} from "./stiffner/index"
import { Xbeam } from "./xbeam/index"
import { LineViewer, SteelPlateView, InitPoint, DiaPhragmView, DeckView, BarrierView, SpliceBoltView, RebarView, StudView, AnalysisView, 
        AnalysisResultView, LoftView } from "./threeView/index"
import { SectionViewer, TopViewer, LineDraw, LineSideDraw, GirderLayoutDraw, GirderGeneralView1, GirderGeneralView2, PartGeneralView, 
        XbeamGeneralView} from "./drawingView/index"
import { Support, SapJoint, SapFrame, CompositeJoint, CompositeFrame } from "./analysis/index"
import { SectionDB } from "./DB/index"
import { SplicePart } from "./splice/index"
import { BarrierPoint } from "./barrier/index"
import { DeckRebar } from "./rebar/index"
import { Stud } from "./stud/index"
import { MaterialQntt } from "./quantity/index"
import { AbutModel, AbutPoint } from "./substruc/index"
import { IGirder, GirderPoint } from "./PSC/index"
import {Cylinderview} from "./CYL/index"
import {VectorView} from "./vectorcm/index"
import {ShoeView} from "./Shoe/index"

LiteGraph.registerNodeType("nexivil/MasterLine", MasterLine);
LiteGraph.registerNodeType("nexivil/GirderLayout", GirderLayout);
LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);
LiteGraph.registerNodeType("nexivil/GridStationList", StationList);
LiteGraph.registerNodeType("nexivil/SectionPoint", SectionPoint);
LiteGraph.registerNodeType("nexivil/DeckPoint", DeckPoint);
LiteGraph.registerNodeType("nexivil/MaterialQntt", MaterialQntt);

LiteGraph.registerNodeType("HMECS/steelBox", SteelBox);
LiteGraph.registerNodeType("HMECS/vStiffDict", VstiffDict);
LiteGraph.registerNodeType("HMECS/diaDict", DiaDict);
LiteGraph.registerNodeType("HMECS/hBracing", HBracing);
LiteGraph.registerNodeType("HMECS/JackupDict", JackupDict);
LiteGraph.registerNodeType("HMECS/HstiffDict",HstiffDict);
LiteGraph.registerNodeType("HMECS/xbeam", Xbeam);
LiteGraph.registerNodeType("nexivil/support",Support);
LiteGraph.registerNodeType("nexivil/sapJoint",SapJoint);
LiteGraph.registerNodeType("nexivil/sapFrame",SapFrame);
LiteGraph.registerNodeType("nexivil/CompositeJoint",CompositeJoint);
LiteGraph.registerNodeType("nexivil/CompositeFrame",CompositeFrame);
LiteGraph.registerNodeType("nexivil/SectionDB",SectionDB);
LiteGraph.registerNodeType("nexivil/AbutModel",AbutModel);
LiteGraph.registerNodeType("nexivil/AbutPoint",AbutPoint);

LiteGraph.registerNodeType("HMECS/splice", SplicePart)
LiteGraph.registerNodeType("HMECS/barrier", BarrierPoint)
LiteGraph.registerNodeType("HMECS/DeckRebar", DeckRebar)
LiteGraph.registerNodeType("HMECS/Stud", Stud)


LiteGraph.registerNodeType("3DVIEW/LineView",LineViewer);
LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);
LiteGraph.registerNodeType("3DVIEW/diaPhragmView", DiaPhragmView);
// LiteGraph.registerNodeType("3DVIEW/HorBracingView", HorBracingView);
LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);
LiteGraph.registerNodeType("3DVIEW/deckView", DeckView);
LiteGraph.registerNodeType("3DVIEW/BarrierView", BarrierView);
LiteGraph.registerNodeType("3DVIEW/SpliceBoltView", SpliceBoltView);
LiteGraph.registerNodeType("3DVIEW/RebarView", RebarView);
LiteGraph.registerNodeType("3DVIEW/StudView", StudView);
LiteGraph.registerNodeType("3DVIEW/AnalysisView", AnalysisView);
LiteGraph.registerNodeType("3DVIEW/AnalysisResultView", AnalysisResultView);
LiteGraph.registerNodeType("3DVIEW/LoftView", LoftView);

LiteGraph.registerNodeType("Drawing/SectionView", SectionViewer );
LiteGraph.registerNodeType("Drawing/TopView", TopViewer );
// LiteGraph.registerNodeType("Drawing/SideView", SideViewer );
LiteGraph.registerNodeType("Drawing/LineDraw", LineDraw );
LiteGraph.registerNodeType("Drawing/LineSideDraw", LineSideDraw );
LiteGraph.registerNodeType("Drawing/GirderLayoutDraw", GirderLayoutDraw );
LiteGraph.registerNodeType("Drawing/GirderGeneralView1", GirderGeneralView1 );
LiteGraph.registerNodeType("Drawing/GirderGeneralView2", GirderGeneralView2 );
LiteGraph.registerNodeType("Drawing/PartGeneralView", PartGeneralView );
LiteGraph.registerNodeType("Drawing/XbeamGeneralView", XbeamGeneralView );
LiteGraph.registerNodeType("PSC/IGirder", IGirder );
LiteGraph.registerNodeType("PSC/GirderPoint", GirderPoint );
LiteGraph.registerNodeType("CYL/Cylinderview",Cylinderview);
LiteGraph.registerNodeType("vectorcm/VectorView",VectorView);
LiteGraph.registerNodeType("Shoe/ShoeView",ShoeView);







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

