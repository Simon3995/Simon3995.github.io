let title, chars;

document.addEventListener("DOMContentLoaded", function () {
    title = document.getElementById("title");
    
    // wrap each letter in a span element
    let text = title.textContent;
    let spanned = [...text].map(char => {
        return `<span class="char">${char}</span>`;
    }).join('');
    title.innerHTML = spanned;

    chars = Array.from(document.getElementsByClassName("char"));

    // choose random action
    let index = Math.floor(Math.random() * 6)
    //let index = 6;
    window[`loop_${index}`]();
});

function loop_0() {
    requestAnimationFrame(loop_0);

    for (let i = 0; i < chars.length; i++) {
        let x = Number(new Date()) / 5e2;
        chars[i].style.transform = `translateX(${8 * Math.sin(x + i)}px)`;
    }
}

function loop_1() {
    requestAnimationFrame(loop_1);

    for (let i = 0; i < chars.length; i++) {
        let x = Number(new Date()) / 5e2;
        chars[i].style.transform = `translateY(${8 * Math.sin(x + i)}px)`;
    }
}

function loop_2() {
    requestAnimationFrame(loop_2);

    for (let i = 0; i < chars.length; i++) {
        let x = Number(new Date()) / 5e2;
        chars[i].style.transform = `rotate(${8 * Math.sin(x + i)}deg)`;
    }
}

function loop_3() {
    requestAnimationFrame(loop_3);

    for (let i = 0; i < chars.length; i++) {
        let x = Number(new Date()) / 5e2;
        chars[i].style.transform = `rotate3d(0, 1, 0, ${theta(x - i/3)}rad)`;
    }
}

function loop_4() {
    requestAnimationFrame(loop_4);

    for (let i = 0; i < chars.length; i++) {
        let x = Number(new Date()) / 8e2;
        chars[i].style.transform = `rotate3d(0, 0, 1, ${2*theta(x - i/3)}rad)`;
    }
}

function loop_5() {
    requestAnimationFrame(loop_5);

    for (let i = 0; i < chars.length; i++) {
        let x = Number(new Date()) / 8e2;
        chars[i].style.transform = `translateY(${20*Math.sin(theta(x - i/3))}px)`;
    }
}

function theta(t, T = 15, rampRatio = 0.1) {
    let rampTime = T * rampRatio / 2; // ramp up and ramp down
    let flatTime = (T - 2 * rampTime) / 2; // flat 0 and flat π
    let phase = t % T;

    if (phase < flatTime) {
        return 0;
    } else if (phase < flatTime + rampTime) {
        // ramp up
        let p = (phase - flatTime) / rampTime;
        return Math.PI * p;
    } else if (phase < flatTime + rampTime + flatTime) {
        return Math.PI;
    } else {
        // ramp down
        let p = (phase - flatTime - rampTime - flatTime) / rampTime;
        return Math.PI * (1 - p);
    }
}