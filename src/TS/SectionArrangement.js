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
