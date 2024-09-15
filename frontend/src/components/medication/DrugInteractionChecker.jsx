import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  InputGroup,
  Card,
  Row,
  Col,
} from "react-bootstrap";

const DrugInteractionChecker = ({ medications }) => {
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [interactionResult, setInteractionResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDrugChange = (e) => {
    const value = e.target.value;
    setSelectedDrugs((prev) =>
      prev.includes(value)
        ? prev.filter((drug) => drug !== value)
        : [...prev, value]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedDrugs(medications.map((med) => med.name));
    } else {
      setSelectedDrugs([]);
    }
  };

  const checkInteractions = () => {
    const interactions = {
      "Drug A": ["Drug B", "Drug C"],
      "Drug B": ["Drug A"],
      "Drug C": ["Drug A"],
    };

    const foundInteractions = selectedDrugs.reduce((acc, drug) => {
      const interactingDrugs = interactions[drug] || [];
      interactingDrugs.forEach((interactingDrug) => {
        if (
          selectedDrugs.includes(interactingDrug) &&
          !acc.includes(interactingDrug)
        ) {
          acc.push(interactingDrug);
        }
      });
      return acc;
    }, []);

    if (foundInteractions.length === 0) {
      setInteractionResult("No interactions found.");
    } else {
      setInteractionResult(
        `Interactions found with: ${foundInteractions.join(", ")}`
      );
    }
  };

  // Filter medications based on the search term
  const filteredMedications = medications.filter((medication) =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4>Drug Interaction Checker</h4>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search medications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Medications</Card.Title>
              <Form.Check
                type="checkbox"
                label="Select All"
                onChange={handleSelectAll}
                checked={
                  selectedDrugs.length === filteredMedications.length &&
                  filteredMedications.length > 0
                }
              />
              {filteredMedications.map((medication) => (
                <Form.Check
                  key={medication._id}
                  type="checkbox"
                  label={medication.name}
                  value={medication.name}
                  onChange={handleDrugChange}
                  checked={selectedDrugs.includes(medication.name)}
                />
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>Actions</Card.Title>
              <Button
                variant="primary"
                onClick={checkInteractions}
                disabled={selectedDrugs.length === 0}
              >
                Check Interactions
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Results</Card.Title>
              {interactionResult && (
                <Alert variant="info" className="text-center">
                  {interactionResult}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DrugInteractionChecker;
