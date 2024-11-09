"use strict";
import { displaySavedFiles } from './Backend/savedItems.js';
import { getRecentFiles } from './Backend/getRecentItems.js'
import { getTemplates } from './Backend/getTemplates.js';


let recentData = [

]

async function getRecentData() {


    recentData = await getRecentFiles();







    // const names = recentData.map(file => file.fileName);

    // Loop from 1 to 4 (inclusive) to match the naming convention of the IDs
    for (let i = 1; i <= 4 && i < recentData.length; i++) {
        const id = "recent_name" + i;


        const name = recentData[i - 1].fileName; // Adjust index to match names array
        console.log(id);
        const string = name;

        // Get the element by ID


        const element = document.getElementById(id);
        element.addEventListener("click", () => {
            // Log frameData and sections for reference
            // console.log('Frame Data:', frameData);
            // console.log('Sections:', sections);

            
            console.log("keyyyy"+recentData[i - 1].uid)

            localStorage.setItem('fileKey', recentData[i - 1].uid);




            // Redirect to workspace.html
            window.location.href = `workspace.html?name=${recentData[i - 1].fileName}&height=${0}&width=${0}&type=${recentData[i - 1].fileType}&isUpdating=1`;
        });

        // Check if the element exists and if there is a corresponding name
        if (element && name) {
            element.innerHTML = string; // Set the value of the input element
            console.log(name); // Log the name for debugging
        }
        else {
            document.getElementById("recent_box" + i).style.display = "none";
            element.style.display = "none";
        }
    }
}





async function getTemplatesData() {

    let templates = []

    templates = await getTemplates();
    console.log("hai")
    console.log(templates)













    // Loop from 1 to 4 (inclusive) to match the naming convention of the IDs
    let templateContainer = document.getElementById("templates-container")
    //   templateContainer.style.overflowX="auto"
    let i = 0;
    templates.forEach((e) => {
        let card = document.createElement("div")
        card.style.height = "150px"
        card.style.width = "200px"
        card.innerHTML = `<img src="../../assets/dashboard/news${i}.png" alt="">`
        i++;


        card.addEventListener("click", () => {
            // Log frameData and sections for reference
            // console.log('Frame Data:', frameData);
            // console.log('Sections:', sections);

            console.log("keyyyy"+e.uid)
            localStorage.setItem('fileKey', e.uid);



            // Redirect to workspace.html
            window.location.href = `workspace.html?name=${e.fileName}&height=${0}&width=${0}&type=${e.fileType}&isUpdating=1`;
        });




        templateContainer.appendChild(card)




    })







    // for (let i = 1; i <= 4; i++) {
    //     const id = "template" + i;  
    //     const name = names[i - 1]; // Adjust index to match names array
    //     console.log(id);
    //     const string = name ;

    //     // Get the element by ID
    //     const element = document.getElementById(id);

    //     // Check if the element exists and if there is a corresponding name
    //     if (element && name) {
    //         element.innerHTML = string; // Set the value of the input element
    //         console.log(name); // Log the name for debugging
    //     }
    //     else{
    //         document.getElementById("recent_box" + i).style.display = "none";
    //         element.style.display = "none";
    //     }
    // } 
}



document.addEventListener("DOMContentLoaded", async function (event) {

    await getTemplatesData()
    await getRecentData()
});


const onSavedItemClicked = document.getElementById('onSavedItemClicked');
onSavedItemClicked.addEventListener("click", async function () {



    let savedFiles = []


    savedFiles = await displaySavedFiles();





    const menuDiv = document.getElementById("menu");
    const div = document.createElement("div");

    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.overflowY = "auto"

    menuDiv.innerHTML = `<div onclick="onSavedItemsbackButtonPressed()" style="width:100%;display:flex;align-items:center;margin-top:20px;gap:10px">
                            <a href="../Pages/dashboard.html">
                                <i style="display:flex;align-items:center;height:20px;" class="fa-solid fa-arrow-left"></i>
                            </a>
                            <h3>Saved items</h3>
                         </div>`;
    menuDiv.appendChild(div);
    menuDiv.style.height = "100%";

    savedFiles.forEach(({ uid, fileName, fileType }) => {
        let imgSrc;

        // Set image source based on file type
        switch (fileType) {
            case "newsletter":
                imgSrc = "../../assets/dashboard/newsletter.svg";
                break;
            case "poster":
                imgSrc = "../../assets/dashboard/poster.svg";
                break;
            case "a3":
                imgSrc = "../../assets/dashboard/A3.svg";
                break;
            case "custom":
                imgSrc = "../../assets/dashboard/custom.svg";
                break;
            default:
                imgSrc = "../../assets/dashboard/default.svg";
                break;
        }


        // Create a div element for each saved item
        const card = document.createElement('div');
        card.className = "savedItem";
        card.innerHTML = `
            <img src="${imgSrc}" style="height:20px;width:20px;margin-top:0px" />
            <h5 style="margin:0px;color:white">${fileName}</h5>
        `;

        // Add click event to redirect to another page with query parameters
        card.addEventListener("click", () => {
            // Log frameData and sections for reference
            // console.log('Frame Data:', frameData);
            // console.log('Sections:', sections);


            localStorage.setItem('fileKey', uid);


            // Redirect to workspace.html
            window.location.href = `workspace.html?name=${fileName}&height=${0}&width=${0}&type=${fileType}&isUpdating=1`;
        });


        div.appendChild(card);

    });
});


