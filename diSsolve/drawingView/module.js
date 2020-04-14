// import makerjs from 'makerjs'
import { THREE, sceneAdder } from "global";
import { PointLength } from "../geometryModule"

// import {PointLength, hBracingPlate} from './geometryFunc'
import {ToGlobalPoint, ToGlobalPoint2} from '../geometryModule'

function ShapePlanView(partDict, pointDict, partkeyNameList, index1, index2, sc, initPoint,r, lineMaterial){
    // console.log(partDict)
    // let result = {models:{},layer:color };
    let meshes = [];

    for (let pk in partDict){
        let point = pointDict[pk]
        for (let partkey of partkeyNameList){
            if (partDict[pk].hasOwnProperty(partkey)){
                if (partDict[pk][partkey].rotationX !== Math.PI/2){
                    let globalPts = [];
                    let pts = [];
                    for (let i in partDict[pk][partkey].points){
                        globalPts.push(ToGlobalPoint2(point,partDict[pk][partkey].points[i]))
                    }
                    for (let i in globalPts){
                        let x = (globalPts[i].x - initPoint.x)*sc
                        let y = (globalPts[i].y - initPoint.y)*sc
                        pts.push({x: Math.cos(r)*x - Math.sin(r)*y,y:Math.cos(r)*y + Math.sin(r)*x})
                    }
                    meshes.push(pts, lineMaterial)
                    // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                }
                else {
                    let globalPts = [];
                    let pts = [];
                    let points = [{x:partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].z},
                                {x:partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].z},
                                {x:partDict[pk][partkey].points[index2].x, y: partDict[pk][partkey].Thickness+partDict[pk][partkey].z},
                                {x:partDict[pk][partkey].points[index1].x, y: partDict[pk][partkey].Thickness+partDict[pk][partkey].z}]
                    for (let i in points){
                        globalPts.push(ToGlobalPoint2(point,points[i]))
                    }
                    for (let i in globalPts){
                        let x = (globalPts[i].x - initPoint.x)*sc
                        let y = (globalPts[i].y - initPoint.y)*sc
                        pts.push({x:Math.cos(r)*x - Math.sin(r)*y,y:Math.cos(r)*y + Math.sin(r)*x})
                    }
                    meshes.push(pts, lineMaterial)
                    // result.models[pk + partkey] = new makerjs.models.ConnectTheDots(true,pts);
                }
            }
        }
    }
    return meshes
}

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

