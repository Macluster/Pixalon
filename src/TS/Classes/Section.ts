class Section extends View {
    constructor(width: string, height: string, bgColor: string, content?: string) {
      super(width, height, bgColor, content);
      this.element.style.backgroundColor = bgColor;
    }
  }
  