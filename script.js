document.addEventListener('DOMContentLoaded', () => {
  // Display login page initially
  document.getElementById('login-page').classList.add('active');
});

// Handle login functionality
function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    // Simulate successful login
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
    document.getElementById('user-name').textContent = email.split('@')[0];
  } else {
    alert('Please enter valid login details.');
  }
}

// Show ride booking form
function showRideForm() {
  document.getElementById('home-page').classList.remove('active');
  document.getElementById('ride-form').classList.add('active');
}

// Handle logout functionality
function logout() {
  document.getElementById('home-page').classList.remove('active');
  document.getElementById('login-page').classList.add('active');
}

// Calculate fare based on ride type
// Calculate fare based on ride type
function calculateFare() {
  const rideType = document.getElementById('rideType').value;
  let fare;

  // Basic fare calculation logic based on ride type
  if (rideType === "Economy") {
    fare = 200; // INR for Economy ride
  } else if (rideType === "Standard") {
    fare = 300; // INR for Standard ride
  } else if (rideType === "Luxury") {
    fare = 500; // INR for Luxury ride
  }

  // Display the calculated fare
  document.getElementById('fare').textContent = fare;
  document.getElementById('fare-estimate').classList.remove('hidden');
}

// Confirm ride and show summary
function confirmRide() {
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const rideType = document.getElementById('rideType').value;

  if (pickup && dropoff) {
    document.getElementById('rideSummary').innerHTML = `
      <p><strong>Pickup:</strong> ${pickup}</p>
      <p><strong>Drop-off:</strong> ${dropoff}</p>
      <p><strong>Ride Type:</strong> ${rideType}</p>
    `;

    // Navigate to confirmation page
    document.getElementById('ride-form').classList.remove('active');
    document.getElementById('confirmation-page').classList.add('active');
  } else {
    alert('Please select both pickup and drop-off locations.');
  }
}

// Reset the app for a new booking
function resetApp() {
  document.getElementById('confirmation-page').classList.remove('active');
  document.getElementById('home-page').classList.add('active');
}
const distances = {
  "Bengaluru": {
    "Mysuru": 150,
    "Mangaluru": 350,
    "Hubballi": 400,
    "Belagavi": 500,
    "Davangere": 270,
    // Add other cities
  },
  "Mysuru": {
    "Bengaluru": 150,
    "Mangaluru": 220,
    "Hubballi": 280,
    "Belagavi": 370,
    // Add other cities
  },
  // Add more cities...
};
// Calculate fare based on distance and ride type
function calculateFare() {
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const rideType = document.getElementById('rideType').value;

  // Check if pickup and dropoff are valid
  if (pickup && dropoff && distances[pickup] && distances[pickup][dropoff]) {
    const distance = distances[pickup][dropoff]; // Distance between pickup and dropoff
    document.getElementById('distance').textContent = distance;

    let baseFare;
    if (rideType === "Economy") {
      baseFare = 10; // ₹ per km for Economy
    } else if (rideType === "Standard") {
      baseFare = 15; // ₹ per km for Standard
    } else if (rideType === "Luxury") {
      baseFare = 20; // ₹ per km for Luxury
    }

    // Calculate total fare based on distance and ride type
    const totalFare = baseFare * distance;

    // Display the calculated fare
    document.getElementById('fare').textContent = totalFare;
    document.getElementById('fare-estimate').classList.remove('hidden');
  } else {
    alert('Invalid pickup or drop-off location.');
  }
}

