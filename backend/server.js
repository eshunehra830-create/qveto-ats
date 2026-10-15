const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes (Ye ensure karega ki /api/auth/login route sahi se chale)
const authRoutes = require('./routes/auth'); // Check kar lena ki auth routes ki file yhi hai
app.use('/api/auth', authRoutes);

// Agar candidates aur jobs ke routes bhi hain toh unhe yahan jod do:
// const candidateRoutes = require('./routes/candidates');
// const jobRoutes = require('./routes/jobs');
// app.use('/api/candidates', candidateRoutes);
// app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('Qveto ATS Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});