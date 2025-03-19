import express from "express";
import Shipment from "../schema/ShipmentSchema.js"; // Ensure correct path to your schema
import { authenticateUser } from "./authenticationRoute.js";

const router = express.Router();

// Fetch shipments for a specific user
router.get("/shipments", authenticateUser, async (req, res) => {
 try {
  debugger;
  const userId = req.user.id; // Assuming authMiddleware adds `req.user`
  const shipments = await Shipment.find({ userId });
  res.json({ shipments });
 } catch (error) {
  console.error("Error fetching shipments:", error);
  res.status(500).json({ message: "Server error fetching shipments" });
 }
});

export default router;
