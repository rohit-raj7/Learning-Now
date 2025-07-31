 

import mongoose from 'mongoose';
const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  instructorName: { type: String, required: true },
  instructorEmail: { type: String }, // optional
  educatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Educator' }, // optional
  completionDate: { type: String, required: true }
}, { timestamps: true });

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;