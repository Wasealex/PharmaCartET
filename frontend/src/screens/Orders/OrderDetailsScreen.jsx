import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../slices/orderApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { Table, Button, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import defaultimg from "../../assets/default/defaultprescription.png";
import { parseImageUrl } from "../../utils/imageUtils";
import "../../styles/OrderDetailsScreen.style.css"; // Import CSS file

const OrderDetailsScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id);

  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error("Error fetching order details");
    return <div>Error fetching order details</div>;
  }

  const prescriptionImage = "/" + parseImageUrl(order?.imageUrl);
  const prescriptionImageDefault =
    prescriptionImage === "/" ? defaultimg : prescriptionImage;

  console.log(prescriptionImage);
  console.log(prescriptionImageDefault);
  console.log(defaultimg);
  console.log(parseImageUrl(order?.imageUrl));

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Calculate total price for all medications
  const calculateTotalPrice = () => {
    return order.medications
      .reduce((total, medication) => {
        return total + medication.price * medication.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="order-details-screen-container">
      <h1 className="text-center mb-4">Order {id}</h1>
      <Card className="mb-4 order-details-screen-card">
        <Card.Body>
          <Table
            striped
            bordered
            hover
            responsive
            className="order-details-screen-table"
          >
            <thead>
              <tr>
                <th>Medication</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.medications.map((medication) => (
                <tr key={medication.medicationId}>
                  <td>{medication.medicationName}</td>
                  <td>{medication.quantity}</td>
                  <td>${medication.price.toFixed(2)}</td>
                  <td>
                    ${(medication.price * medication.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right">
                  <strong>Subtotal:</strong>
                </td>
                <td>
                  <strong>${calculateTotalPrice()}</strong>
                </td>
              </tr>
            </tfoot>
          </Table>
          <div className="text-center">
            <h4>Prescription Image</h4>
            <img
              src={prescriptionImageDefault}
              alt="Prescription"
              className="order-details-prescription-image"
              onClick={handleShow} // Open modal on click
            />
            <div className="mt-2">
              <a
                href={prescriptionImageDefault}
                download
                className="btn btn-primary"
              >
                Download Prescription
              </a>
            </div>
          </div>
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for zooming in on the prescription image */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={prescriptionImageDefault}
            alt="Prescription"
            className="order-details-modal-image"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderDetailsScreen;
