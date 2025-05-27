// generate palette buttons
const create_buttons = function(palette) {
    let elem = document.getElementById("palette");
    elem.innerHTML = "";
    for (let i=0; i<palette.length; i++) {
        elem.innerHTML += `<button class="colorbutton" style="background-color:${palette[i]}" onclick="set_paintcolor('${palette[i]}')"></button>`;
        if ((i+1)%6 == 0) elem.innerHTML += `<br>`;
    }
}

// update the color picker in the UI
const ui_paintcolor = function(color) {
    document.getElementById("paintcolor").value = color;
}

// set paintcolor variable
const set_paintcolor = function(color) {
    paintcolor = color;
    ui_paintcolor(color);
}

// update all parts of the UI after a change
const update_ui = function() {
    ui_paintcolor(paintcolor);
    create_buttons(palettes[document.getElementById("paletteselect").value]);
    ui_chunkmenu();
}

// generate chunk menu html
const ui_chunkmenu = function() {
    let cm = document.getElementById("chunkmenu");
    
    let html = "";
    
    if (!chunkmenu.length) {
        html = "No regions coloured";
    }

    for (let i=0; i<chunkmenu.length; i++) {
        html += `<div class="chunkmenu_option">`
        html += `<button class="colorbutton" style="background-color:${chunkmenu[i].color}" onclick="set_paintcolor('${chunkmenu[i].color}')">`
        html += `${chunkmenu[i].zones.length}`
        html += `</button>`;
        html += `<input class="chunklabel" value="${chunkmenu[i].name}"> ↕`;
        html += `</div>`;
    }
    cm.innerHTML = html;

    let elements = document.getElementsByClassName("chunklabel");
    for (let i=0; i<elements.length; i++) {
        // add event listener for enter press
        elements[i].onkeypress = e => {
            if (e.key == "Enter") {
                elements[i].blur();
            }
        }
        elements[i].oninput = e => {
            chunkmenu[i].name = elements[i].value;
        }
    }
}

// sortable chunk menu
$("#chunkmenu").sortable({
    axis: "y",
    stop: function () {
        // newly sorted list of colors
        sortchunkmenu([...this.children].map(x => rgbstring2hex(x.children[0].style.backgroundColor)))
        ui_chunkmenu();
    }
});

// collapsible settings menu
$("#accordion").accordion({
    active: false,
    collapsible: true,
    icons: {
        "header": "ui-icon-triangle-1-s",
        "activeHeader": "ui-icon-triangle-1-n",
    },
    animate: {
        duration: 100,
    },
});

// order is an array of hex colors
const sortchunkmenu = function(order) {
    let sorted = [];
    for (let color of order) {
        for (let chunk of chunkmenu) {
            if (color == chunk.color) {
                sorted.push(chunk);
            }
        }
    }
    chunkmenu = sorted;
}

// make tooltip visible and move to correct location
const draw_tooltip = function() {
    let tt = document.getElementById("tooltip");
    tt.style.visibility = "visible";
    let mc = v2r({x:mousex, y:mousey});
    tt.innerHTML = get_zone_at_coords(mc.x, mc.y);
    tt.style.display = tt.innerHTML ? "block" : "none";
    tt.style.left = mousex - 30;
    tt.style.top = mousey - 35;
}