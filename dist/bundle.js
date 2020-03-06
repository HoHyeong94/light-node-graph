(function (global) {
  'use strict';

  function LineToThree(linepoints, initPoint) {
    var group = new global.THREE.Group();
    var geometry = new global.THREE.Geometry();
    const xInit = initPoint.x;
    const yInit = initPoint.y;
    const zInit = initPoint.z;
    for (let i = 0; i < linepoints.length; i++) {
      geometry.vertices.push(
        new global.THREE.Vector3(
          linepoints[i].x - xInit,
          linepoints[i].y - yInit,
          linepoints[i].z - zInit
        )
      );
    }
    var line = new global.THREE.Line(
      geometry,
      new global.THREE.LineBasicMaterial({ color: 0xffff00 })
    );
    group.add(line);
    return group;
  }

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

    segmentsStation += vectors[0].length - curves[0].beginOffset; //초기값은 항상 직선으로 시작
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
      points.push(
        PointGenerator(i, { input, segments, startPoint, vectors, curves }, 90)
      );
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
      stationNumber: Number.parseFloat(stationNumber).toFixed(4) * 1,
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
        (VerticalDataList[i + 1][1] - VerticalDataList[i][1]) /
          (VerticalDataList[i + 1][0] - VerticalDataList[i][0])
      );
    }
    for (let i = 0; i < VerticalDataList.length - 2; i++) {
      let parabola1 = VerticalDataList[i + 1][0] - VerticalDataList[i + 1][2] / 2;
      let parabola2 = VerticalDataList[i + 1][0] + VerticalDataList[i + 1][2] / 2;
      parabola_data.push([
        parabola1,
        parabola2,
        VerticalDataList[i][1] +
          tangent[i] * (parabola1 - VerticalDataList[i][0]),
        VerticalDataList[i + 1][1] +
          tangent[i + 1] * (parabola2 - VerticalDataList[i + 1][0]),
        VerticalDataList[i + 1][2]
      ]);
    }
    if (station <= VerticalDataList[0][0]) {
      result_elevation =
        VerticalDataList[0][1] + tangent[0] * (station - VerticalDataList[0][0]);
      gradX = tangent[0];
    } else if (station >= VerticalDataList[VerticalDataList.length - 1][0]) {
      result_elevation =
        VerticalDataList[VerticalDataList.length - 1][1] +
        tangent[tangent.length - 1] *
          (station - VerticalDataList[VerticalDataList.length - 1][0]);
      gradX = tangent[tangent.length - 1];
    } else {
      for (let i = 0; i < VerticalDataList.length - 1; i++) {
        if (
          station >= VerticalDataList[i][0] &&
          station < VerticalDataList[i + 1][0]
        ) {
          result_elevation =
            VerticalDataList[i][1] +
            tangent[i] * (station - VerticalDataList[i][0]);
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

    if (station <= SuperElevation[0][0]) {
      if (offset < 0) {
        gradient = -SuperElevation[0][1];
      } else {
        gradient = SuperElevation[0][2];
      }
    } else if (station >= SuperElevation[SuperElevation.length - 1][0]) {
      if (offset < 0) {
        gradient = -SuperElevation[SuperElevation.length - 1][1];
      } else {
        gradient = SuperElevation[SuperElevation.length - 1][2];
      }
    } else {
      for (let i = 0; i < SuperElevation.length - 1; i++) {
        if (
          station >= SuperElevation[i][0] &&
          station < SuperElevation[i + 1][0]
        ) {
          if (offset < 0) {
            gradient = -(
              ((station - SuperElevation[i][0]) /
                (SuperElevation[i + 1][0] - SuperElevation[i][0])) *
                (SuperElevation[i + 1][1] - SuperElevation[i][1]) +
              SuperElevation[i][1]
            );
          } else {
            gradient =
              ((station - SuperElevation[i][0]) /
                (SuperElevation[i + 1][0] - SuperElevation[i][0])) *
                (SuperElevation[i + 1][2] - SuperElevation[i][2]) +
              SuperElevation[i][2];
          }
        }
      }
    }
    return gradient / 100;
  }

  function OffsetLine(line, offset) {
    const points = [];
    //let lineResult = {...line}
    //   let points = [];
    for (let i = 0; i < line.points.length; i++) {
      let resultPoint = {
        stationNumber: line.points[i].stationNumber,
        x: line.points[i].x + line.points[i].normalCos * offset,
        y: line.points[i].y + line.points[i].normalSin * offset,
        z: 0,
        normalCos: line.points[i].normalCos,
        normalSin: line.points[i].normalSin,
        masterStationNumber: line.points[i].stationNumber,
        offset: offset,
        virtual: false
      };
      points.push(resultPoint);
    }

    return points;
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

    const input = { beginStation, horizonDataList, slaveOrMaster, verticalDataList, superElevation };

    let line = LineGenerator(input);
    this.points = line.points;
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

  Line.prototype.on3DExecute = function() {
    global.meshArr.current.push({
      id: 0,
      mesh: LineToThree(this.points, { x: 0, y: 0, z: 0 })
    });
  };

  function LineOffset() {
    this.addInput("line", "line");
    this.addInput("offsets", 0);
    this.addOutput("lines", "arr");
  }
  LineOffset.prototype.onExecute = async function() {
    const line = this.getInputData(0);
    const offsets = this.getInputData(1);

    function offPerform(o) {
      return new Promise((res, rej) => {
        res(OffsetLine(line, o));
      });
    }

    if (Array.isArray(offsets)) {
      const tasks = offsets.map(offPerform);
      const r = await Promise.all(tasks);
      return this.setOutputData(0, r);
    }

    const r = await offPerform(offsets);
    return this.setOutputData(0, r);
  };

  function GirderLayoutGenerator(girderLayoutInput, mLine, hLine) {
    const {
      verticalDataList: VerticalDataList,
      superElevation: SuperElevation
    } = mLine.input;
    let result = {
      masterLine: {},
      girderLine: [],
      centralSupportPoint: [],
      girderSupportPoint: [],
      // girderInfoList :[],
      // girderLengthList :[],
      girderSpanPoint: []
    };
    //   let girderInfoObj = {
    //     number: 0,
    //     baseLine: {},
    //     alignOffset: 0,
    //     girderLine: {},
    //     outerBeam: false
    //   };
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
    let supportStation = girderLayoutInput.baseValue;

    result.masterLine = mLine;

    let i = 0;
    let girderInfoList = [];
    for (let j = 0; j < girderDataList.length; j++) {
      const girderInfo = {
        number: 0,
        baseLine: {},
        alignOffset: 0,
        girderLine: {},
        outerBeam: false
      };

      girderInfo.number = i;
      girderInfo.baseLine = mLine;
      girderInfo.girderLine = {
        vectors: mLine.vectors,
        curves: mLine.curves,
        segments: mLine.segments,
        beginStationNumber: mLine.beginStationNumber,
        endStationNumber: mLine.endStationNumber,
        startPoint: [],
        slaveOrMaster: false,
        input: mLine.inputs,
        points: hLine[girderDataList[j]]
      };
      // console.log("GirderInfo")
      // console.log(girderInfo)

      // girderInfo.girderLine = OffsetLine(
      //   girderDataList[j].alignOffset,
      //   girderInfoObj.baseLine
      // );
      girderInfo.alignOffset = girderInfo.girderLine.points[0].offset; //girderDataList[j].alignOffset;
      girderInfo.outerBeam = false; // girderDataList[j].isBeam ? true : false;
      girderInfoList.push(girderInfo);
      i += 1;
    }
    //console.log(supportDataList)
    result.centralSupportPoint.push(
      PointGenerator(supportStation, result.masterLine, supportDataList[0][0])
    );
    for (i = 1; i < supportDataList.length; i++) {
      supportStation = supportStation + supportDataList[i][1];
      result.centralSupportPoint.push(
        PointGenerator(supportStation, result.masterLine, supportDataList[i][0])
      );
    }
    for (let i = 0; i < girderInfoList.length; i++) {
      result.girderSupportPoint.push(
        SupportSkewPointGenerator(
          result.centralSupportPoint,
          result.masterLine,
          girderInfoList[i].girderLine,
          supportDataList,
          VerticalDataList,
          SuperElevation
        )
      );
      result.girderLine.push(girderInfoList[i].girderLine);
    }
    for (let i = 0; i < result.girderSupportPoint.length; i++) {
      // i:girderIndex
      let PointsList = [];
      for (let j = 1; j < result.girderSupportPoint[i].length - 2; j++) {
        // j:supportIndex
        let Points = [];
        Points.push(result.girderSupportPoint[i][j]);
        for (let k = 0; k < girderInfoList[i].girderLine.points.length; k++) {
          if (
            girderInfoList[i].girderLine.points[k].masterStationNumber >
              result.girderSupportPoint[i][j].masterStationNumber &&
            girderInfoList[i].girderLine.points[k].masterStationNumber <
              result.girderSupportPoint[i][j + 1].masterStationNumber
          ) {
            Points.push(girderInfoList[i].girderLine.points[k]);
          }
        }
        Points.push(result.girderSupportPoint[i][j + 1]);
        PointsList.push(Points);
      }
      result.girderSpanPoint.push(PointsList);
    }
    return result;
  }

  function SupportSkewPointGenerator(
    centralSupportPoint,
    masterLine,
    girderLine,
    supportDatalist,
    VerticalDataList,
    SuperElevation
  ) {
    let resultPoint = [];
    for (let i = 0; i < centralSupportPoint.length; i++) {
      let skew = supportDatalist[i][0];
      if (skew !== 0) {
        let dummyPoint = LineMatch(
          centralSupportPoint[i],
          masterLine,
          girderLine,
          skew,
          VerticalDataList,
          SuperElevation
        );
        resultPoint.push(dummyPoint);
      } else {
        console.log("Skew value is not available");
        resultPoint = null;
      }
    }
    return resultPoint;
  }

  function LineMatch(
    masterPoint,
    masterLine,
    slaveLine,
    skew,
    VerticalDataList,
    SuperElevation
  ) {
    let resultPoint = {
      stationNumber: 0,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: 0,
      offset: 0,
      virtual: false,
      skew: skew,
      gradientX: 0,
      gradientY: 0
    };
    const unitVx = -1 * masterPoint.normalSin;
    const unitVy = masterPoint.normalCos;
    const skewRadian = (skew * Math.PI) / 180;
    let dX = unitVx * Math.cos(skewRadian) - unitVy * Math.sin(skewRadian);
    let dY = unitVx * Math.sin(skewRadian) + unitVy * Math.cos(skewRadian);
    let alpha = dY;
    let beta = -1 * dX;
    let gamma = -alpha * masterPoint.x - beta * masterPoint.y;
    let dummy1 = 0;
    let dummy2 = 0;
    let sign = 1;
    for (let i = 0; i < slaveLine.points.length - 1; i++) {
      dummy1 =
        alpha * slaveLine.points[i].x + beta * slaveLine.points[i].y + gamma;
      dummy2 =
        alpha * slaveLine.points[i + 1].x +
        beta * slaveLine.points[i + 1].y +
        gamma;
      if (dummy1 === 0) {
        resultPoint = slaveLine.points[i];
        break;
      } else if (dummy2 === 0) {
        resultPoint = slaveLine.points[i + 1];
        break;
      } else if (dummy1 * dummy2 < 0) {
        let coe = splineCoefficient(slaveLine.points[i], slaveLine.points[i + 1]);
        let a = alpha * coe.a2 + beta * coe.a1;
        let b = alpha * coe.b2 + beta * coe.b1;
        let c = alpha * coe.c2 + beta * coe.c1 + gamma;
        let t = 0;
        if (a == 0) {
          t = -c / b;
        } else {
          t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          if (t > 1 || t < -1) {
            t = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          }
        }

        let deltaX = 2 * coe.a2 * t + coe.b2;
        let deltaY = 2 * coe.a1 * t + coe.b1;
        let len = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        resultPoint.normalCos = -deltaY / len;
        resultPoint.normalSin = deltaX / len;
        resultPoint.x = coe.a2 * t ** 2 + coe.b2 * t + coe.c2;
        resultPoint.y = coe.a1 * t ** 2 + coe.b1 * t + coe.c1;
        //   let segLen = splineLength(slaveLine.points[i],slaveLine.points[i+1]);
        //   let resultLen = splineLength(slaveLine.points[i],resultPoint);
        //   resultPoint.stationNumber = slaveLine.points[i].stationNumber + (slaveLine.points[i+1].stationNumber - slaveLine.points[i].stationNumber) * resultLen/segLen;
        let MasterPoint = PointLineMatch(resultPoint, masterLine);
        resultPoint.masterStationNumber =
          MasterPoint.masterStationNumber.toFixed(4) * 1;
        resultPoint.stationNumber = resultPoint.masterStationNumber;
        if (
          MasterPoint.normalCos * (resultPoint.x - MasterPoint.x) +
            MasterPoint.normalSin * (resultPoint.y - MasterPoint.y) >=
          0
        ) {
          sign = 1;
        } else {
          sign = -1;
        }
        resultPoint.offset =
          sign *
          Math.sqrt(
            (resultPoint.x - MasterPoint.x) ** 2 +
              (resultPoint.y - MasterPoint.y) ** 2
          ).toFixed(4) *
          1;
        let verticalInfo = VerticalPositionGenerator(
          VerticalDataList,
          SuperElevation,
          resultPoint
        );
        resultPoint.z = verticalInfo.elevation;
        resultPoint.gradientX = verticalInfo.gradientX;
        resultPoint.gradientY = verticalInfo.gradientY;
        break;
      }
    }
    return resultPoint;
  }

  function PointLineMatch(targetPoint, masterLine) {
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

    for (let i = 0; i < masterLine.segments.start.length; i++) {
      station1 = masterLine.segments.start[i];
      station2 = masterLine.segments.end[i];
      point1 = PointGenerator(station1, masterLine, 90);
      point2 = PointGenerator(station2, masterLine, 90);
      crossproduct1 =
        (targetPoint.x - point1.x) * point1.normalSin -
        (targetPoint.y - point1.y) * point1.normalCos;
      crossproduct2 =
        (targetPoint.x - point2.x) * point2.normalSin -
        (targetPoint.y - point2.y) * point2.normalCos;

      if (crossproduct1 * crossproduct2 < 0) {
        a = false;
        break;
      } else if (Math.abs(crossproduct1) < err) {
        resultPoint = { ...point1 };
        break;
      } else if (Math.abs(crossproduct2) < err) {
        resultPoint = { ...point2 };
        break;
      }
    }
    if (a == false) {
      while (Math.abs(innerproduct) > err) {
        innerproduct =
          (targetPoint.x - point1.x) * -point1.normalSin +
          (targetPoint.y - point1.y) * point1.normalCos;
        station3 = station1 + innerproduct;
        point1 = PointGenerator(station3, masterLine, 90);
        station1 = point1.stationNumber;
        crossproduct1 =
          (targetPoint.x - point1.x) * point1.normalSin -
          (targetPoint.y - point1.y) * point1.normalCos;
        resultPoint = { ...point1 };
        num_iter += 1;
        if (num_iter == 200) {
          break;
        }
      }
    }
    //targetPoint.master_station_number = result.station_number
    return resultPoint;
  }

  function splineCoefficient(point1, point2) {
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
    if (point1.normalSin === 0) {
      if (point2.normalSin === 0) ; else {
        df2 = -point2.normalCos / point2.normalSin;
        a2 = b2 / 2;
        a1 = (-b1 + df2 * (2 * a2 + b2)) / 2;
      }
    } else if (point2.normalSin === 0) {
      if (point2.normalSin === 0) ; else {
        df1 = -point1.normalCos / point1.normalSin;
        a2 = b2 / -2;
        a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
      }
    } else {
      df1 = -point1.normalCos / point1.normalSin;
      df2 = -point2.normalCos / point2.normalSin;

      if (df1 === df2) {
        a1 = 0;
        a2 = 0;
      } else {
        a2 = (2 * b1 - (df1 + df2) * b2) / (2 * (df2 - df1));
        a1 = (-b1 + df1 * (-2 * a2 + b2)) / -2;
      }
    }
    const c1 = y2 - a1 - b1;
    const c2 = x2 - a2 - b2;
    return { a1: a1, b1: b1, c1: c1, a2: a2, b2: b2, c2: c2 };
  }

  // export const splineLength =(point1, point2) =>{
  //     const coe = splineCoefficient(point1,point2)
  //     const w1 = 5/9
  //     const w2 = 8/9
  //     const w3 = w1
  //     const t1 = -0.77459666924
  //     const t2 = 0
  //     const t3 = 0.77459666924

  //     let length = Math.sqrt(Math.pow((2 * coe.a1 * t1 + coe.b1), 2) + Math.pow((2 * coe.a2 * t1 + coe.b2),2)) * w1
  //             + Math.sqrt(Math.pow((2 * coe.a1 * t2 + coe.b1), 2) + Math.pow((2 * coe.a2 * t2 + coe.b2),2)) * w2
  //             + Math.sqrt(Math.pow((2 * coe.a1 * t3 + coe.b1), 2) + Math.pow((2 * coe.a2 * t3 + coe.b2),2)) * w3
  //     return length.toFixed(4)*1
  // }

  function GridPointGenerator2(
    masterLine,
    girderLayout,
    SEShape,
    startSkew,
    endSkew,
    VerticalDataList,
    SuperElevation,
    diaPhragmLocate,
    vStiffLocate,
    splice,
    joint,
    height,
    taperedPoint
  ) {
    let gridPointStation = [];
    let stationDictList = [];
    let nameToPointDict = {};
    const girderNumber = girderLayout.girderSupportPoint.length;
    const spanNumber = girderLayout.girderSpanPoint[0].length;
    let pointName = "";

    for (let i = 0; i < girderNumber; i++) {
      let kNum = 1;
      let ptsList = [];
      let stationDict = [];
      for (let j = 0; j < spanNumber; j++) {
        let pts = [];
        let stationToNameDict = {};
        pointName = "G" + (i + 1) + "S" + (j + 1);
        stationToNameDict[
          girderLayout.girderSupportPoint[i][j + 1].masterStationNumber
        ] = pointName;
        nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j + 1];
        pointName = "G" + (i + 1) + "S" + (j + 2);
        stationToNameDict[
          girderLayout.girderSupportPoint[i][j + 2].masterStationNumber
        ] = pointName;
        if (j === spanNumber - 1) {
          nameToPointDict[pointName] = girderLayout.girderSupportPoint[i][j + 2];
        }
        let skewedStation = [];
        if (j === 0) {
          let masterPoint = girderLayout.centralSupportPoint[0];
          let offset = 0;
          for (let k = 0; k < 3; k++) {
            pointName = "G" + (i + 1) + "K" + kNum;
            kNum += 1;
            if (k === 0) {
              offset = SEShape.start.A + SEShape.start.D; // neede to minus sign
            } else if (k === 1) {
              offset = SEShape.start.A + SEShape.start.D + SEShape.start.F; // neede to minus sign
            } else {
              offset =
                SEShape.start.A +
                SEShape.start.D +
                SEShape.start.F +
                SEShape.start.G;
            }
            let skew = OffsetSkewCalculator(
              masterPoint,
              startSkew,
              offset,
              masterLine
            );
            let centerPoint = PointGenerator(
              masterPoint.masterStationNumber + offset,
              masterLine,
              skew
            );
            let skewPoint = LineMatch(
              centerPoint,
              masterLine,
              girderLayout.girderLine[i],
              skew,
              VerticalDataList,
              SuperElevation
            );
            skewedStation.push(skewPoint.masterStationNumber);
            stationToNameDict[skewPoint.masterStationNumber] = pointName;
            nameToPointDict[pointName] = skewPoint;
          }
        } else if (j === spanNumber - 1) {
          let masterPoint =
            girderLayout.centralSupportPoint[
              girderLayout.centralSupportPoint.length - 1
            ];
          let offset = 0;
          for (let k = 3; k < 6; k++) {
            pointName = "G" + (i + 1) + "K" + kNum;
            kNum += 1;
            if (k === 3) {
              offset =
                SEShape.end.A + SEShape.end.D + SEShape.end.F + SEShape.end.G;
            } else if (k === 4) {
              offset = SEShape.end.A + SEShape.end.D + SEShape.end.F; // neede to minus sign
            } else {
              offset = SEShape.end.A + SEShape.end.D; // neede to minus sign
            }
            let skew = OffsetSkewCalculator(
              masterPoint,
              endSkew,
              -1 * offset,
              masterLine
            );
            let centerPoint = PointGenerator(
              masterPoint.masterStationNumber - offset,
              masterLine,
              skew
            );
            let skewPoint = LineMatch(
              centerPoint,
              masterLine,
              girderLayout.girderLine[i],
              skew,
              VerticalDataList,
              SuperElevation
            );
            skewedStation.push(skewPoint.masterStationNumber);
            stationToNameDict[skewPoint.masterStationNumber] = pointName;
            nameToPointDict[pointName] = skewPoint;
          }
        }
        pts.push(girderLayout.girderSupportPoint[i][j + 1].masterStationNumber);
        pts.push(girderLayout.girderSupportPoint[i][j + 2].masterStationNumber);
        pts.push(...skewedStation);
        stationDict.push(stationToNameDict);
        ptsList.push(pts);
      }
      gridPointStation.push(ptsList);
      stationDictList.push(stationDict);
    }
    diaPhragmLocate.forEach(function(elem) {
      pointName = elem[0];
      let i = pointName.substr(1, 1) * 1 - 1;
      let masterstation =
        nameToPointDict[elem[1]].masterStationNumber + elem[2];
      let masterPoint = PointGenerator(masterstation, masterLine);
      for (let j = 0; j < spanNumber; j++) {
        if (
          masterstation >=
            girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
          masterstation <=
            girderLayout.centralSupportPoint[j + 2].masterStationNumber
        ) {
          stationDictList[i][j][masterstation] = pointName;
          gridPointStation[i][j].push(masterstation);
          nameToPointDict[pointName] = SplinePointGenerator(
            masterPoint,
            girderLayout.girderSpanPoint[i][j],
            VerticalDataList,
            SuperElevation
          );
          break;
        }
      }
    });

    vStiffLocate.forEach(function(elem) {
      pointName = elem[0];
      let i = pointName.substr(1, 1) * 1 - 1;
      let masterstation =
        nameToPointDict[elem[1]].masterStationNumber + elem[2];
      let masterPoint = PointGenerator(masterstation, masterLine);
      for (let j = 0; j < spanNumber; j++) {
        if (
          masterstation >=
            girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
          masterstation <=
            girderLayout.centralSupportPoint[j + 2].masterStationNumber
        ) {
          stationDictList[i][j][masterstation] = pointName;
          gridPointStation[i][j].push(masterstation);
          nameToPointDict[pointName] = SplinePointGenerator(
            masterPoint,
            girderLayout.girderSpanPoint[i][j],
            VerticalDataList,
            SuperElevation
          );
          break;
        }
      }
    });

    splice.forEach(function(elem) {
      pointName = elem[0];
      let i = pointName.substr(1, 1) * 1 - 1;
      let masterstation =
        nameToPointDict[elem[1]].masterStationNumber + elem[2];
      let masterPoint = PointGenerator(masterstation, masterLine);
      for (let j = 0; j < spanNumber; j++) {
        if (
          masterstation >=
            girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
          masterstation <=
            girderLayout.centralSupportPoint[j + 2].masterStationNumber
        ) {
          stationDictList[i][j][masterstation] = pointName;
          gridPointStation[i][j].push(masterstation);
          nameToPointDict[pointName] = SplinePointGenerator(
            masterPoint,
            girderLayout.girderSpanPoint[i][j],
            VerticalDataList,
            SuperElevation
          );
          break;
        }
      }
    });
    joint.forEach(function(elem) {
      pointName = elem[0];
      let i = pointName.substr(1, 1) * 1 - 1;
      let masterstation =
        nameToPointDict[elem[1]].masterStationNumber + elem[2];
      let masterPoint = PointGenerator(masterstation, masterLine);
      for (let j = 0; j < spanNumber; j++) {
        if (
          masterstation >=
            girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
          masterstation <=
            girderLayout.centralSupportPoint[j + 2].masterStationNumber
        ) {
          stationDictList[i][j][masterstation] = pointName;
          gridPointStation[i][j].push(masterstation);
          nameToPointDict[pointName] = SplinePointGenerator(
            masterPoint,
            girderLayout.girderSpanPoint[i][j],
            VerticalDataList,
            SuperElevation
          );
          break;
        }
      }
    });

    height.forEach(function(elem) {
      pointName = elem[0];
      let i = pointName.substr(1, 1) * 1 - 1;
      let masterstation =
        nameToPointDict[elem[1]].masterStationNumber + elem[2];
      let masterPoint = PointGenerator(masterstation, masterLine);
      for (let j = 0; j < spanNumber; j++) {
        if (
          masterstation >=
            girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
          masterstation <=
            girderLayout.centralSupportPoint[j + 2].masterStationNumber
        ) {
          stationDictList[i][j][masterstation] = pointName;
          gridPointStation[i][j].push(masterstation);
          nameToPointDict[pointName] = SplinePointGenerator(
            masterPoint,
            girderLayout.girderSpanPoint[i][j],
            VerticalDataList,
            SuperElevation
          );
          break;
        }
      }
    });

    taperedPoint.forEach(function(elem) {
      pointName = elem[0];
      let i = pointName.substr(1, 1) * 1 - 1;
      let masterstation =
        nameToPointDict[elem[1]].masterStationNumber + elem[2];
      let masterPoint = PointGenerator(masterstation, masterLine);
      for (let j = 0; j < spanNumber; j++) {
        if (
          masterstation >=
            girderLayout.centralSupportPoint[j + 1].masterStationNumber &&
          masterstation <=
            girderLayout.centralSupportPoint[j + 2].masterStationNumber
        ) {
          stationDictList[i][j][masterstation] = pointName;
          gridPointStation[i][j].push(masterstation);
          nameToPointDict[pointName] = SplinePointGenerator(
            masterPoint,
            girderLayout.girderSpanPoint[i][j],
            VerticalDataList,
            SuperElevation
          );
          break;
        }
      }
    });

    for (let i in gridPointStation) {
      for (let j in gridPointStation[i]) {
        gridPointStation[i][j].sort();
      }
    }

    return { gridPointStation, stationDictList, nameToPointDict };
  }

  function OffsetSkewCalculator(
    masterPoint,
    masterSkew,
    offset,
    masterLine
  ) {
    const startSkew = masterSkew;
    let offsetStation = masterPoint.masterStationNumber + offset;
    const offsetPoint = PointGenerator(offsetStation, masterLine);
    let sign = 1;
    if (
      masterPoint.normalCos * offsetPoint.normalSin -
        masterPoint.normalSin * offsetPoint.normalCos >=
      0
    ) {
      sign = 1;
    } else {
      sign = -1;
    }
    let deltaSkew =
      (
        (Math.acos(
          masterPoint.normalCos * offsetPoint.normalCos +
            masterPoint.normalSin * offsetPoint.normalSin
        ) *
          180) /
        Math.PI
      ).toFixed(4) * 1;
    let offsetSkew = startSkew - sign * deltaSkew;
    if (offsetSkew > 90) {
      offsetSkew -= 180;
    } else if (offsetSkew < -90) {
      offsetSkew += 180;
    }
    return offsetSkew;
  }

  function SplinePointGenerator(
    masterPoint,
    slavePoints,
    VerticalDataList,
    SuperElevation
  ) {
    let resultPoint = {
      stationNumber: 0,
      x: 0,
      y: 0,
      z: 0,
      normalCos: 0,
      normalSin: 0,
      masterStationNumber: 0,
      offset: 0,
      virtual: false,
      skew: 90
    };

    let dX = masterPoint.normalCos;
    let dY = masterPoint.normalSin;
    let alpha = dY;
    let beta = -1 * dX;
    let gamma = -alpha * masterPoint.x - beta * masterPoint.y;
    let dummy1 = 0;
    let dummy2 = 0;
    let sign = 1;
    for (let i = 0; i < slavePoints.length - 1; i++) {
      dummy1 = alpha * slavePoints[i].x + beta * slavePoints[i].y + gamma;
      dummy2 = alpha * slavePoints[i + 1].x + beta * slavePoints[i + 1].y + gamma;
      if (dummy1 === 0) {
        resultPoint = slavePoints[i];
        break;
      } else if (dummy2 === 0) {
        resultPoint = slavePoints[i + 1];
        break;
      } else if (dummy1 * dummy2 < 0) {
        let coe = splineCoefficient(slavePoints[i], slavePoints[i + 1]);
        let a = alpha * coe.a2 + beta * coe.a1;
        let b = alpha * coe.b2 + beta * coe.b1;
        let c = alpha * coe.c2 + beta * coe.c1 + gamma;
        let t = 0;
        if (a == 0) {
          t = -c / b;
        } else {
          t = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          if (t > 1 || t < -1) {
            t = (-b - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
          }
        }
        let deltaX = 2 * coe.a2 * t + coe.b2;
        let deltaY = 2 * coe.a1 * t + coe.b1;
        let len = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        resultPoint.normalCos = -deltaY / len;
        resultPoint.normalSin = deltaX / len;
        resultPoint.x = coe.a2 * t ** 2 + coe.b2 * t + coe.c2;
        resultPoint.y = coe.a1 * t ** 2 + coe.b1 * t + coe.c1;
        resultPoint.masterStationNumber =
          masterPoint.masterStationNumber.toFixed(4) * 1;
        resultPoint.stationNumber = resultPoint.masterStationNumber;
        if (
          masterPoint.normalCos * (resultPoint.x - masterPoint.x) +
            masterPoint.normalSin * (resultPoint.y - masterPoint.y) >=
          0
        ) {
          sign = 1;
        } else {
          sign = -1;
        }
        resultPoint.offset =
          sign *
          Math.sqrt(
            (resultPoint.x - masterPoint.x) ** 2 +
              (resultPoint.y - masterPoint.y) ** 2
          ).toFixed(4) *
          1;
        let verticalInfo = VerticalPositionGenerator(
          VerticalDataList,
          SuperElevation,
          resultPoint
        );
        resultPoint.z = verticalInfo.elevation;
        resultPoint.gradientX = verticalInfo.gradientX;
        resultPoint.gradientY = verticalInfo.gradientY;
        break;
      }
    }
    return resultPoint;
  }

  function GirdersGen() {
    this.addInput("girderlayoutInput", "arr");
    this.addInput("masterLine", "arr");
    this.addInput("line", "arr");
    this.addOutput("girderLayout", "arr");
  }

  GirdersGen.prototype.onExecute = function() {
    const girderlayoutInput = this.getInputData(0);
    const mLine = this.getInputData(1);
    const hLine = this.getInputData(2);
    const result = GirderLayoutGenerator(girderlayoutInput, mLine, hLine);
    result.input = girderlayoutInput;
    this.setOutputData(0, result);
  };

  function GridPoint() {
    this.addInput("gridPointInput", "obj");
    this.addInput("masterLine", "arr");
    this.addInput("girderLayout", "arr");
    this.addOutput("gridPoint", "arr");
  }

  GridPoint.prototype.onExecute = function() {
    const line = this.getInputData(1);
    const girderLayout = this.getInputData(2);
    const {
      SEShape,
      diaPhragmLocate,
      vStiffLocate,
      splice,
      joint,
      height,
      taperedPoint
    } = this.getInputData(0);
    const { verticalDataList, superElevation } = this.getInputData(1).input;
    const startSkew = girderLayout.input.supportData[0].angle;
    const endSkew =
      girderLayout.input.supportData[girderLayout.input.supportData.length - 1].angle;

    const result = GridPointGenerator2(
      line,
      girderLayout,
      SEShape,
      startSkew,
      endSkew,
      verticalDataList,
      superElevation,
      diaPhragmLocate,
      vStiffLocate,
      splice,
      joint,
      height,
      taperedPoint
    );
    this.setOutputData(0, result);
  };

  function WebPoint(point1, point2, tan1, H){
    let x;
    let y;
    if (point1.x === point2.x){
      x = point1.x;
      y = tan1 === null? null : tan1 * (x) + H;
    }else{
      let a = (point1.y - point2.y) / (point1.x - point2.x);
      let b = point1.y - a * point1.x;
      x = tan1 === null? point1.x:(b - H) / (tan1 - a);
      y = a * (x) + b; 
    }
    return {x,y}
  }

  function PlateRestPoint(point1, point2, tan1, tan2, thickness){
    let x3;
    let x4;
    let y3;
    let y4;
    if (point1.x === point2.x){
      x3 = point1.x + thickness; 
      x4 = point2.x + thickness;
      y3 = tan1 === null? null : tan1 * (x3 - point1.x) + point1.y;
      y4 = tan2 === null? null : tan2 * (x4 - point2.x) + point2.y;
    }else{
      let a = (point1.y - point2.y) / (point1.x - point2.x);
      let b = point1.y - a * point1.x;
      let alpha = thickness * Math.sqrt(1 + 1/a**2);
      x3 = tan1 === null? point1.x:(-a * alpha + b + tan1 * point1.x - point1.y) / (tan1 - a);
      x4 = tan2 === null? point2.x:(-a * alpha + b + tan2 * point2.x - point2.y) / (tan2 - a);
      y3 = a ===0? point1.y + thickness : a * (x3 - alpha) + b; 
      y4 = a ===0? point2.y + thickness : a * (x4 - alpha) + b;
    }
    return [point1,point2,{x:x4,y:y4},{x:x3,y:y3}]
  }

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
          let sp = nameToPointDict[girderBaseInfo.height[i][0]];
          let ep = nameToPointDict[girderBaseInfo.height[i][1]];
          if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
              deltaH = girderBaseInfo.height[i][2] - girderBaseInfo.height[i][3];
              L = ep.masterStationNumber - sp.masterStationNumber;
              if (girderBaseInfo.height[i][4] == "circle"){
                  if (deltaH>0){
                      R = Math.abs((L**2 + deltaH**2) / 2 / deltaH);
                      x1 = ep.masterStationNumber - station;
                      height = girderBaseInfo.height[i][3] + (R -Math.sqrt(R**2 - x1**2));
                  }else if (deltaH<0){
                      R = Math.abs((L**2 + deltaH**2) / 2 / deltaH);
                      x1 = station - sp.masterStationNumber;
                      height = girderBaseInfo.height[i][2] + (R -Math.sqrt(R**2 - x1**2));
                  }else{
                      height = girderBaseInfo.height[i][2];
                  }
              }else if (girderBaseInfo.height[i][4] == "parabola"){
                  if (deltaH>0){
                      x1 = ep.masterStationNumber - station;
                      height = girderBaseInfo.height[i][3] + deltaH / L**2 * x1**2;
                  }else if (deltaH<0){
                      x1 = station - sp.masterStationNumber;
                      height = girderBaseInfo.height[i][2] - deltaH / L**2 * x1**2;
                  }else{
                      height = girderBaseInfo.height[i][2];
                  }
              }else{  //straight
                  x1 = station - sp.masterStationNumber;
                  height = girderBaseInfo.height[i][2] - x1/L * deltaH;
              }
              break;
          }
      }
      forward.height = height;
      backward.height = height;


      let slabThickness = 0;
      for (let i = 0; i< girderBaseInfo.slabThickness.length;i++){
          let sp = nameToPointDict[girderBaseInfo.slabThickness[i][0]];
          let ep = nameToPointDict[girderBaseInfo.slabThickness[i][1]];
          if (station >= sp.masterStationNumber && station <= ep.masterStationNumber){
              deltaH = girderBaseInfo.slabThickness[i][2] - girderBaseInfo.slabThickness[i][3];
              L = ep.masterStationNumber - sp.masterStationNumber;
              //straight
              x1 = station - sp.masterStationNumber;
              slabThickness = girderBaseInfo.slabThickness[i][2] - x1/L * deltaH;
              break;
          }else{
              slabThickness = 270; // slab thickness추후 예외상황없도록 수정
          }
      }
      forward.slabThickness = slabThickness;
      backward.slabThickness = slabThickness;

      var uFlange = girderBaseInfo.uFlange.filter(function(element){ 
          return (station >= nameToPointDict[element[0]].masterStationNumber && station < nameToPointDict[element[1]].masterStationNumber)
      });
      if(uFlange.length>0){
          forward.uFlangeThk = uFlange[0][2];
          forward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3])* (station - nameToPointDict[uFlange[0][0]].masterStationNumber) / (nameToPointDict[uFlange[0][1]].masterStationNumber - nameToPointDict[uFlange[0][0]].masterStationNumber);
      }
      uFlange = girderBaseInfo.uFlange.filter(function(element){ 
          return (station > nameToPointDict[element[0]].masterStationNumber && station <= nameToPointDict[element[1]].masterStationNumber)
          });
      if(uFlange.length>0){
          backward.uFlangeThk = uFlange[0][2];
          backward.uFlangeW = uFlange[0][3] + (uFlange[0][4] - uFlange[0][3])* (station - nameToPointDict[uFlange[0][0]].masterStationNumber) / (nameToPointDict[uFlange[0][1]].masterStationNumber - nameToPointDict[uFlange[0][0]].masterStationNumber);
      }

      var lFlange = girderBaseInfo.lFlange.filter(function(element){ 
          return (station >= nameToPointDict[element[0]].masterStationNumber && station < nameToPointDict[element[1]].masterStationNumber)
          });
      if(lFlange.length>0){
          forward.lFlangeThk = lFlange[0][2];
      }
      lFlange = girderBaseInfo.lFlange.filter(function(element){ 
          return (station > nameToPointDict[element[0]].masterStationNumber && station <= nameToPointDict[element[1]].masterStationNumber)
          });
      if(lFlange.length>0){
          backward.lFlangeThk = lFlange[0][2];
      }

      var web = girderBaseInfo.web.filter(function(element){ 
          return (station >= nameToPointDict[element[0]].masterStationNumber && station < nameToPointDict[element[1]].masterStationNumber)
          });
      if(web.length>0){
          forward.webThk = web[0][2];
      }
      web = girderBaseInfo.web.filter(function(element){ 
          return (station > nameToPointDict[element[0]].masterStationNumber && station <= nameToPointDict[element[1]].masterStationNumber)
          });
      if(web.length>0){
          backward.webThk = web[0][2];
      }

      var uRib = girderBaseInfo.uRib.filter(function(element){ 
          return (station >= nameToPointDict[element[0]].masterStationNumber && station < nameToPointDict[element[1]].masterStationNumber)
          });
      if(uRib.length>0){
          forward.uRibThk = uRib[0][2];
          forward.uRibH = uRib[0][3];
          forward.uRibLO = uRib[0][4];
      }
      uRib = girderBaseInfo.uRib.filter(function(element){ 
          return (station > nameToPointDict[element[0]].masterStationNumber && station <= nameToPointDict[element[1]].masterStationNumber)
          });
      if(uRib.length>0){
          backward.uRibThk = uRib[0][2];
          backward.uRibH = uRib[0][3];
          backward.uRibLO = uRib[0][4];
      }

      var lRib = girderBaseInfo.lRib.filter(function(element){ 
          return (station >= nameToPointDict[element[0]].masterStationNumber && station < nameToPointDict[element[1]].masterStationNumber)
          });
      if(lRib.length>0){
          forward.lRibThk = lRib[0][2];
          forward.lRibH = lRib[0][3];
          forward.lRibLO = lRib[0][4];
      }
      lRib = girderBaseInfo.lRib.filter(function(element){ 
          return (station > nameToPointDict[element[0]].masterStationNumber && station <= nameToPointDict[element[1]].masterStationNumber)
          });
      if(lRib.length>0){
          backward.lRibThk = lRib[0][2];
          backward.lRibH = lRib[0][3];
          backward.lRibLO = lRib[0][4];
      }

      return {forward, backward}
  }

  function sectionPoint(sectionInfo, pointSectionInfo, gradient){
      const height = pointSectionInfo.forward.height;
      const centerThickness = 270; //  slab변수 추가
      const lwb = {x: - sectionInfo.B/2, y:-sectionInfo.H};
      const lwt = {x: - sectionInfo.UL, y:0};
      const rwb = {x: sectionInfo.B/2, y:-sectionInfo.H};
      const rwt = {x: sectionInfo.UR, y:0};
      let forward = {};
      let backward = {};
      let ps = {};
      let skew = pointSectionInfo.forward.skew; // gridPoint의 skew가 있어 사용여부 확인후 삭제요망
      for (let i = 0; i < 2;i++){
          if (i === 0) {
              ps = pointSectionInfo.forward;
          } else {
              ps = pointSectionInfo.backward;
          }
          let slabThickness = ps.slabThickness - centerThickness;
          
          let Rib = {};
          for (let j in ps.lRibLO){
          let lRib = [{x:ps.lRibLO[j] - ps.lRibThk/2,y:-height},{x:ps.lRibLO[j]- ps.lRibThk/2,y:-height+ps.lRibH},
                      {x:ps.lRibLO[j] + ps.lRibThk/2,y:-height+ps.lRibH},{x:ps.lRibLO[j] + ps.lRibThk/2,y:-height}];
          let keyname = "lRib" + j;
          Rib[keyname] = lRib;                    
           }

           
          // leftWeb
          let lw1 = WebPoint(lwb,lwt,0,-height); //{x:blwX,y:-height}
          let lw2 = WebPoint(lwb,lwt,gradient,-slabThickness); //{x:tlwX,y:gradient*tlwX - slabThickness}
          let lWeb = PlateRestPoint(lw1,lw2,0,gradient,-ps.webThk);
          // rightWeb
          let rw1 = WebPoint(rwb,rwt,0,-height); //{x:brwX,y:-height}
          let rw2 = WebPoint(rwb,rwt,gradient,-slabThickness); //{x:trwX,y:gradient*trwX - slabThickness}
          let rWeb = PlateRestPoint(rw1,rw2,0,gradient,ps.webThk);
          // bottomplate
          let b1 = {x:lw1.x - sectionInfo.C1,y:-height};
          let b2 = {x:rw1.x + sectionInfo.D1,y:-height};
          let bottomPlate = PlateRestPoint(b1,b2,null,null,-ps.lFlangeThk);
          // TopPlate
          let tl1 = {x: lw2.x - sectionInfo.C, y: lw2.y + gradient*(- sectionInfo.C)};
          let tl2 = {x: lw2.x - sectionInfo.C + ps.uFlangeW, y: lw2.y + gradient*(- sectionInfo.C + ps.uFlangeW)};
          let topPlate1 = PlateRestPoint(tl1,tl2,-1/gradient,-1/gradient,ps.uFlangeThk);
          let tr1 = {x: rw2.x + sectionInfo.D, y: rw2.y + gradient*(sectionInfo.D)};
          let tr2 = {x: rw2.x + sectionInfo.D - ps.uFlangeW, y: rw2.y + gradient*(sectionInfo.D - ps.uFlangeW)};
          let topPlate2 = PlateRestPoint(tr1,tr2,-1/gradient,-1/gradient,ps.uFlangeThk);        if (i===0){
              forward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb, ...Rib};    
          }else {
              backward ={skew, bottomPlate:bottomPlate, leftTopPlate:topPlate1, rightTopPlate : topPlate2, lWeb:lWeb, rWeb:rWeb, ...Rib};    
          }
      }
      return {forward, backward}
    }

  function SectionPointDict() {
    this.addInput("girderBaseInfo", "obj");
    this.addInput("gridPoint", "arr");
    this.addOutput("sectionPointDict", "arr");
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
    this.setOutputData(0, sectionPointDict);
  };

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
      newPoint.s = Point.masterStationNumber;
      
      return newPoint
  }

  function SteelBoxDict(
    gridPointList,
    stationDictList,
    nameToPointDict,
    sectionPointDict
  ) {
    let steelBoxDict = {};
    let pk1 = "";
    let pk2 = "";
    let UFi = 1;
    let Bi = 1;
    let LWi = 1;
    let RWi = 1;
    let Ribi = 1;
    let keyname = "";
    for (let i in gridPointList) {
      for (let j in gridPointList[i]) {
        for (let k = 0; k < gridPointList[i][j].length - 1; k++) {
          pk1 = stationDictList[i][j][gridPointList[i][j][k]];
          pk2 = stationDictList[i][j][gridPointList[i][j][k + 1]];
          let point1 = nameToPointDict[pk1];
          let point2 = nameToPointDict[pk2];

          keyname = "G" + (i * 1 + 1).toString() + "TopPlate" + UFi;
          if (!steelBoxDict[keyname]) {
            steelBoxDict[keyname] = { points: [[], [], []] };
          }
          let L1 = sectionPointDict[pk1].forward.leftTopPlate;
          let R1 = sectionPointDict[pk1].forward.rightTopPlate;
          let L2 = sectionPointDict[pk2].backward.leftTopPlate;
          let L3 = sectionPointDict[pk2].forward.leftTopPlate;
          let R2 = sectionPointDict[pk2].backward.rightTopPlate;
          let R3 = sectionPointDict[pk2].forward.rightTopPlate;

          if (L1[1].x >= R1[1].x) {
            //폐합인 경우
            let C1 = [L1[0], R1[0], R1[3], L1[3]];
            C1.forEach(element =>
              steelBoxDict[keyname]["points"][2].push(
                ToGlobalPoint(point1, element)
              )
            );
          } else {
            L1.forEach(element =>
              steelBoxDict[keyname]["points"][0].push(
                ToGlobalPoint(point1, element)
              )
            );
            R1.forEach(element =>
              steelBoxDict[keyname]["points"][1].push(
                ToGlobalPoint(point1, element)
              )
            );
          }
          let FisB = true;
          for (let i in L2) {
            if (L2[i] !== L3[i] || R2[i] !== R3[i]) {
              FisB = false;
            }
          }
          if (
            !FisB ||
            pk2.substr(2, 1) === "K" ||
            pk2.substr(2, 2) === "TF" ||
            pk2.substr(2, 2) === "SP" ||
            k === gridPointList[i][j].length - 2
          ) {
            if (L2[1].x >= R2[1].x) {
              //폐합인 경우
              let C2 = [L2[0], R2[0], R2[3], L2[3]];
              C2.forEach(element =>
                steelBoxDict[keyname]["points"][2].push(
                  ToGlobalPoint(point2, element)
                )
              );
            } else {
              L2.forEach(element =>
                steelBoxDict[keyname]["points"][0].push(
                  ToGlobalPoint(point2, element)
                )
              );
              R2.forEach(element =>
                steelBoxDict[keyname]["points"][1].push(
                  ToGlobalPoint(point2, element)
                )
              );
            }
          }
          if (
            pk2.substr(2, 1) === "K" ||
            pk2.substr(2, 2) === "TF" ||
            pk2.substr(2, 2) === "SP"
          ) {
            UFi += 1;
          }

          keyname = "G" + (i * 1 + 1).toString() + "BottomPlate" + Bi;
          if (!steelBoxDict[keyname]) {
            steelBoxDict[keyname] = { points: [[], [], []] };
          }
          L1 = sectionPointDict[pk1].forward.bottomPlate;
          L2 = sectionPointDict[pk2].backward.bottomPlate;
          L3 = sectionPointDict[pk2].forward.bottomPlate;

          L1.forEach(element =>
            steelBoxDict[keyname]["points"][0].push(
              ToGlobalPoint(point1, element)
            )
          );

          FisB = true;
          for (let i in L2) {
            if (L2[i] !== L3[i]) {
              FisB = false;
            }
          }
          if (
            !FisB ||
            pk2.substr(2, 2) === "TF" ||
            pk2.substr(2, 2) === "SP" ||
            k === gridPointList[i][j].length - 2
          ) {
            L2.forEach(element =>
              steelBoxDict[keyname]["points"][0].push(
                ToGlobalPoint(point2, element)
              )
            );
          }
          if (pk2.substr(2, 2) === "BF" || pk2.substr(2, 2) === "SP") {
            Bi += 1;
          }

          keyname = "G" + (i * 1 + 1).toString() + "LeftWeB" + LWi;
          if (!steelBoxDict[keyname]) {
            steelBoxDict[keyname] = { points: [[], [], []] };
          }
          L1 = sectionPointDict[pk1].forward.lWeb;
          L2 = sectionPointDict[pk2].backward.lWeb;
          L3 = sectionPointDict[pk2].forward.lWeb;
          L1.forEach(element =>
            steelBoxDict[keyname]["points"][0].push(
              ToGlobalPoint(point1, element)
            )
          );
          FisB = true;
          for (let i in L2) {
            if (L2[i] !== L3[i]) {
              FisB = false;
            }
          }
          if (
            !FisB ||
            pk2.substr(2, 2) === "TF" ||
            pk2.substr(2, 2) === "SP" ||
            k === gridPointList[i][j].length - 2
          ) {
            L2.forEach(element =>
              steelBoxDict[keyname]["points"][0].push(
                ToGlobalPoint(point2, element)
              )
            );
          }
          if (pk2.substr(2, 2) === "LW" || pk2.substr(2, 2) === "SP") {
            LWi += 1;
          }

          keyname = "G" + (i * 1 + 1).toString() + "RightWeB" + RWi;
          if (!steelBoxDict[keyname]) {
            steelBoxDict[keyname] = { points: [[], [], []] };
          }
          L1 = sectionPointDict[pk1].forward.rWeb;
          L2 = sectionPointDict[pk2].backward.rWeb;
          L3 = sectionPointDict[pk2].forward.rWeb;
          L1.forEach(element =>
            steelBoxDict[keyname]["points"][0].push(
              ToGlobalPoint(point1, element)
            )
          );
          FisB = true;
          for (let i in L2) {
            if (L2[i] !== L3[i]) {
              FisB = false;
            }
          }
          if (
            !FisB ||
            pk2.substr(2, 2) === "TF" ||
            pk2.substr(2, 2) === "SP" ||
            k === gridPointList[i][j].length - 2
          ) {
            L2.forEach(element =>
              steelBoxDict[keyname]["points"][0].push(
                ToGlobalPoint(point2, element)
              )
            );
          }
          if (pk2.substr(2, 2) === "RW" || pk2.substr(2, 2) === "SP") {
            RWi += 1;
          }

          let RibList = [];
          for (let ii in sectionPointDict[pk1].forward) {
            if (ii.includes("Rib")) RibList.push(ii);
          }
          for (let Ribkey of RibList) {
            keyname = "G" + (i * 1 + 1).toString() + "lRib" + Ribi;
            if (!steelBoxDict[keyname]) {
              steelBoxDict[keyname] = { points: [[], [], []] };
            }
            L1 = sectionPointDict[pk1].forward[Ribkey];
            L2 = sectionPointDict[pk2].backward[Ribkey];
            L3 = sectionPointDict[pk2].forward[Ribkey];

            L1.forEach(element =>
              steelBoxDict[keyname]["points"][0].push(
                ToGlobalPoint(point1, element)
              )
            );
            FisB = true;
            for (let i in L2) {
              FisB = L3 ? (L2[i] !== L3[i] ? false : true) : false;
            }
            if (
              !FisB ||
              pk2.substr(2, 2) === "TF" ||
              pk2.substr(2, 2) === "SP" ||
              k === gridPointList[i][j].length - 2
            ) {
              L2.forEach(element =>
                steelBoxDict[keyname]["points"][0].push(
                  ToGlobalPoint(point2, element)
                )
              );
              Ribi += 1;
            }
            // if(pk2.substr(2,2)==="RW" || pk2.substr(2,2)==="SP"){  }
          }
        }
      }
    }

    return steelBoxDict;
  }

  // export function SteelBoxView(steelBoxDict,initPoint){
  //     let group = new THREE.Group();
  //     // var meshMaterial = new THREE.MeshLambertMaterial( {
  //     //     color: 0x00ff00,
  //     //     emissive: 0x44aa44,
  //     //     opacity: 1,
  //     //     side:THREE.DoubleSide,
  //     //     transparent: false,
  //     //     wireframe : false
  //     //   } );
  //     let meshMaterial = new THREE.MeshNormalMaterial()
  //         meshMaterial.side = THREE.DoubleSide
  //     let pk1 = ""
  //     let pk2 = ""
  //     for (let key in steelBoxDict){

  //         steelBoxDict[key]["points"].forEach(function(plist){
  //             if(plist.length>0){
  //             let geometry = new THREE.Geometry();
  //             for (let i = 0; i< plist.length;i++){
  //                 geometry.vertices.push(new THREE.Vector3(plist[i].x - initPoint.x, plist[i].y - initPoint.y, plist[i].z - initPoint.z))
  //             }

  //             for (let i = 0; i< plist.length/4 -1;i++){
  //                 for (let j= 0; j<4;j++){
  //                     let k = j+1 === 4? 0: j+1
  //                     geometry.faces.push(new THREE.Face3(i*4+j,i*4+k,(i+1)*4+j));
  //                     geometry.faces.push(new THREE.Face3(i*4+k,(i+1)*4+k,(i+1)*4+j));
  //                 }
  //                 if (i===0){
  //                     geometry.faces.push(new THREE.Face3(0,1,2));
  //                     geometry.faces.push(new THREE.Face3(0,2,3));
  //                 }else if(i===(plist.length/4 -2)){
  //                     geometry.faces.push(new THREE.Face3((i+1)*4,(i+1)*4+1,(i+1)*4+2));
  //                     geometry.faces.push(new THREE.Face3((i+1)*4,(i+1)*4+2,(i+1)*4+3));
  //                 }
  //             }

  //             geometry.computeFaceNormals();
  //             group.add( new THREE.Mesh(geometry,meshMaterial) );
  //             }
  //         })
  //     }
  //     return group
  // }

  function SteelBox() {
    this.addInput("gridPoint", "arr");
    this.addInput("sectionPointDict", "arr");
    this.addOutput("steelBoxDict", "arr");
  }

  SteelBox.prototype.onExecute = function() {
    const { gridPointStation, stationDictList, nameToPointDict } = this.getInputData(
      0
    );
    const sectionPointDict = this.getInputData(1);
    const result = SteelBoxDict(
      gridPointStation,
      stationDictList,
      nameToPointDict,
      sectionPointDict
    );

    this.setOutputData(0, result);
  };



  // function SteelPlateView() {
  //   this.addInput("steelBoxDict", "steelBoxDict");
  //   this.addInput("Point", "Point");
  // }

  // SteelPlateView.prototype.onExecute = function() {
  //   const steeBoxDict = this.getInputData(0);
  //   const initPoint = this.getInputData(1);
  //   const group = SteelBoxView(steeBoxDict, initPoint);
  //   meshArr.current.push({ id: 0, mesh: group });
  // };

  // LiteGraph.registerNodeType("3DVIEW/steelPlateView", SteelPlateView);

  // function InitPoint() {
  //   this.addInput("gridPoint", "gridPoint");
  //   this.addOutput("Point", "Point");
  // }

  // InitPoint.prototype.onExecute = function() {
  //   this.getInputData(0);
  //   this.setOutputData(0, this.getInputData(0).nameToPointDict["G1S1"]);
  // };

  // LiteGraph.registerNodeType("3DVIEW/initPoint", InitPoint);

  global.LiteGraph.registerNodeType("nexivil/lineGen", Line);
  global.LiteGraph.registerNodeType("nexivil/lineOffset", LineOffset);

  global.LiteGraph.registerNodeType("nexivil/GirdersGen", GirdersGen);
  global.LiteGraph.registerNodeType("nexivil/gridPoint", GridPoint);

  global.LiteGraph.registerNodeType("nexivil/sectionPoint", SectionPointDict);

  global.LiteGraph.registerNodeType("nexivil/steelBox", SteelBox);

}(global));
