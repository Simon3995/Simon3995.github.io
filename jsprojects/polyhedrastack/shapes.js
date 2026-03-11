// archimedean
import cuboctahedron from './solids/archimedean/cuboctahedron.js';
import icosidodecahedron from './solids/archimedean/icosidodecahedron.js';
import rhombicosidodecahedron from './solids/archimedean/rhombicosidodecahedron.js';
import rhombicuboctahedron from './solids/archimedean/rhombicuboctahedron.js';
import snub_cube_l from './solids/archimedean/snub_cube_l.js';
import snub_cube_r from './solids/archimedean/snub_cube_r.js';
import truncated_cube from './solids/archimedean/truncated_cube.js';
import truncated_cuboctahedron from './solids/archimedean/truncated_cuboctahedron.js';
import truncated_dodecahedron from './solids/archimedean/truncated_dodecahedron.js';
import truncated_icosahedron from './solids/archimedean/truncated_icosahedron.js';
import truncated_octahedron from './solids/archimedean/truncated_octahedron.js';
import truncated_tetrahedron from './solids/archimedean/truncated_tetrahedron.js';

// catalan
import rhombic_dodecahedron from './solids/catalan/rhombic_dodecahedron.js';

// johnson
import square_pyramid from './solids/johnson/J1 square_pyramid.js';
import pentagonal_pyramid from './solids/johnson/J2 pentagonal_pyramid.js';
import triangular_cupola from './solids/johnson/J3 triangular_cupola.js';
import square_cupola from './solids/johnson/J4 square_cupola.js';
import pentagonal_cupola from './solids/johnson/J5 pentagonal_cupola.js';
import triangular_bipyramid from './solids/johnson/J12 triangular_bipyramid.js';
import pentagonal_bipyramid from './solids/johnson/J13 pentagonal_bipyramid.js';
import gyrobifastigium from './solids/johnson/J26 gyrobifastigium.js';
import snub_disphenoid from './solids/johnson/J84 snub_disphenoid.js';
import bilunabirotunda from './solids/johnson/J91 bilunabirotunda.js';

// misc
import stella_octangula from './solids/misc/stella_octangula.js';

// platonic
import cube from './solids/platonic/cube.js';
import dodecahedron from './solids/platonic/dodecahedron.js';
import icosahedron from './solids/platonic/icosahedron.js';
import octahedron from './solids/platonic/octahedron.js';
import tetrahedron from './solids/platonic/tetrahedron.js';

// antiprisms & prisms
import antiprism_4 from './solids/prisms/antiprism_4.js';
import antiprism_5 from './solids/prisms/antiprism_5.js';
import antiprism_6 from './solids/prisms/antiprism_6.js';
import antiprism_7 from './solids/prisms/antiprism_7.js';
import antiprism_8 from './solids/prisms/antiprism_8.js';
import antiprism_10 from './solids/prisms/antiprism_10.js';

import prism_3 from './solids/prisms/prism_3.js';
import prism_5 from './solids/prisms/prism_5.js';
import prism_6 from './solids/prisms/prism_6.js';
import prism_7 from './solids/prisms/prism_7.js';
import prism_8 from './solids/prisms/prism_8.js';
import prism_10 from './solids/prisms/prism_10.js';


const Shapes = {
    // archimedean
    ...cuboctahedron,
    ...icosidodecahedron,
    ...rhombicosidodecahedron,
    ...rhombicuboctahedron,
    ...snub_cube_l,
    ...snub_cube_r,
    ...truncated_cube,
    ...truncated_cuboctahedron,
    ...truncated_dodecahedron,
    ...truncated_icosahedron,
    ...truncated_octahedron,
    ...truncated_tetrahedron,

    // catalan
    ...rhombic_dodecahedron,

    // johnson
    ...square_pyramid,
    ...pentagonal_pyramid,
    ...triangular_cupola,
    ...square_cupola,
    ...pentagonal_cupola,
    ...triangular_bipyramid,
    ...pentagonal_bipyramid,
    ...gyrobifastigium,
    ...snub_disphenoid,
    ...bilunabirotunda,

    // misc
    ...stella_octangula,

    // platonic
    ...cube,
    ...dodecahedron,
    ...icosahedron,
    ...octahedron,
    ...tetrahedron,

    // antiprisms & prisms
    ...antiprism_4,
    ...antiprism_5,
    ...antiprism_6,
    ...antiprism_7,
    ...antiprism_8,
    ...antiprism_10,

    ...prism_3,
    ...prism_5,
    ...prism_6,
    ...prism_7,
    ...prism_8,
    ...prism_10,
};

console.log("full catalogue of polyhedra:", Shapes);

export default Shapes;
