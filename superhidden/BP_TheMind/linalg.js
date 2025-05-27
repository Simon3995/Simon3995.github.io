// helper functions for matrix math
const init_vector = function (size, fill_value) {
    return Array(size).fill(fill_value);
}

const init_matrix = function (width, height, fill_value) {
    let matrix = [];
    for (let i = 0; i < width; i++) {
        matrix[i] = init_vector(height, fill_value);
    }
    return matrix;
}

const init_vector_rand = function (size) {
    let vector = [];
    for (let i = 0; i < size; i++) vector[i] = 2 * Math.random() - 1;
    return vector;
}

const init_matrix_rand = function (width, height) {
    let matrix = [];
    for (let i = 0; i < width; i++) {
        matrix[i] = [];
        for (let j = 0; j < height; j++) {
            matrix[i][j] = 2 * Math.random() - 1;
        }
    }
    return matrix;
}

// multiply a matrix and a vector
const m_multiply = function (matrix, vector) {
    let out = [];
    for (const i in matrix[0]) {
        let n = 0;
        for (const j in vector) {
            n += matrix[j][i] * vector[j];
        }
        out[i] = n;
    }
    return out;
}

// add two vectors
const v_add = function (v1, v2) {
    let out = [];
    for (const i in v1) out[i] = v1[i] + v2[i];
    return out;
}

// add two matrices
const m_add = function (m1, m2) {
    let out = [];
    for (const i in m1) {
        out[i] = [];
        for (const j in m1[i]) {
            out[i][j] = m1[i][j] + m2[i][j];
        }
    }
    return out;
}

// apply a function to all elements of a vector
const v_apply_func = function (vector, func) {
    return vector.map(n => func(n));
}