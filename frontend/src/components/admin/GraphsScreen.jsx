import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Loader from "../../components/Loader";
import MyBarChart from "../admin/BarChart";
import MyBarChart2 from "../admin/BarChart2";

const GraphsScreen = () => {
  const [showGraphs, setShowGraphs] = useState(false);
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching orders.</div>;

  const salesData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();

    // Sum totalPrice and quantity
    const totalQuantity = order.medications.reduce(
      (sum, med) => sum + med.quantity,
      0
    );
    const totalPrice = order.totalPrice; // Assuming this is already the total for the order

    const existingEntry = acc.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.total += totalPrice; // Total sales for the date
      existingEntry.quantity += totalQuantity; // Total quantity for the date
    } else {
      acc.push({ date, total: totalPrice, quantity: totalQuantity });
    }

    return acc;
  }, []);

  const ordersData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    const existingEntry = acc.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.total += 1;
    } else {
      acc.push({ date, total: 1 });
    }

    return acc;
  }, []);

  return (
    <div className="d-flex">
      <div className="sidebar">
        <h1>Graphs</h1>
        <ul>
          <li>
            <Button variant="primary" onClick={() => setShowGraphs("sales")}>
              Total Sales by Date
            </Button>
          </li>
          <li>
            <Button variant="primary" onClick={() => setShowGraphs("orders")}>
              Total Orders by Date
            </Button>
          </li>
        </ul>
      </div>
      {showGraphs === "sales" && (
        <div className="graphs" style={{ width: "100vw" }}>
          <h1>Total Sales by Date</h1>
          <MyBarChart data={salesData} />
        </div>
      )}
      {showGraphs === "orders" && (
        <div className="graphs" style={{ width: "100vw" }}>
          <h1>Total Orders by Date</h1>
          <MyBarChart2 data={ordersData} />
        </div>
      )}
    </div>
  );
};

export default GraphsScreen;
