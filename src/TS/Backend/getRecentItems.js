import { database } from './Firebase.js';
import { get ,ref} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";



async function getRecentFiles() {

    const dbRef = ref(database, '/savedFiles'); // Specify the path to the data you want
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
           // console.log(snapshot.val()); // The data is stored in snapshot.val()
            //return snapshot.val()
            return snapshot.val()
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export default getRecentFiles






