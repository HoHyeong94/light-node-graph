import { THREE, SpriteText } from "global";



export function CylinderModelView(top,buttom,height) {
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(top,buttom,height);
    const meshMaterial = new THREE.MeshNormalMaterial()
    //var cylinder = new THREE.Mesh( geometry, material );
    geometry.computeFaceNormals();
    const mesh = new THREE.Mesh(geometry, meshMaterial)
    //mesh.Position.set(500,500,500)
    group.add(new THREE.Mesh(geometry, meshMaterial));

    return group
}