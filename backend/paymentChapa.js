import { useState } from "react";
import axios from "axios";

export default function PaymentChapa() {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "ETB",
    email: "",
    firstName: "",
    lastName: "",
    txRef: `tx-${Date.now()}`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/create-payment", formData);
      window.location.href = response.data.data.checkout_url;
    } catch (error) {
      console.error("Payment initialization failed:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <button type="submit">Pay Now</button>
    </form>
  );
}
