import express from "express";
import Cart from "../schema/CartSchema.js"; // Adjust this path as needed

const router = express.Router();

// Add item to cart
router.post("/", async (req, res) => {
 try {
  const { productId, quantity, name, price, image } = req.body;
  console.log(productId);
  let cartItem = await Cart.findOne({ productId });

  if (cartItem) {
   cartItem.quantity += quantity;
   await cartItem.save();
  } else {
   cartItem = new Cart({ productId, quantity, name, price, image });
   await cartItem.save();
  }
  const allcartItems = await Cart.find();
  res.status(201).json(allcartItems);
 } catch (error) {
  console.error("Error adding item to cart:", error);
  return res.status(500).json({ message: "Failed to add item to cart" });
 }
});

router.get("/", async (req, res) => {
 try {
  const cartItems = await Cart.find().populate("productId");
  res.status(200).json(cartItems);
 } catch (error) {
  res.status(500).json({ message: "Error fetching cart items", error });
 }
});

router.put("/:id", async (req, res) => {
 try {
  const { quantity } = req.body;
  const { id } = req.params;

  const cartItem = await Cart.findById(id);
  if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
  cartItem.quantity = quantity;
  await cartItem.save();
  res.status(200).json(cartItem);
 } catch (error) {
  res.status(500).json({ message: "Error updaing cart Item", error });
 }
});

router.delete("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  const updatedCart = await Cart.find();
  res.status(200).json(updatedCart);
 } catch (error) {
  console.error("Error deleting cart item:", error);
  res.status(500).json({ message: "Error deleting cart item", error });
 }
});
export default router;
