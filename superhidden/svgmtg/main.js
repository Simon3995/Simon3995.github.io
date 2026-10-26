document.addEventListener("DOMContentLoaded", () => {
    const svgCanvas = document.getElementById("canvas");
    
    const mtgCard = new SVGMagicCreatureCard(svgCanvas, 0, 0);
    mtgCard.rotate(30);
    // mtgCard.tap();
});