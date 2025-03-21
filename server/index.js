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
import { fileURLToPath } from "url";
const app = express();

const mongoUri = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});
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
