import uploadImageToFirebase from "../TS/Backend/upload.js";



"use strict";
function onBackgroundChanged(event) {
  const target = event.target;
  console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  console.log(view);
  if (view) {
    view.style.backgroundColor = target.value;
  }

   // Update color in the property box
   const hex = rgbToHex(window.getComputedStyle(view).backgroundColor);
   document.getElementById('colorCodeDisplay').value = hex;
   document.getElementById('fillColorInput').value = hex;
}


function onTextColorChanged(event)
{
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view.querySelectorAll('textarea')[0]) {
        view.querySelectorAll('textarea')[0].style.color = target.value;
        const hex = rgbToHex(window.getComputedStyle(view.querySelectorAll('textarea')[0]).color);
        document.getElementById('colorCodeDisplay').value = hex;
        document.getElementById('fillColorInput').value = hex;
    }

    if (view.querySelectorAll('table')[0]) {
      view.querySelectorAll('table')[0].style.color = target.value;
      const hex = rgbToHex(window.getComputedStyle(view.querySelectorAll('table')[0]).color);
      document.getElementById('colorCodeDisplay').value = hex;
      document.getElementById('fillColorInput').value = hex;
    }

   // Update color in the property box
  //   
}


function onCornerRadiusChanged(event) {
  const target = event.target;
  console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  console.log(view);
  if (view) {
    view.style.borderRadius = `${target.value}px`;
  }
}
function onHeightChanged(event) {
  const target = event.target;
  console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  console.log(view);
  if (view) {
    view.style.height = `${target.value}px`;
  }
}
function onWidthChanged(event) {
  const target = event.target;
  console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  console.log(view);
  if (view) {
    view.style.width = `${target.value}px`;
  }
}
function selectBackgroundImage() {
    const fileInput = document.getElementById("backgroundImage");
    const preview = document.getElementById(currentSelectedContainer);
    fileInput.addEventListener("change", async (event) => {
        const target = event.target;
        const file = target.files?.[0];
        if (file && preview) {

            var imageUrl= await uploadImageToFirebase(file);
           
  

            
                preview.style.backgroundRepeat = "no-repeat";
                preview.style.backgroundSize = "cover";
             
                preview.style.backgroundImage = `url('${imageUrl}')`;
                
          
       
        }
    });
    fileInput.click();
}
function fontSizeChanged(event) {
  const target = event.target;
  const view = document.getElementById(currentSelectedContainer);
  console.log(view)

  if (view.querySelectorAll("textarea")[0]) {
    console.log("ddddddddddddd")
    view.querySelectorAll("textarea")[0].style.fontSize = `${target.value}px`;
  }
 

  if (view.querySelectorAll("table")[0]) {
    view.querySelectorAll("table")[0].style.fontSize = `${target.value}px`;
  }
}
function onFontFamilyChange(event) {
  const target = event.target;
  const view = document.getElementById(currentSelectedContainer);
  console.log(view);
  if (view.querySelectorAll("textarea")[0]) {
    view.querySelectorAll("textarea")[0].style.fontFamily = `${target.value}`;
  }

  if (view.querySelectorAll("table")[0]) {
    view.querySelectorAll("table")[0].style.fontFamily = `${target.value}`;
  }
}
function onFontWeightChange(event) {
  const target = event.target;
  const view = document.getElementById(currentSelectedContainer);
  console.log(view);
  if (view.querySelectorAll("textarea")[0]) {
    view.querySelectorAll("textarea")[0].style.fontWeight = `${target.value}`;
  }

  if (view.querySelectorAll("table")[0]) {
    view.querySelectorAll("table")[0].style.fontWeight = `${target.value}`;
  }
}
function onLineHeightChange(event) {
  const target = event.target;
  const view = document.getElementById(currentSelectedContainer);
  console.log(view);
  if (view.querySelectorAll("textarea")[0]) {
    view.querySelectorAll("textarea")[0].style.lineHeight = `${target.value}px`;
  }

  if (view.querySelectorAll("table")[0]) {
    view.querySelectorAll("table")[0].style.lineHeight = `${target.value}px`;
  }
}
function onLetterSpacingChange(event) {
  const target = event.target;
  const view = document.getElementById(currentSelectedContainer);
  console.log(view.querySelectorAll("table")[0]);
  if (view.querySelectorAll("textarea")[0]) {
    view.querySelectorAll(
      "textarea"
    )[0].style.letterSpacing = `${target.value}px`;
  }

  if (view.querySelectorAll("table")[0]) {
    view.querySelectorAll("table")[0].style.letterSpacing = `${target.value}px`;
  }
}
function alignParagraph(event,alignValue) {
    const target = event.target;
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        if(view.querySelectorAll('textarea')[0])
         view.querySelectorAll('textarea')[0].style.textAlign = `${alignValue}`;
      }
        // else 
        // {
        //   view.querySelectorAll('table')[0].style.textAlign = `${alignValue}`;
        // }
      // console.log(view.getElementsByClassName('selected')[0]);
        
    
}

