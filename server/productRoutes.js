import express from "express";
import Product from "./ProductSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
 try {
  const products = await Product.find();
  res.json(products);
 } catch (error) {
  res.status(500).json({ message: "Server error" });
 }
});

router.get("/:id", async (req, res) => {
 try {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not Found" });
  req.json(product);
 } catch (error) {
  res.status(500).send({ message: "Server error" });
 }
});
router.post("/", async (req, res) => {
 const { name, price, image } = req.body;
 try {
  const newProduct = new Product({ name, price, image });
  await newProduct.save();
  res.status(201).json(newProduct);
 } catch (error) {
  res.status(500).send({ message: "Failed to add Product" });
 }
});
export default router;
