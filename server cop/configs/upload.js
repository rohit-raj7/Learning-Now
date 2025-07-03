import multer from "multer";
import path from "path";

// Setup memory storage
const storage = multer.memoryStorage();

// Filter file types (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.png', '.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Only images are allowed"), false);
  }
  cb(null, true);
};

export const uploadSignupImage = multer({
  storage,
  fileFilter,
});
