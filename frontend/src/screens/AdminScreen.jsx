import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import MedicationScreen from "./MedicationScreen";

const AdminScreen = () => {
  const [showMedicationScreen, setShowMedicationScreen] = useState(false);

  const handleManageMedications = () => {
    setShowMedicationScreen((prev) => !prev); // Toggle the state
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminDashboard onManageMedications={handleManageMedications} />
      {showMedicationScreen && <MedicationScreen />}
    </div>
  );
};

export default AdminScreen;
