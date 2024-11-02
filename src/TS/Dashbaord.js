"use strict";
import {displaySavedFiles} from './Backend/savedItems.js';
import {getRecentFiles} from './Backend/getRecentItems.js'


let recentData=[
    
]

async function getRecentData() {
    recentData = await getRecentFiles(); 

    const names = recentData.map(file => file.fileName);

    // Loop from 1 to 4 (inclusive) to match the naming convention of the IDs
    for (let i = 1; i <= 4; i++) {
        const id = "recent_name" + i;  
        const name = names[i - 1]; // Adjust index to match names array
        console.log(id);
        const string = name ;
        
        // Get the element by ID
        const element = document.getElementById(id);
        
        // Check if the element exists and if there is a corresponding name
        if (element && name) {
            element.innerHTML = string; // Set the value of the input element
            console.log(name); // Log the name for debugging
        }
        else{
            document.getElementById("recent_box" + i).style.display = "none";
            element.style.display = "none";
        }
    } 
}

getRecentData()

const onSavedItemClicked = document.getElementById('onSavedItemClicked');
onSavedItemClicked.addEventListener("click", async function() {
    
    const savedFiles = await displaySavedFiles(); // Fetch data from Firebase
    const menuDiv = document.getElementById("menu");
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.width = "100%";
    div.style.height = "100%";
    
    menuDiv.innerHTML = "<div onclick='onSavedItemsbackButtonPressed()' style='width:100%;display:flex;align-items:center;margin-top:20px;gap:10px'><a href='../Pages/dashboard.html'><i style='display:flex;align-items:center;height:20px;' class='fa-solid fa-arrow-left'></i></a><h3>Saved items</h3></div>";
    menuDiv.appendChild(div);
    menuDiv.style.height = "100%";

    
    savedFiles.forEach(({ fileName, fileType }) => {

        let imgSrc;

        // Set image source based on file type
        switch(fileType){
            case "newsletter":
                imgSrc = "../../assets/dashboard/newsletter.svg"; 
                break;
            case "poster":
                imgSrc = "../../assets/dashboard/poster.svg"; 
                break;
            case "a3":
                imgSrc = "../../assets/dashboard/A3.svg"; 
                break;
            case "a4":
                imgSrc = "../../assets/dashboard/A4.svg"; 
                break;
            case "custom":
                imgSrc = "../../assets/dashboard/custom.svg"; 
                break;
            default:
                imgSrc = "../../assets/dashboard/default.svg";
                break;


        }




        const card = `
        <div class="savedItem">
            <img src='${imgSrc}' style="height:20px;width:20px;margin-top:0px" />
            <h5 style="margin:0px;color:white">${fileName}</h5>
        </div>`;
        div.innerHTML += card;

       
    });
});


const onCustomPopupOpened = document.getElementById('onCustomPopupOpened');
onCustomPopupOpened.addEventListener('click',function onCustomPopupOpened() {
    var popup = document.getElementById('popupContainer');
    popup.style.display = "flex";
})

const onCustomPopupClosed = document.getElementById('onCustomPopupClosed');
onCustomPopupClosed.addEventListener('click',function onCustomPopupClosed() {
    var popup = document.getElementById('popupContainer');
    popup.style.display = "none";
})

function onCustomPresetCreate() {
    const fileName = document.getElementById("cfilename").value;
    const width = document.getElementById("cheight").value;
    const height = document.getElementById("cwidth").value;
    console.log(width);
    console.log(height);
    window.location.href = `workspace.html?name=${fileName}&height=${height}&width=${width}&type=custom`;
}
document.getElementById('popupPresetBtn').addEventListener("click",onCustomPresetCreate)

function onNewsletterCreate() {
    window.location.href = `workspace.html?name=title&height=800&width=600&type=newsletter`;
}
document.getElementById('newsletterBtn').addEventListener("click",onNewsletterCreate)

function onPosterCreate() {
    window.location.href = `workspace.html?name=title&height=600&width=600&type=poster`;
}
document.getElementById('posterBtn').addEventListener("click",onPosterCreate)

function onA4Create() {
    window.location.href = `workspace.html?name=title&height=600&width=600&type=a4`;
}
document.getElementById('A4PresentBtn').addEventListener("click",onA4Create)

function onA3Create() {
    window.location.href = `workspace.html?name=title&height=600&width=600&type=a3`;
}
document.getElementById('A3PresentBtn').addEventListener("click",onA3Create)
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





// ------------------------profile--------------------------

function toggleMenu() {
    const menu = document.getElementById('popupMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Close the menu when clicking outside
document.addEventListener('click', (event) => {
    const menu = document.getElementById('popupMenu');
    const profileIcon = document.querySelector('.profile.pointer');
    if (!menu.contains(event.target) && !profileIcon.contains(event.target)) {
        menu.style.display = 'none';
    }
}); 