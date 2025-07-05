// cloudinaryRoutes.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import connectCloudinary from '../configs/cloudinary.js';

const router = express.Router();

connectCloudinary();

const upload = multer({ dest: 'temp/' });

addVideo.post('/upload-video', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',
      folder: 'course_videos',
    });

    fs.unlinkSync(req.file.path); // cleanup temp file
    return res.status(200).json({ secure_url: result.secure_url });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

export default addVideo;
