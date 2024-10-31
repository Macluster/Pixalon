

import {  ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { storage } from "./Firebase.js";
const storagePath = `images/file`; // Define the path in Firebase Storage
const fileRef = storageRef(storage, storagePath);

// Upload the file to Firebase Storage

function uploadImageToFirebase(file)
{

    console.log(file)

    uploadBytes(fileRef, file)
    .then((snapshot) => {
        console.log("Uploaded a blob or file!");

        // Get the download URL
        return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
        console.log("File available at", downloadURL);

        // Create an image element with the downloaded URL
        const imageElement = document.createElement("img");
        imageElement.src = downloadURL;
        imageElement.style.height = "100px";
        imageElement.style.width = "100px";
        imageElement.id = "I" + imageId++;

        // Append the image to the container
        const container = document.getElementById(currentSelectedContainer);
        if (container) {
            container.appendChild(imageElement);
        }
    })
    .catch((error) => {
        console.error("Error uploading file:", error);
    });
}


export default uploadImageToFirebase