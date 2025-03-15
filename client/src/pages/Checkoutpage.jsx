import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import axios from "axios";

const Checkoutpage = () => {
 const { cart } = useCartContext(); // ✅ Fix: Now cart is correctly retrieved
 const [form, setForm] = useState({
  shippingAddress: "",
  paymentMethod: "",
  isPaymentProcessing: false,
 });

 const navigate = useNavigate();
 const total = cart.reduce((sum, item) => sum + item.price, 0);

 const handleCheckoutSubmit = async (e) => {
  e.preventDefault();
  if (!form.shippingAddress || !form.paymentMethod) {
   alert("Please fill out all fields.");
   return;
  }

  setForm((prevForm) => ({ ...prevForm, isPaymentProcessing: true }));

  try {
   const response = await axios.post("http://localhost:5000/api/products", {
    shippingAddress: form.shippingAddress,
    paymentMethod: form.paymentMethod,
    items: cart,
    total,
   });

   if (response.status === 200) {
    navigate("/orderConfirmation");
   } else {
    alert("Payment failed. Please try again.");
   }
  } catch (error) {
   console.error("Payment Error:", error);
   alert("Payment Failed. Please try again.");
  } finally {
   setForm((prevForm) => ({ ...prevForm, isPaymentProcessing: false }));
  }
 };
 return (
  <div className="checkoutContainer">
   <h1>Checkout</h1>

   {/* Order Summary */}
   <div className="orderSummary">
    <h3 style={{ marginLeft: "20px" }}>Order Summary</h3>
    {cart.length === 0 ? (
     <p>Your cart is empty.</p>
    ) : (
     <>
      {cart.map((item) => (
       <div className="cartItem" key={item.id}>
        <div className="cartItemDiv">
         <h3>{item.name}</h3>
         <img src={item.image} alt="" />
        </div>
        <p>${item.price.toFixed(2)}</p>
       </div>
      ))}
      <h3 className="totalPrice">Total: ${total.toFixed(2)}</h3>
     </>
    )}
   </div>

   {/* Checkout Form */}
   {cart.length > 0 && (
    <form className="checkoutForm" onSubmit={handleCheckoutSubmit}>
     <div>
      <label>Shipping Full Address:</label>
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
      </select>
     </div>

     {/* Show processing state */}
     {form.isPaymentProcessing ? (
      <div className="processing">Processing your payment...</div>
     ) : (
      <button type="submit" className="checkoutButton">
       Proceed to Payment
      </button>
     )}
    </form>
   )}
  </div>
 );
};

export default Checkoutpage;
