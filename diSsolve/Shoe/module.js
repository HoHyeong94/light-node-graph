import { THREE, SpriteText } from "global";



export function ShoeModelView(length,rotate,position) {
    
    const group = new THREE.Group();
    const geometry = new THREE.Geometry();
        const outGeometry1 = new THREE.BoxBufferGeometry(length.width,length.height,length.depth);
        const InGeometry = new THREE.BoxBufferGeometry(length.width-10,length.Inheight,length.depth-10)
        const outGeometry2 = new THREE.BoxBufferGeometry(length.width,length.height,length.depth);
    const meshMaterial = new THREE.MeshNormalMaterial()
    geometry.computeFaceNormals();
    outGeometry1.position.set(0,0,0)
    InGeometry.position.set(0,-length.height,0)
    outGeometry2.position.set(0,-(length.height+length.Inheight),0)
    geometry.merge(outGeometry1,InGeometry,outGeometry2) 

    const mesh = new THREE.Mesh(geometry, meshMaterial)
    
    mesh.position.set(position.x,position.y,position.z)
    mesh.rotation.x=rotate.x
    mesh.rotation.y=rotate.y
    mesh.rotation.z=rotate.z


    group.add(mesh);
  
    return group
}
