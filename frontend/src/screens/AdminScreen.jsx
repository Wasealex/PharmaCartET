// src/pages/AdminScreen.jsx
import React, { useState } from "react";
import AdminDashboard from "../components/admin/AdminDashboard";
import MedicationScreen from "../screens/MedicationScreen";
import OrderScreen from "../screens/OrderScreen";
import InventoryScreen from "../components/admin/InventoryScreen";
import SalesScreen from "../components/admin/SalesScreen";
import GraphsScreen from "../components/admin/GraphsScreen";

const AdminScreen = () => {
  const [showScreen, setShowScreen] = useState("");

  const handleManageMedications = () => {
    setShowScreen("medications");
  };

  const handleManageOrders = () => {
    setShowScreen("orders");
  };

  const handleManageInventories = () => {
    setShowScreen("inventories");
  };

  const handleManageSales = () => {
    setShowScreen("sales");
  };

  const handleShowGraphs = () => {
    setShowScreen("graphs");
  };

  return (
    <div>
      <AdminDashboard
        onManageMedications={handleManageMedications}
        onManageOrders={handleManageOrders}
        onManageInventories={handleManageInventories}
        onManageSales={handleManageSales}
        onShowGraphs={handleShowGraphs}
      />
      {showScreen === "medications" && <MedicationScreen />}
      {showScreen === "orders" && <OrderScreen />}
      {showScreen === "inventories" && <InventoryScreen />}
      {showScreen === "sales" && <SalesScreen />}
      {showScreen === "graphs" && <GraphsScreen />}
    </div>
  );
};

export default AdminScreen;
