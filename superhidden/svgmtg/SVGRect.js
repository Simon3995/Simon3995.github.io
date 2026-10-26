class SVGRect extends SVGObject {
    constructor(svgElement, x, y, width, height) {
        super(svgElement, x, y);
        this.shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.shapeElement.setAttribute('width', width);
        this.shapeElement.setAttribute('height', height);
        this.groupElement.appendChild(this.shapeElement);
    }

    setColor(color) {
        this.shapeElement.setAttribute('fill', color);
    }

    setCornerRadius(radius) {
        this.shapeElement.setAttribute('rx', radius);
        this.shapeElement.setAttribute('ry', radius);
    }
}