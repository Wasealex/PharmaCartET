import express from "express";
import { protect } from "../middleware/authMiddleWare";
import {
  addToCart,
  deleteAllFromCart,
  deleteOneFromCart,
  getCart,
  updateQuantity,
} from "../controllers/cartController";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.post("/deleteAll", protect, deleteAllFromCart);
router.post("/deleteOne", protect, deleteOneFromCart);
router.put("/:id", protect, updateQuantity);

export default router;
