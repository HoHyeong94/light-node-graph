var bundle = (function (global) {
    'use strict';

    function minus(x,y) {
        return x-y;
    }

    function add(x, y) {
        return x + y;
    }

    function Vector2d(xydata) {
        let vectorX = xydata[1][0] - xydata[0][0];
        let vectorY = xydata[1][1] - xydata[0][1];
        let vector = [vectorX, vectorY];
        let length = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
        let cos = vectorX / length;
        let sin = vectorY / length;
        return { vector, length, cos, sin }
    }


    function Curve(startPoint, vector1, vector2, radius, a1, a2) {
        if (radius !== 0) {
            // let vector1 = Vector2d(xydata1);
            // let vector2 = Vector2d(xydata2);
            let angle = Math.acos((vector1.vector[0] * vector2.vector[0] + vector1.vector[1] * vector2.vector[1]) / (vector1.length * vector2.length));
            let arcRadius = radius;
            let aBegin = a1;
            let aEnd = a2;

            let sign = 0;

            if ((-1 * vector2.cos * vector1.sin + vector2.sin * vector1.cos) > 0) {
                sign = 1;    // Counter clockwise
            }
            else {
                sign = -1;   // Clockwise
            }

            let beginClothoid = Clothoid(radius, a1);
            let endClothoid = Clothoid(radius, a2);
            let arcAngle = angle - beginClothoid.angle - endClothoid.angle;

            let beginOffset = beginClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
                endClothoid.offset / Math.sin(angle) - beginClothoid.offset / Math.tan(angle);

            let endOffset = endClothoid.radiusCenterOffset + radius * Math.tan(angle / 2) +
                beginClothoid.offset / Math.sin(angle) - endClothoid.offset / Math.tan(angle);

            let beginClothoidCoord = [startPoint[0] + (vector1.length - beginOffset) * vector1.cos,
            startPoint[1] + (vector1.length - beginOffset) * vector1.sin];

            let beginArcCoord = [beginClothoidCoord[0] + beginClothoid.totalX * vector1.cos - sign * beginClothoid.totalY * vector1.sin,
            beginClothoidCoord[1] + beginClothoid.totalX * vector1.sin + sign * beginClothoid.totalY * vector1.cos];

            let arcCenter = [beginClothoidCoord[0] + beginClothoid.radiusCenterOffset * vector1.cos - sign * (radius + beginClothoid.offset) * vector1.sin,
            beginClothoidCoord[1] + beginClothoid.radiusCenterOffset * vector1.sin + sign * (radius + beginClothoid.offset) * vector1.cos];

            let endArcCoord = [arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(arcAngle) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(arcAngle),
            arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(arcAngle) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(arcAngle)];

            let endClothoidCoord = [endArcCoord[0] + endClothoid.totalX * vector2.cos + sign * endClothoid.totalY * vector2.sin,
            endArcCoord[1] + endClothoid.totalX * vector2.sin - sign * endClothoid.totalY * vector2.cos];

            function beginClothoidStation(l) {
                let clothoidX = l * (1 - l ** 4 / 40 / aBegin ** 4 + l ** 8 / 3456 / aBegin ** 8);
                let clothoidY = l ** 3 / 6 / aBegin ** 2 * (1 - l ** 4 / 56 / aBegin ** 4 + l ** 8 / 7040 / aBegin ** 8);
                let resultX = beginClothoidCoord[0] + vector1.cos * clothoidX - sign * vector1.sin * clothoidY;
                let resultY = beginClothoidCoord[1] + vector1.sin * clothoidX + sign * vector1.cos * clothoidY;
                let slopeDeltaX = (1 - l ** 4 * 5 / 40 / aBegin ** 4 + l ** 8 * 9 / 3456 / aBegin ** 8);
                let slopeDeltaY = l ** 2 / 6 / aBegin ** 2 * (3 - l ** 4 * 7 / 56 / aBegin ** 4 + l ** 8 * 11 / 7040 / aBegin ** 8);
                let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
                let normalCos = sign * slopeDeltaY / slopeLength;
                let normalSin = -1 * slopeDeltaX / slopeLength;
                let globalNormalCos = vector1.cos * normalCos - vector1.sin * normalSin;
                let globalNormalSin = vector1.sin * normalCos + vector1.cos * normalSin;
                return [resultX, resultY, globalNormalCos, globalNormalSin]
            }

            function endClothoidStation(l) {
                l = endClothoid.length - l;
                let clothoidX = endClothoid.totalX - (l * (1 - l ** 4 / 40 / aEnd ** 4 + l ** 8 / 3456 / aEnd ** 8));
                let clothoidY = -1 * endClothoid.totalY + (l ** 3 / 6 / aEnd ** 2 * (1 - l ** 4 / 56 / aEnd ** 4 + l ** 8 / 7040 / aEnd ** 8));
                let resultX = endArcCoord[0] + vector2.cos * clothoidX - sign * vector2.sin * clothoidY;
                let resultY = endArcCoord[1] + vector2.sin * clothoidX + sign * vector2.cos * clothoidY;
                let slopeDeltaX = -1 * (1 - l ** 4 * 5 / 40 / aEnd ** 4 + l ** 8 * 9 / 3456 / aEnd ** 8);
                let slopeDeltaY = l ** 2 / 6 / aEnd ** 2 * (3 - l ** 4 * 7 / 56 / aEnd ** 4 + l ** 8 * 11 / 7040 / aEnd ** 8);
                let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
                let normalCos = -sign * slopeDeltaY / slopeLength;
                let normalSin = slopeDeltaX / slopeLength;
                let globalNormalCos = vector2.cos * normalCos - vector2.sin * normalSin;
                let globalNormalSin = vector2.sin * normalCos + vector2.cos * normalSin;
                return [resultX, resultY, globalNormalCos, globalNormalSin]
            }

            function arcStation(l) {
                let resultX = arcCenter[0] + (beginArcCoord[0] - arcCenter[0]) * Math.cos(l / arcRadius) - sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(l / arcRadius);
                let resultY = arcCenter[1] + (beginArcCoord[1] - arcCenter[1]) * Math.cos(l / arcRadius) + sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(l / arcRadius);
                let globalNormalCos = sign * (resultX - arcCenter[0]) / arcRadius;
                let globalNormalSin = sign * (resultY - arcCenter[1]) / arcRadius;
                return [resultX, resultY, globalNormalCos, globalNormalSin]
            }

            let result = {
                angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
                arcCenter, endArcCoord, endClothoidCoord, beginClothoidStation, endClothoidStation, arcStation, sign
            };
            return result
        }
        else {
            let angle = 0;
            let beginClothoid = Clothoid(radius, a1);
            let endClothoid = Clothoid(radius, a2);
            let arcRadius = 0;
            let arcAngle = 0;
            let beginOffset = 0;
            let endOffset = 0;
            let beginClothoidCoord = 0;
            let beginArcCoord = 0;
            let arcCenter = 0;
            let endArcCoord = 0;
            let endClothoidCoord = 0;

            let result = {
                angle, arcRadius, a1, a2, beginClothoid, endClothoid, arcAngle, beginOffset, endOffset, beginClothoidCoord, beginArcCoord,
                arcCenter, endArcCoord, endClothoidCoord
            };
            return result
        }

    }


    function Clothoid(radius, a) {
        if (radius !== 0) {
            let length = Math.pow(a, 2) / radius;
            let angle = Math.pow(a, 2) / Math.pow(radius, 2) / 2;
            let totalX = length * (1 - Math.pow(length, 2) / 40 / Math.pow(radius, 2) + Math.pow(length, 4) / 3456 / Math.pow(radius, 4));
            let totalY = Math.pow(length, 2) / 6 / radius * (1 - Math.pow(length, 2) / 56 / Math.pow(radius, 2) + Math.pow(length, 4) / 7040 / Math.pow(radius, 4));
            let offset = totalY - radius * (1 - Math.cos(angle));
            let radiusCenterOffset = totalX - radius * Math.sin(angle);

            let result = { length, angle, totalX, totalY, offset, radiusCenterOffset };
            return result
        }
        else {
            let length = 0;
            let angle = 0;
            let totalX = 0;
            let totalY = 0;
            let offset = 0;
            let radiusCenterOffset = 0;
            let result = { length, angle, totalX, totalY, offset, radiusCenterOffset };
            return result
        }
    }

    // const startPoint = [0,0]
    // const xy
    // 1 = [[5, 5], [10, 15]]
    // const xydata2 = [[10, 15], [30, 35]]
    // const radius = 100
    // const a1 = 10
    // const a2 = 10
    // const test = Curve(startPoint, xydata1, xydata2, radius, a1, a2)

    const LineGenerator = inputs => {
      // console.time("for loop");
      let lineResult = {
        vectors: [],
        curves: [],
        segments: { start: [], end: [] },
        beginStationNumber: 0,
        endStationNumber: 0,
        startPoint: [],
        slaveOrMaster: true,
        input: { ...inputs },
        points : []
      };
      const spacing = 10000; //단위 수정시 check

      for (let i = 0; i < lineResult.input.horizonDataList.length - 1; i++) {
        lineResult.startPoint.push(global._.take(lineResult.input.horizonDataList[i], 2));
        lineResult.vectors.push(
          Vector2d([
            global._.take(lineResult.input.horizonDataList[i], 2),
            global._.take(lineResult.input.horizonDataList[i + 1], 2)
          ])
        );
      }

      for (let i = 0; i < lineResult.input.horizonDataList.length - 2; i++) {
        lineResult.curves.push(
          Curve(
            global._.take(lineResult.input.horizonDataList[i], 2),
            lineResult.vectors[i],
            lineResult.vectors[i+1],
            lineResult.input.horizonDataList[i + 1][2],
            lineResult.input.horizonDataList[i + 1][3],
            lineResult.input.horizonDataList[i + 1][4],
          )
        );
      }
      const dataList = lineResult.input.horizonDataList;
      let segmentsStation = lineResult.input.beginStation;
      lineResult.segments.start.push(segmentsStation);
      for (let j = 0; j < (dataList.length - 2); j++) {
        if (j === 0){
          segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset; //초기값은 항상 직선으로 시작
          lineResult.segments.start.push(segmentsStation);
        } else {
          segmentsStation += lineResult.vectors[j].length - lineResult.curves[j].beginOffset - lineResult.curves[j-1].endOffset;
          lineResult.segments.start.push(segmentsStation);
        }
        segmentsStation += lineResult.curves[j].beginClothoid.length;
        lineResult.segments.start.push(segmentsStation);
        segmentsStation +=  lineResult.curves[j].arcAngle * lineResult.curves[j].arcRadius;
        lineResult.segments.start.push(segmentsStation);
        segmentsStation +=  lineResult.curves[j].endClothoid.length;
        lineResult.segments.start.push(segmentsStation);
      }
      lineResult.segments.end.push(...global._.drop(lineResult.segments.start));
      if (lineResult.curves.length === 0){
        segmentsStation += lineResult.vectors[lineResult.vectors.length-1].length;
      }else {
        segmentsStation += lineResult.vectors[lineResult.vectors.length-1].length - lineResult.curves[lineResult.curves.length -1].endOffset;
      }
      lineResult.segments.end.push(segmentsStation);
      lineResult.beginStationNumber = lineResult.segments.start[0];
      lineResult.endStationNumber = lineResult.segments.end[lineResult.segments.end.length - 1];

      for (let i = Math.ceil(lineResult.beginStationNumber / spacing) * spacing; i < lineResult.endStationNumber; i += spacing) {
        lineResult.points.push(PointGenerator(i, lineResult,90));
      }
      return lineResult;
    };

    const OffsetLine = (offset, line) => {
    let lineResult = {
        vectors: line.vectors,
        curves: line.curves,
        segments: line.segments,
        beginStationNumber: line.beginStationNumber,
        endStationNumber: line.endStationNumber,
        startPoint: [],
        slaveOrMaster: false,
        input: line.inputs,
        points : []
        };

      //let lineResult = {...line}
    //   let points = [];
      for (let i = 0; i<line.points.length;i++){
        let resultPoint = {
            stationNumber:line.points[i].stationNumber,
            x: line.points[i].x  + line.points[i].normalCos * offset,
            y: line.points[i].y  + line.points[i].normalSin * offset,
            z: 0,
            normalCos: line.points[i].normalCos,
            normalSin: line.points[i].normalSin,
            masterStationNumber: line.points[i].stationNumber,
            offset: offset,
            virtual: false
            };
        lineResult.points.push(resultPoint);

      }

      return lineResult
    };

    const LineMatch = (masterPoint, masterLine, slaveLine, skew, VerticalDataList, SuperElevation) => {
      let resultPoint = {
        stationNumber : 0,
        x: 0,
        y: 0,
        z: 0,
        normalCos: 0,
        normalSin: 0,
        masterStationNumber: 0,
        offset: 0,
        virtual: false,
        skew:skew,
        gradientX:0,
        gradientY:0,
      };
      const unitVx = -1 * masterPoint.normalSin;
      const unitVy = masterPoint.normalCos;
      const skewRadian = skew * Math.PI / 180;
      let dX = unitVx * Math.cos(skewRadian) - unitVy * Math.sin(skewRadian);
      let dY = unitVx * Math.sin(skewRadian) + unitVy * Math.cos(skewRadian);
      let alpha = dY;
      let beta = -1 * dX;
      let gamma = - alpha * masterPoint.x - beta * masterPoint.y;
      let dummy1 = 0;
      let dummy2 = 0;
      let sign = 1;
      for (let i = 0; i<slaveLine.points.length -1;i++){
        dummy1 = alpha * slaveLine.points[i].x + beta * slaveLine.points[i].y + gamma;
        dummy2 = alpha * slaveLine.points[i+1].x + beta * slaveLine.points[i+1].y + gamma;
        if (dummy1 ===0){
          resultPoint = slaveLine.points[i];    
          break;
        }
        else if (dummy2 ===0) {
          resultPoint = slaveLine.points[i+1];    
          break;
        }
        else if (dummy1*dummy2 < 0){
          let coe = splineCoefficient(slaveLine.points[i],slaveLine.points[i+1]);
          let a = alpha * coe.a2 + beta * coe.a1;
          let b = alpha * coe.b2 + beta * coe.b1;
          let c = alpha * coe.c2 + beta * coe.c1 + gamma;
          let t = 0;
          if (a == 0){
              t = -c/b;
          }else{
            t = (-b + Math.sqrt(b**2 - 4*a*c))/(2*a);
            if (t>1 || t<-1){
                t = (-b - Math.sqrt(b**2 - 4*a*c))/(2*a);
            }      }
          
          let deltaX = 2* coe.a2 * (t) + coe.b2;
          let deltaY = 2* coe.a1 * (t) + coe.b1;
          let len = Math.sqrt(deltaX**2 + deltaY**2);
          resultPoint.normalCos = - deltaY/len;
          resultPoint.normalSin = deltaX/len;
          resultPoint.x = coe.a2 * (t**2) + coe.b2* t + coe.c2;
          resultPoint.y = coe.a1 * (t**2) + coe.b1* t + coe.c1;
        //   let segLen = splineLength(slaveLine.points[i],slaveLine.points[i+1]);
        //   let resultLen = splineLength(slaveLine.points[i],resultPoint);
        //   resultPoint.stationNumber = slaveLine.points[i].stationNumber + (slaveLine.points[i+1].stationNumber - slaveLine.points[i].stationNumber) * resultLen/segLen;
          let MasterPoint = PointLineMatch(resultPoint,masterLine);
          resultPoint.masterStationNumber = MasterPoint.masterStationNumber.toFixed(4)*1;
          resultPoint.stationNumber = resultPoint.masterStationNumber;
          if (MasterPoint.normalCos * (resultPoint.x - MasterPoint.x) + MasterPoint.normalSin * (resultPoint.y - MasterPoint.y) >= 0) {
            sign = 1;
          }
          else {
            sign = -1;
          }
          resultPoint.offset = sign * Math.sqrt((resultPoint.x-MasterPoint.x)**2 + (resultPoint.y-MasterPoint.y)**2).toFixed(4)*1;
          let verticalInfo =  VerticalPositionGenerator(VerticalDataList, SuperElevation, resultPoint);
          resultPoint.z = verticalInfo.elevation;
          resultPoint.gradientX = verticalInfo.gradientX;
          resultPoint.gradientY = verticalInfo.gradientY;
          break;
        }
      }
      return resultPoint
    };

    function SplinePointGenerator(masterPoint, slavePoints, VerticalDataList, SuperElevation){
        let resultPoint = {
            stationNumber:0,
            x: 0,
            y: 0,
            z: 0,
            normalCos: 0,
            normalSin: 0,
            masterStationNumber:0,
            offset: 0,
            virtual: false,
            skew:90
          };

          let dX = masterPoint.normalCos;
          let dY = masterPoint.normalSin;
          let alpha = dY;
          let beta = -1 * dX;
          let gamma = - alpha * masterPoint.x - beta * masterPoint.y;
          let dummy1 = 0;
          let dummy2 = 0;
          let sign = 1;
          for (let i = 0; i<slavePoints.length -1;i++){
            dummy1 = alpha * slavePoints[i].x + beta * slavePoints[i].y + gamma;
            dummy2 = alpha * slavePoints[i+1].x + beta * slavePoints[i+1].y + gamma;
            if (dummy1 ===0){
              resultPoint = slavePoints[i];
              break;
            }
            else if (dummy2 ===0) {
              resultPoint = slavePoints[i+1];
              break;
            }
            else if (dummy1*dummy2 < 0){
              let coe = splineCoefficient(slavePoints[i],slavePoints[i+1]);
              let a = alpha * coe.a2 + beta * coe.a1;
              let b = alpha * coe.b2 + beta * coe.b1;
              let c = alpha * coe.c2 + beta * coe.c1 + gamma;
              let t = 0;
              if (a == 0){
                  t = -c/b;
              }else{
                t = (-b + Math.sqrt(b**2 - 4*a*c))/(2*a);
                if (t>1 || t<-1){
                    t = (-b - Math.sqrt(b**2 - 4*a*c))/(2*a);
                }          }
              let deltaX = 2* coe.a2 * (t) + coe.b2;
              let deltaY = 2* coe.a1 * (t) + coe.b1;
              let len = Math.sqrt(deltaX**2 + deltaY**2);
              resultPoint.normalCos = - deltaY/len;
              resultPoint.normalSin = deltaX/len;
              resultPoint.x = coe.a2 * (t**2) + coe.b2* t + coe.c2;
              resultPoint.y = coe.a1 * (t**2) + coe.b1* t + coe.c1;
              resultPoint.masterStationNumber = masterPoint.masterStationNumber.toFixed(4)*1;
              resultPoint.stationNumber = resultPoint.masterStationNumber;
              if (masterPoint.normalCos * (resultPoint.x - masterPoint.x) + masterPoint.normalSin * (resultPoint.y - masterPoint.y) >= 0) {
                sign = 1;
              }
              else {
                sign = -1;
              }
              resultPoint.offset = sign * Math.sqrt((resultPoint.x-masterPoint.x)**2 + (resultPoint.y-masterPoint.y)**2).toFixed(4)*1;
              let verticalInfo =  VerticalPositionGenerator(VerticalDataList, SuperElevation, resultPoint);
              resultPoint.z = verticalInfo.elevation;
              resultPoint.gradientX = verticalInfo.gradientX;
              resultPoint.gradientY = verticalInfo.gradientY;
              break;
            }
          }
          return resultPoint
        

    }

    const PointGenerator = (stationNumber, line, skew) => {
      let resultPoint = {
        stationNumber:stationNumber.toFixed(4)*1,
        x: 0,
        y: 0,
        z: 0,
        normalCos: 0,
        normalSin: 0,
        masterStationNumber: stationNumber,
        offset: 0,
        virtual: false,
        skew : skew,
      };
      const dataList = line.input.horizonDataList;
      const startStationNumList = line.segments.start;
      const endStationNumList = line.segments.end;

      let l = 0;
      let lineNum = 0;
      let varCase = 0;
      const startPoint = line.startPoint;
      let tempRes = [0,0,0,0
      
      ];
      
      for (let i = 0; i <= 4 * (dataList.length-2); i++) {
        l = stationNumber - startStationNumList[i];

        lineNum = Math.floor(i / 4);
        varCase = i % 4;
        if (
          stationNumber >= startStationNumList[i] &&
          stationNumber <= endStationNumList[i]
        ) {
          switch (varCase) {
            case 0:
              if (i === 0 || (dataList[lineNum][2] === 0 && dataList[lineNum - 1][2] === 0 && dataList[lineNum + 1][2] === 0 )) {
                tempRes[0] = startPoint[lineNum][0] + l * line.vectors[lineNum].cos;
                tempRes[1] = startPoint[lineNum][1] + l * line.vectors[lineNum].sin;
              } else {
                tempRes[0] = line.curves[lineNum - 1].endClothoidCoord[0] + l * line.vectors[lineNum].cos;
                tempRes[1] = line.curves[lineNum - 1].endClothoidCoord[1] + l * line.vectors[lineNum].sin;
              }
              tempRes[2] = line.vectors[lineNum].sin;
              tempRes[3] = -1 * line.vectors[lineNum].cos;
              break;
            case 1:
              tempRes = line.curves[lineNum].beginClothoidStation(l);
              break;
            case 2:
              tempRes = line.curves[lineNum].arcStation(l);
              break;
            case 3:
              tempRes = line.curves[lineNum].endClothoidStation(l);
              break;
          }
          resultPoint.x = tempRes[0];
          resultPoint.y = tempRes[1];
          resultPoint.normalCos = tempRes[2];
          resultPoint.normalSin = tempRes[3];
          break;
        }
      }
      return resultPoint;
    };

    const splineCoefficient = (point1, point2) =>{
        const x1 = point1.x;
        const y1 = point1.y;
        const x2 = point2.x;
        const y2 = point2.y;

        let b1 = (y2 - y1) / 2;
        let b2 = (x2 - x1) / 2;
        let a1 = 0.0;
        let a2 = 0.0;
        let df1 = 0.0;
        let df2 = 0.0;
        if (point1.normalSin === 0){
            if (point2.normalSin === 0);
            else{
                df2 = -point2.normalCos / point2.normalSin;
                a2 = b2 / 2;
                a1 = (-b1 + df2 * (2 * a2 + b2)) / 2;
            } 
        } else if (point2.normalSin === 0){
            if (point2.normalSin === 0);else{
                df1 = -point1.normalCos / point1.normalSin;
                a2 = b2 / -2;
                a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
            }
        }else{
            df1 = -point1.normalCos / point1.normalSin;
            df2 = -point2.normalCos / point2.normalSin;

            if (df1 === df2){
                a1 = 0;
                a2 = 0;
            }else{
                a2 = (2*b1-(df1+df2)*b2)/(2*(df2-df1));
                a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
            }
        }
        const c1 = y2 - a1 - b1;
        const c2 = x2 - a2 - b2;
     return {a1:a1,b1:b1,c1:c1,a2:a2,b2:b2,c2:c2}
    };

    const PointLineMatch = (targetPoint, masterLine) =>{
        let resultPoint = {};
        let point1 = {};
        let point2 = {};
        let crossproduct1 = 0;
        let crossproduct2 = 0;
        let innerproduct = 1;
        let station1 = 0;
        let station2 = 0;
        let station3 = 0;
        const err = 0.1;
        let num_iter = 0;
        let a = true;

        //matser_segment = variables.Segment_station_number(master_line_datalist)

        for (let i = 0; i< masterLine.segments.start.length;i++){
            station1 = masterLine.segments.start[i];
            station2 = masterLine.segments.end[i];
            point1 = PointGenerator(station1, masterLine,90);
            point2 = PointGenerator(station2, masterLine,90);
            crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos;
            crossproduct2 = (targetPoint.x - point2.x) * point2.normalSin - (targetPoint.y - point2.y) * point2.normalCos;

            if (crossproduct1 * crossproduct2 < 0){
                a = false;
                break;
            }else if (Math.abs(crossproduct1) < err){
                resultPoint = {...point1};
                break;
            } else if (Math.abs(crossproduct2) < err){
                resultPoint = {...point2};
                break;
            }
        }
        if (a == false){
            while (Math.abs(innerproduct) > err){
                innerproduct = (targetPoint.x - point1.x) * (-point1.normalSin) + (targetPoint.y - point1.y) * (point1.normalCos);
                station3 = station1 + innerproduct;
                point1 = PointGenerator(station3, masterLine,90);
                station1 = point1.stationNumber;
                crossproduct1 = (targetPoint.x - point1.x) * point1.normalSin - (targetPoint.y - point1.y) * point1.normalCos;
                resultPoint = {...point1};
                num_iter += 1;
                if (num_iter == 200){
                    break;
                }
            }
        }    //targetPoint.master_station_number = result.station_number
        return resultPoint
     };

     function VerticalPositionGenerator(VerticalDataList, SuperElevation, Point){
        const station = Point.masterStationNumber;
        const offset = Point.offset;
        let result_elevation = 0;
        let superelevation =0;
        let parabola_data = [];
        let tangent = [];
        let gradX = 0;
      for (let i = 0; i < VerticalDataList.length-1; i++){
          tangent.push( (VerticalDataList[i+1]['elevation'] - VerticalDataList[i]['elevation']) /
          (VerticalDataList[i+1]['station'] - VerticalDataList[i]['station']) );
      }
      for (let i = 0; i <  VerticalDataList.length-2;i++){
        let parabola1 = VerticalDataList[i+1]['station'] - VerticalDataList[i+1]['curveLength'] / 2;
        let parabola2 = VerticalDataList[i+1]['station'] + VerticalDataList[i+1]['curveLength'] / 2;
          parabola_data.push([
            parabola1,
            parabola2,
            VerticalDataList[i]['elevation'] + tangent[i] * ( parabola1 - VerticalDataList[i]['station'] ),
            VerticalDataList[i+1]['elevation'] + tangent[i+1] * (parabola2 - VerticalDataList[i+1]['station']),
            VerticalDataList[i+1]['curveLength']
          ]);

        }
      if (station <= VerticalDataList[0]['station']){
          result_elevation = VerticalDataList[0]["elevation"] + tangent[0] * (station - VerticalDataList[0]['station'] );
          gradX = tangent[0];
      } else if (station >= VerticalDataList[VerticalDataList.length -1]['station']){
          result_elevation = VerticalDataList[VerticalDataList.length-1]['elevation'] + tangent[tangent.length-1] * ( station - VerticalDataList[VerticalDataList.length-1]['station'] );
          gradX = tangent[tangent.length-1];
      }else{
          for (let i = 0; i<VerticalDataList.length-1;i++){
              if (station >= VerticalDataList[i]['station'] && station < VerticalDataList[i+1]['station']){
                  result_elevation = VerticalDataList[i]['elevation'] + tangent[i] * (station - VerticalDataList[i]['station'] );
                  gradX = tangent[i];
              }
          }
          for (let i = 0; i<VerticalDataList.length-2;i++){
              if (station >= parabola_data[i][0] && station <= parabola_data[i][1]){
                  result_elevation = parabola_data[i][2] + 
                  tangent[i] * (station - parabola_data[i][0]) + 
                  (tangent[i+1] - tangent[i]) / 2 / parabola_data[i][4] * (station - parabola_data[i][0])**2;
                  gradX = tangent[i] + (tangent[i+1] - tangent[i])  / parabola_data[i][4] * (station - parabola_data[i][0]);
              }
          }
      }
      let gradient = Gradient(SuperElevation, station, offset);
      superelevation = gradient * offset;
    //  if (station <= SuperElevation[0]['station']){
    //      if (offset < 0){
    //          superelevation = SuperElevation[0]['left'] / 100 * offset * (-1)
    //      }else{
    //          superelevation = SuperElevation[0]['right'] / 100 * offset
    //      }
    //  }else if (station >= SuperElevation[SuperElevation.length -1]['station']){
    //      if (offset < 0){
    //          superelevation = SuperElevation[SuperElevation.length-1]['left'] / 100 * offset * (-1)
    //      }else{
    //          superelevation = SuperElevation[SuperElevation.length-1]['right'] / 100 * offset
    //      }
    //  }else{
    //      for (let i = 0;i< SuperElevation.length-1;i++){
    //          if (station >= SuperElevation[i]['station'] && station < SuperElevation[i+1]['station']){
    //              if (offset < 0){
    //                  superelevation = ( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
    //                  * (SuperElevation[i+1]['left'] - SuperElevation[i]['left']) + SuperElevation[i]['left'] ) / 100 * offset * (-1);
    //              }else{
    //                  superelevation = ( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
    //                  * (SuperElevation[i+1]['right'] - SuperElevation[i]['right']) + SuperElevation[i]['right'] ) / 100 * offset;
    //              }
    //          }
    //      }
    //  }
     return {elevation:result_elevation + superelevation,gradientX:gradX, gradientY:gradient}

    }

    function Gradient(SuperElevation,station, offset){
      // const station = Point.masterStationNumber;
      // const offset = Point.offset;
      let gradient = 0;

      if (station <= SuperElevation[0]['station']){
        if (offset < 0){
            gradient = -SuperElevation[0]['left'];
        }else{
            gradient = SuperElevation[0]['right'];
        }
      }else if (station >= SuperElevation[SuperElevation.length -1]['station']){
          if (offset < 0){
              gradient = -SuperElevation[SuperElevation.length-1]['left'] ;
          }else{
              gradient = SuperElevation[SuperElevation.length-1]['right'];
          }
      }else{
          for (let i = 0;i< SuperElevation.length-1;i++){
              if (station >= SuperElevation[i]['station'] && station < SuperElevation[i+1]['station']){
                  if (offset < 0){
                      gradient = -( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
                      * (SuperElevation[i+1]['left'] - SuperElevation[i]['left']) + SuperElevation[i]['left'] );
                  }else{
                      gradient = ( (station - SuperElevation[i]['station']) / (SuperElevation[i+1]['station'] - SuperElevation[i]['station'])
                      * (SuperElevation[i+1]['right'] - SuperElevation[i]['right']) + SuperElevation[i]['right'] );
                  }
              }
          }
      }
      return gradient / 100
    }

    function GirderLayoutGenerator(girderLayoutInput, hLine, VerticalDataList, SuperElevation) {
        let result = {
            masterLine: { },
            girderLine :[],
            centralSupportPoint:[],
            girderSupportPoint :[],
            girderSpanPoint:[]
        };
        let girderInfoObj = {
            number: 0,
            baseLine: { },
            alignOffset: 0,
            girderLine: { },
            outerBeam: false
        };
        // let GirderLengthObj = {
        //     crTotalLength: 0,
        //     girderTotalLength: 0,
        //     crSpanLength: [],
        //     griderSpanLength: []
        // }
        let supportDataList = girderLayoutInput.supportData;
        // let beginShapeDataList = girderLayoutInput.SEShape.start   // 시점부
        // let endShapeDataList = girderLayoutInput.SEShape.end       // 종점부
        let girderDataList = girderLayoutInput.getGirderList;
        let supportStation = girderLayoutInput.baseValue.bridgeBeginStation;
        for (let i = 0; i < hLine.length; i++) {
            if (hLine[i].slaveOrMaster == true) {
                result.masterLine = {...hLine[i]};
            }
        }
        let i = 0;
        let girderInfoList = [];
        for (let j = 0; j < girderDataList.length;j++) {
            let girderInfo = { ...girderInfoObj };
            girderInfo.number = i;
            for (let k = 0; k < hLine.length; k++) {
                if ('align' + String(k + 1) == girderDataList[j].baseAlign) {
                    girderInfoObj.baseLine = hLine[k];
                }
            }
            girderInfo.girderLine = OffsetLine(girderDataList[j].alignOffset,girderInfoObj.baseLine);
            girderInfo.alignOffset = girderDataList[j].alignOffset;
            girderInfo.outerBeam = girderDataList[j].isBeam? true : false;
            girderInfoList.push(girderInfo);
            i += 1;
        }
        //console.log(supportDataList)
        result.centralSupportPoint.push(PointGenerator(supportStation, result.masterLine,supportDataList[0].angle));
        for (i = 1; i < supportDataList.length; i++) {
                supportStation = supportStation + supportDataList[i].spanLength;
                result.centralSupportPoint.push(PointGenerator(supportStation, result.masterLine,supportDataList[i].angle));
        }
        for (let i = 0; i< girderInfoList.length;i++) {
            result.girderSupportPoint.push(SupportSkewPointGenerator(result.centralSupportPoint, result.masterLine, girderInfoList[i].girderLine, supportDataList, VerticalDataList, SuperElevation));
            result.girderLine.push(girderInfoList[i].girderLine);
        }
        for (let i = 0; i < result.girderSupportPoint.length;i++){ // i:girderIndex
            let PointsList = [];
            for (let j = 1; j < result.girderSupportPoint[i].length -2 ;j++){ // j:supportIndex
                let Points = [];
                Points.push(result.girderSupportPoint[i][j]);
                for (let k = 0; k < girderInfoList[i].girderLine.points.length;k++){
                    if (girderInfoList[i].girderLine.points[k].masterStationNumber>result.girderSupportPoint[i][j].masterStationNumber 
                        && girderInfoList[i].girderLine.points[k].masterStationNumber < result.girderSupportPoint[i][j+1].masterStationNumber){
                    Points.push(girderInfoList[i].girderLine.points[k]);
                    }
                }
                Points.push(result.girderSupportPoint[i][j+1]);
                PointsList.push(Points);
            }
            result.girderSpanPoint.push(PointsList);
        }
        return result
    }

    function GirderGridStation(girderLayout, diaphragmDistance,minDistance){
        let girderNumber = girderLayout.girderSupportPoint.length;
        let spanNumber = girderLayout.girderSpanPoint[0].length;
        let gridStationList = [];
        let md = minDistance; //Mindistance
        let minStation = 0;
        let maxStation = 0;
        let remainder = 0;
        for (let i = 0; i<girderNumber;i++){
            let spanStationList = [];
            for (let j = 1; j< spanNumber+1;j++){
                let gridStation = {
                    diaphragm : [],
                    vStiffner : [],
                    connection : []
                };
                minStation = girderLayout.girderSupportPoint[i][j].masterStationNumber;
                maxStation = girderLayout.girderSupportPoint[i][j+1].masterStationNumber;
                remainder = Math.abs(girderLayout.centralSupportPoint[j+1].masterStationNumber
                    - girderLayout.centralSupportPoint[j].masterStationNumber) % diaphragmDistance;
                if (remainder === 0){
                    remainder = diaphragmDistance;
                }else {
                    remainder = (remainder - diaphragmDistance) / 2;
                }
                let diaStation = girderLayout.centralSupportPoint[j].masterStationNumber + remainder;
                let vStiffStation = diaStation - diaphragmDistance/2;
                let connectStation = vStiffStation - diaphragmDistance/4;
                //console.log(minStation,maxStation,diaStation,vStiffStation,connectStation)
                 while(minStation + md < diaStation ){
                     diaStation -=diaphragmDistance;
                    }                
                while(maxStation - md > diaStation){
                    if (diaStation > minStation + md){
                        gridStation.diaphragm.push(diaStation.toFixed(4)*1);
                    }                diaStation += diaphragmDistance;
                }            while(minStation + md < vStiffStation ){
                    vStiffStation -=diaphragmDistance;}            while(maxStation - md > vStiffStation){
                    if (vStiffStation > minStation + md){
                        gridStation.vStiffner.push(vStiffStation.toFixed(4)*1);
                    }                vStiffStation += diaphragmDistance;
                }            while(minStation + md < connectStation){
                    connectStation -=diaphragmDistance/2;}            while(maxStation - md > connectStation){
                    if (connectStation > minStation + md){
                        gridStation.connection.push(connectStation.toFixed(4)*1);
                    }                connectStation += diaphragmDistance/2;
                }            spanStationList.push(gridStation);
            }        gridStationList.push(spanStationList);
            }    return gridStationList
    }

    function SupportSkewPointGenerator(centralSupportPoint, masterLine, girderLine, supportDatalist, VerticalDataList, SuperElevation) {
      let resultPoint = [];
      for (let i = 0; i < centralSupportPoint.length; i++) {
        let skew = supportDatalist[i].angle;
        if (skew !== 0) {
            let dummyPoint = LineMatch(centralSupportPoint[i], masterLine, girderLine, skew, VerticalDataList, SuperElevation);
            resultPoint.push(dummyPoint);
        } else {
          console.log('Skew value is not available');
          resultPoint = null;
        }
    }   
      return resultPoint
    }

    function GridPointGenerator(masterLine,girderLayout, gridStationList, SEShape, startSkew, endSkew, VerticalDataList, SuperElevation){
        let gridPointStation = [];
        let stationDictList = [];
        const girderNumber = gridStationList.length;
        const spanNumber = gridStationList[0].length;
        let nameToPointDict = {};
        let pointName = "";
        for (let i = 0; i< girderNumber;i++){
            let ptsList = [];
            let stationDict = [];
            let dNum = 1;
            let vNum = 1;
            let cNum = 1;
            let kNum = 1;
            for (let j = 0; j<spanNumber;j++){
                let stationToNameDict = {};
                let skewedStation = [];
                if (j===0){
                    let masterPoint = girderLayout.centralSupportPoint[0];
                    let offset = 0;
                    for (let k = 0; k<3;k++){
                        pointName = "G" + (i+1) + "K" + kNum;
                        kNum +=1;
                        if (k ===0){
                            offset = SEShape.start.A + SEShape.start.D; // neede to minus sign
                        }else if (k===1){
                            offset = SEShape.start.A + SEShape.start.D + SEShape.start.F; // neede to minus sign
                        }else{
                            offset = SEShape.start.A + SEShape.start.D + SEShape.start.F + SEShape.start.G;
                        }
                    let skew = OffsetSkewCalculator(masterPoint, startSkew, offset, masterLine);
                    let centerPoint = PointGenerator(masterPoint.masterStationNumber + offset,masterLine, skew);
                    let skewPoint = LineMatch(centerPoint, masterLine, girderLayout.girderLine[i], skew, VerticalDataList, SuperElevation);                
                    skewedStation.push(skewPoint.masterStationNumber);
                    stationToNameDict[skewPoint.masterStationNumber] = pointName;
                    nameToPointDict[pointName] = skewPoint;
                    }
                }
                for (let k = 0; k<gridStationList[i][j].diaphragm.length;k++){
                    pointName = "G" + (i+1) + "D" + dNum;
                    stationToNameDict[gridStationList[i][j].diaphragm[k]] = pointName;
                    let masterPoint = PointGenerator(gridStationList[i][j].diaphragm[k],masterLine);
                    nameToPointDict[pointName] = SplinePointGenerator(masterPoint, girderLayout.girderSpanPoint[i][j],VerticalDataList, SuperElevation);
                    dNum +=1;
                }
                for (let k = 0; k<gridStationList[i][j].vStiffner.length;k++){
                    pointName = "G" + (i+1) + "V" + vNum;
                    stationToNameDict[gridStationList[i][j].vStiffner[k]] = pointName;
                    let masterPoint = PointGenerator(gridStationList[i][j].vStiffner[k],masterLine);
                    nameToPointDict[pointName] = SplinePointGenerator(masterPoint, girderLayout.girderSpanPoint[i][j],VerticalDataList, SuperElevation);
                    vNum +=1;
                }
                for (let k = 0; k<gridStationList[i][j].connection.length;k++){
                    pointName = "G" + (i+1) + "C" + cNum;
                    stationToNameDict[gridStationList[i][j].connection[k]] = pointName;
                    let masterPoint = PointGenerator(gridStationList[i][j].connection[k],masterLine);
                    nameToPointDict[pointName] = SplinePointGenerator(masterPoint, girderLayout.girderSpanPoint[i][j],VerticalDataList, SuperElevation);
                    cNum +=1;
                }
                pointName = "G" + (i+1) + "S" + (j+1);
                stationToNameDict[girderLayout.girderSupportPoint[i][j+1].masterStationNumber] = pointName;
                nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j+1];
                pointName = "G" + (i+1) + "S" + (j+2);
                stationToNameDict[girderLayout.girderSupportPoint[i][j+2].masterStationNumber] = pointName;
                if (j===spanNumber -1){            
                    nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j+2];
                }
                let pts = [];
                pts.push(girderLayout.girderSpanPoint[i][j][0].masterStationNumber);
                pts.push(girderLayout.girderSpanPoint[i][j][girderLayout.girderSpanPoint[i][j].length-1].masterStationNumber);
                pts.push(...gridStationList[i][j].diaphragm);
                pts.push(...gridStationList[i][j].vStiffner);
                pts.push(...gridStationList[i][j].connection);
                let md = 1000; //mindistance, 단위수정시 check!
                for (let m = 0;m < skewedStation.length;m++){
                    pts.forEach((item, index, array) =>{
                        if (item > skewedStation[m] - md && item < skewedStation[m] + md){
                        pts.splice(index,1);}
                    });
                }
                pts.push(...skewedStation);
                pts.sort();
                // console.log(pts)
                ptsList.push(pts);
                stationDict.push(stationToNameDict);
            }
            gridPointStation.push(ptsList);
            stationDictList.push(stationDict);
        }
        return {gridPointStation, stationDictList, nameToPointDict}
    }

    // export function GirderHeightGenerator(station, girderBaseInfo,nameToPointDict){
    //     let R = 0;
    //     let x1 = 0;
    //     let deltaH = 0;
    //     let L = 0;
    //     let height = 0;
    //     for (let i = 0; i< girderBaseInfo.height.length;i++){
    //         // if (station >= round(girder_height.span_start_station,1) && station <= round(girder_height.L2_start_station,1)){
    //         //     result = girder_height.H1
    //         //     break
    //         // }else if (station > round(girder_height.L2_start_station,1) && station < round(girder_height.L2_end_station,1)){
    //         //     L = girder_height.L2_end_station - girder_height.L2_start_station
    //         //     delta_H = girder_height.H1 - girder_height.H2
    //         //     x1 = girder_height.L2_end_station - station

    //         let sp = nameToPointDict[girderBaseInfo.height[i].start];
    //         let ep = nameToPointDict[girderBaseInfo.height[i].end];
    //         if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
    //             deltaH = girderBaseInfo.height[i].startH - girderBaseInfo.height[i].endH
    //             L = ep.masterStationNumber - sp.masterStationNumber;
    //             if (girderBaseInfo.height[i].type == "circle"){
    //                 if (deltaH>0){
    //                     R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
    //                     x1 = ep.masterStationNumber - station;
    //                     height = girderBaseInfo.height[i].endH + (R -Math.sqrt(R**2 - x1**2));
    //                 }else if (deltaH<0){
    //                     R = Math.abs((L**2 + deltaH**2) / 2 / deltaH)
    //                     x1 = station - sp.masterStationNumber;
    //                     height = girderBaseInfo.height[i].startH + (R -Math.sqrt(R**2 - x1**2))
    //                 }else{
    //                     height = girderBaseInfo.height[i].startH
    //                 }
    //             }else if (girderBaseInfo.height[i].type == "parabola"){
    //                 if (deltaH>0){
    //                     x1 = ep.masterStationNumber - station;
    //                     height = girderBaseInfo.height[i].endH + deltaH / L**2 * x1**2;
    //                 }else if (deltaH<0){
    //                     x1 = station - sp.masterStationNumber;
    //                     height = girderBaseInfo.height[i].startH - deltaH / L**2 * x1**2;
    //                 }else{
    //                     height = girderBaseInfo.height[i].startH
    //                 }
    //             }else{  //straight
    //                 x1 = station - sp.masterStationNumber;
    //                 height = girderBaseInfo.height[i].startH - x1/L * deltaH
    //             }
    //             break;
    //         }
    //     }
    //     return height.toFixed(4)*1
    // }

    function PointSectionInfo(station,skew, girderBaseInfo,nameToPointDict){
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
                deltaH = girderBaseInfo.height[i].startH - girderBaseInfo.height[i].endH;
                L = ep.masterStationNumber - sp.masterStationNumber;
                if (girderBaseInfo.height[i].type == "circle"){
                    if (deltaH>0){
                        R = Math.abs((L**2 + deltaH**2) / 2 / deltaH);
                        x1 = ep.masterStationNumber - station;
                        height = girderBaseInfo.height[i].endH + (R -Math.sqrt(R**2 - x1**2));
                    }else if (deltaH<0){
                        R = Math.abs((L**2 + deltaH**2) / 2 / deltaH);
                        x1 = station - sp.masterStationNumber;
                        height = girderBaseInfo.height[i].startH + (R -Math.sqrt(R**2 - x1**2));
                    }else{
                        height = girderBaseInfo.height[i].startH;
                    }
                }else if (girderBaseInfo.height[i].type == "parabola"){
                    if (deltaH>0){
                        x1 = ep.masterStationNumber - station;
                        height = girderBaseInfo.height[i].endH + deltaH / L**2 * x1**2;
                    }else if (deltaH<0){
                        x1 = station - sp.masterStationNumber;
                        height = girderBaseInfo.height[i].startH - deltaH / L**2 * x1**2;
                    }else{
                        height = girderBaseInfo.height[i].startH;
                    }
                }else{  //straight
                    x1 = station - sp.masterStationNumber;
                    height = girderBaseInfo.height[i].startH - x1/L * deltaH;
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
                deltaH = girderBaseInfo.slabThickness[i].startH - girderBaseInfo.slabThickness[i].endH;
                L = ep.masterStationNumber - sp.masterStationNumber;
                //straight
                x1 = station - sp.masterStationNumber;
                slabThickness = girderBaseInfo.slabThickness[i].startH - x1/L * deltaH;
                break;
            }else{
                slabThickness = 270; // slab thickness추후 예외상황없도록 수정
            }
        }
        forward.slabThickness = slabThickness;
        backward.slabThickness = slabThickness;

        var uFlange = girderBaseInfo.uFlange.filter(function(element){ 
            return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
            });
        if(uFlange.length>0){
            forward.uFlangeThk = uFlange[0].thickness;
            forward.uFlangeW = uFlange[0].startW + (uFlange[0].endW - uFlange[0].startW)* (station - nameToPointDict[uFlange[0].start].masterStationNumber) / (nameToPointDict[uFlange[0].end].masterStationNumber - nameToPointDict[uFlange[0].start].masterStationNumber);
        }
        uFlange = girderBaseInfo.uFlange.filter(function(element){ 
            return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
            });
        if(uFlange.length>0){
            backward.uFlangeThk = uFlange[0].thickness;
            backward.uFlangeW = uFlange[0].startW + (uFlange[0].endW - uFlange[0].startW)* (station - nameToPointDict[uFlange[0].start].masterStationNumber) / (nameToPointDict[uFlange[0].end].masterStationNumber - nameToPointDict[uFlange[0].start].masterStationNumber);
        }

        var lFlange = girderBaseInfo.lFlange.filter(function(element){ 
            return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
            });
        if(lFlange.length>0){
            forward.lFlangeThk = lFlange[0].thickness;
        }
        lFlange = girderBaseInfo.lFlange.filter(function(element){ 
            return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
            });
        if(lFlange.length>0){
            backward.lFlangeThk = lFlange[0].thickness;
        }

        var web = girderBaseInfo.web.filter(function(element){ 
            return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
            });
        if(web.length>0){
            forward.webThk = web[0].thickness;
        }
        web = girderBaseInfo.web.filter(function(element){ 
            return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
            });
        if(web.length>0){
            backward.webThk = web[0].thickness;
        }

        var uRib = girderBaseInfo.uRib.filter(function(element){ 
            return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
            });
        if(uRib.length>0){
            forward.uRibThk = uRib[0].thickness;
            forward.uRibH = uRib[0].height;
            forward.uRibLO = uRib[0].layout;
        }
        uRib = girderBaseInfo.uRib.filter(function(element){ 
            return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
            });
        if(uRib.length>0){
            backward.uRibThk = uRib[0].thickness;
            backward.uRibH = uRib[0].height;
            backward.uRibLO = uRib[0].layout;
        }

        var lRib = girderBaseInfo.lRib.filter(function(element){ 
            return (station >= nameToPointDict[element.start].masterStationNumber && station < nameToPointDict[element.end].masterStationNumber)
            });
        if(lRib.length>0){
            forward.lRibThk = lRib[0].thickness;
            forward.lRibH = lRib[0].height;
            forward.lRibLO = lRib[0].layout;
        }
        lRib = girderBaseInfo.lRib.filter(function(element){ 
            return (station > nameToPointDict[element.start].masterStationNumber && station <= nameToPointDict[element.end].masterStationNumber)
            });
        if(lRib.length>0){
            backward.lRibThk = lRib[0].thickness;
            backward.lRibH = lRib[0].height;
            backward.lRibLO = lRib[0].layout;
        }

        return {forward, backward}
    }

    function OffsetSkewCalculator(masterPoint, masterSkew, offset, masterLine){
        const startSkew = masterSkew;
        let offsetStation = masterPoint.masterStationNumber + offset;
        const offsetPoint = PointGenerator(offsetStation, masterLine);
        let sign = 1;
        if (masterPoint.normalCos * offsetPoint.normalSin - masterPoint.normalSin * offsetPoint.normalCos >= 0){
            sign = 1;
        }else{
            sign = -1;
        }
        let deltaSkew = (Math.acos(masterPoint.normalCos * offsetPoint.normalCos + masterPoint.normalSin * offsetPoint.normalSin) * 180 / Math.PI).toFixed(4)*1;
        let offsetSkew = startSkew - sign * (deltaSkew);
        if (offsetSkew > 90){ offsetSkew -= 180;}
        else if (offsetSkew< -90){ offsetSkew +=180;}
        return offsetSkew
    }

    /**
     * @author Mugen87 / https://github.com/Mugen87
     *
     * Ported from: https://github.com/maurizzzio/quickhull3d/ by Mauricio Poppe (https://github.com/maurizzzio)
     *
     */

    const {
    	Line3,
    	Plane,
    	Triangle,
    	Vector3
    } = global.THREE;

    var ConvexHull = ( function () {

    	var Visible = 0;
    	var Deleted = 1;

    	var v1 = new Vector3();

    	function ConvexHull() {

    		this.tolerance = - 1;

    		this.faces = []; // the generated faces of the convex hull
    		this.newFaces = []; // this array holds the faces that are generated within a single iteration

    		// the vertex lists work as follows:
    		//
    		// let 'a' and 'b' be 'Face' instances
    		// let 'v' be points wrapped as instance of 'Vertex'
    		//
    		//     [v, v, ..., v, v, v, ...]
    		//      ^             ^
    		//      |             |
    		//  a.outside     b.outside
    		//
    		this.assigned = new VertexList();
    		this.unassigned = new VertexList();

    		this.vertices = []; 	// vertices of the hull (internal representation of given geometry data)

    	}

    	Object.assign( ConvexHull.prototype, {

    		setFromPoints: function ( points ) {

    			if ( Array.isArray( points ) !== true ) {

    				console.error( 'THREE.ConvexHull: Points parameter is not an array.' );

    			}

    			if ( points.length < 4 ) {

    				console.error( 'THREE.ConvexHull: The algorithm needs at least four points.' );

    			}

    			this.makeEmpty();

    			for ( var i = 0, l = points.length; i < l; i ++ ) {

    				this.vertices.push( new VertexNode( points[ i ] ) );

    			}

    			this.compute();

    			return this;

    		},

    		setFromObject: function ( object ) {

    			var points = [];

    			object.updateMatrixWorld( true );

    			object.traverse( function ( node ) {

    				var i, l, point;

    				var geometry = node.geometry;

    				if ( geometry !== undefined ) {

    					if ( geometry.isGeometry ) {

    						var vertices = geometry.vertices;

    						for ( i = 0, l = vertices.length; i < l; i ++ ) {

    							point = vertices[ i ].clone();
    							point.applyMatrix4( node.matrixWorld );

    							points.push( point );

    						}

    					} else if ( geometry.isBufferGeometry ) {

    						var attribute = geometry.attributes.position;

    						if ( attribute !== undefined ) {

    							for ( i = 0, l = attribute.count; i < l; i ++ ) {

    								point = new Vector3();

    								point.fromBufferAttribute( attribute, i ).applyMatrix4( node.matrixWorld );

    								points.push( point );

    							}

    						}

    					}

    				}

    			} );

    			return this.setFromPoints( points );

    		},

    		containsPoint: function ( point ) {

    			var faces = this.faces;

    			for ( var i = 0, l = faces.length; i < l; i ++ ) {

    				var face = faces[ i ];

    				// compute signed distance and check on what half space the point lies

    				if ( face.distanceToPoint( point ) > this.tolerance ) return false;

    			}

    			return true;

    		},

    		intersectRay: function ( ray, target ) {

    			// based on "Fast Ray-Convex Polyhedron Intersection"  by Eric Haines, GRAPHICS GEMS II

    			var faces = this.faces;

    			var tNear = - Infinity;
    			var tFar = Infinity;

    			for ( var i = 0, l = faces.length; i < l; i ++ ) {

    				var face = faces[ i ];

    				// interpret faces as planes for the further computation

    				var vN = face.distanceToPoint( ray.origin );
    				var vD = face.normal.dot( ray.direction );

    				// if the origin is on the positive side of a plane (so the plane can "see" the origin) and
    				// the ray is turned away or parallel to the plane, there is no intersection

    				if ( vN > 0 && vD >= 0 ) return null;

    				// compute the distance from the ray’s origin to the intersection with the plane

    				var t = ( vD !== 0 ) ? ( - vN / vD ) : 0;

    				// only proceed if the distance is positive. a negative distance means the intersection point
    				// lies "behind" the origin

    				if ( t <= 0 ) continue;

    				// now categorized plane as front-facing or back-facing

    				if ( vD > 0 ) {

    					//  plane faces away from the ray, so this plane is a back-face

    					tFar = Math.min( t, tFar );

    				} else {

    					// front-face

    					tNear = Math.max( t, tNear );

    				}

    				if ( tNear > tFar ) {

    					// if tNear ever is greater than tFar, the ray must miss the convex hull

    					return null;

    				}

    			}

    			// evaluate intersection point

    			// always try tNear first since its the closer intersection point

    			if ( tNear !== - Infinity ) {

    				ray.at( tNear, target );

    			} else {

    				ray.at( tFar, target );

    			}

    			return target;

    		},

    		intersectsRay: function ( ray ) {

    			return this.intersectRay( ray, v1 ) !== null;

    		},

    		makeEmpty: function () {

    			this.faces = [];
    			this.vertices = [];

    			return this;

    		},

    		// Adds a vertex to the 'assigned' list of vertices and assigns it to the given face

    		addVertexToFace: function ( vertex, face ) {

    			vertex.face = face;

    			if ( face.outside === null ) {

    				this.assigned.append( vertex );

    			} else {

    				this.assigned.insertBefore( face.outside, vertex );

    			}

    			face.outside = vertex;

    			return this;

    		},

    		// Removes a vertex from the 'assigned' list of vertices and from the given face

    		removeVertexFromFace: function ( vertex, face ) {

    			if ( vertex === face.outside ) {

    				// fix face.outside link

    				if ( vertex.next !== null && vertex.next.face === face ) {

    					// face has at least 2 outside vertices, move the 'outside' reference

    					face.outside = vertex.next;

    				} else {

    					// vertex was the only outside vertex that face had

    					face.outside = null;

    				}

    			}

    			this.assigned.remove( vertex );

    			return this;

    		},

    		// Removes all the visible vertices that a given face is able to see which are stored in the 'assigned' vertext list

    		removeAllVerticesFromFace: function ( face ) {

    			if ( face.outside !== null ) {

    				// reference to the first and last vertex of this face

    				var start = face.outside;
    				var end = face.outside;

    				while ( end.next !== null && end.next.face === face ) {

    					end = end.next;

    				}

    				this.assigned.removeSubList( start, end );

    				// fix references

    				start.prev = end.next = null;
    				face.outside = null;

    				return start;

    			}

    		},

    		// Removes all the visible vertices that 'face' is able to see

    		deleteFaceVertices: function ( face, absorbingFace ) {

    			var faceVertices = this.removeAllVerticesFromFace( face );

    			if ( faceVertices !== undefined ) {

    				if ( absorbingFace === undefined ) {

    					// mark the vertices to be reassigned to some other face

    					this.unassigned.appendChain( faceVertices );


    				} else {

    					// if there's an absorbing face try to assign as many vertices as possible to it

    					var vertex = faceVertices;

    					do {

    						// we need to buffer the subsequent vertex at this point because the 'vertex.next' reference
    						// will be changed by upcoming method calls

    						var nextVertex = vertex.next;

    						var distance = absorbingFace.distanceToPoint( vertex.point );

    						// check if 'vertex' is able to see 'absorbingFace'

    						if ( distance > this.tolerance ) {

    							this.addVertexToFace( vertex, absorbingFace );

    						} else {

    							this.unassigned.append( vertex );

    						}

    						// now assign next vertex

    						vertex = nextVertex;

    					} while ( vertex !== null );

    				}

    			}

    			return this;

    		},

    		// Reassigns as many vertices as possible from the unassigned list to the new faces

    		resolveUnassignedPoints: function ( newFaces ) {

    			if ( this.unassigned.isEmpty() === false ) {

    				var vertex = this.unassigned.first();

    				do {

    					// buffer 'next' reference, see .deleteFaceVertices()

    					var nextVertex = vertex.next;

    					var maxDistance = this.tolerance;

    					var maxFace = null;

    					for ( var i = 0; i < newFaces.length; i ++ ) {

    						var face = newFaces[ i ];

    						if ( face.mark === Visible ) {

    							var distance = face.distanceToPoint( vertex.point );

    							if ( distance > maxDistance ) {

    								maxDistance = distance;
    								maxFace = face;

    							}

    							if ( maxDistance > 1000 * this.tolerance ) break;

    						}

    					}

    					// 'maxFace' can be null e.g. if there are identical vertices

    					if ( maxFace !== null ) {

    						this.addVertexToFace( vertex, maxFace );

    					}

    					vertex = nextVertex;

    				} while ( vertex !== null );

    			}

    			return this;

    		},

    		// Computes the extremes of a simplex which will be the initial hull

    		computeExtremes: function () {

    			var min = new Vector3();
    			var max = new Vector3();

    			var minVertices = [];
    			var maxVertices = [];

    			var i, l, j;

    			// initially assume that the first vertex is the min/max

    			for ( i = 0; i < 3; i ++ ) {

    				minVertices[ i ] = maxVertices[ i ] = this.vertices[ 0 ];

    			}

    			min.copy( this.vertices[ 0 ].point );
    			max.copy( this.vertices[ 0 ].point );

    			// compute the min/max vertex on all six directions

    			for ( i = 0, l = this.vertices.length; i < l; i ++ ) {

    				var vertex = this.vertices[ i ];
    				var point = vertex.point;

    				// update the min coordinates

    				for ( j = 0; j < 3; j ++ ) {

    					if ( point.getComponent( j ) < min.getComponent( j ) ) {

    						min.setComponent( j, point.getComponent( j ) );
    						minVertices[ j ] = vertex;

    					}

    				}

    				// update the max coordinates

    				for ( j = 0; j < 3; j ++ ) {

    					if ( point.getComponent( j ) > max.getComponent( j ) ) {

    						max.setComponent( j, point.getComponent( j ) );
    						maxVertices[ j ] = vertex;

    					}

    				}

    			}

    			// use min/max vectors to compute an optimal epsilon

    			this.tolerance = 3 * Number.EPSILON * (
    				Math.max( Math.abs( min.x ), Math.abs( max.x ) ) +
    				Math.max( Math.abs( min.y ), Math.abs( max.y ) ) +
    				Math.max( Math.abs( min.z ), Math.abs( max.z ) )
    			);

    			return { min: minVertices, max: maxVertices };

    		},

    		// Computes the initial simplex assigning to its faces all the points
    		// that are candidates to form part of the hull

    		computeInitialHull: function () {

    			var line3, plane, closestPoint;

    			return function computeInitialHull() {

    				if ( line3 === undefined ) {

    					line3 = new Line3();
    					plane = new Plane();
    					closestPoint = new Vector3();

    				}

    				var vertex, vertices = this.vertices;
    				var extremes = this.computeExtremes();
    				var min = extremes.min;
    				var max = extremes.max;

    				var v0, v1, v2, v3;
    				var i, l, j;

    				// 1. Find the two vertices 'v0' and 'v1' with the greatest 1d separation
    				// (max.x - min.x)
    				// (max.y - min.y)
    				// (max.z - min.z)

    				var distance, maxDistance = 0;
    				var index = 0;

    				for ( i = 0; i < 3; i ++ ) {

    					distance = max[ i ].point.getComponent( i ) - min[ i ].point.getComponent( i );

    					if ( distance > maxDistance ) {

    						maxDistance = distance;
    						index = i;

    					}

    				}

    				v0 = min[ index ];
    				v1 = max[ index ];

    				// 2. The next vertex 'v2' is the one farthest to the line formed by 'v0' and 'v1'

    				maxDistance = 0;
    				line3.set( v0.point, v1.point );

    				for ( i = 0, l = this.vertices.length; i < l; i ++ ) {

    					vertex = vertices[ i ];

    					if ( vertex !== v0 && vertex !== v1 ) {

    						line3.closestPointToPoint( vertex.point, true, closestPoint );

    						distance = closestPoint.distanceToSquared( vertex.point );

    						if ( distance > maxDistance ) {

    							maxDistance = distance;
    							v2 = vertex;

    						}

    					}

    				}

    				// 3. The next vertex 'v3' is the one farthest to the plane 'v0', 'v1', 'v2'

    				maxDistance = - 1;
    				plane.setFromCoplanarPoints( v0.point, v1.point, v2.point );

    				for ( i = 0, l = this.vertices.length; i < l; i ++ ) {

    					vertex = vertices[ i ];

    					if ( vertex !== v0 && vertex !== v1 && vertex !== v2 ) {

    						distance = Math.abs( plane.distanceToPoint( vertex.point ) );

    						if ( distance > maxDistance ) {

    							maxDistance = distance;
    							v3 = vertex;

    						}

    					}

    				}

    				var faces = [];

    				if ( plane.distanceToPoint( v3.point ) < 0 ) {

    					// the face is not able to see the point so 'plane.normal' is pointing outside the tetrahedron

    					faces.push(
    						Face.create( v0, v1, v2 ),
    						Face.create( v3, v1, v0 ),
    						Face.create( v3, v2, v1 ),
    						Face.create( v3, v0, v2 )
    					);

    					// set the twin edge

    					for ( i = 0; i < 3; i ++ ) {

    						j = ( i + 1 ) % 3;

    						// join face[ i ] i > 0, with the first face

    						faces[ i + 1 ].getEdge( 2 ).setTwin( faces[ 0 ].getEdge( j ) );

    						// join face[ i ] with face[ i + 1 ], 1 <= i <= 3

    						faces[ i + 1 ].getEdge( 1 ).setTwin( faces[ j + 1 ].getEdge( 0 ) );

    					}

    				} else {

    					// the face is able to see the point so 'plane.normal' is pointing inside the tetrahedron

    					faces.push(
    						Face.create( v0, v2, v1 ),
    						Face.create( v3, v0, v1 ),
    						Face.create( v3, v1, v2 ),
    						Face.create( v3, v2, v0 )
    					);

    					// set the twin edge

    					for ( i = 0; i < 3; i ++ ) {

    						j = ( i + 1 ) % 3;

    						// join face[ i ] i > 0, with the first face

    						faces[ i + 1 ].getEdge( 2 ).setTwin( faces[ 0 ].getEdge( ( 3 - i ) % 3 ) );

    						// join face[ i ] with face[ i + 1 ]

    						faces[ i + 1 ].getEdge( 0 ).setTwin( faces[ j + 1 ].getEdge( 1 ) );

    					}

    				}

    				// the initial hull is the tetrahedron

    				for ( i = 0; i < 4; i ++ ) {

    					this.faces.push( faces[ i ] );

    				}

    				// initial assignment of vertices to the faces of the tetrahedron

    				for ( i = 0, l = vertices.length; i < l; i ++ ) {

    					vertex = vertices[ i ];

    					if ( vertex !== v0 && vertex !== v1 && vertex !== v2 && vertex !== v3 ) {

    						maxDistance = this.tolerance;
    						var maxFace = null;

    						for ( j = 0; j < 4; j ++ ) {

    							distance = this.faces[ j ].distanceToPoint( vertex.point );

    							if ( distance > maxDistance ) {

    								maxDistance = distance;
    								maxFace = this.faces[ j ];

    							}

    						}

    						if ( maxFace !== null ) {

    							this.addVertexToFace( vertex, maxFace );

    						}

    					}

    				}

    				return this;

    			};

    		}(),

    		// Removes inactive faces

    		reindexFaces: function () {

    			var activeFaces = [];

    			for ( var i = 0; i < this.faces.length; i ++ ) {

    				var face = this.faces[ i ];

    				if ( face.mark === Visible ) {

    					activeFaces.push( face );

    				}

    			}

    			this.faces = activeFaces;

    			return this;

    		},

    		// Finds the next vertex to create faces with the current hull

    		nextVertexToAdd: function () {

    			// if the 'assigned' list of vertices is empty, no vertices are left. return with 'undefined'

    			if ( this.assigned.isEmpty() === false ) {

    				var eyeVertex, maxDistance = 0;

    				// grap the first available face and start with the first visible vertex of that face

    				var eyeFace = this.assigned.first().face;
    				var vertex = eyeFace.outside;

    				// now calculate the farthest vertex that face can see

    				do {

    					var distance = eyeFace.distanceToPoint( vertex.point );

    					if ( distance > maxDistance ) {

    						maxDistance = distance;
    						eyeVertex = vertex;

    					}

    					vertex = vertex.next;

    				} while ( vertex !== null && vertex.face === eyeFace );

    				return eyeVertex;

    			}

    		},

    		// Computes a chain of half edges in CCW order called the 'horizon'.
    		// For an edge to be part of the horizon it must join a face that can see
    		// 'eyePoint' and a face that cannot see 'eyePoint'.

    		computeHorizon: function ( eyePoint, crossEdge, face, horizon ) {

    			// moves face's vertices to the 'unassigned' vertex list

    			this.deleteFaceVertices( face );

    			face.mark = Deleted;

    			var edge;

    			if ( crossEdge === null ) {

    				edge = crossEdge = face.getEdge( 0 );

    			} else {

    				// start from the next edge since 'crossEdge' was already analyzed
    				// (actually 'crossEdge.twin' was the edge who called this method recursively)

    				edge = crossEdge.next;

    			}

    			do {

    				var twinEdge = edge.twin;
    				var oppositeFace = twinEdge.face;

    				if ( oppositeFace.mark === Visible ) {

    					if ( oppositeFace.distanceToPoint( eyePoint ) > this.tolerance ) {

    						// the opposite face can see the vertex, so proceed with next edge

    						this.computeHorizon( eyePoint, twinEdge, oppositeFace, horizon );

    					} else {

    						// the opposite face can't see the vertex, so this edge is part of the horizon

    						horizon.push( edge );

    					}

    				}

    				edge = edge.next;

    			} while ( edge !== crossEdge );

    			return this;

    		},

    		// Creates a face with the vertices 'eyeVertex.point', 'horizonEdge.tail' and 'horizonEdge.head' in CCW order

    		addAdjoiningFace: function ( eyeVertex, horizonEdge ) {

    			// all the half edges are created in ccw order thus the face is always pointing outside the hull

    			var face = Face.create( eyeVertex, horizonEdge.tail(), horizonEdge.head() );

    			this.faces.push( face );

    			// join face.getEdge( - 1 ) with the horizon's opposite edge face.getEdge( - 1 ) = face.getEdge( 2 )

    			face.getEdge( - 1 ).setTwin( horizonEdge.twin );

    			return face.getEdge( 0 ); // the half edge whose vertex is the eyeVertex


    		},

    		//  Adds 'horizon.length' faces to the hull, each face will be linked with the
    		//  horizon opposite face and the face on the left/right

    		addNewFaces: function ( eyeVertex, horizon ) {

    			this.newFaces = [];

    			var firstSideEdge = null;
    			var previousSideEdge = null;

    			for ( var i = 0; i < horizon.length; i ++ ) {

    				var horizonEdge = horizon[ i ];

    				// returns the right side edge

    				var sideEdge = this.addAdjoiningFace( eyeVertex, horizonEdge );

    				if ( firstSideEdge === null ) {

    					firstSideEdge = sideEdge;

    				} else {

    					// joins face.getEdge( 1 ) with previousFace.getEdge( 0 )

    					sideEdge.next.setTwin( previousSideEdge );

    				}

    				this.newFaces.push( sideEdge.face );
    				previousSideEdge = sideEdge;

    			}

    			// perform final join of new faces

    			firstSideEdge.next.setTwin( previousSideEdge );

    			return this;

    		},

    		// Adds a vertex to the hull

    		addVertexToHull: function ( eyeVertex ) {

    			var horizon = [];

    			this.unassigned.clear();

    			// remove 'eyeVertex' from 'eyeVertex.face' so that it can't be added to the 'unassigned' vertex list

    			this.removeVertexFromFace( eyeVertex, eyeVertex.face );

    			this.computeHorizon( eyeVertex.point, null, eyeVertex.face, horizon );

    			this.addNewFaces( eyeVertex, horizon );

    			// reassign 'unassigned' vertices to the new faces

    			this.resolveUnassignedPoints( this.newFaces );

    			return	this;

    		},

    		cleanup: function () {

    			this.assigned.clear();
    			this.unassigned.clear();
    			this.newFaces = [];

    			return this;

    		},

    		compute: function () {

    			var vertex;

    			this.computeInitialHull();

    			// add all available vertices gradually to the hull

    			while ( ( vertex = this.nextVertexToAdd() ) !== undefined ) {

    				this.addVertexToHull( vertex );

    			}

    			this.reindexFaces();

    			this.cleanup();

    			return this;

    		}

    	} );

    	//

    	function Face() {

    		this.normal = new Vector3();
    		this.midpoint = new Vector3();
    		this.area = 0;

    		this.constant = 0; // signed distance from face to the origin
    		this.outside = null; // reference to a vertex in a vertex list this face can see
    		this.mark = Visible;
    		this.edge = null;

    	}

    	Object.assign( Face, {

    		create: function ( a, b, c ) {

    			var face = new Face();

    			var e0 = new HalfEdge( a, face );
    			var e1 = new HalfEdge( b, face );
    			var e2 = new HalfEdge( c, face );

    			// join edges

    			e0.next = e2.prev = e1;
    			e1.next = e0.prev = e2;
    			e2.next = e1.prev = e0;

    			// main half edge reference

    			face.edge = e0;

    			return face.compute();

    		}

    	} );

    	Object.assign( Face.prototype, {

    		getEdge: function ( i ) {

    			var edge = this.edge;

    			while ( i > 0 ) {

    				edge = edge.next;
    				i --;

    			}

    			while ( i < 0 ) {

    				edge = edge.prev;
    				i ++;

    			}

    			return edge;

    		},

    		compute: function () {

    			var triangle;

    			return function compute() {

    				if ( triangle === undefined ) triangle = new Triangle();

    				var a = this.edge.tail();
    				var b = this.edge.head();
    				var c = this.edge.next.head();

    				triangle.set( a.point, b.point, c.point );

    				triangle.getNormal( this.normal );
    				triangle.getMidpoint( this.midpoint );
    				this.area = triangle.getArea();

    				this.constant = this.normal.dot( this.midpoint );

    				return this;

    			};

    		}(),

    		distanceToPoint: function ( point ) {

    			return this.normal.dot( point ) - this.constant;

    		}

    	} );

    	// Entity for a Doubly-Connected Edge List (DCEL).

    	function HalfEdge( vertex, face ) {

    		this.vertex = vertex;
    		this.prev = null;
    		this.next = null;
    		this.twin = null;
    		this.face = face;

    	}

    	Object.assign( HalfEdge.prototype, {

    		head: function () {

    			return this.vertex;

    		},

    		tail: function () {

    			return this.prev ? this.prev.vertex : null;

    		},

    		length: function () {

    			var head = this.head();
    			var tail = this.tail();

    			if ( tail !== null ) {

    				return tail.point.distanceTo( head.point );

    			}

    			return - 1;

    		},

    		lengthSquared: function () {

    			var head = this.head();
    			var tail = this.tail();

    			if ( tail !== null ) {

    				return tail.point.distanceToSquared( head.point );

    			}

    			return - 1;

    		},

    		setTwin: function ( edge ) {

    			this.twin = edge;
    			edge.twin = this;

    			return this;

    		}

    	} );

    	// A vertex as a double linked list node.

    	function VertexNode( point ) {

    		this.point = point;
    		this.prev = null;
    		this.next = null;
    		this.face = null; // the face that is able to see this vertex

    	}

    	// A double linked list that contains vertex nodes.

    	function VertexList() {

    		this.head = null;
    		this.tail = null;

    	}

    	Object.assign( VertexList.prototype, {

    		first: function () {

    			return this.head;

    		},

    		last: function () {

    			return this.tail;

    		},

    		clear: function () {

    			this.head = this.tail = null;

    			return this;

    		},

    		// Inserts a vertex before the target vertex

    		insertBefore: function ( target, vertex ) {

    			vertex.prev = target.prev;
    			vertex.next = target;

    			if ( vertex.prev === null ) {

    				this.head = vertex;

    			} else {

    				vertex.prev.next = vertex;

    			}

    			target.prev = vertex;

    			return this;

    		},

    		// Inserts a vertex after the target vertex

    		insertAfter: function ( target, vertex ) {

    			vertex.prev = target;
    			vertex.next = target.next;

    			if ( vertex.next === null ) {

    				this.tail = vertex;

    			} else {

    				vertex.next.prev = vertex;

    			}

    			target.next = vertex;

    			return this;

    		},

    		// Appends a vertex to the end of the linked list

    		append: function ( vertex ) {

    			if ( this.head === null ) {

    				this.head = vertex;

    			} else {

    				this.tail.next = vertex;

    			}

    			vertex.prev = this.tail;
    			vertex.next = null; // the tail has no subsequent vertex

    			this.tail = vertex;

    			return this;

    		},

    		// Appends a chain of vertices where 'vertex' is the head.

    		appendChain: function ( vertex ) {

    			if ( this.head === null ) {

    				this.head = vertex;

    			} else {

    				this.tail.next = vertex;

    			}

    			vertex.prev = this.tail;

    			// ensure that the 'tail' reference points to the last vertex of the chain

    			while ( vertex.next !== null ) {

    				vertex = vertex.next;

    			}

    			this.tail = vertex;

    			return this;

    		},

    		// Removes a vertex from the linked list

    		remove: function ( vertex ) {

    			if ( vertex.prev === null ) {

    				this.head = vertex.next;

    			} else {

    				vertex.prev.next = vertex.next;

    			}

    			if ( vertex.next === null ) {

    				this.tail = vertex.prev;

    			} else {

    				vertex.next.prev = vertex.prev;

    			}

    			return this;

    		},

    		// Removes a list of vertices whose 'head' is 'a' and whose 'tail' is b

    		removeSubList: function ( a, b ) {

    			if ( a.prev === null ) {

    				this.head = b.next;

    			} else {

    				a.prev.next = b.next;

    			}

    			if ( b.next === null ) {

    				this.tail = a.prev;

    			} else {

    				b.next.prev = a.prev;

    			}

    			return this;

    		},

    		isEmpty: function () {

    			return this.head === null;

    		}

    	} );

    	return ConvexHull;

    } )();

    /**
     * @author Mugen87 / https://github.com/Mugen87
     */

    const { BufferGeometry, Float32BufferAttribute, Geometry } = global.THREE;

    // ConvexGeometry

    var ConvexGeometry = function(points) {
      Geometry.call(this);

      this.fromBufferGeometry(new ConvexBufferGeometry(points));
      this.mergeVertices();
    };

    ConvexGeometry.prototype = Object.create(Geometry.prototype);
    ConvexGeometry.prototype.constructor = ConvexGeometry;

    // ConvexBufferGeometry

    var ConvexBufferGeometry = function(points) {
      BufferGeometry.call(this);

      // buffers

      var vertices = [];
      var normals = [];

      if (ConvexHull === undefined) {
        console.error(
          "THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on ConvexHull"
        );
      }

      var convexHull = new ConvexHull().setFromPoints(points);

      // generate vertices and normals

      var faces = convexHull.faces;

      for (var i = 0; i < faces.length; i++) {
        var face = faces[i];
        var edge = face.edge;

        // we move along a doubly-connected edge list to access all face points (see HalfEdge docs)

        do {
          var point = edge.head().point;

          vertices.push(point.x, point.y, point.z);
          normals.push(face.normal.x, face.normal.y, face.normal.z);

          edge = edge.next;
        } while (edge !== face.edge);
      }

      // build geometry

      this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      this.setAttribute("normal", new Float32BufferAttribute(normals, 3));
    };

    ConvexBufferGeometry.prototype = Object.create(BufferGeometry.prototype);
    ConvexBufferGeometry.prototype.constructor = ConvexBufferGeometry;

    // import {Main} from './mainFunction'

    function LineView(linepoints, initPoint){
        var group = new global.THREE.Group();
        var geometry = new global.THREE.Geometry();
        const xInit = initPoint.x;
        const yInit = initPoint.y;
        const zInit = initPoint.z;
        for (let i = 0; i<linepoints.length;i++){
            geometry.vertices.push( 
            new global.THREE.Vector3	(linepoints[i].x - xInit,linepoints[i].y - yInit,	linepoints[i].z - zInit));
        }
        var line = new global.THREE.Line(
            geometry, new global.THREE.LineBasicMaterial( {color: 0xffff00} )
        );
          group.add(line);
        return [group, geometry]
        //return geometry;
    }

    function GirderFrameView(gridPoint,stationDictList,nameToPointDict,xbeamData,initPoint){
        let mergedGeo = new global.THREE.Geometry();
        var group = new global.THREE.Group();
        const xInit = initPoint.x;
        const yInit = initPoint.y;
        const zInit = initPoint.z;
        for (let j = 0; j<gridPoint.length;j++){
          for (let i=0; i<gridPoint[j].length;i++){
            for (let k=0;k<gridPoint[j][i].length - 1;k++){
              let sStation = gridPoint[j][i][k];
              let eStation = gridPoint[j][i][k+1];
              let spts = nameToPointDict[stationDictList[j][i][sStation]];
              let epts = nameToPointDict[stationDictList[j][i][eStation]];
              var newgeometry = new global.THREE.Geometry();
              newgeometry.vertices.push(new global.THREE.Vector3	(spts.x - xInit,	spts.y - yInit,	spts.z - zInit));
              newgeometry.vertices.push(new global.THREE.Vector3	(epts.x - xInit,	epts.y - yInit,	epts.z - zInit));
              group.add(new global.THREE.Line(newgeometry, new global.THREE.LineBasicMaterial({ color: 0x0000ff })));
              //mergedGeo.mergeMesh(new THREE.Line(newgeometry, new THREE.LineBasicMaterial({ color: 0x0000ff })))
              //mergedGeo.merge()
            }
          }
        }
        for (let i = 0; i<xbeamData.length; i++){
          let spts = nameToPointDict[xbeamData[i].iNode];
          let epts = nameToPointDict[xbeamData[i].jNode];
          var newgeometry = new global.THREE.Geometry();
          newgeometry.vertices.push(new global.THREE.Vector3	(spts.x - xInit,	spts.y - yInit,	spts.z - zInit));
          newgeometry.vertices.push(new global.THREE.Vector3	(epts.x - xInit,	epts.y - yInit,	epts.z - zInit));
          group.add(new global.THREE.Line(newgeometry, new global.THREE.LineBasicMaterial({ color: 0xff00ff })));
          //mergedGeo.mergeMesh(new THREE.Line(newgeometry, new THREE.LineBasicMaterial({ color: 0xff00ff })))
        }
        //return group
        // mergedGeo.mergeMesh(group)
        return group
    }

    function DiaView(nameToPointDict, diaDict,initPoint){
        var group = new global.THREE.Group();
        // var meshMaterial = new THREE.MeshLambertMaterial( {
        //     color: 0x00ffff,
        //     emissive: 0x44aaaa,
        //     opacity: 1,
        //     side:THREE.DoubleSide,
        //     transparent: false,
        //     wireframe : false
        //   } );
        var meshMaterial = new global.THREE.MeshNormalMaterial();
        for (let diakey in diaDict){
           let point = nameToPointDict[diakey];
           for (let partkey in diaDict[diakey]){
           let shapeNode = diaDict[diakey][partkey].points;
           let Thickness = diaDict[diakey][partkey].Thickness;
           let zPosition = diaDict[diakey][partkey].z;
           let rotationY = diaDict[diakey][partkey].rotationY;
           let rotationX = diaDict[diakey][partkey].rotationX;
           let hole = diaDict[diakey][partkey].hole;
           group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial));
            }
        }
        return group
    }

    function XbeamView(nameToPointDict, diaDict,initPoint){
        var group = new global.THREE.Group();
        // var meshMaterial = new THREE.MeshLambertMaterial( {
        //     color: 0x00ffff,
        //     emissive: 0x44aaaa,
        //     opacity: 1,
        //     side:THREE.DoubleSide,
        //     transparent: false,
        //     wireframe : false
        //   } );
        var meshMaterial = new global.THREE.MeshNormalMaterial();
        for (let diakey in diaDict){
        //    let point = nameToPointDict[diakey]
           for (let partkey in diaDict[diakey]){
           let shapeNode = diaDict[diakey][partkey].points;
           let Thickness = diaDict[diakey][partkey].Thickness;
           let zPosition = diaDict[diakey][partkey].z;
           let rotationY = diaDict[diakey][partkey].rotationY;
           let rotationX = diaDict[diakey][partkey].rotationX;
           let hole = diaDict[diakey][partkey].hole;
           let point = diaDict[diakey][partkey].point;
           group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial));
            }
        }
        return group
    }


    function HBracingPlateView(nameToPointDict, hBraicngPlateDict, initPoint){
        var group = new global.THREE.Group();
        // var meshMaterial = new THREE.MeshLambertMaterial( {
        //     color: 0x00ffff,
        //     emissive: 0x44aaaa,
        //     opacity: 1,
        //     side:THREE.DoubleSide,
        //     transparent: false,
        //     wireframe : false
        //   } );
        var meshMaterial = new global.THREE.MeshNormalMaterial();
        for (let pk in hBraicngPlateDict){
           let point = nameToPointDict[pk];
           for (let partkey in hBraicngPlateDict[pk]){
           let shapeNode = hBraicngPlateDict[pk][partkey].points;
           let Thickness = hBraicngPlateDict[pk][partkey].Thickness;
           let zPosition = hBraicngPlateDict[pk][partkey].z;
           let rotationY = hBraicngPlateDict[pk][partkey].rotationY;
           let rotationX = hBraicngPlateDict[pk][partkey].rotationX;
           let hole = hBraicngPlateDict[pk][partkey].hole;
           group.add(diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial));
            }
        }
        return group
    }



    function HBracingView(hBracingList,initPoint){
        var group = new global.THREE.Group();
        // var meshMaterial = new THREE.MeshLambertMaterial( {
        //     color: 0x00ffff,
        //     emissive: 0x44aaaa,
        //     opacity: 1,
        //     side:THREE.DoubleSide,
        //     transparent: false,
        //     wireframe : false
        //   } );
        var meshMaterial = new global.THREE.MeshNormalMaterial();
        for (let i = 0; i<hBracingList.length;i++){
           for (let j = 0; j<hBracingList[i].pointlist.length;j++){
           group.add(convexMesh(hBracingList[i].pointlist[j],initPoint,meshMaterial));
            }
        }
        return group
    }

    function SteelBoxGirder(gridPoint, stationDictList,sectionPointDict,nameToPointDict,initPoint){
        var group = new global.THREE.Group();
        //var mergedGeo = new THREE.Geometry();
        // var meshMaterial = new THREE.MeshLambertMaterial( {
        //     color: 0x00ff00,
        //     emissive: 0x44aa44,
        //     opacity: 1,
        //     side:THREE.DoubleSide,
        //     transparent: false,
        //     wireframe : false
        //   } );
          var meshMaterial = new global.THREE.MeshNormalMaterial();
        let pk1 = "";
        let pk2 = "";
        for (let i = 0; i < gridPoint.length;i++){
            for (let j = 0; j < gridPoint[i].length;j++){
            for (let k = 0; k < gridPoint[i][j].length -1;k++){
                pk1 = stationDictList[i][j][gridPoint[i][j][k]];
                pk2  = stationDictList[i][j][gridPoint[i][j][k+1]];
                let point1 = nameToPointDict[pk1];
                let point2 = nameToPointDict[pk2];

                let plist1 = sectionPointDict[pk1].forward.bottomPlate;
                let plist2 = sectionPointDict[pk2].backward.bottomPlate;
                // mergedGeo.mergeMesh(plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial))
                group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

                plist1 = sectionPointDict[pk1].forward.lWeb;
                plist2 = sectionPointDict[pk2].backward.lWeb;
                // mergedGeo.mergeMesh(plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial))
                group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

                plist1 = sectionPointDict[pk1].forward.rWeb;
                plist2 = sectionPointDict[pk2].backward.rWeb;
                // mergedGeo.mergeMesh(plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial))
                group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

                plist1 = sectionPointDict[pk1].forward.rightTopPlate;
                plist2 = sectionPointDict[pk2].backward.rightTopPlate;
                // mergedGeo.mergeMesh(plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial))
                group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );

                plist1 = sectionPointDict[pk1].forward.leftTopPlate;
                plist2 = sectionPointDict[pk2].backward.leftTopPlate;
                // mergedGeo.mergeMesh(plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial))
                group.add( plateMesh(point1, point2,plist1, plist2,initPoint, meshMaterial) );
                }
            }
        }
        return group
    }



    function ToGlobalPoint(Point, node2D){
        let newPoint = {
            x:0, y:0, z:0
        };
        const cos = - Point.normalCos;
        const sin = - Point.normalSin;
        let skewCot = 0;
        if (Point.skew !=90){
            skewCot = - 1 / Math.tan(Point.skew * Math.PI/180); 
        }    let X = node2D.x;
        let Y = X * skewCot; 
        let Z = node2D.y;

        newPoint.x = Point.x + X * cos - Y*sin; 
        newPoint.y = Point.y + X * sin + Y*cos;
        newPoint.z = Point.z + Z;
        
        return newPoint
    }
    function plateMesh(point1, point2, plist1, plist2, initPoint, meshMaterial){
        let plist = [];
        for (let i = 0; i< plist1.length;i++){ plist.push(ToGlobalPoint(point1, plist1[i])); }
        for (let i = 0; i< plist2.length;i++){ plist.push(ToGlobalPoint(point2, plist2[i])); }
        // let pts = [];
        // for (let i = 0; i<p.length;i++){
        //     pts.push(new THREE.Vector3	(p[i].x - initPoint.x, p[i].y - initPoint.y, p[i].z - initPoint.z))
        // }
        // var meshGeometry = new ConvexBufferGeometry( pts );
        return convexMesh(plist,initPoint,meshMaterial);
    }

    function convexMesh(plist,initPoint,meshMaterial){
        let pts = [];
        for (let i = 0; i<plist.length;i++){
            pts.push(new global.THREE.Vector3	(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z));
        }
        var meshGeometry = new ConvexBufferGeometry( pts );
        return new global.THREE.Mesh( meshGeometry, meshMaterial );
    }

    function diaMesh(point, shapeNode, Thickness, zPosition, rotationX, rotationY, hole, initPoint, meshMaterial){
        var shape = new global.THREE.Shape();
        var shapeNodeVectors = [];
        for (let i = 0; i<shapeNode.length;i++){
            shapeNodeVectors.push(new global.THREE.Vector2( shapeNode[i].x,shapeNode[i].y));
        }
        shape.setFromPoints(shapeNodeVectors);
        if (hole.length > 0){
            var holeVectors = [];
            for (let i = 0; i<hole.length;i++){
                holeVectors.push(new global.THREE.Vector2( hole[i].x, hole[i].y));
            }
            var holeShape = new global.THREE.Shape();
            holeShape.setFromPoints(holeVectors);
            shape.holes.push(holeShape);
        }

        var geometry = new global.THREE.ExtrudeBufferGeometry(shape,{depth: Thickness, steps: 1,bevelEnabled: false});
        var mesh = new global.THREE.Mesh(geometry, meshMaterial);
        var rad = Math.atan( - point.normalCos/point.normalSin) + Math.PI/2;  //+ 
        
        mesh.rotation.set(rotationX,rotationY,0); //(rotationY - 90)*Math.PI/180
        mesh.rotateOnWorldAxis(new global.THREE.Vector3(0,0,1),rad);
        mesh.position.set(point.x - initPoint.x, point.y- initPoint.y, point.z- initPoint.z);
        mesh.translateZ(zPosition);
        return mesh
    }

    function sectionPoint(sectionInfo, pointSectionInfo, gradient){
        const lWebCot = (sectionInfo.B/2 - sectionInfo.UL) / sectionInfo.H;
        const rWebCot = (sectionInfo.UR - sectionInfo.B/2) / sectionInfo.H;
        const lWebCos = sectionInfo.H / Math.sqrt((sectionInfo.B/2 - sectionInfo.UL)**2 + sectionInfo.H**2);
        const rWebCos = sectionInfo.H / Math.sqrt((sectionInfo.UR - sectionInfo.B/2)**2 + sectionInfo.H**2);
        const height = pointSectionInfo.forward.height;
        const deltaH = height - sectionInfo.H;
        const centerThickness = 270; //  slab변수 추가
        let forward = {};
        let backward = {};
        let ps = {};
        let skew = pointSectionInfo.forward.skew;
        for (let i = 0; i < 2;i++){
            if (i === 0) {
                ps = pointSectionInfo.forward;
            } else {
                ps = pointSectionInfo.backward;
            }
            let lfThickness = ps.lFlangeThk;
            let webThickness = ps.webThk;
            let ufWidth = ps.uFlangeW;
            let ufThickness = ps.uFlangeThk;
            let lwt = webThickness / lWebCos;
            let rwt = webThickness / rWebCos;
            let slabThickness = ps.slabThickness - centerThickness;
            // leftWeb
            let blwX = - sectionInfo.B/2 - deltaH * lWebCot;
            let tlwX = (- sectionInfo.UL - slabThickness * lWebCot) / (1 - gradient * lWebCot);
            let lWeb = [
                {x: blwX, y: - height},
                {x: tlwX, y: gradient*tlwX - slabThickness},
                {x: (tlwX - lwt), y: gradient*(tlwX - lwt) - slabThickness},
                {x: (blwX - lwt), y: - height},
            ];
            // rightWeb
            let brwX = sectionInfo.B/2 -deltaH * rWebCot;
            let trwX = (sectionInfo.UR - slabThickness * rWebCot) / (1 - gradient * rWebCot);
            let rWeb = [
                {x: brwX, y: - height},
                {x: trwX, y: gradient*trwX- slabThickness},
                {x: (trwX + rwt), y: gradient*(trwX + rwt)- slabThickness},
                {x: (brwX + rwt), y: - height}
            ];
            // bottomplate
            let blx= - sectionInfo.B/2 - deltaH * lWebCot -sectionInfo.C1;
            let brx= sectionInfo.B/2 -deltaH * rWebCot + sectionInfo.D1;
            let bottomPlate = [
            {x: blx, y:  - height},
            {x: brx, y:  - height},
            {x: brx, y:  - height - lfThickness},
            {x: blx, y:  - height - lfThickness}

            ];
            // TopPlate
            let gcos = 1 / Math.sqrt(1 + gradient**2);
            let gsin = gradient * gcos;
            let addedX = - gsin * ufThickness;
            let addedZ = gcos * ufThickness;
            let tlx = (- sectionInfo.UL - sectionInfo.C - slabThickness * lWebCot) / (1 - gradient * lWebCot);
            let tlx2 = (- sectionInfo.UL - sectionInfo.C + ufWidth - slabThickness * lWebCot) / (1 - gradient * lWebCot);
            let trx = (sectionInfo.UR + sectionInfo.D - slabThickness * rWebCot) / (1 - gradient * rWebCot);
            let trx2 = (sectionInfo.UR + sectionInfo.D - ufWidth - slabThickness * rWebCot) / (1 - gradient * rWebCot);
            let topPlate1 = [
                {x: tlx, y: gradient*tlx- slabThickness},
                {x: tlx2, y: gradient*tlx2 - slabThickness},
                {x: (tlx2 + addedX), y: gradient*(tlx2 + addedX) + addedZ - slabThickness},
                {x: (tlx + addedX), y: gradient*(tlx + addedX) + addedZ- slabThickness}
            ];
            let topPlate2 = [
                {x: trx, y: gradient*trx- slabThickness},
                {x: trx2, y: gradient*trx2- slabThickness},
                {x: (trx2 + addedX), y: gradient*(trx2 + addedX) + addedZ- slabThickness},
                {x: (trx + addedX), y: gradient*(trx + addedX) + addedZ- slabThickness}
            ];
            if (i===0){
                forward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb};    
            }else {
                backward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb};    
            }
        }

        return {forward, backward}
      }


      function diaphragmSection(webPoints, skew, uflangePoint, diaSection){ //ribPoint needed
        // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
        const bl = webPoints[0];
        const tl = webPoints[1];
        const br = webPoints[2];
        const tr = webPoints[3];
        var rotationY = (skew - 90)*Math.PI/180;
        const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
        const rwCot = (tr.x - br.x)/(tr.y-br.y);

        var lowerHeight = diaSection.lowerHeight;
        var lowerThickness = diaSection.lowerThickness;
        var lowerTopThickness = diaSection.lowerTopThickness;
        var lowerTopwidth = diaSection.lowerTopwidth;
        var upperThickness = diaSection.upperThickness;
        var longiRibHeight = diaSection.longiRibHeight;
        var longiRibRayout = diaSection.longiRibRayout;
        var upperHeight = diaSection.upperHeight;
        var sideHeight = diaSection.sideHeight;
        var sideThickness = diaSection.sideThickness;
        var leftsideTopwidth = diaSection.leftsideTopwidth;
        var leftsideTopThickness = diaSection.leftsideTopThickness;
        var leftsideToplength = diaSection.leftsideToplength;
        var rightsideTopwidth = diaSection.rightsideTopwidth;
        var rightsideTopThickness = diaSection.rightsideTopThickness;
        var rightsideToplength = diaSection.rightsideToplength;
        var upperTopThickness = diaSection.upperTopThickness;
        var upperTopwidth = diaSection.upperTopwidth;
        // added variables
        var scallopRadius = diaSection.scallopRadius;
        var ribHoleD = diaSection.ribHoleD;
        var ribHoleR = diaSection.ribHoleR;
        //L100x100x10 section point, origin = (0,0)
        var spc = diaSection.spc;
        var pts = diaSection.pts;

        ///lower stiffener
        var lowerPlate = [
          {x:bl.x + lwCot * lowerHeight,y:bl.y + lowerHeight}, bl, br,
          {x:br.x + rwCot * lowerHeight,y:br.y + lowerHeight}
        ];
        var lowerPoints = [];
        lowerPoints.push(lowerPlate[0]);
        // points.push(plate[1]);
        lowerPoints = lowerPoints.concat(scallop(tl,bl,br,scallopRadius,4));
        //// longitudinal stiffner holes
        for (let i=0; i<longiRibRayout.length;i++){
          lowerPoints.push({x:longiRibRayout[i] - ribHoleD, y:lowerPlate[1].y});
          var curve = new global.THREE.ArcCurve(longiRibRayout[i],lowerPlate[1].y + longiRibHeight, ribHoleR, Math.PI,0,true);
          var dummyVectors = curve.getPoints(8);
          for (let i = 0; i< dummyVectors.length;i++){
            lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y});
          }
          lowerPoints.push({x:longiRibRayout[i] + ribHoleD,y:lowerPlate[1].y});
        }
        ////
        lowerPoints = lowerPoints.concat(scallop(bl,br,tr,scallopRadius,4));
        lowerPoints.push(lowerPlate[3]);
        ////
        var lowerTopPoints = [lowerPlate[0],
                              {x:bl.x + lwCot * (lowerHeight+lowerTopThickness), y:bl.y + (lowerHeight+lowerTopThickness)},
                              {x:br.x + rwCot * (lowerHeight+lowerTopThickness), y:bl.y + (lowerHeight+lowerTopThickness)},
                              lowerPlate[3]];
        
        ///upper stiffener
        var upperPlate = [];
        upperPlate.push({x:tl.x, y:tl.y});
        upperPlate.push({x:tl.x - lwCot * upperHeight,y: tl.y -upperHeight});
        upperPlate.push({x:tr.x - rwCot * upperHeight,y: tr.y -upperHeight});
        upperPlate.push({x:tr.x, y:tr.y});
        var upperPoints = [];
        upperPoints = upperPoints.concat(scallop(upperPlate[3],upperPlate[0],upperPlate[1],scallopRadius,4));
        upperPoints.push(upperPlate[1]);
        upperPoints.push(upperPlate[2]);
        upperPoints = upperPoints.concat(scallop(upperPlate[2],upperPlate[3],upperPlate[0],scallopRadius,4));
        //upperTopPlate
        var gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 );
        var gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x);
        var upperTopPoints = [
          {x: uflangePoint[0].x, y: uflangePoint[0].y},
          {x: uflangePoint[0].x + gcos* upperTopThickness, y: uflangePoint[0].y + gsin* upperTopThickness},
          {x: uflangePoint[2].x + gcos* upperTopThickness, y: uflangePoint[2].y + gsin* upperTopThickness},
          {x: uflangePoint[2].x, y: uflangePoint[2].y}
        ];
        ////left side stiffner
        var leftPlate = [
          {x:bl.x + lwCot * (lowerHeight+lowerTopThickness),y:bl.y + (lowerHeight+lowerTopThickness)}, 
          {x:bl.x + lwCot * (lowerHeight+lowerTopThickness) + sideHeight*gsin,y:bl.y + (lowerHeight+lowerTopThickness)},
          {x:tl.x - lwCot * (upperHeight+leftsideTopThickness)*gsin + sideHeight * gsin,y:tl.y - (upperHeight+leftsideTopThickness)*gsin - sideHeight * gcos},
          {x:tl.x - lwCot * (upperHeight+leftsideTopThickness)*gsin, y:tl.y - (upperHeight+leftsideTopThickness)*gsin}
        ];
    //   ////right side stiffner
        var rightPlate = [
          {x:br.x + rwCot * (lowerHeight+lowerTopThickness), y:br.y + (lowerHeight+lowerTopThickness)}, 
          {x:br.x + rwCot * (lowerHeight+lowerTopThickness) - sideHeight*gsin,y:br.y + (lowerHeight+lowerTopThickness)},
          {x:tr.x - rwCot * (upperHeight+leftsideTopThickness)*gsin - sideHeight * gsin,y:tr.y - (upperHeight+leftsideTopThickness)*gsin + sideHeight * gcos},
          {x:tr.x - rwCot * (upperHeight+leftsideTopThickness)*gsin, y:tr.y - (upperHeight+leftsideTopThickness)*gsin}
        ];
      ////leftside top plate
      var leftTopPlate = [
        leftPlate[3],
        upperPlate[1],
        {x:upperPlate[1].x + leftsideTopwidth*gsin, y: upperPlate[1].y - leftsideTopwidth * gcos  },
        {x:upperPlate[1].x + leftsideTopwidth*gsin - leftsideTopThickness*gcos, y: upperPlate[1].y - leftsideTopwidth * gcos - leftsideTopThickness*gsin }
      ];
      ////rightside top plate
      var rightTopPlate = [
        rightPlate[3],
        upperPlate[2],
        {x:upperPlate[2].x - rightsideTopwidth*gsin, y: upperPlate[2].y + rightsideTopwidth * gcos  },
        {x:upperPlate[2].x - rightsideTopwidth*gsin - rightsideTopThickness*gcos, y: upperPlate[2].y + rightsideTopwidth * gcos - rightsideTopThickness*gsin }
      ]; 
      // k-frame diaphragm
        var leftline =  [{x:-spc*gsin,y:-spc*gcos},lowerTopPoints[1]];
        var lcos = (leftline[1].x - leftline[0].x) / Math.sqrt((leftline[1].x - leftline[0].x)**2 + (leftline[1].y - leftline[0].y)**2);
        var ltan = (leftline[1].y - leftline[0].y) / (leftline[1].x - leftline[0].x);
        var lsin = lcos * ltan;
        var newleftline = [
          {x:leftline[0].x - (spc - lcos * pts[0]) / ltan, y: leftline[0].y - (spc - lcos * pts[0])},
          {x:leftline[1].x + (spc - lsin * pts[0]), y: leftline[1].y + ltan * (spc - lsin * pts[0])}
        ];
        var leftframe1 = [
          {x:newleftline[0].x + pts[0] * lsin,y:newleftline[0].y - pts[0] * lcos},
          {x:newleftline[0].x + pts[1] * lsin,y:newleftline[0].y - pts[1] * lcos},
          {x:newleftline[1].x + pts[1] * lsin,y:newleftline[1].y - pts[1] * lcos},
          {x:newleftline[1].x + pts[0] * lsin,y:newleftline[1].y - pts[0] * lcos}
        ];
        var leftframe2 = [
          {x:newleftline[0].x + pts[1] * lsin,y:newleftline[0].y - pts[1] * lcos},
          {x:newleftline[0].x + pts[2] * lsin,y:newleftline[0].y - pts[2] * lcos},
          {x:newleftline[1].x + pts[2] * lsin,y:newleftline[1].y - pts[2] * lcos},
          {x:newleftline[1].x + pts[1] * lsin,y:newleftline[1].y - pts[1] * lcos}
        ];
        var rightline = [{x:spc*gsin,y:spc*gcos},lowerTopPoints[2]];
        var rcos = (rightline[1].x - rightline[0].x) / Math.sqrt((rightline[1].x - rightline[0].x)**2 + (rightline[1].y - rightline[0].y)**2);
        var rtan = (rightline[1].y - rightline[0].y) / (rightline[1].x - rightline[0].x);
        var rsin = rcos * rtan;
        var newrightline = [
          {x:rightline[0].x - (spc + rcos * pts[0]) / rtan, y: rightline[0].y - (spc + rcos * pts[0])},
          {x:rightline[1].x - (spc - rsin * pts[0]), y: rightline[1].y - rtan * (spc - rsin * pts[0])}
        ];
        var rightframe1 = [
          {x:newrightline[0].x - pts[0] * rsin,y:newrightline[0].y + pts[0] * rcos},
          {x:newrightline[0].x - pts[1] * rsin,y:newrightline[0].y + pts[1] * rcos},
          {x:newrightline[1].x - pts[1] * rsin,y:newrightline[1].y + pts[1] * rcos},
          {x:newrightline[1].x - pts[0] * rsin,y:newrightline[1].y + pts[0] * rcos}
        ];
        var rightframe2 = [
          {x:newrightline[0].x - pts[1] * rsin,y:newrightline[0].y + pts[1] * rcos},
          {x:newrightline[0].x - pts[2] * rsin,y:newrightline[0].y + pts[2] * rcos},
          {x:newrightline[1].x - pts[2] * rsin,y:newrightline[1].y + pts[2] * rcos},
          {x:newrightline[1].x - pts[1] * rsin,y:newrightline[1].y + pts[1] * rcos}
        ];
          return {
            lowershape:{points:lowerPoints,Thickness:lowerThickness,z:-lowerThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]}, 
            lowerTopShape: {points:lowerTopPoints,Thickness:lowerTopwidth,z:-lowerTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            upperShape: {points:upperPoints,Thickness:upperThickness,z:-upperThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            upperTopShape:{points:upperTopPoints,Thickness:upperTopwidth,z:-upperTopwidth/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            leftPlateShape:{points:leftPlate, Thickness:sideThickness,z:-sideThickness/2, rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            rightPlateShape:{points:rightPlate, Thickness:sideThickness,z:-sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            leftTopPlateShape:{points:leftTopPlate, Thickness:leftsideToplength,z:-leftsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            rightTopPlateShape:{points:rightTopPlate, Thickness:rightsideToplength,z:-rightsideToplength/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            leftframe1:{points:leftframe1, Thickness:pts[3],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            leftframe2:{points:leftframe2, Thickness:pts[4],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            rightframe1:{points:rightframe1, Thickness:pts[3],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
            rightframe2:{points:rightframe2, Thickness:pts[4],z: sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
          }
      }

      function diaphragmSection2(webPoints, skew, uflangePoint, diaSection){ //ribPoint needed
        // webPoint => lweb + rweb  inner 4points(bl, tl, br, tr)
        const result = {};
        const plateThickness = diaSection.plateThickness;
        const holeBottomOffset = diaSection.holeBottomOffset;
        const holeRightOffset = diaSection.holeRightOffset;
        const holeFilletR = diaSection.holeFilletR;
        const holeHeight = diaSection.holeHeight;
        const holeWidth = diaSection.holeWidth;
        const vStiffThickness = diaSection.vStiffThickness;
        const vStiffWidth = diaSection.vStiffWidth;
        const vStiffLayout = diaSection.vStiffLayout;
        const topPlateWidth = diaSection.topPlateWidth;
        const topPlateThickness = diaSection.topPlateThickness;
        
        const hStiffThickness = diaSection.hStiffThickness;
        const hStiffWidth = diaSection.hStiffWidth;
        const hStiffBottomOffset = diaSection.hStiffBottomOffset;
        // var longiRibHeight = diaSection.longiRibHeight;
        // var longiRibRayout = diaSection.longiRibRayout;
        const holeVstiffnerThickness = diaSection.holeVstiffnerThickness;
        const holeVstiffnerhight = diaSection.holeVstiffnerhight;
        const holeVstiffnerLength = diaSection.holeVstiffnerLength;
        const holeHstiffnerThickness = diaSection.holeHstiffnerThickness;
        const holeHstiffnerHeight = diaSection.holeHstiffnerHeight;
        const holeHstiffnerLength = diaSection.holeHstiffnerLength;
        const holeStiffSpacing = diaSection.holeStiffSpacing;
        // added variables
        var scallopRadius = diaSection.scallopRadius;


        const bl = webPoints[0];
        const tl = webPoints[1];
        const br = webPoints[2];
        const tr = webPoints[3];

        const gradient =  (tr.y - tl.y) / (tr.x - tl.x);

        const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
        const rwCot = (tr.x - br.x)/(tr.y-br.y);
        const cosec = Math.abs(1/Math.sin(skew * Math.PI/180));
        const cot = Math.abs(1/Math.tan(skew * Math.PI/180));
        const rotationY = (skew - 90)*Math.PI/180;

        let vstiffX1 = (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness;
        let vstiffX2 = holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness;
        let vstiffX3 = vStiffLayout[0] - vStiffThickness / 2;
        let vstiffX4 = vStiffLayout[0] + vStiffThickness / 2;
        let vstiffX5 = vStiffLayout[1] - vStiffThickness / 2;
        let vstiffX6 = vStiffLayout[1] + vStiffThickness / 2;

        var hStiff1 = [
          {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
          {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot - (plateThickness/2) * cosec},
          {x: vstiffX1 ,y:-(vstiffX1) * cot - (plateThickness/2) * cosec},
          {x: vstiffX1 ,y:-(vstiffX1) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
        ];
        var hStiff2 = [
          {x: vstiffX2,y: -(vstiffX2) * cot - (holeVstiffnerhight + plateThickness/2) * cosec},
          {x: vstiffX2,y: -(vstiffX2) * cot - (plateThickness/2) * cosec},
          {x: vstiffX3 ,y:-(vstiffX3) * cot - (plateThickness/2) * cosec},
          {x: vstiffX3 ,y:-(vstiffX3) * cot - (hStiffWidth + plateThickness/2) * cosec},
        ];
        var hStiff3 = [
          {x: vstiffX4,y: -(vstiffX4) * cot - (hStiffWidth + plateThickness/2) * cosec},
          {x: vstiffX4,y: -(vstiffX4) * cot - (plateThickness/2) * cosec},
          {x: vstiffX5 ,y:-(vstiffX5) * cot - (plateThickness/2) * cosec},
          {x: vstiffX5 ,y:-(vstiffX5) * cot - (hStiffWidth + plateThickness/2) * cosec},
        ];
        var hStiff4 = [
          {x: vstiffX6,y: -(vstiffX6) * cot - (hStiffWidth + plateThickness/2) * cosec},
          {x: vstiffX6,y: -(vstiffX6) * cot - (plateThickness/2) * cosec},
          {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (plateThickness/2) * cosec},
          {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot - (hStiffWidth + plateThickness/2) * cosec},
        ];
        result['hStiff1'] = {points:hStiff1,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
        result['hStiff2'] = {points:hStiff2,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
        result['hStiff3'] = {points:hStiff3,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
        result['hStiff4'] = {points:hStiff4,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};

        var hStiff5 = [
          {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
          {x:bl.x + hStiffBottomOffset * lwCot ,y:-(bl.x + hStiffBottomOffset * lwCot) * cot + (plateThickness/2) * cosec},
          {x: vstiffX1 ,y:-(vstiffX1) * cot + (plateThickness/2) * cosec},
          {x: vstiffX1 ,y:-(vstiffX1) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
        ];
        var hStiff6 = [
          {x: vstiffX2,y: -(vstiffX2) * cot + (holeVstiffnerhight + plateThickness/2) * cosec},
          {x: vstiffX2,y: -(vstiffX2) * cot + (plateThickness/2) * cosec},
          {x: vstiffX3 ,y:-(vstiffX3) * cot + (plateThickness/2) * cosec},
          {x: vstiffX3 ,y:-(vstiffX3) * cot + (hStiffWidth + plateThickness/2) * cosec},
        ];
        var hStiff7 = [
          {x: vstiffX4,y: -(vstiffX4) * cot + (hStiffWidth + plateThickness/2) * cosec},
          {x: vstiffX4,y: -(vstiffX4) * cot + (plateThickness/2) * cosec},
          {x: vstiffX5 ,y:-(vstiffX5) * cot + (plateThickness/2) * cosec},
          {x: vstiffX5 ,y:-(vstiffX5) * cot + (hStiffWidth + plateThickness/2) * cosec},
        ];
        var hStiff8 = [
          {x: vstiffX6,y: -(vstiffX6) * cot + (hStiffWidth + plateThickness/2) * cosec},
          {x: vstiffX6,y: -(vstiffX6) * cot + (plateThickness/2) * cosec},
          {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (plateThickness/2) * cosec},
          {x:br.x + hStiffBottomOffset * rwCot ,y:-(br.x + hStiffBottomOffset * rwCot) * cot + (hStiffWidth + plateThickness/2) * cosec},
        ];
        result['hStiff5'] = {points:hStiff5,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
        result['hStiff6'] = {points:hStiff6,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
        result['hStiff7'] = {points:hStiff7,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};
        result['hStiff8'] = {points:hStiff8,Thickness:hStiffThickness,z: bl.y + hStiffBottomOffset,rotationX:0,rotationY:0,hole:[]};

        // var ribHoleD = diaSection.ribHoleD;
        // var ribHoleR = diaSection.ribHoleR;

        // hole stiffner
        var holeVStiff1 = [
          {x: holeRightOffset / cosec + holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
          {x: holeRightOffset / cosec+ holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
          {x: holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
          {x: holeRightOffset / cosec+ holeStiffSpacing + holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
        ];
        result['holeVStiff1'] = { 
          points:holeVStiff1,
          Thickness: holeVstiffnerhight ,
          z: holeVStiff1[0].x * cot + plateThickness/2,
          rotationX:Math.PI/2,
          rotationY:0,
          hole:[]};

        var holeVStiff2 = [
          {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
          {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
          {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 + holeVstiffnerLength /2},
          {x: (holeRightOffset- holeWidth) / cosec - holeStiffSpacing - holeVstiffnerThickness, y: bl.y + holeBottomOffset + holeHeight/2 - holeVstiffnerLength /2},
        ];
        result['holeVStiff2'] = { 
          points:holeVStiff2,
          Thickness: holeVstiffnerhight ,
          z: holeVStiff2[0].x * cot + plateThickness/2,
          rotationX:Math.PI/2,
          rotationY:0,
          hole:[]};

          var holeHStiff1 = [
            {x: (holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2)*cot},
            {x: (holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2)*cot},
            {x: (holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec + holeHstiffnerLength/2)*cot + holeHstiffnerHeight * cosec},
            {x: (holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2, y: -((holeRightOffset- holeWidth/2) / cosec - holeHstiffnerLength/2)*cot + holeHstiffnerHeight * cosec},
          ];
        result['holeHStiff1'] = { 
          points:holeHStiff1,
          Thickness: holeHstiffnerThickness ,
          z: bl.y + holeBottomOffset + holeHeight + holeStiffSpacing,
          rotationX:0,
          rotationY:0,
          hole:[]};

        result['holeHStiff2'] = { 
          points:holeHStiff1,
          Thickness: - holeHstiffnerThickness ,
          z: bl.y + holeBottomOffset - holeStiffSpacing,
          rotationX:0,
          rotationY:0,
          hole:[]};


        // vertical stiffener 
        for (let i = 0; i<vStiffLayout.length;i++){
          let name = 'verticalStiffner' + (i+1);
          let Points = [ 
            {x:vStiffLayout[i] - vStiffThickness / 2,y: bl.y},
            {x:vStiffLayout[i] + vStiffThickness / 2,y: bl.y},
            {x:vStiffLayout[i] + vStiffThickness / 2,y: tl.y  + ((vStiffLayout[i] + vStiffThickness / 2) - tl.x) * gradient},
            {x:vStiffLayout[i] - vStiffThickness / 2,y: tl.y + ((vStiffLayout[i] - vStiffThickness / 2)- tl.x) * gradient},
          ];

          result[name] = { 
              points:Points,
              Thickness:vStiffWidth,
              z: vStiffLayout[i] * cot - vStiffWidth/2,
              rotationX:Math.PI/2,
              rotationY:0,
              hole:[]};
        }

        // topPlate
        var topPlate = [
          {x:uflangePoint[0].x,y:-uflangePoint[0].x * cot + topPlateWidth/2 *cosec },
          {x:uflangePoint[0].x,y:-uflangePoint[0].x * cot - topPlateWidth/2 *cosec },
          {x:uflangePoint[2].x,y:-uflangePoint[2].x * cot - topPlateWidth/2 *cosec },
          {x:uflangePoint[2].x,y:-uflangePoint[2].x * cot + topPlateWidth/2 *cosec },
        ];
        result['topPlate'] = { 
          points:topPlate,
          Thickness:topPlateThickness,
          z: tl.y - tl.x * gradient,
          rotationX:0,
          rotationY:-Math.atan(gradient),
          hole:[]};


        ///lower stiffener
        var mainPlate = [
          {x: tl.x * cosec, y:tl.y}, 
          {x: bl.x * cosec, y:bl.y}, 
          {x: br.x * cosec, y:br.y}, 
          {x: tr.x * cosec, y:tr.y}, 
        ];
        var diaPoints = [];
        diaPoints = diaPoints.concat(scallop(mainPlate[3],mainPlate[0],mainPlate[1],scallopRadius,4));
        // points.push(plate[1]);
        diaPoints = diaPoints.concat(scallop(mainPlate[0],mainPlate[1],mainPlate[2],scallopRadius,4));
        //// longitudinal stiffner holes
        // for (let i=0; i<longiRibRayout.length;i++){
        //   lowerPoints.push({x:longiRibRayout[i] - ribHoleD, y:lowerPlate[1].y});
        //   var curve = new THREE.ArcCurve(longiRibRayout[i],lowerPlate[1].y + longiRibHeight, ribHoleR, Math.PI,0,true);
        //   var dummyVectors = curve.getPoints(8)
        //   for (let i = 0; i< dummyVectors.length;i++){
        //     lowerPoints.push({x:dummyVectors[i].x, y:dummyVectors[i].y})
        //   }
        //   lowerPoints.push({x:longiRibRayout[i] + ribHoleD,y:lowerPlate[1].y});
        // }
        ////
        diaPoints = diaPoints.concat(scallop(mainPlate[1],mainPlate[2],mainPlate[3],scallopRadius,4));
        diaPoints = diaPoints.concat(scallop(mainPlate[2],mainPlate[3],mainPlate[0],scallopRadius,4));
        ////

        var holePoints = [];
        var holeRect = [
          {x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset },
          {x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset },
          {x: holeRightOffset - holeWidth, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
          {x: holeRightOffset, y: (bl.y + br.y) / 2 + holeBottomOffset + holeHeight },
        ];
        holePoints = holePoints.concat(Fillet2D(holeRect[0], holeRect[1], holeRect[2], holeFilletR, 4));
        holePoints = holePoints.concat(Fillet2D(holeRect[1], holeRect[2], holeRect[3], holeFilletR, 4));
        holePoints = holePoints.concat(Fillet2D(holeRect[2], holeRect[3], holeRect[0], holeFilletR, 4));
        holePoints = holePoints.concat(Fillet2D(holeRect[3], holeRect[0], holeRect[1], holeFilletR, 4));
        result['mainPlate'] = {points:diaPoints,Thickness:plateThickness,z:- plateThickness/2,rotationX:Math.PI/2,rotationY:rotationY, hole:holePoints};
          
        return result
      }

      function vStiffSection(webPoints, skew, uflangePoint, vSection){

        const bl = webPoints[0];
        const tl = webPoints[1];
        const br = webPoints[2];
        const tr = webPoints[3];
        var gcos = (uflangePoint[1].x - uflangePoint[0].x)/Math.sqrt((uflangePoint[1].x - uflangePoint[0].x)**2 +(uflangePoint[1].y - uflangePoint[0].y)**2 );
        var gsin = gcos * (uflangePoint[1].y - uflangePoint[0].y) / (uflangePoint[1].x - uflangePoint[0].x);
        const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
        const rwCot = (tr.x - br.x)/(tr.y-br.y);
        const lcos = (tl.x - bl.x) / Math.sqrt((tl.x - bl.x)**2 + (tl.y - bl.y)**2);
        const lsin = lcos / lwCot;
        const rcos = (tr.x - br.x) / Math.sqrt((tr.x - br.x)**2 + (tr.y - br.y)**2);
        const rsin = rcos / rwCot;

        var sideHeight = vSection.sideHeight;
        var sideThickness = vSection.sideThickness;
        var upperHeight = vSection.upperHeight;
        var bottomOffset = vSection.bottomOffset;
        var scallopRadius = vSection.scallopRadius;
        var sideScallopOffset = vSection.sideScallopOffset;
        //L100x100x10 section point, origin = (0,0)
        var spc = vSection.spc;
        var pts = vSection.pts;
        var rotationY = (skew - 90)*Math.PI/180;
      ///left stiffener
        var leftplate = [
          tl,
          {x:bl.x + lwCot * bottomOffset, y : bl.y + bottomOffset },
          {x:bl.x + lwCot * bottomOffset + lsin*sideHeight, y : bl.y + bottomOffset - lcos*sideHeight},
          {x:tl.x + gsin * sideHeight, y : tl.y + gcos * sideHeight },
        ];
        var leftPoints = [];
        leftPoints = leftPoints.concat(scallop(leftplate[3],leftplate[0],leftplate[1],scallopRadius,4));
        leftPoints.push(leftplate[1]);
        leftPoints = leftPoints.concat(scallop(leftplate[1],leftplate[2],leftplate[3],sideHeight-sideScallopOffset,1));
        leftPoints.push(leftplate[3]);
      
        ///right stiffener
        var rightplate = [
          tr,
          {x:br.x + rwCot * bottomOffset, y : br.y + bottomOffset },
          {x:br.x + rwCot * bottomOffset - rsin * sideHeight, y : br.y + bottomOffset + rcos*sideHeight},
          {x:tr.x - gsin * sideHeight, y : tr.y - gcos * sideHeight },
        ];
        var rightPoints = [];
        rightPoints = rightPoints.concat(scallop(rightplate[3],rightplate[0],rightplate[1],scallopRadius,4));
        rightPoints.push(rightplate[1]);
        rightPoints = rightPoints.concat(scallop(rightplate[1],rightplate[2],rightplate[3],sideHeight-sideScallopOffset,1));
        rightPoints.push(rightplate[3]);
        ////upper bracing
        var upperline =  [
          {x:tl.x - lwCot * upperHeight + gsin * spc , y: tl.y - upperHeight + gcos * spc},
          {x:tr.x - rwCot * upperHeight - gsin * spc , y: tr.y - upperHeight - gcos * spc}];
        var upperframe1 = [
          {x:upperline[0].x + pts[0] * gcos,y:upperline[0].y + pts[0] * gsin},
          {x:upperline[0].x + pts[1] * gcos, y:upperline[0].y + pts[1] * gsin},
          {x:upperline[1].x + pts[1] * gcos, y:upperline[1].y + pts[1] * gsin},
          {x:upperline[1].x + pts[0] * gcos, y:upperline[1].y + pts[0] * gsin}
        ];
        var upperframe2 = [
          {x:upperline[0].x + pts[1] * gcos,y:upperline[0].y + pts[1] * gsin},
          {x:upperline[0].x + pts[2] * gcos, y:upperline[0].y + pts[2] * gsin},
          {x:upperline[1].x + pts[2] * gcos, y:upperline[1].y + pts[2] * gsin},
          {x:upperline[1].x + pts[1] * gcos, y:upperline[1].y + pts[1] * gsin}
        ];
      return {
        leftshape: {points:leftPoints,Thickness:sideThickness,z: -sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]}, 
        rightShape: {points:rightPoints,Thickness:sideThickness,z:-sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        upperframe1:{points:upperframe1, Thickness:pts[3],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
        upperframe2:{points:upperframe2, Thickness:pts[4],z:sideThickness/2,rotationX:Math.PI/2, rotationY:rotationY, hole:[]},
       }
    }


    function hBracingSection(point1, point2, webPoints, hBSection){
      // var sideToplength = 700;
      // var sideTopwidth = 300;
      // var B = 2000;
      // var H = 2500;
      // var ULR = 1300;

      const bl = webPoints[0];
      const tl = webPoints[1];
      const br = webPoints[2];
      const tr = webPoints[3];

      const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
      const rwCot = (tr.x - br.x)/(tr.y-br.y);

      var upperHeight = hBSection.upperHeight;
      var sideTopThickness = hBSection.sideTopThickness;
      var spc = hBSection.spc;
      var pts = hBSection.pts;

      let node1 = {x:tl.x - lwCot * (upperHeight + sideTopThickness),y: tl.y -(upperHeight + sideTopThickness)};
      let node2 = {x:tr.x - rwCot * (upperHeight + sideTopThickness),y: tr.y -(upperHeight + sideTopThickness)};
      let Brline = [
        ToGlobalPoint(point1, node1),
        ToGlobalPoint(point2, node2)
      ];
      let Vector = [Brline[1].x - Brline[0].x, 
                    Brline[1].y - Brline[0].y, 
                    Brline[1].z - Brline[0].z];
      let VectorLength = Math.sqrt(Vector[0]**2 + Vector[1]**2 + Vector[2]**2);
      let normalCos = Vector[1] / VectorLength;
      let normalSin = - Vector[0] / VectorLength;
      let newBrLine = [{x: Brline[0].x + Vector[0] * spc / VectorLength,
                        y: Brline[0].y + Vector[1] * spc / VectorLength,
                        z: Brline[0].z + Vector[2] * spc / VectorLength},
                        {x: Brline[1].x - Vector[0] * spc / VectorLength,
                          y: Brline[1].y - Vector[1] * spc / VectorLength,
                          z: Brline[1].z - Vector[2] * spc / VectorLength}];
      let convexpointslist = [
        [{x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z},
        {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z},
        {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z},
        {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z},
        {x :newBrLine[0].x + normalCos * pts[0],y:newBrLine[0].y + normalSin * pts[0],z: newBrLine[0].z + pts[4]},
        {x :newBrLine[0].x + normalCos * pts[1],y:newBrLine[0].y + normalSin * pts[1],z: newBrLine[0].z + pts[4]},
        {x :newBrLine[1].x + normalCos * pts[1],y:newBrLine[1].y + normalSin * pts[1],z: newBrLine[1].z + pts[4]},
        {x :newBrLine[1].x + normalCos * pts[0],y:newBrLine[1].y + normalSin * pts[0],z: newBrLine[1].z + pts[4]},
      ],
      [
        {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z},
        {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z},
        {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z},
        {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z},
        {x :newBrLine[0].x + normalCos * pts[2],y:newBrLine[0].y + normalSin * pts[2],z: newBrLine[0].z + pts[5]},
        {x :newBrLine[0].x + normalCos * pts[3],y:newBrLine[0].y + normalSin * pts[3],z: newBrLine[0].z + pts[5]},
        {x :newBrLine[1].x + normalCos * pts[3],y:newBrLine[1].y + normalSin * pts[3],z: newBrLine[1].z + pts[5]},
        {x :newBrLine[1].x + normalCos * pts[2],y:newBrLine[1].y + normalSin * pts[2],z: newBrLine[1].z + pts[5]},

        ]
      ];

      return { line:Brline, pointlist: convexpointslist, }
    }

    function hBracingPlate(right, webPoints, hBSection){
      const bl = webPoints[0];
      const tl = webPoints[1];
      const br = webPoints[2];
      const tr = webPoints[3];
      const lwCot = (tl.x - bl.x)/(tl.y-bl.y);
      const rwCot = (tr.x - br.x)/(tr.y-br.y);

      let upperHeight = hBSection.upperHeight;
      let sideTopThickness = hBSection.sideTopThickness;
      let sideToplength = hBSection. sideToplength;
      let sideTopwidth = hBSection. sideTopwidth;
      let scallopHeight = hBSection. scallopHeight;
      let scallopRadius = hBSection. scallopRadius;
      let scallopBottom = hBSection. scallopBottom;
       
      let position = {};
      let rotationY = Math.atan((tr.y - tl.y)/(tr.x-tl.x));
      if (right){
        position = {x:tr.x - rwCot * (upperHeight + sideTopThickness),y:  -(upperHeight + sideTopThickness)};
        rotationY = -rotationY;
      }else{
        position = {x:tl.x - lwCot * (upperHeight + sideTopThickness),y:  -(upperHeight + sideTopThickness)}; 
      }
      let rotation = (right)? Math.PI/2 : -Math.PI/2;
      let cos = Math.cos(rotation);
      let sin = Math.sin(rotation);
      var curve = new global.THREE.ArcCurve(0,scallopHeight,scallopRadius,Math.PI,0,true);
      var curvePoint = curve.getPoints(8);
      let ps = [];
      ps.push({x:-sideToplength/2, y:sideTopwidth});
      ps.push({x:-sideToplength/2, y: 0});
      ps.push({x:-scallopBottom, y:0});
      
      for (let i=0; i < 9;i++){
        ps.push({x:curvePoint[i].x,y:curvePoint[i].y});  
      }  ps.push({x:scallopBottom, y:0});
      ps.push({x:sideToplength/2, y:0});
      ps.push({x:sideToplength/2, y:sideTopwidth});
      let plateShape = [];
      for (let i=0; i<ps.length;i++){
        plateShape.push({x:position.x + ps[i].x *cos - ps[i].y*sin, y: ps[i].y*cos + ps[i].x*sin});
      }

      return {plate: {points:plateShape,Thickness: sideTopThickness,z:position.y, rotationX:0, rotationY:rotationY,hole:[]}}
    }

    function XbeamSection(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection){
      const result = {};
      const connectorLength = xbeamSection.connectorLength;
      const connectorWidth = xbeamSection.connectorWidth;
      const upperFlangeThickness = xbeamSection.upperFlangeThickness;
      const upperFlangeWidth = xbeamSection.upperFlangeWidth;
      const lowerFlangeThickness = xbeamSection.lowerFlangeThickness;
      const lowerFlangeWidth = xbeamSection.lowerFlangeWidth;
      const vStiffThickness = xbeamSection.vStiffThickness;
      const vStiffBottomOffset = xbeamSection.vStiffBottomOffset;
      const vStiffWidth  = xbeamSection.vStiffWidth;
      const webThickness = xbeamSection.webThickness;
      const vStiffendFillet = xbeamSection.vStiffendFillet;
      const scallopRadius = xbeamSection.scallopRadius;

      const cosec = Math.abs(1/Math.sin(iPoint.skew * Math.PI/180));
      const cot = Math.abs(1/Math.tan(iPoint.skew * Math.PI/180));

      // 기준점은 iTopNode라고 가정, 가로보는 반드시 skew각도와 일치해야함.
      let iNode = ToGlobalPoint(iPoint, iSectionPoint.rightTopPlate[0]);
      let jNode = ToGlobalPoint(jPoint, jSectionPoint.leftTopPlate[0]);
      let length = Math.sqrt((jNode.x - iNode.x)**2 + (jNode.y - iNode.y)**2);
      let vec = {x:(jNode.x - iNode.x)/length,y:(jNode.y - iNode.y)/length};
      let grd = (jNode.z - iNode.z)/length;
      let grdSec = Math.sqrt(1+grd**2);
      let centerPoint = {
        x:(iNode.x + jNode.x)/2,
        y:(iNode.y + jNode.y)/2,
        z:(iNode.z + jNode.z)/2,
        normalCos: vec.x,
        normalSin: vec.y,
      };
      let lFlangeL = (iSectionPoint.rWeb[2].x - iSectionPoint.rightTopPlate[0].x) * cosec;
      let rFlangeL = (jSectionPoint.lWeb[2].x - jSectionPoint.leftTopPlate[0].x) * cosec;

      let iBottom = ToGlobalPoint(iPoint, iSectionPoint.bottomPlate[1]);
      let jBottom = ToGlobalPoint(jPoint, jSectionPoint.bottomPlate[0]);
      let lengthB = Math.sqrt((jBottom.x - iBottom.x)**2 + (jBottom.y - iBottom.y)**2);
      let vecB = {x:(jBottom.x - iBottom.x)/lengthB,y:(jBottom.y - iBottom.y)/lengthB};
      let grdB = (jBottom.z - iBottom.z)/lengthB;
      let grdSecB = Math.sqrt(1+grdB**2);
      let bottomPoint = {
        x:(iBottom.x + jBottom.x)/2,
        y:(iBottom.y + jBottom.y)/2,
        z:(iBottom.z + jBottom.z)/2,
        normalCos: vecB.x,
        normalSin: vecB.y,
      };
      let lFlangeB = (iSectionPoint.rWeb[3].x - iSectionPoint.bottomPlate[1].x) * cosec;
      let rFlangeB = (jSectionPoint.lWeb[3].x - jSectionPoint.bottomPlate[0].x) * cosec;
      let gradientX = (iPoint.gradientX + jPoint.gradientX)/2; 
      let vStiffLength = centerPoint.z - bottomPoint.z - vStiffBottomOffset;
      let vStiffPlate = [{x: webThickness/2,y: -webThickness/2*gradientX},
        {x: webThickness/2,y:-vStiffLength -webThickness/2*gradientX},
        {x: webThickness/2 + vStiffWidth,y:-vStiffLength-webThickness/2*gradientX},
        {x: webThickness/2 + vStiffWidth,y:-(webThickness/2 + vStiffWidth)*gradientX}];
      let vStiffTopFillet = Math.max(vStiffWidth - (upperFlangeWidth - webThickness)/2,0); 
      let vStiffPoint = [];
      vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[1],vStiffPlate[0],vStiffPlate[3],scallopRadius,4));
      vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[0],vStiffPlate[3],vStiffPlate[2],vStiffTopFillet,1));
      vStiffPoint = vStiffPoint.concat(scallop(vStiffPlate[3],vStiffPlate[2],vStiffPlate[1],vStiffendFillet,1));
      vStiffPoint.push(vStiffPlate[1]); 
      result['vStiffner'] = {
        points:vStiffPoint,
        Thickness:vStiffThickness,
        z: -vStiffThickness/2,
        rotationX: Math.PI/2,
        rotationY:Math.PI/2*3, 
        hole:[],
        point:centerPoint
      };

      result['cbUpperFlange'] = {
        points:[{x: (lFlangeL - length/2 + connectorLength)*grdSec,y:-upperFlangeWidth/2},
                {x:(lFlangeL - length/2 + connectorLength)*grdSec,y: upperFlangeWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSec,y: upperFlangeWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSec,y:-upperFlangeWidth/2},],
        Thickness:upperFlangeThickness,
        z: 0,
        rotationX: Math.atan(gradientX),
        rotationY:-Math.atan(grd), 
        hole:[],
        point:centerPoint
      };
      result['connectorLeftTop'] = {
        points:[{x: (- length/2 - connectorWidth/2*cot)*grdSec ,y: connectorWidth/2},
                {x: (lFlangeL - length/2 + connectorLength)*grdSec,y:upperFlangeWidth/2},
                {x: (lFlangeL - length/2 + connectorLength)*grdSec,y:-upperFlangeWidth/2},
                {x: (- length/2 + connectorWidth/2*cot)*grdSec, y: -connectorWidth/2}],
                
        Thickness:upperFlangeThickness,
        z: 0,
        rotationX: Math.atan(gradientX),
        rotationY:-Math.atan(grd), 
        hole:[],
        point:centerPoint
      };
      result['connectorRightTop'] = {
        points:[{x: (length/2 - connectorWidth/2*cot)*grdSec ,y: connectorWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSec,y:upperFlangeWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSec,y:-upperFlangeWidth/2},
                {x: (length/2 + connectorWidth/2*cot)*grdSec, y: -connectorWidth/2}],
        Thickness:upperFlangeThickness,
        z: 0,
        rotationX: Math.atan((iPoint.gradientX + jPoint.gradientX)/2),
        rotationY:-Math.atan(grd), 
        hole:[],
        point:centerPoint
      };

      result['cblowerFlange'] = {
        points:[{x: (lFlangeL - length/2 + connectorLength)*grdSecB,y:-lowerFlangeWidth/2},
                {x: (lFlangeL - length/2 + connectorLength)*grdSecB,y: lowerFlangeWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y: lowerFlangeWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y:-lowerFlangeWidth/2},],
        Thickness:lowerFlangeThickness,
        z: -lowerFlangeThickness,
        rotationX: 0,
        rotationY:-Math.atan(grdB), 
        hole:[],
        point:bottomPoint
      };
      result['connectorLeftBottom'] = {
        points:[{x: (- lengthB/2 - connectorWidth/2*cot)*grdSecB ,y: connectorWidth/2},
                {x: (lFlangeL - length/2 + connectorLength)*grdSecB,y:lowerFlangeWidth/2},
                {x: (lFlangeL - length/2 + connectorLength)*grdSecB,y:-lowerFlangeWidth/2},
                {x: (- lengthB/2 + connectorWidth/2*cot)*grdSecB, y: -connectorWidth/2}],
        Thickness:lowerFlangeThickness,
        z: -lowerFlangeThickness,
        rotationX: 0,
        rotationY:-Math.atan(grdB), 
        hole:[],
        point:bottomPoint
      };
      result['connectorRightBottom'] = {
        points:[{x: (lengthB/2 - connectorWidth/2*cot)*grdSecB ,y: connectorWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y:lowerFlangeWidth/2},
                {x: (rFlangeL + length/2 - connectorLength)*grdSecB,y:-lowerFlangeWidth/2},
                {x: (lengthB/2 + connectorWidth/2*cot)*grdSecB, y: -connectorWidth/2}],
        Thickness:lowerFlangeThickness,
        z: -lowerFlangeThickness,
        rotationX: 0,
        rotationY:-Math.atan(grdB), 
        hole:[],
        point:bottomPoint
      };

      let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[2]);
      let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[2]);
      let cblength = Math.sqrt((jTopNode.x - iTopNode.x)**2 + (jTopNode.y - iTopNode.y)**2);
      let cbVec = {x:(jTopNode.x - iTopNode.x)/cblength,y:(jTopNode.y - iTopNode.y)/cblength};
      let gradient = (jTopNode.z - iTopNode.z)/cblength;
      let iCos = iPoint.normalCos * cbVec.x +iPoint.normalSin * cbVec.y;
      let jCos =jPoint.normalCos * cbVec.x +jPoint.normalSin * cbVec.y;

      let ibaseNode = {x:iSectionPoint.rWeb[2].x*cosec,y: iSectionPoint.rWeb[2].y};
      let iTopNode1 = {x:iSectionPoint.rightTopPlate[0].x * cosec, y:iSectionPoint.rightTopPlate[0].y};
      let jbaseNode = {x:ibaseNode.x + cblength, y:ibaseNode.y +jTopNode.z - iTopNode.z};
      let jTopNode1 =  {x:jbaseNode.x + (jSectionPoint.leftTopPlate[0].x - jSectionPoint.lWeb[2].x)*cosec, y:jbaseNode.y + jSectionPoint.leftTopPlate[0].y - jSectionPoint.lWeb[2].y};  
      
      
      let jBottomNode = {x:jbaseNode.x + (jSectionPoint.lWeb[3].x - jSectionPoint.lWeb[2].x)*cosec, y:jbaseNode.y + jSectionPoint.lWeb[3].y - jSectionPoint.lWeb[2].y};
      let jBottomNode1 = {x:jbaseNode.x + (jSectionPoint.bottomPlate[0].x - jSectionPoint.lWeb[2].x)*cosec, y:jbaseNode.y + jSectionPoint.bottomPlate[0].y - jSectionPoint.lWeb[2].y};  
      let iBottomNode1 = {x:iSectionPoint.bottomPlate[1].x*cosec,y:iSectionPoint.bottomPlate[1].y};
      let iBottomNode = {x:iSectionPoint.rWeb[3].x*cosec,y:iSectionPoint.rWeb[3].y};
      
      let a = (jBottomNode1.y - iBottomNode1.y) / (jBottomNode1.x - iBottomNode1.x);
      
      let iTopNode2 = {x:ibaseNode.x + connectorLength,y:ibaseNode.y + connectorLength * gradient};
      let iBottomNode2 = {x:iTopNode2.x, y: iBottomNode1.y + a*(iTopNode2.x - iBottomNode1.x)};
      let jTopNode2 = {x:jbaseNode.x - connectorLength,y: jbaseNode.y - connectorLength * gradient};
      let jBottomNode2 = {x:jTopNode2.x, y: iBottomNode1.y + a*(jTopNode2.x - iBottomNode1.x)};  

      let leftConnectorWeb = [
        ibaseNode,
        iTopNode1,
        iTopNode2,
        iBottomNode2,
        iBottomNode1,
        iBottomNode,
      ];
      result['leftConnectorWeb'] = {
        points:leftConnectorWeb,
        Thickness:xbeamSection.webThickness,
        z:-xbeamSection.webThickness/2,
        rotationX:Math.PI/2,
        rotationY:Math.acos(iCos)+Math.PI, 
        hole:[],
        point:iPoint
      };
      let rightConnectorWeb = [
        jbaseNode,
        jTopNode1,
        jTopNode2,
        jBottomNode2,
        jBottomNode1,
        jBottomNode,
      ];
      result['rightConnectorWeb'] = {
        points:rightConnectorWeb,
        Thickness:xbeamSection.webThickness,
        z:-xbeamSection.webThickness/2,
        rotationX:Math.PI/2,
        rotationY:Math.acos(iCos)+Math.PI, 
        hole:[],
        point:iPoint
      };
      let cbWeb = [
        iTopNode2,
        iBottomNode2,
        jBottomNode2,
        jTopNode2
      ];
      result['cbWeb'] = {
        points:cbWeb,
        Thickness:xbeamSection.webThickness,
        z:-xbeamSection.webThickness/2,
        rotationX:Math.PI/2,
        rotationY:Math.acos(iCos)+Math.PI, 
        hole:[],
        point:iPoint
      };
         
      return result
    }

    function XbeamSectionK(iPoint, jPoint, iSectionPoint, jSectionPoint, xbeamSection){
      const result = {};
      //K형가로보는 skew를 허용하지 않고 생성됨.
      const topOffset = xbeamSection.topOffset;
      const bottomOffset = xbeamSection.bottomOffset;
      const gussetThickness = xbeamSection.gussetThickness;
      const gussetBondingLength = xbeamSection.gussetBondingLength;
      const gussetWeldingOffset = xbeamSection.gussetWeldingOffset;
      const gussetTopWidth = xbeamSection.gussetTopWidth;
      const gussetBottomWidth = xbeamSection.gussetBottomWidth;
      const gussetCenterWidth = xbeamSection.gussetCenterWidth;
      let hFrameEndOffset = xbeamSection.hFrameEndOffset;
      let diaFrameEndOffset = xbeamSection.diaFrameEndOffset;
      const pts = xbeamSection.pts;

      let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rWeb[1]);
      let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.lWeb[1]);

      let length = Math.sqrt((jTopNode.x - iTopNode.x)**2 + (jTopNode.y - iTopNode.y)**2);
      let xlength = Math.abs(jTopNode.x - iTopNode.x);
      let vec = {x:(jTopNode.x - iTopNode.x)/length,y:(jTopNode.y - iTopNode.y)/length};
      let grd = (jTopNode.z - iTopNode.z)/length;

      let centerPoint = {
        x:(iTopNode.x + jTopNode.x)/2,
        y:(iTopNode.y + jTopNode.y)/2,
        z:(iTopNode.z + jTopNode.z)/2,
        normalCos: vec.x,
        normalSin: vec.y,
      };

      const iCot = (iSectionPoint.rWeb[1].x - iSectionPoint.rWeb[0].x)/(iSectionPoint.rWeb[1].y-iSectionPoint.rWeb[0].y);
      const jCot = (jSectionPoint.lWeb[1].x - jSectionPoint.lWeb[0].x)/(jSectionPoint.lWeb[1].y-jSectionPoint.lWeb[0].y);
      let iheight  = iSectionPoint.rWeb[1].y-iSectionPoint.rWeb[0].y;
      let jheight = jSectionPoint.rWeb[1].y-jSectionPoint.rWeb[0].y;
      let points = [
        {x: -xlength/2 - topOffset * iCot, y: -xlength/2*grd -topOffset },
        {x: xlength/2 - topOffset * jCot, y: xlength/2*grd -topOffset },
        {x: xlength/2 - (jheight - bottomOffset) * jCot, y: xlength/2*grd -(jheight - bottomOffset) },
        {x: -xlength/2 - (iheight - bottomOffset) * iCot, y: -xlength/2*grd -(iheight - bottomOffset) },
      ];
      let bottomCenter = {x:(points[2].x + points[3].x)/2, y:(points[2].y + points[3].y)/2};
      let topFrame = Kframe(points[0],points[1],hFrameEndOffset,hFrameEndOffset,pts);
      let bottomFrame = Kframe(points[3],points[2],hFrameEndOffset,hFrameEndOffset,pts);
      let leftFrame = Kframe(points[0],bottomCenter,diaFrameEndOffset,diaFrameEndOffset,pts);
      let rightFrame = Kframe(bottomCenter,points[1],diaFrameEndOffset,diaFrameEndOffset,pts);

      let topVec = Vector(points[0], points[1]);
      let leftVec = Vector(points[0], bottomCenter);
      let rightVec = Vector(bottomCenter, points[1]);
      let bottomVec = Vector(points[3], points[2]);
      
      let leftTopGussetPlate = [
        {x: -xlength/2 - gussetWeldingOffset * iCot, y: -xlength/2*grd -gussetWeldingOffset },
        XYOffset(points[0],topVec,hFrameEndOffset + gussetBondingLength,pts[0]+gussetWeldingOffset),
        XYOffset(points[0],leftVec,diaFrameEndOffset + gussetBondingLength,pts[0]+gussetWeldingOffset),
        XYOffset(points[0],leftVec,diaFrameEndOffset + gussetBondingLength,pts[2]-gussetWeldingOffset),
        {x: -xlength/2 - (gussetWeldingOffset + gussetTopWidth) * iCot, y: -xlength/2*grd -(gussetWeldingOffset + gussetTopWidth) },
      ];
      result['centerGusset'] = {
        points:[
          XYOffset(bottomCenter,bottomVec,-gussetCenterWidth/2,pts[2]-gussetWeldingOffset),
          XYOffset(bottomCenter,bottomVec,gussetCenterWidth/2,pts[2]-gussetWeldingOffset),
          XYOffset(bottomCenter,rightVec,(diaFrameEndOffset + gussetBondingLength),pts[2]-gussetWeldingOffset),
          XYOffset(bottomCenter,rightVec,(diaFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
          XYOffset(bottomCenter,leftVec,-(diaFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
          XYOffset(bottomCenter,leftVec,-(diaFrameEndOffset + gussetBondingLength),pts[2]-gussetWeldingOffset),
        ],
        Thickness:gussetThickness,
        z:-gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['leftTopGusset'] = {
        points:leftTopGussetPlate,
        Thickness:gussetThickness,
        z:-gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['rightTopGusset'] = {
        points:[
          {x: xlength/2 - gussetWeldingOffset * jCot, y: xlength/2*grd -gussetWeldingOffset },
          XYOffset(points[1],topVec,-(hFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
          XYOffset(points[1],rightVec,-(diaFrameEndOffset + gussetBondingLength),pts[0]+gussetWeldingOffset),
          XYOffset(points[1],rightVec,-(diaFrameEndOffset + gussetBondingLength),pts[2]-gussetWeldingOffset),
          {x: xlength/2 - (gussetWeldingOffset + gussetTopWidth) * jCot, y: xlength/2*grd -(gussetWeldingOffset + gussetTopWidth) },
        ],
        Thickness:gussetThickness,
        z:-gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['leftBottomGusset'] = {
        points:[
          {x: -xlength/2 - (iheight - gussetWeldingOffset) * iCot, y: -xlength/2*grd -(iheight - gussetWeldingOffset)},
          XYOffset(points[3],bottomVec,hFrameEndOffset + gussetBondingLength,pts[2] -gussetWeldingOffset),
          XYOffset(points[3],bottomVec,hFrameEndOffset + gussetBondingLength,pts[0] +gussetWeldingOffset),
          {x: -xlength/2 - (iheight - gussetWeldingOffset - gussetBottomWidth) * iCot, y: -xlength/2*grd -(iheight - gussetWeldingOffset - gussetBottomWidth) },
        ],
        Thickness:gussetThickness,
        z:-gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };

      result['rightBottomGusset'] = {
        points:[
          {x: xlength/2 - (jheight - gussetWeldingOffset) * jCot, y: xlength/2*grd -(jheight - gussetWeldingOffset)},
          XYOffset(points[2],bottomVec, -(hFrameEndOffset + gussetBondingLength),pts[2] -gussetWeldingOffset),
          XYOffset(points[2],bottomVec, -(hFrameEndOffset + gussetBondingLength),pts[0] +gussetWeldingOffset),
          {x: xlength/2 - (jheight - gussetWeldingOffset - gussetBottomWidth) * jCot, y: xlength/2*grd -(jheight - gussetWeldingOffset - gussetBottomWidth) },
        ],
        Thickness:gussetThickness,
        z:-gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };



      result['topFrame1'] = {
        points:topFrame[0],
        Thickness:pts[3],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['topFrame2'] = {
        points:topFrame[1],
        Thickness:pts[4],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      // console.log(result)

      result['bottomFrame1'] = {
        points:bottomFrame[0],
        Thickness:pts[3],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['bottomFrame2'] = {
        points:bottomFrame[1],
        Thickness:pts[4],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };

      result['leftFrame1'] = {
        points:leftFrame[0],
        Thickness:pts[3],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['leftFrame2'] = {
        points:leftFrame[1],
        Thickness:pts[4],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['righttFrame1'] = {
        points:rightFrame[0],
        Thickness:pts[3],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };
      result['rightFrame2'] = {
        points:rightFrame[1],
        Thickness:pts[4],
        z:gussetThickness/2,
        rotationX:Math.PI/2,
        rotationY:0, 
        hole:[],
        point:centerPoint
      };

      return result
    }

    function Kframe(node1, node2, ioffset, joffset, pts){
        let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2);
        let vec = Vector(node1, node2);
        let plate1 = [
          XYOffset(node1,vec,ioffset,pts[0]),
          XYOffset(node1,vec,ioffset,pts[1]),
          XYOffset(node1,vec,(length-joffset),pts[1]),
          XYOffset(node1,vec,(length-joffset),pts[0]),
        // {x:node1.x + vec.x *ioffset - vec.y* pts[0], y: node1.y + vec.y * ioffset + vec.x* pts[0]},
        // {x:node1.x + vec.x *ioffset - vec.y* pts[1], y: node1.y + vec.y * ioffset + vec.x* pts[1]},
        // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[1], y: node1.y + vec.y * (length - joffset) + vec.x* pts[1]},
        // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[0], y: node1.y + vec.y * (length - joffset) + vec.x* pts[0]},
      ];
      let plate2 = [
        XYOffset(node1,vec,ioffset,pts[1]),
        XYOffset(node1,vec,ioffset,pts[2]),
        XYOffset(node1,vec,(length-joffset),pts[2]),
        XYOffset(node1,vec,(length-joffset),pts[1]),
        // {x:node1.x + vec.x *ioffset - vec.y* pts[1], y: node1.y + vec.y * ioffset + vec.x* pts[1]},
        // {x:node1.x + vec.x *ioffset - vec.y* pts[2], y: node1.y + vec.y * ioffset + vec.x* pts[2]},
        // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[2], y: node1.y + vec.y * (length - joffset) + vec.x* pts[2]},
        // {x:node1.x + vec.x *(length - joffset) - vec.y* pts[1], y: node1.y + vec.y * (length - joffset) + vec.x* pts[1]},
      ];
      return [plate1, plate2]
    }

    function XYOffset(node, vector, xoffset, yoffset){
      return {
        x:node.x + vector.x *xoffset - vector.y* yoffset, 
        y: node.y + vector.y * xoffset + vector.x* yoffset}
      }
    function Vector(node1,node2){
      let length = Math.sqrt((node2.x-node1.x)**2 + (node2.y-node1.y)**2);
      return {x :(node2.x-node1.x)/length, y:(node2.y-node1.y)/length }
    }

    function scallop(point1,point2,point3,radius,smoothness){
      var points = [];
      var v1 = new global.THREE.Vector2(point1.x - point2.x, point1.y - point2.y).normalize();
      var v2 = new global.THREE.Vector2(point3.x - point2.x, point3.y - point2.y).normalize();
      for (let i = 0; i < smoothness+1 ; i++){
        var v3 = new global.THREE.Vector2().addVectors(v1.clone().multiplyScalar(smoothness - i), v2.clone().multiplyScalar(i)).setLength(radius);
        points.push({x: v3.x + point2.x, y: v3.y +point2.y});
      }
      return points
    }


    function Fillet2D(point1, point2, point3, radius, smoothness){
      let lv1 = Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);  
      let lv2 = Math.sqrt((point3.x - point2.x)**2 + (point3.y - point2.y)**2);  
      let v1 = {x: (point1.x - point2.x)/lv1, y:(point1.y - point2.y)/lv1 };
      let v2 = {x: (point3.x - point2.x)/lv2, y:(point3.y - point2.y)/lv2 };
      let ang = Math.acos(v1.x*v2.x + v1.y*v2.y);
      let l1 = radius / Math.sin(ang / 2) / Math.sqrt((v1.x+v2.x)**2+(v1.y+v2.y)**2);
      let v3 = {x : (v1.x+v2.x) * l1, y : (v1.y+v2.y) * l1};
      let centerPoint = {x: point2.x + v3.x, y:point2.y + v3.y};
      let l2 = radius / Math.tan(ang / 2);
      var p1 = {x: point2.x + v1.x * l2, y:point2.y + v1.y*l2};
      var p2 = {x: point2.x + v2.x * l2, y:point2.y + v2.y*l2};
      var vc1 = {x: p1.x - centerPoint.x, y:p1.y - centerPoint.y};
      var vc2 = {x: p2.x- centerPoint.x, y:p2.y - centerPoint.y};
      let points = [];
      points.push(p1);
        for (let j = 0; j < smoothness; j++) {
          let dirVec = {x:vc1.x * (smoothness - j) + vc2.x * (j+1) , y: vc1.y * (smoothness - j) + vc2.y * (j+1)};
          let l3 = radius / Math.sqrt(dirVec.x**2+dirVec.y**2);
          points.push({x: centerPoint.x + dirVec.x * l3, y:centerPoint.y + dirVec.y * l3});
        }
      points.push(p2);
      return points
     }

    // ---------------------- Test ----------------------------------
    function Main(
      horizon,
      vertical,
      superElevation,
      girderLayoutInput,
      SEShape,
      girderBaseInfo,
      xbeamLayout,
      xbeamSectionList,
      diaphragmLayout,
      diaphragmSectionList,
      vStiffLayout,
      vStiffSectionList,
      hBracingLayout,
      hBracingSectionList
    ) {
      ///// 선형정보는 입력은 m단위로 받는 것을 자동 변환할 수 있도록 함. mm로 변환 코드 작성 필요 ///
      const horizonDataList = horizon;
      const VerticalDataList = vertical;
      const SuperElevation = superElevation;
      const beginStation = 769452.42;
      const slaveOrMaster = true;
      const input = { beginStation, horizonDataList, slaveOrMaster };

      let line = LineGenerator(input);
      let zPosition = 0;
      //   let line2 = OffsetLine(20,line)
      for (let i = 0; i < line.points.length; i++) {
        zPosition = VerticalPositionGenerator(
          VerticalDataList,
          SuperElevation,
          line.points[i]
        ).elevation;
        line.points[i].z = zPosition;
      }
      let hline = [];
      hline.push(line);
      let girderLayout = GirderLayoutGenerator(
        girderLayoutInput,
        hline,
        VerticalDataList,
        SuperElevation
      );
      let gridStationList = GirderGridStation(girderLayout, 5000, 1000);
      let startSkew = girderLayoutInput.supportData[0].angle;
      let endSkew =
        girderLayoutInput.supportData[girderLayoutInput.supportData.length - 1]
          .angle;
      let gridPoint = GridPointGenerator(
        line,
        girderLayout,
        gridStationList,
        SEShape,
        startSkew,
        endSkew,
        VerticalDataList,
        SuperElevation
      );
      // for (let pt in gridPoint.nameToPointDict){
      //     gridPoint.nameToPointDict[pt].z = VerticalPositionGenerator(VerticalDataList, SuperElevation,gridPoint.nameToPointDict[pt])
      // }
      console.log(gridPoint);

      // immer 로 감쌌기 때문에 ... .length 가 없을수 있다 ...
      //gridPoint.stationDictList[index].length

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
      // console.log(sectionInfo)
      // console.log(gridPoint)
      let diaDict = DiaShapeDict(
        sectionPointDict,
        diaphragmLayout,
        diaphragmSectionList
      );
      let vStiffDict = VstiffShapeDict(
        sectionPointDict,
        vStiffLayout,
        vStiffSectionList
      );
      let hBracing = HBracingList(
        gridPoint.nameToPointDict,
        sectionPointDict,
        hBracingLayout,
        hBracingSectionList
      );
      let xbeamDict = XbeamDict(
        gridPoint.nameToPointDict,
        sectionPointDict,
        xbeamLayout,
        xbeamSectionList
      );
      return {
        p: [line.points],
        gridPoint,
        xbeamData: xbeamLayout,
        sectionPointDict,
        diaDict,
        vStiffDict,
        ...hBracing,
        ...xbeamDict
      };
    }

    function XbeamDict(
      nameToPointDict,
      sectionPointDict,
      xbeamLayout,
      xbeamSectionList
    ) {
      let xbeamSectionDict = {};
      let xbeamPointDict = {};
      for (let i = 0; i < xbeamLayout.length; i++) {
        let iNodekey = xbeamLayout[i].iNode;
        let jNodekey = xbeamLayout[i].jNode;
        let xbeamSection = xbeamSectionList[xbeamLayout[i].section];
        let iSectionPoint = sectionPointDict[iNodekey].forward;
        let jSectionPoint = sectionPointDict[jNodekey].forward;
        let iPoint = nameToPointDict[iNodekey];
        let jPoint = nameToPointDict[jNodekey];
        // let cbkey = 'CB' + iNodekey + 'To' + jNodekey
        if (xbeamLayout[i].section == "xbeamI") {
          xbeamSectionDict[iNodekey] = XbeamSection(
            iPoint,
            jPoint,
            iSectionPoint,
            jSectionPoint,
            xbeamSection
          );
        } else if (xbeamLayout[i].section == "xbeamK") {
          xbeamSectionDict[iNodekey] = XbeamSectionK(
            iPoint,
            jPoint,
            iSectionPoint,
            jSectionPoint,
            xbeamSection
          );
        }
        // xbeamSectionDict[iNodekey] = XbeamSection(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamSection)
        // xbeamPointDict[cbkey] = XbeamPoint(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamLayout)
      }
      return { xbeamSectionDict, xbeamPointDict };
    }
    // export function XbeamPointDict(iPoint,jPoint,iSectionPoint,jSectionPoint,xbeamLayout){

    //   let resultPoint = {
    //     stationNumber:0,
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //     normalCos: 0,
    //     normalSin: 0,
    //     masterStationNumber:0,
    //     offset: 0,
    //     virtual: false,
    //     skew:90
    //   };
    //   let iTopNode = ToGlobalPoint(iPoint, iSectionPoint.rightTopPlate[0])
    //   let jTopNode = ToGlobalPoint(jPoint, jSectionPoint.rightTopPlate[0])
    //   resultPoint.x = iTopNode
    //   return resultPoint
    // }

    function HBracingList(
      nameToPointDict,
      sectionPointDict,
      hBracingLayout,
      hBracingectionList
    ) {
      let hBracingList = [];
      let hBracingPlateDict = {};
      let right = true;
      for (let i = 0; i < hBracingLayout.length; i++) {
        let hBSection = hBracingectionList[hBracingLayout[i].section];
        let pk1 = hBracingLayout[i].from;
        let pk2 = hBracingLayout[i].to;
        let webPoints = [];
        if (hBracingLayout[i].leftToright) {
          webPoints = [
            sectionPointDict[pk1].forward.lWeb[0],
            sectionPointDict[pk1].forward.lWeb[1],
            sectionPointDict[pk2].forward.rWeb[0],
            sectionPointDict[pk2].forward.rWeb[1]
          ];
        } else {
          webPoints = [
            sectionPointDict[pk1].forward.rWeb[0],
            sectionPointDict[pk1].forward.rWeb[1],
            sectionPointDict[pk2].forward.lWeb[0],
            sectionPointDict[pk2].forward.lWeb[1]
          ];
        }
        let point1 = nameToPointDict[pk1];
        let point2 = nameToPointDict[pk2];

        hBracingList.push(hBracingSection(point1, point2, webPoints, hBSection));
        if (hBracingLayout[i].platelayout[0]) {
          right = hBracingLayout[i].leftToright ? false : true;
          let webPoints1 = [
            sectionPointDict[pk1].forward.lWeb[0],
            sectionPointDict[pk1].forward.lWeb[1],
            sectionPointDict[pk1].forward.rWeb[0],
            sectionPointDict[pk1].forward.rWeb[1]
          ];
          hBracingPlateDict[pk1] = hBracingPlate(right, webPoints1, hBSection);
        }
        if (hBracingLayout[i].platelayout[1]) {
          right = hBracingLayout[i].leftToright ? true : false;
          let webPoints2 = [
            sectionPointDict[pk2].forward.lWeb[0],
            sectionPointDict[pk2].forward.lWeb[1],
            sectionPointDict[pk2].forward.rWeb[0],
            sectionPointDict[pk2].forward.rWeb[1]
          ];
          hBracingPlateDict[pk2] = hBracingPlate(right, webPoints2, hBSection);
        }
      }

      return { hBracingList, hBracingPlateDict };
    }

    function DiaShapeDict(
      sectionPointDict,
      diaphragmLayout,
      diaphragmSectionList
    ) {
      let result = {};
      for (let i = 0; i < diaphragmLayout.length; i++) {
        let gridkey = diaphragmLayout[i].position;
        let diaSection = diaphragmSectionList[diaphragmLayout[i].section];
        let webPoints = [
          sectionPointDict[gridkey].forward.lWeb[0],
          sectionPointDict[gridkey].forward.lWeb[1],
          sectionPointDict[gridkey].forward.rWeb[0],
          sectionPointDict[gridkey].forward.rWeb[1]
        ];
        let uflangePoints = [
          sectionPointDict[gridkey].forward.leftTopPlate[1],
          sectionPointDict[gridkey].forward.leftTopPlate[2],
          sectionPointDict[gridkey].forward.rightTopPlate[1],
          sectionPointDict[gridkey].forward.rightTopPlate[2]
        ];
        let skew = sectionPointDict[gridkey].forward.skew;
        if (diaphragmLayout[i].section == "diaType1") {
          result[gridkey] = diaphragmSection(
            webPoints,
            skew,
            uflangePoints,
            diaSection
          );
        } else if (diaphragmLayout[i].section == "diaType2") {
          result[gridkey] = diaphragmSection2(
            webPoints,
            skew,
            uflangePoints,
            diaSection
          );
        }
      }
      return result;
    }

    function VstiffShapeDict(
      sectionPointDict,
      vStiffLayout,
      vStiffSectionList
    ) {
      let result = {};
      for (let i = 0; i < vStiffLayout.length; i++) {
        let gridkey = vStiffLayout[i].position;
        let vSection = vStiffSectionList[vStiffLayout[i].section];
        let webPoints = [
          sectionPointDict[gridkey].forward.lWeb[0],
          sectionPointDict[gridkey].forward.lWeb[1],
          sectionPointDict[gridkey].forward.rWeb[0],
          sectionPointDict[gridkey].forward.rWeb[1]
        ];
        let uflangePoints = [
          sectionPointDict[gridkey].forward.leftTopPlate[1],
          sectionPointDict[gridkey].forward.leftTopPlate[2],
          sectionPointDict[gridkey].forward.rightTopPlate[1],
          sectionPointDict[gridkey].forward.rightTopPlate[2]
        ];
        let skew = sectionPointDict[gridkey].forward.skew;
        result[gridkey] = vStiffSection(webPoints, skew, uflangePoints, vSection);
      }
      return result;
    }

    // ---------------------- Test ----------------------------------

    // ["horizon", "vertical", "superElevation" ,"girderLayoutInput", "SEShape", "girderBaseInfo" , "xbeamLayout", "xbeamSectionList", "diaphragmLayout", "diaphragmSectionList", "vStiffLayout", "vStiffSectionList", "hBracingLayout", "hBracingSectionList", ]

    // 테스트용 ... 다른곳에서 건드리지 말것 ....
    // 건드리더라도 read-only , 내부  값 바꾸지 말것 ...
    // multiLineStringComp 에서 shallow copy 중

    const defaultValues = {
      horizon: [
        [178551192.87, 552443319.55, 0, 0, 0],
        [178321130.9, 552413588.4, 200000, 100000, 100000],
        [178264931.8, 551804205.7, 200000, 100000, 90000],
        [178142699.05, 551723237.52, 0, 0, 0]
      ],
      vertical: [
        { name: 1, station: 0.0, elevation: 15421.0, curveLength: 0.0 },
        { name: 2, station: 140000.0, elevation: 15632.0, curveLength: 100000.0 },
        { name: 3, station: 540000.0, elevation: 17632.0, curveLength: 80000.0 },
        { name: 4, station: 820000.0, elevation: 19592.0, curveLength: 120000.0 },
        { name: 5, station: 1260000.0, elevation: 27072.0, curveLength: 120000.0 },
        { name: 6, station: 1650000.0, elevation: 30979.7, curveLength: 240000.0 },
        { name: 7, station: 1990000.0, elevation: 20439.7, curveLength: 100000.0 },
        { name: 8, station: 2180000.0, elevation: 19869.7, curveLength: 0.0 },
        { name: 9, station: 2373000.14, elevation: 17552.0, curveLength: 0.0 }
      ],
      superElevation: [
        { name: 1, station: 700000.0, left: 7.0, right: -7.0 },
        { name: 2, station: 720000.0, left: 7.0, right: -7.0 },
        { name: 3, station: 740000.0, left: 5.0, right: -5.0 },
        { name: 4, station: 760000.0, left: 3.0, right: -3.0 },
        { name: 5, station: 780000.0, left: 2.0, right: -2.0 },
        { name: 6, station: 814500.0, left: 2.0, right: -2.0 },
        { name: 7, station: 820000.0, left: 0.36, right: -0.36 },
        { name: 8, station: 821000.0, left: 0.2, right: -0.2 },
        { name: 9, station: 831200.0, left: -1.47, right: 1.47 },
        { name: 10, station: 834200.0, left: -1.96, right: 1.96 },
        { name: 11, station: 838000.0, left: -2.58, right: 2.58 },
        { name: 12, station: 840000.0, left: -2.91, right: 2.91 },
        { name: 13, station: 841500.0, left: -3.15, right: 3.15 },
        { name: 14, station: 860000.0, left: -6.18, right: 6.18 },
        { name: 15, station: 880000.0, left: -7.0, right: 7.0 },
        { name: 16, station: 1081000.0, left: -7.0, right: 7.0 },
        { name: 17, station: 1100000.0, left: -4.3, right: 4.3 },
        { name: 18, station: 1103000.0, left: -3.76, right: 3.76 },
        { name: 19, station: 1120000.0, left: -0.7, right: 0.7 },
        { name: 20, station: 1123500.0, left: -0.07, right: 0.07 },
        { name: 21, station: 1124500.0, left: 0.11, right: -0.11 },
        { name: 22, station: 1140000.0, left: 2.0, right: -2.0 },
        { name: 23, station: 1440000.0, left: 2.0, right: -2.0 },
        { name: 24, station: 1442600.0, left: 2.26, right: -2.26 },
        { name: 25, station: 1445500.0, left: 2.55, right: -2.55 },
        { name: 26, station: 1446000.0, left: 2.6, right: -2.6 },
        { name: 27, station: 1447700.0, left: 2.77, right: -2.77 },
        { name: 28, station: 1460000.0, left: 4.0, right: -4.0 },
        { name: 29, station: 1480000.0, left: 5.0, right: -6.0 },
        { name: 30, station: 1492000.0, left: 7.0, right: -7.0 },
        { name: 31, station: 1620000.0, left: 7.0, right: -7.0 }
      ],
      beginStation: 769452.42,
      slaveOrMaster: true,
      girderLayoutInput: {
        baseValue: {
          bridgeBeginStation: 1208150
        },
        supportData: [
          { name: "시점", angle: 70, spanlength: 0 },
          { name: "A1", angle: 70, spanLength: 700 },
          { name: "P1", angle: 90, spanLength: 55000 },
          { name: "P2", angle: 90, spanLength: 55000 },
          { name: "P3", angle: 90, spanLength: 60000 },
          { name: "P4", angle: 90, spanLength: 60000 },
          { name: "P5", angle: 90, spanLength: 55000 },
          { name: "A2", angle: 89.7708167291586, spanLength: 55000 },
          { name: "종점", angle: 90, spanLength: 800 }
        ],
        getGirderList: [
          { baseAlign: "align1", alignOffset: -100.0, isBeam: false },
          { baseAlign: "align1", alignOffset: 5010.0, isBeam: false },
          // { baseAlign: "align1", alignOffset: 10010.0, isBeam: false }
        ]
      },
      SEShape: {
        start: {
          A: 150,
          B: 300,
          C: 150,
          D: 50,
          E: 500,
          F: 2000,
          G: 1000,
          J: 470,
          S: 270,
          Taper: "parallel"
        },
        end: {
          A: 250,
          B: 300,
          C: 250,
          D: 50,
          E: 500,
          F: 2000,
          G: 1000,
          J: 470,
          S: 270,
          Taper: "parallel"
        }
      },

      girderBaseInfo: [
        {
          girderIndex: 0,
          section: {
            B: 1700,
            UL: 1050,
            UR: 1050,
            C: 200,
            D: 200,
            C1: 200,
            D1: 200,
            H: 2000
          },
          height: [
            //straight/circle/parabola
            {
              start: "G1K1",
              end: "G1C18",
              startH: 2000,
              endH: 2000,
              type: "straight"
            },
            {
              start: "G1C18",
              end: "G1C21",
              startH: 2000,
              endH: 2500,
              type: "circle"
            },
            {
              start: "G1C21",
              end: "G1C24",
              startH: 2500,
              endH: 2500,
              type: "straight"
            },
            {
              start: "G1C24",
              end: "G1C27",
              startH: 2500,
              endH: 2000,
              type: "circle"
            },
            {
              start: "G1C27",
              end: "G1S7",
              startH: 2000,
              endH: 2000,
              type: "straight"
            }
          ],
          slabThickness: [
            //straight/
            {
              start: "G1K1",
              end: "G1K2",
              startH: 470,
              endH: 470,
              type: "straight"
            },
            { start: "G1K2", end: "G1K3", startH: 470, endH: 270, type: "straight" }
          ],
          uFlange: [
            { start: "G1K1", end: "G1S7", thickness: 18, startW: 400, endW: 400 }
          ],
          lFlange: [{ start: "G1K1", end: "G1S7", thickness: 20 }],
          web: [{ start: "G1K1", end: "G1S7", thickness: 14 }],
          uRib: [
            {
              start: "G1K1",
              end: "G1S7",
              thickness: 14,
              height: 150,
              layout: [-200, 200]
            }
          ],
          lRib: [
            {
              start: "G1K1",
              end: "G1S7",
              thickness: 14,
              height: 150,
              layout: [-200, 200]
            }
          ]
        },
        {
          girderIndex: 1,
          section: {
            B: 1700,
            UL: 1050,
            UR: 1050,
            C: 200,
            D: 200,
            C1: 200,
            D1: 200,
            H: 2000
          },
          height: [
            //straight/circle/parabola
            {
              start: "G2K1",
              end: "G2C18",
              startH: 2000,
              endH: 2000,
              type: "straight"
            },
            {
              start: "G2C18",
              end: "G2C21",
              startH: 2000,
              endH: 2500,
              type: "circle"
            },
            {
              start: "G2C21",
              end: "G2C24",
              startH: 2500,
              endH: 2500,
              type: "straight"
            },
            {
              start: "G2C24",
              end: "G2C27",
              startH: 2500,
              endH: 2000,
              type: "circle"
            },
            {
              start: "G2C27",
              end: "G2S7",
              startH: 2000,
              endH: 2000,
              type: "straight"
            }
          ],
          slabThickness: [
            //straight/
            {
              start: "G2K1",
              end: "G2K2",
              startH: 470,
              endH: 470,
              type: "straight"
            },
            { start: "G2K2", end: "G2K3", startH: 470, endH: 270, type: "straight" }
          ],
          uFlange: [
            { start: "G2K1", end: "G2S7", thickness: 18, startW: 400, endW: 400 }
          ],
          lFlange: [{ start: "G2K1", end: "G2S7", thickness: 20 }],
          web: [{ start: "G2K1", end: "G2S7", thickness: 14 }],
          uRib: [
            {
              start: "G2K1",
              end: "G2S7",
              thickness: 14,
              height: 150,
              layout: [-200, 200]
            }
          ],
          lRib: [
            {
              start: "G2K1",
              end: "G2S7",
              thickness: 14,
              height: 150,
              layout: [-200, 200]
            }
          ]
        },
        // {
        //   girderIndex: 2,
        //   section: {
        //     B: 1700,
        //     UL: 1050,
        //     UR: 1050,
        //     C: 200,
        //     D: 200,
        //     C1: 200,
        //     D1: 200,
        //     H: 2000
        //   },
        //   height: [
        //     {
        //       start: "G3K1",
        //       end: "G3S7",
        //       startH: 2000,
        //       endH: 2000,
        //       type: "straight"
        //     }
        //   ],
        //   slabThickness: [
        //     //straight/
        //     {
        //       start: "G3K1",
        //       end: "G3K2",
        //       startH: 470,
        //       endH: 470,
        //       type: "straight"
        //     },
        //     { start: "G3K2", end: "G3K3", startH: 470, endH: 270, type: "straight" }
        //   ],
        //   uFlange: [
        //     { start: "G3K1", end: "G3S7", thickness: 18, startW: 400, endW: 400 }
        //   ],
        //   lFlange: [{ start: "G3K1", end: "G3S7", thickness: 30 }],
        //   web: [{ start: "G3K1", end: "G3S7", thickness: 14 }],
        //   uRib: [
        //     {
        //       start: "G3K1",
        //       end: "G3S7",
        //       thickness: 14,
        //       height: 150,
        //       layout: [-200, 200]
        //     }
        //   ],
        //   lRib: [
        //     {
        //       start: "G3K1",
        //       end: "G3S7",
        //       thickness: 14,
        //       height: 150,
        //       layout: [-200, 200]
        //     }
        //   ]
        // }
      ],

      xbeamLayout: [
        { iNode: "G1D5", jNode: "G2D6", section: "xbeamK" },
        { iNode: "G1D3", jNode: "G2D4", section: "xbeamK" },
        { iNode: "G1D1", jNode: "G2D2", section: "xbeamK" },
        { iNode: "G1D7", jNode: "G2D8", section: "xbeamK" },
        { iNode: "G1D9", jNode: "G2D10", section: "xbeamK" },
        { iNode: "G1S1", jNode: "G2S1", section: "xbeamI" },
        { iNode: "G1S2", jNode: "G2S2", section: "xbeamI" },
        { iNode: "G1S3", jNode: "G2S3", section: "xbeamI" },
        { iNode: "G1S4", jNode: "G2S4", section: "xbeamI" },
        { iNode: "G1S5", jNode: "G2S5", section: "xbeamI" },
        { iNode: "G1S6", jNode: "G2S6", section: "xbeamI" },
        { iNode: "G1S7", jNode: "G2S7", section: "xbeamI" }
        // {iNode:"G1K1",jNode:"G2K1",section:"xbeam1"},
        // {iNode:"G1K2",jNode:"G2K2",section:"xbeam1"},
        // {iNode:"G1K3",jNode:"G2K3",section:"xbeam1"},
      ],

      xbeamSectionList: {
        xbeamI: {
          connectorWidth: 600,
          connectorLength: 500,
          upperFlangeThickness: 14,
          upperFlangeWidth: 300,
          webThickness: 10,
          lowerFlangeThickness: 14,
          lowerFlangeWidth: 300,
          vStiffThickness: 10,
          vStiffBottomOffset: 50,
          vStiffWidth: 150,
          vStiffendFillet: 140,
          scallopRadius: 35
        },
        xbeamK: {
          topOffset: 200,
          bottomOffset: 250,
          gussetThickness: 12,
          gussetBondingLength: 240,
          gussetWeldingOffset: 20,
          gussetTopWidth: 600,
          gussetBottomWidth: 400,
          gussetCenterWidth: 800,
          hFrameEndOffset: 70,
          diaFrameEndOffset: 220,
          //L150x150x12 section point, origin = (0,0)
          pts: [41.39, 29.39, -108.61, 150, 12]
        }
      },

      diaphragmLayout: [
        { position: "G1D1", section: "diaType1" },
        { position: "G1D2", section: "diaType1" },
        { position: "G1D3", section: "diaType1" },
        { position: "G1D4", section: "diaType1" },
        { position: "G1D5", section: "diaType1" },
        { position: "G1D6", section: "diaType1" },
        { position: "G1D7", section: "diaType1" },
        { position: "G1D8", section: "diaType1" },
        { position: "G1D9", section: "diaType1" },
        { position: "G1D10", section: "diaType1" },

        { position: "G2D2", section: "diaType1" },

        { position: "G1S1", section: "diaType2" },
        { position: "G1S2", section: "diaType2" },
        { position: "G2S1", section: "diaType2" }
      ],

      diaphragmSectionList: {
        diaType1: {
          lowerHeight: 250,
          lowerThickness: 12,
          lowerTopThickness: 10,
          lowerTopwidth: 100,
          upperThickness: 12,
          longiRibHeight: 150,
          longiRibRayout: [-180, 180],
          upperHeight: 220,
          sideHeight: 200,
          sideThickness: 14,
          leftsideTopwidth: 350,
          leftsideTopThickness: 12,
          leftsideToplength: 700,
          rightsideTopwidth: 220,
          rightsideTopThickness: 12,
          rightsideToplength: 80,
          upperTopThickness: 10,
          upperTopwidth: 150,
          // added variables
          scallopRadius: 35,
          ribHoleD: 42,
          ribHoleR: 25,
          //L100x100x10 section point, origin = (0,0)
          spc: 50,
          pts: [71.78, -18.22, -28.22, 10, 100] //단면중심축에 대한 정보포함된 L형 단면정보
        },
        diaType2: {
          plateThickness: 12,
          holeBottomOffset: 450,
          holeRightOffset: -314,
          holeFilletR: 100,
          holeHeight: 700,
          holeWidth: 450,
          vStiffThickness: 20,
          vStiffWidth: 420,
          vStiffLayout: [-125, 125],
          topPlateWidth: 520,
          topPlateThickness: 10,
          hStiffThickness: 12,
          hStiffWidth: 150,
          hStiffBottomOffset: 700,

          holeVstiffnerThickness: 10,
          holeVstiffnerhight: 100,
          holeVstiffnerLength: 860,
          holeHstiffnerThickness: 10,
          holeHstiffnerHeight: 100,
          holeHstiffnerLength: 610,
          holeStiffSpacing: 20,
          holeVstiffnerLength: 860,
          // added variables
          scallopRadius: 35
        }
      },

      vStiffLayout: [
        { position: "G1V2", section: "vStiffType1" },
        { position: "G1V3", section: "vStiffType1" },
        { position: "G1V4", section: "vStiffType1" },
        { position: "G1V5", section: "vStiffType1" },
        { position: "G1V6", section: "vStiffType1" },
        { position: "G1V7", section: "vStiffType1" },
        { position: "G1V8", section: "vStiffType1" },
        { position: "G1V9", section: "vStiffType1" },
        { position: "G1V10", section: "vStiffType1" },
        { position: "G1V11", section: "vStiffType1" },
        { position: "G1V12", section: "vStiffType1" },
        { position: "G2V2", section: "vStiffType1" }
      ],

      vStiffSectionList: {
        vStiffType1: {
          sideHeight: 200,
          sideThickness: 14,
          upperHeight: 220,
          bottomOffset: 60,
          // added variables
          scallopRadius: 35,
          sideScallopOffset: 200,
          //L100x100x10 section point, origin = (0,0)
          spc: 50,
          pts: [100, 10, 0, 10, 100] //단면중심축에 대한 정보포함된 L형 단면정보
        }
      },

      hBracingLayout: [
        {
          from: "G1V1",
          to: "G1D1",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D1",
          to: "G1V2",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V2",
          to: "G1D2",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D2",
          to: "G1V3",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V3",
          to: "G1D3",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D3",
          to: "G1V4",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V4",
          to: "G1D4",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D4",
          to: "G1V5",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V5",
          to: "G1D5",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D5",
          to: "G1V6",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V6",
          to: "G1D6",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D6",
          to: "G1V7",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V7",
          to: "G1D7",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D7",
          to: "G1V8",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V8",
          to: "G1D8",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D8",
          to: "G1V9",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V9",
          to: "G1D9",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D9",
          to: "G1V10",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V10",
          to: "G1D10",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G1D10",
          to: "G1V11",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        },
        {
          from: "G1V11",
          to: "G1S2",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, true]
        },

        {
          from: "G2V1",
          to: "G2D2",
          leftToright: false,
          section: "hBracingType1",
          platelayout: [true, false]
        },
        {
          from: "G2D2",
          to: "G2V2",
          leftToright: true,
          section: "hBracingType1",
          platelayout: [false, true]
        }
      ],

      hBracingSectionList: {
        hBracingType1: {
          upperHeight: 220,
          sideTopThickness: 14,
          sideToplength: 700,
          sideTopwidth: 300,
          // added variables
          scallopHeight: 200,
          scallopRadius: 25,
          scallopBottom: 42,
          //T150x150x6.5x9 section point, origin = (0,0)
          spc: 214,
          pts: [75, -75, -4.5, 4.5, -6.5, -150] //단면중심축에 대한 정보포함된 T형 단면정보 <-- L형하고 다름
        }
      },

      zPosition: 0
    };

    const {
      horizon,
      vertical,
      superElevation,
      girderLayoutInput,
      SEShape,
      girderBaseInfo,
      xbeamLayout,
      xbeamSectionList,
      diaphragmLayout,
      diaphragmSectionList,
      vStiffLayout,
      vStiffSectionList,
      hBracingLayout,
      hBracingSectionList
    } = defaultValues;

    function main() {
      const a = add(1, 13);
      const b = minus(31, 2);
      return { a, b };
    }

    function MainFunction() {
      this.addInput("mesh", "meshxx");
    }

    MainFunction.prototype.onExecute = function() {
      var group = new global.THREE.Group();
      let linedata = Main(
        horizon,
        vertical,
        superElevation,
        girderLayoutInput,
        SEShape,
        girderBaseInfo,
        xbeamLayout,
        xbeamSectionList,
        diaphragmLayout,
        diaphragmSectionList,
        vStiffLayout,
        vStiffSectionList,
        hBracingLayout,
        hBracingSectionList
      );

      const initPoint = linedata.gridPoint.nameToPointDict["G1S1"];

      let [line , linegeo] = LineView(linedata.p[0], initPoint);
      group.add(line);

      group.add(
        GirderFrameView(
          linedata.gridPoint.gridPointStation,
          linedata.gridPoint.stationDictList,
          linedata.gridPoint.nameToPointDict,
          linedata.xbeamData,
          initPoint
        )
      );


      let girder = GirderFrameView(
        linedata.gridPoint.gridPointStation,
        linedata.gridPoint.stationDictList,
        linedata.gridPoint.nameToPointDict,
        linedata.xbeamData,
        initPoint
      );
      group.add(
        SteelBoxGirder(
          linedata.gridPoint.gridPointStation,
          linedata.gridPoint.stationDictList,
          linedata.sectionPointDict,
          linedata.gridPoint.nameToPointDict,
          initPoint
        )
      );

      let sbg = SteelBoxGirder(
        linedata.gridPoint.gridPointStation,
        linedata.gridPoint.stationDictList,
        linedata.sectionPointDict,
        linedata.gridPoint.nameToPointDict,
        initPoint
      );
      //xbeamView//
      group.add(
        XbeamView(
          linedata.gridPoint.nameToPointDict,
          linedata.xbeamSectionDict,
          initPoint
        )
      );
      //diaphragmView//
      group.add(
        DiaView(linedata.gridPoint.nameToPointDict, linedata.diaDict, initPoint)
      );
      group.add(
        DiaView(linedata.gridPoint.nameToPointDict, linedata.vStiffDict, initPoint)
      );
      group.add(LineView(linedata.hBracingList[0].line, initPoint));
      group.add(LineView(linedata.hBracingList[1].line, initPoint));
      group.add(HBracingView(linedata.hBracingList, initPoint));
      group.add(
        HBracingPlateView(
          linedata.gridPoint.nameToPointDict,
          linedata.hBracingPlateDict,
          initPoint
        )
      );

      global.meshArr.current.push({ id: 0, mesh: group , geo:linegeo });
      // sceneAdder({ id: 0, mesh: group , geo:linegeo })
    };

    global.LiteGraph.registerNodeType("nexivil/mainfunction", MainFunction);

    return main;

}(global));
