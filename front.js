document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        if (username === '' || password === '') {
            errorMessage.textContent = 'Please enter both username and password.';
        } else {
            // Perform login logic here (e.g., send data to server)
            errorMessage.textContent = '';
            alert(`Logged in successfully! Welcome, ${username}!`);
            loginForm.reset();
        }
    });
});
