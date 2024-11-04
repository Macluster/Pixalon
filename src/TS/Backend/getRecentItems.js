import { database } from './Firebase.js';
import { get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

export async function getRecentFiles() {
    const dbRef = ref(database, '/savedFiles');

    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const files = snapshot.val();
            // Convert the files object to an array and include timestamp for sorting
            const fileData = Object.values(files)
                .map(file => ({
                    fileName: file.fileName,
                    fileType: file.fileType,
                    frameData: file.frameData,
                    sections: file.sections,
                    createdDate: file.createdDate,
                    createdTime: file.time,
                    // Create a sortable timestamp from createdDate and createdTime
                    timestamp: new Date(`${file.createdDate}T${file.time}`).getTime()
                }));

            // Sort the files by the timestamp in descending order (latest first)
            fileData.sort((a, b) => b.timestamp - a.timestamp);

            // Return the first four files (latest)
            return fileData.slice(0, 4);
        } else {
            console.log('No data available');
            return { message: 'No data available', data: [] };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return { message: 'Error fetching data', data: [] };
    }
}
