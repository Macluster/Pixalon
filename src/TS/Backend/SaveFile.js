import { app, database } from './Firebase.js';
import { ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// Reference to the 'users' node in the 
async function addData() {



    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let title = urlParams.get('name');
    title=document.getElementById('title').value
    const type = urlParams.get('type');
 
    const userRef = ref(database, `/savedFiles/${title}`);
    var ele = document.getElementById("page1");
    let sections = Array.from(ele.children);
    const clone = ele.cloneNode(false);
    let sectionList = [];

    sections.forEach(element => {
        if (element.id.includes("section"))
            sectionList.push({
                id: element.id,
                data: element.innerHTML
            });
    });
  
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    console.log(formattedDate);


    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    console.log(formattedTime);

    
    console.log("type="+type)
    console.log("title="+title.value)
    let metaData = {
        fileName: title,
        fileType:type,
        date:formattedDate,
        time:formattedTime,

        frameData:clone.outerHTML,
        sections: sectionList
    };
    // Write an object with user details
  await  set(userRef, metaData)
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
   
    messageBox.style.zIndex="20"
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
  