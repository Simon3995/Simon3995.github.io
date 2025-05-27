// title border
const title_border = function() {
    ctx.moveTo(38,32);
    ctx.lineTo(460,32);
    ctx.arc(430, 52.5, 40, -0.54, 0.54, false);
    ctx.lineTo(38,74);
    ctx.arc(70, 52.5, 40, Math.PI-.54, Math.PI+.54, false);
    ctx.closePath();
}

// image border
const img_border = function() {
    ctx.rect(38, 80, 422, 306);
}

// card type border
const card_type_border = function() {
    ctx.moveTo(38,392);
    ctx.lineTo(460,392);
    ctx.arc(430, 412.5, 40, -0.54, 0.54, false);
    ctx.lineTo(38,434);
    ctx.arc(70, 412.5, 40, Math.PI-.54, Math.PI+.54, false);
    ctx.closePath();
}

// description border
const description_border = function() {
    ctx.rect(38, 439, 422, 208);
}

// power/toughness border
const power_toughness_border = function() {
    ctx.moveTo(398,624);
    ctx.lineTo(460,624);
    ctx.arc(430, 644.5, 40, -0.54, 0.54, false);
    ctx.lineTo(398,666);
    ctx.arc(430, 644.5, 40, Math.PI-.54, Math.PI+.54, false);
    ctx.closePath();
}

// bg border
const background_border = function() {
    ctx.roundRect(20, 20, 460, 590, 10);
}