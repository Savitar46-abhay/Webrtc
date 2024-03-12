document.addEventListener('DOMContentLoaded', () => {
    const governmentForm = document.getElementById('governmentForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    governmentForm.addEventListener('submit', event => {
        event.preventDefault();

        // Perform validation
        const name = governmentForm.name.value.trim();
        const idNumber = governmentForm.idNumber.value.trim();
        const dob = governmentForm.dob.value.trim();
        const email = governmentForm.email.value.trim();
        const password = governmentForm.password.value.trim();

        if (name === '' || idNumber === '' || dob === '' || email === '' || password === '') {
            errorMessage.textContent = 'Please fill out all fields.';
        } else {
            // Perform verification process (dummy process for demonstration)
            // This could involve sending data to a server for verification

            // Display success message
            successMessage.textContent = 'Your information has been successfully verified.';
            // Clear form fields
            governmentForm.reset();
            // Clear error message if any
            errorMessage.textContent = '';
        }
    });
});
