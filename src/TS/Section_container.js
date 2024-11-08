// Function to create and add sections to the container and work area
function addSection(id, label) {
    const sectionItem = document.createElement("div");
    sectionItem.classList.add("section-item");
    sectionItem.id = `section-${id}`;
    sectionItem.draggable = true; // Make it draggable
    sectionItem.setAttribute("tabindex", "0");

    // Section label
    const sectionLabel = document.createElement("span");
    sectionLabel.textContent = label;
    sectionItem.appendChild(sectionLabel);

    // Add up arrow button
    const upButton = document.createElement("button");
    upButton.classList.add("up-button");
    upButton.innerHTML = "↑"; // Up arrow
    upButton.addEventListener("click", () => moveSection(id, "up"));
    sectionItem.appendChild(upButton);

    // Add down arrow button
    const downButton = document.createElement("button");
    downButton.classList.add("down-button");
    downButton.innerHTML = "↓"; // Down arrow
    downButton.addEventListener("click", () => moveSection(id, "down"));
    sectionItem.appendChild(downButton);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.addEventListener("click", () => deleteSection(id));
    sectionItem.appendChild(deleteButton);

    // Add to sections-container
    const sectionsContainer = document.getElementById("sections-container");
    sectionsContainer.appendChild(sectionItem);

    // Add corresponding section to work area
    const workAreaContainer = document.getElementById("work-area"); // Assuming work area is a separate container
    const workAreaSection = document.createElement("div");
    workAreaSection.classList.add("work-area-section");
    workAreaSection.id = `work-area-${id}`;
    workAreaSection.textContent = `Work Area: ${label}`;
    workAreaContainer.appendChild(workAreaSection);

    // Add drag events
    sectionItem.addEventListener("dragstart", handleDragStart);
    sectionItem.addEventListener("dragover", handleDragOver);
    sectionItem.addEventListener("dragenter", handleDragEnter);
    sectionItem.addEventListener("dragleave", handleDragLeave);
    sectionItem.addEventListener("drop", handleDrop);
    sectionItem.addEventListener("dragend", handleDragEnd);
}

// Function to move the section up or down in both sections container and work area
function moveSection(id, direction) {
    const sectionItem = document.getElementById(`section-${id}`);
    const workAreaSection = document.getElementById(`work-area-${id}`);
    const container = document.getElementById("sections-container");
    const workAreaContainer = document.getElementById("work-area");

    const sections = Array.from(container.children);
    const workAreaSections = Array.from(workAreaContainer.children);
    const currentIndex = sections.indexOf(sectionItem);

    if (direction === "up" && currentIndex > 0) {
        container.insertBefore(sectionItem, sections[currentIndex - 1]);
        workAreaContainer.insertBefore(workAreaSection, workAreaSections[currentIndex - 1]);
    } else if (direction === "down" && currentIndex < sections.length - 1) {
        container.insertBefore(sectionItem, sections[currentIndex + 2] || null);
        workAreaContainer.insertBefore(workAreaSection, workAreaSections[currentIndex + 2] || null);
    }
}

// Variables to manage the drag operation
let draggedElement = null;

// Handle the start of a drag event
function handleDragStart(event) {
    draggedElement = event.target;
    event.dataTransfer.setData("text/plain", draggedElement.id); // Set the dragged element's id
    draggedElement.style.opacity = "0.5"; // Visual cue for drag
}

// Handle the drag over event (allow dropping)
function handleDragOver(event) {
    event.preventDefault(); // Allow drop
}

// Handle the drag enter event (visual cue for drop target)
function handleDragEnter(event) {
    if (event.target.classList.contains("section-item") && event.target !== draggedElement) {
        event.target.style.border = "2px dashed #007bff"; // Show dashed border for target
    }
}

// Handle the drag leave event (remove the visual cue)
function handleDragLeave(event) {
    if (event.target.classList.contains("section-item")) {
        event.target.style.border = ""; // Remove dashed border
    }
}

// Handle the drop event
function handleDrop(event) {
    event.preventDefault();
    const targetElement = event.target;

    if (targetElement.classList.contains("section-item") && targetElement !== draggedElement) {
        // Swap elements in the DOM
        const draggedId = draggedElement.id;
        const targetId = targetElement.id;

        // Reorder the sections in both the container and work area
        const container = document.getElementById("sections-container");
        const workAreaContainer = document.getElementById("work-area");
        const draggedIndex = Array.from(container.children).indexOf(draggedElement);
        const targetIndex = Array.from(container.children).indexOf(targetElement);

        if (draggedIndex < targetIndex) {
            container.insertBefore(draggedElement, targetElement.nextSibling);
            workAreaContainer.insertBefore(document.getElementById(`work-area-${draggedId}`), document.getElementById(`work-area-${targetId}`).nextSibling);
        } else {
            container.insertBefore(draggedElement, targetElement);
            workAreaContainer.insertBefore(document.getElementById(`work-area-${draggedId}`), document.getElementById(`work-area-${targetId}`));
        }
    }

    targetElement.style.border = ""; // Remove dashed border after drop
}

// Handle the end of the drag event
function handleDragEnd(event) {
    draggedElement.style.opacity = "1"; // Restore opacity
    draggedElement = null;
}

// Delete section from both the sections-container, layer container, and work area
export function deleteSection(id) {
    const sectionItem = document.getElementById(`section-${id}`);
    const layerItem = document.getElementById(`layer-${id}`); // Assuming this is the layer in the layer container
    const correspondingElement = document.getElementById(id);

    // Remove section from sections-container
    if (sectionItem) {
        sectionItem.style.transition = "opacity 0.3s ease-out";
        sectionItem.style.opacity = "0";
        setTimeout(() => sectionItem.remove(), 300);
    }

    // Remove layer from layers-container
    if (layerItem) {
        layerItem.style.transition = "opacity 0.3s ease-out";
        layerItem.style.opacity = "0";
        setTimeout(() => layerItem.remove(), 300);
    }

    // Remove corresponding work area section
    if (correspondingElement) {
        correspondingElement.style.transition = "opacity 0.3s ease-out";
        correspondingElement.style.opacity = "0";
        setTimeout(() => correspondingElement.remove(), 300);
    }
}

export function addSections(id) {
    const label = id;
    addSection(id, label);
}
