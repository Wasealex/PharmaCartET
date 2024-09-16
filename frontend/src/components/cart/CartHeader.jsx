import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import "../../styles/welcome.styles.css";
import "../../styles/cart.style.css";

const CartHeader = ({ cart, handleClearCart, navigate }) => {
  const [showModal, setShowModal] = useState(false);
  const total = cart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <span className="cart_logo">
        <BsCart4 />
      </span>
      <hr className="welcome__hr" />
      <Button
        variant="primary"
        onClick={() => navigate("/")}
        className="mb-3 ms-2"
      >
        Back to Medications
      </Button>
      <Button
        variant="secondary"
        onClick={handleClearCart}
        className="mb-3 ms-3"
      >
        Clear Cart
      </Button>
      <Button
        variant="outline-primary"
        onClick={handleShowModal}
        className="mb-3 ms-3"
      >
        View Cart
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {cart?.map((item) => (
              <li key={item._id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClearCart}>
            Clear Carts
          </Button>
        </Modal.Footer>
      </Modal>
      <hr className="welcome__hr" />
      <h2>Total: ${total?.toFixed(2)}</h2>
      <hr className="welcome__hr" />
    </div>
  );
};

export default CartHeader;
