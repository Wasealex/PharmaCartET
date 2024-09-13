import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";
import AddMedicationScreen from "./screens/Medications/AddMedicationScreen.jsx";
import UpdateMedicationScreen from "./screens/Medications/UpdateMedicationScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import CheckOutScreen from "./screens/CheckOutScreen.jsx";
import OrderDetailsScreen from "./screens/Orders/OrderDetailsScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/checkout" element={<CheckOutScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminScreen />} />
        <Route path="/admin/add-medication" element={<AddMedicationScreen />} />
        <Route
          path="/admin/update-medication/:id"
          element={<UpdateMedicationScreen />}
        />
        <Route path="/admin/orders/:id" element={<OrderDetailsScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
