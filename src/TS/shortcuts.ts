// let currentSelectedContainer: HTMLElement | null = null;
// let copiedContent: string | null = null;
// let copiedStyles: CSSStyleDeclaration | null = null;

// // Function to set the currently selected container
// function selectContainer(containerId: string): void {
//     if (currentSelectedContainer) {
//         currentSelectedContainer.classList.remove("selected");
//     }
//     currentSelectedContainer = document.getElementById(containerId) as HTMLElement | null;

//     if (currentSelectedContainer) {
//         currentSelectedContainer.classList.add("selected");
//     } else {
//         console.error("No element found with the given ID:", containerId);
//     }
// }

// // Function to copy content and styles of the selected container
// function copyContent(): void {
//     if (currentSelectedContainer) {
//         // Copy the HTML content
//         copiedContent = currentSelectedContainer.innerHTML;

//         // Copy the computed styles
//         copiedStyles = window.getComputedStyle(currentSelectedContainer);

//         console.log("Content copied:", copiedContent);
//         alert("Content copied!");
//     } else {
//         alert("No container selected to copy from.");
//     }
// }

// // Function to paste the content and styles into the selected container
// function pasteContent(): void {
//     if (currentSelectedContainer) {
//         if (copiedContent) {
//             // Paste the content
//             currentSelectedContainer.innerHTML = copiedContent;

//             // Apply the copied styles
//             if (copiedStyles) {
//                 // Iterate over all styles and apply them to the target container
//                 Array.from(copiedStyles).forEach((styleKey) => {
//                     (currentSelectedContainer!.style as any)[styleKey] = copiedStyles!.getPropertyValue(styleKey);
//                 });
//             }
//             alert("Content pasted!");
//         } else {
//             alert("No content to paste. Copy content first.");
//         }
//     } else {
//         alert("Select a container to paste into.");
//     }
// }

// // Event listener for keyboard shortcuts
// document.addEventListener("keydown", (event: KeyboardEvent) => {
//     if (event.ctrlKey && event.key === "c") {
//         copyContent();
//     }
//     if (event.ctrlKey && event.key === "v") {
//         pasteContent();
//     }
// });

