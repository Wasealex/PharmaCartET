import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { parseImageUrl } from "../../utils/imageUtils";
import defaultimg from "../../assets/default/defaultmedication.png";
import "../../styles/medicationDetails.style.css";

const MedicationDetails = ({ medication }) => {
  const parsedImageUrl = "/" + parseImageUrl(medication.imageUrl);
  const medicationImage = parsedImageUrl === "/" ? defaultimg : parsedImageUrl;

  return (
    <Container className="medication-details-container">
      <Row>
        <Col>
          <Card className="medication-details-card">
            <Card.Body>
              <Card.Title className="medication-details-card-title">
                <b>Name</b>: {medication.name}
              </Card.Title>
              <br />
              {medicationImage && (
                <Image
                  src={medicationImage}
                  alt={medication.name}
                  className="medication-details-card-img"
                />
              )}
              <Card.Text className="medication-details-card-text">
                <b>Description</b>: {medication.description}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Price</b>: ${medication.price}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Stock</b>: {medication.stock}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Category</b>: {medication.category}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Dosage Form</b>: {medication.dosageForm}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Dosage Instructions</b>: {medication.dosageInstructions}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Side Effects</b>: {medication.sideEffects.join(", ")}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Interactions</b>: {medication.interactions.join(", ")}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Manufacturer</b>: {medication.manufacturer}
              </Card.Text>
              <Card.Text className="medication-details-card-text">
                <b>Expiry Date</b>:{" "}
                {new Date(medication.expiryDate).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicationDetails;
