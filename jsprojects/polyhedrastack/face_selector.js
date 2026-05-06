import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { mesh_to_face_objects, mesh_to_triangles, set_shape_material } from './util.js';
import Shapes from './shapes.js';

export const fs_Scene = {
    raycaster: new THREE.Raycaster(),
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(20, 1, 0.01, 1000),
    renderer: new THREE.WebGLRenderer({antialias: true}),
    pointer: new THREE.Vector2(),
    shape: null,
    controls: {},
    mouse_moved: false,
    zoom_factor: 0.15,
    face_index: 0,
    def_mat: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    }),
    hlt_mat: new THREE.MeshBasicMaterial({
        color: 0x47b6ff,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    }),
    edge_mat: new THREE.LineBasicMaterial({
        color: 0x000000,
    })
}

fs_Scene.camera.position.z = 20;  // move camera away from origin
fs_Scene.renderer.domElement.width = 166;
fs_Scene.renderer.domElement.height = 166;
fs_Scene.renderer.setSize(166, 166);
document.getElementById("face_selector").appendChild(fs_Scene.renderer.domElement);  // add renderer to document
fs_Scene.renderer.domElement.id = "fs_threecanvas";
fs_Scene.scene.background = new THREE.Color(0x006060);

let controls = new TrackballControls(fs_Scene.camera, fs_Scene.renderer.domElement);
controls.rotateSpeed = 0.7;
controls.noZoom = true;
controls.panSpeed = 0.1;
controls.dynamicDampingFactor = 0.1;
fs_Scene.controls = controls;

export const animate_fs = function () {
    if (fs_Scene.scene.children.length === 0) return;

    const camera = fs_Scene.camera;

    camera.updateMatrixWorld();
    fs_Scene.renderer.render(fs_Scene.scene, camera);
    fs_Scene.controls.update();
}

export const set_fs_shape = function (shape) {
    if (fs_Scene.shape && shape === fs_Scene.shape.userData.name) return;
    
    clear_scene();
    const s = create_shape(shape);
    fs_Scene.scene.add(s);
    fs_Scene.shape = s;
    fs_Scene.face_index = 0;

    // set correct zoom by finding vertex furthest away from center
    let max_dist = 0;
    for (const face of s.children) {
        const vert_data = face.geometry.userData.vertices;
        for (let i = 0; i < vert_data.length; i += 3) {
            let cur_dist = Math.hypot(vert_data[i], vert_data[i + 1], vert_data[i + 2]);
            if (cur_dist > max_dist) max_dist = cur_dist;
        }
    }

    fs_Scene.controls.reset();
    fs_Scene.camera.position.z = max_dist / fs_Scene.zoom_factor;
}

const clear_scene = function () {
    const scene = fs_Scene.scene;
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

const highlight_face = function () {
    // clear current highlight
    set_shape_material(fs_Scene.shape, fs_Scene.def_mat);

    // find hovered face
    fs_Scene.raycaster.setFromCamera(fs_Scene.pointer, fs_Scene.camera);
    const intersects = fs_Scene.raycaster.intersectObjects(fs_Scene.scene.children);
    const meshes = intersects.filter(x => x.object.type === "Mesh");
    const closest = meshes[0];
    if (!closest) return;
    closest.object.material = fs_Scene.hlt_mat;

    const faces = closest.object.parent.children;
    fs_Scene.face_index = faces.findIndex(item => item.uuid === closest.object.uuid);
}

const create_shape = function (shape_name) {
    const shape = Shapes[shape_name];

    // initialize geometry
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mesh_to_triangles(shape)), 3));
    const edge_mat = fs_Scene.edge_mat;
    const edge_geom = new THREE.EdgesGeometry(geom);
    const line_segments = new THREE.LineSegments(edge_geom, edge_mat);

    // initialize faces
    const face_objs = mesh_to_face_objects(shape);
    const face_mat = fs_Scene.def_mat;
    for (const face_obj of face_objs) {
        line_segments.attach(new THREE.Mesh(face_obj, face_mat));
    }

    line_segments.userData.name = shape_name;
    
    return line_segments;
}

fs_Scene.renderer.domElement.addEventListener("mousemove", function (e) {
    const bbox = document.getElementById("face_selector").getBoundingClientRect();
    fs_Scene.pointer.x = ((e.pageX - document.body.scrollLeft - bbox.left) / bbox.width) * 2 - 1;
    fs_Scene.pointer.y = - ((e.pageY - document.body.scrollTop - bbox.top) / bbox.height) * 2 + 1;
}, false);

fs_Scene.renderer.domElement.addEventListener("mousedown", function (e) {
    fs_Scene.mouse_moved = false;
}, false);

fs_Scene.renderer.domElement.addEventListener("mousemove", function (e) {
    fs_Scene.mouse_moved = true;
}, false);

fs_Scene.renderer.domElement.addEventListener("mouseup", function (e) {
    if (!fs_Scene.mouse_moved) highlight_face();
}, false);