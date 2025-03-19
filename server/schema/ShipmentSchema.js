import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
 {
  shipmentId: {
   type: String,
   required: true,
   unique: true,
  },
  userId: {
   type: String,
   ref: "User",
   required: true,
  },
  address: String,
  status: {
   type: String,
   default: "Processing",
  },
  trackingNumber: String,
  dateShipped: Date,
  dateDelivered: Date,
 },
 { timestamps: true }
);
const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
