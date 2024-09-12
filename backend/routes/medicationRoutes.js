import express from "express";
import {
  getAllMedications,
  getMedicationById,
  addMedication,
  updateMedication,
  deleteMedication,
  getMedicationByCatagory,
  toggleFeaturedMedication,
  getMedicationBySearch,
  getMedicationByFilter,
} from "../controllers/medicationController.js";
import { protect, adminUser } from "../middleware/authMiddleWare.js";
const router = express.Router();

router.get("/all", protect, getAllMedications);
router.get("/:id", protect, getMedicationById);
router.get("/catagory/:catagory", protect, getMedicationByCatagory);
router.get("/search", protect, getMedicationBySearch);
router.get("/filter", protect, getMedicationByFilter);
router.post("/add", protect, adminUser, addMedication);
router.put("/update/:id", protect, adminUser, updateMedication);
router.patch("/:id", protect, adminUser, toggleFeaturedMedication);
router.delete("/delete/:id", protect, adminUser, deleteMedication);

export default router;
