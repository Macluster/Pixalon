// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT0XCtY4i9UPkNdecrEkj9IBlNiOBOHCQ",
  authDomain: "pixalon-855e3.firebaseapp.com",
  databaseURL: "https://pixalon-855e3-default-rtdb.firebaseio.com",
  projectId: "pixalon-855e3",
  storageBucket: "pixalon-855e3.appspot.com",
  messagingSenderId: "160827854902",
  appId: "1:160827854902:web:34c78c8cc101ecc9b90897",
  measurementId: "G-E5GTXC8MZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const database = getDatabase(app);
const auth = getAuth(app);

// Export the services so they can be used in other files
export { app, database, auth };
