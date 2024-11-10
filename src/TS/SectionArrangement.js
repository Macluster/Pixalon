function moveSectionUp(id) {
   
    console.log("Moving section up");
    console.log(id)
    for (let i = 0; i < sectionArraylist.length; i++) {
        if (sectionArraylist[i].element.id == id) {
            if (i === 0) {
                console.log("This section is already at the top, can't move up.");
                return; // Avoid out of bounds error
            }

            // Swap the top positions of the current section and the previous one
           
           
            sectionArraylist[i].element.style.top = sectionArraylist[i - 1].element.style.top;
            let bottom = (parseInt( sectionArraylist[i].element.style.top) || 0) + parseInt( sectionArraylist[i].element.style.height.split("p")[0])
            sectionArraylist[i - 1].element.style.top = bottom+"px";

            // Swap the sections in the array as well
            let section = sectionArraylist[i];
            sectionArraylist[i] = sectionArraylist[i - 1];
            sectionArraylist[i - 1] = section;
            break; // Exit loop once the section is found and moved
        }
    }
}

function moveSectionDown(id) {
    console.log("Moving section down");
    for (let i = 0; i < sectionArraylist.length; i++) {
        if (sectionArraylist[i].element.id == id) {
            if (i === sectionArraylist.length - 1) {
                console.log("This section is already at the bottom, can't move down.");
                return; // Avoid out of bounds error
            }

          


            sectionArraylist[i+1].element.style.top = sectionArraylist[i].element.style.top;
            let bottom = (parseInt( sectionArraylist[i+1].element.style.top) || 0) + parseInt( sectionArraylist[i+1].element.style.height.split("p")[0])
            console.log("botommm="+bottom)
            sectionArraylist[i].element.style.top = bottom+"px";

            // Swap the sections in the array as well
            let section = sectionArraylist[i];
            sectionArraylist[i] = sectionArraylist[i + 1];
            sectionArraylist[i +1] = section;
            break; // Exit loop once the section is found and moved
        }
    }
}

function deleteSection1(id) {
    
    for (let i = 0; i < sectionArraylist.length; i++) {
        if (sectionArraylist[i].element.id == id) {
            if (i === sectionArraylist.length - 1) {
                console.log("This section is already at the bottom, can't move down.");
                return; // Avoid out of bounds error
            }

          


         //   sectionArraylist[i+1].element.style.top = sectionArraylist[i].element.style.top;
            // let bottom = (parseInt( sectionArraylist[i+1].element.style.top) || 0) + parseInt( sectionArraylist[i+1].element.style.height.split("p")[0])
            // console.log("botommm="+bottom)
            // sectionArraylist[i].element.style.top = bottom+"px";

            // Swap the sections in the array as well

            let idToBeDeleted=sectionArraylist[i].element.id;
            for(let j=i;j<sectionArraylist.length;j++)
            {
                
                if(sectionArraylist[j]!=sectionArraylist.length-1)
                {
                    sectionArraylist[j+1].element.style.top = sectionArraylist[j].element.style.top;

                    sectionArraylist[j] = sectionArraylist[j + 1];
                }
                   
               
            }
            sectionArraylist.length=sectionArraylist.length-1;
            console.log(idToBeDeleted)

            document.getElementById(idToBeDeleted).remove()
           
            break; // Exit loop once the section is found and moved
        }
    }
}
