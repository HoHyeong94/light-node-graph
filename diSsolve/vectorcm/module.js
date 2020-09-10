import { THREE, SpriteText } from "global";


export function VectorModelView(point1,point2,point3) {
    //const group = new THREE.Group();
    const geometry = new THREE.geometry();
    const meshMaterial = new THREE.MeshNormalMaterial()
    //meshMaterial.wireFrame = true

    geometry.vertices.push(new THREE.Vector3(-50, -50, 0));
    geometry.vertices.push(new THREE.Vector3(50, -50, 0));
    geometry.vertices.push(new THREE.Vector3(50, 50, 0));
    geometry.computeFaceNormals();

    const face = new THREE.Face3(0, 1, 2)
    geometry.faces.push(face)

    const mesh = new THREE.Mesh(geometry, meshMaterial)
    //const mesh1 = new THREE.Mesh(geometry, meshMaterial)
    //const mesh2= new THREE.Mesh(geometry, meshMaterial)
    mesh.position.set(0,200,600)
    /*mesh.rotation.x=Math.PI/2
    mesh1.position.set(0,200,950)
    mesh1.rotation.z=Math.PI/2
    mesh2.position.set(0,200,1300)*/

    console.log("메쉬위치")
    console.log(mesh)
    console.log(mesh.position)
    

    group.add(mesh);
    //group.position.set(0,250,500)
    console.log("그룹위치")
    console.log(group)
    console.log(group.position)
    return group
}
