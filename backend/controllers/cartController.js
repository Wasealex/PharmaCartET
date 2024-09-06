import expressAsyncHandler from "express-async-handler";
import Medication from "../models/medicationModel";

const addToCart = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { medicationId } = req.body;
  const existingCartItem = user.cartItems.find(
    (item) => item.medicationId === medicationId
  );
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    user.cartItems.push(medicationId);
  }
  await user.save();
  res.json(user.cartItems);
});

const getCart = expressAsyncHandler(async (req, res) => {
  const medications = await Medication.find({
    _id: { $in: req.user.cartItems },
  });
  const cartItems = medications.map((medication) => {
    const item = req.user.cartItems.find(
      (cartItem) => cartItem.id === medication.id
    );
    return { ...product.toJSON(), quantity: item.quantity };
  });
  res.json(cartItems);
});

const deleteAllFromCart = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { cartItems } = user;
  if (!cartItems) {
    throw new Error("Cart is empty");
  }
  user.cartItems = [];
  await user.save();
  res.json(user.cartItems);
});

const deleteOneFromCart = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { medicationId } = req.body;
  if (!medicationId) {
    throw new Error("Medication ID is required");
  }
  if (!user.cartItems) {
    throw new Error("Cart is empty");
  }
  if (
    !user.cartItems.some(
      (item) => item.medicationId.toString() === medicationId
    )
  ) {
    throw new Error(`Medication with ID ${medicationId} not found in cart`);
  } else {
    user.cartItems = user.cartItems.filter(
      (item) => item.medicationId.toString() !== medicationId
    );
  }

  await user.save();
  res.json(user.cartItems);
});

const updateQuantity = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { id: medicationId } = req.params;
  const { quantity } = req.body;
  const existingCartItem = user.cartItems.find(
    (item) => item.medicationId.toString() === medicationId
  );
  if (!existingCartItem) {
    res.status(404).json({ message: "Medication not found in cart" });
  } else {
    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.medicationId !== medicationId
      );
      await user.save();
      res.json(user.cartItems);
    }
    existingCartItem.quantity = quantity;
    await user.save();
    res.json(user.cartItems);
  }
});

export {
  addToCart,
  getCart,
  deleteAllFromCart,
  deleteOneFromCart,
  updateQuantity,
};
