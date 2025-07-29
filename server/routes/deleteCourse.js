import express from 'express';
import Course from '../models/Course.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// DELETE a course by ID (protected route)
router.delete('/delete-course/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully', deleted });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
