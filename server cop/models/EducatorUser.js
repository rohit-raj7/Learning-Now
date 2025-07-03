import mongoose from 'mongoose';

const educatorUserSchema = new mongoose.Schema({
  _id: { type: String, required: true },              
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'educator' },
  imageUrl: { type: String, required: true },
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  resetCode: { type: String },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
}, { timestamps: true });

const EducatorUser = mongoose.model('EducatorUser', educatorUserSchema);

export default EducatorUser;