function GeneralPlanView(steelBoxDict, keyNamelist, sectionPointNum, index1,index2,sc, initPoint,r,lineMaterial){
    // let result = {models:{},layer:color };
    // let index = 1;
    let meshes = [];
    for (let part in steelBoxDict){
        for (let name of keyNamelist){
            if(part.includes(name)){
                let ptsL1 = [];
                let ptsR1 = [];
                let ptsC1 = [];
                let ptsL2 = [];
                let ptsR2 = [];
                let ptsC2 = [];
                for (let j in steelBoxDict[part]["points"]){
                    let pts1 = [];
                    let pts2 = [];
                    for (let i in steelBoxDict[part]["points"][j]){
                        if ( i%sectionPointNum === index1){
                            let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x)*sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y)*sc
                            pts1.push({x:Math.cos(r)*x - Math.sin(r)*y,y:Math.cos(r)*y + Math.sin(r)*x})
                            // if (i==0){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        }else if( i%sectionPointNum === index2){
                            let x = (steelBoxDict[part]["points"][j][i].x - initPoint.x)*sc
                            let y = (steelBoxDict[part]["points"][j][i].y - initPoint.y)*sc
                            pts2.push({x:Math.cos(r)*x - Math.sin(r)*y,y:Math.cos(r)*y + Math.sin(r)*x})
                            // if (i==1){pts3.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])}
                        }

                    }
                    if (j==0){
                        ptsL1.push(...pts1)
                        ptsL2.push(...pts2)
                    }
                    if (j==1){
                        ptsR1.push(...pts1)
                        ptsR2.push(...pts2)
                    }
                    if (j==2){
                        ptsC1.push(...pts1)
                        ptsC2.push(...pts2)
                    }
                }
                if (ptsC1.length === 0){
                    meshes.push(sectionMesh([...ptsL1,...ptsL2.reverse()], lineMaterial))
                    meshes.push(sectionMesh([...ptsR1,...ptsR2.reverse()], lineMaterial))
                    // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsL1,...ptsL2.reverse()]);
                    // index +=1
                    // result.models[name + index.toString()] = new makerjs.models.ConnectTheDots(true,[...ptsR1,...ptsR2.reverse()]);
                    // index +=1    
                }

                else if(ptsC1.length > 0 && ptsL1.length > 0 && ptsR1.length > 0){
                    if (ptsC1[0].x===ptsL1[ptsL1.length-1].x && ptsC1[0].y===ptsL1[ptsL1.length-1].y){
                        meshes.push(sectionMesh(
                            [...ptsL1,...ptsC1,...ptsC2.reverse(),...ptsR1.reverse(),...ptsR2,...ptsL2.reverse()],lineMaterial));
                    }else{
                        meshes.push(sectionMesh(
                            [...ptsL1.reverse(),...ptsC1.reverse(),...ptsC2,...ptsR1,...ptsR2.reverse(),...ptsL2],lineMaterial));
                    }
                }
                else if(ptsL1.length === 0 && ptsL1.length === 0){
                    meshes.push(sectionMesh(
                        [...ptsC1.reverse(),...ptsC2],lineMaterial));
                }
            
            }
        }
    }
    return meshes
}

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
export function topDraw(steelBoxDict,hBracing, diaDict, vstiffDict, gridPoint,initPoint){
    let group = new THREE.Group();

    const hBracingDict = hBracing.hBracingDict
    const hBraicingPlateDict = hBracing.hBraicingPlateDict
    
    let sc = 0.100;
    let r = Math.PI - Math.atan((gridPoint["G1K6"].y - gridPoint["G1K1"].y)/ (gridPoint["G1K6"].x - gridPoint["G1K1"].x))
    let aqua = new THREE.MeshBasicMaterial({ color : 0x00ffff });   // white 0xffffff
    let green = new THREE.MeshBasicMaterial({ color : 0x00ff00 });   // white 0xffffff
    let topPlate = GeneralPlanView(steelBoxDict, ["TopPlate"], 4, 0,1,sc, initPoint,r,aqua)
    topPlate.forEach(function(mesh){group.add(mesh)});
    let webPlate = GeneralPlanView(steelBoxDict, ["LeftWeB","RightWeB"], 4, 1,2,sc, initPoint,r,green)
    webPlate.forEach(function(mesh){group.add(mesh)});
    let diaphragm = ShapePlanView(diaDict, gridPoint, ["topPlate","upperTopShape","leftTopPlateShape"], 0, 1, sc, initPoint,r, green);
    diaphragm.forEach(function(mesh){group.add(mesh)});
    // wholeModel.models["bracingPlate"] = ShapePlanView(hBraicingPlateDict, gridPoint, ["plate"], 0, 1, sc, initPoint,r,"lime");
    // wholeModel.models["vStiffener"] = ShapePlanView(vstiffDict, gridPoint, ["upperframe1","upperframe2"], 0, 3, sc, initPoint,r,"lime");
    // wholeModel.models["bottomPlate"] = GeneralPlanView(steelBoxDict, ["G1BottomPlate"], 4, 0,1,sc, initPoint,r,"aqua")
    // wholeModel.models["bracing"] = GeneralPlanView(hBracingDict, [""], 4, 0,1,sc, initPoint,r,"lime")
    // wholeModel.models["bottomPlate"].origin = [0,-1000]
    // wholeModel.models["leftWeB"] = GeneralSideView(steelBoxDict, ["G1LeftWeB"], 4, 0,1,sc, initPoint,r,"aqua")
    // wholeModel.models["leftWeB"].origin = [0,-1500]
    // wholeModel.models["gridMark"] = GridMarkView(gridPoint, sc, initPoint, r, 1400)

    // for (let i in hBracingDict){
    //     for (let j = 0; j<hBracingDict[i].frame1.length;j++){
    //     let pts = []
    //      let x = (hBracingDict[i].pointlist[j][0].x - initPoint.x)*sc
    //      let y = (hBracingDict[i].pointlist[j][0].y - initPoint.y)*sc
    //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
    //      x = (hBracingDict[i].pointlist[j][1].x - initPoint.x)*sc
    //      y = (hBracingDict[i].pointlist[j][1].y - initPoint.y)*sc
    //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
    //      x = (hBracingDict[i].pointlist[j][2].x - initPoint.x)*sc
    //      y = (hBracingDict[i].pointlist[j][2].y - initPoint.y)*sc
    //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
    //      x = (hBracingDict[i].pointlist[j][3].x - initPoint.x)*sc
    //      y = (hBracingDict[i].pointlist[j][3].y - initPoint.y)*sc
    //      pts.push([Math.cos(r)*x - Math.sin(r)*y,Math.cos(r)*y + Math.sin(r)*x])
    //      hbracing.models["hbracing"+ i +"_"+ j] = new makerjs.models.ConnectTheDots(true,pts);
    //     }
    // }

    return group
}

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

