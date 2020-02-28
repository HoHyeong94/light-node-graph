import { LiteGraph } from "global";

import {Line, LineOffset} from "./line/index"

LiteGraph.registerNodeType("nexivil/lineGen", Line);
LiteGraph.registerNodeType("nexivil/lineOffset", LineOffset);