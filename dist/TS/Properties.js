"use strict";
function onBackgroundChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.backgroundColor = target.value;
    }
}
function onCornerRadiusChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.borderRadius = `${target.value}px`;
    }
}
function onHeightChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.height = `${target.value}px`;
    }
}
function onWidthChanged(event) {
    const target = event.target;
    console.log(target.value);
    const view = document.getElementById(currentSelectedContainer);
    console.log(view);
    if (view) {
        view.style.width = `${target.value}px`;
    }
}
function selectBackgroundImage() {
    const fileInput = document.getElementById("backgroundImage");
    const preview = document.getElementById(currentSelectedContainer);
    fileInput.addEventListener("change", async (event) => {
        const target = event.target;
        const file = target.files?.[0];
        if (file && preview) {
            const imageUrl = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.style.backgroundRepeat = "no-repeat";
                preview.style.backgroundSize = "cover";
                if (e.target?.result) {
                    preview.style.backgroundImage = `url('${e.target.result}')`;
                }
            };
            reader.readAsDataURL(file);
        }
    });
    fileInput.click();
}
function fontSizeChanged(event) {
    const target = event.target;
}




const dropdownButton = document.getElementById('dropdownButton');
  const dropdownLinks = document.querySelectorAll('.dropdown-content a');

  // Add event listeners to each link
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default link behavior
      const selectedValue = this.getAttribute('data-value'); // Get the value from data-value attribute
      dropdownButton.firstChild.textContent = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1); // Set the button text
    });
  });




  document.getElementById("export").addEventListener("click", function() {
    document.getElementById("exportModal").style.display = "block";
  });
  
  // Close the modal when the close button is clicked
  document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("exportModal").style.display = "none";
  });
  
  // Perform export when the "Export Format" button is clicked
  document.getElementById("exportFormat").addEventListener("click", function() {
    const fileName = document.getElementById("fileName").value;
    const size = document.getElementById("size").value;
    const format = document.getElementById("format").value;
  
    // Here, you can implement your export logic based on the entered values
    if (fileName && size && format) {
        alert(`Exporting file: ${fileName} with size: ${size} and format: ${format}`);
        
        // Call the function that handles the actual file export logic
        exportFile(fileName, size, format);
    } else {
        alert("Please fill in all fields.");
    }
  
    // Hide modal after export
    document.getElementById("exportModal").style.display = "none";
  });
  
  function exportFile(fileName, size, format) {
    // Implement the actual export logic (e.g., downloading the file)
    console.log(`File ${fileName} of size ${size} and format ${format} is being exported.`);
  }
  