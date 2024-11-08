import {uploadImageToFirebase} from "../TS/Backend/upload.js";



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
  console.log(view.querySelectorAll("textarea")[0]);
  if (view.querySelectorAll("textarea")[0]) {
    view.querySelectorAll("textarea")[0].style.fontSize = `${target.value}px`;
  }
  console.log(view.querySelectorAll("table")[0]);

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
        view.querySelectorAll('textarea')[0].style.textAlign = `${alignValue}`;
    }
}
// Add click event listener to open the export modal
document.getElementById("export")?.addEventListener("click", function () {
  const exportModal = document.getElementById("exportModal");
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
    

   




    document.getElementById("background-image-picker").addEventListener("click",selectBackgroundImage);


    
   

    

    
});
