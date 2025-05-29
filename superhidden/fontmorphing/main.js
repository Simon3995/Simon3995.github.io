let morph;

// initialization
async function init() {
    fonts["ALFASLAB"] = await load_font('fonts/AlfaSlabOne.ttf');
    fonts["JUDSON"] = await load_font('fonts/Judson-Edit.ttf');
    fonts["ROBOTO"] = await load_font('fonts/Roboto.ttf');

    reset_morph();
    update();
}

function reset_morph() {
    global_scale = Number(document.getElementById("scale").value) / 10;
    const font_a = document.getElementById("fonta").value;
    const font_b = document.getElementById("fontb").value;
    const string = document.getElementById("textinput").value;
    const align_method = document.getElementById("alignmethod").value;
    const morph_method = document.getElementById("morphmethod").value;
    if (!string) {
        morph = null;
        return;
    }
    morph = new StringMorph(string, font_a, font_b, align_method, morph_method);
}

// main update loop
function update() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, c.width, c.height);
    morph?.draw();

    // animate morph
    if (animate) {
        if (pause > 0) {
            pause--;
        } else {
            anim += animate_speed * anim_dir;
            
            // hit max
            if (anim_dir == 1 && anim >= 1) {
                anim = 1;
                pause = pause_len;
                anim_dir *= -1;
            }

            // hit min
            if (anim_dir == -1 && anim <= 0) {
                anim = 0;
                pause = pause_len;
                anim_dir *= -1;
            }
        }
        
        if (morph) morph.value = anim;
        document.getElementById("morph").value = anim;
        document.getElementById("morphdisplay").innerHTML = anim.toFixed(2);
    }

    requestAnimationFrame(update);
}

init();

document.getElementById("morph").oninput = (e) => {
    morph.value = Number(e.target.value);
    document.getElementById("morphdisplay").innerHTML = Number(e.target.value).toFixed(2);
}

document.getElementById("toggle_animate").oninput = (e) => {
    animate = e.target.checked;
    if (animate) anim = Number(document.getElementById("morph").value);
}

document.getElementById("anim_speed").oninput = (e) => {
    animate_speed = Number(e.target.value);
}

document.getElementById("anim_pause").oninput = (e) => {
    pause_len = Number(e.target.value);
}

document.getElementById("fonta").oninput = reset_morph;
document.getElementById("fontb").oninput = reset_morph;
document.getElementById("textinput").oninput = reset_morph;
document.getElementById("alignmethod").oninput = reset_morph;
document.getElementById("morphmethod").oninput = reset_morph;
document.getElementById("scale").oninput = reset_morph;