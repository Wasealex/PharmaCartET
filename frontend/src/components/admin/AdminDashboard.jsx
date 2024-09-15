// src/components/admin/AdminDashboard.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const AdminDashboard = ({
  onManageMedications,
  onManageOrders,
  onManageInventories,
  onManageSales,
  onShowGraphs,
}) => {
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
      <Row className="d-flex justify-content-center mt-3">
        <Col md={4} className="text-center">
          <Button
            variant="secondary"
            size="lg"
            block
            onClick={onManageInventories}
          >
            Manage Inventories
          </Button>
        </Col>
        <Col md={4} className="text-center">
          <Button variant="secondary" size="lg" block onClick={onManageSales}>
            Manage Sales
          </Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col md={4} className="text-center">
          <Button variant="success" size="lg" block onClick={onShowGraphs}>
            Show Graphs
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
