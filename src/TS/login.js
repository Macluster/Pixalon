"use strict";
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    if (passwordField && toggleIcon) {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.src = '../../assets/login/Mask group.svg'; // Change to open eye icon
            toggleIcon.title = 'Hide Password'; // Optional: accessibility improvement
        }
        else {
            passwordField.type = 'password';
            toggleIcon.src = '../../assets/login/el_eye-close.svg'; // Change back to closed eye icon
            toggleIcon.title = 'Show Password'; // Optional: accessibility improvement
        }
    }
}
