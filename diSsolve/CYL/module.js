import { THREE, SpriteText } from "global";



export function CylinderModelView(top,buttom,height) {
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(top,buttom,height);
    const meshMaterial = new THREE.MeshNormalMaterial()
   
    geometry.computeFaceNormals();
    const mesh = new THREE.Mesh(geometry, meshMaterial)
    //mesh.position.set(-100,100,100)
    console.log("메쉬위치")
    console.log(mesh)
    console.log(mesh.position)
    

    group.add(new THREE.Mesh(geometry, meshMaterial));
    group.position.set(0,-100,500)
    console.log("그룹위치")
    console.log(group)
    console.log(group.position)
    return group
}
