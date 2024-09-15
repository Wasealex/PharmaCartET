import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Medication from "../models/medicationModel.js"; // Import the Medication model

// Create Order
const createOrder = expressAsyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  const user = await User.findById(req.user._id).populate(
    "cartItems.medication"
  );

  if (!user || user.cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty or not found." });
  }

  let totalPrice = 0;

  for (const item of user.cartItems) {
    const medication = item.medication;

    if (!medication) {
      return res.status(400).json({
        message: `Invalid medication ID for item with quantity ${item.quantity}.`,
      });
    }

    if (item.quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than zero." });
    }

    if (medication.stock < item.quantity) {
      return res.status(400).json({
        message: `Not enough stock for ${medication.name}. Available: ${medication.stock}, Requested: ${item.quantity}`,
      });
    }

    if (medication.price <= 0) {
      return res.status(400).json({ message: "Medication price is invalid." });
    }

    totalPrice += medication.price * item.quantity;
  }

  // Create the order
  const order = new Order({
    user: req.user._id,
    medications: user.cartItems.map((item) => ({
      medication: item.medication._id,
      quantity: item.quantity,
      price: item.medication.price,
    })),
    totalPrice,
    chappaSessionId: req.body.chappaSessionId,
  });

  if (req.file) {
    order.imageUrl =
      req.protocol + "://" + req.get("host") + "/" + req.file.path;
  }

  const createdOrder = await order.save();

  // Update medication stock
  await Promise.all(
    user.cartItems.map(async (item) => {
      const medication = await Medication.findById(item.medication);
      if (medication) {
        medication.stock -= item.quantity; // Decrease the stock
        await medication.save(); // Save the updated medication
      }
    })
  );

  user.cartItems = []; // Clear the cart items
  await user.save(); // Save the user document
  res.status(201).json(createdOrder);
});
// Get Order by ID
const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "medications.medication",
      select: "name price", // Ensure you select the necessary fields
    });

  if (order) {
    res.status(200).json({
      order: {
        id: order._id,
        user: order.user.name,
        medications: order.medications.map((item) => ({
          medicationId: item.medication._id,
          medicationName: item.medication.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: order.totalPrice,
        imageUrl: order.imageUrl,
      },
    });
  } else {
    res.status(404).json({ message: "Order Not Found" });
  }
});
// Update Order
const updateOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).send({ message: "Order Not Found" });
  }

  const { medications } = req.body; // Expect medications to be an array of objects

  // Iterate through each medication update request
  medications.forEach(({ medicationId, quantity }) => {
    const existingMedication = order.medications.find(
      (med) => med.medication.toString() === medicationId
    );

    if (existingMedication) {
      // Update the quantity if the medication exists in the order
      existingMedication.quantity = quantity;
    }
  });

  // Recalculate total price after updating quantities
  order.totalPrice = order.medications.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

// Delete Order
const deleteOrder = expressAsyncHandler(async (req, res) => {
  // Find the order by ID
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order Not Found" });
  }
  // Remove the order from the database
  await Order.findByIdAndDelete(req.params.id);

  res.status(200).send({ message: "Order Deleted" });
});

// Get All Orders (Optional)
const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name");
  res.status(200).json({ orders });
});

export { getOrderById, createOrder, updateOrder, deleteOrder, getAllOrders };
