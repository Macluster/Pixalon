import { database } from './Firebase.js';
import { get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

export async function displaySavedFiles() {
    const dbRef = ref(database, '/savedFiles'); // Reference to saved files in Firebase

    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const files = snapshot.val();
            // Extract fileName and fileType for each file
            const fileData = Object.values(files).map(file => ({
                fileName: file.fileName,
                fileType: file.fileType,
                framedata: file.frameData,
                sections: file.sections
            }));
            return fileData; // Return array of objects with fileName and fileType
        } else {
            console.log('No data available');
            return []; // Return empty array if no data is available
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return empty array if there's an error
    }
}
