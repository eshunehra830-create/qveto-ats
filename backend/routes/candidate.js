const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate'); // Apne model ka path check kar lena agar alag ho

// 1. Get all candidates (Frontend dashboard ke liye bina protection ke)
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Add a new candidate
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, jobId, status } = req.body;

    // Check if candidate with same email already exists
    const candidateExists = await Candidate.findOne({ email });
    if (candidateExists) {
      return res.status(400).json({ message: 'Candidate with this email already exists' });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      jobId,
      status: status || 'Applied'
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;