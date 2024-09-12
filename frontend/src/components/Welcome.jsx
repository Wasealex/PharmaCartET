import React from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { useGetMedicationsQuery } from "../slices/medicationApiSlice";
import { useAddToCartMutation } from "../slices/cartApiSlice"; // Import the mutation
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Welcome = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userName = userInfo?.name || "User";
  const navigate = useNavigate();
  const { data: medications, error, isLoading } = useGetMedicationsQuery();
  const [addToCart, { isLoading: isAdding, error: addError }] =
    useAddToCartMutation();

  const handleAddToCart = async (id) => {
    try {
      const medication = medications.find(
        (medication) => medication._id === id
      );
      await addToCart(medication._id);
      toast.success("Medication added to cart");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!medications) {
    return <h1>Loading...</h1>;
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Container>
      <h1>Welcome {userName}, here are your medications:</h1>
      <h1 className="text-center">Medications</h1>

      {addError && (
        <Alert variant="danger">Error adding to cart: {addError.message}</Alert>
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
                  onClick={() => handleAddToCart(medication._id)}
                  className="d-block d-md-inline-block"
                  disabled={isAdding} // Disable button while adding
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Welcome;
