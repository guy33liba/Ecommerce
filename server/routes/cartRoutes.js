import express from "express";
import Cart from "../schema/CartSchema.js"; // Adjust this path as needed

const router = express.Router();

// Add item to cart
router.post("/api/cart", async (req, res) => {
 try {
  const { userId, productId, quantity } = req.body;

  // Validate input data
  if (!userId || !productId || quantity == null) {
   return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if the product already exists in the user's cart
  const existingItem = await Cart.findOne({ userId, productId });
  if (existingItem) {
   // If the item exists, update the quantity
   existingItem.quantity += quantity; // Increase the quantity by the specified amount
   await existingItem.save();
   return res.status(200).json(existingItem); // Return updated cart item
  }

  // If the item doesn't exist, create a new cart item
  const newItem = new Cart({ userId, productId, quantity });
  await newItem.save();

  return res.status(201).json(newItem); // Return the newly added cart item
 } catch (error) {
  console.error("Error adding item to cart:", error);
  return res.status(500).json({ message: "Failed to add item to cart" });
 }
});

export default router;
