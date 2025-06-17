import express from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/generateTokens.js';

const authRoutes = express.Router();  // ✅ Use the same name

authRoutes.post('/token/refresh', async (req, res) => {
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

export default authRoutes; // ✅ Now it's defined
