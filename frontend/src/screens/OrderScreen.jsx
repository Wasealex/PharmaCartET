import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../slices/orderApiSlice";
import { Table, Button, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import OrderDetails from "../components/order/OrderDetails";
import "../styles/welcome.styles.css";
import "../styles/orderScreen.styles.css";

const OrderScreen = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useGetOrdersQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) {
    return <Loader />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div>
        <h1>No orders found</h1>
      </div>
    );
  }

  const filteredOrders = orders.filter((order) =>
    order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = filteredOrders.sort((a, b) =>
    sortBy === "createdAt"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : sortBy === "totalPrice"
      ? b.totalPrice - a.totalPrice
      : a.user.name.localeCompare(b.user.name)
  );

  const handleViewOrder = (id) => {
    setShowDetails(true);
    setSelectedOrder(sortedOrders.find((order) => order._id === id));
    navigate(`/admin/orders/${id}`);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  const subtotal = sortedOrders.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  return (
    <div className="order-screen-container">
      <hr className="welcome__hr" />
      <Form className="welcome__search welcome__search-input">
        <Form.Control
          className="order-screen-form-control order-screen-search-input"
          type="text"
          placeholder="Search by user name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>
      <Form className="mb-3">
        <Form.Select
          className="welcome__search welcome__search-input"
          aria-label="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Sort by date</option>
          <option value="totalPrice">Sort by price</option>
          <option value="userName">Sort by user name</option>
        </Form.Select>
      </Form>
      <h2 className="order-screen-subtotal-heading">
        Subtotal: ${subtotal.toFixed(2)}
      </h2>
      <Table className="order-screen-table striped bordered hover responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <Button
                  className="order-screen-btn-light"
                  onClick={() => handleViewOrder(order._id)}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showDetails && (
        <Card
          className="order-screen-card"
          style={{ width: "300px", position: "absolute", right: "20px" }}
        >
          <Card.Header
            className="order-screen-card-header"
            closeButton
            onClick={handleClose}
          >
            Order Details
          </Card.Header>
          <Card.Body className="order-screen-card-body">
            <OrderDetails order={selectedOrder} />
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default OrderScreen;
