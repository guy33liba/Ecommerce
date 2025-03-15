import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// ✅ Create the context
const CartContext = createContext();

// ✅ Provider component
const CartProvider = ({ children }) => {
 const { id } = useParams();
 const [cart, setCart] = useState([]);
 const [message, setMessage] = useState(false);

 useEffect(() => {
  const fetchCart = async () => {
   try {
    const response = await axios.get(`http://localhost:5000/api/cart`);
    setCart(response.data);
   } catch (error) {
    console.error("Error fetching Cart:", error.message);
   }
  };
  fetchCart();
 }, []);

 const addToCart = async (item) => {
  try {
   console.log("Adding to cart:", { productId: item?._id });

   const response = await axios.post("http://localhost:5000/api/cart", {
    productId: item?._id,
    quantity: 1,
   });

   setCart(response.data);
   setMessage(true);

   setTimeout(() => setMessage(false), 2000);
  } catch (error) {
   console.error("Error adding item to cart:", error.response?.data || error.message);
  }
 };

 const removeFromCart = async (id) => {
  try {
   const { data } = await axios.delete(`http://localhost:5000/api/cart/${id}`);
   setCart([...data]);
  } catch (error) {
   console.error("Error removing item:", error.message);
  }
 };

 const clearCart = async () => {
  try {
   await axios.delete(`http://localhost:5000/api/cart`);
   setCart([]);
  } catch (error) {
   console.error("Error clearing cart:", error.message);
  }
 };
 const updateQuantity = async (id, quantity) => {
  try {
   const { data } = await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity });
   console.log(data);
   setCart(data);
  } catch (error) {
   console.error("Error updating cart quantity", error);
  }
 };
 return (
  <CartContext.Provider
   value={{ cart, setCart, addToCart, removeFromCart, clearCart, message, updateQuantity }}
  >
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