function LineMesh(point0, lineMaterial) {
    let points = []
    for (let i in point0) {
        points.push(new THREE.Vector3(point0[i].x, point0[i].y, 0))
    }
    let geometry = new THREE.Geometry().setFromPoints(points)
    return new THREE.Line(geometry, lineMaterial)
}

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
    let titlePosition = 1000;
    let titleSize = 100;
    let labelSize = 50;
    // let group = []
    let group = new THREE.Group();
    let label = [];
    let weldings = [];

    let textMesh;
    let textMaterial = new THREE.MeshBasicMaterial({ color : 0xffffff });   // white 0xffffff
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });    // green 0x00ff00

    label.push({    //sectiontitle
        text: sectionName,
        anchor: [0, titlePosition, 0],
        fontSize : titleSize
    })
    
    let circle = new THREE.EllipseCurve(0,titlePosition,titleSize*2.5,titleSize*2.5)
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
        if (diaPoint[key].welding) {
            for (let i in diaPoint[key].welding){
                weldings.push(weldingMark(diaPoint[key].welding[i], 0.8,sc,200,true,true,false,false))
            }
        }
    }

    let dims = [];
    dims.push(Dimension([sectionPoint.leftTopPlate[3],sectionPoint.rightTopPlate[3]],0,sc,1,true,true,1))   //top1
    dims.push(Dimension([sectionPoint.leftTopPlate[3],sectionPoint.leftTopPlate[2],sectionPoint.rightTopPlate[2],sectionPoint.rightTopPlate[3]],0,sc,1,true,true,0)) //top2
    dims.push(Dimension([sectionPoint.rWeb[0],sectionPoint.rWeb[1]],1,sc,1,false,true,2)) //right1
    dims.push(Dimension([sectionPoint.rWeb[0],diaPoint.lowerTopShape.points[3],diaPoint.lowerTopShape.points[2],diaPoint.rightTopPlateShape.points[3],diaPoint.rightTopPlateShape.points[0],sectionPoint.rWeb[1]],5,sc,1,false,true,1)) //right2
    dims.push(Dimension([sectionPoint.lWeb[0],sectionPoint.lWeb[1]],1,sc,1,false,false,2)) //left1
    dims.push(Dimension([sectionPoint.lWeb[0],diaPoint.lowerTopShape.points[0],diaPoint.lowerTopShape.points[1],diaPoint.leftTopPlateShape.points[3],diaPoint.leftTopPlateShape.points[0],sectionPoint.lWeb[1]],5,sc,1,false,false,1)) // left2
    dims.push(Dimension([sectionPoint.bottomPlate[3],sectionPoint.lWeb[0],sectionPoint.rWeb[0],sectionPoint.bottomPlate[2]],0,sc,1,true,false,0)) //bottom1
    dims.push(Dimension([sectionPoint.bottomPlate[3],sectionPoint.bottomPlate[2]],0,sc,1,true,false,1)) //botoom2

    // layer coloers : aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow
    
    for (let i in dims){
        dims[i].meshes.forEach(function(mesh){group.add(mesh)})
        dims[i].labels.forEach(function(elem){label.push(elem)})
    }
    for (let i in weldings){
        weldings[i].meshes.forEach(function(mesh){group.add(mesh)})
        weldings[i].labels.forEach(function(elem){label.push(elem)})
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
            geometry.translate(xMid, -label[i].fontSize/2, 0);
            if (label[i].rotation) {geometry.rotateZ(label[i].rotation)
            }
            geometry.translate(label[i].anchor[0], label[i].anchor[1], 0);
            // make shape ( N.B. edge view not visible )
            textMesh = new THREE.Mesh(geometry, textMaterial);
            textMesh.layers.set(1)
            group.add(textMesh);
        }
        // text.position.z = 0;
    });
    
    return group
}


