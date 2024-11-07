import { app, database } from './Firebase.js';
import { ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// Reference to the 'users' node in the 
async function addData(isUpdating) {






    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let title = urlParams.get('name');
    title = document.getElementById('title').value

    const type = urlParams.get('type');
    console.log("type=" + type)
    console.log("title=" + title.value)





    var ele = document.getElementById("page1");
    console.log(ele)
    let sections = Array.from(ele.children)
    sections = sections.filter(section => !section.classList.contains("resizer"));

    const clone = ele.cloneNode(false);
    let sectionList = [];


    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    console.log(formattedDate);


    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    console.log(formattedTime);


    const savedFilesRef = ref(database, `/savedFiles`);
    let newFile = await push(savedFilesRef, {
        fileName: title, 
        fileType: type, 
        date: formattedDate,
        time: formattedTime,
    })

    const savedDataRef = ref(database, `/savedData/${newFile.key}`);

    sections.forEach(element => {



        if (element.id.includes("section")) {


            const textareas = element.querySelectorAll("textarea");

            // Update each textarea's inner HTML to its current value
            textareas.forEach(textarea => {
                textarea.innerHTML = textarea.value;
            });

            sectionList.push({
                id: element.id,
                data: element.outerHTML
            });

        }




    });

   


    let metaData = {



        frameData: clone.outerHTML,
        sections: sectionList
    };
    // Write an object with user details
    await set(savedDataRef, metaData)
        .then(() => {
            console.log('User data written successfully!');

        })
        .catch((error) => {
            console.error('Error writing user data:', error);
        });

    displayMessage("Data Saved", "success")
}
document.getElementById('savedatabtn').addEventListener('click', addData);


function displayMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.className = `message${type}`;

    messageBox.style.zIndex = "20"
    console.log("Before appending message box");
    document.getElementById('work-space').appendChild(messageBox);
    console.log("After appending message box");

    console.log("asfasf")
    // Remove the message after a few seconds
    setTimeout(() => {
        document.getElementById('work-space').removeChild(messageBox);
    }, 3000);
}

export default addData