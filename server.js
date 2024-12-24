const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// User data storage
const users = [{ email: 'user1@example.com', password: 'password123' }];

// Rides array to store ride requests
const rides = [];

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful!', email });
  } else {
    res.status(401).json({ message: 'Invalid email or password.' });
  }
});

// Sign-Up route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    res.status(400).json({ message: 'User already exists.' });
  } else {
    users.push({ email, password });
    res.status(201).json({ message: 'Sign-up successful!' });
  }
});

// Book ride route
app.post('/book-ride', (req, res) => {
  const { email, pickup, dropoff, rideType } = req.body;

  if (pickup && dropoff && rideType) {
    const newRide = {
      id: rides.length + 1,
      email,
      pickup,
      dropoff,
      rideType,
      status: 'pending',
    };
    rides.push(newRide);
    res.status(200).json({ message: 'Ride booked successfully!', ride: newRide });
  } else {
    res.status(400).json({ message: 'Please provide all required fields.' });
  }
});

// Fetch all rides for a user
app.get('/rides', (req, res) => {
  const { email } = req.query;
  const userRides = rides.filter((ride) => ride.email === email);

  if (userRides.length > 0) {
    res.status(200).json({ rides: userRides });
  } else {
    res.status(404).json({ message: 'No rides found for this user.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
