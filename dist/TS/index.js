"use strict";
// Adding Page
const pages = [];
function addFrame() {
    const frame = new Frame("500px", "500px", "white", "");
    frame.element.id = "page1";
    pages.push(frame);
    frame.appendTo(".work-space");
}
// Adding Table
const tableList = [];
let tableId = 0;
function addTable() {
    const table = new Table("400px", "500px", "grey", "", 4, 5);
    table.element.id = "Table" + tableId++;
    tableList.push(table);
    table.appendTo("#" + currentSelectedContainer);
}
// Adding Container
const containerList = [];
let viewId = 0;
function addContainer() {
    const view = new View("200px", "200px", "grey", "");
    view.element.id = "v" + viewId++;
    containerList.push(view);
    view.appendTo("#" + currentSelectedContainer);
}
// Adding TextBox
const textBoxList = [];
let textBoxId = 0;
function addTextBox() {
    const textBox = new TextBox();
    textBox.element.id = "T" + textBoxId++;
    textBoxList.push(textBox);
    textBox.appendTo("#" + currentSelectedContainer);
}
// Adding Image
const imageList = [];
let imageId = 0;
function selectImage() {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput) {
        console.error("File input element not found.");
        return;
    }
    const imageElement = document.createElement("img");
    imageElement.style.height = "100px";
    imageElement.style.width = "100px";
    imageElement.style.backgroundColor = "green";
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (!e.target?.result)
                    return;
                // Create a new reusable div instance
                const image = new Img(e.target.result);
                image.element.id = "I" + imageId++;
                // Append the div to the body
                image.appendTo("#" + currentSelectedContainer);
            };
            reader.readAsDataURL(file); // Read the image as a DataURL
        }
    });
    fileInput.click();
}
// Generate HTML from Page Content
function generate() {
    const ele = document.getElementById("page1");
    if (!ele)
        return;
    const outputdiv = ele.cloneNode(true);
    // Find all input elements within the div
    const inputElements = outputdiv.querySelectorAll('input');
    // Loop through each input element
    inputElements.forEach(function (inputElement) {
        const inputValue = inputElement.value;
        const inputStyle = inputElement.getAttribute('style'); // Get inline styles
        // Create a new h2 element
        const h2Element = document.createElement('h2');
        h2Element.textContent = inputValue; // Set the content of the h2 to the input value
        if (inputStyle) {
            h2Element.setAttribute('style', inputStyle); // Apply the same styles if they exist
        }
        // Replace the input element with the new h2 element
        inputElement.parentNode?.replaceChild(h2Element, inputElement);
    });
    // Get the outer HTML of the modified div as a string
    const modifiedDivHtml = outputdiv.outerHTML;
    console.log(modifiedDivHtml); // This logs the entire modified div as a string
    downloadFile(modifiedDivHtml);
}
// Download File Function
function downloadFile(text) {
    // Create a Blob with the text content
    const blob = new Blob([text], { type: 'text/plain' });
    // Create an anchor element
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'myfile.html';
    // Programmatically click the anchor to trigger the download
    a.click();
    // Clean up by revoking the Object URL
    URL.revokeObjectURL(a.href);
}
