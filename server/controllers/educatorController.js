

import Course from '../models/Course.js';
import { Purchase } from '../models/Purchase.js';
import EducatorUser from '../models/EducatorUser.js';   // educatorUser
import User from '../models/User.js'  // student user
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { SendVerificationCode, WelcomeEmail, SendResetCode } from '../middlewares/Email.js'
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';




// Signup and send OTP for Educator  signupEducator

export const signupEducator = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const file = req.file;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    const existingEducator = await EducatorUser.findOne({ email });
    if (existingEducator) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Upload image to Cloudinary or use default
    let imageUrl = "https://www.freepik.com/icon/student_1154987#fromView=keyword&page=1&position=84&uuid=acf98f65-1a37-4f19-80ed-89a393f6659b"; // replace with actual URL

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newEducator = new EducatorUser({
      _id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      imageUrl,
      verificationCode,
    });

    await newEducator.save();
    // generateTokenAndSetCookies(res, newEducator._id);
    await SendVerificationCode(newEducator.email, verificationCode);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      educator: newEducator,
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

    const educatorUser = await EducatorUser.findOne({ verificationCode: code });
    if (!educatorUser) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    educatorUser.isVerified = true;
    educatorUser.verificationCode = undefined;
    await educatorUser.save();

    // Send welcome email here!
    await WelcomeEmail(educatorUser.email, educatorUser.name);

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

    const educatorUser = await EducatorUser.findOne({ email });
    if (!educatorUser) {
      return res.status(404).json({ success: false, message: "EducatorUser not found" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    educatorUser.resetCode = resetCode;
    await educatorUser.save();

    // Correct function here:
    await SendResetCode(educatorUser.email, resetCode);

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

    const educatorUser = await EducatorUser.findOne({ email });
    if (!educatorUser || educatorUser.resetCode !== resetCode) {
      return res.status(400).json({ success: false, message: "Invalid OTP or email" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    educatorUser.password = hashedPassword;
    educatorUser.resetCode = undefined;
    await educatorUser.save();

    return res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Login Educator Controller
export const loginEducator = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find educator by email
    const educator = await EducatorUser.findOne({ email });
    if (!educator) {
      console.log("Educator not found");
      return res.status(401).json({ success: false, message: "Invalid email or not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, educator.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Generate JWT Token
    const jwtToken = jwt.sign(
      { email: educator.email, _id: educator._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );


    // Return success response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      educator,
      jwtToken,
      email: educator.email,
      id: educator._id
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const educatorId = req.educator?._id || req.auth?.educatorId;

    await EducatorUser.findByIdAndUpdate(educatorId, { role: 'educator' });

    res.json({ success: true, message: 'You can publish a course now' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export const addVideo = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: 'No video file provided' });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'course_videos',
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    return res.status(200).json({ success: true, secure_url: result.secure_url });

  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
};


// add course 


export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const file = req.file;
    const educatorId = req.educator?._id || req.auth?.educatorId;

    if (!file || !file.buffer) {
      return res.status(400).json({ success: false, message: 'Thumbnail not attached' });
    }

    let parsedCourseData;
    try {
      parsedCourseData = JSON.parse(courseData);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid JSON format in courseData' });
    }

    // Upload thumbnail to Cloudinary
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'course_thumbnails',
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();
    parsedCourseData.courseThumbnail = result.secure_url;

    // Fetch educator data
    const educator = await EducatorUser.findById(educatorId);
    if (!educator) {
      return res.status(404).json({ success: false, message: 'Educator not found' });
    }

    // Add educator info to course
    parsedCourseData.educator = {
      _id: educator._id,
      name: educator.name,
      email: educator.email,
      createdAt: educator.createdAt
    };

    const newCourse = await Course.create(parsedCourseData);

    return res.status(201).json({
      success: true,
      message: 'Course added successfully',
      courseId: newCourse._id
    });

  } catch (error) {
    console.error("Add Course Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};



export const getEducatorCourses = async (req, res) => {
  try {
    const educatorId = req.educator?._id || req.auth?.educatorId;


    const courses = await Course.find({ "educator._id": educatorId });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// getEducatorData 
export const getEducatorData = async (req, res) => {
  try {
    const educatorId = req.educator?._id || req.auth?.educatorId;

    if (!educatorId) {
      return res.status(400).json({ success: false, message: 'Invalid or missing user ID' });
    }

    const educator = await EducatorUser.findById(educatorId).select('-password');

    if (!educator) {
      return res.status(404).json({ success: false, message: 'Educator not found' });
    }

    res.status(200).json({ success: true, educator });

  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};


export const educatorDashboardData = async (req, res) => {
  try {
    // Get educator ID from auth middleware
    const educatorId = req.educator?._id || req.auth?.educatorId;
    if (!educatorId) {
      return res.status(400).json({ success: false, message: "Educator ID not found" });
    }

    // Find courses for this educator (fix: query embedded field)
    const courses = await Course.find({ "educator._id": educatorId });
    const totalCourses = courses.length;

    // Get all course IDs
    const courseIds = courses.map(course => course._id);

    // Find completed purchases for these courses
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    });

    // Calculate total earnings
    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    // Collect enrolled students data
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        'name imageUrl'
      );
      students.forEach(student => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// Get Enrolled Students Data with Purchase Data

export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educatorId = req.educator?._id || req.auth?.educatorId;;

    // Get educator's courses
    const courses = await Course.find({ educator: educatorId });

    // Extract course IDs
    const courseIds = courses.map(course => course._id);

    // Get completed purchases with user & course populated
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: 'completed',
    })
      .populate('userId', 'name imageUrl')
      .populate('courseId', 'courseTitle');

    // Build enrolled students data
    const enrolledStudents = purchases.map(purchase => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({
      success: true,
      enrolledStudents,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};













// import Course from '../models/Course.js';
// import { Purchase } from '../models/Purchase.js';
// import EducatorUser from '../models/EducatorUser.js';   // educatorUser
// import User from '../models/User.js'  // student user
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from 'uuid';
// import { SendVerificationCode, WelcomeEmail, SendResetCode } from '../middlewares/Email.js'
// import jwt from "jsonwebtoken";
// import { v2 as cloudinary } from 'cloudinary';
// import streamifier from 'streamifier';




// // Signup and send OTP for Educator  signupEducator

// export const signupEducator = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     const file = req.file;

//     if (!email || !password || !name) {
//       return res.status(400).json({
//         success: false,
//         message: "Email, password, and name are required",
//       });
//     }

//     const existingEducator = await EducatorUser.findOne({ email });
//     if (existingEducator) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists. Please login.",
//       });
//     }

//     // Upload image to Cloudinary or use default
//     let imageUrl = "https://www.freepik.com/icon/student_1154987#fromView=keyword&page=1&position=84&uuid=acf98f65-1a37-4f19-80ed-89a393f6659b"; // replace with actual URL

//     if (file) {
//       const uploadToCloudinary = () => {
//         return new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: "user-profiles", resource_type: "image" },
//             (error, result) => {
//               if (error) return reject(error);
//               resolve(result);
//             }
//           );
//           streamifier.createReadStream(file.buffer).pipe(stream);
//         });
//       };

//       const result = await uploadToCloudinary();
//       imageUrl = result.secure_url;
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

//     const newEducator = new EducatorUser({
//       _id: uuidv4(),
//       email,
//       password: hashedPassword,
//       name,
//       imageUrl,
//       verificationCode,
//     });

//     await newEducator.save();
//     // generateTokenAndSetCookies(res, newEducator._id);
//     await SendVerificationCode(newEducator.email, verificationCode);

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//       educator: newEducator,
//     });

//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };


// // Verify email with OTP
// export const verifyEmail = async (req, res) => {
//   try {
//     const { code } = req.body;

//     const educatorUser = await EducatorUser.findOne({ verificationCode: code });
//     if (!educatorUser) {
//       return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
//     }

//     educatorUser.isVerified = true;
//     educatorUser.verificationCode = undefined;
//     await educatorUser.save();

//     // Send welcome email here!
//     await WelcomeEmail(educatorUser.email, educatorUser.name);

//     return res.status(200).json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Request OTP for password reset

// export const resetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//     }

//     const educatorUser = await EducatorUser.findOne({ email });
//     if (!educatorUser) {
//       return res.status(404).json({ success: false, message: "EducatorUser not found" });
//     }

//     const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
//     educatorUser.resetCode = resetCode;
//     await educatorUser.save();

//     // Correct function here:
//     await SendResetCode(educatorUser.email, resetCode);

//     return res.status(200).json({ success: true, message: "Reset OTP sent to email" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Verify the reset OTP and update password
// export const verifyResetOtp = async (req, res) => {
//   try {
//     const { email, resetCode, newPassword } = req.body;

//     if (!email || !resetCode || !newPassword) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const educatorUser = await EducatorUser.findOne({ email });
//     if (!educatorUser || educatorUser.resetCode !== resetCode) {
//       return res.status(400).json({ success: false, message: "Invalid OTP or email" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     educatorUser.password = hashedPassword;
//     educatorUser.resetCode = undefined;
//     await educatorUser.save();

//     return res.status(200).json({ success: true, message: "Password reset successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };



// // Login Educator Controller
// export const loginEducator = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email and password are required" });
//     }

//     // Find educator by email
//     const educator = await EducatorUser.findOne({ email });
//     if (!educator) {
//       console.log("Educator not found");
//       return res.status(401).json({ success: false, message: "Invalid email or not found" });
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, educator.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Invalid password" });
//     }

//     // Generate JWT Token
//     const jwtToken = jwt.sign(
//       { email: educator.email, _id: educator._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );


//     // Return success response
//     return res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       educator,
//       jwtToken,
//       email: educator.email,
//       id: educator._id
//     });

//   } catch (error) {
//     console.error("Login Error:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


// // Update role to educator
// export const updateRoleToEducator = async (req, res) => {
//   try {
//     const educatorId = req.educator?._id || req.auth?.educatorId;

//     await EducatorUser.findByIdAndUpdate(educatorId, { role: 'educator' });

//     res.json({ success: true, message: 'You can publish a course now' });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };



// export const addVideo = async (req, res) => {
//   try {
//     if (!req.file || !req.file.buffer) {
//       return res.status(400).json({ success: false, message: 'No video file provided' });
//     }

//     const streamUpload = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: 'video',
//             folder: 'course_videos',
//           },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );

//         streamifier.createReadStream(req.file.buffer).pipe(stream);
//       });
//     };

//     const result = await streamUpload();

//     return res.status(200).json({ success: true, secure_url: result.secure_url });

//   } catch (err) {
//     console.error('Cloudinary upload error:', err);
//     return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
//   }
// };


// // add course 


// export const addCourse = async (req, res) => {
//   try {
//     const { courseData } = req.body;
//     const file = req.file;
//     const educatorId = req.educator?._id || req.auth?.educatorId;

//     if (!file || !file.buffer) {
//       return res.status(400).json({ success: false, message: 'Thumbnail not attached' });
//     }

//     let parsedCourseData;
//     try {
//       parsedCourseData = JSON.parse(courseData);
//     } catch (err) {
//       return res.status(400).json({ success: false, message: 'Invalid JSON format in courseData' });
//     }

//     // Upload thumbnail to Cloudinary
//     const streamUpload = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: 'image',
//             folder: 'course_thumbnails',
//           },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );
//         streamifier.createReadStream(file.buffer).pipe(stream);
//       });
//     };

//     const result = await streamUpload();
//     parsedCourseData.courseThumbnail = result.secure_url;

//     // Fetch educator data
//     const educator = await EducatorUser.findById(educatorId);
//     if (!educator) {
//       return res.status(404).json({ success: false, message: 'Educator not found' });
//     }

//     // Add educator info to course
//     parsedCourseData.educator = {
//       _id: educator._id,
//       name: educator.name,
//       email: educator.email,
//       createdAt: educator.createdAt
//     };

//     const newCourse = await Course.create(parsedCourseData);

//     return res.status(201).json({
//       success: true,
//       message: 'Course added successfully',
//       courseId: newCourse._id
//     });

//   } catch (error) {
//     console.error("Add Course Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error: ' + error.message
//     });
//   }
// };


// // export const addCourse = async (req, res) => {
// //   try {
// //     const { courseData } = req.body;
// //     const file = req.file;
// //     const educatorId = req.educator?._id || req.auth?.educatorId;

// //     if (!file || !file.buffer) {
// //       return res.status(400).json({ success: false, message: 'Thumbnail not attached' });
// //     }

// //     let parsedCourseData;
// //     try {
// //       parsedCourseData = JSON.parse(courseData);
// //     } catch (err) {
// //       return res.status(400).json({ success: false, message: 'Invalid JSON format in courseData' });
// //     }

// //     // Upload image to Cloudinary from memory
// //     const streamUpload = () => {
// //       return new Promise((resolve, reject) => {
// //         const stream = cloudinary.uploader.upload_stream(
// //           {
// //             resource_type: 'image',
// //             folder: 'course_thumbnails',
// //           },
// //           (error, result) => {
// //             if (result) resolve(result);
// //             else reject(error);
// //           }
// //         );
// //         streamifier.createReadStream(file.buffer).pipe(stream);
// //       });
// //     };

// //     const result = await streamUpload();

// //     parsedCourseData.courseThumbnail = result.secure_url;
// //     parsedCourseData.educator = educatorId;

// //     const newCourse = await Course.create(parsedCourseData);

// //     return res.status(201).json({ success: true, message: 'Course added successfully', courseId: newCourse._id });

// //   } catch (error) {
// //     console.error("Add Course Error:", error);
// //     return res.status(500).json({ success: false, message: 'Server error: ' + error.message });
// //   }
// // };



// export const getEducatorCourses = async (req, res) => {
//   try {
//     const educatorId = req.educator?._id || req.auth?.educatorId;


//     const courses = await Course.find({ educator: educatorId });

//     res.json({ success: true, courses });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// // getEducatorData 
// export const getEducatorData = async (req, res) => {
//   try {
//     const educatorId = req.educator?._id || req.auth?.educatorId;

//     if (!educatorId) {
//       return res.status(400).json({ success: false, message: 'Invalid or missing user ID' });
//     }

//     const educator = await EducatorUser.findById(educatorId).select('-password');

//     if (!educator) {
//       return res.status(404).json({ success: false, message: 'Educator not found' });
//     }

//     res.status(200).json({ success: true, educator });

//   } catch (error) {
//     console.error('Error fetching user data:', error.message);
//     res.status(500).json({ success: false, message: 'Server error: ' + error.message });
//   }
// };





// // Get Educator Dashboard Data (Total Earning, Enrolled Students, No. of Courses)
// export const educatorDashboardData = async (req, res) => {
//   try {
//     const educatorId = req.educator?._id || req.auth?.educatorId;;

//     const courses = await Course.find({ educator: educatorId });

//     const totalCourses = courses.length;

//     const courseIds = courses.map(course => course._id);

//     // Calculate total earnings from purchases
//     const purchases = await Purchase.find({
//       courseId: { $in: courseIds },
//       status: 'completed',
//     });

//     const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

//     const enrolledStudentsData = [];

//     for (const course of courses) {
//       const students = await User.find(
//         { _id: { $in: course.enrolledStudents } },
//         'name imageUrl'
//       );

//       students.forEach(student => {
//         enrolledStudentsData.push({
//           courseTitle: course.courseTitle,
//           student,
//         });
//       });
//     }

//     res.json({
//       success: true,
//       dashboardData: {
//         totalEarnings,
//         enrolledStudentsData,
//         totalCourses,
//       },
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Get Enrolled Students Data with Purchase Data

// export const getEnrolledStudentsData = async (req, res) => {
//   try {
//     const educatorId = req.educator?._id || req.auth?.educatorId;;

//     // Get educator's courses
//     const courses = await Course.find({ educator: educatorId });

//     // Extract course IDs
//     const courseIds = courses.map(course => course._id);

//     // Get completed purchases with user & course populated
//     const purchases = await Purchase.find({
//       courseId: { $in: courseIds },
//       status: 'completed',
//     })
//       .populate('userId', 'name imageUrl')
//       .populate('courseId', 'courseTitle');

//     // Build enrolled students data
//     const enrolledStudents = purchases.map(purchase => ({
//       student: purchase.userId,
//       courseTitle: purchase.courseId.courseTitle,
//       purchaseDate: purchase.createdAt,
//     }));

//     res.json({
//       success: true,
//       enrolledStudents,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
