import { THREE, SpriteText } from "global";



export function CylinderModelView(top,buttom,height) {
    const group = new THREE.Group();
    const geometry = new THREE.CylinderGeometry(top,buttom,height);
    const meshMaterial = new THREE.MeshNormalMaterial()
   
    geometry.computeFaceNormals();
    const mesh = new THREE.Mesh(geometry, meshMaterial)
    const mesh1 = new THREE.Mesh(geometry, meshMaterial)
    const mesh2= new THREE.Mesh(geometry, meshMaterial)
    mesh.position.set(0,200,600)
    mesh.rotation.x=Math.PI/2
    mesh1.position.set(0,200,950)
    mesh2.position.set(0,200,1300)

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
