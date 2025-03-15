import React from "react";
import { useCartContext } from "../context/CartContext";
import "../App.css"; 

const CartPage = () => {
 const { cart, removeFromCart, clearCart, updateQuantity } = useCartContext();

 if (cart.length === 0) {
  return <div className="emptyCartMessage">Your cart is empty.</div>;
 }

 return (
  <div className="cartPage">
   <h1>Your Cart</h1>
   <div className="cartListContainer">
    {cart.map((item) => (
     <div key={item._id} className="cartItem">
      <div className="cartItemDetails">
       <h3>{item.name}</h3>
       <p>Price: ${item.price}</p>

       <div className="quantityControls">
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>
         -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
       </div>
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
