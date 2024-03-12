document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.getElementById('home');

    redirectButton.addEventListener('click', () => {
        // Change window location to the desired URL
        window.location.href = 'https://www.example.com/another-page';
    });
});