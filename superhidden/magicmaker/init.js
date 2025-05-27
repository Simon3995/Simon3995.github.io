let c = document.getElementById("cardview");
let ctx = c.getContext("2d");

let mana_img = {}
mana_img.w = new Image();
mana_img.w.src = "symbols/white.png";
mana_img.b = new Image();
mana_img.b.src = "symbols/black.png";
mana_img.g = new Image();
mana_img.g.src = "symbols/green.png";
mana_img.r = new Image();
mana_img.r.src = "symbols/red.png";
mana_img.u = new Image();
mana_img.u.src = "symbols/blue.png";
mana_img.c = new Image();
mana_img.c.src = "symbols/colorless.png";

let card = new Card();