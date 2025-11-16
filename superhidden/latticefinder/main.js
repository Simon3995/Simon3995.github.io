let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let speed = 500;
let drought = 0;
let info = document.getElementById("info");
let size = 16;
let board = init_board_empty();
let x = 0;
let y = 0;
let available = new Set(Array.from({length: 256}, (_, i) => i));

backtrack_solve();