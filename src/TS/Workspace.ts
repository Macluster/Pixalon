
function showPopUp() {
    console.log("hai");
    var ele = document.getElementById("fileDropDown");
    if( ele!.style.display=="none")
    ele!.style.display = "flex";
    else
    ele!.style.display = "none";
}

function saveProgress()
{
    
}




function custom() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    // Get specific parameters
    const height = urlParams.get('height');
    const width = urlParams.get('width');
    const title = urlParams.get('name');
    console.log("height"+height)
    console.log("title"+title)
    const frame = new Frame(width+ "px", height + "px", "white", "");
    frame.element.id = "page1";
    frame.element.style.display = "flex";
    frame.element.style.flexDirection = "column";
    frame.element.style.top="100px"
    frame.element.style.left="300px"
    pages.push(frame);
    frame.appendTo(".work-space");
  
    var  titleElement=document.getElementById("title") as HTMLInputElement
    titleElement.value=title!
    
  }
  
  custom()
  