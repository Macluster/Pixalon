"use strict";
class Frame extends View {
    constructor(width, height, bgColor, content) {
        super(width, height, bgColor, content);
        this.element.style.backgroundColor = bgColor;
        this.element.classList.add("Frame")
    }
}
