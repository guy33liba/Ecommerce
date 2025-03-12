import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
 {
  name: String,
  email: String,
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
   },
  ],
 },
 { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
