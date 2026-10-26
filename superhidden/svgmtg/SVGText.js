class SVGText extends SVGObject {
    constructor(svgElement, text, x, y, fontSize = 16, maxWidth = null) {
        super(svgElement, x, y);
        this.textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.textElement.setAttribute('font-size', fontSize);
        this.textElement.textContent = text;
        this.groupElement.appendChild(this.textElement);

        // ensure maximum text width, if specified
        if (maxWidth !== null) {
            const measured = this.textElement.getComputedTextLength();
            if (measured > maxWidth) {
                this.textElement.setAttribute('textLength', maxWidth);
                this.textElement.setAttribute('lengthAdjust', 'spacingAndGlyphs');
            }
        }
    }

    setColor(color) {
        this.textElement.setAttribute('fill', color);
    }
}