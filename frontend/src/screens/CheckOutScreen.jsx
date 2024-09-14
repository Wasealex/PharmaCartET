import React from "react";
import { useGetCartQuery } from "../slices/cartApiSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useAddPaymentMethodMutation } from "../slices/paymentApiSlice";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const CheckOutScreen = () => {
  const navigate = useNavigate();
  const { data: cart = [], isLoading: isLoadingCart } = useGetCartQuery();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const [addPaymentMethod, { isLoading: isAddingPaymentMethod }] =
    useAddPaymentMethodMutation();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddPaymentMethodAndCreateOrder = async () => {
    try {
      if (cart.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      try {
        const orderResponse = await createOrder().unwrap();
        const data = {
          amount: total,
        };
        const paymentResponse = await addPaymentMethod(data).unwrap();
        const CheckOutUrl = paymentResponse.data.checkout_url;
        toast.success("Payment method added successfully");
        window.open(CheckOutUrl, "_blank");
      } catch (error) {
        toast.error(error?.data?.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };
  if (isCreatingOrder || isAddingPaymentMethod || isLoadingCart) {
    return <Loader />; // Show loader while creating order or adding payment method
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
          className="mb-3"
          onClick={handleAddPaymentMethodAndCreateOrder}
        >
          {isCreatingOrder || isAddingPaymentMethod
            ? "{Loader}"
            : "Confirm order and pay"}
        </Button>
      </div>
    </div>
  );
};

export default CheckOutScreen;
