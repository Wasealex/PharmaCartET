// src/components/admin/SalesScreen.jsx
import React, { useState } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Loader from "../../components/Loader";

const SalesScreen = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  const [groupBy, setGroupBy] = useState("date");

  if (isLoading) return <Loader />;
  if (error) return <h1>Error: {error.message}</h1>;

  const groupOrders = (orders) => {
    return orders.reduce((acc, order) => {
      let key;
      const orderDate = new Date(order.createdAt);

      if (groupBy === "date") {
        key = orderDate.toLocaleDateString();
      } else if (groupBy === "month") {
        key = `${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
      } else {
        key = orderDate.getFullYear();
      }

      if (!acc[key]) {
        acc[key] = { total: 0, count: 0 };
      }
      acc[key].total += order.totalPrice; // Summing up total prices
      acc[key].count += 1; // Counting number of orders
      return acc;
    }, {});
  };

  const calculateTax = (total) => total * 0.15; // Assuming 15% tax

  const groupedSales = groupOrders(orders);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <h1 className="text-center">Group By</h1>
          <Form className="mb-3">
            <Form.Group controlId="groupBy">
              <Form.Label>Group By</Form.Label>
              <Form.Control
                as="select"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <h1 className="text-center">Sales Management</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}</th>
                <th>Subtotal</th>
                <th>Tax (15%)</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedSales).map(([key, { total }]) => {
                const tax = calculateTax(total);
                const subtotal = total - tax;
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>${subtotal.toFixed(2)}</td>
                    <td>${tax.toFixed(2)}</td>
                    <td>${total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SalesScreen;
