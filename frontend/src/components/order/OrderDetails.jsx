import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../slices/orderApiSlice";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const OrderDetails = () => {
  const params = useParams();
  const { data: order } = useGetOrderByIdQuery(params.id);

  if (!order) {
    return <div>Loading...</div>;
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
                  <b>Total</b>: ${order.totalPrice}
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
