const undoStack = []; // Stack for undo actions (to store HTML)
const redoStack = []; // Stack for redo actions (to store HTML)


function generateUniqueId() {
    return `pasted-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
}

// Modified Undo and Redo functions to assign unique IDs to restored elements
function undo() {
    const workspace = document.getElementById("page1");
    if (workspace && undoStack.length > 0) {
        const lastAction = undoStack.pop();
        console.log("Undo action:", lastAction);
        if (lastAction.action === 'add') {
            const element = document.getElementById(lastAction.element);
            if (element) {
                redoStack.push({ action: 'add', element: element.outerHTML });
                workspace.removeChild(element);
            }
        } else if (lastAction.action === 'delete') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(lastAction.element, "text/html");
            const restoredElement = doc.body.firstChild;
            restoredElement.id = generateUniqueId();
            workspace.appendChild(restoredElement);
            redoStack.push({ action: 'delete', element: lastAction.element });
            makeElementDraggable(restoredElement);
            resizeOfCopyPasteElement(restoredElement);
            console.log("Restored element:", restoredElement);
        }
    } else {
        console.error("Nothing to undo or workspace not found.");
    }
}

function redo() {
    const workspace = document.getElementById("page1");
    if (workspace && redoStack.length > 0) {
        const lastAction = redoStack.pop();
        console.log("Redo action:", lastAction);
        if (lastAction.action === 'add') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(lastAction.element, "text/html");
            const restoredElement = doc.body.firstChild;
            restoredElement.id = generateUniqueId();
            workspace.appendChild(restoredElement);
            undoStack.push({ action: 'add', element: restoredElement.outerHTML });
            makeElementDraggable(restoredElement);
            resizeOfCopyPasteElement(restoredElement);
        } else if (lastAction.action === 'delete') {
            const element = document.getElementById(lastAction.element);
            if (element) {
                undoStack.push({ action: 'delete', element: lastAction.element });
                workspace.removeChild(element);
            }
        }
    } else {
        console.error("Nothing to redo or workspace not found.");
    }
}


/// Modified deleteElement to update selected container
function deleteElement() {
    const element = document.getElementById(currentSelectedContainer);
    if (element) {
        undoStack.push({ action: 'delete', element: element.outerHTML });
        redoStack.length = 0;
        currentSelectedContainer = null;
        element.remove();
        console.log("Element deleted:", element);
    } else {
        console.error("No element selected or element not found for deletion:", currentSelectedContainer);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case "z":
                // event.preventDefault();
                undo();
                break;
            case "y":
                // event.preventDefault();
                redo();
                break;
            case "d":
                // event.preventDefault();
                deleteElement();
                break;
        }
    }
});