// import makerjs from 'makerjs'
import { THREE, sceneAdder } from "global";

// import {PointLength, hBracingPlate} from './geometryFunc'
// import {ToGlobalPoint, ToGlobalPoint2} from './threejsDisplay'

// function ShapePlanView(partDict, nameToPointDict, partkeyNameList, index1, index2, sc, initPoint,r, color){
//     // console.log(partDict)
//     let result = {models:{},layer:color };
//     for (let pk in partDict){
//         let point = nameToPointDict[pk]
//         for (let partkey of partkeyNameList){
//             if (partDict[pk].hasOwnProperty(partkey)){
//                 if (partDict[pk][partkey].rotationX !== Math.PI/2){
//                     let globalPts = [];
//                     let pts = [];
//                     for (let i in partDict[pk][partkey].points){
//                         globalPts.push(ToGlobalPoint2(point,partDict[pk][partkey].points[i]))
//                     }
//                     for (let i in globalPts){
//                         let x = (globalPts[i].x - initPoint.x)*sc
//                         let y = (globalPts[i].y - initPoint.y)*sc
//                         pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//                     }
//                     result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
//                 }
//                 else {
//                     let globalPts = [];
//                     let pts = [];
//                     let points = [{x:partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].z},
//                                 {x:partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].z},
//                                 {x:partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].Thickness+partDict[pk][partkey].z},
//                                 {x:partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].Thickness+partDict[pk][partkey].z}]
//                     for (let i in points){
//                         globalPts.push(ToGlobalPoint2(point,points[i]))
//                     }
//                     for (let i in globalPts){
//                         let x = (globalPts[i].x - initPoint.x)*sc
//                         let y = (globalPts[i].y - initPoint.y)*sc
//                         pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//                     }
//                     result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
//                 }
//             }
//         }
//     }
//     return result
// }

// function GeneralSideView(steelBoxDict, keyNamelist, sectionPointNum, index1,index2,sc, initPoint,r,color){
//     let result = {models:{},layer:color };
//     let index = 1;
//     for (let part in steelBoxDict){
//         for (let name of keyNamelist){
//                 if (part.includes(name)){
//                     let ptsL1 = [];
//                     let ptsR1 = [];
//                     let ptsC1 = [];
//                     let ptsL2 = [];
//                     let ptsR2 = [];
//                     let ptsC2 = [];
//                     for (let j in steelBoxDict[part]["points"]){
//                         let pts1 = [];
//                         let pts2 = [];
//                         for (let i in steelBoxDict[part]["points"][j]){
//                             if ( i%sectionPointNum === index1){
//                                 let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber)*sc
//                                 let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z)*sc
//                                 pts1.push([x,y])
//                                 // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
//                             }else if( i%sectionPointNum===index2){
//                                 let x = (steelBoxDict[part]["points"][j][i].s - initPoint.masterStationNumber)*sc
//                                 let y = (steelBoxDict[part]["points"][j][i].z - initPoint.z)*sc
//                                 pts2.push([x,y])
//                                 // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
//                             }

//                         }
//                         if (j==0){
//                             ptsL1.push(...pts1)
//                             ptsL2.push(...pts2)
//                         }
//                         if (j==1){
//                             ptsR1.push(...pts1)
//                             ptsR2.push(...pts2)
//                         }
//                         if (j==2){
//                             ptsC1.push(...pts1)
//                             ptsC2.push(...pts2)
//                         }
//                     }
//                     if (ptsC1.length === 0){
//                         result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsL1,...ptsL2.reverse()]);
//                         index +=1
//                         result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsR1,...ptsR2.reverse()]);
//                         index +=1    
//                     }else if(ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0){
//                         if (ptsC1[0][0]===ptsL1[ptsL1.length-1][0] && ptsC1[0][1]===ptsL1[ptsL1.length-1][1]){
//                             result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,
//                                 [...ptsL1,...ptsC1,...ptsC2.reverse(),...ptsR1.reverse(),...ptsR2,...ptsL2.reverse()]);
//                             index +=1        
//                         }else{
//                             result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,
//                                 [...ptsL1.reverse(),...ptsC1.reverse(),...ptsC2,...ptsR1,...ptsR2.reverse(),...ptsL2]);
//                             index +=1        
//                         }
//                     }
//                     else if(ptsL1.length === 0 && ptsL1.length === 0){
//                         result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,
//                             [...ptsC1.reverse(),...ptsC2]);
//                         index +=1        

