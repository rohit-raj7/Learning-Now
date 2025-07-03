// import mongoose from 'mongoose';

// const courseProgressSchema = new mongoose.Schema({
//     userId: { type: String, required: true },
//     courseId: { type: String, required: true },
//     completed: { type: Boolean, default: false },
//     completedAt: { type: Date },
//     lectureCompleted: [

//     ]
// }, { minimize: false });

// export const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

 


const courseProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },  // ✅ fix
  lectureCompleted: [String]
}, { minimize: false });
