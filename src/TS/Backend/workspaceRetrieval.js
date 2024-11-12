import { fetchFileData } from "./FetchFileData.js";


async function showData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // Get specific parameters
    const height = urlParams.get('height');
    console.log("myheight:" + height)



    sectionArraylist = []
    if (height == 0) {
        // Retrieve frameData and sections from localStorage
        const fileKey = await localStorage.getItem('fileKey');
        console.log("key=" + fileKey)

        let data = await fetchFileData(fileKey)
        console.log("temp=" + data)

        let frameData = data.frameData

        let sections = data.sections
        console.log("data=" + sections)


        const workSpaceElement = document.getElementById('work-space');



        if (frameData) {
            // Create a temporary div to parse the frameData


            const parser = new DOMParser();

            const tempDiv = await (parser.parseFromString(frameData, "text/html")).body.firstChild;
            tempDiv.id = "page1"

            console.log("hai")
            console.log(tempDiv)

            const frame = new Frame("500px", "500px", "white", "");
            frame.element = tempDiv;
            frame.addResizers();
            // Add Movable Property (same as your original code)
            frame.makeMovable();

            workSpaceElement.appendChild(tempDiv);

            // makeElementDraggable(tempDiv);
            // resizeOfCopyPasteElement(tempDiv);
            // clickTextBox(ele);
            // doubleClickTextBox(ele);


            // Append the parsed frameData to work-space


            // Handle sections if they existgit
            if (sections) {
                console.log(sections)
                const parsedSections = sections
                console.log("parsed:" + parsedSections.length)

                // Find the main frame (assuming the ID is unique)


                if (frame) {

                    let index = 0;
                    parsedSections.forEach((sectionData) => {


                        const sec = (parser.parseFromString(sectionData.data, "text/html")).body.firstChild;
                        let section = new Section(("section" + (index)), "100%", "300px", "grey", "");

                        section.element = sec
                        section.element.id = `section${index}`

                        sectionArraylist.push(section)
                        tempDiv.appendChild(section.element);
                        //sectionArraylist.push(section)
                        console.log(sectionArraylist)
                        // Add the resizer elements (four corner resizers)
                        section.addResizers();
                        // Add Movable Property (same as your original code)
                        section.makeMovable();



                        let allChild = section.element.querySelectorAll('*');
                        allChild.forEach((e) => {
                            // Check if the element does not have the class "resizer"
                            if (!e.classList.contains('resizer')) {

                                if (e.classList.contains("sectionDownArrow")) {
                                    addDownArrowListener(index, e)
                                }
                                if (e.classList.contains("sectionUpArrow")) {
                                    addUpArrowListener(index, e)
                                }

                                if (e.classList.contains("sectionDeleteBtn")) {
                                    adddeleteListener(index, e)
                                }

                                if (e.classList.contains("TextBox")) {
                                    let textBox = new TextBox();
                                    textBox.element = e;
                                    // Add the resizer elements (four corner resizers)
                                    textBox.addResizers();
                                    // Add Movable Property (same as your original code)
                                    textBox.makeMovable();
                                    textBox.mouseDownClick();
                                    textBox.doubleClick();
                                    textBox.mouseOver()



                                    console.log(`#sssection${index}`)
                                    textBoxList.push(textBox)
                                    textBox.appendTo(`#section${index}`)
                                    // section.element.appendChild(textBox.element)
                                }
                                if (e.classList.contains("Image")) {
                                    console.log("there is a image")
                                    let image = new Img(e.style.backgroundImage)
                                    image.element = e;
                                    // Add the resizer elements (four corner resizers)
                                    image.addResizers();
                                    // Add Movable Property (same as your original code)
                                    image.makeMovable();


                                    imageList.push(image)
                                    console.log("yyyyyyyyyyyyyyy")
                                    image.appendTo(`#section${index}`)

                                    //section.element.appendChild(image.element)
                                }
                                if (e.classList.contains("Shape")) {

                                    let shape = new Shape("100px", "100px", "white", "")
                                    shape.element = e;
                                    // Add the resizer elements (four corner resizers)
                                    shape.addResizers();
                                    // Add Movable Property (same as your original code)
                                    shape.makeMovable();
                                    shapesList.push(shape)


                                    console.log("yyyyyyyyyyyyyyy")
                                    shape.appendTo(`#section${index}`)

                                    //section.element.appendChild(image.element)
                                }

                                // makeElementDraggable(parentofChild);
                                // resizeOfCopyPasteElement(parentofChild);
                            }
                        });




                        // makeElementDraggable(sec);
                        // resizeOfCopyPasteElement(sec);



                        // Append each section to the frame


                        index++;
                    }


                    );
                } else {
                    console.error('Frame element not found'); // Handle case where frame is not found
                }
            }


            console.log("when retriving")
            console.log(tempDiv)
            console.log("end")
        } else {
            console.error('Frame data not found'); // Handle case where frameData is not available
        }

        // Clear localStorage if no longer needed
        localStorage.removeItem('fileKey');
    }


}




showData()
function clickTextBox(ele) {
    ele.querySelectorAll('textarea')[0].addEventListener("mousedown", function (e) {
        e.preventDefault();
    });
}



function doubleClickTextBox(ele) {
    // Allow focus only on double-click
    ele.querySelectorAll('textarea')[0].addEventListener("dblclick", (e) => {
        const textarea = e.target;
        ele.querySelectorAll('textarea')[0].focus(); // Focus on input when double-clicked
        e.stopPropagation(); // Prevent triggering parent events
    });

    ele.querySelectorAll('textarea')[0].addEventListener("mouseover", (e) => {
        const textarea = e.target;
        ele.querySelectorAll('textarea')[0].style.cursor = "default"; // Ensure cursor is set to default
        // e.stopPropagation(); // Prevent triggering parent events
    });
}
function resizeOfCopyPasteElement(ele) {
    const resizerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    // Find existing resizers or create them if they don't exist
    resizerPositions.forEach((position) => {
        let resizer = ele.querySelector(`.resizer.${position}`);

        // Only add resizer if it does not exist
        if (!resizer) {
            resizer = document.createElement('div');
            resizer.classList.add('resizer', position);
            ele.appendChild(resizer);
        }

        // Add the event listener for resizing
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



function addUpArrowListener(index, icon) {
    icon.addEventListener('click', function (event) {
        moveSectionUp(`section${index}`)
    });
}

function addDownArrowListener(index, icon) {
    icon.addEventListener('click', function (event) {
        moveSectionDown(`section${index}`)
    });
}
function adddeleteListener(index, icon) {
    icon.addEventListener('click', function (event) {
        deleteSection1(`section${index}`)
    });
}


