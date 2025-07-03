import express from 'express';
import Certificate from '../models/Certificate'

const router = express.Router();

// GET by certificateId
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(cert);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST to create if not exists
router.post('/verify-certificate', async (req, res) => {
  const { certificateId } = req.body;
  try {
    let cert = await Certificate.findOne({ certificateId });
    if (cert) return res.status(200).json(cert);

    cert = new Certificate(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
