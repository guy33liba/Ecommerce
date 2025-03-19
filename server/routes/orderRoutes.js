import express from "express";
import Order from "../schema/OrderSchema.js";
const router = express.Router();

router.post("/", async (req, res) => {
 try {
  const { shippingAddress, paymentMethod, items } = req.body;

  if (!shippingAddress || !paymentMethod || !items || items.length === 0) {
   return res.status(400).json({ message: "Missing required Fields." });
  }

  // Calculate the total dynamically
  const total = items.reduce((total, item) => {
   return total + item.price * item.quantity;
  }, 0);

  if (total === 0) {
   return res.status(400).json({ message: "Total cannot be 0." });
  }

  // Simulate payment success (for now)
  const paymentSuccess = true;
  if (!paymentSuccess) {
   return res.status(400).json({ message: "Payment Failed" });
  }

  // Create the new order with the dynamically calculated total
  const newOrder = new Order({
   shippingAddress,
   paymentMethod,
   items,
   total,
  });

  console.log(newOrder); // Debugging: Log the order

  await newOrder.save();

  res.status(200).json({
   message: "Order placed Successfully",
   order: newOrder,
  });
 } catch (error) {
  console.error("Checkout Error:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }
});

router.get("/latest", async (req, res) => {
 try {
  const latestOrder = await Order.findOne().sort({ createdAt: -1 }).limit(1);
  res.status(200).json(latestOrder);
 } catch (error) {
  console.error("Error Fetching order:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }
});
export default router;
