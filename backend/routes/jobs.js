const express = require('express');
const router = express.Router();
const Job = require('../models/jobs');
const { protect } = require('../middleware/auth');

// Get all jobs (Public route)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a job (Protected route)
router.post('/', protect, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;