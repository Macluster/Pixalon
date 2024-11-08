"use strict";
class View {
    constructor(width, height, backgroundColor, content) {
        this.element = document.createElement('div');
        this.element.style.width = width;
        this.element.style.height = height;
        this.element.style.backgroundColor = backgroundColor;
        this.element.textContent = content || '';
        this.element.style.position = 'absolute';
        this.element.style.left = '0px';
        this.element.classList.add("movable", "resizable");
        this.element.style.boxSizing = "border-box";

        this.addResizers();
        this.makeMovable();
    }

    addResizers() {
        const resizerPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        resizerPositions.forEach((position) => {
            const resizer = document.createElement('div');
            resizer.classList.add('resizer', position);
            resizer.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = parseInt(document.defaultView.getComputedStyle(this.element).width, 10);
                const startHeight = parseInt(document.defaultView.getComputedStyle(this.element).height, 10);
                const startLeft = parseInt(this.element.style.left, 10);
                const startTop = parseInt(this.element.style.top, 10);

                const container = this.element.parentNode;
                const containerRect = container.getBoundingClientRect();

                const resize = (e) => {
                    let newWidth = startWidth;
                    let newHeight = startHeight;
                    let newLeft = startLeft;
                    let newTop = startTop;

                    if (position.includes('right')) {
                        newWidth = Math.min(startWidth + (e.clientX - startX), containerRect.width - startLeft);
                        document.getElementById('width').value = newWidth;
                    }
                    if (position.includes('left')) {
                        const widthChange = startX - e.clientX;
                        newWidth = Math.min(startWidth + widthChange, startLeft + startWidth);
                        newLeft = Math.max(0, startLeft - widthChange);
                        document.getElementById('width').value = newWidth;
                        document.getElementById('x-position').value = this.element.getBoundingClientRect().left;
                    }
                    if (position.includes('bottom')) {
                        newHeight = Math.min(startHeight + (e.clientY - startY), containerRect.height - startTop);
                        document.getElementById('height').value = newHeight;
                    }
                    if (position.includes('top')) {
                        const heightChange = startY - e.clientY;
                        newHeight = Math.min(startHeight + heightChange, startTop + startHeight);
                        newTop = Math.max(0, startTop - heightChange);
                        document.getElementById('height').value = newHeight;
                        document.getElementById('y-position').value = this.element.getBoundingClientRect().top;
                    }

                    this.element.style.width = newWidth + "px";
                    this.element.style.height = newHeight + "px";
                    this.element.style.left = newLeft + "px";
                    this.element.style.top = newTop + "px";
                };

                const stopResize = () => {
                    document.removeEventListener('mousemove', resize);
                    document.removeEventListener('mouseup', stopResize);
                };

                document.addEventListener('mousemove', resize);
                document.addEventListener('mouseup', stopResize);
            });
            this.element.appendChild(resizer);
        });
    }

    makeMovable() {
        this.element.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            previouslySelectedElement = currentSelectedContainer;
            currentSelectedContainer = this.element.id;
            this.element.style.border = "2px solid #4CC9FE";

            document.getElementById('height').value = this.element.style.height.split("p")[0];
            document.getElementById('width').value = this.element.style.width.split("p")[0];

            const rect = this.element.getBoundingClientRect();
            document.getElementById('x-position').value = rect.left;
            document.getElementById('y-position').value = rect.top;

            const hex = rgbToHex(window.getComputedStyle(this.element).backgroundColor);
            document.getElementById('colorCodeDisplay').value = hex;
            document.getElementById('fillColorInput').value = hex;

            let reziersListOfCurrentObject = this.element.children;
            Array.from(reziersListOfCurrentObject).forEach(child => {
                if (child.classList.contains("resizer")) {
                    child.style.backgroundColor = "#4CC9FE";
                }
            });

            if (previouslySelectedElement !== currentSelectedContainer) {
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

            e.preventDefault();
            if (e.target.classList.contains('resizer')) return;

            const containerRect = this.element.parentNode.getBoundingClientRect();
            const shiftX = e.clientX - rect.left;
            const shiftY = e.clientY - rect.top;

            const moveAt = (clientX, clientY) => {
                const newLeft = Math.max(0, Math.min(clientX - containerRect.left - shiftX, containerRect.width - this.element.offsetWidth));
                const newTop = Math.max(0, Math.min(clientY - containerRect.top - shiftY, containerRect.height - this.element.offsetHeight));

                this.element.style.left = newLeft + "px";
                this.element.style.top = newTop + "px";

                document.getElementById('x-position').value = this.element.getBoundingClientRect().left;
                document.getElementById('y-position').value = this.element.getBoundingClientRect().top;
            };

            const onMouseMove = (e) => moveAt(e.clientX, e.clientY);
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove), { once: true });
        });

        this.element.ondragstart = () => false;
    }

    appendTo(parentSelector) {
        const parent = document.querySelector(parentSelector);
        if (parent) parent.appendChild(this.element);
        else console.error(`Parent element '${parentSelector}' not found.`);
    }
}

function rgbToHex(rgb) {
    if (!rgb) return "#000000";
    const result = rgb.match(/\d+/g);
    return result ? `#${((1 << 24) + (Number(result[0]) << 16) + (Number(result[1]) << 8) + Number(result[2])).toString(16).slice(1)}` : "#ffffff";
}
