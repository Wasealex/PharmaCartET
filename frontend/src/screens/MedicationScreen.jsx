import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import {
  useGetMedicationsQuery,
  useDeleteMedicationMutation,
} from "../slices/medicationApiSlice";
import { useNavigate } from "react-router-dom";

const MedicationScreen = () => {
  const navigate = useNavigate();
  const { data: medications, error, isLoading } = useGetMedicationsQuery();
  const [deleteMedication] = useDeleteMedicationMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medication?")) {
      await deleteMedication(id);
      window.location.reload(); // Refresh after deletion
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Container>
      <h1 className="text-center">Medications</h1>
      <Button
        variant="primary"
        onClick={() => navigate("/admin/add-medication")}
        className="mb-3"
      >
        Add Medication
      </Button>
      <Button
        variant="secondary"
        onClick={() => window.location.reload()}
        className="mb-3 ml-2"
      >
        Refresh
      </Button>

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
          {medications.map((medication) => (
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
                  onClick={() =>
                    navigate(`/admin/update-medication/${medication._id}`)
                  }
                  className="mr-2 d-block d-md-inline-block"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(medication._id)}
                  className="d-block d-md-inline-block"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MedicationScreen;
