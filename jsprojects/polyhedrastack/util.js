import * as THREE from 'three';

// Construct a single face object as a single list of coordinates
export const get_face = function(shape, face_id) {
    let face = [];
    for (let vertex of shape.faces[face_id])
        face.push(...shape.verts[vertex]);
    return face;
}

// Convert face to triangles as a single list of coordinates
export const face_to_triangles = function(face) {
    let vertices = [];
    for (let i = 0; i < face.length / 3 - 2; i++) {
        vertices.push(... [face[0], face[1], face[2]]);
        vertices.push(... [face[3 * (i + 1)], face[3 * (i + 1) + 1], face[3 * (i + 1) + 2]]);
        vertices.push(... [face[3 * (i + 2)], face[3 * (i + 2) + 1], face[3 * (i + 2) + 2]]);
    }
    return vertices;
}

// Convert mesh to triangles as a single list of coordinates
export const mesh_to_triangles = function(shape) {
    let vertices = [];
    for (let face in shape.faces)
        vertices.push(...face_to_triangles(get_face(shape, face)));
    return vertices;
}

// Convert mesh to list of THREE.js geometries, one for each face
export const mesh_to_face_objects = function(shape) {
    let faces = [];
    for (let face in shape.faces) {
        const geometry = new THREE.BufferGeometry();
        const vertices = get_face(shape,face);
        const vertex_data = new Float32Array(face_to_triangles(vertices));
        geometry.setAttribute('position', new THREE.BufferAttribute(vertex_data, 3));
        geometry.userData.vertices = vertices;
        geometry.userData.face_type = [
            "SIMONAGON",
            "FRANKAGON",
            "RALPHAGON",
            "TRIANGLE",
            "SQUARE",
            "PENTAGON",
            "HEXAGON",
            "HEPTAGON",
            "OCTAGON",
            "NONAGON",
            "DECAGON",
        ][vertices.length / 3];
        geometry.computeVertexNormals();
        faces.push(geometry);
    }
    return faces;
}

// Convert mesh to list of line segments
export const mesh_to_line_segments = function(shape) {
    let segments = [];
    let pairs = [];
    for (const face of shape.faces) {
        for (let i = 0; i < face.length; i++) {
            // identify vertex pair
            let idx_1 = face[i];
            let idx_2 = face[(i + 1) % face.length];
            if (idx_1 > idx_2) {
                [idx_1, idx_2] = [idx_2, idx_1];
            }
            // check if pair is duplicate
            let exists = false;
            for (const pair of pairs) {
                exists ||= pair[0] === idx_1 && pair[1] === idx_2;
            }
            // if not duplicate, add line segment
            if (!exists) {
                const segment = [... shape.verts[idx_1], ... shape.verts[idx_2]];
                pairs.push([idx_1, idx_2]);
                segments.push(...segment);
            }
        }
    }
    return segments;
}

/* Multiplies all entries in an array of vectors by some scalar.
* mask is an optional parameter that indicates which indices of
* the vectors should be scaled. If left empty it will scale the entire vector.
*/
export const scaleVectorList = function (matrix, factor, mask = [0, 1, 2]) {
    for (const vectorID in matrix) {
        for (const coordinate of mask) {
            matrix[vectorID][coordinate] *= factor;
        }
    }
    return matrix;
}

// sets the material of an entire shape, takes shape as argument
export const set_shape_material = function(shape, material) {
    for (const face of shape.children.filter(x => x.type === "Mesh")) {
        face.material = material;
    }
}

// sets the material of an entire branch, takes root shape as argument
export const set_branch_material = function(root_shape, material) {
    set_shape_material(root_shape, material);
    for (const shape of root_shape.children.filter(x => x.type === "LineSegments")) {
        set_branch_material(shape, material);
    }
}

// checks equality between number arrays, with some rounding to account for errors
export const check_rough_array_equality = function(arr_1, arr_2) {
    let rounding = 5; // how many digits to round to for equality check
    let str_1 = [...arr_1].map(n => n.toFixed(rounding)).toString();
    let str_2 = [...arr_2].map(n => n.toFixed(rounding)).toString();
    return str_1 === str_2;
}

// download a file
export const download_file = function(data, type, file_name) {
    const blob = new Blob([data], { type });
    const fileURL = URL.createObjectURL(blob);
    const download_link = document.createElement('a');
    download_link.href = fileURL;
    download_link.download = file_name;
    document.body.appendChild(download_link);
    download_link.click();
    URL.revokeObjectURL(fileURL);
}

// import a file, returns a promise
export const import_file = function(type) {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = type;

        input.onchange = event => {
            const file = event.target.files[0];
            if (!file) {
                return reject();
            }
            
            const reader = new FileReader();
            reader.onload = e => {
                resolve(e.target.result);
            };

            reader.readAsText(file);
        }

        input.click();
    });
}