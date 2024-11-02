import addData from "./Backend/SaveFile.js";


"use strict";

let clipboard = ""; // Initialize clipboard as an empty string
const undoStack = []; // Stack for undo actions
const redoStack = []; // Stack for redo actions

// Copy function that copies the selected container's HTML to the clipboard
function copyElementToClipboard() {
    const currentElement = document.getElementById(currentSelectedContainer);
    if (currentElement) {
        clipboard = currentElement.outerHTML; // Store the HTML of the element in the clipboard
        console.log("Element copied to clipboard:", clipboard);
    } else {
        console.error("Element not found:", currentSelectedContainer);
    }
}

// Paste function that pastes the content of the clipboard into the workspace
function pasteElementToWorkspace() {
    const workspace = document.getElementById("page1");
    if (workspace && clipboard) {
        // Parse the clipboard HTML and create a new element
        const parser = new DOMParser();
        const doc = parser.parseFromString(clipboard, "text/html");
        const ele = doc.body.firstChild;

        if (!ele) {
            console.error("Parsed element is null or invalid.");
            return;
        }

        // Generate a unique ID for the new element
        // ele.id = `pasted-${Date.now()}`; // Ensure the ID is unique
        ele.style.position = "absolute";
        ele.style.left = "10px";
        ele.style.top = "10px";

        workspace.appendChild(ele);

        // Push the newly added element to the undo stack
        undoStack.push(ele.outerHTML); // Save outerHTML for undo
        // Clear the redo stack when a new action is made
        redoStack.length = 0;

        // Reapply the necessary event listeners and styling
        makeElementDraggable(ele);
        resizeOfCopyPasteElement(ele);
        clickTextBox(ele);
        doubleClickTextBox(ele);

        // Update the selected container to the newly pasted element
        currentSelectedContainer = ele.id;
    } else {
        console.error("Workspace not found or clipboard is empty.");
    }
}
    function clickTextBox(ele) {
        ele.querySelectorAll('textarea')[0].addEventListener("mousedown", function (e) {
            e.preventDefault();
        });
    }
    function doubleClickTextBox(ele) {
        // Allow focus only on double click
        ele.querySelectorAll('textarea')[0].addEventListener("dblclick", (e) => {
            ele.querySelectorAll('textarea')[0].focus(); // Focus on input when double-clicked
            e.stopPropagation(); // Prevent triggering parent events
        });
        ele.querySelectorAll('textarea')[0].addEventListener("mousedown", function (e) {
            e.preventDefault();
        });
        ele.querySelectorAll('textarea')[0].addEventListener("mouseover", (e) => {
            ele.querySelectorAll('textarea')[0].style.cursor = "default";
            e.stopPropagation(); // Prevent triggering parent events
        });
    }
    function resizeOfCopyPasteElement(ele) {
        const resizerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        resizerPositions.forEach((position) => {
            const resizer = document.createElement('div');
            resizer.classList.add('resizer', position);
            resizer.addEventListener('mousedown', (e) => {
                e.preventDefault();
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
    function makeElementDraggable(ele) {
        ele.addEventListener("mousedown", (e) => {
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
            e.preventDefault();
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
    

    function undo() {
        const workspace = document.getElementById("page1");
        if (workspace && workspace.lastChild) {
            const lastElement = workspace.lastChild;
    
            // Push the last element's outerHTML to the redo stack
            redoStack.push(lastElement.outerHTML);
    
            // Remove the element from the DOM
            workspace.removeChild(lastElement);
            
            // Also push a copy of the removed element to the undo stack for potential redo
            undoStack.push(lastElement.outerHTML); // To keep track of what was undone
    
            console.log("Undo performed. Element removed:", lastElement.outerHTML);
        } else {
            console.warn("Nothing to undo");
        }
    }

    
    function redo() {
    const workspace = document.getElementById("page1");
    if (redoStack.length > 0 && workspace) {
        const lastRemovedElementHTML = redoStack.pop(); // Get the last removed HTML

        // Parse the HTML string to recreate the DOM element
        const parser = new DOMParser();
        const doc = parser.parseFromString(lastRemovedElementHTML, "text/html");
        const restoredElement = doc.body.firstChild;

        if (restoredElement) {
            // Ensure the ID is unique to avoid conflicts
            restoredElement.id = `restored-${Date.now()}`;

            // Append the restored element to the workspace
            workspace.appendChild(restoredElement);
            
            // Add the outerHTML of the restored element back to the undo stack
            undoStack.push(restoredElement.outerHTML);

            // Reapply necessary event listeners
            makeElementDraggable(restoredElement);
            resizeOfCopyPasteElement(restoredElement);
            clickTextBox(restoredElement);
            doubleClickTextBox(restoredElement);

            console.log("Redo performed. Element restored:", restoredElement.outerHTML);
        } else {
            console.warn("Error: Restored element is null or invalid.");
        }
    } else {
        console.warn("Nothing to redo");
    }
}


   
    
// Key bindings for copy, paste, undo, and redo
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === "c") {
            event.preventDefault();
            copyElementToClipboard();
        } else if (event.key === "v") {
            event.preventDefault();
            pasteElementToWorkspace();
        } else if (event.key === "z") {
            event.preventDefault();
            undo();
        } else if (event.key === "y") {
            event.preventDefault();
            redo();
        }
        else if (event.key === "s") {
            event.preventDefault();
            addData()
        }
    }
});

// Remaining functions (clickTextBox, doubleClickTextBox, resizeOfCopyPasteElement, makeElementDraggable)
// ... (Add your functions here as they are)





