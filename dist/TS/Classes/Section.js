"use strict";
class Section extends View {
    constructor(width, height, bgColor, content) {
        super(width, height, bgColor, content);
        this.element.style.backgroundColor = bgColor;
    }
}
