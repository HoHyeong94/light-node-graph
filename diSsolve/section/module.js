import {PlateRestPoint, WebPoint} from "../geometryModule"


export function SectionPointDict(pointDict, girderBaseInfo, slabInfo, slabLayout) {
  let result = {};
  for (let k in pointDict) {
    if (k.substr(0, 1) === "G") {
      let point = pointDict[k]
      let girderIndex = k.substr(1, 1) - 1

      let station = point.masterStationNumber;
      let gradient = point.gradientY;
      let skew = point.skew;
      let pointSectionInfo = PointSectionInfo(station, skew, girderBaseInfo[girderIndex], slabLayout, pointDict)
      let sectionInfo = girderBaseInfo[girderIndex].section

      const height = pointSectionInfo.forward.height;
      const centerThickness = slabInfo.slabThickness //  slab변수 추가
      const lwb = { x: - sectionInfo.B / 2, y: -sectionInfo.H }
      const lwt = { x: - sectionInfo.UL, y: 0 }
      const rwb = { x: sectionInfo.B / 2, y: -sectionInfo.H }
      const rwt = { x: sectionInfo.UR, y: 0 }
      let forward = {};
      let backward = {};
      let ps = {};
      // let skew = pointSectionInfo.forward.skew; // gridPoint의 skew가 있어 사용여부 확인후 삭제요망
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          ps = pointSectionInfo.forward
        } else {
          ps = pointSectionInfo.backward
        }
        let slabThickness = ps.slabThickness - centerThickness

        let Rib = {}
        for (let j in ps.lRibLO) {
          let lRib = [{ x: ps.lRibLO[j] - ps.lRibThk / 2, y: -height }, { x: ps.lRibLO[j] - ps.lRibThk / 2, y: -height + ps.lRibH },
          { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -height + ps.lRibH }, { x: ps.lRibLO[j] + ps.lRibThk / 2, y: -height }]
          let keyname = "lRib" + j
          Rib[keyname] = lRib
        }


        // leftWeb
        let lw1 = WebPoint(lwb, lwt, 0, -height) //{x:blwX,y:-height}
        let lw2 = WebPoint(lwb, lwt, gradient, -slabThickness) //{x:tlwX,y:gradient*tlwX - slabThickness}
        let lWeb = PlateRestPoint(lw1, lw2, 0, gradient, -ps.webThk);
        // rightWeb
        let rw1 = WebPoint(rwb, rwt, 0, -height) //{x:brwX,y:-height}
        let rw2 = WebPoint(rwb, rwt, gradient, -slabThickness) //{x:trwX,y:gradient*trwX - slabThickness}
        let rWeb = PlateRestPoint(rw1, rw2, 0, gradient, ps.webThk);
        // bottomplate
        let b1 = { x: lw1.x - sectionInfo.C1, y: -height }
        let b2 = { x: rw1.x + sectionInfo.D1, y: -height }
        let bottomPlate = PlateRestPoint(b1, b2, null, null, -ps.lFlangeThk)
        // TopPlate
        let tl1 = { x: lw2.x - sectionInfo.C, y: lw2.y + gradient * (- sectionInfo.C) };
        let tl2 = { x: lw2.x - sectionInfo.C + ps.uFlangeW, y: lw2.y + gradient * (- sectionInfo.C + ps.uFlangeW) };
        let topPlate1 = PlateRestPoint(tl1, tl2, -1 / gradient, -1 / gradient, ps.uFlangeThk);
        let tr1 = { x: rw2.x + sectionInfo.D, y: rw2.y + gradient * (sectionInfo.D) };
        let tr2 = { x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient * (sectionInfo.D - ps.uFlangeW) };
        let topPlate2 = PlateRestPoint(tr1, tr2, -1 / gradient, -1 / gradient, ps.uFlangeThk);;
        if (i === 0) {
          forward = { skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib }
        } else {
          backward = { skew, bottomPlate: bottomPlate, leftTopPlate: topPlate1, rightTopPlate: topPlate2, lWeb: lWeb, rWeb: rWeb, ...Rib }
        }
      }
      result[k] = { forward, backward }
    }
  }
  return result
}


