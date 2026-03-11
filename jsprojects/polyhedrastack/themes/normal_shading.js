import * as THREE from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

// basic theme
export default {
    background: new THREE.Color( 0x202020 ),
    line_material: {},
    default: new THREE.MeshNormalMaterial({
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
    }),
    // each click_type needs its own highlight materials
    action: [
        // click_type === 0, Add shape
        {},
        // click_type === 1, Delete shape
        {},
        // click_type === 2, Rotate View
        {},
        // click_type === 3, Center View on Object
        {},
        // click_type === 4, Rotate Branch
        {}
    ]
}