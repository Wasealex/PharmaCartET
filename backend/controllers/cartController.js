import expressAsyncHandler from "express-async-handler";
import Medication from "../models/medicationModel.js";

const addToCart = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  const { id: medicationId } = req.body;

  const medication = await Medication.findById(medicationId);
  if (!medication) {
    return res.status(404).send({ message: "Medication not found" });
  }

  if (!user.cartItems) {
    user.cartItems = [];
  }

  const itemIndex = user.cartItems.findIndex((item) =>
    item.medication.equals(medicationId)
  );
  if (itemIndex > -1) {
    user.cartItems[itemIndex].quantity += 1;
  } else {
    user.cartItems.push({ medication: medicationId, quantity: 1 });
  }

  await user
    .save()
    .catch((error) => res.status(500).json({ message: error.message }));
  res.json({ cartItems: user.cartItems });
});

const getCart = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  const medications = await Medication.find({
    _id: { $in: user.cartItems.map((item) => item.medication) },
  });

  const cartItems = medications.map((medication) => {
    const item = user.cartItems.find((cartItem) =>
      cartItem.medication.equals(medication._id)
    );
    return { ...medication.toJSON(), quantity: item.quantity };
  });
  res.json({ cart: cartItems });
});

const deleteAllFromCart = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  if (!user.cartItems || user.cartItems.length === 0) {
    return res.status(400).send({ message: "Cart is empty" });
  }

  user.cartItems = [];
  await user
    .save()
    .catch((error) => res.status(500).json({ message: error.message }));
  res.json({ cartItems: user.cartItems });
});

const deleteOneFromCart = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  const { id: medicationId } = req.body;

  if (!user.cartItems || user.cartItems.length === 0) {
    return res.status(400).send({ message: "Cart is empty" });
  }

  const existingCartItemIndex = user.cartItems.findIndex((item) =>
    item.medication.equals(medicationId)
  );
  if (existingCartItemIndex === -1) {
    return res.status(404).json({ message: "Medication not found in cart" });
  }

  const existingCartItem = user.cartItems[existingCartItemIndex];

  if (existingCartItem.quantity > 1) {
    existingCartItem.quantity -= 1; // Decrease quantity
  } else {
    user.cartItems.splice(existingCartItemIndex, 1);
  }

  await user
    .save()
    .catch((error) => res.status(500).json({ message: error.message }));
  res.json({ cartItems: user.cartItems });
});

const updateQuantity = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  const { id: medicationId } = req.params;
  const { quantity } = req.body;

  const existingCartItem = user.cartItems.find((item) =>
    item.medication.equals(medicationId)
  );

  if (!existingCartItem) {
    return res.status(404).json({ message: "Medication not found in cart" });
  }

  if (quantity === 0) {
    user.cartItems = user.cartItems.filter(
      (item) => !item.medication.equals(medicationId)
    );
  } else {
    existingCartItem.quantity = quantity; // Update the quantity
  }

  await user
    .save()
    .catch((error) => res.status(500).json({ message: error.message }));
  res.json({ cartItems: user.cartItems });
});

export {
  addToCart,
  getCart,
  deleteAllFromCart,
  deleteOneFromCart,
  updateQuantity,
};
