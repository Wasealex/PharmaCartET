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
  Image,
  Modal,
} from "react-bootstrap";

const UpdateMedicationScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: medicationData,
    error,
    isLoading: isFetching,
  } = useGetMedicationByIdQuery(id);
  const [updateMedication, { isLoading }] = useUpdateMedicationMutation();

  const [medication, setMedication] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (medicationData) {
      setMedication(medicationData);
    }
  }, [medicationData]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(medication).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await updateMedication({ id, medication: formData }).unwrap();
      toast.success("Medication updated successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Failed to update medication:", error);
      toast.error("Failed to update medication.");
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (isFetching) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h1 className="text-center">Update Medication</h1>
              {medication && (
                <>
                  <Button variant="info" onClick={handleShowModal}>
                    View Medication Details
                  </Button>
                  <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title>Medication Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <MedicationDetails medication={medication} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication?.name || ""}
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
                    value={medication?.description || ""}
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
                    value={medication?.price || 0}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        price: Number(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="stock">
                  <Form.Label>Stock:</Form.Label>
                  <Form.Control
                    type="number"
                    value={medication?.stock || 0}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        stock: Number(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication?.category || ""}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        category: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="dosageForm">
                  <Form.Label>Dosage Form:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication?.dosageForm || ""}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        dosageForm: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="dosageInstructions">
                  <Form.Label>Dosage Instructions:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication?.dosageInstructions || ""}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        dosageInstructions: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="sideEffects">
                  <Form.Label>Side Effects (comma-separated):</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication?.sideEffects || ""}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        sideEffects: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="interactions">
                  <Form.Label>Interactions (comma-separated):</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication?.interactions || ""}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        interactions: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="manufacturer">
                  <Form.Label>Manufacturer:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medication?.manufacturer || ""}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        manufacturer: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="expiryDate">
                  <Form.Label>Expiry Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={medication?.expiryDate || ""}
                    onChange={(e) =>
                      setMedication({
                        ...medication,
                        expiryDate: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Image:</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                  {selectedImage && (
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt={selectedImage.name}
                      className="mt-3"
                      fluid
                    />
                  )}
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
