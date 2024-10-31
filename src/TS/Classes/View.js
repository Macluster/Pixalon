"use strict";
class View {
    constructor(width, height, backgroundColor, content) {
        this.element = document.createElement('div');
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.backgroundColor = backgroundColor;
        this.element.textContent = content || '';
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
            const resizer = document.createElement('div');
            resizer.classList.add('resizer', position);
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
                    }
                    if (position.includes('left')) {
                        const widthChange = startX - e.clientX;
                        this.element.style.width = startWidth + widthChange + "px";
                        this.element.style.left = (startLeft - widthChange) + "px";
                    }
                    if (position.includes('bottom')) {
                        this.element.style.height = startHeight + (e.clientY - startY) + "px";
                    }
                    if (position.includes('top')) {
                        const heightChange = startY - e.clientY;
                        this.element.style.height = startHeight + heightChange + "px";
                        this.element.style.top = (startTop - heightChange) + "px";
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
            this.element.appendChild(resizer);
        });
    }
    // Method to make the element movable (same as your original code)
    makeMovable() {
        this.element.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            previouslySelectedElement = currentSelectedContainer;
            currentSelectedContainer = this.element.id;
            this.element.style.border = "2px solid #4CC9FE";
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
