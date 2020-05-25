import { ToGlobalPoint, DividingPoint } from "../geometryModule"
import { THREE } from "global"


function FilletPoints(plate1, plate2, isForward, radius, smoothness) {
  let filletPoint = [[], [], [], []];

  let plt1 = isForward ? plate1 : plate2;
  let plt2 = isForward ? plate2 : plate1;
  let result = [[], []];

  for (let ii = 0; ii < 2; ii++) {
    let p1 = new THREE.Vector3(plt1[0][ii + 1].x, plt1[0][ii + 1].y, plt1[0][ii + 1].z);
    let p2 = new THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
    let p3 = new THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
    filletPoint[ii] = fillet3D(p1, p2, p3, radius, smoothness);
  }
  for (let ii = 0; ii < 2; ii++) {
    let p1 = new THREE.Vector3(plt1[1][ii + 1].x, plt1[1][ii + 1].y, plt1[1][ii + 1].z);
    let p2 = new THREE.Vector3(plt2[1][ii + 1].x, plt2[1][ii + 1].y, plt2[1][ii + 1].z);
    let p3 = new THREE.Vector3(plt2[0][ii + 1].x, plt2[0][ii + 1].y, plt2[0][ii + 1].z);
    filletPoint[ii + 2] = fillet3D(p1, p2, p3, radius, smoothness);
  }
  for (let jj = 0; jj < smoothness + 2; jj++) {
    let kk = isForward ? jj : smoothness + 1 - jj
    result[0].push(plt2[0][0])
    result[0].push(filletPoint[0][kk])
    result[0].push(filletPoint[1][kk])
    result[0].push(plt2[0][3])
    result[1].push(plt2[1][0])
    result[1].push(filletPoint[2][kk])
    result[1].push(filletPoint[3][kk])
    result[1].push(plt2[1][3])
  }
  return result
}

export function plateCompare(plate1, plate2) {
  let result = true;
  let err = 0.1;
  for (let i in plate1) {
    for (let j in plate1[i]) {
      if (plate2[i][j]) {
        if (Math.abs(plate1[i][j].x - plate2[i][j].x) > err ||
          Math.abs(plate1[i][j].y - plate2[i][j].y) > err
        ) {
          result = false //오류발생, 값이 급격하게 차이나는 경우 입력하는 방법이 있어야함
        }
      } else {
        result = false
      }
    }
  }
  return result
}

export function webEntrance(wplate1, wplate2, isForward) {
  let result = [[], [], []]
  let b1 = 300;
  let h1 = 1100;
  let d1 = 250;
  let r = 150;
  let smoothness = 8;
  // let wplate1 = [];
  // let wplate2 = [];
  // L1.forEach(element => wplate1.push(ToGlobalPoint(point1, element)))
  // L2.forEach(element => wplate2.push(ToGlobalPoint(point2, element)))
  let dpt0 = DividingPoint(wplate1[0], wplate2[0], d1)
  let dpt1 = DividingPoint(wplate1[1], wplate2[1], d1)
  let dpt2 = DividingPoint(wplate1[2], wplate2[2], d1)
  let dpt3 = DividingPoint(wplate1[3], wplate2[3], d1)
  let l1 = DividingPoint(wplate1[0], wplate1[1], b1 + h1)
  let l2 = DividingPoint(wplate1[3], wplate1[2], b1 + h1)
  let r1 = DividingPoint(wplate1[0], wplate1[1], b1)
  let r2 = DividingPoint(wplate1[3], wplate1[2], b1)
  let l11 = DividingPoint(dpt0, dpt1, b1 + h1)
  let l21 = DividingPoint(dpt3, dpt2, b1 + h1)
  let r11 = DividingPoint(dpt0, dpt1, b1)
  let r21 = DividingPoint(dpt3, dpt2, b1)

  let newPlate1 = [[wplate1[0], r1, r2, wplate1[3]], [wplate1[1], l1, l2, wplate1[2]], []]
  let newPlate2 = [[dpt0, r11, r21, dpt3], [dpt1, l11, l21, dpt2], []]
  if (isForward) {
    let filletPoints = FilletPoints(newPlate1, newPlate2, isForward, r, smoothness)
    result[0].push(wplate1[0], r1, r2, wplate1[3])
    result[0].push(...filletPoints[0])
    result[1].push(wplate1[1], l1, l2, wplate1[2])
    result[1].push(...filletPoints[1])
  }
  else {
    let filletPoints = FilletPoints(newPlate2, newPlate1, isForward, r, smoothness)
    result[0].push(...filletPoints[0])
    result[0].push(wplate1[0], r1, r2, wplate1[3])
    result[1].push(...filletPoints[1])
    result[1].push(wplate1[1], l1, l2, wplate1[2])
  }
  // steelBoxDict[keyname]["points"][0].push(dpt0, r11, r21, dpt3)
  // steelBoxDict[keyname]["points"][1].push(dpt1, l11, l21, dpt2)
  result[2].push(dpt0, dpt1, dpt2, dpt3)
  return result
}

