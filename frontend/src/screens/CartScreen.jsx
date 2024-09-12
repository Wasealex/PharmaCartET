import React from "react";
import CartDetails from "../components/cart/CartDetails";
import { Button } from "react-bootstrap";

const CartScreen = () => {
  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => window.location.reload()}
        className="mb-3 ms-2"
        title="Refresh"
        style={{ float: "right" }}
        size="sm"
      >
        Refresh
      </Button>

      <CartDetails />
    </div>
  );
};

export default CartScreen;
