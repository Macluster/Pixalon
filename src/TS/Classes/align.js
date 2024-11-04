
function leftalign() {

    console.log("left");
    const child = document.getElementById(currentSelectedContainer);
    // Align the child element to the left
    child.style.left = '0px';
    child.style.right = 'auto';
}

function rightalign() {

    console.log("right");
    const child = document.getElementById(currentSelectedContainer);
    // Align the child element to the right
    child.style.right = '0px';
    child.style.left = 'auto';
}

function centeralign() {

    console.log("center");
    const child = document.getElementById(currentSelectedContainer);
    const parent=child.parentElement;

    // Align the child element to the center
    const parentWidth = parseInt(parent.style.width.split("p")[0]);
    const childWidth = parseInt(child.style.width.split("p")[0]);
    console.log(parentWidth)

    const left = (parentWidth/2)-(childWidth/2)
    console.log(left)
    child.style.left=left+"px"
}

function topalign() {

    console.log("top");
    const child = document.getElementById(currentSelectedContainer);
    // Align the child element to the top
    child.style.top = '0px';
    child.style.bottom = 'auto';
}

function bottomalign() {

    console.log("bottom");
    const child = document.getElementById(currentSelectedContainer);
    // Align the child element to the left
    child.style.bottom = '0px';
    child.style.top = 'auto';
}

function centerVertically() {

    console.log("middle");
    const child = document.getElementById(currentSelectedContainer);
    const parent=child.parentElement;

    // Align the child element to the center
    const parentheight = parseInt(parent.style.height.split("p")[0]);
    const childheight = parseInt(child.style.height.split("p")[0]);
    console.log(parentheight)

    const top = (parentheight/2)-(childheight/2)
    console.log(top)
    child.style.top = top+"px"
}

function vertical_spacing() {
    const parent = document.getElementById(currentSelectedContainer).parentElement; // Get parent container
    const parentHeight = parent.offsetHeight; // Height of parent container
    const children = Array.from(parent.children); // Convert children to an array
    
    let totalHeight = 0; // Initialize height accumulator
    
    // Sum the heights of all child elements
    children.forEach(child => {
        const childHeight = child.offsetHeight; // Get the height of each child
        totalHeight += childHeight; // Accumulate the height
    });
    
    // Calculate the remaining height and divide it for spacing
    const balHeight = parentHeight - totalHeight;
    const gap = balHeight / (children.length - 1); // Distribute evenly between children
    
    // Apply the calculated gap to the parent container
    parent.style.gap = `${gap}px`;
    
    console.log("Total height of child elements:", totalHeight);
    console.log("Calculated gap:", gap);
}
