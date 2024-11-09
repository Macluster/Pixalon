import addData from "./Backend/SaveFile.js";

"use strict";

let clipboard = ""; // Clipboard to store the copied HTML
let undoStack = []; // Stack for undo actions
let redoStack = []; // Stack for redo actions

// Function to copy an element's HTML to the clipboard
function copyElementToClipboard() {
    const currentElement = document.getElementById(currentSelectedContainer);
    if (currentElement) {
        clipboard = currentElement.outerHTML;
        console.log("Element copied to clipboard:", clipboard);
    } else {
        console.error("No element selected for copying or invalid ID:", currentSelectedContainer);
    }
}

// Function to paste the content of the clipboard into the workspace
function pasteElementToWorkspace() {
    const workspace = document.getElementById("page1");
    if (workspace && clipboard) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(clipboard, "text/html");
            const ele = doc.body.firstChild;

            if (!ele) {
                console.error("Failed to parse clipboard HTML. Clipboard might contain invalid HTML:", clipboard);
                return;
            }

            // Generate a unique ID for the new element
            ele.id = `pasted-${Date.now()}`;
            ele.style.position = "absolute";
            ele.style.left = "15px";
            ele.style.top = "15px";

            workspace.appendChild(ele);

            // Push to undo stack and clear redo stack
            undoStack.push({ action: 'add'});
            redoStack.length = 0;

            // Apply event listeners
            makeElementDraggable(ele);
            resizeOfCopyPasteElement(ele);
            clickTextBox(ele);
            doubleClickTextBox(ele);

            // Update the selected container
            currentSelectedContainer = ele.id;

            console.log("Element pasted to workspace:", ele);
        } catch (error) {
            console.error("Error parsing clipboard content:", error, clipboard);
        }
    } else {
        console.error("Workspace not found or clipboard is empty.");
    }
}


// Function to make the element draggable
function makeElementDraggable(ele) {
    ele.addEventListener("mousedown", (e) => {
        // e.preventDefault();
        e.stopPropagation();
        previouslySelectedElement = currentSelectedContainer;
        currentSelectedContainer = ele.id;
        ele.style.border = "2px solid #4CC9FE";
        
        Array.from(ele.children).forEach(child => {
            if (child.classList.contains("resizer")) {
                child.style.backgroundColor = "#4CC9FE";
            }
        });

        if (previouslySelectedElement && previouslySelectedElement !== currentSelectedContainer) {
            const prevSelectedElement = document.getElementById(previouslySelectedElement);
            if (prevSelectedElement) {
                prevSelectedElement.style.border = "2px solid transparent";
                Array.from(prevSelectedElement.children).forEach(child => {
                    if (child.classList.contains("resizer")) {
                        child.style.backgroundColor = "transparent";
                    }
                });
            }
        }

        if (e.target.classList.contains('resizer'))
            return;

        const parentRect = ele.parentNode.getBoundingClientRect();
        const shiftX = e.clientX - ele.getBoundingClientRect().left;
        const shiftY = e.clientY - ele.getBoundingClientRect().top;

        const moveAt = (clientX, clientY) => {
            const newLeft = Math.max(0, Math.min(clientX - parentRect.left - shiftX, parentRect.width - ele.offsetWidth));
            const newTop = Math.max(0, Math.min(clientY - parentRect.top - shiftY, parentRect.height - ele.offsetHeight));
            ele.style.left = `${newLeft}px`;
            ele.style.top = `${newTop}px`;
        };

        const onMouseMove = (e) => moveAt(e.clientX, e.clientY);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove), { once: true });
    });
    ele.ondragstart = () => false;
}

// Resize function for copied/pasted elements
function resizeOfCopyPasteElement(ele) {
    const resizerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    resizerPositions.forEach((position) => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer', position);
        resizer.addEventListener('mousedown', (e) => {
            // e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(document.defaultView.getComputedStyle(ele).width, 10);
            const startHeight = parseInt(document.defaultView.getComputedStyle(ele).height, 10);
            const startLeft = parseInt(ele.style.left, 10);
            const startTop = parseInt(ele.style.top, 10);

            const resize = (e) => {
                if (position.includes('right')) {
                    ele.style.width = startWidth + (e.clientX - startX) + "px";
                }
                if (position.includes('left')) {
                    const widthChange = startX - e.clientX;
                    ele.style.width = startWidth + widthChange + "px";
                    ele.style.left = (startLeft - widthChange) + "px";
                }
                if (position.includes('bottom')) {
                    ele.style.height = startHeight + (e.clientY - startY) + "px";
                }
                if (position.includes('top')) {
                    const heightChange = startY - e.clientY;
                    ele.style.height = startHeight + heightChange + "px";
                    ele.style.top = (startTop - heightChange) + "px";
                }
            };

            const stopResize = () => {
                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);
            };
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });
        ele.appendChild(resizer);
    });
}

// Function to handle copy, paste, undo, redo, and delete via keyboard shortcuts
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case "c":
                copyElementToClipboard();
                break;
            case "v":
                pasteElementToWorkspace();
                break;
            case "s":
                addData(true);
                break;
        }
    }
});






// Export everything as a single object