//                     }
//                 }

//         }
//     }
//     return result
// }

// function GeneralPlanView(steelBoxDict, keyNamelist, sectionPointNum, index1,index2,sc, initPoint,r,color){
//     let result = {models:{},layer:color };
//     let index = 1;
//     for (let part in steelBoxDict){
//         for (let name of keyNamelist){
//             if(part.includes(name)){
//                 let ptsL1 = [];
//                 let ptsR1 = [];
//                 let ptsC1 = [];
//                 let ptsL2 = [];
//                 let ptsR2 = [];
//                 let ptsC2 = [];
//                 for (let j in steelBoxDict[part]["points"]){
//                     let pts1 = [];
//                     let pts2 = [];
//                     for (let i in steelBoxDict[part]["points"][j]){
//                         if ( i%sectionPointNum === index1){
//                             let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x)*sc
//                             let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y)*sc
//                             pts1.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//                             // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
//                         }else if( i%sectionPointNum === index2){
//                             let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x)*sc
//                             let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y)*sc
//                             pts2.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//                             // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
//                         }

//                     }
//                     if (j==0){
//                         ptsL1.push(...pts1)
//                         ptsL2.push(...pts2)
//                     }
//                     if (j==1){
//                         ptsR1.push(...pts1)
//                         ptsR2.push(...pts2)
//                     }
//                     if (j==2){
//                         ptsC1.push(...pts1)
//                         ptsC2.push(...pts2)
//                     }
//                 }
//                 if (ptsC1.length === 0){
//                     result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsL1,...ptsL2.reverse()]);
//                     index +=1
//                     result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsR1,...ptsR2.reverse()]);
//                     index +=1    
//                 }else if(ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0){
//                     if (ptsC1[0][0]===ptsL1[ptsL1.length-1][0] && ptsC1[0][1]===ptsL1[ptsL1.length-1][1]){
//                         result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,
//                             [...ptsL1,...ptsC1,...ptsC2.reverse(),...ptsR1.reverse(),...ptsR2,...ptsL2.reverse()]);
//                         index +=1        
//                     }else{
//                         result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,
//                             [...ptsL1.reverse(),...ptsC1.reverse(),...ptsC2,...ptsR1,...ptsR2.reverse(),...ptsL2]);
//                         index +=1        
//                     }
//                 }
//                 else if(ptsL1.length === 0 && ptsL1.length === 0){
//                     result.models[name+index.toString()] = new makerjs.models.ConnectTheDots(true,
//                         [...ptsC1.reverse(),...ptsC2]);
//                     index +=1        

//                 }
//             }
//         }
//     }
//     return result
// }

// function GridMarkView(nameToPointDict, sc, initPoint, r, Yoffset){
//     let gridPoint = {models:{}};
//     for (let station in nameToPointDict){
//         if(station.substr(2,1)!=="K"){ //station.substr(0,2)==="G1" && 
//         let x = (nameToPointDict[station].x - initPoint.x)*sc
//         let y = (nameToPointDict[station].y - initPoint.y)*sc
//         let position = [Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x + Yoffset*sc]
//         let gridtitle = {
//                 models:{
//                     rect: makerjs.model.move(new makerjs.models.RoundRectangle(400*sc, 200*sc, 100*sc),[position[0]-200*sc,position[1]-100*sc])
//                 },
//                 paths:{

