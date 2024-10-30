import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

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

// Attach event listener for reset button
document.getElementById('reset-btn').addEventListener('click', handleResetPassword);

// Attach event listener for Enter key
document.getElementById('reset-email').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleResetPassword();
    }
});

function handleResetPassword() {
    const email = document.getElementById('reset-email').value.trim();
    const emailField = document.getElementById('reset-email');
    const errorEmail = document.getElementById('error-reset-email');

    // Reset styles and messages
    emailField.style.borderColor = '#8061C3';
    errorEmail.style.display = 'none';

    if (isValidEmail(email)) {
        // Send password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                displayMessage("Reset link sent! Please check your email.", "success");
                emailField.value = "";
            })
            .catch(() => {
                emailField.style.borderColor = 'red';
                errorEmail.style.display = 'block';
                errorEmail.textContent = "Failed to send reset link. Please try again.";
            });
    } else {
        emailField.style.borderColor = 'red';
        errorEmail.style.display = 'block';
        errorEmail.textContent = "Invalid Email Address. Please enter a valid email address.";
    }
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function displayMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.textContent = message;
    messageBox.className = `message ${type}`;
    messageBox.setAttribute("aria-live", "assertive");

    document.body.appendChild(messageBox);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageBox);
    }, 3000);
}
