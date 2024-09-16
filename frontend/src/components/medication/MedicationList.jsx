import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { IoOpenOutline } from "react-icons/io5";
import "../../styles/welcome.styles.css";

const MedicationList = ({
  medications,
  handleAddToCart,
  handleViewDetails,
  loadingId,
}) => {
  return (
    <Row className="medication-card">
      {medications.map((medication) => (
        <Col key={medication._id} className="mb-3">
          <Card className="medication-card-container">
            <Card.Body className="medication-card-content-container">
              <Card.Title className="medication-card-title ">
                {medication.name}
                <Button
                  onClick={() => handleViewDetails(medication)}
                  className="medication-card-open-button ms-2"
                >
                  <IoOpenOutline />
                </Button>
              </Card.Title>
              <hr />
              <Card.Text className="medication-card-text">
                <div className="blink-me">
                  {medication.stock ? "In Stock" : "Out of Stock"}
                </div>{" "}
                Expiry Date:{" "}
                {new Date(medication.expiryDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
                <div className="medication-card-price">
                  ${medication.price.toFixed(2)}
                </div>
              </Card.Text>
              <Button
                className="medication-card-button"
                variant={loadingId === medication._id ? "secondary" : "primary"}
                onClick={() => handleAddToCart(medication._id)}
                disabled={loadingId === medication._id}
              >
                {loadingId === medication._id ? "Loading..." : "Add to Cart"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MedicationList;