//                 },
//                 caption:{
//                     text:station,
//                     anchor: new makerjs.paths.Line([position[0]-1,position[1]],[position[0]+1,position[1]])
//                 },
//                 layer:'red'
//                 }
//         // gridtitle.models.origin = position
//         gridPoint.models[station]=gridtitle
//         }
//     }
//     return gridPoint 
// }

// r is rotation angle to radian
// export function topDraw(steelBoxDict,hBracingDict, hBraicingPlateDict,diaDict, vstiffDict, nameToPointDict,initPoint){

//     let sc = 0.100;
//     let wholeModel = {models:{}};
//     let r = Math.PI - Math.atan((nameToPointDict["G1K6"].y - nameToPointDict["G1K1"].y)/ (nameToPointDict["G1K6"].x - nameToPointDict["G1K1"].x))
//     wholeModel.models["TopPlate"] = GeneralPlanView(steelBoxDict, ["TopPlate"], 4, 0,1,sc, initPoint,r,"aqua")
//     wholeModel.models["WeB"] = GeneralPlanView(steelBoxDict, ["LeftWeB","RightWeB"], 4, 1,2,sc, initPoint,r,"lime")
//     wholeModel.models["diaphragm"] = ShapePlanView(diaDict, nameToPointDict, 
//                                     ["topPlate","upperTopShape","leftTopPlateShape"], 0, 1, sc, initPoint,r,"lime");
//     wholeModel.models["bracingPlate"] = ShapePlanView(hBraicingPlateDict, nameToPointDict, ["plate"], 0, 1, sc, initPoint,r,"lime");
//     wholeModel.models["vStiffener"] = ShapePlanView(vstiffDict, nameToPointDict, ["upperframe1","upperframe2"], 0, 3, sc, initPoint,r,"lime");
//     wholeModel.models["bottomPlate"] = GeneralPlanView(steelBoxDict, ["G1BottomPlate"], 4, 0,1,sc, initPoint,r,"aqua")
//     wholeModel.models["bracing"] = GeneralPlanView(hBracingDict, [""], 4, 0,1,sc, initPoint,r,"lime")
//     wholeModel.models["bottomPlate"].origin = [0,-1000]
//     wholeModel.models["leftWeB"] = GeneralSideView(steelBoxDict, ["G1LeftWeB"], 4, 0,1,sc, initPoint,r,"aqua")
//     wholeModel.models["leftWeB"].origin = [0,-1500]
//     wholeModel.models["gridMark"] = GridMarkView(nameToPointDict, sc, initPoint, r, 1400)

//     // for (let i in hBracingDict){
//     //     for (let j = 0; j<hBracingDict[i].frame1.length;j++){
//     //     let pts = []
//     //      let x = (hBracingDict[i].pointlist[j][0].x - initPoint.x)*sc
//     //      let y = (hBracingDict[i].pointlist[j][0].y - initPoint.y)*sc
//     //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//     //      x = (hBracingDict[i].pointlist[j][1].x - initPoint.x)*sc
//     //      y = (hBracingDict[i].pointlist[j][1].y - initPoint.y)*sc
//     //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//     //      x = (hBracingDict[i].pointlist[j][2].x - initPoint.x)*sc
//     //      y = (hBracingDict[i].pointlist[j][2].y - initPoint.y)*sc
//     //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//     //      x = (hBracingDict[i].pointlist[j][3].x - initPoint.x)*sc
//     //      y = (hBracingDict[i].pointlist[j][3].y - initPoint.y)*sc
//     //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
//     //      hbracing.models["hbracing"+ i +"_"+ j] = new makerjs.models.ConnectTheDots(true,pts);
//     //     }
//     // }

//     return wholeModel
// }

