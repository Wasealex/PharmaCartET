import React from "react";
import { Card, Button } from "react-bootstrap";

const MedicationList = ({
  medications,
  searchTerm,
  handleAddToCart,
  handleViewDetails,
  loadingId,
}) => {
  return (
    <div>
      {medications.map((medication) => (
        <Card key={medication._id} className="mb-3">
          <Card.Body>
            <Card.Title>{medication.name}</Card.Title>
            <Card.Text>
              {medication.stock ? "Available" : "Out of Stock"} | Expiry Date:{" "}
              {new Date(medication.expiryDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              | Price: ${medication.price.toFixed(2)}
            </Card.Text>
            <Button
              variant={loadingId === medication._id ? "secondary" : "primary"}
              onClick={() => handleAddToCart(medication._id)}
              disabled={loadingId === medication._id} // Disable if loading
            >
              {loadingId === medication._id ? "Loading..." : "Add to Cart"}
            </Button>
            <Button
              variant="info"
              onClick={() => handleViewDetails(medication)}
              className="ms-2"
            >
              View Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MedicationList;