// Function to change the opacity
function onOpacityChanged(event)
{
  const target = event.target;
  console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  if (view) {
    view.style.opacity = `${target.value}%`;
  }
}
function onBorderColorChange(event)
{
  const target = event.target;
  const view = document.getElementById(currentSelectedContainer);
  if(view)
  {
    view.style.borderColor = target.value;
  }

  const hex = rgbToHex(window.getComputedStyle(view).borderColor);
   document.getElementById('borderColorCodeDisplay').value = hex;
   document.getElementById('borderColorInput').value = hex;
}

// Add click event listener to open the export modal
document.getElementById("export")?.addEventListener("click", function () {
  const exportModal = document.getElementById("exportModal");
  document.getElementById("fileName").value=document.getElementById('title').value

  exportModal.style.display = "block";
});
// Close the modal when the close button is clicked
document.querySelector(".close")?.addEventListener("click", function () {
  const exportModal = document.getElementById("exportModal");
  exportModal.style.display = "none";
});
// Perform export when the "Export Format" button is clicked
document.getElementById("exportFormat")?.addEventListener("click", function () {
  const fileNameInput = document.getElementById("fileName");
  const sizeInput = document.getElementById("size");
  const formatInput = document.getElementById("format");
  const fileName = fileNameInput.value;
  const size = sizeInput.value;
  const format = formatInput.value;
  // Implement your export logic based on the entered values
  if (fileName && size && format) {
    alert(
      `Exporting file: ${fileName} with size: ${size} and format: ${format}`
    );
    // Call the function that handles the actual file export logic
    exportFile(fileName, size, format);
  } else {
    //alert("Please fill in all fields.");
  }
  // Hide modal after export
  const exportModal = document.getElementById("exportModal");
  exportModal.style.display = "none";
});
// Function to handle the actual file export logic
function exportFile(fileName, size, format) {
  // Implement the actual export logic (e.g., downloading the file)
  console.log(
    `File ${fileName} of size ${size} and format ${format} is being exported.`
  );
}



function rgbToHex(rgb) {
    if (!rgb) return "#000000"; // Default if no color is set
    const result = rgb.match(/\d+/g);
    if (result) {
      return `#${(
        (1 << 24) +
        (Number(result[0]) << 16) +
        (Number(result[1]) << 8) +
        Number(result[2])
      )
        .toString(16)
        .slice(1)}`;
    }
    return "#ffffff"; // Return black if parsing fails
  }

// Table properties


function onCellColorChange(event)
{
  const target = event.target;
  // console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  // console.log(view);
  const cell = view.getElementsByClassName("selected")[0];
  console.log(cell);
  
  if(cell)
    cell.style.backgroundColor = target.value;

   // Update color in the property box
   const hex = rgbToHex(window.getComputedStyle(view.getElementsByClassName('selected')[0]).backgroundColor);
   document.getElementById('cellColor').value = hex;
  //  document.getElementById('fillColorInput').value = hex;
}

function onCellBrdColorChange(event)
{
  const target = event.target;
  // console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  // console.log(view);
  const cell = view.getElementsByClassName("selected")[0];
  console.log(cell);
  
  if(cell)
    cell.style.borderColor = target.value;

   // Update color in the property box
   const hex = rgbToHex(window.getComputedStyle(view.getElementsByClassName('selected')[0]).borderColor);
   document.getElementById('borderColor').value = hex;
  //  document.getElementById('fillColorInput').value = hex;
}

function onCellFontColorChange(event)
{
  const target = event.target;
  // console.log(target.value);
  const view = document.getElementById(currentSelectedContainer);
  // console.log(view);
  const cell = view.getElementsByClassName("selected")[0];
  console.log(cell);
  
  if(cell)
    cell.style.color = target.value;

   // Update color in the property box
   const hex = rgbToHex(window.getComputedStyle(view.getElementsByClassName('selected')[0]).color);
   document.getElementById('fontColor').value = hex;
}


