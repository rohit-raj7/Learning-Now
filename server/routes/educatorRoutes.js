import express from 'express';
import upload from '../configs/multer.js';
import jwt from 'jsonwebtoken';
import { uploadSignupImage } from '../configs/upload.js';
import { verifyToken } from '../middlewares/auth.js';
import { generateAccessToken } from '../utils/generateTokens.js';

import {
  addCourse,getEducatorData,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  updateRoleToEducator,
  signupEducator,
  loginEducator,
  verifyEmail,
  resetPassword,
  verifyResetOtp,
} from '../controllers/educatorController.js';

const educatorRouter = express.Router();

// ==== Auth Routes ====
educatorRouter.post('/signup', uploadSignupImage.single('imageUrl'), signupEducator);
educatorRouter.post('/login', loginEducator);
educatorRouter.post('/verify-email', verifyEmail);
educatorRouter.post('/reset-password', resetPassword);
educatorRouter.post('/verify-reset-otp', verifyResetOtp);

// ==== Token Refresh ====
educatorRouter.post('/token/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: "Missing refresh token" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken(payload._id);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken
    });

  } catch (error) {
    console.error("Refresh Token Error:", error.message);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
});

// ==== Educator Protected Routes ====
educatorRouter.get('/data', verifyToken, getEducatorData); 
educatorRouter.get('/update-role', verifyToken, updateRoleToEducator);
educatorRouter.post('/add-course', verifyToken, upload.single('image'), addCourse);
educatorRouter.get('/courses', verifyToken, getEducatorCourses);
educatorRouter.get('/dashboard', verifyToken, educatorDashboardData);
educatorRouter.get('/enrolled-students', verifyToken, getEnrolledStudentsData);

export default educatorRouter;
