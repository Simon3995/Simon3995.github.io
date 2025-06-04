let dl = {
    active : false,
    finished: false,
    target : 0,
    progress : 0,
    speed : 0
}

dl.target = Number(document.getElementById("fileselect").value);
dl.speed = Number(document.getElementById("speedselect").value);
let progress_bar = document.getElementById("progress");
let info = document.getElementById("info");

let prev_time = new Date();

setInterval(function() {
    if (dl.active) {
        let now = new Date();
        let delta_t = (now - prev_time) / 1000;
        prev_time = now;
        dl.progress += dl.speed * delta_t;
        let percentage = 100 * Math.round(dl.progress) / dl.target;
        progress_bar.value = percentage;

        // check if finished
        if (dl.progress >= dl.target) {
            pause();
            dl.progress = dl.target;
            document.title = "Finished!";
            info.innerHTML = "Download finished!";
            return;
        }

        document.title = `Downloading... (${percentage.toFixed(1)}%)`;
        info.innerHTML = `Downloading... `;
        info.innerHTML += `${byte_format(Math.round(dl.progress))} of ${byte_format(dl.target)}`;
    }
}, 300)

function start() {
    dl.active = true;
    prev_time = new Date();
    let load = document.getElementById("loading");
    load.style.width = "40px";
    load.style.marginRight = "10px";
    load.style.opacity = "100%";
}

function pause() {
    dl.active = false;
    let load = document.getElementById("loading");
    load.style.width = "0px";
    load.style.marginRight = "0px";
    load.style.opacity = "0%";

    document.title = "Download Simulator";
    info.innerHTML = "Paused. ";
    info.innerHTML += `${byte_format(Math.round(dl.progress))} of ${byte_format(dl.target)}`;
}

function abort() {
    dl.active = false;
    dl.finished = false;
    dl.progress = 0;
    let load = document.getElementById("loading");
    load.style.width = "0px";
    load.style.marginRight = "0px";
    load.style.opacity = "0%";
    document.title = "Download Simulator";
    info.innerHTML = "No download active.";
    progress_bar.value = 0;
}

document.getElementById("speedselect").onchange = e => {
    dl.speed = e.target.value;
}

document.getElementById("fileselect").onchange = e => {
    dl.target = e.target.value;
}