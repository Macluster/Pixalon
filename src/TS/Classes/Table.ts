class Table extends View {
    constructor(width: string, height: string, bgcolor: string, content: string, cols: number, rows: number) {
      super(width, height, bgcolor, content);
  
      this.element.style.padding = "20px";
  
      // Generate table headers with inputs for each column
      let headings = ``;
      for (let i = 0; i < cols; i++) {
        headings += `<th><input style="width:100%; padding:5px; box-sizing: border-box; border-radius: 4px; border: 1px solid #ccc;" placeholder="Heading ${i + 1}"/></th>`;
      }
  
      // Generate table rows with dynamic content (for demo, filled with sample data)
      let rowsContent = ``;
      for (let r = 0; r < rows; r++) {
        rowsContent += `<tr>`;
        for (let c = 0; c < cols; c++) {
          rowsContent += `<td style="padding:10px; text-align:center; border: 1px solid #ddd;">Data ${r + 1}-${c + 1}</td>`;
        }
        rowsContent += `</tr>`;
      }
  
      this.element.innerHTML = `
        <table style="width:100%; border-collapse: collapse; background-color:white; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color:#f8f9fa; border-bottom: 2px solid #ddd;">
              ${headings}
            </tr>
          </thead>
          <tbody>
            ${rowsContent}
          </tbody>
        </table>
      `;
    }
  }
  