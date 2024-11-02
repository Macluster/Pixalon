import { database } from './Firebase.js';
import { get, ref, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

export async function fetchRecentData() {
    const recentDataRef = ref(database, '/recentData'); // Reference to the recent data path in Firebase

    try {
        // Query to get the last 4 items based on timestamp
        const recentDataQuery = query(recentDataRef, orderByChild('timestamp'), limitToLast(4));
        const snapshot = await get(recentDataQuery);

        if (snapshot.exists()) {
            // Extract data and order it in descending order of timestamps
            const recentItems = Object.values(snapshot.val()).sort((a, b) => b.timestamp - a.timestamp);
            console.log('recentItems:', recentItems); // Log the recent items to the console
            return recentItems; // Return an array of the 4 most recent items
        } else {
            console.log('No recent data available');
            return []; // Return empty array if no data is available
        }
    } catch (error) {
        console.error('Error fetching recent data:', error);
        return []; // Return empty array if there's an error
    }
}
