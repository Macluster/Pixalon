


async function showData()
{
// Retrieve frameData and sections from localStorage
const frameData = await   localStorage.getItem('frameData');
let sections = await localStorage.getItem('sections') ;


const workSpaceElement = document.getElementById('work-space');



if (frameData) {
    // Create a temporary div to parse the frameData
   

    const parser = new DOMParser();
   
    const tempDiv = await (parser.parseFromString(frameData, "text/html")).body.firstChild;
    tempDiv.id="page1"
   
    console.log("hai")
    console.log(tempDiv)
    makeElementDraggable(tempDiv);
    resizeOfCopyPasteElement(tempDiv);
    // clickTextBox(ele);
    // doubleClickTextBox(ele);
 
  
    // Append the parsed frameData to work-space
    

    // Handle sections if they existgit
    if (sections) {
        const parsedSections = JSON.parse(sections); // Parse sections back to an object
        
        // Find the main frame (assuming the ID is unique)
        

        if (tempDiv) {
          
            parsedSections.forEach( async(section) =>{
                
                const sec = await  (parser.parseFromString(section.data, "text/html")).body.firstChild;
                sec.id=section.id
                console.log(sec)
                console.log(sec)

                let textareas= sec.querySelectorAll('textarea')
                textareas.forEach((e)=>{
                    
                   
                    let parentofTextarea=e.parentElement
                    clickTextBox(parentofTextarea)
                    doubleClickTextBox(parentofTextarea)
                })

               let allChild= sec.querySelectorAll('*')
               allChild.forEach((e)=>{
                let parentofChild=e.parentElement
                makeElementDraggable(parentofChild);
                resizeOfCopyPasteElement(parentofChild);
               })
               

                makeElementDraggable(sec);
                resizeOfCopyPasteElement(sec);

                

                // Append each section to the frame
                tempDiv.appendChild(sec);
            }
            
              
            );
        } else {
            console.error('Frame element not found'); // Handle case where frame is not found
        }
    }

    workSpaceElement.appendChild(tempDiv);
    console.log("when retriving")
    console.log(tempDiv)
    console.log("end")
} else {
    console.error('Frame data not found'); // Handle case where frameData is not available
}

// Clear localStorage if no longer needed
localStorage.removeItem('frameData');
localStorage.removeItem('sections');
}




showData()
function clickTextBox(ele) {
    ele.querySelectorAll('textarea')[0].addEventListener("mousedown", function (e) {
        e.preventDefault();
    });
}
function doubleClickTextBox(ele) {
    // Allow focus only on double click
    ele.querySelectorAll('textarea')[0].addEventListener("dblclick", (e) => {
        ele.querySelectorAll('textarea')[0].focus(); // Focus on input when double-clicked
        e.stopPropagation(); // Prevent triggering parent events
    });
    ele.querySelectorAll('textarea')[0].addEventListener("mousedown", function (e) {
        e.preventDefault();
    });
    ele.querySelectorAll('textarea')[0].addEventListener("mouseover", (e) => {
        ele.querySelectorAll('textarea')[0].style.cursor = "default";
        e.stopPropagation(); // Prevent triggering parent events
    });
}



function resizeOfCopyPasteElement(ele) {
    const resizerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    resizerPositions.forEach((position) => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer', position);
        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(document.defaultView.getComputedStyle(ele).width, 10);
            const startHeight = parseInt(document.defaultView.getComputedStyle(ele).height, 10);
            const startLeft = parseInt(ele.style.left, 10);
            const startTop = parseInt(ele.style.top, 10);
            const resize = (e) => {
                if (position.includes('right')) {
                    ele.style.width = startWidth + (e.clientX - startX) + "px";
                }
                if (position.includes('left')) {
                    const widthChange = startX - e.clientX;
                    ele.style.width = startWidth + widthChange + "px";
                    ele.style.left = (startLeft - widthChange) + "px";
                }
                if (position.includes('bottom')) {
                    ele.style.height = startHeight + (e.clientY - startY) + "px";
                }
                if (position.includes('top')) {
                    const heightChange = startY - e.clientY;
                    ele.style.height = startHeight + heightChange + "px";
                    ele.style.top = (startTop - heightChange) + "px";
                }
            };
            const stopResize = () => {
                document.removeEventListener('mousemove', resize);
                document.removeEventListener('mouseup', stopResize);
            };
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });
        ele.appendChild(resizer);
    });
}
function makeElementDraggable(ele) {
    ele.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        previouslySelectedElement = currentSelectedContainer;
        currentSelectedContainer = ele.id;
        ele.style.border = "2px solid #4CC9FE";
        Array.from(ele.children).forEach(child => {
            if (child.classList.contains("resizer")) {
                child.style.backgroundColor = "#4CC9FE";
            }
        });
        if (previouslySelectedElement && previouslySelectedElement !== currentSelectedContainer) {
            const prevSelectedElement = document.getElementById(previouslySelectedElement);
            if (prevSelectedElement) {
                prevSelectedElement.style.border = "2px solid transparent";
                Array.from(prevSelectedElement.children).forEach(child => {
                    if (child.classList.contains("resizer")) {
                        child.style.backgroundColor = "transparent";
                    }
                });
            }
        }
        if (e.target.classList.contains('resizer'))
            return;
        e.preventDefault();
        const parentRect = ele.parentNode.getBoundingClientRect();
        const shiftX = e.clientX - ele.getBoundingClientRect().left;
        const shiftY = e.clientY - ele.getBoundingClientRect().top;
        const moveAt = (clientX, clientY) => {
            const newLeft = Math.max(0, Math.min(clientX - parentRect.left - shiftX, parentRect.width - ele.offsetWidth));
            const newTop = Math.max(0, Math.min(clientY - parentRect.top - shiftY, parentRect.height - ele.offsetHeight));
            ele.style.left = `${newLeft}px`;
            ele.style.top = `${newTop}px`;
        };
        const onMouseMove = (e) => moveAt(e.clientX, e.clientY);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove), { once: true });
    });
    ele.ondragstart = () => false;
}
