import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
 {
  userId: { type: String, required: true }, // User ID (assumed to be a string, could be ObjectId if using user references)
  productId: { type: String, required: true }, // Product ID (could be ObjectId if using product references)
  quantity: { type: Number, required: true, default: 1 }, // Quantity of the product
 },
 {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
 }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
