import { PointSectionInfo, sectionPoint } from "./sectionPointModule"

export function SectionPointDict(){
  this.addInput("girderBaseInfo","obj");
  this.addInput("gridPoint","arr");
  this.addOutput("sectionPointDict","arr");
}

SectionPointDict.prototype.onExecute = function() {
  const girderBaseInfo = this.getInputData(0);
  const gridPoint = this.getInputData(1);
  let sectionPointDict = {};
  for (let i = 0; i < girderBaseInfo.length; i++) {
    let index = girderBaseInfo[i].girderIndex;
    for (let j = 0; j < gridPoint.stationDictList[index].length; j++) {
      for (let key in gridPoint.stationDictList[index][j]) {
        let pt = gridPoint.stationDictList[index][j][key];
        let pointSectionInfo = PointSectionInfo(
          gridPoint.nameToPointDict[pt].masterStationNumber,
          gridPoint.nameToPointDict[pt].skew,
          girderBaseInfo[i],
          gridPoint.nameToPointDict
        );
        sectionPointDict[pt] = sectionPoint(
          girderBaseInfo[i].section,
          pointSectionInfo,
          gridPoint.nameToPointDict[pt].gradientY
        );
      }
    }
  }
  this.setOutputData(0, sectionPointDict)
}
