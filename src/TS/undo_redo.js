let undoStack = [];
let redoStack = [];

// Save the current workspace state to the undo stack
function performAction() {
    const workspace = document.getElementById('page1');
    if (workspace) {
        undoStack.push(workspace.innerHTML);
        redoStack = []; // Clear redo stack on new action
        console.log("State saved. Undo stack:", undoStack);
    }
}

// Undo the last action by restoring the previous state
function undo() {
    const workspace = document.getElementById('page1');
    if (workspace && undoStack.length > 0) { // Check if there are states to undo
        redoStack.push(workspace.innerHTML); // Save current state to redo stack
        workspace.innerHTML = undoStack.pop(); // Restore previous state
        console.log(`Undid to state: ${workspace.innerHTML}`);
    }
}

// Redo the last undone action by restoring the next state
function redo() {
    const workspace = document.getElementById('page1');
    if (workspace && redoStack.length > 0) { // Check if there are states to redo
        undoStack.push(workspace.innerHTML); // Save current state to undo stack
        workspace.innerHTML = redoStack.pop(); // Restore next state
        console.log("Redo performed. Undo stack:", undoStack, "Redo stack:", redoStack);
    }
}

// Keyboard shortcuts for Undo (Ctrl+Z) and Redo (Ctrl+Y or Ctrl+Shift+Z)
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z' && !event.shiftKey) {
            event.preventDefault();
            undo();
        } else if (event.key === 'y' || (event.key === 'z' && event.shiftKey)) {
            event.preventDefault();
            redo();
        }
    }
});
