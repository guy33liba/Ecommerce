import express from "express";
import Cart from "../schema/CartSchema.js"; // Adjust this path as needed
import Product from "../schema/ProductSchema.js"; // Adjust path as needed

const router = express.Router();

router.post("/", async (req, res) => {
 try {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
   return res.status(404).json({ message: "Product not found" });
  }

  let cartItem = await Cart.findOne({ productId });

  if (cartItem) {
   cartItem.quantity += quantity;
  } else {
   cartItem = new Cart({
    productId,
    quantity,
    name: product.name,
    price: product.price,
    image: product.image,
   });
  }

  await cartItem.save();
  const allCartItems = await Cart.find();
  res.status(201).json(allCartItems);
 } catch (error) {
  console.error("Error adding item to cart:", error);
  res.status(500).json({ message: "Failed to add item to cart" });
 }
});

//

router.get("/", async (req, res) => {
 try {
  const cartItems = await Cart.find().populate("productId");
  res.status(200).json(cartItems);
 } catch (error) {
  res.status(500).json({ message: "Error fetching cart items", error });
 }
});

//

router.put("/:id", async (req, res) => {
 try {
  const { quantity } = req.body;
  const { id } = req.params;

  const cartItem = await Cart.findById(id);
  if (!cartItem) {
   return res.status(404).json({ message: "Cart item not found" });
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  const cartUpdated = await Cart.find(); // Fetch updated cart items
  res.status(200).json(cartUpdated);
 } catch (error) {
  console.error("Error updating cart item:", error);
  res.status(500).json({ message: "Error updating cart item", error: error.message });
 }
});

//

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

//

router.delete("/", async (req, res) => {
 try {
  await Cart.deleteMany({});
  const updatedCart = await Cart.find();
  res.status(200).json(updatedCart);
 } catch (error) {
  console.error("Error deleting cart");
 }
});
export default router;
