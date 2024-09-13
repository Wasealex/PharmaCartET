import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const AdminDashboard = ({ onManageMedications, onManageOrders }) => {
  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center">
        <Col md={4} className="text-center">
          <Button variant="primary" size="lg" block onClick={onManageOrders}>
            Manage Orders
          </Button>
        </Col>
        <Col md={4} className="text-center">
          <Button
            variant="primary"
            size="lg"
            block
            onClick={onManageMedications}
          >
            Manage Medications
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
