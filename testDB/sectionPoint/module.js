import {PlateRestPoint, WebPoint} from "./geometry"

export function PointSectionInfo(station,skew, girderBaseInfo,nameToPointDict){
    let forward = {
        height : 0,
        slabThickness :0,
        skew:skew,
        uFlangeW : 0,
        uFlangeThk : 0, 
        lFlangeThk : 0, 
        webThk : 0, 
        uRibH : 0,
        uRibThk : 0, 
        uRibLO : [],
        lRibH : 0,
        lRibThk : 0,
        lRibLO : [],
    };
    let backward = {
        height : 0,
        slabThickness :0,
        skew:skew,
        uFlangeW : 0,
        uFlangeThk : 0, 
        lFlangeThk : 0, 
        webThk : 0, 
        uRibH : 0,
        uRibThk : 0, 
        uRibLO : [],
        lRibH : 0,
        lRibThk : 0,
        lRibLO : [],
    };
    
    let R = 0;
    let x1 = 0;
    let deltaH = 0;
    let L = 0;
    let height = 0;
    for (let i = 0; i< girderBaseInfo.height.length;i++){
        let sp = nameToPointDict[girderBaseInfo.height[i].start];
        let ep = nameToPointDict[girderBaseInfo.height[i].end];
        if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
            deltaH = girderBaseInfo.height[i].startH - girderBaseInfo.height[i].endH
            L = ep.masterStationNumber - sp.masterStationNumber;
            if (girderBaseInfo.height[i].type == "circle"){
                if (deltaH>0){
                    R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i].endH + (R -Math.sqrt(R**2 - x1**2));
                }else if (deltaH<0){
                    R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i].startH + (R -Math.sqrt(R**2 - x1**2))
                }else{
                    height = girderBaseInfo.height[i].startH
                }
            }else if (girderBaseInfo.height[i].type == "parabola"){
                if (deltaH>0){
                    x1 = ep.masterStationNumber - station;
                    height = girderBaseInfo.height[i].endH + deltaH / L**2 * x1**2;
                }else if (deltaH<0){
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i].startH - deltaH / L**2 * x1**2;
                }else{
                    height = girderBaseInfo.height[i].startH
                }
            }else{  //straight
                x1 = station - sp.masterStationNumber;
                height = girderBaseInfo.height[i].startH - x1/L * deltaH
            }
            break;
        }
    }
    forward.height = height;
    backward.height = height;


    let slabThickness = 0;
    for (let i = 0; i< girderBaseInfo.slabThickness.length;i++){
        let sp = nameToPointDict[girderBaseInfo.slabThickness[i].start];
        let ep = nameToPointDict[girderBaseInfo.slabThickness[i].end];
        if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
            deltaH = girderBaseInfo.slabThickness[i].startH - girderBaseInfo.slabThickness[i].endH
            L = ep.masterStationNumber - sp.masterStationNumber;
            //straight
            x1 = station - sp.masterStationNumber;
            slabThickness = girderBaseInfo.slabThickness[i].startH - x1/L * deltaH
            break;
        }else{
            slabThickness = 270; // slab thickness추후 예외상황없도록 수정
        }
    }
    forward.slabThickness = slabThickness;
    backward.slabThickness = slabThickness;

    var uFlange = girderBaseInfo.uFlange.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(uFlange.length>0){
        forward.uFlangeThk = uFlange[0].thickness
        forward.uFlangeW = uFlange[0].startW + (uFlange[0].endW - uFlange[0].startW)* (station - nameToPointDict[uFlange[0].start].masterStationNumber) / (nameToPointDict[uFlange[0].end].masterStationNumber - nameToPointDict[uFlange[0].start].masterStationNumber)
    }
    uFlange = girderBaseInfo.uFlange.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(uFlange.length>0){
        backward.uFlangeThk = uFlange[0].thickness
        backward.uFlangeW = uFlange[0].startW + (uFlange[0].endW - uFlange[0].startW)* (station - nameToPointDict[uFlange[0].start].masterStationNumber) / (nameToPointDict[uFlange[0].end].masterStationNumber - nameToPointDict[uFlange[0].start].masterStationNumber)
    }

    var lFlange = girderBaseInfo.lFlange.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(lFlange.length>0){
        forward.lFlangeThk = lFlange[0].thickness
    }
    lFlange = girderBaseInfo.lFlange.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(lFlange.length>0){
        backward.lFlangeThk = lFlange[0].thickness
    }

    var web = girderBaseInfo.web.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(web.length>0){
        forward.webThk = web[0].thickness
    }
    web = girderBaseInfo.web.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(web.length>0){
        backward.webThk = web[0].thickness
    }

    var uRib = girderBaseInfo.uRib.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(uRib.length>0){
        forward.uRibThk = uRib[0].thickness
        forward.uRibH = uRib[0].height
        forward.uRibLO = uRib[0].layout
    }
    uRib = girderBaseInfo.uRib.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(uRib.length>0){
        backward.uRibThk = uRib[0].thickness
        backward.uRibH = uRib[0].height
        backward.uRibLO = uRib[0].layout
    }

    var lRib = girderBaseInfo.lRib.filter(function(element){ 
        return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
        })
    if(lRib.length>0){
        forward.lRibThk = lRib[0].thickness
        forward.lRibH = lRib[0].height
        forward.lRibLO = lRib[0].layout
    }
    lRib = girderBaseInfo.lRib.filter(function(element){ 
        return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
        })
    if(lRib.length>0){
        backward.lRibThk = lRib[0].thickness
        backward.lRibH = lRib[0].height
        backward.lRibLO = lRib[0].layout
    }

    return {forward, backward}
}

