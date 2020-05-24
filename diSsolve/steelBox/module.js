import { ToGlobalPoint } from "../geometryModule"
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
  let filletR = 500;

  for (let i in girderStationList) {
    for (let j = 0; j < girderStationList[i].length - 1; j++) {

      let point1 = girderStationList[i][j].point;
      let point2 = girderStationList[i][j + 1].point;

      pk1 = girderStationList[i][j].key
      pk2 = girderStationList[i][j + 1].key
      keyname = "G" + (i * 1 + 1).toString() + "TopPlate" + UFi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], [], []] }; }
      let L1 = sectionPointDict[pk1].forward.leftTopPlate
      let L2 = sectionPointDict[pk2].backward.leftTopPlate
      let L3 = sectionPointDict[pk2].forward.leftTopPlate
      let R1 = sectionPointDict[pk1].forward.rightTopPlate
      let R2 = sectionPointDict[pk2].backward.rightTopPlate
      let R3 = sectionPointDict[pk2].forward.rightTopPlate

      let uf0 = sectionPointDict[pk1].backward.uflange
      let uf1 = sectionPointDict[pk1].forward.uflange
      let uf2 = sectionPointDict[pk2].backward.uflange
      let uf3 = sectionPointDict[pk2].forward.uflange

      let FisB = true;  //forward is backward?  
      for (let kk in uf2[0]) { if (uf2[0][kk] !== uf3[0][kk] || uf2[1][kk] !== uf3[1][kk]) { FisB = false } }

      let plate1 = [[], [], []];
      let plate2 = [[], [], []];
      let smoothness = 8

      // for (let k in uf1){
      //   uf1[k].forEach(element => steelBoxDict[keyname]["points"][k].push(ToGlobalPoint(point1, element)));
      // }
      for (let k in uf1) {
        uf1[k].forEach(element => plate1[k].push(ToGlobalPoint(point1, element)));
        uf2[k].forEach(element => plate2[k].push(ToGlobalPoint(point2, element)));
      }
      if (uf1[2].length === 0 && uf0[2].length > 0) {  //폐합에서 분할로 시작
        let filletPoints = FilletPoints(plate1, plate2, false, filletR, smoothness)
        steelBoxDict[keyname]["points"][0].push(...filletPoints[0])
        steelBoxDict[keyname]["points"][1].push(...filletPoints[1])
      } else {
        for (let k in uf1) {
          plate1[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
        }
      }
      if (uf2[2].length === 0 && uf3[2].length > 0) {
        let filletPoints = FilletPoints(plate1, plate2, true, filletR, smoothness)
        steelBoxDict[keyname]["points"][0].push(...filletPoints[0])
        steelBoxDict[keyname]["points"][1].push(...filletPoints[1])
      } else {
       if (!FisB || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
        for (let k in uf2) {
          plate2[k].forEach(element => steelBoxDict[keyname]["points"][k].push(element));
        }
        UFi += 1
      }
    }

      // if (L1[1].x >= R1[1].x) { //폐합인 경우 
      //   let C1 = [L1[0], R1[0], R1[3], L1[3]];
      //   C1.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point1, element)))
      // } else {
      //   L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
      //   R1.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point1, element)))
      // }
      // if (!FisB || pk2.substr(2, 1) === "K" || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
      //   if (L2[1].x >= R2[1].x) { //폐합인 경우 
      //     let C2 = [L2[0], R2[0], R2[3], L2[3]];
      //     C2.forEach(element => steelBoxDict[keyname]["points"][2].push(ToGlobalPoint(point2, element)))
      //   } else {
      //     L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
      //     R2.forEach(element => steelBoxDict[keyname]["points"][1].push(ToGlobalPoint(point2, element)))
      //   }
      // }
      // if (pk2.substr(2, 1) === "K" || pk2.substr(2, 2) === "TF" || pk2.substr(2, 2) === "SP") { UFi += 1 }


      keyname = "G" + (i * 1 + 1).toString() + "BottomPlate" + Bi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
      L1 = sectionPointDict[pk1].forward.bottomPlate
      L2 = sectionPointDict[pk2].backward.bottomPlate
      L3 = sectionPointDict[pk2].forward.bottomPlate

      L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))

      FisB = true;
      for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false } }
      if (!FisB || pk2.substr(2, 2) === "BF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
        L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
      }
      if (pk2.substr(2, 2) === "BF" || pk2.substr(2, 2) === "SP") { Bi += 1 }

      keyname = "G" + (i * 1 + 1).toString() + "LeftWeB" + LWi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
      L1 = sectionPointDict[pk1].forward.lWeb
      L2 = sectionPointDict[pk2].backward.lWeb
      L3 = sectionPointDict[pk2].forward.lWeb
      L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
      FisB = true;
      for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false } }
      if (!FisB || pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
        L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
      }
      if (pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP") { LWi += 1 }

      keyname = "G" + (i * 1 + 1).toString() + "RightWeB" + RWi
      if (!steelBoxDict[keyname]) { steelBoxDict[keyname] = { points: [[], [], []] }; }
      L1 = sectionPointDict[pk1].forward.rWeb
      L2 = sectionPointDict[pk2].backward.rWeb
      L3 = sectionPointDict[pk2].forward.rWeb
      L1.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point1, element)))
      FisB = true;
      for (let i in L2) { if (L2[i] !== L3[i]) { FisB = false } }
      if (!FisB || pk2.substr(2, 2) === "WF" || pk2.substr(2, 2) === "SP" || pk2.substr(2, 2) === "K6") {
        L2.forEach(element => steelBoxDict[keyname]["points"][0].push(ToGlobalPoint(point2, element)))
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