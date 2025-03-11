import React from "react";
import { useCartContext } from "../context/CartContext"; // ✅ Import context

const Cartpage = () => {
 const { cart, setCart } = useCartContext(); // ✅ Use useState-based context

 const removeFromCart = (id) => {
  setCart(cart.filter((item) => item.id !== id)); // ✅ Remove item from cart
 };

 const clearCart = () => {
  setCart([]); // ✅ Clear cart
 };

 if (cart.length === 0) {
  return <div>Your cart is empty.</div>;
 }

 return (
  <div>
   <h1>Your Cart</h1>
   {cart.map((item) => (
    <div key={item.id}>
     <h3>{item.name}</h3>
     <p>Price: ${item.price}</p>
     <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
   ))}
   <button onClick={clearCart}>Clear Cart</button>
  </div>
 );
};

export default Cartpage;
