const layersContainer = document.getElementById("layers-container");

// Array to keep track of layer items for z-index ordering
const layers = [];

// Currently selected layer and element
let selectedLayerItem = null;
let selectedElement = null;

// Abbreviations for layer types
const LAYER_ABBREVIATIONS = {
    Image: "Img",
    text: "Txt",
    shape: "Shp",
    table: "Tbl",
    frame: "Frm",
    Section: "Sec",
};

// Function to add a layer item
export function addLayerItem(type, id) {
    const layerItem = document.createElement("div");
    layerItem.classList.add("layer-item");
    layerItem.id = `layer-${id}`;
    layerItem.style.zIndex = layers.length;
    layerItem.setAttribute("tabindex", "0");

    // Add the layer to the tracking array
    layers.push(layerItem);

    // Icon for the layer type
    const icon = document.createElement("span");
    icon.classList.add("layer-icon");

    // Set icon based on the layer type
    switch (type) {
        case "Image":
            icon.innerHTML = "🖼️"; // Example image icon
            break;
        case "text":
            const textIcon = document.createElement("img");
            textIcon.src = "../../assets/iconoir_text.png"; 
            textIcon.alt = "Text Icon";
            textIcon.classList.add("layer-img-icon");
            icon.appendChild(textIcon);
            break;
        case "shape":
            const shapeIcon = document.createElement("img");
            shapeIcon.src = "../../assets/mingcute--section-line.svg"; 
            shapeIcon.alt = "Shape Icon";
            shapeIcon.classList.add("layer-img-icon");
            icon.appendChild(shapeIcon);
            break;
        case "table":
            const tableIcon = document.createElement("img");
            tableIcon.src = "../../assets/tabler_table.png";
            tableIcon.alt = "Table Icon";
            tableIcon.classList.add("layer-img-icon");
            icon.appendChild(tableIcon);
            break;
        case "frame":
            const frameIcon = document.createElement("img");
            frameIcon.src = "../../assets/lets-icons_frame-light.png";
            frameIcon.alt = "Frame Icon";
            frameIcon.classList.add("layer-img-icon");
            icon.appendChild(frameIcon);
            break;
        case "Section":
            const sectionIcon = document.createElement("img");
            sectionIcon.src = "../../assets/lets-icons_frame-light.png";
            sectionIcon.alt = "Section Icon";
            sectionIcon.classList.add("layer-img-icon");
            icon.appendChild(sectionIcon);
            break;
        default:
            icon.innerHTML = "🔧"; // Default icon for unknown types
    }
    layerItem.appendChild(icon);

    // Label for the layer (show abbreviated name and id number)
    const abbreviation = LAYER_ABBREVIATIONS[type] || type;
    const label = document.createElement("label");
    label.textContent = `${abbreviation} ${id.replace(/^\D+/g, '')}`;
    label.classList.add("layer-label");
    layerItem.appendChild(label);

    // Visibility toggle
    const visibilityToggle = document.createElement("button");
    visibilityToggle.classList.add("visibility-toggle");
    visibilityToggle.setAttribute("aria-label", "Toggle visibility");
    visibilityToggle.title = "Toggle visibility";
    visibilityToggle.innerHTML = "👁️";
    visibilityToggle.addEventListener("click", () => toggleVisibility(id, visibilityToggle));
    layerItem.appendChild(visibilityToggle);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("aria-label", "Delete layer");
    deleteButton.title = "Delete layer";
    deleteButton.innerHTML = "🗑️";
    deleteButton.addEventListener("click", () => deleteLayer(id));
    layerItem.appendChild(deleteButton);

    // Select layer item on click
    layerItem.addEventListener("click", () => selectLayer(id, layerItem));

    // Right-click context menu
    layerItem.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        showContextMenu(event.pageX, event.pageY, id);
    });

    layersContainer.appendChild(layerItem);
}

// Select layer item and corresponding element
function selectLayer(id, layerItem) {
    clearSelection();  // Clear any existing selection

    // Highlight selected layer item
    layerItem.classList.add("selected-layer");
    selectedLayerItem = layerItem;

    // Highlight corresponding element in the workspace
    const element = document.getElementById(id);
    if (element) {
        element.classList.add("selected-layer");
        selectedElement = element;
    }
}

// Clear selection from previously selected layer and element
function clearSelection() {
    if (selectedLayerItem) selectedLayerItem.classList.remove("selected-layer");
    if (selectedElement) selectedElement.classList.remove("selected-layer");

    selectedLayerItem = null;
    selectedElement = null;
}