export function sectionPoint(sectionInfo, pointSectionInfo, gradient){
    const height = pointSectionInfo.forward.height;
    const centerThickness = 270 //  slab변수 추가
    const lwb = {x: - sectionInfo.B/2, y:-sectionInfo.H}
    const lwt = {x: - sectionInfo.UL, y:0}
    const rwb = {x: sectionInfo.B/2, y:-sectionInfo.H}
    const rwt = {x: sectionInfo.UR, y:0}
    let forward = {};
    let backward = {};
    let ps = {};
    let skew = pointSectionInfo.forward.skew; // gridPoint의 skew가 있어 사용여부 확인후 삭제요망
    for (let i = 0; i < 2;i++){
        if (i === 0) {
            ps = pointSectionInfo.forward
        } else {
            ps = pointSectionInfo.backward
        }
        let slabThickness = ps.slabThickness - centerThickness
        
        let Rib = {}
        for (let j in ps.lRibLO){
        let lRib = [{x:ps.lRibLO[j] - ps.lRibThk/2,y:-height},{x:ps.lRibLO[j]- ps.lRibThk/2,y:-height+ps.lRibH},
                    {x:ps.lRibLO[j] + ps.lRibThk/2,y:-height+ps.lRibH},{x:ps.lRibLO[j] + ps.lRibThk/2,y:-height}]
        let keyname = "lRib" + j
        Rib[keyname] = lRib                    
         }

         
        // leftWeb
        let lw1 = WebPoint(lwb,lwt,0,-height) //{x:blwX,y:-height}
        let lw2 = WebPoint(lwb,lwt,gradient,-slabThickness) //{x:tlwX,y:gradient*tlwX - slabThickness}
        let lWeb = PlateRestPoint(lw1,lw2,0,gradient,-ps.webThk);
        // rightWeb
        let rw1 = WebPoint(rwb,rwt,0,-height) //{x:brwX,y:-height}
        let rw2 = WebPoint(rwb,rwt,gradient,-slabThickness) //{x:trwX,y:gradient*trwX - slabThickness}
        let rWeb = PlateRestPoint(rw1,rw2,0,gradient,ps.webThk);
        // bottomplate
        let b1 = {x:lw1.x - sectionInfo.C1,y:-height}
        let b2 = {x:rw1.x + sectionInfo.D1,y:-height}
        let bottomPlate = PlateRestPoint(b1,b2,null,null,-ps.lFlangeThk)
        // TopPlate
        let tl1 = {x: lw2.x - sectionInfo.C, y: lw2.y + gradient*(- sectionInfo.C)};
        let tl2 = {x: lw2.x - sectionInfo.C + ps.uFlangeW, y: lw2.y + gradient*(- sectionInfo.C + ps.uFlangeW)};
        let topPlate1 = PlateRestPoint(tl1,tl2,-1/gradient,-1/gradient,ps.uFlangeThk);
        let tr1 = {x: rw2.x + sectionInfo.D, y: rw2.y + gradient*(sectionInfo.D)};
        let tr2 = {x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient*(sectionInfo.D - ps.uFlangeW)};
        let topPlate2 = PlateRestPoint(tr1,tr2,-1/gradient,-1/gradient,ps.uFlangeThk);;
        if (i===0){
            forward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb, ...Rib}    
        }else {
            backward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb, ...Rib}    
        }
    }
    return {forward, backward}
  }
