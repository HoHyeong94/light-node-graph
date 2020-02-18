import { LiteGraph } from 'global';

import init, {
    LineGen,
    LineOffset as Lineoff
} from "./wasm/Girder";

const Initialize = async () => {
    await init("/3rdParty/kdb621/Girder_bg.wasm");
};

Initialize().then(() => {
    function LineGenerator() {
        this.addInputs([
            ["HorizonData", "table"],
            ["BeginSTA.", "number"],
            ["MasterLine", "boolean"]
        ]);
        this.addProperty("HorizonData", [
            [178551.19287, 552443.31955, 0.0, 0.0, 0.0],
            [178321.1309, 552413.5884, 200.0, 100.0, 100.0],
            [178264.9318, 551804.2057, 200.0, 100.0, 90.0],
            [178142.69905, 551723.23752, 0.0, 0.0, 0.0]
        ]);
        this.addProperty("beginStation", 769.45242);
        this.addProperty("slaveOrMaster", false);
        this.addOutput("Line", "line");
    }

    LineGenerator.prototype.onExecute = function () {
        let a = this.getInputData(0);
        let b = this.getInputData(1);
        let c = this.getInputData(2);
        const lineInput = {
            beginStation: b ? b : this.properties["beginStation"],
            horizonDataList: a ? a : this.properties["HorizonData"],
            slaveOrMaster: c ? c : this.properties["slaveOrMaster"]
        };
        let r = LineGen(lineInput);
        console.log(r)
        this.setOutputData(0, r);
    };

    LiteGraph.registerNodeType("nexivil/LineGenerator", LineGenerator);

    function LineOffset() {
        this.addInputs([
            ["Line", "line"],
            ["offset", "number"]
        ]);
        this.addOutput("points", "points");
    }

    LineOffset.prototype.onExecute = function () {
        let a = this.getInputData(0);
        let b = this.getInputData(1);

        let r = Lineoff(a, b);
        this.setOutputData(0, r);
    };

    LiteGraph.registerNodeType("nexivil/LineOffset", LineOffset);
}).catch(e => console.error(e));

