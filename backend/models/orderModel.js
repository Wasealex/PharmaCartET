import mongoose from "mongoose";
import Medication from "./medicationModel.js";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    medications: [
      {
        medication: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Medication",
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          ref: "Medication",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    chappaSessionId: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: "../frontend/src/assets/default/defaultprescription.png",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
