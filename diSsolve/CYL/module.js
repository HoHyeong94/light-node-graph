import { THREE, SpriteText } from "global";



export function CylinderModelView(top,buttom,height) {
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(top,buttom,height);
    const meshMaterial = new THREE.MeshNormalMaterial()
   
    //geometry.computeFaceNormals();
    const mesh = new THREE.Mesh(geometry, meshMaterial)
    console.log(mesh.Position)
    //mesh.Position.set(200,200,0)

    group.add(new THREE.Mesh(geometry, meshMaterial));

    return group
}