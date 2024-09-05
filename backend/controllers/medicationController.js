import Medication from "../models/medicationModel.js";
import expressAsyncHandler from "express-async-handler";

const getAllMedications = expressAsyncHandler(async (req, res) => {
  const medications = await Medication.find({}); // find all medications
  res.send(medications);
});
const getMedicationById = expressAsyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  if (medication) {
    res.send(medication);
  } else {
    res.status(404).send({ message: "Medication Not Found" });
  }
});
const addMedication = expressAsyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    overTheCounter,
    dosageForm,
    sideEffects,
    preguntaCategory,
    image,
    price,
    rating,
    numReviews,
    categoryofAnatomy,
    categoryofTherapy,
    countInStock,
    isFeatured,
  } = req.body;
  const medicationExists = await Medication.findOne({ name });
  if (medicationExists) {
    res.status(400);
    throw new Error("Medication already exists");
  } else {
    const medication = await Medication.create({
      name,
      brand,
      description,
      overTheCounter,
      dosageForm,
      sideEffects,
      preguntaCategory,
      image,
      price,
      rating,
      numReviews,
      categoryofAnatomy,
      categoryofTherapy,
      countInStock,
      isFeatured,
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
    medication.countInStock = req.body.countInStock || medication.countInStock;

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
export {
  getAllMedications,
  getMedicationById,
  addMedication,
  updateMedication,
  deleteMedication,
};
