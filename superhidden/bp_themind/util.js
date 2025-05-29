// returns object with the same value but different reference
const copy = function(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// double shuffle to get rid of (most) bias
const shuffle = function(array) {
    array.sort(() => Math.random() - 0.5).sort(() => Math.random() - 0.5);
}

// returns a random number from an estimated normal distribution
const normal_sample = function(mean, sd) {
    // use 0.156
    let x = 0;
    for (let i = 0; i < 12; i++) x += Math.random();
    x -= 6;
    x *= sd;
    x += mean;
    return x;
}