// Workspace element click listener for two-way selection
document.addEventListener("click", (event) => {
    const clickedElement = event.target.closest(".workspace-element");
    if (clickedElement && clickedElement.id) {
        const layerId = clickedElement.id;
        const layerItem = document.getElementById(`layer-${layerId}`);
        if (layerItem) {
            selectLayer(layerId, layerItem);
        }
    }
});

// Function to update z-index values based on current order
function updateZIndices() {
    layers.forEach((layer, index) => {
        layer.style.zIndex = index;
    });
}

// Function to move a layer to the top of the stack
function moveToTop(id) {
    const layerItem = document.getElementById(`layer-${id}`);
    if (layerItem) {
        layers.splice(layers.indexOf(layerItem), 1);
        layers.push(layerItem);
        updateZIndices();
    }
}

// Function to move a layer to the bottom of the stack
function moveToBottom(id) {
    const layerItem = document.getElementById(`layer-${id}`);
    if (layerItem) {
        layers.splice(layers.indexOf(layerItem), 1);
        layers.unshift(layerItem);
        updateZIndices();
    }
}

// Toggle visibility function for smoother UI
function toggleVisibility(id, button) {
    const element = document.getElementById(id);
    if (element) {
        element.style.display = element.style.display === "none" ? "block" : "none";
        button.innerHTML = element.style.display === "none" ? "🚫" : "👁️";
    }
}

// Function to delete a layer with confirmation and smooth animation
export function deleteLayer(id) {
    const sectionItem = document.getElementById(`section-${id}`);
    const layerItem = document.getElementById(`layer-${id}`);
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

// Context menu with styling and better UX
function showContextMenu(x, y, id) {
    let existingMenu = document.getElementById("context-menu");
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement("div");
    menu.id = "context-menu";
    menu.style.position = "absolute";
    menu.style.top = `${y}px`;
    menu.style.left = `${x}px`;
    menu.classList.add("context-menu");

    const moveToTopOption = document.createElement("div");
    moveToTopOption.textContent = "Move to Top";
    moveToTopOption.addEventListener("click", () => {
        moveToTop(id);
        menu.remove();
    });
    menu.appendChild(moveToTopOption);

    const moveToBottomOption = document.createElement("div");
    moveToBottomOption.textContent = "Move to Bottom";
    moveToBottomOption.addEventListener("click", () => {
        moveToBottom(id);
        menu.remove();
    });
    menu.appendChild(moveToBottomOption);

    document.body.appendChild(menu);
    document.addEventListener("click", () => menu.remove(), { once: true });
}


// Styles for a modern, interactive look
const styles = document.createElement("style");
styles.innerHTML = `
    /* Layer Item Styles */
.layer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 5px; /* Increased padding for better touch targets */
    margin-bottom: 1px;
    border-radius: 10px; /* More rounded corners */
    background-color: #ffffff; /* Soft white background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.layer-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: #f1f1f1; /* Light gray on hover */
}

.selected-layer {
    outline: 2px solid #007bff; /* Blue border for selected items */
    background-color: #e7f1ff; /* Light blue background for selected layers */
}

/* Icon Styling */
.layer-icon {
    font-size: 10px; /* Slightly larger icon size */
    // margin-right: 10px; /* Spacing between icon and label */
}

/* Image Icon Styling */
.layer-img-icon {
    width: 20px;  /* Adjust width */
    height: auto; /* Maintain aspect ratio */
}

/* Label Styling */
.layer-label {
    flex-grow: 1;
    font-size: 8px; /* Increased font size for better readability */
    font-weight: 600; /* Slightly bolder font */
    color: #333; /* Darker color for contrast */
    padding-left: 10px; /* Adjusted padding */
}

/* Button and Icon Styles */
.visibility-toggle, .delete-button {
    background: none;
    border: none;
    cursor: pointer;
    margin: 0px;
    padding: 0px;
    font-size: 15px; /* Increased size for visibility */
    transition: color 0.2s, transform 0.2s;
}

.visibility-toggle:hover, .delete-button:hover {
    color: #0056b3; /* Change color on hover */
    transform: scale(1.1); /* Slightly enlarge on hover */
}

/* Context Menu Styles */
.context-menu {
    background: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: opacity 0.2s ease-in-out;
}

.context-menu div {
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s; /* Smooth transition for hover effects */
}

.context-menu div:hover {
    background: #f7f7f7; /* Light gray background on hover */
    color: #007bff; /* Change text color on hover */
}

`;
document.head.appendChild(styles);
