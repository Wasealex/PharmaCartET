import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import { getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.get("/:id", protect, getOrderById);

export default router;
