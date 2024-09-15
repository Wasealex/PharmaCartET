import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddMedicationMutation } from "../../slices/medicationApiSlice";
import { toast } from "react-toastify";
import { Form, Button, Image } from "react-bootstrap";

const AddMedicationScreen = () => {
  const [medication, setMedication] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });
  const [addMedication, { isLoading }] = useAddMedicationMutation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", medication.name);
      formData.append("description", medication.description);
      formData.append("price", medication.price);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await addMedication(formData).unwrap();
      // Reset form fields after successful submission
      setMedication({ name: "", description: "", price: 0, image: "" });
      setSelectedImage(null);
      toast.success("Medication added successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Failed to add medication:", error);
      toast.error("Failed to add medication.");
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
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
        <Form.Group className="mb-3">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
          {selectedImage && (
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt={selectedImage.name}
              className="mt-3"
            />
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Medication"}
        </Button>
      </Form>
    </div>
  );
};

export default AddMedicationScreen;
