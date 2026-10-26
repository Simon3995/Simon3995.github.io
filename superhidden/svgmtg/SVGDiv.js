class SVGDiv extends SVGObject {
    constructor(svgElement, content, x, y, width, height) {
        super(svgElement, x, y);

        this.shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        this.shapeElement.setAttribute('width', width);
        this.shapeElement.setAttribute('height', height);

        this.divElement = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        this.divElement.innerHTML = content;
        this.shapeElement.appendChild(this.divElement);

        this.groupElement.appendChild(this.shapeElement);
    }
}