document.addEventListener('DOMContentLoaded', () => {
  // Check stored theme in localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.body.classList.add(currentTheme);
    document.querySelector('.header').classList.add(currentTheme);
    document.querySelector('.app-container').classList.add(currentTheme);
    if (currentTheme === 'light') {
      document.getElementById('theme-toggle').textContent = 'Switch to Dark Mode';
    } else {
      document.getElementById('theme-toggle').textContent = 'Switch to Light Mode';
    }
  } else {
    document.body.classList.add('dark');
    document.querySelector('.header').classList.add('dark');
    document.querySelector('.app-container').classList.add('dark');
  }
});

// Toggle Theme Function
function toggleTheme() {
  const body = document.body;
  const appContainer = document.querySelector('.app-container');
  const header = document.querySelector('.header');
  const themeToggleButton = document.getElementById('theme-toggle');

  if (body.classList.contains('dark')) {
    body.classList.replace('dark', 'light');
    appContainer.classList.replace('dark', 'light');
    header.classList.replace('dark', 'light');
    themeToggleButton.textContent = 'Switch to Dark Mode';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.replace('light', 'dark');
    appContainer.classList.replace('light', 'dark');
    header.classList.replace('light', 'dark');
    themeToggleButton.textContent = 'Switch to Light Mode';
    localStorage.setItem('theme', 'dark');
  }
}

// Handle Login
function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful!') {
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('home-page').classList.add('active');
        document.getElementById('user-name').textContent = email.split('@')[0];
      } else {
        alert('Invalid email or password.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function handleSignup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validate password confirmation
  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Sign-up successful!') {
        alert('Sign-up successful! Please log in.');
        showLoginPage();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


// Navigation between pages
function showSignupPage() {
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('signup-page').classList.add('active');
}

function showLoginPage() {
  document.getElementById('signup-page').classList.remove('active');
  document.getElementById('login-page').classList.add('active');
}

function showRideForm() {
  document.getElementById('home-page').classList.remove('active');
  document.getElementById('ride-form').classList.add('active');
}

function logout() {
  document.getElementById('login-page').classList.add('active');
  document.getElementById('home-page').classList.remove('active');
  document.getElementById('ride-form').classList.remove('active');
  document.getElementById('confirmation-page').classList.remove('active');
  document.getElementById('loginForm').reset();
}

function resetApp() {
  document.getElementById('confirmation-page').classList.remove('active');
  document.getElementById('ride-form').classList.remove('active');
  document.getElementById('home-page').classList.add('active');
  document.getElementById('rideRequestForm').reset();
}

// Distance data
const distances = {
  "Bengaluru": { "Mysuru": 150, "Mangaluru": 350, "Hubballi": 400 },
  "Mysuru": { "Bengaluru": 150, "Mangaluru": 220 },
  "Mangaluru": { "Bengaluru": 350, "Mysuru": 220 }
};

// Calculate Fare
function calculateFare() {
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const rideType = document.getElementById('rideType').value;
  const isRideShare = document.getElementById('rideShareToggle').checked;
  const numPassengers = parseInt(document.getElementById('numPassengers').value) || 1;

  if (pickup && dropoff && distances[pickup] && distances[pickup][dropoff]) {
    const distance = distances[pickup][dropoff];
    document.getElementById('distance').textContent = distance;

    let baseFare;
    if (rideType === "Economy") {
      baseFare = 10;
    } else if (rideType === "Standard") {
      baseFare = 15;
    } else if (rideType === "Luxury") {
      baseFare = 20;
    }

    let totalFare = baseFare * distance;
    const farePerPassenger = (totalFare / numPassengers).toFixed(2);
    const displayedFare = isRideShare ? farePerPassenger : totalFare.toFixed(2);

    document.getElementById('fare').textContent = displayedFare;
    document.getElementById('fare-estimate').classList.remove('hidden');
  } else {
    alert('Invalid pickup or drop-off location.');
  }
}
function toggleSplitFareFields() {
  const isRideShare = document.getElementById('rideShareToggle').checked;
  const splitFareFields = document.getElementById('splitFareFields');
  if (isRideShare) {
    splitFareFields.classList.remove('hidden');
  } else {
    splitFareFields.classList.add('hidden');
  }
}


// Confirm Ride
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
    document.getElementById('ride-form').classList.remove('active');
    document.getElementById('confirmation-page').classList.add('active');
    initializeMap(pickup);
  } else {
    alert('Please select both pickup and drop-off locations.');
  }
}

// Initialize Map
function initializeMap(pickupLocation) {
  let driverLat, driverLon;

  if (pickupLocation === "Bengaluru") {
    driverLat = 12.9784;
    driverLon = 77.5719;
  } else if (pickupLocation === "Mangaluru") {
    driverLat = 12.8716;
    driverLon = 74.8420;
  } else if (pickupLocation === "Mysuru") {
    driverLat = 12.3084;
    driverLon = 76.6520;
  }

  const map = L.map('map').setView([driverLat, driverLon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const driverMarker = L.marker([driverLat, driverLon]).addTo(map);
  driverMarker.bindPopup("<b>Driver's Live Location</b>").openPopup();
}

function backToBooking() {
  document.getElementById('confirmation-page').classList.remove('active');
  document.getElementById('ride-form').classList.add('active');
}
