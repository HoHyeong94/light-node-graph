import { LiteGraph } from "global";

import { Line, LineOffset } from "./line/index";
import {GirdersGen, GridPoint} from "./girder/index"

LiteGraph.registerNodeType("nexivil/lineGen", Line);
LiteGraph.registerNodeType("nexivil/lineOffset", LineOffset);

LiteGraph.registerNodeType("nexivil/GirdersGen", GirdersGen);
LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);