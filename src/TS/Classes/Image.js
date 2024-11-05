"use strict";
class Img extends View {
    constructor(src) {
        super('200px', '200px', 'grey', '');
        this.element.style.backgroundImage = `url('${src}')`;
        this.element.style.backgroundSize = "cover";
    }
}
