import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateMedicationMutation,
  useGetMedicationByIdQuery,
} from "../../slices/medicationApiSlice";
import { toast } from "react-toastify";
import MedicationDetails from "../../components/medication/MedicationDetails";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "react-bootstrap";
const UpdateMedicationScreen = () => {
  const { id } = useParams(); // Get the medication ID from the URL
  const navigate = useNavigate();

  // Fetch the medication data by ID
  const {
    data: medicationData,
    error,
    isLoading: isFetching,
  } = useGetMedicationByIdQuery(id);
  const [updateMedication, { isLoading }] = useUpdateMedicationMutation();

  // Local state for the medication details
  const [medication, setMedication] = useState({
    name: "",
    description: "",
    price: 0,
  });

  // Effect to set medication data when it is fetched
  useEffect(() => {
    if (medicationData) {
      setMedication(medicationData); // Set the medication data to local state
    }
  }, [medicationData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMedication({ id, medication }).unwrap();
      navigate("/admin/dashboard"); // Redirect after successful update
    } catch (error) {
      console.error("Failed to update medication:", error);
    }
  };

  // Loading and error handling
  if (isFetching) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h1 className="text-center">Update Medication</h1>
              {medication && <MedicationDetails medication={medication} />}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication.name}
                    onChange={(e) =>
                      setMedication({ ...medication, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication.description}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    value={medication.price}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        price: Number(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant={isLoading ? "secondary" : "primary"}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Medication"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateMedicationScreen;
