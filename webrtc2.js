document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const hangupButton = document.getElementById('hangupButton');
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const videoCallContainer = document.querySelector('.video-call-container');

    startButton.addEventListener('click', startCall);
    hangupButton.addEventListener('click', hangUp);

    function startCall() {
        // Display the video call container
        videoCallContainer.classList.remove('hidden');

        // Placeholder for WebRTC code to start the call
        // Replace this with your actual WebRTC implementation
        console.log('Starting call...');

        startButton.classList.add('hidden');
        hangupButton.classList.remove('hidden');
    }

    function hangUp() {
        // Placeholder for WebRTC code to hang up the call
        // Replace this with your actual WebRTC implementation
        console.log('Ending call...');

        videoCallContainer.classList.add('hidden');
        startButton.classList.remove('hidden');
        hangupButton.classList.add('hidden');
    }
});
