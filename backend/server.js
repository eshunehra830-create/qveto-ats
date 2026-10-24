const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint for health check
app.get('/', (req, res) => {
  res.send('Server is running smoothly!');
});

// Admin Login Bypass Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "eshunehra089@gmail.com" && password === "123456") {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: "fake-jwt-token",
      user: { email: "eshunehra089@gmail.com", role: "admin" }
    });
  }
  return res.status(400).json({ message: "Invalid email or password" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});