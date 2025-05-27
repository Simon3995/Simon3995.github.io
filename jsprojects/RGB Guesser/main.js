let input = document.getElementById("guess");
let warning = document.getElementById("warning");
let sml = document.getElementById("sml");
let comparison = document.getElementById("comparison");
let q = document.getElementById("q");
let info = document.getElementById("info");

let c = document.getElementById("canvas");
let cguess = document.getElementById("cguess");
let canswer = document.getElementById("canswer");
let ctx = c.getContext("2d");
let gtx = cguess.getContext("2d");
let atx = canswer.getContext("2d");
gtx.textAlign = "center";
atx.textAlign = "center";
gtx.textBaseline = "middle";
atx.textBaseline = "middle";

let answer = "";
let data = {
    datasets: [{
        label: "Performance",
        backgroundColor: "#6bb5ff",
        borderColor: "#6bb5ff",
        data: [5,9,2,5,6,2],
    }],
};

const init = function () {
    answer = Math.floor(Math.random()*16777215).toString(16);
    
    while (answer.length < 6) {
        answer = "0" + answer;
    }
    
    let randomColor = "#" + answer;
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, c.width, c.height);
}

const guess = function() {
    let color = "#" + input.value;
    if (!isColor(color)) {
        // invalid color entered
        warning.style.display = "block";
        comparison.style.display = "none";
        warning.innerHTML = `Invalid Color: "${color}"`;
    } else if (color.length == 5 || color.length == 9) {
        // transparent color entered
        warning.style.display = "block";
        comparison.style.display = "none";
        warning.innerHTML = `Transparency not supported`;
    } else {
        // valid color, show comparison
        warning.style.display = "none";
        comparison.style.display = "block";
        gtx.fillStyle = color;
        gtx.fillRect(0, 0, cguess.width, cguess.height);
        atx.fillStyle = ctx.fillStyle;
        atx.fillRect(0, 0, canswer.width, canswer.height);

        // text on left canvas
        let gfill = gtx.fillStyle;
        gtx.font = "30px Consolas";
        gtx.lineWidth = 5;
        gtx.fillStyle = "#444";
        gtx.strokeText(gfill, cguess.width/2, cguess.height/2);
        gtx.fillStyle = "white";
        gtx.fillText(gfill, cguess.width/2, cguess.height/2);

        // text on right canvas
        let afill = "#" + answer;
        atx.font = "30px Consolas";
        atx.lineWidth = 5;
        atx.fillStyle = "#444";
        atx.strokeText(afill, canswer.width/2, canswer.height/2);
        atx.fillStyle = "white";
        atx.fillText(afill, canswer.width/2, canswer.height/2);

        // comparison
        let diff = DeltaE.getDeltaE00(hex2lab(afill), hex2lab(gfill));
        if (diff > 100) diff = 100;
        let similarity = (100 - diff).toFixed(2);
        let verdict, textcolor;

        // decide color / rating
        if (similarity < 50) {
            verdict = "awful";
            textcolor = "#ff4d61";
        } else if (similarity < 60) {
            verdict = "bad";
            textcolor = "#ff624d";
        } else if (similarity < 65) {
            verdict = "meh";
            textcolor = "#ff974d";
        } else if (similarity < 70) {
            verdict = "ok";
            textcolor = "#ffc74d";
        } else if (similarity < 75) {
            verdict = "decent";
            textcolor = "#beff4d";
        } else if (similarity < 80) {
            verdict = "pretty good";
            textcolor = "#53ff4d";
        } else if (similarity < 85) {
            verdict = "good";
            textcolor = "#4dff9a";
        } else if (similarity < 90) {
            verdict = "great";
            textcolor = "#4dfff6";
        } else if (similarity < 95) {
            verdict = "awesome";
            textcolor = "#4dbbff";
        } else if (similarity < 99) {
            verdict = "phenomenal";
            textcolor = "#6077fc";
        } else {
            verdict = "perfect"
            textcolor = "#856dfc";
        }

        playMultiSound(verdict);
        
        let htmlstring = `Similarity: ${similarity}% (`;
        htmlstring += `<div style="color:${textcolor}; display:inline">${verdict}</div>)`;

        if (verdict != "perfect") {
            htmlstring += '<br><div style="color:#aaa;font-size:25px;margin-top:5px">Tip: ';
            htmlstring += hint(hex2rgb(gfill), hex2rgb(afill));
            htmlstring += "</div>";
        }

        sml.innerHTML = htmlstring;

        input.value = "";
        init();
    }
}

