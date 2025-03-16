import React, { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import "../App.css";
import axios from "axios";

const CartPage = () => {
 const { cart, removeFromCart, clearCart, updateQuantity } = useCartContext();
 const [message, setMessage] = useState("");

 const handleAddedToCartMessage = (item) => {
  setMessage(`${item.name} has been added/updated in the cart!`);

  setTimeout(() => setMessage(""), 2000);
 };

 const handleUpdateQuantity = (id, newQuantity) => {
  const itemToUpdate = cart.find((item) => item._id === id);
  updateQuantity(id, newQuantity);
  handleAddedToCartMessage(itemToUpdate);
 };

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
         onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
         disabled={item.quantity <= 1}
        >
         -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
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
