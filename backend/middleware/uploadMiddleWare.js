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

// Create the multer upload instance
export const upload = multer({ storage: storage });
