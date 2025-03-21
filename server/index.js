import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Product from "./schema/ProductSchema.js";
import { products } from "./listofproducts.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/authenticationRoute.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

// Fix "__dirname" issue in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB Connection
mongoose
 .connect(mongoUri)
 .then(async () => {
  console.log("MongoDB Connected");

  // Insert or update products
  await Promise.all(
   products.map(async (product) => {
    await Product.findOneAndUpdate({ name: product.name }, product, { upsert: true, new: true });
   })
  );
  console.log("Products updated/inserted successfully");
 })
 .catch((err) => console.error("MongoDB Connection Failed:", err));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shipment", shipmentRoutes);

// Serve static frontend files
const clientBuildPath = path.join(__dirname, "../client/dist"); // Use "build" if using Create-React-App
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
 res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Root Route
app.get("/", (req, res) => {
 res.send("API is running...");
});

// Start Server
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
