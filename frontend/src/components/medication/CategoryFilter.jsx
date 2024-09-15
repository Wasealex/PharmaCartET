import React from "react";
import { ListGroup } from "react-bootstrap";

const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  medications,
}) => {
  return (
    <ListGroup>
      <ListGroup.Item action onClick={() => setSelectedCategory("All")}>
        All Medications ({medications.length})
      </ListGroup.Item>
      {categories.map((category) => {
        const count = medications.filter(
          (med) =>
            med.category === category &&
            med.stock > 0 &&
            new Date(med.expiryDate) > new Date()
        ).length;

        return (
          <ListGroup.Item
            key={category}
            action
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category} ({count})
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default CategoryFilter;
