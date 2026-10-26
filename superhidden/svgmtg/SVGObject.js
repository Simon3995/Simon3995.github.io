class SVGObject {
    constructor(svgElement, x = 0, y = 0) {
        this.svgElement = svgElement?.groupElement || svgElement;
        this.transform = { translate: { x:x, y:y }, rotate: 0 };
        this.groupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.svgElement.appendChild(this.groupElement);
        this.applyTransform();
    }

    move(x, y) {
        this.transform.translate.x += x;
        this.transform.translate.y += y;
        this.applyTransform();
    }

    setPosition(x, y) {
        this.transform.translate.x = x;
        this.transform.translate.y = y;
        this.applyTransform();
    }

    rotate(angle) {
        this.transform.rotate += angle;
        this.transform.rotate %= 360;
        this.applyTransform();
    }

    setRotation(angle) {
        this.transform.rotate = angle;
        this.transform.rotate %= 360;
        this.applyTransform();
    }

    delete() {
        if (this.groupElement && this.groupElement.parentNode) {
            this.groupElement.parentNode.removeChild(this.groupElement);
        }
    }

    applyTransform() {
        const { x, y } = this.transform.translate;
        const angle = this.transform.rotate;
        const transformAttr = `translate(${x}, ${y}) rotate(${angle})`;
        this.groupElement.setAttribute('transform', transformAttr);
    }
}