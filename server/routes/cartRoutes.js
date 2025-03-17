import express from "express";
import Cart from "../schema/CartSchema.js"; // Adjust this path as needed
import Product from "../schema/ProductSchema.js"; // Adjust path as needed
import { authenticateUser } from "./authenticationRoute.js";
const router = express.Router();

// router.post("/", async (req, res) => {
//  try {
//   const { productId, quantity } = req.body;
//   const userId = req.user._id;

//   const product = await Product.findById(productId);
//   if (!product) {
//    return res.status(404).json({ message: "Product not found" });
//   }

//   let cartItem = await Cart.findOne({ userId, productId });

//   if (cartItem) {
//    cartItem.quantity += quantity;
//   } else {
//    cartItem = new Cart({
//     userId,
//     productId,
//     quantity,
//     name: product.name,
//     price: product.price,
//     image: product.image,
//    });
//   }

//   await cartItem.save();

//   const allCartItems = await Cart.find();
//   res.status(201).json(allCartItems);
//  } catch (error) {
//   console.error("Error adding item to cart:", error);
//   res.status(500).json({ message: "Failed to add item to cart" });
//  }
// });

// all products and the belong to the user

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
   cartItem.quantity += quantity;
  } else {
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

//

router.get("/", authenticateUser, async (req, res) => {
 try {
  const userId = req.user._id;
  const cartItems = await Cart.find({ userId }).populate("productId");
  res.status(200).json(cartItems);
 } catch (error) {
  console.error("Error fetching cart Items:", error);
  res.status(500).json({ message: "Error fetching cart items", error });
 }
});

//upd

router.put("/:id", authenticateUser, async (req, res) => {
 try {
  const { quantity } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  // Find the cart item
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

//

router.delete("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  if (!cartItem) {
   console.log("not found cartitems");
   return res.status(404).json({ message: "Cart item not found" });
  }
  await Cart.findByIdAndDelete({ id, userId });
  const updatedCart = await Cart.find();
  res.status(200).json(updatedCart);
 } catch (error) {
  console.error("Error deleting cart item:", error);
  res.status(500).json({ message: "Error deleting cart item", error });
 }
});

//

router.delete("/", authenticateUser, async (req, res) => {
 try {
  const userId = req.user._id;

  const updatedCart = await Cart.deleteMany({ userId });

  res.status(200).json(updatedCart);
 } catch (error) {
  console.error("Error deleting cart");
 }
});
export default router;
