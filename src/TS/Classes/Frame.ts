class Frame extends View {
  constructor(height: string, width: string, bgColor: string, content?: string) {
    super(height, width, bgColor, content);
    this.element.style.backgroundColor = bgColor;
  }
}
