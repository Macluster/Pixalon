"use strict";
class View {
    constructor(width, height, backgroundColor, content) {
        this.element = document.createElement('div');
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.backgroundColor = backgroundColor;
        this.element.textContent = content || '';
        this.element.classList.add("View")
        // Set styles for positioning and make div movable and resizable
        this.element.style.position = 'absolute';
        this.element.style.left = '0px';
        this.element.classList.add("movable");
        this.element.classList.add("resizable");
        this.element.style.boxSizing = "border-box";
        // Add the resizer elements (four corner resizers)
        this.addResizers();
        // Add Movable Property (same as your original code)
        this.makeMovable();
    }
    // Method to add resizers in the four corners
    addResizers() {
        const resizerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        resizerPositions.forEach((position) => {
            let resizer = document.createElement('div');
            if(this.element.classList.contains('resizer'))
            {
                    resizer=this.element.getElementsByClassName(position)
            }
            else
            {
               
                resizer.classList.add('resizer', position);
            }
            
           
            resizer.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Get the current mouse position
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = parseInt(document.defaultView.getComputedStyle(this.element).width, 10);
                const startHeight = parseInt(document.defaultView.getComputedStyle(this.element).height, 10);
                const startLeft = parseInt(this.element.style.left, 10);
                const startTop = parseInt(this.element.style.top, 10);
                const resize = (e) => {
                    if (position.includes('right')) {
                        this.element.style.width = startWidth + (e.clientX - startX) + "px";
                        //add width to prorety menu 
                        document.getElementById('width').value = startWidth + (e.clientX - startX);
                        // Update y,x-position in property box 
                        document.getElementById('y-position').value = this.element.getBoundingClientRect().top;
                    }
                    if (position.includes('left')) {
                        const widthChange = startX - e.clientX;
                        this.element.style.width = startWidth + widthChange + "px";
                        this.element.style.left = (startLeft - widthChange) + "px";
                        //add width to prorety menu 
                        document.getElementById('width').value = startWidth + widthChange;
                        // Update y,x-position in property box 
                        document.getElementById('x-position').value = this.element.getBoundingClientRect().left;
                        document.getElementById('y-position').value = this.element.getBoundingClientRect().top;
                    }
                    if (position.includes('bottom')) {
                        this.element.style.height = startHeight + (e.clientY - startY) + "px";
                        //add height to prorety menu 
                        document.getElementById('height').value = startHeight + (e.clientY - startY);

                        // Update y,x-position in property box 
                        document.getElementById('x-position').value = this.element.getBoundingClientRect().left;
                    }
                    if (position.includes('top')) {
                        const heightChange = startY - e.clientY;
                        this.element.style.height = startHeight + heightChange + "px";
                        this.element.style.top = (startTop - heightChange) + "px";
                        //add height to prorety menu 
                        document.getElementById('height').value = startHeight + heightChange;

                        // Update y,x-position in property box 
                        document.getElementById('x-position').value = this.element.getBoundingClientRect().left;
                        document.getElementById('y-position').value = this.element.getBoundingClientRect().top;
                    }
                };
                const stopResize = () => {
                    document.removeEventListener('mousemove', resize);
                    document.removeEventListener('mouseup', stopResize);
                };
                // Attach listeners to `mousemove` and `mouseup` events
                document.addEventListener('mousemove', resize);
                document.addEventListener('mouseup', stopResize);
            });
            // Append resizer to the element
            if(!this.element.classList.contains('resizer'))
            this.element.appendChild(resizer);
        });
    }
    // Method to make the element movable (same as your original code)
    makeMovable() {
        console.log("mouse is down"+this.element.classList.contains("Image"))

        this.element.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            previouslySelectedElement = currentSelectedContainer;
            currentSelectedContainer = this.element.id;
            this.element.style.border = "2px solid #4CC9FE";
            
            if(this.element.classList.contains("Section"))
                {
                  let prev=  document.getElementById(previouslySelectedElement).querySelectorAll(".sectionOption")[0]
                  prev.style.visibility="hidden"
                  let sectionOption=  this.element.querySelectorAll(".sectionOption")[0]
                  sectionOption.style.visibility="visible"
                }

            //updating hight and width in proparty box
            document.getElementById('height').value = this.element.style.height.split("p")[0];
            document.getElementById('width').value = this.element.style.width.split("p")[0];

            // Get the bounding rectangle of the frame element to get its position
            const rect = this.element.getBoundingClientRect();
            document.getElementById('x-position').value = rect.left; // Update x-position input
            document.getElementById('y-position').value = rect.top;  // Update y-position input

            // Update color in the property box
            const hex = rgbToHex(window.getComputedStyle(this.element).backgroundColor);
            document.getElementById('colorCodeDisplay').value = hex;
            document.getElementById('fillColorInput').value = hex;

            let reziersListOfCurrentObject = this.element.children; // Get only direct children
            Array.from(reziersListOfCurrentObject).forEach(child => {
                if (child.classList.contains("resizer")) {
                    child.style.backgroundColor = "#4CC9FE"; // Set the desired color
                }
            });
            if (previouslySelectedElement != currentSelectedContainer) {
                const prevSelectedElement = document.getElementById(previouslySelectedElement);
                if (prevSelectedElement) {
                    prevSelectedElement.style.border = "2px solid transparent";
                    let reziersListOfPreviousObject = prevSelectedElement.children; // Get only direct children
                    Array.from(reziersListOfPreviousObject).forEach(child => {
                        if (child.classList.contains("resizer")) {
                            child.style.backgroundColor = "transparent"; // Set the desired color
                        }
                    });
                }
            }
            e.stopPropagation();
            if (e.target.classList.contains('resizer'))
                return; // Ignore if clicking the resizer
            e.preventDefault();
            const parentRect = this.element.parentNode.getBoundingClientRect();
            const shiftX = e.clientX - this.element.getBoundingClientRect().left;
            const shiftY = e.clientY - this.element.getBoundingClientRect().top;
            const moveAt = (clientX, clientY) => {
                const scrollLeft = this.element.parentNode.scrollLeft;
                const scrollTop = this.element.parentNode.scrollTop;
                const newLeft = clientX - parentRect.left - shiftX + scrollLeft;
                const newTop = clientY - parentRect.top - shiftY + scrollTop;
                const maxLeft = parentRect.width - this.element.offsetWidth;
                const maxTop = parentRect.height - this.element.offsetHeight;
                this.element.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
                this.element.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";

                // Update y,x-position in property box 
                document.getElementById('x-position').value = this.element.getBoundingClientRect().left;
                document.getElementById('y-position').value = this.element.getBoundingClientRect().top;
            };
            const onMouseMove = (e) => {
                moveAt(e.clientX, e.clientY);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });
        this.element.ondragstart = () => false; // Prevent default dragging behavior
    }
    // Method to add the div to the page
    appendTo(parentSelector) {
        const parent = document.querySelector(parentSelector);
        if (parent) {
            parent.appendChild(this.element);
        }
        else {
            console.error(`Parent element '${parentSelector}' not found.`);
        }
    }
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