import { LiteGraph } from "global";

import { Line, LineOffset } from "./line/index";
import {GirdersGen} from "./girder/index"

LiteGraph.registerNodeType("nexivil/lineGen", Line);
LiteGraph.registerNodeType("nexivil/lineOffset", LineOffset);
LiteGraph.registerNodeType("nexivil/GirdersGen", GirdersGen);