const hint = function(gs, an) {
    let dR = gs[0]-an[0];
    let dG = gs[1]-an[1];
    let dB = gs[2]-an[2];

    // guess was too dark
    if (gs[0] < an[0] && gs[1] < an[1] && gs[2] < an[2]) {
        let mean_diff = Math.abs((gs[0]-an[0])+(gs[1]-an[1])+(gs[2]-an[2]))/3;
        if (mean_diff < 60) {
            return "Your guess is a bit too dark.";
        } else if (mean_diff < 150) {
            return "Your guess is too dark.";
        } else {
            return "Your guess is much too dark.";
        }
    }

    // guess was too light
    if (gs[0] > an[0] && gs[1] > an[1] && gs[2] > an[2]) {
        let mean_diff = Math.abs((gs[0]-an[0])+(gs[1]-an[1])+(gs[2]-an[2]))/3;
        if (mean_diff < 60) {
            return "Your guess is a bit too light.";
        } else if (mean_diff < 150) {
            return "Your guess is too light.";
        } else {
            return "Your guess is much too light.";
        }
    }

    // change red
    if (Math.abs(dR) > Math.abs(dG) && Math.abs(dR) > Math.abs(dB)) {
        if (dR < 0) {
            // needs more red
            if (-dR < 20) {
                return "You need a tiny bit more red.";
            } else if (-dR < 60) {
                return "You need a bit more red.";
            } else if (-dR < 150) {
                return "You need more red.";
            } else {
                return "You need much more red.";
            }
        } else {
            // needs less red
            if (dR < 20) {
                return "You have a tiny bit too much red.";
            } else if (dR < 60) {
                return "You have a bit too much red.";
            } else if (dR < 150) {
                return "You have too much red.";
            } else {
                return "You have way too much red.";
            }
        }
    }

    // change green
    if (Math.abs(dG) > Math.abs(dR) && Math.abs(dG) > Math.abs(dB)) {
        if (dG < 0) {
            // needs more green
            if (-dG < 20) {
                return "You need a tiny bit more green.";
            } else if (-dG < 60) {
                return "You need a bit more green.";
            } else if (-dG < 150) {
                return "You need more green.";
            } else {
                return "You need much more green.";
            }
        } else {
            // needs less green
            if (dG < 20) {
                return "You have a tiny bit too much green.";
            } else if (dG < 60) {
                return "You have a bit too much green.";
            } else if (dG < 150) {
                return "You have too much green.";
            } else {
                return "You have way too much green.";
            }
        }
    }

    // change blue
    if (Math.abs(dB) > Math.abs(dR) && Math.abs(dB) > Math.abs(dG)) {
        if (dB < 0) {
            // needs more blue
            if (-dB < 20) {
                return "You need a tiny bit more blue.";
            } else if (-dB < 60) {
                return "You need a bit more blue.";
            } else if (-dB < 150) {
                return "You need more blue.";
            } else {
                return "You need much more blue.";
            }
        } else {
            // needs less blue
            if (dB < 20) {
                return "You have a tiny bit too much blue.";
            } else if (dB < 60) {
                return "You have a bit too much blue.";
            } else if (dB < 150) {
                return "You have too much blue.";
            } else {
                return "You have way too much blue.";
            }
        }
    }

    return "If you're seeing this, there is a mistake in the code.";
}

init();

q.addEventListener("mousedown", function() {
    if (info.style.visibility == "visible") {
        info.style.visibility = "hidden";
    } else {
        info.style.visibility = "visible";
    }
}, false);