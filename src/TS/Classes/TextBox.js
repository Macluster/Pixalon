"use strict";
class TextBox extends View {
    constructor() {
        super('200px', '40px', 'transparent', '');
        this.input = document.createElement("textarea");
        // this.input.type = "text";
        this.input.placeholder = "add a text";
        this.input.style.lineHeight = "auto";
        this.input.style.overflow = "hidden";
        this.input.style.resize = "none";
        // Prevent focus on single click
        this.element.classList.add("TextBox")
        this.mouseDownClick()
        this.doubleClick()
       
       
        this.element.appendChild(this.input);
        this.element.style.display = "flex";
        this.element.style.boxSizing = "border-box";
        this.input.style.height = "100%";
        this.input.style.width = "100%";
        this.input.style.boxSizing = "border-box";
        this.input.style.margin = "0px";
        this.input.classList.add("inputStyle");
        this.mouseOver()
       
       
    }


    mouseDownClick()
    {
        this.input.addEventListener("mousedown", function (e) {
            e.preventDefault();
        });
    }
    doubleClick()
    {
         // Allow focus only on double click
         this.input.addEventListener("dblclick", (e) => {
            this.input.focus(); // Focus on input when double-clicked
            e.stopPropagation(); // Prevent triggering parent events
        });
    }

    mouseOver()
    {
        this.input.addEventListener("mouseover", (e) => {
            this.input.style.cursor = "default";
            e.stopPropagation(); // Prevent triggering parent events
        });
    }

}
