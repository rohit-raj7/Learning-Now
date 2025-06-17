import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({
      message: "Unauthorized. JWT token is required"
    });
  }

  // Expected format: 'Bearer <token>'
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.educator=decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Unauthorized. JWT token is invalid or expired"
    });
  }
};
