import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  loginUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleWare.js";
const router = express.Router();

router.post("/signup", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, upload.single("image"), updateUserProfile);

export default router;