// function PlatePlanView(point1, point2, plist1, plist2, initPoint,sc){
//     let plist = [];
//     let result = [];
//     plist.push(ToGlobalPoint(point1, plist1))
//     plist.push(ToGlobalPoint(point2, plist2))
//     for (let i in plist){
//         result.push([(plist[i].x - initPoint.x)*sc,(plist[i].y - initPoint.y)*sc])
//     }
//     return result[0]
// }

function sectionMesh(point0, lineMaterial) {
    let points = []
    for (let i in point0) {
        points.push(new THREE.Vector3(point0[i].x, point0[i].y, 0))
    }
    let geometry = new THREE.Geometry().setFromPoints(points)
    return new THREE.LineLoop(geometry, lineMaterial)
}

export function sectionView(sectionName, sectionPoint, diaPoint) {
    // var makerjs = require('makerjs');
    let sc = 1;
    // let sections = {models:{ }};
    // let captions = { models: {} };
    // let weldings = { models: {} };
    let titlePosition = 500;
    let titleSize = 100;
    let labelSize = 50;
    // let group = []
    let group = new THREE.Group();
    let label = [];

    var textMesh;
    var color = 0x006699;
    var textMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: false,
        opacity: 1,
        side: THREE.DoubleSide
    });
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 })

    label.push({
        text: sectionName,
        anchor: [0, titlePosition, 0],
        fontSize : titleSize
    })
    
    
    let circle = new THREE.EllipseCurve(0,titlePosition,200,200)
    let cp = circle.getPoints(16);
    let circlegeo = new THREE.Geometry().setFromPoints(cp)
    let titleCircle = new THREE.Line(circlegeo,lineMaterial)
    group.add(titleCircle)

    for (var key in sectionPoint) {
        if (sectionPoint[key].constructor === Array) {
            group.add(sectionMesh(sectionPoint[key], lineMaterial))
        }
    }
    for (var key in diaPoint) {
        if (diaPoint[key].points) {
            group.add(sectionMesh(diaPoint[key].points, lineMaterial))
        }
        if (diaPoint[key].size) {
            label.push({
                text: diaPoint[key].size.Label,
                anchor: [(diaPoint[key].anchor[0][0] + diaPoint[key].anchor[1][0]) / 2, (diaPoint[key].anchor[0][1] + diaPoint[key].anchor[1][1]) / 2, 0],
                rotation : Math.atan((diaPoint[key].anchor[1][1] - diaPoint[key].anchor[0][1])/(diaPoint[key].anchor[1][0] - diaPoint[key].anchor[0][0])),
                fontSize : labelSize
            })
        }
        // if (diaPoint[key].welding) {
        //     for (let i in diaPoint[key].welding){
        //         weldings.models[key + i.tostring] = weldingMark(diaPoint[key].welding[i], 0.8,sc,200,true,true,false,false)
        //     }
        // }
    }

    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        // console.log(font)
        // var font = {generateShapes:(messagem , num)=>{}}
        for (let i in label){
            var shapes = font.generateShapes(label[i].text, label[i].fontSize);
            var geometry = new THREE.ShapeBufferGeometry(shapes);
            var xMid
            geometry.computeBoundingBox();
            xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid+label[i].anchor[0], -label[i].fontSize/2 + label[i].anchor[1], 0);
            if (label[i].rotation) {geometry.rotateZ(label[i].rotation)
            }
            // make shape ( N.B. edge view not visible )
            textMesh = new THREE.Mesh(geometry, textMaterial);
            textMesh.layers.set(1)
            group.add(textMesh);
        }
        // text.position.z = 0;
    });


    // let title = {models:{},
    //             paths:{
    //                 circle:new makerjs.paths.Circle([0,titlePosition],titlePosition*0.1)
    //             },
    //             caption:{
    //                 text:sectionName,
    //                 anchor: new makerjs.paths.Line([-titlePosition,titlePosition],[titlePosition,titlePosition])
    //             },
    //             layer:'red'
    //             }

    // sections.layer = "aqua"
    // // sections2.layer = "fuchsia"
    // let wholeModel = {models:{}}
    // wholeModel.models["sections"] = sections
    // wholeModel.models["captions"] = captions
    // wholeModel.models["weldings"] = weldings
    // wholeModel.models["titles"] = title
    // wholeModel.models["top1"] = Dimension([sectionPoint.leftTopPlate[3],sectionPoint.rightTopPlate[3]],0,sc,1,true,true,1)
    // wholeModel.models["top2"] = Dimension([sectionPoint.leftTopPlate[3],sectionPoint.leftTopPlate[2],sectionPoint.rightTopPlate[2],sectionPoint.rightTopPlate[3]],0,sc,1,true,true,0)
    // wholeModel.models["right1"] = Dimension([sectionPoint.rWeb[0],sectionPoint.rWeb[1]],1,sc,1,false,true,2)
    // wholeModel.models["right2"] = Dimension([sectionPoint.rWeb[0],diaPoint.lowerTopShape.points[3],diaPoint.lowerTopShape.points[2],diaPoint.rightTopPlateShape.points[3],diaPoint.rightTopPlateShape.points[0],sectionPoint.rWeb[1]],5,sc,1,false,true,1)
    // wholeModel.models["left1"] = Dimension([sectionPoint.lWeb[0],sectionPoint.lWeb[1]],1,sc,1,false,false,2)
    // wholeModel.models["left2"] = Dimension([sectionPoint.lWeb[0],diaPoint.lowerTopShape.points[0],diaPoint.lowerTopShape.points[1],diaPoint.leftTopPlateShape.points[3],diaPoint.leftTopPlateShape.points[0],sectionPoint.lWeb[1]],5,sc,1,false,false,1)
    // wholeModel.models["bottom1"] = Dimension([sectionPoint.bottomPlate[3],sectionPoint.lWeb[0],sectionPoint.rWeb[0],sectionPoint.bottomPlate[2]],0,sc,1,true,false,0)
    // wholeModel.models["bottom2"] = Dimension([sectionPoint.bottomPlate[3],sectionPoint.bottomPlate[2]],0,sc,1,true,false,1)

    // layer coloers : aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow
    // var svg = makerjs.exporter.toSVG(wholeModel);
    // document.write(svg);
    return group
}
// 치수선 생성 프로그램 선, caption으로 구성해야할 듯함
// 다수의 포인트(points)의 연속된 치수선을 생성하는 모듈

