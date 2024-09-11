import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = ({ onManageMedications }) => {
  return (
    <Container className="mt-5">
      <Row className="d-flex justify-content-center">
        <Col md={4} className="text-center">
          <Link to="/admin/users">
            <Button variant="primary" size="lg" block>
              Manage Users
            </Button>
          </Link>
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
