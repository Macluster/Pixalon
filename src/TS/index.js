import uploadImageToFirebase from "../TS/Backend/upload.js";
import { addLayerItem } from "./Classes/layers.js";
import html2canvas from 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm';

// Adding Page
const pages = [];
function addFrame() {
    if(sectionList.length == 0)
    {
        alert("Add Section to Continue");
    }

    else{
    const frame = new Frame("500px", "500px", "white", "");
    frame.element.id = "page1";
    frame.element.style.display = "flex";
    frame.element.style.flexDirection = "column";
   
    pages.push(frame);
    frame.appendTo(".work-space");

    // Add layer for the frame
    addLayerItem("Frame", frame.element.id);

    // updating hight and width in property box
    document.getElementById('height').value = 500;
    document.getElementById('width').value = 500;

    // Get the bounding rectangle of the frame element to get its position
    const rect = frame.element.getBoundingClientRect();
    document.getElementById('x-position').value = rect.left; // Update x-position input
    document.getElementById('y-position').value = rect.top;  // Update y-position input

    //color setting in property box
    const hex = rgbToHex(window.getComputedStyle(frame.element).backgroundColor)
    document.getElementById('colorCodeDisplay').value = hex;
    document.getElementById('fillColorInput').value = hex;
    }
}
document.getElementById("frameBtn")?.addEventListener("click", addFrame);

// Adding Table
const tableList = [];
let tableId = 0;
function addTable() {
    if(sectionList.length == 0)
        {
            alert("Add Section to Continue");
        }

    else{
    document.getElementById("tablePop").style.visibility ="hidden";
    const row = document.getElementsByClassName("rows")[0].value;
    const column = document.getElementsByClassName("columns")[0].value;
    console.log(row);

    const table = new Table("auto", "auto", "grey", "", column, row);
    table.element.id = "Table" + tableId++;
    tableList.push(table);
    table.appendTo("#" + currentSelectedContainer);

    // Add layer for the table
    addLayerItem("table", table.element.id);
    }
}

function tablePopUp() {
    document.getElementById("tablePop").style.visibility = "visible";
}

function closePopTable() {
    document.getElementById("tablePop").style.visibility = "hidden";

}
function checkTable()
{
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    
    if( view.querySelectorAll("table")[0])
        document.getElementById("tableTools").style.visibility="visible";
    else
    document.getElementById("tableTools").style.visibility="hidden";
}
document.getElementById("currentSelectedContainer")?.addEventListener("click",checkTable);
document.getElementById("tableBtn")?.addEventListener("click", tablePopUp);
document.getElementById("closeTab")?.addEventListener("click", closePopTable);
document.getElementById("createTableButton")?.addEventListener("click",addTable);

// Adding Section
const sectionList = [];

function addSection() {

    console.log(sectionArraylist);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if(view == null ){
        alert("Select frame before adding section");
    }

    else{
    
    // Create a new section
    let section = new Section(("section" + (sectionArraylist.length)),"100%", "300px", "grey", "");
    // Position the new section after the previous one, if it exists
    if (sectionArraylist.length > 0) {
        const prevSection = sectionArraylist[sectionArraylist.length-1];
        const prevSectionTop = prevSection.element.offsetTop;
        const prevSectionHeight = prevSection.element.offsetHeight;
        // Calculate and set the top position for the new section
        section.element.style.top = (prevSectionTop + prevSectionHeight) + "px";
    }
    
    // Set an ID for the new section and add it to the list
   // section.element.id = "section" + sectionId++;
   // sectionList.push(section);
    sectionArraylist.push(section)
    // Append the new section to the container
    section.appendTo("#" + "page1");

    // Add layer for the section
    addLayerItem("Section", section.element.id);
}
}
document.getElementById("sectionBtn")?.addEventListener("click", addSection);


// Adding TextBox
const textBoxList = [];
let textBoxId = 0;
function addTextBox() {
    if(sectionList.length == 0)
        {
            alert("Add Section to Continue");
        }
    else{
    const textBox = new TextBox();
    textBox.element.id = "T" + textBoxId++;
    textBoxList.push(textBox);
    textBox.appendTo("#" + currentSelectedContainer);

    // Add layer for the textbox
    addLayerItem("text", textBox.element.id);
    }
}
document.getElementById("textboxBtn").addEventListener("click", addTextBox);



