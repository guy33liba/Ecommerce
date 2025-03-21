import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import axios from "axios";

const Checkoutpage = () => {
 const { cart, updateQuantity, removeFromCart, message, shipments, setShipments } =
  useCartContext();
 const [form, setForm] = useState({
  shippingAddress: "",
  paymentMethod: "",
  isPaymentProcessing: false,
 });

 const navigate = useNavigate();
 const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

 const handleCheckoutSubmit = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
   alert("Your cart is empty.");
   return;
  }

  if (!form.shippingAddress || !form.paymentMethod) {
   alert("Please fill out all fields.");
   return;
  }

  setForm((prevForm) => ({ ...prevForm, isPaymentProcessing: true }));

  try {
   const response = await axios.post("http://localhost:5000/api/orders", {
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
   setShipments(response?.data);
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
   <img src="/images/airplane.png" className="airplaneImage" />
   <div className="orderSummary">
    <h3 style={{ fontSize: "28px" }}>Order Summary</h3>
    {cart.length === 0 ? (
     <h2 style={{ paddingLeft: "20px" }}>Your cart is empty.</h2>
    ) : (
     <>
      {message && <h4 className="checkoutCartMessage">{message}</h4>}

      {cart.map((item) => (
       <div className="cartItem" key={item._id}>
        <div className="cartItemDiv">
         <h3>{item.name}</h3>
         <img src={item.image} alt={item.name} />
        </div>
        <div className="quantityControls">
         <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
         <span>{item.quantity}</span>
         <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
        </div>
        <p>${(item.price * item.quantity).toFixed(2)}</p>
        <button className="checkoutRemoveButton" onClick={() => removeFromCart(item._id)}>
         Remove
        </button>
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
