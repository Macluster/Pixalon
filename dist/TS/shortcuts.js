"use strict";
var CopyPasteModule;
(function (CopyPasteModule) {
    let currentSelectedContainer = null;
    let copiedContent = null;
    // Function to set the currently selected container
    function selectContainer(containerId) {
        if (currentSelectedContainer) {
            currentSelectedContainer.classList.remove("selected");
        }
        currentSelectedContainer = document.getElementById(containerId);
        if (currentSelectedContainer) {
            currentSelectedContainer.classList.add("selected");
        }
        else {
            console.error("No element found with the given ID:", containerId);
        }
    }
    CopyPasteModule.selectContainer = selectContainer;
    // Function to copy the content of the selected container
    function copyContent() {
        if (currentSelectedContainer) {
            copiedContent = currentSelectedContainer.innerHTML;
            console.log("Content copied:", copiedContent);
            alert("Content copied!");
        }
        else {
            alert("No container selected to copy from.");
        }
    }
    CopyPasteModule.copyContent = copyContent;
    // Function to paste the content into the selected container
    function pasteContent() {
        if (currentSelectedContainer) {
            if (copiedContent) {
                currentSelectedContainer.innerHTML += copiedContent;
                alert("Content pasted!");
            }
            else {
                alert("No content to paste. Copy content first.");
            }
        }
        else {
            alert("Select a container to paste into.");
        }
    }
    CopyPasteModule.pasteContent = pasteContent;
})(CopyPasteModule || (CopyPasteModule = {}));
// Event listener for keyboard shortcuts
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "c") {
        CopyPasteModule.copyContent();
    }
    if (event.ctrlKey && event.key === "v") {
        CopyPasteModule.pasteContent();
    }
});
