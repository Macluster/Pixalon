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

function login() {
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');

    // Reset styles and error messages for specific fields
    if (email) emailField.style.borderColor = '#8061C3';
    if (password) passwordField.style.borderColor = '#8061C3';
    errorEmail.style.display = 'none';
    errorPassword.style.display = 'none';

    // Check for empty fields
    if (!email || !password) {
        if (!email) {
            emailField.style.borderColor = 'red';
            errorEmail.style.display = 'block';
            errorEmail.textContent = 'Email is required.';
        }
        if (!password) {
            passwordField.style.borderColor = 'red';
            errorPassword.style.display = 'block';
            errorPassword.textContent = 'Password is required.';
        }
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        emailField.style.borderColor = 'red';
        errorEmail.style.display = 'block';
        errorEmail.textContent = 'Please enter a valid email address.';
        return;
    }

    // Firebase authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Redirect to the dashboard page
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            emailField.style.borderColor = 'red';
            passwordField.style.borderColor = 'red';
            errorPassword.style.display = 'block';

            // Handle specific Firebase authentication errors
            if (errorCode === 'auth/wrong-password') {
                errorPassword.textContent = 'Incorrect password.';
            } else if (errorCode === 'auth/user-not-found') {
                errorEmail.style.display = 'block';
                errorEmail.textContent = 'Email not found.';
            } else {
                errorPassword.textContent = 'Login failed. Please try again.';
            }
        });
}

// Event listeners for login button and Enter key
document.getElementById('login-btn').addEventListener('click', login);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        login();
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
