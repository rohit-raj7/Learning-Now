import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import connectCloudinary from '../configs/cloudinary.js'; // Adjust path if needed

dotenv.config();
connectCloudinary();

const router = express.Router();

// Configure multer to store files temporarily in the 'temp/' directory
const upload = multer({
  dest: 'temp/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed!'), false);
    }
  },
});

// POST route to upload a video directly to Cloudinary
router.post('/upload-video', upload.single('file'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',
      folder: 'course_videos',
    });

    // Delete the local file after upload
    fs.unlinkSync(req.file.path);

    // Respond with the video URL
    res.status(200).json({ videoUrl: result.secure_url });
  } catch (err) {
    console.error('Cloudinary upload error:', err.message);
    res.status(500).json({ error: 'Video upload failed', details: err.message });
  }
});

export default router;
