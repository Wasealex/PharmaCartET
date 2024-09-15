import Medication from "../models/medicationModel.js";
import expressAsyncHandler from "express-async-handler";

const getAllMedications = expressAsyncHandler(async (req, res) => {
  const medications = await Medication.find({});
  res.status(200).json({ medications });
});

const getMedicationById = expressAsyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (medication) {
    res.status(200).json({ medication });
  } else {
    res.status(404).send({ message: "Medication Not Found" });
  }
});

const addMedication = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    dosageForm,
    expiryDate,
    stock = 0,
    dosageInstructions,
    sideEffects = [],
    interactions = [],
    manufacturer,
  } = req.body;

  const medicationExists = await Medication.findOne({ name });
  if (medicationExists) {
    res.status(400);
    throw new Error("Medication already exists");
  } else {
    const medication = await Medication.create({
      name,
      description,
      price,
      category,
      dosageForm,
      expiryDate,
      stock,
      dosageInstructions,
      sideEffects,
      interactions,
      manufacturer,
    });

    if (req.file) {
      const imageUrl =
        req.protocol + "://" + req.get("host") + "/" + req.file.path;
      medication.imageUrl = imageUrl;
      await medication.save();
    }

    res.status(201).json(medication);
  }
});

const updateMedication = expressAsyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (medication) {
    medication.name = req.body.name || medication.name;
    medication.description = req.body.description || medication.description;
    medication.price = req.body.price || medication.price;
    medication.category = req.body.category || medication.category;
    medication.dosageForm = req.body.dosageForm || medication.dosageForm;
    medication.expiryDate = req.body.expiryDate || medication.expiryDate;
    medication.stock =
      req.body.stock !== undefined ? req.body.stock : medication.stock; // Optional
    medication.dosageInstructions =
      req.body.dosageInstructions || medication.dosageInstructions;
    medication.sideEffects = req.body.sideEffects || medication.sideEffects;
    medication.interactions = req.body.interactions || medication.interactions;
    medication.manufacturer = req.body.manufacturer || medication.manufacturer;

    if (req.file) {
      const imageUrl =
        req.protocol + "://" + req.get("host") + "/" + req.file.path;
      medication.imageUrl = imageUrl;
    }

    const updatedMedication = await medication.save();
    res
      .status(200)
      .json({ medications: updatedMedication, message: "Medication Updated" });
  } else {
    res.status(404).send({ message: "Medication Not Found" });
  }
});

const deleteMedication = expressAsyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (medication) {
    await Medication.findByIdAndDelete(req.params.id);
    res.send({ message: "Medication Deleted" });
  } else {
    res.status(404).send({ message: "Medication Not Found" });
  }
});

const getMedicationByCategory = expressAsyncHandler(async (req, res) => {
  const medications = await Medication.find({
    category: req.params.category,
  });
  if (medications.length > 0) {
    res.status(200).json({ medications: medications });
  } else {
    res.status(404).send({ message: "No Medications Found in This Category" });
  }
});

const toggleFeaturedMedication = expressAsyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (medication) {
    medication.isFeatured = !medication.isFeatured; // Ensure this field exists in the schema if you use it
    const updatedMedication = await medication.save();
    res.send({ message: "Medication Updated", medication: updatedMedication });
  } else {
    res.status(404).send({ message: "Medication Not Found" });
  }
});

const getMedicationBySearch = expressAsyncHandler(async (req, res) => {
  const search = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : {};
  const medications = await Medication.find({ ...search });
  res.send(medications);
});

const getMedicationByFilter = expressAsyncHandler(async (req, res) => {
  const filter = req.query.filter
    ? {
        category: {
          $regex: req.query.filter,
          $options: "i",
        },
      }
    : {};
  const medications = await Medication.find({ ...filter });
  res.send(medications);
});

export {
  getAllMedications,
  getMedicationById,
  addMedication,
  updateMedication,
  deleteMedication,
  getMedicationByCategory,
  toggleFeaturedMedication,
  getMedicationBySearch,
  getMedicationByFilter,
};
