import express from "express";
import Cart from "../schema/CartSchema.js"; // Adjust this path as needed
import Product from "../schema/ProductSchema.js"; // Adjust path as needed
import { authenticateUser } from "./authenticationRoute.js";

const router = express.Router();

// Add item to cart
router.post("/", authenticateUser, async (req, res) => {
 try {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Get user ID from authentication

  const product = await Product.findById(productId);
  if (!product) {
   return res.status(404).json({ message: "Product not found" });
  }

  let cartItem = await Cart.findOne({ userId, productId });

  if (cartItem) {
   cartItem.quantity += quantity; // Update quantity if item exists
  } else {
   // Create a new cart item if it doesn't exist
   cartItem = new Cart({
    userId, // Associate the item with the user
    productId,
    quantity,
    name: product.name,
    price: product.price,
    image: product.image,
   });
  }

  await cartItem.save();
  const userCart = await Cart.find({ userId }).populate("productId");
  res.status(201).json(userCart);
 } catch (error) {
  console.error("Error adding item to cart:", error);
  res.status(500).json({ message: "Failed to add item to cart" });
 }
});

// Get all cart items for a user
router.get("/", authenticateUser, async (req, res) => {
 try {
  const userId = req.user._id;
  const cartItems = await Cart.find({ user: userId }).populate("productId");
  res.status(200).json(cartItems);
 } catch (error) {
  console.error("Error fetching cart items:", error);
  res.status(500).json({ message: "Error fetching cart items", error });
 }
});

// Update cart item quantity
router.put("/:id", authenticateUser, async (req, res) => {
 try {
  const { quantity } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  // Find the cart item by id and userId
  const cartItem = await Cart.findOne({ _id: id, userId });
  if (!cartItem) {
   return res.status(404).json({ message: "Cart item not found" });
  }

  // Update the quantity
  cartItem.quantity = quantity;
  await cartItem.save();

  // Fetch updated cart items for the user
  const userCart = await Cart.find({ userId }).populate("productId");
  res.status(200).json(userCart);
 } catch (error) {
  console.error("Error updating cart item:", error);
  res.status(500).json({ message: "Error updating cart item", error: error.message });
 }
});

// Delete a specific cart item
router.delete("/:id", authenticateUser, async (req, res) => {
 try {
  const { id } = req.params;
  const userId = req.user._id; // Access the userId from req.user set in the middleware

  // Delete the cart item by matching both userId and cart item ID
  const cartItem = await Cart.findOneAndDelete({ _id: id, userId });

  if (!cartItem) {
   return res.status(404).json({ message: "Cart item not found" });
  }

  // Fetch updated cart items for the user
  const updatedCart = await Cart.find({ userId }).populate("productId");
  res.status(200).json(updatedCart);
 } catch (error) {
  console.error("Error deleting cart item:", error);
  res.status(500).json({ message: "Error deleting cart item", error });
 }
});

// Delete all cart items for a user
router.delete("/", authenticateUser, async (req, res) => {
 try {
  const userId = req.user._id;

  // Delete all items from the user's cart
  await Cart.deleteMany({ userId });

  // Send a success response
  res.status(200).json({ message: "All cart items deleted successfully" });
 } catch (error) {
  console.error("Error deleting all cart items:", error);
  res.status(500).json({ message: "Error deleting all cart items", error });
 }
});

export default router;
