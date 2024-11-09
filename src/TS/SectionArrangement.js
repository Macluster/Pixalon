function moveSectionUp(id) {
    console.log("Moving section up");
    for (let i = 0; i < sectionArraylist.length; i++) {
        if (sectionArraylist[i].element.id == id) {
            if (i === 0) {
                console.log("This section is already at the top, can't move up.");
                return; // Avoid out of bounds error
            }

            // Swap the top positions of the current section and the previous one
            let top = sectionArraylist[i].element.style.top;
            console.log(top)
            sectionArraylist[i].element.style.top = sectionArraylist[i - 1].element.style.top;
            sectionArraylist[i - 1].element.style.top = top;

            // Swap the sections in the array as well
            let section = sectionArraylist[i];
            sectionArraylist[i] = sectionArraylist[i - 1];
            sectionArraylist[i - 1] = section;
            break; // Exit loop once the section is found and moved
        }
    }
}

function moveSectionDown(id) {
    console.log("Moving section down");
    for (let i = 0; i < sectionArraylist.length; i++) {
        if (sectionArraylist[i].element.id == id) {
            if (i === sectionArraylist.length - 1) {
                console.log("This section is already at the bottom, can't move down.");
                return; // Avoid out of bounds error
            }

            // Swap the top positions of the current section and the next one
            let top = sectionArraylist[i].element.style.top;
            sectionArraylist[i].element.style.top = sectionArraylist[i + 1].element.style.top;
            sectionArraylist[i + 1].element.style.top = top;

            // Swap the sections in the array as well
            let section = sectionArraylist[i];
            sectionArraylist[i] = sectionArraylist[i + 1];
            sectionArraylist[i + 1] = section;
            break; // Exit loop once the section is found and moved
        }
    }
}

function deleteSection1(id) {
    console.log("Deleting section:", id);

    // Remove the main section element
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
        sectionElement.remove();
    } else {
        console.warn(`Section with ID ${id} not found in DOM.`);
        return;
    }

    // Handle the layer fade-out and removal
    const layerItem = document.getElementById(`layer-${id}`);
    if (layerItem) {
        layerItem.style.transition = "opacity 0.3s ease-out";
        layerItem.style.opacity = "0";
        setTimeout(() => layerItem.remove(), 300);
    }

    // Find and remove the section from the sectionArraylist
    const index = sectionArraylist.findIndex(section => section.element.id === id);
    if (index !== -1) {
        sectionArraylist.splice(index, 1); // Remove the section from the array

        // Rearrange the remaining sections by updating the `top` properties if necessary
        sectionArraylist.forEach((section, i) => {
            section.element.style.top = `${i * section.element.offsetHeight}px`; // Adjusts top for each remaining section
        });
    } else {
        console.warn(`Section with ID ${id} not found in sectionArraylist.`);
    }
}
