


let clipboard = ""; // Initialize as an empty string

function copyElementToClipboard() {
    const currentElement = document.getElementById(currentSelectedContainer);
    if (currentElement) {
        clipboard = currentElement.outerHTML; // Store copied HTML in the clipboard variable
    } else {
        console.error('Element not found:', currentSelectedContainer);
    }
}

function pasteElementToWorkspace() {
    const workspace = document.getElementById('page1');
    if (workspace && clipboard) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(clipboard, 'text/html');
        const ele = doc.body.firstChild as HTMLElement; //store the copypaste element

        if (!ele) {
            console.error('Parsed element is null');
            return;
        }

        ele.style.position = "absolute"; 
        ele.style.left = "0px";
        ele.style.top = "0px";
        workspace.appendChild(ele);

        makeElementDraggable(ele);
        resizeOfCopyPasteElement(ele);

        // Update selected container to the new element
        currentSelectedContainer = ele.id;
    } else {
        console.error('Workspace not found or clipboard is empty.');
    }
}

function resizeOfCopyPasteElement(ele: HTMLElement) {
    const resizerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    resizerPositions.forEach((position) => {
        const resizer = document.createElement('div');
        resizer.classList.add('resizer', position);

        resizer.addEventListener('mousedown', (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(document.defaultView!.getComputedStyle(ele).width!, 10);
            const startHeight = parseInt(document.defaultView!.getComputedStyle(ele).height!, 10);
            const startLeft = parseInt(ele.style.left, 10);
            const startTop = parseInt(ele.style.top, 10);

            const resize = (e: MouseEvent) => {
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

function makeElementDraggable(ele: HTMLElement) {
    ele.addEventListener("mousedown", (e: MouseEvent) => {
        e.stopPropagation();
        previouslySelectedElement = currentSelectedContainer;
        currentSelectedContainer = ele.id;

        ele.style.border = "2px solid #4CC9FE";
        Array.from(ele.children).forEach(child => {
            if (child.classList.contains("resizer")) {
                (child as HTMLElement).style.backgroundColor = "#4CC9FE";
            }
        });

        if (previouslySelectedElement && previouslySelectedElement !== currentSelectedContainer) {
            const prevSelectedElement = document.getElementById(previouslySelectedElement);
            if (prevSelectedElement) {
                prevSelectedElement.style.border = "2px solid transparent";
                Array.from(prevSelectedElement.children).forEach(child => {
                    if (child.classList.contains("resizer")) {
                        (child as HTMLElement).style.backgroundColor = "transparent";
                    }
                });
            }
        }

        if ((e.target as HTMLElement).classList.contains('resizer')) return;
        e.preventDefault();

        const parentRect = (ele.parentNode as HTMLElement).getBoundingClientRect();
        const shiftX = e.clientX - ele.getBoundingClientRect().left;
        const shiftY = e.clientY - ele.getBoundingClientRect().top;

        const moveAt = (clientX: number, clientY: number) => {
            const newLeft = Math.max(0, Math.min(clientX - parentRect.left - shiftX, parentRect.width - ele.offsetWidth));
            const newTop = Math.max(0, Math.min(clientY - parentRect.top - shiftY, parentRect.height - ele.offsetHeight));
            ele.style.left = `${newLeft}px`;
            ele.style.top = `${newTop}px`;
        };

        const onMouseMove = (e: MouseEvent) => moveAt(e.clientX, e.clientY);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove), { once: true });
    });

    ele.ondragstart = () => false;
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === 'c') {
            event.preventDefault();
            copyElementToClipboard();
        } else if (event.key === 'v') {
            event.preventDefault();
            pasteElementToWorkspace();
        }
    }
});

