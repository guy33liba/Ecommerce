import React from "react";
import { useCart } from "../context/CartContext";

const Cartpage = () => {
 const { state, dispatch } = useCart();
 const { items } = state;

 const removeFromCart = (id) => {
  dispatch({ type: "REMOVE_FROM_CART", payload: id });
 };
 const clearCart = () => {
  dispatch({ type: "CLEAR_CART" });
 };
 if (items.length === 0) {
  return <div>Your cart is empty.</div>;
 }
 return (
  <div>
   <h1>Your Cart</h1>
   {items.map((item) => (
    <div key={item.id}>
     <h3>{item.name}</h3>
     <p>Price : ${item.price} </p>
     <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
   ))}
   <button onClick={clearCart}>Clear Cart</button>
  </div>
 );
};

export default Cartpage;
