import React from "react";
import { useCartContext } from "../context/CartContext";

const CartPage = () => {
 const { cart, removeFromCart, clearCart } = useCartContext();

 if (cart.length === 0) {
  return <div>Your cart is empty.</div>;
 }
 return (
  <div>
   <h1>Your Cart</h1>
   {cart?.map((item) => (
    <div key={item._id}>
     <h3>{item.name}</h3>
     <p>Price: ${item.price}</p>
     <img src={item.image} alt="" />
     <button onClick={() => removeFromCart(item._id)}>Remove</button>
    </div>
   ))}
   <button onClick={clearCart}>Clear Cart</button>
  </div>
 );
};

export default CartPage;
