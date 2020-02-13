import makerjs from 'makerjs'
export function testDraw(sectionName,sectionPoint, diaPoint){
// var makerjs = require('makerjs');
let sc = 0.200;
let sections = {models:{ }};
let titlePosition = 200
for (var key in sectionPoint){
    if (sectionPoint[key].constructor === Array){
    let points0 = []
    sectionPoint[key].forEach(element => {points0.push([element.x*sc,element.y*sc])})
    sections.models[key] = new makerjs.models.ConnectTheDots(true,points0) 
    }
}
for (var key in diaPoint){
    let points0 = []
    diaPoint[key].points.forEach(element => {points0.push([element.x*sc,element.y*sc])})
    sections.models[key] = new makerjs.models.ConnectTheDots(true,points0) 
}
let title = {models:{},
            paths:{
                circle:new makerjs.paths.Circle([0,titlePosition],titlePosition*0.1)
            },
            caption:{
                text:sectionName,
                anchor: new makerjs.paths.Line([-titlePosition,titlePosition],[titlePosition,titlePosition])
            },
            layer:'red'
            }


let dim = Dimension([sectionPoint.leftTopPlate[3],sectionPoint.rightTopPlate[3]],0,sc,1,true,true,1)
let dim2 = Dimension([sectionPoint.leftTopPlate[3],sectionPoint.leftTopPlate[2],sectionPoint.rightTopPlate[2],sectionPoint.rightTopPlate[3]],0,sc,1,true,true,0)
let dim3 = Dimension([sectionPoint.rWeb[0],sectionPoint.rWeb[1]],1,sc,1,false,true,2)
let dim4 = Dimension([sectionPoint.rWeb[0],diaPoint.lowerTopShape.points[3],diaPoint.lowerTopShape.points[2],diaPoint.rightTopPlateShape.points[0],diaPoint.rightTopPlateShape.points[1],sectionPoint.rWeb[1]],5,sc,1,false,true,1)
let dim5 = Dimension([sectionPoint.lWeb[0],sectionPoint.lWeb[1]],1,sc,1,false,false,2)
let dim6 = Dimension([sectionPoint.lWeb[0],diaPoint.lowerTopShape.points[0],diaPoint.lowerTopShape.points[1],diaPoint.leftTopPlateShape.points[0],diaPoint.leftTopPlateShape.points[1],sectionPoint.lWeb[1]],5,sc,1,false,false,1)
let dim7 = Dimension([sectionPoint.bottomPlate[3],sectionPoint.lWeb[0],sectionPoint.rWeb[0],sectionPoint.bottomPlate[2]],0,sc,1,true,false,0)
let dim8 = Dimension([sectionPoint.bottomPlate[3],sectionPoint.bottomPlate[2]],0,sc,1,true,false,1)
// var sections2 = makerjs.cloneObject(sections)
// sections2.origin = [5*sc,0]

sections.layer = "aqua"
// sections2.layer = "fuchsia"
var wholeModel = {
    models:{
        section1:sections,
        dim:dim,
        dim2:dim2,
        dim3:dim3,
        dim4:dim4,
        dim5:dim5,
        dim6:dim6,
        dim7:dim7,
        dim8:dim8,
        title:title,
    },
    
}
// makerjs.model.addCaption(wholeModel.models.section1, 'caption',[-sc,sc],[sc,sc])
// layer coloers : aqua, black, blue, fuchsia, green, gray, lime, maroon, navy, olive, orange, purple, red, silver, teal, white, yellow
// var svg = makerjs.exporter.toSVG(wholeModel);
// document.write(svg);
return wholeModel
}
// 치수선 생성 프로그램 선, caption으로 구성해야할 듯함
// 다수의 포인트(points)의 연속된 치수선을 생성하는 모듈
export function Dimension(points, index, scale, valueScale, isHorizontal, isTopOrRight, offsetIndex){
    let sign = (isTopOrRight)? 1:-1
    let dim = {models:{}, paths:{}}
    let add = 200*scale*sign;
    let fontSize = 50*scale
    let extend = 20*scale*sign
    let offset = offsetIndex*200*scale*sign + 20*scale*sign
    dim.layer = "red"
    if (isHorizontal){
        for (var key in points){
            dim.paths[key] = new makerjs.paths.Line([points[key].x*scale, points[index].y*scale + offset],[points[key].x*scale, points[index].y*scale+add+offset+extend])
        }
        for (let i = 0; i<points.length -1;i++){
            dim.paths['d'+i] = new makerjs.paths.Line([points[i].x*scale, points[index].y*scale+add+offset],[points[i+1].x*scale, points[index].y*scale+add+offset])
            let value = valueScale*(Math.abs(points[i+1].x - points[i].x))
            dim.models['d'+i] = {};
            makerjs.model.addCaption(dim.models['d'+i], value.toFixed(0) ,[points[i].x*scale, points[index].y*scale+add+offset+fontSize],[points[i+1].x*scale, points[index].y*scale+add+offset+fontSize])
            dim.models['d'+i].layer = "lime"
        }
    }else{
        for (var key in points){
            dim.paths[key] = new makerjs.paths.Line([points[index].x*scale + offset, points[key].y*scale],[points[index].x*scale+add+offset+extend, points[key].y*scale])
        }
        for (let i = 0; i<points.length -1;i++){
            dim.paths['d'+i] = new makerjs.paths.Line([points[index].x*scale+add+offset, points[i].y*scale],[points[index].x*scale+add+offset, points[i+1].y*scale])
            let value = valueScale*(Math.abs(points[i+1].y - points[i].y))
            dim.models['d'+i] = {};
            makerjs.model.addCaption(dim.models['d'+i], value.toFixed(0) ,[points[index].x*scale+add+offset -fontSize, points[i].y*scale],[points[index].x*scale+add+offset-fontSize, points[i+1].y*scale])
            dim.models['d'+i].layer = "lime"
        }
    }
    return dim
}