export function steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, plateKey, splicer) {
  // 박스형 거더의 상하부플레이트 개구와 폐합에 대한 필렛을 위해 개발되었으며, 개구->폐합, 폐합->개구에 대해서만 가능하다, 
  // 개구->폐합->개구로 2단계의 경우에는 오류가 발생할 수 있음, 2020.05.25 by drlim

  let result = [[], [], []];
  let filletR = 300;

  let uf0 = sectionPointDict[pk1].backward[plateKey];
  let uf1 = sectionPointDict[pk1].forward[plateKey];
  let uf2 = sectionPointDict[pk2].backward[plateKey];
  let uf3 = sectionPointDict[pk2].forward[plateKey];
  let FisB = plateCompare(uf2, uf3);  //forward is backward?  
  let plate0 = [[], [], []];
  let plate1 = [[], [], []];
  let plate2 = [[], [], []];
  let plate3 = [[], [], []];
  let smoothness = 8
  let former1 = uf0[0][0] ? uf0[0][0].x : uf0[2][0].x
  let latter1 = uf1[0][0] ? uf1[0][0].x : uf1[2][0].x
  let former2 = uf2[0][0] ? uf2[0][0].x : uf2[2][0].x
  let latter2 = uf3[0][0] ? uf3[0][0].x : uf3[2][0].x

  for (let k in uf1) {
    uf0[k].forEach(element => plate0[k].push(ToGlobalPoint(point1, element)));
    uf1[k].forEach(element => plate1[k].push(ToGlobalPoint(point1, element)));
    uf2[k].forEach(element => plate2[k].push(ToGlobalPoint(point2, element)));
    uf3[k].forEach(element => plate3[k].push(ToGlobalPoint(point2, element)));
  }
  // outborder 
  if (!FisB) {
    if (former1 < latter1) {
      if (uf1[2][0]) {
        plate1[2][0] = DividingPoint(plate1[2][0], plate2[2][0], (latter1 - former1) * 2)
        plate1[0][1] = DividingPoint(plate1[2][1], plate2[2][1], (latter1 - former1) * 2)
        plate1[0][2] = DividingPoint(plate1[2][2], plate2[2][2], (latter1 - former1) * 2)
        plate1[2][3] = DividingPoint(plate1[2][3], plate2[2][3], (latter1 - former1) * 2)
      }
      for (let k in uf1) {
        plate0[k].forEach(element => result[k].push(element));
      }
    }
  }
  if (uf1[2].length === 0 && uf0[2].length > 0) {  //폐합에서 분할로 시작 // 외측과 내측필렛이 같은요소에 작용하면 오류가 발생할 것으로 예상, 필렛이 없는 폐합요소에만 외측 챔퍼 적용
    let filletPoints = FilletPoints(plate1, plate2, false, filletR, smoothness)
    result[0].push(...filletPoints[0])
    result[1].push(...filletPoints[1])
  } else {
    for (let k in uf1) {
      plate1[k].forEach(element => result[k].push(element));
    }
  }
  if (uf2[2].length === 0 && uf3[2].length > 0) {
    let filletPoints = FilletPoints(plate1, plate2, true, filletR, smoothness)
    result[0].push(...filletPoints[0])
    result[1].push(...filletPoints[1])
  } else {
    let spCheck = false
    splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { spCheck = true } })
    if (spCheck ||(!FisB&&(uf2[0][0].y !== uf3[0][0].y))) {
      for (let k in uf2) {
        plate2[k].forEach(element => result[k].push(element));
      }
    }
  }
  if (!FisB) {
    if (former2 > latter2) {
      if (uf2[2][0]) {
        plate2[2][0] = DividingPoint(plate2[2][0], plate1[2][0], (former2 - latter2) * 2)
        plate2[2][1] = DividingPoint(plate2[2][1], plate1[2][1], (former2 - latter2) * 2)
        plate2[2][2] = DividingPoint(plate2[2][2], plate1[2][2], (former2 - latter2) * 2)
        plate2[2][3] = DividingPoint(plate2[2][3], plate1[2][3], (former2 - latter2) * 2)
        if (!uf3[2][0]) {
          plate3[2][0] = plate3[0][0]
          plate3[2][1] = plate3[1][0]
          plate3[2][2] = plate3[1][3]
          plate3[2][3] = plate3[0][3]
          plate3[0] = [];
          plate3[1] = [];
        }
      }
      for (let k in uf2) {
        plate2[k].forEach(element => result[k].push(element));
      }
      for (let k in uf2) {
        plate3[k].forEach(element => result[k].push(element));
      }
    }
  }
  return result
}

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
  let filletR = 300;
  let splicer = [];

  for (let i in girderStationList) {
    for (let j = 0; j < girderStationList[i].length - 1; j++) {

      let point1 = girderStationList[i][j].point;
      let point2 = girderStationList[i][j + 1].point;
      pk1 = girderStationList[i][j].key
      pk2 = girderStationList[i][j + 1].key

      let L1 = sectionPointDict[pk1].forward.leftTopPlate
      let L2 = sectionPointDict[pk2].backward.leftTopPlate
      let L3 = sectionPointDict[pk2].forward.leftTopPlate
      let R1 = sectionPointDict[pk1].forward.rightTopPlate
      let R2 = sectionPointDict[pk2].backward.rightTopPlate
      let R3 = sectionPointDict[pk2].forward.rightTopPlate
      let FisB = true;  //forward is backward?  

      keyname = "G" + (i * 1 + 1).toString() + "TopPlate" + UFi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
      splicer = ["TF", "SP", "K6"]
      let uflangePoint = steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, "uflange", splicer)
      for (let k in uflangePoint) {
        uflangePoint[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
      }
      splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { UFi += 1; return } })
      // pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") { UFi += 1 }

      keyname = "G" + (i * 1 + 1).toString() + "BottomPlate" + Bi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
      splicer = ["BF", "SP", "K6"]
      let lflangePoint = steelPlateGenerator(sectionPointDict, pk1, pk2, point1, point2, "lflange", splicer)
      for (let k in lflangePoint) {
        lflangePoint[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
      }
      splicer.forEach(function (sp) { if (pk2.substr(2, 2) === sp) { Bi += 1; return } })

      keyname = "G" + (i * 1 + 1).toString() + "LeftWeB" + LWi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
      L1 = sectionPointDict[pk1].forward.lWeb
      L2 = sectionPointDict[pk2].backward.lWeb
      L3 = sectionPointDict[pk2].forward.lWeb
      let wplate1 = [];
      let wplate2 = [];
      L1.forEach(element => wplate1.push(ToGlobalPoint(point1, element)))
      L2.forEach(element => wplate2.push(ToGlobalPoint(point2, element)))
      if (pk1.substr(2, 2) === "K1") {
        let ent = webEntrance(wplate1, wplate2, true)
        for (let k in ent) {
          ent[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
        }
      } else {
        L1.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point1, element)))
      }
      FisB = true;
      for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false } }
      if (!FisB || pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
        if (pk2.substr(2, 2) === "K6") {
          let ent = webEntrance(wplate2, wplate1, false)
          for (let k in ent) {
            ent[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
          }
        }
        else {
          L2.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point2, element)))
        }
      }
      if (pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP") { LWi += 1 }







      keyname = "G" + (i * 1 + 1).toString() + "RightWeB" + RWi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
      L1 = sectionPointDict[pk1].forward.rWeb
      L2 = sectionPointDict[pk2].backward.rWeb
      L3 = sectionPointDict[pk2].forward.rWeb
      wplate1 = [];
      wplate2 = [];
      L1.forEach(element => wplate1.push(ToGlobalPoint(point1, element)))
      L2.forEach(element => wplate2.push(ToGlobalPoint(point2, element)))
      if (pk1.substr(2, 2) === "K1") {
        let ent = webEntrance(wplate1, wplate2, true)
        for (let k in ent) {
          ent[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
        }
      } else {
        L1.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point1, element)))
      }
      FisB = true;
      for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false } }
      if (!FisB || pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
        if (pk2.substr(2, 2) === "K6") {
          let ent = webEntrance(wplate2, wplate1, false)
          for (let k in ent) {
            ent[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
          }
        }
        else {
          L2.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point2, element)))
        }
      }
      if (pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP") { RWi += 1 }

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
        if (!FisB || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
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


function fillet3D(point1, point2, point3, radius, smoothness) {
  let points = [point1, point2, point3]
  let newPoints = [];
  let v1 = new THREE.Vector3();
  let v2 = new THREE.Vector3();
  let v3 = new THREE.Vector3();
  let vc1 = new THREE.Vector3();
  let vc2 = new THREE.Vector3();
  let center = new THREE.Vector3();
  let ang
  let l1

  //console.log(points[i].x);
  v1.subVectors(point1, point2).normalize();
  v2.subVectors(point3, point2).normalize();
  ang = Math.acos(v1.dot(v2))
  l1 = radius / Math.sin(ang / 2)
  v3.addVectors(v1, v2).setLength(l1);
  center.addVectors(point2, v3);
  let p1 = new THREE.Vector3().addVectors(point2, v1.multiplyScalar(radius / Math.tan(ang / 2)))
  let p2 = new THREE.Vector3().addVectors(point2, v2.multiplyScalar(radius / Math.tan(ang / 2)))
  vc1.subVectors(p1, center);
  vc2.subVectors(p2, center);

  newPoints.push(p1)
  for (let j = 0; j < smoothness; j++) {
    let dirVec = new THREE.Vector3().addVectors(vc1.clone().multiplyScalar(smoothness - j), vc2.clone().multiplyScalar(j + 1)).setLength(radius);
    newPoints.push(new THREE.Vector3().addVectors(center, dirVec));
  }
  newPoints.push(p2)
  //let line2 = new THREE.Line(newGeometry,line.material);
  //scene.add(line2)
  return newPoints;
}