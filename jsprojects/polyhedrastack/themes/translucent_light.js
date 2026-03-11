import * as THREE from 'three';

// translucent theme
export default {
    background: new THREE.Color( 0xffffff ),
    line_material: new THREE.LineBasicMaterial({ color: 0x000000 }),
    default: new THREE.MeshLambertMaterial({
        color: 0xdddddd,
        transparent: true,
        opacity: 0.6,
    }),
    // each click_type needs its own highlight materials
    action: [
        // click_type === 0, Add shape
        {
            face_highlight: new THREE.MeshBasicMaterial({
                color: 0x47b6ff,
                transparent: true,
                opacity: 0.8,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
        },
        // click_type === 1, Delete shape
        {
            shape_highlight: new THREE.MeshBasicMaterial({
                color: 0xff4444,
                transparent: true,
                opacity: 0.8,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
            branch_highlight: new THREE.MeshBasicMaterial({
                color: 0xff8888,
                transparent: true,
                opacity: 0.7,
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
                transparent: true,
                opacity: 0.8,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
        },
        // click_type === 4, Rotate Branch
        {
            shape_highlight: new THREE.MeshBasicMaterial({
                color: 0xffaa54,
                transparent: true,
                opacity: 0.8,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
            branch_highlight: new THREE.MeshBasicMaterial({
                color: 0xffcc99,
                transparent: true,
                opacity: 0.7,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            }),
        }
    ]
}