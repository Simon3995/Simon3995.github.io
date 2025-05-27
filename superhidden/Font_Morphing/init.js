// canvas setup
let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

// add 'last' method to array prototype
if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    }
}

const fonts = [];

let global_scale = 0.2;

const letter_spacing = {
    "ALFASLAB": 2.7,
    "JUDSON": 2.9,
    "ROBOTO": 3
}

const kerning_scale = {
    "ALFASLAB": 0.6,
    "JUDSON": 0,
    "ROBOTO": 0.6
}

const precomputed = [];
const glyphlist = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+'"[]{}/<>`;

document.getElementById("morph").value = 0;

let animate = false;
let pause_len = 60;
let animate_speed = 0.005;
let anim_dir = 1;
let pause = 0;
let anim = 0;