const plot_result = function(res) {
    // reset plots
    document.getElementById("plot").innerHTML = "";
    create_canvas("scores");
    create_canvas("patiences");

    // plot scores
    plot(res.scores, "scores", "black", 0, Settings.levels);

    // plot patiences
    let max_patience = Math.max(...res.patiences.map(x => Math.max(...x)));
    let colors = ["red","green","blue","magenta"];
    for (let i=0; i<4; i++) {
        plot(res.patiences[i], "patiences", colors[i], 0, max_patience);
    }
}

const create_canvas = function(id) {
    if (!document.contains(document.getElementById(id))) {
        document.getElementById("plot").innerHTML += `
            <div><canvas id="${id}" width="600" height="400" style="border:1px solid black;background-color:#fff"></canvas></div>
        `;
    }
}

// draw a plot of an array of values
const plot = function(array, id, color, min, max) {
    let c = document.getElementById(id);
    let ctx = c.getContext("2d");
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i=0; i<array.length; i++) {
        ctx.lineTo(c.width * i / (array.length-1), c.height - (array[i]-min) * c.height / (max - min));
    }
    ctx.stroke();
}

const weights_plot = function(weights) {
    const min = Math.min(...weights.map(a=>Math.min(...a)));
    const max = Math.max(...weights.map(a=>Math.max(...a)));
    
    create_canvas("weights");

    plot(weights.map(a=>a[0]), "weights", "red", min, max);
    plot(weights.map(a=>a[1]), "weights", "green", min, max);
    plot(weights.map(a=>a[2]), "weights", "blue", min, max);

    console.log("min: " + min);
    console.log("max: " + max);
}