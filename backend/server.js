import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // Import Helmet
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

import userRoutes from "./routes/userRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Connect to the database
connectDB();

const app = express();

// Middleware setup
app.use(helmet()); // Use Helmet for security
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://pharmacartet-frontend.onrender.com", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server Started on port ${port}`));
