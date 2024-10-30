
const savedItems = [
    {
        image: "../../assets/dashboard/newsletter.svg",
        fileName: "NewsLetter1",
    },
    {
        image: "../../assets/dashboard/poster.svg",
        fileName: "Poster2",
    },
    {
        image: "../../assets/dashboard/A4.svg",
        fileName: "A4",
    }

];





function onSavedItemClicked() {
    const menuDiv = document.getElementById("menu");
    const div = document.createElement("div")
    div.style.display = "flex"
    div.style.flexDirection = "column"
    div.style.alignItems = "center";
    div.style.width = "100%"
    div.style.height = "100%"
    menuDiv!.innerHTML = "<div onclick='onSavedItemsbackButtonPressed()' style='width:100%;display:flex;align-items:center;margin-top:20px;gap:10px'><a href='../Pages/dashboard.html'><i style='display:flex;align-items:center;height:20px;' class='fa-solid fa-arrow-left'></i></a><h3 >Saved items<h3></div>";
    menuDiv!.appendChild(div)
    menuDiv!.style.height = "100%";


    savedItems.map((e) => {

        let card = `
        <div class="savedItem" >
        <img src='${e.image}' style="height:20px;width:20px;margin-top:0px" />   
        <h5 style="margin:0px;color:white">${e.fileName}</h5>
        
        </div>
        `
        div!.innerHTML = div!.innerHTML + card;
    })



}


function onCustomPopupOpened() {
    var popup = document.getElementById('popupContainer')
    popup!.style.display = "flex"
}

function onCustomPopupClosed() {
    var popup = document.getElementById('popupContainer')
    popup!.style.display = "none"
}

function onCustomPresetCreate() {
    const fileName = (document.getElementById("cfilename")!as HTMLInputElement).value
    const width = (document.getElementById("cheight")! as HTMLInputElement).value
    const height = (document.getElementById("cwidth")! as HTMLInputElement).value
    console.log(width);
    console.log(height);


    window.location.href=`workspace.html?name=${fileName}&height=${height}&width=${width}`
}


function onNewsletterCreate() {
  


    window.location.href=`workspace.html?name=title&height=800&width=600`
}


function onPosterCreate() {
  


    window.location.href=`workspace.html?name=title&height=600&width=600`
}

function onSearched(event:Event)
{
    console.log("hai")
    const menuDiv = document.getElementById("menu");
    const div = document.createElement("div")
    div.style.display = "flex"
    div.style.flexDirection = "column"
    div.style.alignItems = "center";
    div.style.width = "100%"
    div.style.height = "100%"
    menuDiv!.innerHTML = "<div onclick='onSavedItemsbackButtonPressed()' style='width:100%;display:flex;align-items:center;margin-top:20px;gap:10px'><a href='../Pages/dashboard.html'><i style='display:flex;align-items:center;height:20px;' class='fa-solid fa-arrow-left'></i></a><h3 >Searched Items<h3></div>";
    menuDiv!.appendChild(div)
    menuDiv!.style.height = "100%";


    savedItems.map((e) => {

        
        let ele=event!.target! as HTMLInputElement
        if(e.fileName.startsWith(ele.value))
        {
            let card = `
            <div class="savedItem" >
            <img src='${e.image}' style="height:20px;width:20px;margin-top:0px" />   
            <h5 style="margin:0px;color:white">${e.fileName}</h5>
            
            </div>
            `
            div!.innerHTML = div!.innerHTML + card;
        }

       
    })

}









