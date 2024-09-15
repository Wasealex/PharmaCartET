import React, { useState } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { useGetMedicationsQuery } from "../slices/medicationApiSlice";
import { useAddToCartMutation } from "../slices/cartApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MedicationList from "../components/medication/MedicationList.jsx";
import CategoryFilter from "../components/medication/CategoryFilter.jsx";
import MedicationDetails from "../components/medication/MedicationDetails.jsx";

const Welcome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userName = userInfo?.name || "User";
  const navigate = useNavigate();
  const { data: medications, error, isLoading } = useGetMedicationsQuery();
  const [addToCart, { isLoading: isAdding, error: addError }] =
    useAddToCartMutation();

  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState(null); // State to track loading medication

  const handleAddToCart = async (id) => {
    setLoadingId(id); // Set the loading ID to the current medication
    try {
      await addToCart(id);
      toast.success("Medication added to cart");
      window.location.reload(); // Reload the page after adding to cart
    } catch (err) {
      console.error(err);
      setLoadingId(null); // Reset loading ID if there's an error
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

  const filteredMedications = medications.filter(
    (med) =>
      (selectedCategory === "All" || med.category === selectedCategory) &&
      med.stock > 0 &&
      new Date(med.expiryDate) > new Date()
  );

  const searchedMedications = filteredMedications.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1>Welcome {userName}, here are your medications:</h1>
      <Button
        variant="primary"
        onClick={() => navigate("/drug-interaction-checker")}
        className="mt-3"
      >
        Drug Interaction Checker
      </Button>
      {/* Search Box */}
      <Form.Group controlId="searchMedication">
        <Form.Control
          type="text"
          placeholder="Search medications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Row>
        <Col md={3}>
          <h4>Categories</h4>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            medications={medications}
          />
        </Col>
        <Col md={9}>
          <MedicationList
            medications={searchedMedications}
            searchTerm={searchTerm}
            handleAddToCart={handleAddToCart}
            handleViewDetails={handleViewDetails}
            isAdding={isAdding}
            addError={addError}
            loadingId={loadingId} // Pass loadingId to MedicationList
          />

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
