import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// ✅ Create the context
const CartContext = createContext();

// ✅ Provider component
const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([]); // ✅ Store cart items
 const [message, setMessage] = useState(false);

 const currentUser = { id: "sampleUserId" }; // Replace with actual user ID
 const addToCart = async (item) => {
  try {
   const response = await axios.post("http://localhost:5000/api/cart", {
    userId: currentUser.id, // Assuming currentUser.id is correctly set
    productId: item.id, // Assuming item.id refers to the product ID
    quantity: 1, // Set quantity to 1 by default
   });

   console.log("Item added to cart:", response.data);
   setCart(response.data); // Assuming response contains updated cart
   setMessage(true);

   setTimeout(() => setMessage(false), 2000);
  } catch (error) {
   console.error("Error adding item to cart:", error.message);
  }
 };

 const removeFromCart = (id) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
 };

 const clearCart = () => {
  setCart([]);
 };

 return (
  <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, message }}>
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
