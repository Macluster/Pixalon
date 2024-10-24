"use strict";
function custom() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // Get specific parameters
    const height = urlParams.get('height');
    const width = urlParams.get('width');
    const frame = new Frame(600 + "px", 600 + "px", "white", "");
    frame.element.id = "page1";
    frame.element.style.display = "flex";
    frame.element.style.flexDirection = "column";
    pages.push(frame);
    frame.appendTo(".work-space");
}
custom();
