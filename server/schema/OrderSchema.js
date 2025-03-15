import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
 shippingAddress: { type: String, required: true },
 paymentMethod: { type: String, reuqired: true },
 item: [
  {
   name: String,
   price: Number,
   image: String,
   quantity: Number,
  },
 ],
 total: { type: Number, required: true },
 status: { type: String, default: "pending" },
 createAt: { type: Date, defualt: Date.now },
});
const Order = mongoose.model("Order", OrderSchema);
export default Order;
