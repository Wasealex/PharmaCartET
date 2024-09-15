import React from "react";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
  useClearCartMutation,
} from "../../slices/cartApiSlice";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";

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
    addToCart(itemId);
    toast.success("Item added to cart");
    navigate("/cart");
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    updateItem({ id: itemId, quantity });
    toast.success("Quantity updated successfully");
    navigate("/cart");
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId);
    toast.success("Item deleted successfully");
    navigate("/cart");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?") && cart) {
      clearCart();
      toast.success("Cart cleared successfully");
      window.location.reload();
      navigate("/cart");
    }
  };

  return (
    <div>
      <CartHeader
        cart={cart}
        handleClearCart={handleClearCart}
        navigate={navigate}
      />
      <CartItems
        cart={cart}
        handleAddToCart={handleAddToCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleDelete={handleDelete}
      />
      <CartTotal cart={cart} />
    </div>
  );
};

export default CartDetails;