// function Dimension(points, index, scale, valueScale, isHorizontal, isTopOrRight, offsetIndex){
//     let sign = (isTopOrRight)? 1:-1
//     let dim = {models:{}, paths:{}}
//     let add = 200*scale*sign;
//     let fontSize = 50*scale
//     let extend = 20*scale*sign
//     let offset = offsetIndex*200*scale*sign + 20*scale*sign
//     dim.layer = "red"
//     if (isHorizontal){
//         for (var key in points){
//             dim.paths[key] = new makerjs.paths.Line([points[key].x*scale, points[index].y*scale + offset],[points[key].x*scale, points[index].y*scale+add+offset+extend])
//         }
//         for (let i = 0; i<points.length -1;i++){
//             dim.paths['d'+i] = new makerjs.paths.Line([points[i].x*scale, points[index].y*scale+add+offset],[points[i+1].x*scale, points[index].y*scale+add+offset])
//             let value = valueScale*(Math.abs(points[i+1].x - points[i].x))
//             dim.models['d'+i] = {};
//             makerjs.model.addCaption(dim.models['d'+i], value.toFixed(0) ,[points[i].x*scale, points[index].y*scale+add+offset+fontSize],[points[i+1].x*scale, points[index].y*scale+add+offset+fontSize])
//             dim.models['d'+i].layer = "lime"
//         }
//     }else{
//         for (var key in points){
//             dim.paths[key] = new makerjs.paths.Line([points[index].x*scale + offset, points[key].y*scale],[points[index].x*scale+add+offset+extend, points[key].y*scale])
//         }
//         for (let i = 0; i<points.length -1;i++){
//             dim.paths['d'+i] = new makerjs.paths.Line([points[index].x*scale+add+offset, points[i].y*scale],[points[index].x*scale+add+offset, points[i+1].y*scale])
//             let value = valueScale*(Math.abs(points[i+1].y - points[i].y))
//             dim.models['d'+i] = {};
//             makerjs.model.addCaption(dim.models['d'+i], value.toFixed(0) ,[points[index].x*scale+add+offset -fontSize, points[i].y*scale],[points[index].x*scale+add+offset-fontSize, points[i+1].y*scale])
//             dim.models['d'+i].layer = "lime"
//         }
//     }
//     return dim
// }

