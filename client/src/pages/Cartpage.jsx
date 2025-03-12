import React from "react";
import { useCartContext } from "../context/CartContext";
import "../App.css"; // Don't forget to import the CSS

const CartPage = () => {
 const { cart, removeFromCart, clearCart } = useCartContext();

 if (cart.length === 0) {
  return <div className="emptyCartMessage">Your cart is empty.</div>;
 }

 return (
  <div className="cartPage">
   <h1>Your Cart</h1>
   <div className="cartListContainer">
    {cart?.map((item) => (
     <div key={item._id} className="cartItem">
      <div className="itemName">
       <h3>{item.name}</h3>
      </div>
      <div className="quantityPrice">
       <p>Price: ${item.price}</p>
       <p>quantity : {item.quantity}</p>
      </div>
      <img src={item.image} alt={item.name} />
      <button onClick={() => removeFromCart(item._id)}>Remove</button>
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
