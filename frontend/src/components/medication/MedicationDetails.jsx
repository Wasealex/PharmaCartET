import React from "react";
import { useParams } from "react-router-dom";
import { useGetMedicationByIdQuery } from "../../slices/medicationApiSlice";
import { Container, Row, Col, Card } from "react-bootstrap";

const MedicationDetails = () => {
  const params = useParams();

  const { data: medication } = useGetMedicationByIdQuery(params.id);

  if (!medication) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>Medication Details</Card.Header>
            <Card.Body>
              <Card.Title>
                <b>Name</b>: {medication.name}
              </Card.Title>
              <br />
              <Card.Text>
                <b>Description</b>: {medication.description}
              </Card.Text>
              <Card.Text>
                <b>Price</b>: ${medication.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicationDetails;
