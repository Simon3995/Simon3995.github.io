import Shapes from './shapes.js';
import { Scene } from './main.js';
import { create_shape } from './model.js';

const category_order = ["Platonic", "Archimedean", "Prisms and Antiprisms", "Johnson", "Catalan", "Miscellaneous"];
const shape_order = {
    "Platonic": [
        "Tetrahedron",
        "Cube",
        "Octahedron",
        "Dodecahedron",
        "Icosahedron"
    ],
    "Archimedean": [
        "Truncated Tetrahedron",
        "Cuboctahedron",
        "Truncated Cube",
        "Truncated Octahedron",
        "Rhombicuboctahedron",
        "Truncated Cuboctahedron",
        "Snub Cube (L)",
        "Snub Cube (R)",
        "Icosidodecahedron",
        "Truncated Dodecahedron",
        "Truncated Icosahedron",
        "Rhombicosidodecahedron",
        "Truncated Icosidodecahedron",
        "Snub Dodecahedron (L)",
        "Snub Dodecahedron (R)"
    ],
    "Prisms and Antiprisms": [
        "Triangular Prism",
        "Square Antiprism",
        "Pentagonal Prism",
        "Pentagonal Antiprism",
        "Hexagonal Prism",
        "Hexagonal Antiprism",
        "Heptagonal Prism",
        "Heptagonal Antiprism",
        "Octagonal Prism",
        "Octagonal Antiprism",
        "Decagonal Prism",
        "Decagonal Antiprism"
    ]
};

export const generate_polyhedra_list = function() {
    // clear existing polyhedra list
    const list = document.getElementById("polyhedralist");
    list.innerHTML = "";

    // create a list of polyhedra grouped by type
    const polyhedra_array = Object.entries(Shapes).map(([key, value]) => ({
        ...value,
        name: key
    }));
    const grouped_shapes = Object.groupBy(polyhedra_array, ({category}) => category);

    // add all shapes per-category
    for (const category of category_order) {
        let shapes = grouped_shapes[category];
        
        // sort shapes by custom order
        if (shape_order[category]) {
            shapes.sort((a, b) => shape_order[category].indexOf(a.name) - shape_order[category].indexOf(b.name));
        }
        
        for (const shape of shapes) {
            // create new button element
            let button = document.createElement("button");
            
            // create button image
            let img = document.createElement("img");
            img.src = `/sprites/solids/${shape.name}.png`;
            img.classList.add('polyimg');

            // add classes
            button.classList.add("polyhedrabutton");
            if (shape.name == Scene.add_shape) button.classList.add("selected");

            // attach onclick event listener
            button.onclick = function() {
                Scene.add_shape = shape.name;
                
                // deselect all buttons
                let buttons = document.getElementsByClassName("polyhedrabutton");
                for (let b of buttons) b.classList.remove("selected");

                // select this button
                this.classList.add("selected");

                // if scene is empty, create new
                if (Scene.scene.children.filter(x => x.type == "LineSegments").length == 0) {
                    Scene.scene.add(create_shape(Scene.add_shape));
                }
            }

            // add button content and add to polyhedra list
            button.appendChild(img);
            
            // manual override of long names (insert word breaking point manually)
            let button_text = shape.name;
            if (button_text === "Rhombicuboctahedron") button_text = "Rhombi&shy;cuboctahedron";
            if (button_text === "Rhombicosidodecahedron") button_text = "Rhombicosi&shy;dodecahedron";

            button.innerHTML += `<div class="polylabel">${button_text}</div>`;
            list.appendChild(button);
        }
    }
}