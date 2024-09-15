import React from "react";
import { useParams } from "react-router-dom";
import { useGetMedicationByIdQuery } from "../../slices/medicationApiSlice";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { parseImageUrl } from "../../utils/imageUtils";
import deaufltimg from "../../assets/default/defaultmedication.png";
const MedicationDetails = () => {
  const params = useParams();

  const { data: medication } = useGetMedicationByIdQuery(params.id);

  const parsedImageUrl = "/" + parseImageUrl(medication?.imageUrl);
  const medicatioImage = parsedImageUrl === "/" ? deaufltimg : parsedImageUrl;
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
              {medicatioImage && (
                <Image
                  src={medicatioImage}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicationDetails;
