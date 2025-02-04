// testServer.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Use a different port for the test server

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for requests (for demonstration purposes)
let requests = [];

// Route to submit a help request
app.post('/api/requests', (req, res) => {
    const { name, phone, location, message } = req.body;

    // Validate input
    if (!name || !phone || !location || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new request
    const newRequest = {
        id: requests.length + 1,
        name,
        phone,
        location,
        message,
        createdAt: new Date(),
    };

    // Save the request
    requests.push(newRequest);
    res.status(201).json(newRequest);
});

// Route to get all help requests
app.get('/api/requests', (req, res) => {
    res.json(requests);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Test server is running on http://localhost:${PORT}`);
});node testServer.js