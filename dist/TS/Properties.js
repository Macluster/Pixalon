"use strict";
function onBackgroundChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.backgroundColor = target.value;
    }
}
function onCornerRadiusChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.borderRadius = `${target.value}px`;
    }
}
function onHeightChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.height = `${target.value}px`;
    }
}
function onWidthChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.width = `${target.value}px`;
    }
}
function selectBackgroundImage() {
    const fileInput = document.getElementById("backgroundImage");
    const preview = document.getElementById(currentSelectedContainer);
    fileInput.addEventListener("change", async (event) => {
        const target = event.target;
        const file = target.files?.[0];
        if (file && preview) {
            const imageUrl = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.style.backgroundRepeat = "no-repeat";
                preview.style.backgroundSize = "cover";
                if (e.target?.result) {
                    preview.style.backgroundImage = `url('${e.target.result}')`;
                }
            };
            reader.readAsDataURL(file);
        }
    });
    fileInput.click();
}
function fontSizeChanged(event) {
    const target = event.target;
}
