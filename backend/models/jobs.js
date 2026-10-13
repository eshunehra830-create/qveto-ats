// Isko models/job.js mein daalna hai
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed', 'Draft'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
