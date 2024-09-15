import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../slices/orderApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultimg from "../../assets/default/defaultprescription.png";
import { parseImageUrl } from "../../utils/imageUtils";

const OrderDetailsScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("Error fetching order details");
    return <div>Error fetching order details</div>;
  }
  console.log(order);
  const prescriptionImage = "/" + parseImageUrl(order?.imageUrl);
  const prescriptionImageDefault =
    prescriptionImage === "/" ? defaultimg : prescriptionImage;
  console.log(prescriptionImage);
  console.log(prescriptionImageDefault);
  return (
    <div>
      <h1>Order {id}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Medication</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.medications.map((medication) => (
            <tr key={medication.medicationId}>
              <td>{medication.medicationName}</td>
              <td>{medication.quantity}</td>
              <td>${medication.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <h4>PrecsriptionImage</h4>
        <img
          src={prescriptionImageDefault}
          alt="Prescription"
          style={{ objectFit: "contain" }}
        />
      </div>
      <h4>Total Price: ${order.totalPrice}</h4>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </div>
  );
};

export default OrderDetailsScreen;
