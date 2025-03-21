import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ✅ Create the context
const CartContext = createContext();

// ✅ Provider component
const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([]);
 const [shipments, setShipments] = useState([]);
 const [message, setMessage] = useState("");

 const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
   console.error("No token found in localStorage.");
   return null;
  }
  return token;
 };
 const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
   Authorization: `Bearer ${getAuthToken()}`,
  },
 });

 useEffect(() => {
  const fetchCart = async () => {
   try {
    const response = await axiosInstance.get(`/cart`);
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

   const { data } = await axiosInstance.post("/cart", {
    productId: item?._id,
    quantity: 1,
   });

   setCart(data);
   setMessage(`${item.name} has been added to the cart!`);
   setTimeout(() => setMessage(false), 2000);
  } catch (error) {
   console.error("Error adding item to cart:", error.response?.data || error.message);
  }
 };

 const removeFromCart = async (id) => {
  try {
   const { data } = await axiosInstance.delete(`/cart/${id}`);
   console.log("remove fuck", id);
   setCart([...data]);
  } catch (error) {
   console.error("Error removing item:", error.message);
  }
 };

 const clearCart = async () => {
  try {
   await axiosInstance.delete(`/cart`);
   setCart([]);
  } catch (error) {
   console.error("Error clearing cart:", error.message);
  }
 };
 const updateQuantity = async (id, quantity) => {
  try {
   const { data } = await axiosInstance.put(`/cart/${id}`, { quantity });
   console.log(data);
   setCart(data);
   const findItem = data.find((item) => id === item._id);
   setMessage(`${findItem.name} has been added/updated in the cart!`);
   setTimeout(() => {
    setMessage("");
   }, 1500);
  } catch (error) {
   console.error("Error updating cart quantity", error.message);
  }
 };
 return (
  <CartContext.Provider
   value={{
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
    message,
    setMessage,
    updateQuantity,
    shipments,
    setShipments,
   }}
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
