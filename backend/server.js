const express = require('express');
const cors = require('cors');

const app = express();

// Allow all origins to prevent any CORS blocking issues
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Main API Route
app.get('/api', (req, res) => {
  res.json({ message: 'Qveto ATS Backend API is running successfully!' });
});

// ... Baki aapke routes (auth, candidates, etc.) yahan aayenge ...