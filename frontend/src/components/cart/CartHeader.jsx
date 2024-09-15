import React from "react";
import { Button } from "react-bootstrap";

const CartHeader = ({ cart, handleClearCart, navigate }) => {
  const total = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-center">Cart</h1>
      <Button
        variant="primary"
        onClick={() => navigate("/")}
        className="mb-3 ms-2"
      >
        Back to Medications
      </Button>
      <Button variant="danger" onClick={handleClearCart} className="mb-3 ms-3">
        Clear Cart
      </Button>
      <h2>Total: ${total?.toFixed(2)}</h2>
    </div>
  );
};

export default CartHeader;
