import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./productRoutes.js";
import { products } from "./listofproducts.js";
import Product from "./ProductSchema.js";

const mongoUri =
 "mongodb+srv://guyliba:guyliba33@cluster0.wx8mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
 .connect(mongoUri)
 .then(async () => {
  console.log("Mongo connected");

  // Check if products already exist in the database
  const existingProducts = await Product.countDocuments();

  if (existingProducts === 0) {
   // Insert products only if the collection is empty
   console.log("Inserting products into the database");
   await Product.insertMany(products);
   console.log("Products inserted successfully");
  } else {
   console.log("Products already exist in the database");
  }
 })
 .catch((err) => console.error("MongoDB connection Failed:", err));

app.use("/api/products", productRoutes);

app.listen(5000, console.log("on 5000 port"));
