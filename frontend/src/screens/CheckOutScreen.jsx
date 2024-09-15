import React, { useState } from "react";
import { useGetCartQuery } from "../slices/cartApiSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useAddPaymentMethodMutation } from "../slices/paymentApiSlice";
import { Table, Button, Form, Image } from "react-bootstrap";
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
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePrescriptionChange = (e) => {
    setPrescriptionFile(e.target.files[0]);
  };

  const handleAddPaymentMethodAndCreateOrder = async () => {
    try {
      if (cart.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const formData = new FormData();
      formData.append("amount", total);
      if (prescriptionFile) {
        formData.append("image", prescriptionFile);
      }

      try {
        const orderResponse = await createOrder(formData).unwrap();
        const paymentData = { amount: total };
        const paymentResponse = await addPaymentMethod(paymentData).unwrap();
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
      <h1 className="text-center">Upload Prescription</h1>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Prescription</Form.Label>
          <Form.Control
            type="file"
            onChange={handlePrescriptionChange}
            accept=".pdf,.jpeg,.jpg,.png"
          />
          {prescriptionFile && (
            <div className="mt-3">
              <Image
                src={URL.createObjectURL(prescriptionFile)} // Create a URL for the uploaded file
                alt="Uploaded Prescription"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
                fluid
              />
              <p>Please upload your prescription before paying.</p>
            </div>
          )}
        </Form.Group>
      </Form>

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
          disabled={!prescriptionFile} // Disable button if no file is uploaded
        >
          {isCreatingOrder || isAddingPaymentMethod
            ? "Loading..."
            : "Confirm order and pay"}
        </Button>
      </div>
    </div>
  );
};

export default CheckOutScreen;
