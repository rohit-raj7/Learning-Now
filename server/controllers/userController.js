

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Course from "../models/Course.js"
import { SendVerificationCode, WelcomeEmail, SendResetCode } from '../middlewares/Email.js'
import { CourseProgress } from "../models/CourseProgress.js"
import { Purchase } from "../models/Purchase.js"
import User from '../models/User.js'
import stripe from "stripe"
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from 'uuid';
import streamifier from "streamifier";


// Signup and send OTP 

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const file = req.file;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Upload image to Cloudinary or use default image
    let imageUrl = "https://cdn-icons-png.freepik.com/256/1154/1154987.png?uid=R204245658&ga=GA1.1.1018829609.1731244840&semt=ais_hybrid";

    if (file) {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "user-profiles", resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      };

      const result = await uploadToCloudinary();
      imageUrl = result.secure_url;
    }

    // Hash password and generate OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      _id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      imageUrl,
      verificationCode,
    });

    await user.save();
    // generateTokenAndSetCookies(res, user._id);
    await SendVerificationCode(user.email, verificationCode);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      user,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Verify email with OTP
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    // Send welcome email here!
    await WelcomeEmail(user.email, user.name);

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Request OTP for password reset
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    await user.save();

    // Correct function here:
    await SendResetCode(user.email, resetCode);

    return res.status(200).json({ success: true, message: "Reset OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Verify the reset OTP and update password
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || user.resetCode !== resetCode) {
      return res.status(400).json({ success: false, message: "Invalid OTP or email" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Send OTP for password reset
export const resetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    await user.save();

    const sent = await SendResetCode(email, resetCode);
    if (!sent) {
      return res.status(500).json({ success: false, message: "Failed to send OTP" });
    }

    return res.status(200).json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error("resetOtp error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find educator by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Educator not found");
      return res.status(401).json({ success: false, message: "Invalid email or not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT Token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );


    // Return success response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
      jwtToken,
      email: user.email,
      id: user._id
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// update Profile Image

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Updating profile image for userId:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "User ID not found in token" });
    }

    let imageUrl;

    if (req.file) {
      // Upload to Cloudinary
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "user-profiles",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await uploadToCloudinary();
      imageUrl = result.secure_url;
    } else {
      // Use a default profile image if none uploaded
      imageUrl = "https://res.cloudinary.com/demo/image/upload/v1234567890/default-profile.png"; // Replace with your actual Cloudinary URL
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      imageUrl: updatedUser.imageUrl,
    });

  } catch (error) {
    console.error("Update profile image error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile image",
    });
  }
};
 

// Get User Data 

export const getUserData = async (req, res) => {
  try {
    const userId = req.user?._id || req.auth?.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Invalid or missing user ID' });
    }

    const user = await User.findById(userId).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

// Purchase Course  

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Use origin header or fallback to localhost (helpful for Postman/local testing)
    const origin = req.headers.origin || "http://localhost:5173";

    const userId = req.user?._id || req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    // Fetch user and course data
    const courseData = await Course.findById(courseId);
    const userData = await User.findById(userId);

     
    if (!courseData || !userData) {
      return res.status(404).json({ success: false, message: 'User or Course not found' });
    }
    // Prevent duplicate enrollment
    if (userData.enrolledCourses.includes(courseData._id)) {
      return res.status(409).json({ success: false, message: "User already enrolled in this course" });
    }
    // Calculate discounted amount
    
    const discountedPrice = courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100);
    const amount = parseFloat(discountedPrice.toFixed(2));
    // Create new purchase
    const newPurchase = await Purchase.create({
      courseId: courseData._id,
      userId,
      amount,
      // status: "completed"
      status: "pending" // set as pending initially
    });

    courseData.enrolledStudents.push(userData._id);
    await courseData.save();

    userData.enrolledCourses.push(courseData._id);
    await userData.save();

    const currency = process.env.CURRENCY.toLowerCase();

    // Stripe line item
    const line_items = [{
      price_data: {
        currency,
        product_data: {
          name: courseData.courseTitle
        },
        unit_amount: Math.floor(amount * 100) // Stripe expects amount in cents
      },
      quantity: 1
    }];

    // Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/user/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items,
      mode: 'payment',
      metadata: {
        purchaseId: newPurchase._id.toString()
      }
    });

    // Return the Stripe session URL to frontend
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

 

export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user?._id || req.auth?.userId;


    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const userData = await User.findById(userId).populate('enrolledCourses');

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// export const updateUserCourseProgress = async (req, res) => {

//   try {

//     const userId = req.user?._id || req.auth?.userId;

//     const { courseId, lectureId } = req.body

//     const progressData = await CourseProgress.findOne({ userId, courseId })

//     if (progressData) {

//       if (progressData.lectureCompleted.includes(lectureId)) {
//         return res.json({ success: true, message: 'Lecture Already Completed' })
//       }

//       progressData.lectureCompleted.push(lectureId)
//       await progressData.save()

//     } else {

//       await CourseProgress.create({
//         userId,
//         courseId,
//         lectureCompleted: [lectureId]
//       })

//     }

//     res.json({ success: true, message: 'Progress Updated' })

//   } catch (error) {
//     res.json({ success: false, message: error.message })
//   }

// }

// get User Course Progress

export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.user?._id || req.auth?.userId;
    const { courseId, lectureId } = req.body;

    // Get course to count total lectures
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const totalLectures = course.courseContent.reduce(
      (acc, chapter) => acc + chapter.chapterContent.length,
      0
    );

    let progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      // Prevent duplicate entries
      if (!progressData.lectureCompleted.includes(lectureId)) {
        progressData.lectureCompleted.push(lectureId);
      }

      // Mark complete if all lectures are done
      progressData.completed = progressData.lectureCompleted.length >= totalLectures;

      await progressData.save();
    } else {
      // First lecture being marked
      const newProgress = new CourseProgress({
        userId,
        courseId,
        lectureCompleted: [lectureId],
        completed: totalLectures === 1,
      });
      await newProgress.save();
    }

    return res.status(200).json({ success: true, message: 'Progress Updated' });
  } catch (error) {
    console.error("Update course progress error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getUserCourseProgress = async (req, res) => {

  try {

    const userId = req.user?._id || req.auth?.userId;


    const { courseId } = req.body

    const progressData = await CourseProgress.findOne({ userId, courseId })

    res.json({ success: true, progressData })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}

// Add User Ratings to Course
export const addUserRating = async (req, res) => {
  
 const userId = req.user?._id || req.auth?.userId;

  const { courseId, rating } = req.body;

  // Validate inputs
  if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: 'InValid Details' });
  }

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.json({ success: false, message: 'Course not found.' });
    }

    const user = await User.findById(userId);

    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({ success: false, message: 'User has not purchased this course.' });
    }

    // Check is user already rated
    const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);

    if (existingRatingIndex > -1) {
      // Update the existing rating
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      // Add a new rating
      course.courseRatings.push({ userId, rating });
    }

    await course.save();

    return res.json({ success: true, message: 'Rating added' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

























