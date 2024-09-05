import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    // name of the medication only generic names
    name: {
      type: String,
      required: true,
    },
    // different brands of the same medication
    brand: {
      type: [String],
      required: true,
    },
    // description of the medication
    description: {
      type: String,
      required: true,
    },
    // true or false for over the counter or not(no need of prescription)
    overTheCounter: {
      type: Boolean,
      default: false,
    },
    // dosageform: 'tablet', 'capsule', 'powder', ' oral solutions', 'injection'
    dosageForm: {
      type: String,
      required: true,
    },
    // common sideffects of the medication
    sideEffects: {
      type: [String],
      required: true,
    },
    // 'A', 'B', 'C', 'D', 'X'
    pregnancyCategory: {
      type: String,
      enum: ["A", "B", "C", "D", "X"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    // 'cardiovascular', 'renal', 'dermatology', 'neurology', 'gastroenterology'
    categoryofAnatomy: {
      type: String,
      enum: [
        "cardiovascular",
        "renal",
        "dermatology",
        "neurology",
        "gastroenterology",
        "musculoskeletal",
        "endocrinology",
        "respiratory",
        "reproductive",
        "immune",
        "general",
      ],
      required: true,
    },
    // eg 'Antibiotics', 'Antipyretics', 'Analgesics', 'Antacids',
    categoryOfTherapy: {
      type: String,
      enum: [
        "Antibiotics",
        "Antipyretics",
        "Analgesics",
        "Antacids",
        "Antidepressants",
        "Antihistamines",
        "Antivirals",
        "Antifungals",
        "Hormone Replacement",
        "Immunosuppressants",
        "Bronchodilators",
        "Diuretics",
        "Statins",
        "Beta-blockers",
        "ACE Inhibitors",
        "Corticosteroids",
        "Pain Management",
        "Narcotics",
        "Vaccines",
        "Topical Treatments",
        "Lifestyle Modifications",
      ],
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0.1,
      max: 5,
      default: 3,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 1,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
