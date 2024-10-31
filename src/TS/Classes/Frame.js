"use strict";
class Frame extends View {
    constructor(height, width, bgColor, content) {
        super(height, width, bgColor, content);
        this.element.style.backgroundColor = bgColor;
    }
}
