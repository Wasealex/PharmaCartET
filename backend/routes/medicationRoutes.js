import express from "express";
import {
  getAllMedications,
  getMedicationById,
  addMedication,
  updateMedication,
  deleteMedication,
} from "../controllers/medicationController.js";
import { protect, adminUser } from "../middleware/authMiddleWare.js";
const router = express.Router();

router.get("/all", protect, adminUser, getAllMedications);
router.get("/:id", protect, getMedicationById);
router.post("/add", protect, adminUser, addMedication);
router.put("/update/:id", protect, adminUser, updateMedication);
router.delete("/delete/:id", protect, adminUser, deleteMedication);

export default router;
