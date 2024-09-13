import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import MedicationScreen from "./MedicationScreen";
import OrderScreen from "./OrderScreen";

const AdminScreen = () => {
  const [showScreen, setShowScreen] = useState("");
  const handleManageMedications = () => {
    setShowScreen("medications");
  };

  const handleManageOrders = () => {
    setShowScreen("orders");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminDashboard
        onManageMedications={handleManageMedications}
        onManageOrders={handleManageOrders}
      />
      {showScreen === "medications" && <MedicationScreen />}
      {showScreen === "orders" && <OrderScreen />}
    </div>
  );
};

export default AdminScreen;
