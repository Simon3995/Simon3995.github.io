let Objects = [];
let currentVersion = 0;

// TWO.js setup
const c = document.createElement("canvas");
const ctx = TWO.getEnhancedContext(c, {zooming:true, panning:true});
document.body.appendChild(c);
TWO.maximize(c);
ctx.zoom(1.7);

// on click, create new note
c.addEventListener("contextmenu", async function(e) {
    e.preventDefault();
    const coords = ctx.v2w(e.clientX, e.clientY);
    const text = prompt("Enter note text:");

    Objects.push(new TextBox(text, coords.x, coords.y));
    await push_objects(Objects);
}, false);

// main animation loop
function update() {
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, c.width, c.height);

    for (const obj of Objects) {
        obj.draw();
    }

    requestAnimationFrame(update);
}

// keyboard controls
onkeydown = (e) => {
    const pan_amt = 30;
    if (e.key == "=") ctx.zoom(1.25);
    if (e.key == "-") ctx.zoom(0.8);

    if (e.key == "ArrowUp") ctx.translateCamera(0, -pan_amt);
    if (e.key == "ArrowDown") ctx.translateCamera(0, pan_amt);
    if (e.key == "ArrowLeft") ctx.translateCamera(-pan_amt, 0);
    if (e.key == "ArrowRight") ctx.translateCamera(pan_amt, 0);
}

window.addEventListener("DOMContentLoaded", async () => {
    await fetch_objects();
    update();
});