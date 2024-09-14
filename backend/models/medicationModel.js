import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    // name of the medication only generic names
    name: {
      type: String,
      required: true,
    },
    // description of the medication
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: "../frontend/src/assets/default/defaultmedication.png",
    },
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
