const express = require('express');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const app = express();

// 1. Middleware (CORS & JSON parsing)
app.use(cors());
app.use(express.json());

// 2. In-Memory Database and Server Startup
async function startServer() {
  try {
    // Start MongoDB In-Memory Server
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('MongoDB Connected Successfully (Local Memory Server)!');

    // 3. API Routes

    // Login Route
    app.post('/api/auth/login', (req, res) => {
      const { email, password } = req.body;
      if (email && password) {
        res.json({ 
          token: 'qveto-mock-jwt-token-xyz789', 
          user: { email } 
        });
      } else {
        res.status(400).json({ message: 'Email aur password zaroori hain' });
      }
    });

    // Get All Jobs
    app.get('/api/jobs', (req, res) => {
      res.json([
        { id: '1', title: 'React Developer', department: 'Engineering', location: 'Remote' },
        { id: '2', title: 'Node.js Developer', department: 'Backend', location: 'Hybrid' }
      ]);
    });

    // Create Job
    app.post('/api/jobs', (req, res) => {
      const jobData = req.body;
      res.status(201).json({ message: 'Job successfully created', job: jobData });
    });

    // Get All Candidates
    app.get('/api/candidates', (req, res) => {
      res.json([
        { id: '1', name: 'Aman Verma', email: 'aman@example.com', status: 'Applied' },
        { id: '2', name: 'Priya Singh', email: 'priya@example.com', status: 'Interviewing' }
      ]);
    });

    // 4. Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Server startup error:', err);
  }
}

startServer();