import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./productRoutes.js";
const mongoUri =
 "mongodb+srv://guyliba:guyliba33@cluster0.wx8mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
 .connect(mongoUri)
 .then(() => console.log("mongo connected"))
 .catch((err) => console.error("MongoDB connection Failed:", err));

app.use("/api/products", productRoutes);

app.listen(5000, console.log("on 5000 port"));