// 치수선 생성 프로그램 선, caption으로 구성해야할 듯함
// 다수의 포인트(points)의 연속된 치수선을 생성하는 모듈
function Dimension(points, index, scale, valueScale, isHorizontal, isTopOrRight, offsetIndex){
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    let sign = (isTopOrRight)? 1:-1
    // let dim = {models:{}, paths:{}}
    let add = 200*scale*sign;
    let fontSize = 50*scale
    let extend = 20*scale*sign
    let offset = offsetIndex*200*scale*sign + 20*scale*sign
    // dim.layer = "red"
    let meshes = [];
    let labels = [];
    if (isHorizontal){
        for (var key in points){
            meshes.push(LineMesh([{x : points[key].x, y:points[index].y + offset},{x:points[key].x, y:points[index].y+add+offset+extend}],lineMaterial))
        }
        for (let i = 0; i<points.length -1;i++){
            meshes.push(LineMesh([{x:points[i].x, y:points[index].y+add+offset},{x:points[i+1].x, y:points[index].y+add+offset}],lineMaterial))
            let value = valueScale*(Math.abs(points[i+1].x - points[i].x))
            labels.push({text: value.toFixed(0),
            anchor: [(points[i].x + points[i+1].x) / 2, points[index].y + add+offset+fontSize, 0],
            rotation : 0,
            fontSize : fontSize})
        }
    }else{
        for (var key in points){
            meshes.push(LineMesh([{x : points[index].x + offset, y:points[key].y},{x:points[index].x+add+offset+extend, y:points[key].y}],lineMaterial))
        }
        for (let i = 0; i<points.length -1;i++){
            meshes.push(LineMesh([{x : points[index].x +add+offset, y:points[i].y},{x:points[index].x+add+offset, y:points[i+1].y}],lineMaterial))
            let value = valueScale*(Math.abs(points[i+1].y - points[i].y))
            labels.push({text: value.toFixed(0),
            anchor: [points[index].x +add+offset -fontSize, (points[i].y + points[i+1].y )/2, 0],
            rotation : Math.PI/2,
            fontSize : fontSize})
        }
    }
    return {meshes,labels}
}

// locate is 0 to 1 relative point of welding line
function weldingMark(weldingObject, locate, scale, distance, isUpper, isRight, isXReverse,isYReverse){
    // let welding = {models:{}, paths:{},caption:{},layer:'red'}
    // const sc = scale
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    let linelength = []
    
    let fontSize = 50*scale
    let dummy
    let totallength = 0
    let point={}
    let meshes = [];
    let labels = [];

    for (let i = 0;i<weldingObject.Line.length - 1;i++){
        dummy = PointLength(weldingObject.Line[i],weldingObject.Line[i+1])
        totallength += dummy
        linelength.push(totallength)
    }
    for (let i =0; i<linelength.length;i++){
        if (linelength[i]/totallength >= locate){
            point['x'] = ((1 - locate) * weldingObject.Line[i].x + locate * weldingObject.Line[i+1].x)
            point['y'] = ((1 - locate) * weldingObject.Line[i].y + locate * weldingObject.Line[i+1].y)
            break;
        }
    }
    let xsign = isRight? 1:-1;
    let ysign = isUpper? 1:-1;
    let xsign2 = isXReverse? - 1: 1;
    let ysign2 = isYReverse? -1 : 1;
    let point0 = {x: point.x, y:point.y }
    let point1 = {x:point0.x+(xsign*xsign2*distance *0.25),y: point0.y +(ysign*ysign2*distance*0.25)}
    let point2 = {x: point1.x+ (xsign*distance*0.75), y:point1.y+(ysign*distance*0.75)}
    let point3 = {x: point2.x+ (250),y:point2.y}
    meshes.push(LineMesh([point0,point1],lineMaterial))
    meshes.push(LineMesh([point1,point2],lineMaterial))
    meshes.push(LineMesh([point2,point3],lineMaterial))
    meshes.push(LineMesh([{x:point.x + xsign*xsign2*30, y: point.y + ysign*ysign2*50},point0],lineMaterial))
    meshes.push(LineMesh([{x:point.x + xsign*xsign2*50, y: point.y + ysign*ysign2*30},point0],lineMaterial))

    if (weldingObject.type==="FF"){
        meshes.push(LineMesh([{x : point2.x + (100),y: point2.y + (50)},{x:point2.x + (100),y:point2.y - (50)}],lineMaterial))
        meshes.push(LineMesh([{x : point2.x + (100),y: point2.y + (50)},{x:point2.x + (150),y:point2.y}],lineMaterial))
        meshes.push(LineMesh([{x : point2.x + (100),y: point2.y - (50)},{x:point2.x + (150),y:point2.y}],lineMaterial))
    }
    // else if (weldingObject.type==="F"){
    //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
    //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1] - (50)*sc],[point2[0] + (150)*sc,point2[1]])
    // }
    // else if (weldingObject.type==="K"){
    //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
    //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (100)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
    // }
    // else if (weldingObject.type==="V"){
    //     welding.paths['F1'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0]+(100)*sc,point2[1] - (50)*sc])
    //     welding.paths['F2'] = new makerjs.paths.Line([point2[0] + (125)*sc,point2[1]],[point2[0] + (150)*sc,point2[1] - (50)*sc])
    // }
    labels.push({text: weldingObject.value1.toFixed(0),
        anchor: [point2.x + 50, point2.y - 50, 0],
        rotation : 0,
        fontSize : fontSize})
    return { meshes, labels }
}