import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
 {
  userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true,
  },
  shipmentId: {
   type: String,
   required: true,
   unique: true,
  },
  address: String,
  status: {
   type: String,
   default: "Processing",
  },
  trackingNumber: String,
  dateShipped: Date,
  dateDelivered: Date,
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
 },
 { timestamps: true }
);
const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;
