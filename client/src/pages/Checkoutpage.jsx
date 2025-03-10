import React, { useReducer, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkoutpage = () => {
 const [form, setForm] = useState({
  shippingAddress: "",
  paymentMethod: "",
  isPaymentProcessing: false,
 });
 const { state } = useCart();
 const navigate = useNavigate();

 if (!state || !state.items) {
  return <div>Loading...</div>;
 }
 const { items } = state;
 const total = items.reduce((sum, item) => sum + item.price, 0);
 const handleCheckoutSubmit = async (e) => {
  e.preventDefault();
  if (!form.shippingAddress || !form.paymentMethod) {
   alert("Please Fill Out All Fields");
   return;
  }
  setForm({ ...form, isPaymentProcessing: true });
  try {
   const response = await axios.post("/api/payment", {
    shippingAddress: form.shippingAddress,
    paymentMethod: form.paymentMethod,
    items: state.items,
    total,
   });
   if (response.status === 200) {
    navigate("/orderConfirmation");
   } else {
    alert("Payment failed. Please Try Again.");
   }
  } catch (error) {
   console.error("Payment Error:", error);
   alert("Payment Failed. Please try again");
  } finally {
   setForm({
    ...form,
    isPaymentProcessing: false,
   });
  }
 };
 return (
  <div>
   <h1>Checkout</h1>
   <h3>Order Summary:</h3>
   {items.map((item) => (
    <div key={item.id}>
     <h3>{item.name}</h3>
     <p>Price: ${item.price}</p>
    </div>
   ))}
   <h3>Total: ${total}</h3>

   {/* Checkout Form */}
   <form onSubmit={handleCheckoutSubmit}>
    <div>
     <label>Shipping Address:</label>
     <input
      type="text"
      value={form.shippingAddress}
      onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
      placeholder="Enter your shipping address"
      required
     />
    </div>
    <div>
     <label>Payment Method:</label>
     <select
      value={form.paymentMethod}
      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
      required
     >
      <option value="">Select Payment Method</option>
      <option value="credit-card">Credit Card</option>
      <option value="paypal">PayPal</option>
      {/* Add more payment methods as needed */}
     </select>
    </div>

    {/* Show processing state */}
    {form.isPaymentProcessing ? (
     <div>Processing your payment...</div>
    ) : (
     <button type="submit">Proceed to Payment</button>
    )}
   </form>
  </div>
 );
};

export default Checkoutpage;
