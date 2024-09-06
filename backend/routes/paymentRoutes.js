import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import { addPaymentMethod } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/chapa", protect, addPaymentMethod);

export default router;
