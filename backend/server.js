const express = require('express');
const cors = require('cors');
const app = express();

// 1. CORS Allow करें (Vercel और Localhost दोनों के लिए)
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Login Route Example
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // एडमिन क्रेडेंशियल्स चेक करें
  if (email === 'admin@gmail.com' && password === '123456') {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'fake-jwt-token-xyz'
    });
  }

  return res.status(400).json({
    success: false,
    message: 'Invalid email or password'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});