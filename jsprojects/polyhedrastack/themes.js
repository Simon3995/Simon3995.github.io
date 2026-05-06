import { Scene, Settings } from "./main.js";
import * as THREE from 'three';

// HTML input elements
const theme_preset  = document.getElementById("theme_preset");
const theme_bg_col  = document.getElementById("theme_bg_col");
const theme_fc      = document.getElementById("theme_fc");
const theme_fc_col  = document.getElementById("theme_fc_col");
const theme_fc_opc  = document.getElementById("theme_fc_opc");
const theme_fc_shd  = document.getElementById("theme_fc_shd");
const theme_wr      = document.getElementById("theme_wr");
const theme_wr_col  = document.getElementById("theme_wr_col");

// global theme object
export let Theme = {
    bg_col: "#202020",
    fc: true,
    fc_col: "#ffffff",
    fc_opc: 1.0,
    fc_shd: "lambert",
    wr: true,
    wr_col: "#000000",
}

const Presets = {
    default_dark: {
        bg_col: "#202020",
        fc: true,
        fc_col: "#ffffff",
        fc_opc: 1.0,
        fc_shd: "lambert",
        wr: true,
        wr_col: "#000000",
    },
    default_light: {
        bg_col: "#ffffff",
        fc: true,
        fc_col: "#dddddd",
        fc_opc: 1.0,
        fc_shd: "lambert",
        wr: true,
        wr_col: "#000000",
    },
    wireframe_dark: {
        bg_col: "#202020",
        fc: false,
        fc_col: "#808080",
        fc_opc: 1.0,
        fc_shd: "flat",
        wr: true,
        wr_col: "#ffffff",
    },
    wireframe_light: {
        bg_col: "#ffffff",
        fc: false,
        fc_col: "#808080",
        fc_opc: 1.0,
        fc_shd: "flat",
        wr: true,
        wr_col: "#000000",
    },
    normal_shading: {
        bg_col: "#202020",
        fc: true,
        fc_col: "#ffffff",
        fc_opc: 1.0,
        fc_shd: "normal",
        wr: false,
        wr_col: "#000000",
    },
    translucent_normal: {
        bg_col: "#241F31",
        fc: true,
        fc_col: "#ffffff",
        fc_opc: 0.4,
        fc_shd: "normal",
        wr: true,
        wr_col: "#8080FF",
    }
}

// update theme menu inputs to match current scene
export const update_theme_inputs = function () {
    theme_bg_col.value = Theme.bg_col;
    theme_fc.checked = Theme.fc;
    theme_fc_col.value = Theme.fc_col;
    theme_fc_opc.value = Theme.fc_opc;
    theme_fc_shd.value = Theme.fc_shd;
    theme_wr.checked = Theme.wr;
    theme_wr_col.value = Theme.wr_col;
}

// return the default face material for new shapes based on current theme settings
export const def_face_mat = function () {
    const settings = {
        visible: Theme.fc,
        color: Theme.fc_col,
        transparent: (Theme.fc_opc < 1),
        opacity: Theme.fc_opc,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
    }

    switch (Theme.fc_shd) {
        case "flat":
            return new THREE.MeshBasicMaterial(settings);
        case "lambert":
            return new THREE.MeshLambertMaterial(settings);
        case "normal":
            delete settings.color;
            return new THREE.MeshNormalMaterial(settings);
    }
}

// return the default line material for new shapes based on current theme settings
export const def_line_mat = function () {
    return new THREE.LineBasicMaterial({
        visible: Theme.wr,
        color: Theme.wr_col,
    });
}

export const get_hlt_mat = function (type) {
    const hlt_col = (type === "branch") ?
        ["#6dc5ff", "#ff6d6d", "#6ee8e2", "#fff0a6", "#ff9f6f"][Settings.click_type] :    
        ["#47b6ff", "#ff4444", "#6ee8e2", "#ffe354", "#f9844a"][Settings.click_type];

    const settings = {
        color: hlt_col,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
    }

    if ((type === "face" && [0].includes(Settings.click_type)) ||
        (type === "shape" && [1, 3, 4].includes(Settings.click_type)) ||
        (type === "branch" && [1, 4].includes(Settings.click_type))) {
            return new THREE.MeshBasicMaterial(settings);
    }
}

export const get_shape_hlt = function () {
    switch (Settings.click_type) {
        // add shape
        case 0:
            return null;
        
        // delete shape
        case 1:
            return new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00ff00) });

        // viewing mode
        case 2:
            return null;

        // focus shape
        case 3:
            return new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00ff00) });

        // rotate shape
        case 4:
            return new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00ff00) });
    }

    return null;
}

export const get_branch_hlt = function () {
    switch (Settings.click_type) {
        // add shape
        case 0:
            return null;
        
        // delete shape
        case 1:
            return new THREE.MeshBasicMaterial({ color: new THREE.Color(0x0000ff) });

        // viewing mode
        case 2:
            return null;

        // focus shape
        case 3:
            return null;

        // rotate shape
        case 4:
            return new THREE.MeshBasicMaterial({ color: new THREE.Color(0x0000ff) });
    }

    return null;
}

// apply the current theme to the scene recursively
export const reload_theme = function (scene) {
    document.body.style.backgroundColor = Theme.bg_col;

    for (const obj of scene.children) {
        if (obj.type == "Mesh") {
            switch (Theme.fc_shd) {
                case "flat":
                    obj.material = new THREE.MeshBasicMaterial();
                    break;
                case "lambert":
                    obj.material = new THREE.MeshLambertMaterial();
                    break;
                case "normal":
                    obj.material = new THREE.MeshNormalMaterial();
                    break;
            }
            obj.material.polygonOffset = true;
            obj.material.polygonOffsetUnits = 1;
            obj.material.polygonOffsetFactor = 1;
            obj.material.visible = Theme.fc;
            obj.material.color = new THREE.Color(Theme.fc_col);
            obj.material.transparent = (Theme.fc_opc < 1);
            obj.material.opacity = Theme.fc_opc;
            obj.material.needsUpdate = true;
        } else if (obj.type == "LineSegments") {
            obj.material.visible = Theme.wr;
            obj.material.color = new THREE.Color(Theme.wr_col);
        }

        reload_theme(obj);
    }
}

// event listeners
theme_bg_col.onchange = function(e) {
    Theme.bg_col = theme_bg_col.value;
    theme_preset.value = "custom";
    reload_theme(Scene.scene);
}

theme_fc.onchange = function(e) {
    Theme.fc = e.target.checked;
    theme_preset.value = "custom";
    reload_theme(Scene.scene);
}

theme_fc_col.onchange = function(e) {
    Theme.fc_col = e.target.value;
    theme_preset.value = "custom";
    reload_theme(Scene.scene);
}

theme_fc_opc.onchange = function(e) {
    Theme.fc_opc = Number(e.target.value);
    theme_preset.value = "custom";
    reload_theme(Scene.scene);
}

theme_fc_shd.onchange = function(e) {
    Theme.fc_shd = e.target.value;
    theme_preset.value = "custom";
    reload_theme(Scene.scene);
}

theme_wr.onchange = function(e) {
    Theme.wr = e.target.checked;
    theme_preset.value = "custom";
    reload_theme(Scene.scene);
}

theme_wr_col.onchange = function(e) {
    Theme.wr_col = e.target.value;
    theme_preset.value = "custom";
    reload_theme(Scene.scene);
}

theme_preset.onchange = function(e) {
    Theme = structuredClone(Presets[e.target.value]);
    update_theme_inputs();
    reload_theme(Scene.scene);
}