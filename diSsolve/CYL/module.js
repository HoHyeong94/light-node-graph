import { THREE, SpriteText } from "global";



export function LoftModelView(top, buttom, height) {
    var geometry = new THREE.CylinderGeometry( top, buttom, height, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var cylinder = new THREE.Mesh( geometry, material );

    return cylinder;
}