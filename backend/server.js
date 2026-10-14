const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded PDF resumes statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Temporary In-Memory Database
let candidates = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@qveto.com', phone: '+91 9876543210', jobId: 'React Dev', stage: 'Applied', resumeUrl: null },
  { id: '2', name: 'Priya Verma', email: 'priya@qveto.com', phone: '+91 8765432109', jobId: 'Node Dev', stage: 'Interview', resumeUrl: null },
  { id: '3', name: 'Aman Gupta', email: 'aman@qveto.com', phone: '+91 7654321098', jobId: 'UI/UX', stage: 'Hired', resumeUrl: null }
];

let jobs = [
  { id: '1', title: 'Senior React Developer', department: 'Engineering' },
  { id: '2', title: 'Backend Node.js Architect', department: 'Engineering' }
];

// --- AUTH ROUTES ---
app.post('/api/login', (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : '';
  
  // Custom Admin Emails List (Added eshunehra089@gmail.com)
  const adminEmails = ['eshunehra089@gmail.com'];
  
  // Check if email is in admin list or contains 'admin'
  const isAdmin = adminEmails.includes(normalizedEmail) || normalizedEmail.includes('admin');

  res.json({
    token: 'jwt-qveto-token-sample',
    user: { 
      email: normalizedEmail, 
      role: isAdmin ? 'admin' : 'recruiter' 
    }
  });
});

// --- JOBS ROUTES ---
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const newJob = { id: Date.now().toString(), ...req.body };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// --- CANDIDATES ROUTES ---
app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

app.patch('/api/candidates/:id', (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;
  candidates = candidates.map(c => (c.id === id || c._id === id) ? { ...c, stage } : c);
  res.json({ success: true, message: 'Stage updated successfully' });
});

app.post('/api/candidates', upload.single('resume'), (req, res) => {
  try {
    const { name, email, phone, jobId, stage } = req.body;
    
    const resumeUrl = req.file 
      ? `http://localhost:${PORT}/uploads/${req.file.filename}` 
      : null;

    const newCandidate = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      jobId: jobId || 'General Application',
      stage: stage || 'Applied',
      resumeUrl
    };

    candidates.push(newCandidate);
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Error creating candidate', error: error.message });
  }
});

// Start Backend Server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Qveto Backend Server Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`👑 Special Admin: eshunehra089@gmail.com`);
  console.log(`=================================`);
});