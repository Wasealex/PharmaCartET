import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { parseImageUrl } from "../../utils/imageUtils";
import defaultimg from "../../assets/default/defaultmedication.png";

const MedicationDetails = ({ medication }) => {
  const parsedImageUrl = "/" + parseImageUrl(medication.imageUrl);
  const medicationImage = parsedImageUrl === "/" ? defaultimg : parsedImageUrl;

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <b>Name</b>: {medication.name}
              </Card.Title>
              <br />
              {medicationImage && (
                <Image
                  src={medicationImage}
                  alt={medication.name}
                  style={{ width: "100%", height: "250px" }}
                />
              )}
              <Card.Text>
                <b>Description</b>: {medication.description}
              </Card.Text>
              <Card.Text>
                <b>Price</b>: ${medication.price}
              </Card.Text>
              <Card.Text>
                <b>Stock</b>: {medication.stock}
              </Card.Text>
              <Card.Text>
                <b>Category</b>: {medication.category}
              </Card.Text>
              <Card.Text>
                <b>Dosage Form</b>: {medication.dosageForm}
              </Card.Text>
              <Card.Text>
                <b>Dosage Instructions</b>: {medication.dosageInstructions}
              </Card.Text>
              <Card.Text>
                <b>Side Effects</b>: {medication.sideEffects.join(", ")}
              </Card.Text>
              <Card.Text>
                <b>Interactions</b>: {medication.interactions.join(", ")}
              </Card.Text>
              <Card.Text>
                <b>Manufacturer</b>: {medication.manufacturer}
              </Card.Text>
              <Card.Text>
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
