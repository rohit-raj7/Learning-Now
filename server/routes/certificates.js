import express from 'express';
import Certificate from '../models/CertificatesModels.js';

const router = express.Router();

// GET certificate by ID
router.get('/:certificateId', async (req, res) => {
  const { certificateId } = req.params;
  try {
    const cert = await Certificate.findOne({ certificateId });
    if (cert) {
      return res.status(200).json(cert);
    } else {
      return res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST create certificate
router.post('/', async (req, res) => {
  const { certificateId, studentName, courseId, courseTitle, instructorName, completionDate } = req.body;

  try {
    const existing = await Certificate.findOne({ certificateId });
    if (existing) {
      return res.status(200).json(existing); // Already exists, return it
    }

    const newCert = new Certificate({
      certificateId,
      studentName,
      courseId,
      courseTitle,
      instructorName,
      completionDate
    });

    await newCert.save();
    return res.status(201).json(newCert);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create certificate', error: err.message });
  }
});

export default router;
