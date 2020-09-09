import { THREE, SpriteText } from "global";



export function CylinderModelView(top, buttom, height) {
    let group = new THREE.Group();
    let geometry = new THREE.CylinderGeometry( top, buttom, height);
    let meshMaterial = new THREE.MeshNormalMaterial()
    //var cylinder = new THREE.Mesh( geometry, material );
    geometry.computeFaceNormals();
    group.add(new THREE.Mesh(geometry, meshMaterial));

    return group
}