import Medication from "../models/medicationModel.js";
import expressAsyncHandler from "express-async-handler";

const getAllMedications = expressAsyncHandler(async (req, res) => {
  const medications = await Medication.find({}); // find all medications
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
  const { name, description, price } = req.body;
  const medicationExists = await Medication.findOne({ name });
  if (medicationExists) {
    res.status(400);
    throw new Error("Medication already exists");
  } else {
    const medication = await Medication.create({
      name,
      description,
      price,
    });
    if (medication) {
      res.status(201).send(medication);
    } else {
      res.status(400);
      throw new Error("Invalid medication data");
    }
  }
});
const updateMedication = expressAsyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (medication) {
    medication.name = req.body.name || medication.name;
    medication.description = req.body.description || medication.description;
    medication.price = req.body.price || medication.price;

    const updatedMedication = await medication.save();
    res.send({ message: "Medication Updated", medication: updatedMedication });
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
const getMedicationByCatagory = expressAsyncHandler(async (req, res) => {
  const medications = await Medication.find({
    categoryofTherapy: req.params.categoryofTherapy,
  }); // find all medications
  if (medications) {
    res.send(medications);
  } else {
    res.status(404).send({ message: "Medication Not Found" });
  }
});
const toggleFeaturedMedication = expressAsyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (medication) {
    medication.isFeatured = !medication.isFeatured;
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
        categoryofTherapy: {
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
  getMedicationByCatagory,
  toggleFeaturedMedication,
  getMedicationBySearch,
  getMedicationByFilter,
};