// // locate is 0 to 1 relative point of welding line
// function weldingMark(weldingObject, locate, scale, distance, isUpper, isRight, isXReverse,isYReverse){
//     let welding = {models:{}, paths:{},caption:{},layer:'red'}
//     const sc = scale
//     let linelength = []
//     let dummy
//     let totallength = 0
//     let point={}

//     for (let i = 0;i<weldingObject.Line.length - 1;i++){
//         dummy = PointLength(weldingObject.Line[i],weldingObject.Line[i+1])
//         totallength += dummy
//         linelength.push(totallength)
//     }
//     for (let i =0; i<linelength.length;i++){
//         if (linelength[i]/totallength >= locate){
//             point['x'] = ((1 - locate) * weldingObject.Line[i].x + locate * weldingObject.Line[i+1].x)
//             point['y'] = ((1 - locate) * weldingObject.Line[i].y + locate * weldingObject.Line[i+1].y)
//             break;
//         }
//     }
//     let xsign = isRight? 1:-1;
//     let ysign = isUpper? 1:-1;
//     let xsign2 = isXReverse? - 1: 1;
//     let ysign2 = isYReverse? -1 : 1;
//     let point0 = [point.x*sc,point.y*sc]
//     let point1 = [point0[0]+(xsign*xsign2*distance *0.25)*sc,point0[1]+(ysign*ysign2*distance*0.25)*sc]
//     let point2 = [point1[0]+ (xsign*distance*0.75)*sc,point1[1]+(ysign*distance*0.75)*sc]
//     let point3 = [point2[0]+ (250)*sc,point2[1]]
//     welding.paths = {
//             l1:new makerjs.paths.Line(point0,point1),
//             l2:new makerjs.paths.Line(point1,point2),
//             l3:new makerjs.paths.Line(point2,point3),
//             arrow1:new makerjs.paths.Line([(point.x + xsign*xsign2*30) * sc,(point.y + ysign*ysign2*50) * sc],point0),
//             arrow2:new makerjs.paths.Line([(point.x + xsign*xsign2*50) * sc,(point.y + ysign*ysign2*30) * sc],point0),
//     }
//     if (weldingObject.type==="FF"){
//         welding.paths['FF1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1] + (50)*sc],[point2[0] + (100)*sc,point2[1] - (50)*sc])
//         welding.paths['FF2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1] + (50)*sc],[point2[0] + (150)*sc,point2[1]])
//         welding.paths['FF3'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1] - (50)*sc],[point2[0] + (150)*sc,point2[1]])
//     }
//     else if (weldingObject.type==="F"){
//         welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
//         welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1] - (50)*sc],[point2[0] + (150)*sc,point2[1]])
//     }
//     else if (weldingObject.type==="K"){
//         welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
//         welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
//     }
//     else if (weldingObject.type==="V"){
//         welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
//         welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
//     }

//     welding.caption = {
//         text:weldingObject.value1.toFixed(0),
//         anchor: new makerjs.paths.Line([point2[0],point2[1] - 50*sc],[point2[0] + 100*sc,point2[1] - 50*sc])
//     }
//     return welding
// }