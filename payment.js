document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Simulate payment processing (in a real scenario, you would send this data to a backend for processing)
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
  
    // Display payment response
    const paymentResponse = document.getElementById('paymentResponse');
    paymentResponse.textContent = `Payment successful for card ending with ${cardNumber.slice(-4)}.`;
  });
  