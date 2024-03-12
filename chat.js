const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messagesContainer = document.getElementById('messages');

// Replace these with your signaling server URL and port
const SIGNALING_SERVER_URL = 'ws://your-signaling-server-url';
const SIGNALING_SERVER_PORT = 8080;

// Initialize WebRTC
const rtcPeerConnection = new RTCPeerConnection();

// Function to send a message via WebRTC data channel
function sendMessage(message) {
  const dataChannel = rtcPeerConnection.createDataChannel('chat');
  dataChannel.onopen = () => {
    dataChannel.send(message);
  };
}

sendMessageBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    messagesContainer.innerHTML += `<div>You: ${message}</div>`;
    sendMessage(message);
    messageInput.value = '';
  }
});

// Handle incoming messages via WebRTC data channel
rtcPeerConnection.ondatachannel = (event) => {
  const dataChannel = event.channel;
  dataChannel.onmessage = (event) => {
    const message = event.data;
    messagesContainer.innerHTML += `<div>Client: ${message}</div>`;
  };
};

// Connect to signaling server
const signalingServer = new WebSocket(`${SIGNALING_SERVER_URL}:${SIGNALING_SERVER_PORT}`);
signalingServer.onopen = () => {
  console.log('Connected to signaling server');
};

// Handle signaling server messages
signalingServer.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === 'offer') {
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(message));
    rtcPeerConnection.createAnswer()
      .then(answer => rtcPeerConnection.setLocalDescription(answer))
      .then(() => {
        signalingServer.send(JSON.stringify(rtcPeerConnection.localDescription));
      });
  } else if (message.type === 'answer') {
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(message));
  } else if (message.type === 'candidate') {
    rtcPeerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
  }
};
