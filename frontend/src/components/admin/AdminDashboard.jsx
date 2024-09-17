// src/components/admin/AdminDashboard.jsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../styles/AdminDashboard.style.css";

const AdminDashboard = ({
  onManageMedications,
  onManageOrders,
  onManageInventories,
  onManageSales,
  onShowGraphs,
}) => {
  return (
    <Container className="admin-dashboard-container mt-5">
      <hr className="welcome__hr" />
      <h1>Admin Dashboard</h1>
      <Row className="admin-dashboard-row d-flex justify-content-center">
        <Col md={4} className="text-center">
          <Button
            className="admin-dashboard-btn-primary"
            size="lg"
            block
            onClick={onManageOrders}
          >
            Manage Orders
          </Button>
        </Col>
        <Col md={4} className="text-center">
          <Button
            className="admin-dashboard-btn-primary"
            size="lg"
            block
            onClick={onManageMedications}
          >
            Manage Medications
          </Button>
        </Col>
      </Row>
      <Row className="admin-dashboard-row d-flex justify-content-center mt-3">
        <Col md={4} className="text-center">
          <Button
            className="admin-dashboard-btn-secondary"
            size="lg"
            block
            onClick={onManageInventories}
          >
            Manage Inventories
          </Button>
        </Col>
        <Col md={4} className="text-center">
          <Button
            className="admin-dashboard-btn-secondary"
            size="lg"
            block
            onClick={onManageSales}
          >
            Manage Sales
          </Button>
        </Col>
      </Row>
      <Row className="admin-dashboard-row d-flex justify-content-center mt-3">
        <Col md={4} className="text-center">
          <Button
            className="admin-dashboard-btn-success"
            size="lg"
            block
            onClick={onShowGraphs}
          >
            Show Graphs
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
