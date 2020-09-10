import { THREE, SpriteText } from "global";



export function CylinderModelView(length) {
    let group = new THREE.Group();
    let geometry = new THREE.CylinderGeometry( length);
    let meshMaterial = new THREE.MeshNormalMaterial()
    //var cylinder = new THREE.Mesh( geometry, material );
    geometry.computeFaceNormals();
    let mesh = new THREE.Mesh(geometry, meshMaterial)
    //mesh.setPosition(0,0,0)
    group.add(new THREE.Mesh(geometry, meshMaterial));

    return group
}
