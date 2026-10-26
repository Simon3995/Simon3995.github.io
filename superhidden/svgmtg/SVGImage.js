class SVGImage extends SVGObject {
    constructor(svgElement, src, x = 0, y = 0, width = 50, height = 50) {
        super(svgElement, x, y);
        this.shapeElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this.shapeElement.setAttribute('href', src);
        this.shapeElement.setAttribute('width', width);
        this.shapeElement.setAttribute('height', height);
        this.shapeElement.setAttribute('preserveAspectRatio', 'none');
        this.loadImage(src);
        this.groupElement.appendChild(this.shapeElement);
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            if (!this.shapeElement.getAttribute('width')) {
                this.shapeElement.setAttribute('width, img.width')
            }
            if (!this.shapeElement.getAttribute('height')) {
                this.shapeElement.setAttribute('height', img.height);
            }
        }
    }

    setWidth(width) {
        this.shapeElement.setAttribute('width', width);
    }

    setHeight(height) {
        this.shapeElement.setAttribute('height', height);
    }

    setOpacity(opacity) {
        this.shapeElement.setAttribute('style', `opacity: ${opacity}`);
    }
}