export function PointSectionInfo(station, skew, girderBaseInfo, slabLayout, pointDict) {
    let forward = {
        height: 0,
        slabThickness: 0,
        skew: skew,
        uFlangeW: 0,
        uFlangeThk: 0,
        lFlangeThk: 0,
        webThk: 0,
        uRibH: 0,
        uRibThk: 0,
        uRibLO: [],
        lRibH: 0,
        lRibThk: 0,
        lRibLO: [],
    };
    let backward = {
        height: 0,
        slabThickness: 0,
        skew: skew,
        uFlangeW: 0,
        uFlangeThk: 0,
        lFlangeThk: 0,
        webThk: 0,
        uRibH: 0,
        uRibThk: 0,
        uRibLO: [],
        lRibH: 0,
        lRibThk: 0,
        lRibLO: [],
    };

    let R = 0;
    let x1 = 0;
    let deltaH = 0;
    let L = 0;
    let height = 0;
    for (let i = 0; i< girderBaseInfo.height.length;i++){
        let sp = pointDict[girderBaseInfo.height[i][0]];
        let ep = pointDict[girderBaseInfo.height[i][1]];
        if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
            deltaH = girderBaseInfo.height[i][2] - girderBaseInfo.height[i][3]
            L = ep.masterStationNumber - sp.masterStationNumber;
            if (girderBaseInfo.height[i][4] == "circle"){
                if (deltaH>0){
                    R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i][3] + (R -Math.sqrt(R**2 - x1**2));
                }else if (deltaH<0){
                    R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i][2] + (R -Math.sqrt(R**2 - x1**2))
                }else{
                    height = girderBaseInfo.height[i][2]
                }
            }else if (girderBaseInfo.height[i][4] == "parabola"){
                if (deltaH>0){
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i][3] + deltaH / L**2 * x1**2;
                }else if (deltaH<0){
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i][2] - deltaH / L**2 * x1**2;
                }else{
                    height = girderBaseInfo.height[i][2]
                }
            }else{  //straight
                x1 = station - sp.masterStationNumber;
                height = girderBaseInfo.height[i][2] - x1/L * deltaH
            }
            break;
        }
    }
    forward.height = height;
    backward.height = height;

    // position:0, T:1, H:2
    let slabThickness = 0;
    for (let i = 0; i < slabLayout.length - 1; i++) {
        let ss = pointDict[slabLayout[i][0]].masterStationNumber;
        let es = pointDict[slabLayout[i + 1][0]].masterStationNumber
        if (station >= ss && station <= es) {
            let x = station - ss
            let l = es - ss
            slabThickness = slabLayout[i][2] * (l - x) / l + slabLayout[i + 1][2] * (x) / l
        }
    }
   
    forward.slabThickness = slabThickness;
    backward.slabThickness = slabThickness;

    var uFlange = girderBaseInfo.uFlange.filter(function(element){ 
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
    })
    if(uFlange.length>0){
        forward.uFlangeThk = uFlange[0][2]
        forward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3])* (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber)
    }
    uFlange = girderBaseInfo.uFlange.filter(function(element){ 
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
        })
    if(uFlange.length>0){
        backward.uFlangeThk = uFlange[0][2]
        backward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3])* (station - pointDict[uFlange[0][0]].masterStationNumber) / (pointDict[uFlange[0][1]].masterStationNumber - pointDict[uFlange[0][0]].masterStationNumber)
    }

    var lFlange = girderBaseInfo.lFlange.filter(function(element){ 
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
        })
    if(lFlange.length>0){
        forward.lFlangeThk = lFlange[0][2]
    }
    lFlange = girderBaseInfo.lFlange.filter(function(element){ 
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
        })
    if(lFlange.length>0){
        backward.lFlangeThk = lFlange[0][2]
    }

    var web = girderBaseInfo.web.filter(function(element){ 
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
        })
    if(web.length>0){
        forward.webThk = web[0][2]
    }
    web = girderBaseInfo.web.filter(function(element){ 
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
        })
    if(web.length>0){
        backward.webThk = web[0][2]
    }

    var uRib = girderBaseInfo.uRib.filter(function(element){ 
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
        })
    if(uRib.length>0){
        forward.uRibThk = uRib[0][2]
        forward.uRibH = uRib[0][3]
        forward.uRibLO = uRib[0][4]
    }
    uRib = girderBaseInfo.uRib.filter(function(element){ 
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
        })
    if(uRib.length>0){
        backward.uRibThk = uRib[0][2]
        backward.uRibH = uRib[0][3]
        backward.uRibLO = uRib[0][4]
    }

    var lRib = girderBaseInfo.lRib.filter(function(element){ 
        return (station >= pointDict[element[0]].masterStationNumber && station < pointDict[element[1]].masterStationNumber)
        })
    if(lRib.length>0){
        forward.lRibThk = lRib[0][2]
        forward.lRibH = lRib[0][3]
        forward.lRibLO = lRib[0][4]
    }
    lRib = girderBaseInfo.lRib.filter(function(element){ 
        return (station > pointDict[element[0]].masterStationNumber && station <= pointDict[element[1]].masterStationNumber)
        })
    if(lRib.length>0){
        backward.lRibThk = lRib[0][2]
        backward.lRibH = lRib[0][3]
        backward.lRibLO = lRib[0][4]
    }

    return { forward, backward }
}

