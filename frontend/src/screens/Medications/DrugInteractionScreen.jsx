import React from "react";
import { Button, Container } from "react-bootstrap";
import DrugInteractionChecker from "../../components/medication/DrugInteractionChecker";
import { useGetMedicationsQuery } from "../../slices/medicationApiSlice";
import { useNavigate } from "react-router-dom";

const DrugInteractionScreen = () => {
  const navigate = useNavigate();
  const { data: medications, error, isLoading } = useGetMedicationsQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Container>
      <h2>Drug Interaction Checker</h2>
      <Button variant="primary" onClick={() => navigate("/")} className="mb-3">
        Back
      </Button>
      <DrugInteractionChecker medications={medications} />
    </Container>
  );
};

export default DrugInteractionScreen;
