let title, emoji, chars, loops = [];

let emoji_calendar = {
    // JANUARY
    "0101":"🎆",

    // FEBRUARY
    "0211":"🎂", "0214":"🌹", "0221":"🌌", "0229":"🦘",

    // MARCH
    "0301":"🌱", "0310":"🍄", "0317":"🍀", "0328":"🧑‍🚀",

    // APRIL
    "0401":"🃏", "0420":"🥚", "0421":"🐇", "0422":"🌍", "0427":"👑", "0430":"🐈",

    // MAY
    "0501":"⚒️", "0503":"🐟", "0504":"🇳🇱", "0505":"🇳🇱", "0514":"👽",

    // JUNE
    "0601":"🏳️‍🌈", "0619":"⛓️‍💥",

    // JULY
    "0704":"🍔", "0706":"🎩", "0711":"🎂",

    // SEPTEMBER
    "0901":"🍂", "0911":"✈️",

    // OCTOBER
    "1004":"🐕", "1031":"🎃",

    // NOVEMBER
    "1101":"💀", "1102":"💀", "1103":"🍁", "1104":"🌧️", "1111":"🏮",

    // DECEMBER
    "1201":"❄️", "1204":"👞", "1205":"🎁", "1216":"🏛️", "1225":"🎄", "1226":"🎁", "1228":"☃️",
}

document.addEventListener("DOMContentLoaded", function () {
    title = document.getElementById("title");
    emoji = document.getElementById("dailyemoji");

    // let today = new Date();
    // let today_DD = today.getDate();
    // if (today_DD < 10) today_DD = "0" + today_DD;
    // let today_MM = today.getMonth() + 1;
    // if (today_MM < 10) today_MM = "0" + today_MM;
    // let MMDD = "" + today_MM + today_DD;
    // let today_emoji = emoji_calendar[MMDD];
    // emoji.innerHTML = today_emoji ? today_emoji : "🧽";

    
    // horizontal wave animation
    loops.push(function loop_0() {
        requestAnimationFrame(loop_0);
        for (let i = 0; i < chars.length; i++) {
            let x = Number(new Date()) / 5e2;
            chars[i].style.transform = `translateX(${8 * Math.sin(x + i)}px)`;
        }
    });

    // vertical wave animation
    loops.push(function loop_1() {
        requestAnimationFrame(loop_1);
        for (let i = 0; i < chars.length; i++) {
            let x = Number(new Date()) / 5e2;
            chars[i].style.transform = `translateY(${8 * Math.sin(x + i)}px)`;
        }
    });

    // letters swinging back and forth
    loops.push(function loop_2() {
        requestAnimationFrame(loop_2);
        for (let i = 0; i < chars.length; i++) {
            let x = Number(new Date()) / 5e2;
            chars[i].style.transform = `rotate(${8 * Math.sin(x + i)}deg)`;
        }
    });

    // letters flipping backwards
    loops.push(function loop_3() {
        requestAnimationFrame(loop_3);
        for (let i = 0; i < chars.length; i++) {
            let x = Number(new Date()) / 5e2;
            chars[i].style.transform = `rotate3d(0, 1, 0, ${theta(x - i/3)}rad)`;
        }
    });

    // somersaulting letters
    loops.push(function loop_4() {
        requestAnimationFrame(loop_4);
        for (let i = 0; i < chars.length; i++) {
            let x = Number(new Date()) / 8e2;
            chars[i].style.transform = `translateY(${-10 + 8*theta(1.5*x - i/3)}px)`;
        }
    });

    // letters dipping down
    loops.push(function loop_5() {
        requestAnimationFrame(loop_5);
        for (let i = 0; i < chars.length; i++) {
            let x = Number(new Date()) / 8e2;
            chars[i].style.transform = `translateY(${20*Math.sin(theta(x - i/3))}px)`;
        }
    });

    // random translation at random intervals
    loops.push(function loop_6() {
        requestAnimationFrame(loop_6);
        for (let i = 0; i < chars.length; i++) {
            if (Math.random() < 0.01) {
                chars[i].style.transform = `translate(${10 * (Math.random()-.5)}px, ${10 * (Math.random()-.5)}px)`;
            }
        }
    });

    // random scaling at random intervals
    loops.push(function loop_7() {
        requestAnimationFrame(loop_7);
        for (let i = 0; i < chars.length; i++) {
            if (Math.random() < 0.01) {
                chars[i].style.transform = `scale(${1 + 0.7 * (Math.random()-.5)}, ${1 + 0.7 * (Math.random()-.5)})`;
            }
        }
    });
    
    // wrap each letter in a span element
    let text = title.textContent;
    let spanned = [...text].map(char => {
        return `<span class="char">${char}</span>`;
    }).join('');
    title.innerHTML = spanned;

    chars = Array.from(document.getElementsByClassName("char"));

    // choose random action
    let index = Math.floor(Math.random() * loops.length)
    loops[index]();
});

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