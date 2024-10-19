class TextBox extends View {
    input: HTMLInputElement;
  
    constructor() {
      super('200px', '40px', 'transparent', '');
  
      this.input = document.createElement("input");
      this.input.type = "text";
  
      this.element.appendChild(this.input);
      this.element.style.display = "flex";
      this.element.style.boxSizing = "border-box";
  
      this.input.style.height = "100%";
      this.input.style.width = "100%";
      this.input.style.boxSizing = "border-box";
      this.input.style.margin = "0px";
  
      this.input.classList.add("inputStyle");
  
      this.input.addEventListener("mousedown", function (e: MouseEvent) {
        e.stopPropagation();
      });
    }
  }
  