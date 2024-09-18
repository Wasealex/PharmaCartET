import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/welcome.styles.css";

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  medications,
}) => {
  return (
    <Row className="category-filter-list">
      {categories.map((category) => {
        const count = medications.filter(
          (med) =>
            med.category === category &&
            med.stock > 0 &&
            new Date(med.expiryDate) > new Date()
        ).length;

        return (
          <Col key={category} md={2} className="mb-2">
            <div
              className={`category-filter-item ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({count})
            </div>
          </Col>
        );
      })}
      <Col md={2} className="mb-2">
        <div
          className={`category-filter-item ${
            selectedCategory === "All" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("All")}
        >
          All Medications ({medications.length})
        </div>
      </Col>
    </Row>
  );
};

export default CategoryFilter;
