import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Product from "./schema/ProductSchema.js";
import { products } from "./listofproducts.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/authenticationRoute.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";
import path from "path";
const mongoUri = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(express.static("/client/"));

mongoose
 .connect(mongoUri)
 .then(async () => {
  console.log("Mongo connected");
  await Promise.all(
   products.map(async (product) => {
    await Product.findOneAndUpdate({ name: product.name }, product, { upsert: true, new: true });
   })
  );
  console.log("Products updated/inserted successfully");
 })
 .catch((err) => console.error("MongoDB connection Failed:", err));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", shipmentRoutes);
app.get("*", (req, res) => {
 res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});
app.listen(5000, console.log("on 5000 port"));
