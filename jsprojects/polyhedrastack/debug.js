import * as THREE from 'three';

// create a floating coloured point in 3D space for debug purposes
export const create_debug_point = function(pos, color) {
    const point_geom = new THREE.BufferGeometry();
    point_geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    const material = new THREE.PointsMaterial({
        color: color,
        size: 0.1
    });
    const point = new THREE.Points(point_geom, material);
    return point;
}