import React from "react";
import { useGetCartQuery } from "../slices/cartApiSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const CheckOutScreen = () => {
  const navigate = useNavigate();
  const { data: cart = [], isLoading: isLoadingCart } = useGetCartQuery();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const response = await createOrder().unwrap();
      toast.success("Order created successfully");
      navigate("/payment");
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  if (isLoadingCart) {
    return <Loader />; // Show loader while fetching cart
  }

  return (
    <div>
      <h1 className="text-center">Order Summary</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Your cart is empty.
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="3" className="text-right">
              Total
            </td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="mb-3 ms-3"
        >
          Go Back to Checkout
        </Button>
        <Button
          variant="success"
          onClick={handleConfirmOrder}
          className="mb-3"
          disabled={isCreatingOrder}
        >
          {isCreatingOrder ? "Creating order..." : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
};

export default CheckOutScreen;
