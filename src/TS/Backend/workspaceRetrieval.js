// Retrieve frameData and sections from localStorage
const frameData = localStorage.getItem('frameData');
const sections = localStorage.getItem('sections');

const workSpaceElement = document.getElementById('work-space');

if (frameData) {
    // Create a temporary div to parse the frameData
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = frameData; // Set the innerHTML to frameData

    // Append the parsed frameData to work-space
    workSpaceElement.appendChild(tempDiv);

    // Handle sections if they exist
    if (sections) {
        const parsedSections = JSON.parse(sections); // Parse sections back to an object
        
        // Find the main frame (assuming the ID is unique)
        const frameElement = tempDiv.querySelector('.movable'); // Select the movable frame

        if (frameElement) {
            parsedSections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'section'; // Add class for styling
                sectionDiv.innerHTML = section.data; // Assuming section has a data property

                // Append each section to the frame
                frameElement.appendChild(sectionDiv);
            });
        } else {
            console.error('Frame element not found'); // Handle case where frame is not found
        }
    }
} else {
    console.error('Frame data not found'); // Handle case where frameData is not available
}

// Clear localStorage if no longer needed
localStorage.removeItem('frameData');
localStorage.removeItem('sections');