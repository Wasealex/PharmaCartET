import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isAdmin] = useState(userInfo.isAdmin);
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
export default AdminRoute;
