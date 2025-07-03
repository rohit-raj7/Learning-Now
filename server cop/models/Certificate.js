// models/Certificate.js
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, unique: true, required: true },
  studentName: String,
  courseId: String,
  courseTitle: String,
  instructorName: String,
  completionDate: String
});

module.exports = mongoose.model('Certificate', certificateSchema);
