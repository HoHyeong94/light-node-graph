import { THREE, SpriteText } from "global";



export function ShoeModelView(length,rotate,pos) {
    console.log(length)
    
    const group = new THREE.Group();
    const mergedGeo = new THREE.Geometry();
    const outGeometry1= new THREE.BoxGeometry(length.width,length.height,length.depth);
    const InGeometry = new THREE.BoxGeometry((length.width)-10,length.Inheight,(length.depth)-10)
    const outGeometry2 = new THREE.BoxGeometry(length.width,length.height,length.depth);
    const meshMaterial = new THREE.MeshNormalMaterial({wireFrame:true})
    //meshMaterial.wireFrame = true
    meshMaterial.side = THREE.DoubleSide

    console.log('시작')

    const mesh1 = new THREE.Mesh(outGeometry1, meshMaterial)
    mesh1.position.set(0,0,(length.Inheight)/2+(length.height)/2)
    mesh1.updateMatrix()
    mergedGeo.merge(mesh1.geometry,mesh1.matrix)

    
    const mesh2 = new THREE.Mesh(InGeometry, meshMaterial)
    mesh2.position.set(0,0,0)
    mesh2.updateMatrix()
    mergedGeo.merge(mesh2.geometry,mesh2.matrix)
    
    const mesh3 = new THREE.Mesh(outGeometry2, meshMaterial)
    mesh3.position.set(0,0,-((length.Inheight)/2+(length.height)/2))
    mesh3.updateMatrix()
    mergedGeo.merge(mesh3.geometry,mesh3.matrix)

    console.log(outGeometry1)
    console.log(outGeometry2)
    console.log(InGeometry)


    mergedGeo.computeFaceNormals();
    
    const mesh = new THREE.Mesh(mergedGeo, meshMaterial)
    
    mesh.position.set(pos.x,pos.y,pos.z)

    mesh.rotation.x=rotate.x
    mesh.rotation.y=rotate.y
    mesh.rotation.z=rotate.z


    group.add(mesh);
  
    return group
}
