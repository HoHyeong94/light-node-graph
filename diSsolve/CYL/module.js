import { THREE, SpriteText } from "global";



export function CylinderModelView(length,rotate) {
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(length[0],length[1],length[2],32,8);
    const meshMaterial = new THREE.MeshNormalMaterial()
   
    geometry.computeFaceNormals();
    const mesh = new THREE.Mesh(geometry, meshMaterial)
    const mesh1 = new THREE.Mesh(geometry, meshMaterial)
    const mesh2= new THREE.Mesh(geometry, meshMaterial)
    mesh.position.set(0,200,600)
    mesh.rotation.x=rotate.x
    mesh.rotation.y=rotate.y
    mesh.rotation.z=rotate.z

    //mesh1.position.set(0,200,950)
   //mesh1.rotation.z=Math.PI/2
    //mesh2.position.set(0,200,1300)

    console.log("메쉬위치")
    console.log(mesh)
    console.log(mesh.position)
    

    group.add(mesh,mesh1,mesh2);
    //group.position.set(0,250,500)
    console.log("그룹위치")
    console.log(group)
    console.log(group.position)
    return group
}
