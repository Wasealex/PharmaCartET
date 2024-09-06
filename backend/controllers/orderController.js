import expressAsyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name");
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

export { getOrderById };
