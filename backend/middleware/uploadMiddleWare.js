import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploads
    cb(null, path.join(__dirname, "../../frontend/src/assets/uploads"));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Set up file filter configuration for multer
const fileFilter = function (req, file, cb) {
  // Only allow PNG files with a maximum size of 1MB
  if (file.mimetype === "image/png" && file.size <= 1048576) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG files with a maximum size of 1MB are allowed"));
  }
};

// Create the multer upload instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
