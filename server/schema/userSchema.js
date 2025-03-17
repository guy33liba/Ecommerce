import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
  name: String,
  email: {
   type: String,
   required: true,
   unique: true,
  },
  password: {
   type: String,
   required: true,
  },
  cart: [
   {
    productId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Product",
     required: true,
    },
    quantity: {
     type: Number,
     required: true,
     default: 1,
    },
    name: { type: String },
    price: { type: Number },
    image: { type: String },
   },
  ],
  shipments: [
   {
    shipmentId: {
     type: String,
     required: true,
    },
    address: String,
    status: {
     type: String,
     default: "Processing",
    },
    trackingNumber: String,
    dateShipped: Date,
   },
  ],
 },
 { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
