import express from "express";
import { protect, adminUser } from "../middleware/authMiddleWare.js";
import { upload } from "../middleware/uploadMiddleWare.js";
import {
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/:id", protect, getOrderById);
router.post("/", protect, upload.single("image"), createOrder);
router.put("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);
router.get("/", protect, adminUser, getAllOrders);

export default router;
