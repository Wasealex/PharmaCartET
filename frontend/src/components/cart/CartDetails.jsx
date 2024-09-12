import React from "react";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
  useClearCartMutation,
} from "../../slices/cartApiSlice";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const CartDetails = () => {
  const navigate = useNavigate();
  const { data: cart, error, isLoading } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [deleteItem] = useDeleteCartMutation();
  const [updateItem] = useUpdateCartMutation();
  const [clearCart] = useClearCartMutation();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const handleAddToCart = (itemId) => {
    try {
      addToCart(itemId);
      toast.success("Item added to cart");
      window.location.reload();
      navigate("/cart");
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  };
  const handleUpdateQuantity = (itemId, quantity) => {
    updateItem({ id: itemId, quantity });
    toast.success("Quantity updated successfully");
    window.location.reload();
    navigate("/cart");
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId);
    toast.success("Item deleted successfully");
    window.location.reload();
    navigate("/cart");
  };

  const handleClearCart = () => {
    try {
      if (window.confirm("Are you sure you want to clear the cart?") && cart) {
        clearCart();
        toast.success("Cart cleared successfully");
        window.location.reload();
        navigate("/cart");
      }
    } catch (error) {
      toast.error("Error clearing cart");
    }
  };

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
                  <Button
                    onClick={() => handleAddToCart(item._id)}
                    className="ms-2"
                  >
                    <FaCartPlus />
                  </Button>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item._id, Number(e.target.value))
                    }
                    min="1"
                    size="sm"
                    style={{
                      width: "70px",
                      textAlign: "center",
                      fontSize: "3.5ch",
                    }}
                  />
                  <Button
                    onClick={() => handleDelete(item._id)}
                    className="ms-2"
                    variant="danger"
                  >
                    <BsFillCartDashFill />
                  </Button>
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
          <tr>
            <td colSpan="3" className="text-right">
              Total
            </td>
            <td>${total?.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CartDetails;