const onCustomPopupOpened = document.getElementById('onCustomPopupOpened');
onCustomPopupOpened.addEventListener('click', function onCustomPopupOpened() {
    var popup = document.getElementById('popupContainer');
    popup.style.display = "flex";
})

const onCustomPopupClosed = document.getElementById('onCustomPopupClosed');
onCustomPopupClosed.addEventListener('click', function onCustomPopupClosed() {
    var popup = document.getElementById('popupContainer');
    popup.style.display = "none";
})

function onCustomPresetCreate() {
    const fileName = document.getElementById("cfilename").value;
    const width = document.getElementById("cheight").value;
    const height = document.getElementById("cwidth").value;
    console.log(width);
    console.log(height);
    window.location.href = `workspace.html?name=${fileName}&height=${height}&width=${width}&type=custom&isUpdating=0`;
}
document.getElementById('popupPresetBtn').addEventListener("click", onCustomPresetCreate)

function onNewsletterCreate() {
    window.location.href = `workspace.html?name=title&height=800&width=600&type=newsletter&isUpdating=0`;
}
document.getElementById('newsletterBtn').addEventListener("click", onNewsletterCreate)

function onPosterCreate() {
    window.location.href = `workspace.html?name=title&height=600&width=600&type=poster&isUpdating=0`;
}
document.getElementById('posterBtn').addEventListener("click", onPosterCreate)

function onA4Create() {
    window.location.href = `workspace.html?name=title&height=600&width=600&type=a4&isUpdating=0`;
}
document.getElementById('A4PresentBtn').addEventListener("click", onA4Create)

function onA3Create() {
    window.location.href = `workspace.html?name=title&height=600&width=600&type=a3&isUpdating=0`;
}
document.getElementById('A3PresentBtn').addEventListener("click", onA3Create)
function onSearched(event) {
    console.log("hai");
    const menuDiv = document.getElementById("menu");
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.width = "100%";
    div.style.height = "100%";
    menuDiv.innerHTML = "<div onclick='onSavedItemsbackButtonPressed()' style='width:100%;display:flex;align-items:center;margin-top:20px;gap:10px'><a href='../Pages/dashboard.html'><i style='display:flex;align-items:center;height:20px;' class='fa-solid fa-arrow-left'></i></a><h3 >Searched Items<h3></div>";
    menuDiv.appendChild(div);
    menuDiv.style.height = "100%";
    savedItems.map((e) => {
        let ele = event.target;
        if (e.fileName.startsWith(ele.value)) {
            let card = `
            <div class="savedItem" >
            <img src='${e.image}' style="height:20px;width:20px;margin-top:0px" />   
            <h5 style="margin:0px;color:white">${e.fileName}</h5>
            
            </div>
            `;
            div.innerHTML = div.innerHTML + card;
        }
    });
}
//-----------------------logout--------------

document.getElementById('logout').onclick = logout;
function logout() {
    setCookie("loggedIn", "false", 1);
    window.location.href = 'login.html';
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiration in days
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}



// ------------------------profile--------------------------

function toggleMenu() {
    const menu = document.getElementById('popupMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}
document.getElementById('logoutToggle').onclick = toggleMenu;
// Close the menu when clicking outside
document.addEventListener('click', (event) => {
    const menu = document.getElementById('popupMenu');
    const profileIcon = document.querySelector('.profile.pointer');
    if (!menu.contains(event.target) && !profileIcon.contains(event.target)) {
        menu.style.display = 'none';
    }
}); 