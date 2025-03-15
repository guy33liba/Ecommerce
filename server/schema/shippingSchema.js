import mongoose, { Model } from "mongoose";

const shippingSchema = new Schema({
 shippingAddresstype: { type: String, required: true },
 paymentMethod: { type: String, required: true },
});
const Shipping = mongoose.model("Shipping", shippingSchema);
export default Shipping;
