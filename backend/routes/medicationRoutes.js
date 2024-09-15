import express from "express";
import {
  getAllMedications,
  getMedicationById,
  addMedication,
  updateMedication,
  deleteMedication,
  getMedicationByCategory, // Fixed spelling
  toggleFeaturedMedication,
  getMedicationBySearch,
  getMedicationByFilter,
} from "../controllers/medicationController.js";
import { protect, adminUser } from "../middleware/authMiddleWare.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/all", protect, getAllMedications);
router.get("/:id", protect, getMedicationById);
router.get("/category/:category", protect, getMedicationByCategory);
router.get("/search", protect, getMedicationBySearch);
router.get("/filter", protect, getMedicationByFilter);
router.post("/add", protect, adminUser, upload.single("image"), addMedication);
router.put(
  "/update/:id",
  protect,
  adminUser,
  upload.single("image"),
  updateMedication
);
router.patch("/:id", protect, adminUser, toggleFeaturedMedication);
router.delete("/delete/:id", protect, adminUser, deleteMedication);

export default router;
