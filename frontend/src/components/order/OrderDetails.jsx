import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../slices/orderApiSlice";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Loader from "../Loader";

const OrderDetails = () => {
  const params = useParams();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(params.id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Order Details</Card.Header>
              <Card.Body>
                <Card.Title>
                  <b>Name</b>: {order.user}
                </Card.Title>
                <br />
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.medications.map((medication) => (
                      <tr key={medication.medicationId}>
                        <td>{medication.medicationName}</td>
                        <td>{medication.quantity}</td>
                        <td>${medication.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Card.Text>
                  <b>Total</b>: ${order.totalPrice.toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderDetails;
