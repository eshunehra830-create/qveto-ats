const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for Vercel Frontend
app.use(cors({
  origin: '*', // Production mein apni vercel domain bhi dal sakte ho
  credentials: true
}));

app.use(express.json());

// Main Routes Registeration
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Ensure URL path /api/auth/login banega

// Health check route
app.get('/', (req, res) => {
  res.send('Qveto ATS Backend API is running!');
});

// 404 Fallback Handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found on server` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});