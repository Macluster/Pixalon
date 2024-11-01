function togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement | null;
    const toggleIcon = document.getElementById('togglePassword') as HTMLImageElement | null;

    if (passwordField && toggleIcon) {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.src = '../../assets/login/Mask group.svg'; // Change to open eye icon
        } else {
            passwordField.type = 'password';
            toggleIcon.src = '../../assets/login/el_eye-close.svg'; // Change back to closed eye icon
        }
    }
}
