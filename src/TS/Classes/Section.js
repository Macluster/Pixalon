"use strict";



class Section extends View {
    constructor(id,width, height, bgColor, content) {
        super(width, height, bgColor, content);
        this.element.id=id
        this.element.classList.add("Section")
        console.log(id)
        this.upArrow = document.createElement("div");
        this.upArrow.classList.add("sectionUpArrow")
        this.upArrow.style.display = "flex";
        this.upArrow.style.alignItems = "center";  // Center the image vertically
       
        this.upArrow.innerHTML = `<img src='https://cdn-icons-png.flaticon.com/128/626/626075.png' style='height:20px;width:20px;'/>`;
        this.addUpArrowListener(id)


        this.downArrow = document.createElement("div");
        this.downArrow.classList.add("sectionDownArrow")
        
        this.downArrow.style.display = "flex";
        this.downArrow.style.alignItems = "center";  // Center the image vertically
        this.downArrow.innerHTML = `<img src='https://cdn-icons-png.flaticon.com/128/608/608258.png' style='height:20px;width:20px;'/>`;
        this.addDownArrowListener(id)

        this.deleteSection = document.createElement("div");
        this.deleteSection.classList.add("sectionDeleteBtn")
        this.deleteSection.style.display = "flex";
        this.deleteSection.style.alignItems = "center";  // Center the image vertically
        this.deleteSection.innerHTML = `<img src='https://cdn-icons-png.flaticon.com/128/484/484662.png' style='height:20px;width:20px;'/>`;
        this.adddeleteListener(id)

       
        this.optionsContainer = document.createElement("div");
        this.optionsContainer.classList.add("sectionOption")
        this.optionsContainer.style.display = "flex";
        this. optionsContainer.style.flexDirection = "column";
        this.optionsContainer.style.position = "absolute";
        this. optionsContainer.style.justifyContent = "space-around";
        this.optionsContainer.style.left = "-50px";
        this.optionsContainer.style.height = "100px";
        this.optionsContainer.style.backgroundColor = "white";
        this.optionsContainer.style.borderRadius = "10px";
        this.optionsContainer.style.padding = "5px";
        this.optionsContainer.style.visibility="hidden"

        
        this.optionsContainer.appendChild(this.upArrow);
        this.optionsContainer.appendChild(this.deleteSection);
        this.optionsContainer.appendChild(this.downArrow);

        this.element.appendChild(this.optionsContainer);
  
        













    }

    addUpArrowListener(id)
    {
        this.upArrow.addEventListener('click', function(event) {
            moveSectionUp(id)
        });
    }
    
addDownArrowListener(id)
{
    this.downArrow.addEventListener('click', function(event) {
        moveSectionDown(id)
    });
}
adddeleteListener(id)
{
    this.deleteSection.addEventListener('click', function(event) {
        deleteSection1(id)
    });
}

}