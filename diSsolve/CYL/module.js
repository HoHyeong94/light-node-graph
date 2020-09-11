import { THREE, SpriteText } from "global";



export function CylinderModelView(length,rotate,position) {
    console.log("모듈 시작")
    console.log(length)
    console.log(rotate)
    console.log(position)
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(length.top,length.buttom,length.height,32,8);
    const meshMaterial = new THREE.MeshNormalMaterial()
    geometry.computeFaceNormals();
    const mesh = new THREE.Mesh(geometry, meshMaterial)
    
    mesh.position.set(positon.x,position.y,position.z)
    mesh.rotation.x=rotate.x
    mesh.rotation.y=rotate.y
    mesh.rotation.z=rotate.z


    group.add(mesh);
    //group.position.set(0,250,500)
    console.log("그룹위치")
    console.log(group)
    console.log(group.position)
    return group
}
