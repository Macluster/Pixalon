class Table extends View {
  constructor(width, height, bgcolor, content, cols, rows) {
    super(width, height, bgcolor, content);
    this.selectedCells = [];
    this.element.style.backgroundColor = "transparent";

    // Create and store a reference to the table
    this.table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
      const newRow = document.createElement("tr");

      for (let j = 0; j < cols; j++) {
        const newCell = document.createElement("td");
        newCell.contentEditable = "true";  
        newCell.addEventListener("click", (event) => this.cellSelection(newCell, event));
        newRow.appendChild(newCell);
      }

      this.table.appendChild(newRow);
    }

    // Style settings for the table
    this.table.style.fontSize = "14px";
    this.table.style.fontFamily = "Arial";
    this.table.style.textAlign = "left";
    
    this.element.appendChild(this.table);
    
    // Add a listener to the document for clicks outside the table and tableTools
    document.addEventListener("click", (event) => this.handleOutsideClick(event));

    // Add listeners to show tableTools
    document.getElementById("tableTools").addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click event from hiding tableTools
    });
    
    console.log(`Table created with ${rows} rows and ${cols} columns.`);
  }

  cellSelection(cell, event) {
    event.stopPropagation();
    document.getElementById('tableTools').style.visibility = "visible";

    if (event.shiftKey) {
      this.toggleCellSelection(cell);
    } else {
      this.clearAllSelections();
      this.toggleCellSelection(cell);
    }
    cell.focus();
  }

  handleOutsideClick(event) {
    const tableTools = document.getElementById("tableTools");

    // Check if the click is outside both the table and tableTools
    if (!this.table.contains(event.target) && !tableTools.contains(event.target)) {
      this.clearAllSelections();
      tableTools.style.visibility = "hidden"; // Hide tableTools when clicked outside
    }
  }

  toggleCellSelection(cell) {
    if (window.selectedCells.includes(cell)) {
      cell.classList.remove("selected");
      window.selectedCells = window.selectedCells.filter((selectedCell) => selectedCell !== cell);
    } else {
      cell.classList.add("selected");
      window.selectedCells.push(cell);
      console.log(window.selectedCells);
      
    }
  }

  clearAllSelections() {
    window.selectedCells.forEach((cell) => cell.classList.remove("selected"));
    window.selectedCells = [];
  }




}
