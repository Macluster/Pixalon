"use strict";
function showPopUp() {
    console.log("hai");
    var ele = document.getElementById("fileDropDown");
    if (ele.style.display == "none")
        ele.style.display = "flex";
    else
        ele.style.display = "none";
}


function custom() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // Get specific parameters
    const height = urlParams.get('height');
    const width = urlParams.get('width');
    const title = urlParams.get('name');
    var titleElement = document.getElementById("title");
    titleElement.value = title;
  
    if(height!=0)
    {
      const type = urlParams.get('type');
      console.log("type="+type)
      console.log("height" + height);
      console.log("title" + title);
      const frame = new Frame(width + "px", height + "px", "white", "");
      frame.element.id = "page1";
      frame.element.style.display = "flex";
      frame.element.style.flexDirection = "column";
      frame.element.style.top = "100px";
      frame.element.style.left = "300px";
      //pages.push(frame);
      frame.appendTo(".work-space");
     
  
      //updating hight and width in property box
      document.getElementById('height').value = width;
      document.getElementById('width').value = height;
  
       // Get the bounding rectangle of the frame element to get its position
       const rect = frame.element.getBoundingClientRect();
       document.getElementById('x-position').value = rect.left; // Update x-position input
       document.getElementById('y-position').value = rect.top;  // Update y-position input
  
      // Update color in the property box
      const hex = rgbToHex(window.getComputedStyle(frame.element).backgroundColor);
      document.getElementById('colorCodeDisplay').value = hex;
      document.getElementById('fillColorInput').value = hex;
    
    }
}

custom()


function rgbToHex(rgb) {
    if (!rgb) return "#000000"; // Default if no color is set
    const result = rgb.match(/\d+/g);
    if (result) {
      return `#${(
        (1 << 24) +
        (Number(result[0]) << 16) +
        (Number(result[1]) << 8) +
        Number(result[2])
      )
        .toString(16)
        .slice(1)}`;
    }
    return "#ffffff"; // Return black if parsing fails
  }