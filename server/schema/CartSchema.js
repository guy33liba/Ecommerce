import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
 userId: { type: String, ref: "User", required: true },
 productId: { type: String, ref: "Product" },
 quantity: { type: Number, default: 1 },
 name: { type: String },
 price: { type: Number },
 image: { type: String },
});

export default mongoose.model("Cart", CartSchema);
