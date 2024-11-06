"use strict";
class Table extends View {
  constructor(width, height, bgcolor, content, cols, rows) {
    super(width, height, bgcolor, content);
    this.selectedCells = [];
    // this.element.style.padding = "20px";
    this.element.style.backgroundColor = "transparent";
    this.element.classList.add("Table")
    const table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
      const newRow = document.createElement("tr");
      // newRow.className = "rowHeader";
      console.log(newRow);

      for (let j = 0; j < cols; j++) {
        const newCell = document.createElement("td");
        newCell.className = "cellselect";
        newCell.addEventListener("click", (event) => this.CellSelection(newCell, event));
        newCell.contentEditable ="true";  
        newRow.appendChild(newCell);
      }
      // table.contentEditable = "true";
      table.appendChild(newRow);
      
    }
    table.style.fontSize ="14px";
    table.style.font ="Arial";
    table.style.textAlignalign ="left";
    // this.element.contentEditable = "true";
    this.element.appendChild(table);
    console.log(rows);
    console.log(cols);
  }

  // Cell Selection
  CellSelection(cell, event) {
    event.stopPropagation();
    console.log(event.target.tagName);

    if (event.target.tagName === "TD") {
      // Check if Shift key is pressed
      if (event.shiftKey) {
        this.toggleCellSelection(event.target);
      } 
      else if(event.ctrlKey)
      {
        this.clearAllSelections();
      }
      else {
        // If Shift is not pressed, clear the selection and select only the clicked cell
        this.clearAllSelections();
        // event.target.contentEditable ="true";
        this.toggleCellSelection(event.target);
      }
    }
  }
  // Toggle cell selection (select/unselect)
  toggleCellSelection(cell) {
    console.log(cell);
    if (this.selectedCells.includes(cell)) {
      cell.classList.remove("selected");
      this.selectedCells = this.selectedCells.filter(
        (selectedCell) => selectedCell !== cell
      );
    } else {
      cell.focus();
      cell.classList.add("selected");
      this.selectedCells.push(cell);
      // updateColorInputs(cell);
    }
  }

  // Clear all selected cells
  clearAllSelections() {
    this.selectedCells.forEach((cell) => cell.classList.remove("selected"));
    this.selectedCells = [];
  }
}