function mergeCellsHorizontally() {
  if (!isSameRow()) {
    alert("Cells must be in the same row to merge horizontally!");
    return;
  }
  if (window.selectedCells.length < 2) {
    alert("Select at least two cells to merge!");
    return;
  }

  const colspanValue = window.selectedCells.length;
  console.log(colspanValue);
  
  const firstCell = window.selectedCells[0];
  const cellWidth = firstCell.offsetWidth;
  console.log(cellWidth);
  
  // const totalWidth = window.selectedCells.reduce((sum,cell) =>{
  //   console.log(cell.offsetwidth);
  //   return sum + cell.offsetwidth;
    
  // },0);

  // console.log(totalWidth);
  
  firstCell.setAttribute("colspan", colspanValue);
  
  firstCell.style.width =`${(cellWidth+(25*colspanValue))/(colspanValue)}%`;

  // Remove additional cells
  window.selectedCells.slice(1).forEach((cell) => cell.remove());
  // clearAllSelections(); // Clear selection visuals
}

// Merge selected cells vertically
function mergeCellsVertically() {
  // if (!isSameColumn()) {
  //   alert("Cells must be in the same column to merge vertically!");
  //   return;
  // }
  if (window.selectedCells.length < 2) {
    alert("Select at least two cells to merge vertically!");
    return;
  }

  const rowspanValue = window.selectedCells.length;
  window.selectedCells[0].setAttribute("rowspan", rowspanValue);

  // Remove additional cells
  window.selectedCells.slice(1).forEach((cell) => cell.remove());
  clearAllSelections();
}

// Check if selected cells are in the same row
function isSameRow() {
  const firstRow = window.selectedCells[0].parentElement;
  return window.selectedCells.every((cell) => cell.parentElement === firstRow);
}

// Check if selected cells are in the same column
function isSameColumn() {
  const colIndex = Array.from(window.selectedCells[0].parentElement.children).indexOf(window.selectedCells[0]);
  return window.selectedCells.every((cell) => {
    return Array.from(cell.parentElement.children).indexOf(cell) === colIndex;
  });
}









  document.addEventListener("DOMContentLoaded", function () {
    // Event listeners for position-related inputs
    document.getElementById("backgroundColorChanged").addEventListener("change", onBackgroundChanged);
    document.getElementById("cornerRadiusInput").addEventListener("change", onCornerRadiusChanged);
    document.getElementById("textColorInput").addEventListener("change",onTextColorChanged);
    document.getElementById("alignTopImg").addEventListener("click",alignParagraph('align-top'));
    document.getElementById("alignMiddle").addEventListener("click",alignParagraph('align-middle'));
    document.getElementById("alignBottom").addEventListener("click",(event)=>alignParagraph(event,'align-bottom'));
    document.getElementById("align-left").addEventListener("click",(event)=>alignParagraph(event,'left'));
    document.getElementById("align-center").addEventListener("click",(event)=>alignParagraph(event,'center'));
    document.getElementById("align-right").addEventListener("click",(event)=>alignParagraph(event,'right'));
    document.getElementById("letter-spacing-input").addEventListener("change",onLetterSpacingChange);
    document.getElementById("line-height-input").addEventListener("change",onLineHeightChange);
    document.getElementById("font-size-input").addEventListener("change",fontSizeChanged);
    document.getElementById("font-weight-changed").addEventListener("change",onFontWeightChange);
    document.getElementById("font-family-input").addEventListener("change",onFontFamilyChange);
    document.getElementById("height").addEventListener("change",onHeightChanged);
    document.getElementById("width").addEventListener("change",onWidthChanged);
    // document.getElementById("borderColorInput").addEventListener("change",onBorderColorChange);
    
    document.getElementById("opacityInput").addEventListener("change",onOpacityChanged);
    document.getElementById("cellColor").addEventListener("change",onCellColorChange);
    document.getElementById("borderColor").addEventListener("change",onCellBrdColorChange);
    document.getElementById("fontColor").addEventListener("change",onCellFontColorChange);
    document.getElementById("tableMergeVertical").addEventListener("click",mergeCellsVertically);
    document.getElementById("tableMergeHorizontal").addEventListener("click",mergeCellsHorizontally);


    document.getElementById("background-image-picker").addEventListener("click",selectBackgroundImage);


    
   

    

    
});
