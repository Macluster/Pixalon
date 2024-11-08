"use strict";



class Section extends View {
    constructor(id,width, height, bgColor, content) {
        super(width, height, bgColor, content);
        this.element.id=id
        this.element.classList.add("Section")
        console.log(id)
        let upArrow = document.createElement("div");
       
        upArrow.style.display = "flex";
        upArrow.style.alignItems = "center";  // Center the image vertically
        upArrow.addEventListener('click', function(event) {
            moveSectionUp(id)
        });
        upArrow.innerHTML = `<img src='../../../assets/up-arrow.png' style='height:20px;width:20px;'/>`;

        let downArrow = document.createElement("div");
        
        downArrow.style.display = "flex";
        downArrow.style.alignItems = "center";  // Center the image vertically
        downArrow.innerHTML = `<img src='../../../assets/down-arrow.png' style='height:20px;width:20px;'/>`;
        downArrow.addEventListener('click', function(event) {
            moveSectionDown(id)
        });


        let optionsContainer = document.createElement("div");
        optionsContainer.classList.add("sectionOption")
        optionsContainer.style.display = "flex";
        optionsContainer.style.flexDirection = "column";
        optionsContainer.style.position = "absolute";
        optionsContainer.style.justifyContent = "space-around";
        optionsContainer.style.left = "-50px";
        optionsContainer.style.height = "100px";
        optionsContainer.style.backgroundColor = "white";
        optionsContainer.style.borderRadius = "10px";
        optionsContainer.style.padding = "5px";
        optionsContainer.style.visibility="hidden"

        
        optionsContainer.appendChild(upArrow);
        optionsContainer.appendChild(downArrow);

        this.element.appendChild(optionsContainer);
  
        













    }
}
