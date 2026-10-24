const express = require('express');
const cors = require('cors');

const app = express();

// 1. CORS allow all origins & methods explicitly
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OPTIONS preflight handling
app.options('*', cors());

// Health Check
app.get('/', (req, res) => {
  res.send('Server is active!');
});

// Admin Bypass Route
app.post(['/api/login', '/api/auth/login', '/api/users/login'], (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Login successful",
    token: "fake-jwt-token-123",
    user: { email: "eshunehra089@gmail.com", role: "admin" }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});