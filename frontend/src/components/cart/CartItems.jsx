import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const CartItems = ({
  cart,
  handleAddToCart,
  handleUpdateQuantity,
  handleDelete,
}) => {
  const [editableQuantities, setEditableQuantities] = useState({});

  const handleQuantityChange = (itemId, value) => {
    setEditableQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleUpdateClick = (itemId, currentQuantity) => {
    const newQuantity = editableQuantities[itemId] || currentQuantity;
    handleUpdateQuantity(itemId, newQuantity);
    setEditableQuantities((prev) => ({ ...prev, [itemId]: undefined })); // Reset local state
    window.location.reload(); // Reload the page after updating
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {cart?.length > 0 ? (
          cart.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    onClick={() => {
                      handleAddToCart(item._id);
                      window.location.reload();
                    }}
                    className="ms-2"
                    size="sm" // Make the button size smaller
                  >
                    <FaCartPlus />
                  </Button>
                  <Form.Control
                    type="number"
                    value={
                      editableQuantities[item._id] !== undefined
                        ? editableQuantities[item._id]
                        : item.quantity
                    }
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                    min="1"
                    size="sm"
                    style={{
                      width: "100px", // Change size of the input box
                      textAlign: "center",
                      fontSize: "1.5rem", // Adjust font size for better visibility
                      margin: "0 5px", // Add horizontal margin
                    }}
                  />

                  <Button
                    onClick={() => {
                      handleDelete(item._id);
                      window.location.reload();
                    }}
                    className="ms-2"
                    variant="danger"
                    size="sm" // Make the button size smaller
                  >
                    <BsFillCartDashFill />
                  </Button>
                  <Button
                    onClick={() => handleUpdateClick(item._id, item.quantity)}
                    className="ms-2"
                    variant="success"
                    size="sm" // Make the button size smaller
                  >
                    Update
                  </Button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              Your cart is empty.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CartItems;
