// work in progress

class SVGMagicCard extends SVGObject {
    constructor(svgElement, x = 0, y = 0) {
        super(svgElement, x, y);
    }

    tap() {
        this.setRotation(90);
    }

    untap() {
        this.setRotation(0);
    }
}