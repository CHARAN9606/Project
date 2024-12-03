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

// Logout functionality
function logout() {
  // Reset the UI and forms
  document.getElementById('login-page').classList.add('active');
  document.getElementById('home-page').classList.remove('active');
  document.getElementById('ride-form').classList.remove('active');
  document.getElementById('confirmation-page').classList.remove('active');
  document.getElementById('loginForm').reset();
  document.getElementById('rideRequestForm').reset();
}

// Reset application for a new booking
function resetApp() {
  // Hide confirmation page and show home page
  document.getElementById('confirmation-page').classList.remove('active');
  document.getElementById('ride-form').classList.remove('active');
  document.getElementById('home-page').classList.add('active');

  // Reset ride booking form
  document.getElementById('rideRequestForm').reset();
  document.getElementById('fare-estimate').classList.add('hidden');
}

// Distances between cities
const distances = {
  "Bengaluru": { "Mysuru": 150, "Mangaluru": 350, "Hubballi": 400, "Belagavi": 500, "Davangere": 270 },
  "Mysuru": { "Bengaluru": 150, "Mangaluru": 220, "Hubballi": 280, "Belagavi": 370 },
  "Mangaluru": { "Bengaluru": 350, "Mysuru": 220, "Hubballi": 300, "Belagavi": 400 },
};

// Calculate fare based on distance and ride type
function calculateFare() {
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const rideType = document.getElementById('rideType').value;

  if (pickup && dropoff && distances[pickup] && distances[pickup][dropoff]) {
    const distance = distances[pickup][dropoff];
    document.getElementById('distance').textContent = distance;

    let baseFare;
    if (rideType === "Economy") {
      baseFare = 10; // ₹ per km for Economy
    } else if (rideType === "Standard") {
      baseFare = 15; // ₹ per km for Standard
    } else if (rideType === "Luxury") {
      baseFare = 20; // ₹ per km for Luxury
    }

    const totalFare = baseFare * distance;
    document.getElementById('fare').textContent = totalFare;
    document.getElementById('fare-estimate').classList.remove('hidden');
  } else {
    alert('Invalid pickup or drop-off location.');
  }
}

// Confirm ride and show ride summary
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

    // Initialize the map with driver's live location
    initializeMap(pickup);
  } else {
    alert('Please select both pickup and drop-off locations.');
  }
}

// Initialize the map
function initializeMap(pickupLocation) {
  let driverLat, driverLon;

  // Set driver's location based on pickup location
  if (pickupLocation === "Bengaluru") {
    driverLat = 12.9784;
    driverLon = 77.5719; // Bengaluru coordinates
  } else if (pickupLocation === "Mangaluru") {
    driverLat = 12.8716;
    driverLon = 74.8420; // Mangaluru coordinates
  } 
  else if (pickupLocation === "Mysuru") {
    driverLat = 12.3084;
    driverLon = 76.6520; // Mysuru coordinates
  } 
  else  {
    driverLat = 12.9136;
    driverLon = 75.7046; // Default: Ujire
  }

  // Initialize Leaflet map
  const map = L.map('map').setView([driverLat, driverLon], 13);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add a marker for the driver
  const driverMarker = L.marker([driverLat, driverLon]).addTo(map);
  driverMarker.bindPopup("<b>Driver's Live Location</b>").openPopup();
}