// Adding Image
const imageList = [];
let imageId = 0;
function selectImage() {

    if(sectionList.length == 0)
        {
            alert("Add Section to Continue");
        }
    
    else{
    const fileInput = document.getElementById("fileInput");
    if (!fileInput) {
        console.error("File input element not found.");
        return;
    }
    // Trigger the file input change event to select a file
    fileInput.addEventListener("change", async function (event) {
        const file = event.target.files?.[0];
        if (file) {
            var imageUrl = await uploadImageToFirebase(file);
            console.log("image link " + imageUrl)

            const image = new Img(imageUrl);

            image.element.id = "I" + imageId++;
            console.log(image.element)

            // Append the div to the body
            image.appendTo("#" + currentSelectedContainer);

            // Add layer for the image
            addLayerItem("Image", image.element.id);
        // Append the div to the body
        console.log("current selected containr ="+currentSelectedContainer)
          image.appendTo("#" + currentSelectedContainer);
        }
    });
    fileInput.click(); // Programmatically trigger the file selection dialog
}
}
document.getElementById("imageBtn")?.addEventListener("click", selectImage);
function onWorkspaceClicked(event) {
    event.stopPropagation();
     document.getElementById('work-space').querySelectorAll("*").forEach((e)=>{
        if(e.style.border == "2px solid rgb(76, 201, 254)")
            e.style.border = "2px solid transparent";
        let currentSelectedDiv = e.children; // Get only direct children
        Array.from(currentSelectedDiv).forEach(child => {
            if (child.classList.contains("resizer")) {
                child.style.backgroundColor = "transparent"; // Set the desired color
            }
        });
     })

    const ele = document.getElementById(currentSelectedContainer);
   
}
document.getElementById("work-space")?.addEventListener("mousedown", onWorkspaceClicked);
// Get references to the select and button elements
const mySelect = document.getElementById("format");
const myButton = document.getElementById("exportFormat");
// Add an event listener to the button
myButton.addEventListener("click", () => {
    const selectedOption = mySelect.options[mySelect.selectedIndex];
    // Perform actions based on the selected option
    switch (selectedOption.value) {
        case "html":
            {
                const ele = document.getElementById("page1");
                if (!ele)
                    return;
                const outputdiv = ele.cloneNode(true);
                // Find all input elements within the div
                const inputElements = outputdiv.querySelectorAll('textarea');
                // Loop through each input element
                inputElements.forEach(function (inputElement) {
                    const inputValue = inputElement.value;
                    const inputStyle = inputElement.getAttribute('style'); // Get inline styles
                    // Create a new h2 element
                    const h2Element = document.createElement('h5');
                    h2Element.textContent = inputValue; // Set the content of the h2 to the input value
                    if (inputStyle) {
                        h2Element.setAttribute('style', inputStyle); // Apply the same styles if they exist
                    }
                    h2Element.style.fontFamily="Helvetica, sans-serif"
                    // Replace the input element with the new h2 element
                    inputElement.parentNode?.replaceChild(h2Element, inputElement);
                });
                // Get the outer HTML of the modified div as a string
                const modifiedDivHtml = outputdiv.outerHTML;
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
            break;

        case "png":
            // Get the div element by ID and ensure it's not null
            const captureElement = document.getElementById("page1");
            console.log(captureElement);
            
            if (captureElement) {
                // Use html2canvas to capture the div as a canvas
                html2canvas(captureElement).then((canvas) => {
                    // Create a link element to trigger the download
                    const link = document.createElement('a');
                    link.download = 'div_image.png';
                    // Convert the canvas to a PNG data URL and set it as the href for the link
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                }).catch((error) => {
                    console.error("An error occurred while capturing the div:", error);
                });
            }
            else {
                console.error("Capture element not found.");
            }
            break;

        case "jpeg":
            const capturejpeg = document.getElementById("page1");
            if (capturejpeg) {
                // Use html2canvas to capture the div as a canvas
                html2canvas(capturejpeg).then((canvas) => {
                    // Create a link element to trigger the download
                    const link = document.createElement('a');
                    link.download = 'div_image.jpeg';
                    // Convert the canvas to a PNG data URL and set it as the href for the link
                    link.href = canvas.toDataURL("image/jpeg", 0.8);
                    link.click();
                }).catch((error) => {
                    console.error("An error occurred while capturing the div:", error);
                });
            }
            else {
                console.error("Capture element not found.");
            }
            break;
            
        case "pdf":
            // Get the div element by ID and ensure it's not null
            const capturepdf = document.getElementById("page1");
            if (capturepdf) {
                // // Use html2canvas to capture the div as a canvas
                // html2canvas(capturepdf).then((canvas: HTMLCanvasElement) => {
                //   // Get the canvas as an image (JPEG format)
                //   const imgData = canvas.toDataURL("image/jpeg", 1.0);
                //   // Create a new jsPDF instance (use 'p' for portrait mode, 'mm' for millimeters, and 'a4' for paper size)
                //   const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
                //   // Calculate the width and height of the PDF page
                //   const pdfWidth = pdf.internal.pageSize.getWidth();
                //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                //   // Add the image to the PDF, adjusting the size to fit the page
                //   pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                //   // Save the PDF with a filename
                //   pdf.save('div_content.pdf');
                // }).catch((error: Error) => {
                //   console.error("An error occurred while capturing the div:", error);
                // });
            }
            else {
                console.error("Capture element not found.");
            }
            break;
        default:
            console.log("No valid option selected");
    }
});

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