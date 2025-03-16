import React, { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import "../App.css";
import axios from "axios";

const CartPage = () => {
 const { cart, removeFromCart, clearCart, updateQuantity } = useCartContext();
 const [message, setMessage] = useState("");

 // ✅ Function to handle the message when an item is added
 const handleAddedToCartMessage = async () => {
  try {
   const { data } = await axios.get("http://localhost:5000/api/cart");
   if (data.length > 0) {
    const lastAddedItem = data[data.length - 1]; // Get the last item in the cart
    setMessage(`${lastAddedItem.name} is added to the cart!`);

    // Hide message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
   }
  } catch (error) {
   console.error("Error fetching cart data:", error);
  }
 };

 const handleUpdatequantity = (id, newQuantity) => {
  updateQuantity(id, newQuantity);
  handleAddedToCartMessage(cart);
 };

 //

 if (cart.length === 0) {
  return <div className="emptyCartMessage">Your cart is empty.</div>;
 }

 return (
  <div className="cartPage">
   <h1>Your Cart</h1>

   {message && <div className="cartMessage">{message}</div>}
   <div className="cartListContainer">
    {cart.map((item) => (
     <div key={item._id} className="cartItem">
      <div className="cartItemDetails">
       <h3>{item.name}</h3>
       <p>Price: ${item.price}</p>

       <div className="quantityControls">
        <button
         onClick={() => handleUpdatequantity(item._id, item.quantity - 1)}
         disabled={item.quantity <= 1}
        >
         -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => handleUpdatequantity(item._id, item.quantity + 1)}>+</button>
       </div>
      </div>

      <img src={item.image} alt={item.name} />
      <button className="removeButton" onClick={() => removeFromCart(item._id)}>
       Remove
      </button>
     </div>
    ))}
   </div>

   <button className="clearCartButton" onClick={clearCart}>
    Clear Cart
   </button>
  </div>
 );
};

export default CartPage;
