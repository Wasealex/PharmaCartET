import React from "react";
import CartDetails from "../components/cart/CartDetails";
import { Button } from "react-bootstrap";
import { FiRefreshCw } from "react-icons/fi";
import Loader from "../components/Loader";
const CartScreen = () => {
  return (
    <div>
      <Button
        onClick={() => window.location.reload()}
        className="mb-3 md-2 refresh-button"
        title="Refresh"
        style={{ float: "right" }}
      >
        <FiRefreshCw />
      </Button>

      <CartDetails />
    </div>
  );
};

export default CartScreen;
