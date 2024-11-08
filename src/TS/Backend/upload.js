

import {  ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { storage } from "./Firebase.js";


// Upload the file to Firebase Storage

export async function uploadImageToFirebase(file)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const title = urlParams.get('name');
    const storagePath = `images/${title}/${file.name}`; // Define the path in Firebase Storage
    const fileRef = storageRef(storage, storagePath);
    console.log(file)
    var imageUrl=""
   await  uploadBytes(fileRef, file)
    .then((snapshot) => {
        console.log("Uploaded a blob or file!");

        // Get the download URL
        return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
        console.log("File available at", downloadURL);
        imageUrl=downloadURL;

       
    })
    .catch((error) => {
        console.error("Error uploading file:", error);
    });

    return imageUrl
}


