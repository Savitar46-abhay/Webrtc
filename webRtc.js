const startButton = document.getElementById('startButton');
const hangupButton = document.getElementById('hangupButton');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let remoteStream;
let localPeerConnection;
let remotePeerConnection;

startButton.addEventListener('click', startCall);
hangupButton.addEventListener('click', hangUp);

async function startCall() {
    try {
        // Get local media stream
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        // Create local peer connection
        localPeerConnection = new RTCPeerConnection();
        localStream.getTracks().forEach(track => localPeerConnection.addTrack(track, localStream));

        // Create remote peer connection
        remotePeerConnection = new RTCPeerConnection();

        // Add local stream to remote peer connection
        localPeerConnection.onicecandidate = event => handleIceCandidate(event, remotePeerConnection);
        remotePeerConnection.onicecandidate = event => handleIceCandidate(event, localPeerConnection);

        remotePeerConnection.ontrack = event => handleRemoteTrack(event);

        // Offer SDP to remote peer
        const offer = await localPeerConnection.createOffer();
        await localPeerConnection.setLocalDescription(offer);
        await remotePeerConnection.setRemoteDescription(offer);

        const answer = await remotePeerConnection.createAnswer();
        await remotePeerConnection.setLocalDescription(answer);
        await localPeerConnection.setRemoteDescription(answer);

        startButton.disabled = true;
        hangupButton.disabled = false;
    } catch (error) {
        console.error('Error starting call:', error);
    }
}

function handleIceCandidate(event, peer) {
    const candidate = event.candidate;
    if (candidate) {
        peer.addIceCandidate(candidate)
            .catch(error => console.error('Error adding ice candidate:', error));
    }
}

function handleRemoteTrack(event) {
    remoteStream = event.streams[0];
    remoteVideo.srcObject = remoteStream;
}

function hangUp() {
    localPeerConnection.close();
    remotePeerConnection.close();
    localPeerConnection = null;
    remotePeerConnection = null;
    hangupButton.disabled = true;
    startButton.disabled = false;
}
