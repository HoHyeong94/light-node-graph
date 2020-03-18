import {ToGlobalPoint} from "../geometryModule"

export function SteelBoxDict2(girderStationList, sectionPointDict) {
  let steelBoxDict = {};
  let pk1 = ""
  let pk2 = ""
  let UFi = 1;
  let Bi = 1;
  let LWi = 1;
  let RWi = 1;
  let Ribi = 1;
  let keyname = ""

    for (let i in girderStationList){
      for (let j = 0; j<girderStationList[i].length -1;j++){
        
        let point1 = girderStationList[i][j].point;
        let point2 = girderStationList[i][j+1].point;

        pk1 = girderStationList[i][j].key
        pk2 = girderStationList[i][j+1].key

        keyname = "G" + (i * 1 + 1).toString() + "TopPlate" + UFi
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        let L1 = sectionPointDict[pk1].forward.leftTopPlate
        let R1 = sectionPointDict[pk1].forward.rightTopPlate
        let L2 = sectionPointDict[pk2].backward.leftTopPlate
        let L3 = sectionPointDict[pk2].forward.leftTopPlate
        let R2 = sectionPointDict[pk2].backward.rightTopPlate
        let R3 = sectionPointDict[pk2].forward.rightTopPlate

        if (L1[1].x >= R1[1].x) { //폐합인 경우 
          let C1 = [L1[0], R1[0], R1[3], L1[3]];
          C1.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point1, element)))
        } else {
          L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
          R1.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point1, element)))
        }
        let FisB = true;
        for (let i in L2) { if (L2[i] !== L3[i] || R2[i] !== R3[i]) { FisB = false } }
        if (!FisB || pk2.substr(2, 1) === "K" || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
          if (L2[1].x >= R2[1].x) { //폐합인 경우 
            let C2 = [L2[0], R2[0], R2[3], L2[3]];
            C2.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point2, element)))
          } else {
            L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
            R2.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point2, element)))
          }
        }
        if (pk2.substr(2, 1) === "K" || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP") { UFi += 1 }


        keyname = "G" + (i * 1 + 1).toString() + "BottomPlate" + Bi
        if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
        L1 = sectionPointDict[pk1].forward.bottomPlate
        L2 = sectionPointDict[pk2].backward.bottomPlate
        L3 = sectionPointDict[pk2].forward.bottomPlate

        L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))

        FisB = true;
        for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false } }
        if (!FisB || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6" ) {
          L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
        }
        if (pk2.substr(2, 2) === "BF" || pk2.substr(2, 2) === "SP") { Bi += 1 }

        keyname = "G"+(i*1+1).toString()+"LeftWeB" + LWi
        if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
        L1 = sectionPointDict[pk1].forward.lWeb
        L2 = sectionPointDict[pk2].backward.lWeb
        L3 = sectionPointDict[pk2].forward.lWeb
        L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
        FisB = true;
        for (let i in L2){ if(L2[i] !== L3[i] ){FisB = false}}
        if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP" || pk2.substr(2, 2) === "K6"){
            L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
        }
        if(pk2.substr(2,2)==="LW" || pk2.substr(2,2)==="SP" ){ LWi +=1 }

        keyname = "G"+(i*1+1).toString()+"RightWeB" + RWi
        if (!steelBoxDict[keyname]){steelBoxDict[keyname] = {points:[[],[],[]]};}
        L1 = sectionPointDict[pk1].forward.rWeb
        L2 = sectionPointDict[pk2].backward.rWeb
        L3 = sectionPointDict[pk2].forward.rWeb
        L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
        FisB = true;
        for (let i in L2){ if(L2[i] !== L3[i] ){FisB = false}}
        if (!FisB || pk2.substr(2,2)==="TF" || pk2.substr(2,2)==="SP" || pk2.substr(2, 2) === "K6"){
            L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
        }
        if(pk2.substr(2,2)==="RW" || pk2.substr(2,2)==="SP"){ RWi +=1 }

        let RibList = []
        for (let ii in sectionPointDict[pk1].forward) {
          if (ii.includes("Rib"))
            RibList.push(ii)
        }
        for (let Ribkey of RibList) {
          keyname = "G" + (i * 1 + 1).toString() + "lRib" + Ribi
          if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
          L1 = sectionPointDict[pk1].forward[Ribkey]
          L2 = sectionPointDict[pk2].backward[Ribkey]
          L3 = sectionPointDict[pk2].forward[Ribkey]
          L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
          FisB = true;
          for (let i in L2) { FisB = L3 ? (L2[i] !== L3[i] ? false : true) : false }
          if (!FisB || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
            L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
            Ribi += 1
          }
          // if(pk2.substr(2,2)==="RW" || pk2.substr(2,2)==="SP"){  }
        }

      }
    }
  // }

  return steelBoxDict
}