// src/components/admin/InventoryScreen.jsx
import React, { useState } from "react";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import { useGetMedicationsQuery } from "../../slices/medicationApiSlice";
import Loader from "../../components/Loader";

const InventoryScreen = () => {
  const [sortBy, setSortBy] = useState("alphabet");
  const [filterBy, setFilterBy] = useState("all");
  const [orderBy, setOrderBy] = useState("asc");

  const { data: medications, error, isLoading } = useGetMedicationsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1>Error: {error.message}</h1>;

  const getStockColor = (stock) => {
    if (stock > 100) return "table-success"; // Green
    if (stock > 50) return "table-warning"; // Yellow
    return "table-danger"; // Red
  };

  const sortedMedications = [...medications].sort((a, b) => {
    if (sortBy === "alphabet") {
      return a.name.localeCompare(b.name);
    } else {
      return orderBy === "asc" ? a.stock - b.stock : b.stock - a.stock;
    }
  });

  const filteredMedications = sortedMedications.filter((medication) => {
    if (filterBy === "all") return true;
    if (filterBy === "table-success") return medication.stock > 100;
    if (filterBy === "table-warning")
      return medication.stock > 50 && medication.stock <= 100;
    if (filterBy === "table-danger") return medication.stock <= 50;
    return true; // Default case
  });

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Form className="mb-3">
            <Form.Group controlId="sortBy">
              <Form.Label>Sort by</Form.Label>
              <Form.Control
                as="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="alphabet">Alphabet</option>
                <option value="stock">Stock</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="filterBy">
              <Form.Label>Filter by</Form.Label>
              <Form.Control
                as="select"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All</option>
                <option value="table-success">Green</option>
                <option value="table-warning">Yellow</option>
                <option value="table-danger">Red</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="orderBy">
              <Form.Label>Order by</Form.Label>
              <Form.Control
                as="select"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Medication Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedications.map((medication) => (
                <tr
                  key={medication._id}
                  className={getStockColor(medication.stock)}
                >
                  <td>{medication.name}</td>
                  <td>{medication.stock}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default InventoryScreen;
