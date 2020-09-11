import { THREE, SpriteText } from "global";



export function CylinderModelView(length,rotate,position) {
    
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(length.top,length.buttom,length.height,32,8);
    const meshMaterial = new THREE.MeshNormalMaterial()
    geometry.computeFaceNormals();
    const mesh = new THREE.Mesh(geometry, meshMaterial)
    
    mesh.position.set(position.x,position.y,position.z)
    mesh.rotation.x=rotate.x
    mesh.rotation.y=rotate.y
    mesh.rotation.z=rotate.z
    
    group.add(mesh);
   
    return group
}
