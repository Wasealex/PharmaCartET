import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  addToCart,
  getCart,
  deleteAllFromCart,
  deleteOneFromCart,
  updateQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/all", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/deleteAll", protect, deleteAllFromCart); // Changed to DELETE
router.delete("/:id", protect, deleteOneFromCart); // Changed to DELETE
router.put("/:id", protect, updateQuantity);

export default router;
