"use strict";
function onBackgroundChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.backgroundColor = target.value;
    }
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
            const imageUrl = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.style.backgroundRepeat = "no-repeat";
                preview.style.backgroundSize = "cover";
                if (e.target?.result) {
                    preview.style.backgroundImage = `url('${e.target.result}')`;
                }
            };
            reader.readAsDataURL(file);
        }
    });
    fileInput.click();
}
function fontSizeChanged(event) {
    const target = event.target;
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.querySelectorAll('textarea')[0].style.fontSize = `${target.value}px`;
    }
}
function onFontFamilyChange(event) {
    const target = event.target;
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.querySelectorAll('textarea')[0].style.fontFamily = `${target.value}`;
    }
}
function onFontWeightChange(event) {
    const target = event.target;
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.querySelectorAll('textarea')[0].style.fontWeight = `${target.value}`;
    }
}
function onLineHeightChange(event) {
    const target = event.target;
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.querySelectorAll('textarea')[0].style.lineHeight = `${target.value}px`;
    }
}
function onLetterSpacingChange(event) {
    const target = event.target;
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.querySelectorAll('textarea')[0].style.letterSpacing = `${target.value}px`;
    }
}
function alignParagraph(alignValue, event) {
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
    document.getElementById("fileName").value=document.getElementById('title').value
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
        alert(`Exporting file: ${fileName} with size: ${size} and format: ${format}`);
        // Call the function that handles the actual file export logic
        exportFile(fileName, size, format);
    }
    else {
        //alert("Please fill in all fields.");
    }
    // Hide modal after export
    const exportModal = document.getElementById("exportModal");
    exportModal.style.display = "none";
});
// Function to handle the actual file export logic
function exportFile(fileName, size, format) {
    // Implement the actual export logic (e.g., downloading the file)
    console.log(`File ${fileName} of size ${size} and format ${format} is being exported.`);
}
