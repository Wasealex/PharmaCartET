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
import Loader from "../components/Loader.jsx";

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

  if (isLoading) return <Loader />;
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
    <Container className="welcome">
      <div className="welcome__header">
        <h1>Welcome {userName}</h1>
      </div>
      <hr className="welcome__hr" />
      <div className="welcome__features_header">
        <Button
          variant="primary"
          onClick={() => navigate("/drug-interaction-checker")}
          className="mt-3"
        >
          Drug Interaction Checker
        </Button>
      </div>
      {/* Search Box */}
      <Form.Group controlId="searchMedication" className="welcome__search">
        <Form.Control
          type="text"
          placeholder="Search medications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        medications={medications}
      />
      <hr className="welcome__hr" />
      <MedicationList
        medications={searchedMedications}
        searchTerm={searchTerm}
        handleAddToCart={handleAddToCart}
        handleViewDetails={handleViewDetails}
        isAdding={isAdding}
        addError={addError}
        loadingId={loadingId}
      />

      {/* Modal for Medication Details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="medication-details-title">
            Medication Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body modal-content">
          {selectedMedication && (
            <MedicationDetails medication={selectedMedication} />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Welcome;
