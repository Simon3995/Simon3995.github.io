import * as THREE from 'three';

// basic theme
export default {
    background: new THREE.Color( 0xffffff ),
    line_material: new THREE.LineBasicMaterial({
        color: 0x000000,
    }),
    default: new THREE.MeshBasicMaterial({
        color: 0xdddddd,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    }),
    // each click_type needs its own highlight materials
    action: [
        // click_type === 0, Add shape
        {
            face_highlight: new THREE.MeshBasicMaterial({
                color: 0x47b6ff,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
        },
        // click_type === 1, Delete shape
        {
            shape_highlight: new THREE.MeshBasicMaterial({
                color: 0xff4444,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
            branch_highlight: new THREE.MeshBasicMaterial({
                color: 0xff8888,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
        },
        // click_type === 2, Rotate View
        {
            // No highlights in rotate view mode
        },
        // click_type === 3, Center View on Object
        {
            shape_highlight: new THREE.MeshBasicMaterial({
                color: 0xffe354,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
        },
        // click_type === 4, Rotate Branch
        {
            shape_highlight: new THREE.MeshBasicMaterial({
                color: 0xf9844a,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
            branch_highlight: new THREE.MeshBasicMaterial({
                color: 0xffa173,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
        }
    ]
}