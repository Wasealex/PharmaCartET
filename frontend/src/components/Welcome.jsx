import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Row,
  Col,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useGetMedicationsQuery } from "../slices/medicationApiSlice";
import { useAddToCartMutation } from "../slices/cartApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MedicationDetails from "../components/medication/MedicationDetails"; // Import the MedicationDetails component

const Welcome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userName = userInfo?.name || "User";
  const navigate = useNavigate();
  const { data: medications, error, isLoading } = useGetMedicationsQuery();
  const [addToCart, { isLoading: isAdding, error: addError }] =
    useAddToCartMutation();

  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All"); // New state for selected category

  const handleAddToCart = async (id) => {
    try {
      await addToCart(id);
      toast.success("Medication added to cart");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = (medication) => {
    setSelectedMedication(medication);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedication(null);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  // Get unique categories
  const categories = [...new Set(medications.map((med) => med.category))];

  // Filter medications based on selected category
  const filteredMedications =
    selectedCategory === "All"
      ? medications
      : medications.filter((med) => med.category === selectedCategory);

  return (
    <Container>
      <h1>Welcome {userName}, here are your medications:</h1>
      <Row>
        <Col md={3}>
          <h4>Categories</h4>
          <ListGroup>
            <ListGroup.Item action onClick={() => setSelectedCategory("All")}>
              All Medications
            </ListGroup.Item>
            {categories.map((category) => (
              <ListGroup.Item
                key={category}
                action
                onClick={() => setSelectedCategory(category)} // Set selected category
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9}>
          {addError && (
            <Alert variant="danger">
              Error adding to cart: {addError.message}
            </Alert>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th className="d-none d-md-table-cell">Description</th>
                <th className="d-none d-md-table-cell">Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedications.map(
                (
                  medication // Use filtered medications
                ) => (
                  <tr key={medication._id}>
                    <td>{medication.name}</td>
                    <td className="d-none d-md-table-cell">
                      {medication.description}
                    </td>
                    <td className="d-none d-md-table-cell">
                      ${medication.price.toFixed(2)}
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleAddToCart(medication._id)}
                        className="d-block d-md-inline-block"
                        disabled={isAdding}
                      >
                        {isAdding ? "Adding..." : "Add to Cart"}
                      </Button>
                      <Button
                        variant="info"
                        onClick={() => handleViewDetails(medication)}
                        className="d-block d-md-inline-block ml-2"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>

          {/* Modal for Medication Details */}
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Medication Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedMedication && (
                <MedicationDetails medication={selectedMedication} />
              )}
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
