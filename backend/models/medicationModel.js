import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    // Name of the medication (generic names only)
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures no duplicate medication names
    },
    // Description of the medication
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    // Price of the medication
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // Available stock of the medication
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Category of the medication
    category: {
      type: String,
      required: true,
      trim: true,
    },
    // Dosage form (e.g., tablet, capsule, liquid)
    dosageForm: {
      type: String,
      required: true,
      trim: true,
    },
    // Recommended dosage instructions
    dosageInstructions: {
      type: String,
      default: "As prescribed by the doctor",
      trim: true,
    },
    // Potential side effects
    sideEffects: {
      type: [String],
      default: [],
    },
    // Drug interactions with other medications
    interactions: {
      type: [String],
      default: [],
    },
    // Manufacturer of the medication
    manufacturer: {
      type: String,
      default: "",
      trim: true,
    },
    // Expiry date of the medication
    expiryDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > new Date(); // Expiry date must be in the future
        },
        message: (props) => `Expiry date ${props.value} is not valid!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create an index on the name field for faster searching
medicationSchema.index({ name: 1 });

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
