import React from "react";
import { useGetCartQuery } from "../slices/cartApiSlice";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const navigate = useNavigate();
  const { data: cart, error, isLoading } = useGetCartQuery();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1 className="text-center">Cart</h1>
      <Button variant="primary" onClick={() => navigate("/")} className="mb-3">
        Back to Medications
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CartScreen;
