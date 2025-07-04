// import mongoose from 'mongoose';

// const certificateSchema = new mongoose.Schema({
//   certificateId: { type: String, required: true, unique: true },
//   studentName: { type: String, required: true },
//   courseId: { type: String, required: true },
//   courseTitle: { type: String, required: true },
//   instructorName: { type: String, required: true },
//   completionDate: { type: String, required: true }
// }, { timestamps: true });

// const Certificate = mongoose.model('Certificate', certificateSchema);

// export default Certificate;


import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  instructorName: { type: String, required: true },
  completionDate: { type: String, required: true }
}, { timestamps: true });

// ✅ Prevent model overwrite error in dev/serverless environments
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

export default Certificate;
