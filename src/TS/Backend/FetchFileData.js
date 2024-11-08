import { database } from './Firebase.js';
import { get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

export async function fetchFileData(key) {
    console.log(key)
    const dbRef = ref(database, `/savedData/${key}`); // Reference to saved files in Firebase

    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("ttempp="+data)
            return data; // Return array of objects with fileName and fileType
          
        } else {
            console.log('No data available');
            return []; // Return empty array if no data is available
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return empty array if there's an error
    }
}
