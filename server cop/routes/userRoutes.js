import express from "express";
import jwt from "jsonwebtoken";
import {
  signup,
  loginUser,
  getUserData,
  verifyEmail,
  resetPassword,
  verifyResetOtp,
  purchaseCourse,
  userEnrolledCourses,
  updateUserCourseProgress,
  getUserCourseProgress,
  addUserRating,
  resetOtp
} from "../controllers/userController.js";

import { uploadSignupImage } from '../configs/upload.js';
import { verifyToken } from '../middlewares/auth.js'; 

const router = express.Router();

// ==== Public Routes ====
router.post("/signup", uploadSignupImage.single('imageUrl'), signup);
router.post("/reset-otp", resetOtp);  
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/verify-reset-otp", verifyResetOtp);
 
// ==== Protected Routes (Require valid access token) ====
router.get("/data", verifyToken, getUserData);
router.post("/purchase", verifyToken, purchaseCourse);
router.get("/enrolled-courses", verifyToken, userEnrolledCourses);
router.post("/update-course-progress", verifyToken, updateUserCourseProgress);
router.post("/get-course-progress", verifyToken, getUserCourseProgress);
router.post("/add-rating", verifyToken, addUserRating);

export default router;
