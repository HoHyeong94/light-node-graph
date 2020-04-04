
import { ZMove } from "../geometryModule"
import { OffsetPoint } from "../line/module"

export function BarrierSectionPoint(
    masterLine,
    centerLineStations,
    slabInfo,
    slabLayout,
    pointDict
  ){
    // slabLayout object to list 
    const position = 0;
    const T = 1;
    const H = 2;
    // const leftOffset = 3;
    // const rightOffset =4;

    let leftBarrier = [];
    let rightBarrier = [];
    let slabThickness = slabInfo.slabThickness;
    let haunch = slabInfo.haunchHeight;
    let endT = 0;
    let leftOffset = 0;
    let rightOffset = 0;
    for (let i = 1; i < centerLineStations.length - 1; i++) {
      
      let masterPoint = centerLineStations[i].point
      let masterStation = masterPoint.masterStationNumber;
      //deckSectionInfo로 분리예정
      for (let j = 0; j < slabLayout.length - 1; j++) {
        let ss = pointDict[slabLayout[j][position]].masterStationNumber;
        let es = pointDict[slabLayout[j + 1][position]].masterStationNumber
        if (masterStation >= ss && masterStation <= es) {
          let x = masterStation - ss
          let l = es - ss
          leftOffset = slabLayout[j][3] * (l - x) / l + slabLayout[j + 1][3] * (x) / l
          rightOffset = slabLayout[j][4] * (l - x) / l + slabLayout[j + 1][4] * (x) / l
          // slabThickness = slabLayout[j].H * (l - x) / l + slabLayout[j + 1].H * (x) / l
          endT = slabLayout[j][T] * (l - x) / l + slabLayout[j + 1][T] * (x) / l
        }
      }
      //deckSectionInfo로 분리예정
      for (let k = 0; k<2;k++){
        let offset = k===0? leftOffset:rightOffset;
        let sign = k ===0? 1:-1;
        let l1 = OffsetPoint(masterPoint, masterLine, offset + sign*10)
        let l2 = OffsetPoint(masterPoint, masterLine, offset + sign*250)
        let l3 = OffsetPoint(masterPoint, masterLine, offset + sign*320)
        let l4 = OffsetPoint(masterPoint, masterLine, offset + sign*450)
        let points = [ZMove(l4,slabThickness + haunch),
                            ZMove(l4,slabThickness + haunch + 200),
                            ZMove(l3,slabThickness + haunch + 380),
                            ZMove(l2,slabThickness + haunch + 1350),
                            ZMove(l1,slabThickness + haunch + 1350),
                            ZMove(l1,slabThickness + haunch),]
        if (k===0){
          leftBarrier.push({name:masterStation, points:points})
        }else{
          rightBarrier.push({name:masterStation, points:points})
        }
      }
    }
    // leftBarrier.sort(function (a, b) { return a.name < b.name ? -1 : 1; })
    // rightBarrier.sort(function (a, b) { return a.name < b.name ? -1 : 1; })
    return {leftBarrier, rightBarrier }
  }