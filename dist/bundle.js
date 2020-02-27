(function (global) {
  'use strict';

  function LineGenerator(input) {
    // console.time("for loop");
    const spacing = 10000; //단위 수정시 check

    const startPoint = [];
    const vectors = [];
    for (let i = 0; i < input.horizonDataList.length - 1; i++) {
      startPoint.push([input.horizonDataList[i][0], input.horizonDataList[i][1]]);
      vectors.push(
        Vector2d([
          [input.horizonDataList[i][0], input.horizonDataList[i][1]],
          [input.horizonDataList[i + 1][0], input.horizonDataList[i + 1][1]]
        ])
      );
    }

    const curves = [];
    for (let i = 0; i < input.horizonDataList.length - 2; i++) {
      curves.push(
        Curve(
          [input.horizonDataList[i][0], input.horizonDataList[i][1]],
          vectors[i],
          vectors[i + 1],
          input.horizonDataList[i + 1][2],
          input.horizonDataList[i + 1][3],
          input.horizonDataList[i + 1][4]
        )
      );
    }

    let segmentsStation = input.beginStation;
    const segments = { start: [], end: [] };
    segments.start.push(segmentsStation);

    segmentsStation += vectors[j].length - curves[j].beginOffset; //초기값은 항상 직선으로 시작
    segments.start.push(segmentsStation);

    for (let j = 1; j < input.horizonDataList.length - 2; j++) {
      segmentsStation +=
        vectors[j].length - curves[j].beginOffset - curves[j - 1].endOffset;
      segments.start.push(segmentsStation);

      segmentsStation += curves[j].beginClothoid.length;
      segments.start.push(segmentsStation);

      segmentsStation += curves[j].arcAngle * curves[j].arcRadius;
      segments.start.push(segmentsStation);

      segmentsStation += curves[j].endClothoid.length;
      segments.start.push(segmentsStation);
    }
    segments.end = [...segments.start];
    segments.end.shift();

    if (curves.length === 0) {
      segmentsStation += vectors[vectors.length - 1].length;
    } else {
      segmentsStation +=
        vectors[vectors.length - 1].length - curves[curves.length - 1].endOffset;
    }

    segments.end.push(segmentsStation);
    const beginStationNumber = segments.start[0];
    const endStationNumber = segments.end[segments.end.length - 1];
    const points = [];
    for (
      let i = Math.ceil(beginStationNumber / spacing) * spacing;
      i < endStationNumber;
      i += spacing
    ) {
      points.push(PointGenerator(i, 90));
    }

    return {
      vectors,
      curves,
      segments,
      beginStationNumber,
      endStationNumber,
      startPoint,
      slaveOrMaster: input.slaveOrMaster,
      input,
      points
    };
  }

  function Vector2d(xydata) {
    let vectorX = xydata[1][0] - xydata[0][0];
    let vectorY = xydata[1][1] - xydata[0][1];
    let vector = [vectorX, vectorY];
    let length = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
    let cos = vectorX / length;
    let sin = vectorY / length;
    return { vector, length, cos, sin };
  }

  function Curve(startPoint, vector1, vector2, radius, a1, a2) {
    if (radius !== 0) {
      // let vector1 = Vector2d(xydata1);
      // let vector2 = Vector2d(xydata2);
      let angle = Math.acos(
        (vector1.vector[0] * vector2.vector[0] +
          vector1.vector[1] * vector2.vector[1]) /
          (vector1.length * vector2.length)
      );
      let arcRadius = radius;
      let aBegin = a1;
      let aEnd = a2;

      let sign = 0;

      if (-1 * vector2.cos * vector1.sin + vector2.sin * vector1.cos > 0) {
        sign = 1; // Counter clockwise
      } else {
        sign = -1; // Clockwise
      }

      let beginClothoid = Clothoid(radius, a1);
      let endClothoid = Clothoid(radius, a2);
      let arcAngle = angle - beginClothoid.angle - endClothoid.angle;

      let beginOffset =
        beginClothoid.radiusCenterOffset +
        radius * Math.tan(angle / 2) +
        endClothoid.offset / Math.sin(angle) -
        beginClothoid.offset / Math.tan(angle);

      let endOffset =
        endClothoid.radiusCenterOffset +
        radius * Math.tan(angle / 2) +
        beginClothoid.offset / Math.sin(angle) -
        endClothoid.offset / Math.tan(angle);

      let beginClothoidCoord = [
        startPoint[0] + (vector1.length - beginOffset) * vector1.cos,
        startPoint[1] + (vector1.length - beginOffset) * vector1.sin
      ];

      let beginArcCoord = [
        beginClothoidCoord[0] +
          beginClothoid.totalX * vector1.cos -
          sign * beginClothoid.totalY * vector1.sin,
        beginClothoidCoord[1] +
          beginClothoid.totalX * vector1.sin +
          sign * beginClothoid.totalY * vector1.cos
      ];

      let arcCenter = [
        beginClothoidCoord[0] +
          beginClothoid.radiusCenterOffset * vector1.cos -
          sign * (radius + beginClothoid.offset) * vector1.sin,
        beginClothoidCoord[1] +
          beginClothoid.radiusCenterOffset * vector1.sin +
          sign * (radius + beginClothoid.offset) * vector1.cos
      ];

      let endArcCoord = [
        arcCenter[0] +
          (beginArcCoord[0] - arcCenter[0]) * Math.cos(arcAngle) -
          sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(arcAngle),
        arcCenter[1] +
          (beginArcCoord[1] - arcCenter[1]) * Math.cos(arcAngle) +
          sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(arcAngle)
      ];

      let endClothoidCoord = [
        endArcCoord[0] +
          endClothoid.totalX * vector2.cos +
          sign * endClothoid.totalY * vector2.sin,
        endArcCoord[1] +
          endClothoid.totalX * vector2.sin -
          sign * endClothoid.totalY * vector2.cos
      ];

      function beginClothoidStation(l) {
        let clothoidX =
          l * (1 - l ** 4 / 40 / aBegin ** 4 + l ** 8 / 3456 / aBegin ** 8);
        let clothoidY =
          (l ** 3 / 6 / aBegin ** 2) *
          (1 - l ** 4 / 56 / aBegin ** 4 + l ** 8 / 7040 / aBegin ** 8);
        let resultX =
          beginClothoidCoord[0] +
          vector1.cos * clothoidX -
          sign * vector1.sin * clothoidY;
        let resultY =
          beginClothoidCoord[1] +
          vector1.sin * clothoidX +
          sign * vector1.cos * clothoidY;
        let slopeDeltaX =
          1 - (l ** 4 * 5) / 40 / aBegin ** 4 + (l ** 8 * 9) / 3456 / aBegin ** 8;
        let slopeDeltaY =
          (l ** 2 / 6 / aBegin ** 2) *
          (3 -
            (l ** 4 * 7) / 56 / aBegin ** 4 +
            (l ** 8 * 11) / 7040 / aBegin ** 8);
        let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
        let normalCos = (sign * slopeDeltaY) / slopeLength;
        let normalSin = (-1 * slopeDeltaX) / slopeLength;
        let globalNormalCos = vector1.cos * normalCos - vector1.sin * normalSin;
        let globalNormalSin = vector1.sin * normalCos + vector1.cos * normalSin;
        return [resultX, resultY, globalNormalCos, globalNormalSin];
      }

      function endClothoidStation(l) {
        l = endClothoid.length - l;
        let clothoidX =
          endClothoid.totalX -
          l * (1 - l ** 4 / 40 / aEnd ** 4 + l ** 8 / 3456 / aEnd ** 8);
        let clothoidY =
          -1 * endClothoid.totalY +
          (l ** 3 / 6 / aEnd ** 2) *
            (1 - l ** 4 / 56 / aEnd ** 4 + l ** 8 / 7040 / aEnd ** 8);
        let resultX =
          endArcCoord[0] +
          vector2.cos * clothoidX -
          sign * vector2.sin * clothoidY;
        let resultY =
          endArcCoord[1] +
          vector2.sin * clothoidX +
          sign * vector2.cos * clothoidY;
        let slopeDeltaX =
          -1 *
          (1 - (l ** 4 * 5) / 40 / aEnd ** 4 + (l ** 8 * 9) / 3456 / aEnd ** 8);
        let slopeDeltaY =
          (l ** 2 / 6 / aEnd ** 2) *
          (3 - (l ** 4 * 7) / 56 / aEnd ** 4 + (l ** 8 * 11) / 7040 / aEnd ** 8);
        let slopeLength = Math.sqrt(slopeDeltaX ** 2 + slopeDeltaY ** 2);
        let normalCos = (-sign * slopeDeltaY) / slopeLength;
        let normalSin = slopeDeltaX / slopeLength;
        let globalNormalCos = vector2.cos * normalCos - vector2.sin * normalSin;
        let globalNormalSin = vector2.sin * normalCos + vector2.cos * normalSin;
        return [resultX, resultY, globalNormalCos, globalNormalSin];
      }

      function arcStation(l) {
        let resultX =
          arcCenter[0] +
          (beginArcCoord[0] - arcCenter[0]) * Math.cos(l / arcRadius) -
          sign * (beginArcCoord[1] - arcCenter[1]) * Math.sin(l / arcRadius);
        let resultY =
          arcCenter[1] +
          (beginArcCoord[1] - arcCenter[1]) * Math.cos(l / arcRadius) +
          sign * (beginArcCoord[0] - arcCenter[0]) * Math.sin(l / arcRadius);
        let globalNormalCos = (sign * (resultX - arcCenter[0])) / arcRadius;
        let globalNormalSin = (sign * (resultY - arcCenter[1])) / arcRadius;
        return [resultX, resultY, globalNormalCos, globalNormalSin];
      }

      let result = {
        angle,
        arcRadius,
        a1,
        a2,
        beginClothoid,
        endClothoid,
        arcAngle,
        beginOffset,
        endOffset,
        beginClothoidCoord,
        beginArcCoord,
        arcCenter,
        endArcCoord,
        endClothoidCoord,
        beginClothoidStation,
        endClothoidStation,
        arcStation,
        sign
      };
      return result;
    } else {
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
        angle,
        arcRadius,
        a1,
        a2,
        beginClothoid,
        endClothoid,
        arcAngle,
        beginOffset,
        endOffset,
        beginClothoidCoord,
        beginArcCoord,
        arcCenter,
        endArcCoord,
        endClothoidCoord
      };
      return result;
    }
  }

  function Clothoid(radius, a) {
    let length = 0;
    let angle = 0;
    let totalX = 0;
    let totalY = 0;
    let offset = 0;
    let radiusCenterOffset = 0;

    if (radius !== 0) {
      length = Math.pow(a, 2) / radius;
      angle = Math.pow(a, 2) / Math.pow(radius, 2) / 2;
      totalX =
        length *
        (1 -
          Math.pow(length, 2) / 40 / Math.pow(radius, 2) +
          Math.pow(length, 4) / 3456 / Math.pow(radius, 4));
      totalY =
        (Math.pow(length, 2) / 6 / radius) *
        (1 -
          Math.pow(length, 2) / 56 / Math.pow(radius, 2) +
          Math.pow(length, 4) / 7040 / Math.pow(radius, 4));
      offset = totalY - radius * (1 - Math.cos(angle));
      radiusCenterOffset = totalX - radius * Math.sin(angle);
    }

    return { length, angle, totalX, totalY, offset, radiusCenterOffset };
  }

  // const startPoint = [0,0]
  // const xy
  // 1 = [[5, 5], [10, 15]]
  // const xydata2 = [[10, 15], [30, 35]]
  // const radius = 100
  // const a1 = 10
  // const a2 = 10
  // const test = Curve(startPoint, xydata1, xydata2, radius, a1, a2)

  const PointGenerator = (stationNumber, line, skew) => {
    let resultPoint = {
      stationNumber: stationNumber.toFixed(4) * 1,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: stationNumber,
      offset: 0,
      virtual: false,
      skew: skew
    };
    const dataList = line.input.horizonDataList;
    const startStationNumList = line.segments.start;
    const endStationNumList = line.segments.end;

    let l = 0;
    let lineNum = 0;
    let varCase = 0;
    const startPoint = line.startPoint;
    let tempRes = [0, 0, 0, 0];

    for (let i = 0; i <= 4 * (dataList.length - 2); i++) {
      l = stationNumber - startStationNumList[i];

      lineNum = Math.floor(i / 4);
      varCase = i % 4;
      if (
        stationNumber >= startStationNumList[i] &&
        stationNumber <= endStationNumList[i]
      ) {
        switch (varCase) {
          case 0:
            if (
              i === 0 ||
              (dataList[lineNum][2] === 0 &&
                dataList[lineNum - 1][2] === 0 &&
                dataList[lineNum + 1][2] === 0)
            ) {
              tempRes[0] = startPoint[lineNum][0] + l * line.vectors[lineNum].cos;
              tempRes[1] = startPoint[lineNum][1] + l * line.vectors[lineNum].sin;
            } else {
              tempRes[0] =
                line.curves[lineNum - 1].endClothoidCoord[0] +
                l * line.vectors[lineNum].cos;
              tempRes[1] =
                line.curves[lineNum - 1].endClothoidCoord[1] +
                l * line.vectors[lineNum].sin;
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

  function VerticalPositionGenerator(
    VerticalDataList,
    SuperElevation,
    Point
  ) {
    const station = Point.masterStationNumber;
    const offset = Point.offset;
    let result_elevation = 0;
    let superelevation = 0;
    let parabola_data = [];
    let tangent = [];
    let gradX = 0;
    for (let i = 0; i < VerticalDataList.length - 1; i++) {
      tangent.push(
        (VerticalDataList[i + 1]["elevation"] -
          VerticalDataList[i]["elevation"]) /
          (VerticalDataList[i + 1]["station"] - VerticalDataList[i]["station"])
      );
    }
    for (let i = 0; i < VerticalDataList.length - 2; i++) {
      let parabola1 =
        VerticalDataList[i + 1]["station"] -
        VerticalDataList[i + 1]["curveLength"] / 2;
      let parabola2 =
        VerticalDataList[i + 1]["station"] +
        VerticalDataList[i + 1]["curveLength"] / 2;
      parabola_data.push([
        parabola1,
        parabola2,
        VerticalDataList[i]["elevation"] +
          tangent[i] * (parabola1 - VerticalDataList[i]["station"]),
        VerticalDataList[i + 1]["elevation"] +
          tangent[i + 1] * (parabola2 - VerticalDataList[i + 1]["station"]),
        VerticalDataList[i + 1]["curveLength"]
      ]);
    }
    if (station <= VerticalDataList[0]["station"]) {
      result_elevation =
        VerticalDataList[0]["elevation"] +
        tangent[0] * (station - VerticalDataList[0]["station"]);
      gradX = tangent[0];
    } else if (
      station >= VerticalDataList[VerticalDataList.length - 1]["station"]
    ) {
      result_elevation =
        VerticalDataList[VerticalDataList.length - 1]["elevation"] +
        tangent[tangent.length - 1] *
          (station - VerticalDataList[VerticalDataList.length - 1]["station"]);
      gradX = tangent[tangent.length - 1];
    } else {
      for (let i = 0; i < VerticalDataList.length - 1; i++) {
        if (
          station >= VerticalDataList[i]["station"] &&
          station < VerticalDataList[i + 1]["station"]
        ) {
          result_elevation =
            VerticalDataList[i]["elevation"] +
            tangent[i] * (station - VerticalDataList[i]["station"]);
          gradX = tangent[i];
        }
      }
      for (let i = 0; i < VerticalDataList.length - 2; i++) {
        if (station >= parabola_data[i][0] && station <= parabola_data[i][1]) {
          result_elevation =
            parabola_data[i][2] +
            tangent[i] * (station - parabola_data[i][0]) +
            ((tangent[i + 1] - tangent[i]) / 2 / parabola_data[i][4]) *
              (station - parabola_data[i][0]) ** 2;
          gradX =
            tangent[i] +
            ((tangent[i + 1] - tangent[i]) / parabola_data[i][4]) *
              (station - parabola_data[i][0]);
        }
      }
    }
    let gradient = Gradient(SuperElevation, station, offset);
    superelevation = gradient * offset;
    return {
      elevation: result_elevation + superelevation,
      gradientX: gradX,
      gradientY: gradient
    };
  }

  function Gradient(SuperElevation, station, offset) {
    // const station = Point.masterStationNumber;
    // const offset = Point.offset;
    let gradient = 0;

    if (station <= SuperElevation[0]["station"]) {
      if (offset < 0) {
        gradient = -SuperElevation[0]["left"];
      } else {
        gradient = SuperElevation[0]["right"];
      }
    } else if (station >= SuperElevation[SuperElevation.length - 1]["station"]) {
      if (offset < 0) {
        gradient = -SuperElevation[SuperElevation.length - 1]["left"];
      } else {
        gradient = SuperElevation[SuperElevation.length - 1]["right"];
      }
    } else {
      for (let i = 0; i < SuperElevation.length - 1; i++) {
        if (
          station >= SuperElevation[i]["station"] &&
          station < SuperElevation[i + 1]["station"]
        ) {
          if (offset < 0) {
            gradient = -(
              ((station - SuperElevation[i]["station"]) /
                (SuperElevation[i + 1]["station"] -
                  SuperElevation[i]["station"])) *
                (SuperElevation[i + 1]["left"] - SuperElevation[i]["left"]) +
              SuperElevation[i]["left"]
            );
          } else {
            gradient =
              ((station - SuperElevation[i]["station"]) /
                (SuperElevation[i + 1]["station"] -
                  SuperElevation[i]["station"])) *
                (SuperElevation[i + 1]["right"] - SuperElevation[i]["right"]) +
              SuperElevation[i]["right"];
          }
        }
      }
    }
    return gradient / 100;
  }

  function Line() {
    this.addInput("horizon", "arr");
    this.addInput("vertical", "arr");
    this.addInput("superElevation", "arr");
    this.addInput("beginStation", "number");
    this.addInput("slaveOrMaster", "boolean");
    this.addOutput("line", "line");
  }

  Line.prototype.onExecute = function() {
    const horizonDataList = this.getInputData(0);
    const verticalDataList = this.getInputData(1);
    const superElevation = this.getInputData(2);
    const beginStation = this.getInputData(3); //769452.42;
    const slaveOrMaster = this.getInputData(4); //true;

    const input = { beginStation, horizonDataList, slaveOrMaster };

    let line = LineGenerator(input);
    let zPosition = 0;
    //   let line2 = OffsetLine(20,line)
    for (let i = 0; i < line.points.length; i++) {
      zPosition = VerticalPositionGenerator(
        verticalDataList,
        superElevation,
        line.points[i]
      ).elevation;
      line.points[i].z = zPosition;
    }
    this.setOutputData(0, line);
  };

  global.LiteGraph.registerNodeType("nexivil/lineGen", Line);

}(global));
