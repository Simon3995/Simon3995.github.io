window.addEventListener("resize", function() {
    update_canvas_res();
}, false);

c.addEventListener("wheel", function(e) {
    let mouse_pre = v2r({x:e.clientX, y:e.clientY});
    if (e.deltaY < 0) {
        zoom *= 1.1;
        if (zoom > 500) zoom = 500;
    } else {
        zoom /= 1.1;
        if (zoom < 2) zoom = 2;
    }

    // correct position so zoom center is mouse
    let mouse_post = v2r({x:e.clientX, y:e.clientY});
    rx -= (mouse_post.x - mouse_pre.x);
    ry += (mouse_post.y - mouse_pre.y);

    // limit rx/ry
    if (rx < -15) rx = -15;
    if (rx > 15) rx = 15;
    if (ry < -15) ry = -15;
    if (ry > 15) ry = 15;

    mousemoved = true;
}, false);

c.addEventListener("mousedown", function(e) {
    mousemoved = false;
    if (e.button === 0) mousedown = true;

    // right click; delete on mousedown
    if (e.button === 2) {
        let real_coords = v2r({
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
        });
        let clicked_zone = get_zone_at_coords(real_coords.x, real_coords.y);
        
        if (clicked_zone) unpaint(get_zone_at_coords(real_coords.x, real_coords.y));
        update_ui();
        update_map();
    }
}, false);

window.addEventListener("contextmenu", function(e) {
    e.preventDefault();
}, false);

document.addEventListener("mousemove", function(e) {
    if (mousedown) {
        rx -= e.movementX / zoom;
        ry -= e.movementY / zoom;
    }

    mousex = e.clientX;
    mousey = e.clientY;

    // limit rx/ry
    if (rx < -15) rx = -15;
    if (rx > 15) rx = 15;
    if (ry < -15) ry = -15;
    if (ry > 15) ry = 15;

    mousemoved = true;
    ttt = 0;
    document.getElementById("tooltip").style.visibility = "hidden";
}, false);

document.addEventListener("mouseup", function(e) {
    mousedown = false;

    if (!mousemoved) {
        // clicked without moving mouse, attempt paint
        let real_coords = v2r({
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop
        });
        
        let clicked_zone = get_zone_at_coords(real_coords.x, real_coords.y);
    
        if (e.button === 0) {
            if (clicked_zone) paint(clicked_zone, paintcolor);
            update_ui();
            update_map();
        }
    }
}, false);

document.addEventListener("keypress", function(e) {
    let keys = ["1","2","3","4","5","6","7","8","9","0","-","="];
    if (keys.includes(e.key)) {
        let index = keys.indexOf(e.key);
        let palette = palettes[document.getElementById("paletteselect").value];
        paintcolor = palette[index];
        ui_paintcolor(paintcolor);
    }
}, false);

document.getElementById("paletteselect").onchange = (e) => {
    value = document.getElementById("paletteselect").value;
    create_buttons(palettes[value]);
}

document.getElementById("mapselect").onchange = (e) => {
    value = document.getElementById("mapselect").value;
    load_file(value);
}

document.getElementById("paintcolor").onchange = (e) => {
    paintcolor = document.getElementById("paintcolor").value;
}

document.getElementById("toggle_borders").onchange = (e) => {
    borders = document.getElementById("toggle_borders").checked;
    document.getElementById("toggle_innerborders").disabled = !borders;
    document.getElementById("innerborders_label").style.color = borders ? "white" : "#888";
}

document.getElementById("toggle_innerborders").onchange = (e) => {
    innerborders = e.target.checked;
}

document.getElementById("toggle_tooltip").onchange = (e) => {
    tooltip = e.target.checked;
    document.getElementById("tooltip").style.visibility = tooltip ? "visible" : "hidden";
}