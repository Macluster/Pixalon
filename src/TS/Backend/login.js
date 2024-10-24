import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";


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

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Login function
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const password_field = document.getElementById('password');
    password_field.style.borderColor = '#8061C3';
    const email_field = document.getElementById('username');
    email_field.style.borderColor = '#8061C3';
    const error_password = document.getElementById('error-password');
    error_password.style.display = 'none';
    const error_email = document.getElementById('error-email');
    error_email.style.display = 'none';

    if (isValidEmail(email)) {
        console.log("Valid email");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            password_field.style.borderColor = 'red';
            email_field.style.borderColor = 'red';
            error_password.style.display = 'block';
        })
        .finally(() => {
            loadingIndicator.style.display = 'none'; // Hide loading indicator
        });
    } else {
        email_field.style.borderColor = 'red';
        error_email.style.display = 'block';
    }
});


function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}