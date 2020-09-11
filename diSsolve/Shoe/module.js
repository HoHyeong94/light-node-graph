import { THREE, SpriteText } from "global";



export function ShoeModelView(length,rotate,pos) {
    
    const group = new THREE.Group();
    const mergedGeo = new THREE.Geometry();
    const outGeometry1= new THREE.BoxBufferGeometry(length.width,length.height,length.depth);
    const InGeometry = new THREE.BoxBufferGeometry(length.width-10,length.Inheight,length.depth-10)
    const outGeometry2 = new THREE.BoxBufferGeometry(length.width,length.height,length.depth);
    const meshMaterial = new THREE.MeshNormalMaterial()
    
    console.log(length)
    console.log(rotate)
    console.log(pos)
    


    const mesh1 = new THREE.Mesh(outGeometry1, meshMaterial)
    mesh1.position.set(0,0,0)
    mesh1.updateMatrix()
    mergedGeo.merge(mesh1.geometry,mesh1.matrix)

    const mesh2 = new THREE.Mesh(outGeometry2, meshMaterial)
    mesh2.position.set(0,-length.height,0)
    mesh2.updateMatrix()
    mergedGeo.merge(mesh2.geometry,mesh2.matrix)

    const mesh3 = new THREE.Mesh(InGeometry, meshMaterial)
    mesh3.position.set(0,-(length.height+length.Inheight),0)
    mesh3.updateMatrix()
    mergedGeo.merge(mesh3.geometry,mesh3.matrix)

    mergedGeo.computeFaceNormals();
    
    const mesh = new THREE.Mesh(mergedGeo, meshMaterial)
    
    mesh.position.set(pos.x,pos.y,pos.z)

    mesh.rotation.x=rotate.x
    mesh.rotation.y=rotate.y
    mesh.rotation.z=rotate.z


    group.add(mesh);
  
    return group
}
