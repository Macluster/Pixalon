 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
 import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

 const analytics = getAnalytics(app);
 const database = getDatabase(app);

 export {app,database}