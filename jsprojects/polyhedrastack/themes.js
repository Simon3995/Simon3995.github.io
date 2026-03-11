import { Scene } from './main.js';
import translucent_dark from './themes/translucent_dark.js';
import translucent_light from './themes/translucent_light.js';
import basic_dark from './themes/basic_dark.js';
import basic_light from './themes/basic_light.js';
import wireframe_dark from './themes/wireframe_dark.js';
import wireframe_light from './themes/wireframe_light.js';
import normal_shading from './themes/normal_shading.js';

const Themes = {};

Themes["Translucent Dark"] = translucent_dark;
Themes["Translucent Light"] = translucent_light;
Themes["Basic Dark"] = basic_dark;
Themes["Basic Light"] = basic_light;
Themes["Wireframe Dark"] = wireframe_dark;
Themes["Wireframe Light"] = wireframe_light;
Themes["Normal Shading"] = normal_shading;

export default Themes;


document.getElementById("themeselect").onchange = function(e) {
    Scene.theme = Themes[e.target.value];
    reload_theme(Scene.scene);
}

export const reload_theme = function (scene) {
    Scene.scene.background = Scene.theme.background;
    for (const obj of scene.children) {
        if (obj.type == "LineSegments") {
            if (Scene.theme.line_material) {
                obj.material = Scene.theme.line_material;
            } else {
                obj.material = new THREE.LineBasicMaterial();
                obj.material.visible = false;
            }
            reload_theme(obj);
        } else if (obj.type == "Mesh") {
            obj.material = Scene.theme.default;
        }
    }
}