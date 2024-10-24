// Adding Page
const pages: Frame[] = [];
function addFrame(): void {
  const frame = new Frame("500px", "500px", "white", "");
  frame.element.id = "page1";
frame.element.style.display="flex"
frame.element.style.flexDirection="column"


  pages.push(frame);
  frame.appendTo(".work-space");
}

// Adding Table
const tableList: Table[] = [];
let tableId = 0;
function addTable(): void {
  const table = new Table("400px", "500px", "grey", "", 4, 5);
  table.element.id = "Table" + tableId++;
  tableList.push(table);
  table.appendTo("#" + currentSelectedContainer);
}

const sectionList: View[] = [];
let sectionId = 0;

function addSection(): void {
  // Create a new section
  let section = new Section("100%", "300px", "grey", "");

  // Position the new section after the previous one, if it exists
  if (sectionId > 0) {
    const prevSection = sectionList[sectionId - 1];
    const prevSectionTop = prevSection.element.offsetTop;
    const prevSectionHeight = prevSection.element.offsetHeight;

    // Calculate and set the top position for the new section
    section.element.style.top = (prevSectionTop + prevSectionHeight) + "px";
  }

  // Set an ID for the new section and add it to the list
  section.element.id = "section" + sectionId++;
  sectionList.push(section);

  // Append the new section to the container
  section.appendTo("#" + currentSelectedContainer);
}

// Adding TextBox
const textBoxList: TextBox[] = [];
let textBoxId = 0;
function addTextBox(): void {
  const textBox = new TextBox();
  textBox.element.id = "T" + textBoxId++;
  textBoxList.push(textBox);
  textBox.appendTo("#" + currentSelectedContainer);
}

// Adding Image
const imageList: Img[] = [];
let imageId = 0;
function selectImage(): void {
  const fileInput = document.getElementById("fileInput") as HTMLInputElement;

  if (!fileInput) {
    console.error("File input element not found.");
    return;
  }

  const imageElement = document.createElement("img");
  imageElement.style.height = "100px";
  imageElement.style.width = "100px";
  imageElement.style.backgroundColor = "green";

  fileInput.addEventListener("change", function (event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (!e.target?.result) return;

        // Create a new reusable div instance
        const  image = new Img((e.target.result as string));
     
        image.element.id = "I" + imageId++;

        // Append the div to the body
        image.appendTo("#" + currentSelectedContainer);
      };

      reader.readAsDataURL(file); // Read the image as a DataURL
    }
  });
  fileInput.click();
}


function onWorkspaceClicked(event:Event)
{

  event.stopPropagation()
  const ele=document.getElementById(currentSelectedContainer);
  ele!.style.border = "2px solid transparent";
  let currentSelectedDiv = ele!.children; // Get only direct children
            Array.from(currentSelectedDiv).forEach(child => {
                if (child.classList.contains("resizer")) {
                    (child as HTMLElement).style.backgroundColor = "transparent"; // Set the desired color
                   
                  }
            });
}

// Generate HTML from Page Content
function generate(): void {
  const ele = document.getElementById(currentSelectedContainer);
  if (!ele) return;
  
  const outputdiv = ele.cloneNode(true) as HTMLElement;

  // Find all input elements within the div
  const inputElements = outputdiv.querySelectorAll('input');

  // Loop through each input element
  inputElements.forEach(function (inputElement: HTMLInputElement) {
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
function downloadFile(text: string): void {
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
