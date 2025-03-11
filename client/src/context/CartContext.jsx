import React, { createContext, useContext, useState } from "react";

// ✅ Create the context
const CartContext = createContext();

// ✅ Provider component
const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([]); // ✅ Store cart items

 const addToCart = (item) => {
  setCart((prevCart) => [...prevCart, item]);
 };

 const removeFromCart = (id) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
 };

 const clearCart = () => {
  setCart([]);
 };

 return (
  <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
   {children}
  </CartContext.Provider>
 );
};

// ✅ Custom hook for using the cart
export const useCartContext = () => {
 const context = useContext(CartContext);
 if (!context) {
  throw new Error("useCartContext must be used within a CartProvider");
 }
 return context;
};
export default CartProvider;
