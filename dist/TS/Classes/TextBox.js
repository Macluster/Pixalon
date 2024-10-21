"use strict";
class TextBox extends View {
    constructor() {
        super('200px', '40px', 'transparent', '');
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "add a text";
        // Prevent focus on single click
        this.input.addEventListener("mousedown", function (e) {
            e.preventDefault();
        });
        // Allow focus only on double click
        this.input.addEventListener("dblclick", (e) => {
            this.input.focus(); // Focus on input when double-clicked
            e.stopPropagation(); // Prevent triggering parent events
        });
        this.element.appendChild(this.input);
        this.element.style.display = "flex";
        this.element.style.boxSizing = "border-box";
        this.input.style.height = "100%";
        this.input.style.width = "100%";
        this.input.style.boxSizing = "border-box";
        this.input.style.margin = "0px";
        this.input.classList.add("inputStyle");
        this.input.addEventListener("mousedown", function (e) {
            e.stopPropagation();
        });
    }
}
