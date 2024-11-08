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
            setCookie("username", email, 1)
            
            setCookie("loggedIn", "true", 1);
            const user = userCredential.user;
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        })
            .catch((error) => {
            const errorCode = error.code;
            password_field.style.borderColor = 'red';
            email_field.style.borderColor = 'red';
            error_password.style.display = 'block';
            if (errorCode === 'auth/wrong-password') {
                error_password.textContent = 'Incorrect password.';
            }
            else if (errorCode === 'auth/user-not-found') {
                error_email.style.display = 'block';
                error_email.textContent = 'Email not found.';
            }
            else {
                error_password.textContent = 'Login failed. Please try again.';
            }
        });
    }
    else {
        email_field.style.borderColor = 'red';
        error_email.style.display = 'block';
    }
}
document.getElementById('login-btn').addEventListener('click', login);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        login();
    }
});
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

//cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Expiration in days
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}