import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddMedicationMutation } from "../../slices/medicationApiSlice";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";

const AddMedicationScreen = () => {
  const [medication, setMedication] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [addMedication, { isLoading }] = useAddMedicationMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMedication(medication).unwrap();
      // Reset form fields after successful submission
      setMedication({ name: "", description: "", price: 0 });
      toast.success("Medication added successfully!");
    } catch (error) {
      console.error("Failed to add medication:", error);
      toast.error("Failed to add medication.");
    }
  };

  const handleDone = () => {
    // Navigate to the dashboard without refreshing the page
    navigate("/admin/dashboard");
  };

  return (
    <div className="d-flex flex-column">
      <h1>Add Medication</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            value={medication.description}
            onChange={(e) =>
              setMedication({ ...medication, description: e.target.value })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            value={medication.price}
            onChange={(e) =>
              setMedication({ ...medication, price: Number(e.target.value) })
            }
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Medication"}
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={handleDone}
          disabled={isLoading}
          className="ms-2"
        >
          Done
        </Button>
      </Form>
    </div>
  );
};

export default AddMedicationScreen;
