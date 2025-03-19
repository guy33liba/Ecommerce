import express from "express";
import Order from "../schema/OrderSchema.js";
import Shipment from "../schema/ShipmentSchema.js";
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

router.get("/all", async (req, res) => {
 try {
  const orders = await Order.find(); // Fetch all orders
  const allShipments = [];

  // Fetch shipments for each order
  for (let order of orders) {
   const shipments = await Shipment.find({ orderId: order._id });
   allShipments.push({
    orderId: order._id,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    total: order.total,
    shipmentDetails: shipments,
   });
  }

  res.status(200).json(allShipments);
 } catch (error) {
  console.error("Error Fetching orders or shipments:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }
});
export default router;
