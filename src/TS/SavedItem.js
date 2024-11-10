import { displaySavedFiles } from './Backend/savedItems.js';

async function loadSavedItems()
{

    let savedFiles = []


    savedFiles = await displaySavedFiles();





   
    const div = document.getElementById("savedItemDisplayGrid")

    

   
  

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
        card.classList.add("savedItemCard")
        card.innerHTML = `
        <div >
            <img src="${imgSrc}" style="height:50px;width:50px"  />
             <h5 style="margin:0px;color:black">${fileName}</h5>
        </div>

            
           
        `;

        // Add click event to redirect to another page with query parameters
        card.addEventListener("click", () => {
            // Log frameData and sections for reference
            // console.log('Frame Data:', frameData);
            // console.log('Sections:', sections);


            localStorage.setItem('fileKey', uid);


            // Redirect to workspace.html
            window.location.href = `workspace.html?name=${fileName}&height=${0}&width=${0}&type=${fileType}&isUpdating=1&id=${uid}&isTempalate=0`;
        });


        div.appendChild(card);

    });
}
loadSavedItems()
