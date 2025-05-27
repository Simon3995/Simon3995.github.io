let truehex = document.getElementById("truehex");
let scaledhex = document.getElementById("scaledhex");
let fullhex = document.getElementById("fullhex");
let date = new Date();

const update = function() {
    date = new Date();

    update_truehex();
    update_scaledhex();
    update_fullhex();

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

const update_truehex = function() {
    let hours = date.getHours().toString();
    if (hours.length < 2) hours = "0" + hours;

    let mins = date.getMinutes().toString();
    if (mins.length < 2) mins = "0" + mins;

    let secs = date.getSeconds().toString();
    if (secs.length < 2) secs = "0" + secs;

    let color = "#" + hours + mins + secs;
    truehex.innerHTML = color;
    truehex.style.backgroundColor = color;
}

const update_scaledhex = function() {
    let secs = (date.getSeconds() + date.getMilliseconds()/1000)/60;
    let mins = (date.getMinutes() + secs)/60;
    let hours = (date.getHours() + mins)/24;

    if (secs + mins + hours > 1.5) {
        scaledhex.style.color = "black";
    } else {
        scaledhex.style.color = "white";
    }
    
    let secs_hex = Math.floor(secs*256).toString(16).toUpperCase();
    if (secs_hex.length < 2) secs_hex = "0" + secs_hex;

    let mins_hex = Math.floor(mins*256).toString(16).toUpperCase();
    if (mins_hex.length < 2) mins_hex = "0" + mins_hex;

    let hours_hex = Math.floor(hours*256).toString(16).toUpperCase();
    if (hours_hex.length < 2) hours_hex = "0" + hours_hex;

    let color = "#" + hours_hex + mins_hex + secs_hex;
    scaledhex.innerHTML = color;
    scaledhex.style.backgroundColor = color;
}

const update_fullhex = function() {
    let secs = (date.getSeconds() + date.getMilliseconds()/1000)/60;
    let mins = (date.getMinutes() + secs)/60;
    let hours = (date.getHours() + mins)/24;
    
    let hex = Math.floor(16777215*hours).toString(16).toUpperCase();

    while (hex.length < 6) {
        hex = "0" + hex;
    }

    let color_lightness = (parseInt(hex.substring(0,2), 16) / 255) +
        (parseInt(hex.substring(2,4), 16) / 255) +
        (parseInt(hex.substring(4,6), 16) / 255);
    
    if (color_lightness > 1.5) {
        fullhex.style.color = "black";
    } else {
        fullhex.style.color = "white";
    }

    hex = "#" + hex;
    fullhex.innerHTML = hex;
    fullhex.style.backgroundColor = hex;
}