const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock user data
const users = [
  { email: 'user1@example.com', password: 'password123' },
  { email: 'user2@example.com', password: 'password456' },
];

// Mock ride data
const rides = [];

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful!', email });
  } else {
    res.status(401).json({ message: 'Invalid email or password.' });
  }
});

// Book ride route
app.post('/book-ride', (req, res) => {
  const { email, pickup, dropoff, rideType } = req.body;

  if (pickup && dropoff && rideType) {
    const newRide = { email, pickup, dropoff, rideType, id: rides.length + 1 };
    rides.push(newRide);

    res.status(200).json({ message: 'Ride booked successfully!', ride: newRide });
  } else {
    res.status(400).json({ message: 'Please provide all required fields.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
