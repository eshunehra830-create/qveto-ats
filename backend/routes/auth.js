const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation test (Yahan apna user verify logic laga sakte ho)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Success Response
    return res.status(200).json({
      message: 'Login successful',
      user: { email },
      token: 'fake-jwt-token-for-testing'
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;