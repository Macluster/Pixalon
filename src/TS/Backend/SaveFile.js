import {app,database} from './Firebase.js'
import {  ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// Reference to the 'users' node in the 


function addData()
{

    const userRef = ref(database);

    // Write an object with user details
    set(userRef, {
      username: 'deepakdenny',
      email: 'deepak@example.com',
      profile_picture: 'http://example.com/profile_picture.png'
    })
      .then(() => {
        console.log('User data written successfully!');
      })
      .catch((error) => {
        console.error('Error writing user data:', error);
      });
    
}

addData()
