import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartTotal = ({ cart }) => {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const getTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getSubtotal = (total) => total / 1.15;

  const getTax = (total) => total - getSubtotal(total);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    const totalText = `Subtotal: $${getSubtotal(getTotal(cart)).toFixed(
      2
    )}\nTax (15%): $${getTax(getTotal(cart)).toFixed(2)}\nTotal: $${getTotal(
      cart
    ).toFixed(2)}`;

    textArea.value = totalText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td>${getSubtotal(getTotal(cart)).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Tax (15%):</td>
            <td>${getTax(getTotal(cart)).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td>${getTotal(cart).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={() => {
            navigate("/checkout");
            window.location.reload();
          }}
          className="mb-3 me-3"
        >
          Checkout
        </Button>
        <Button variant="success" onClick={handleCopy} className="mb-3">
          {isCopied ? "Copied!" : "Copy order details"}
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
