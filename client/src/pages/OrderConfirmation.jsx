import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import axios from "axios";

const OrderConfirmation = () => {
 const { cart } = useCartContext();
 const [orderDetails, setOrderDetails] = useState(null);
 const navigate = useNavigate();

 //

 useEffect(() => {
  const fetchAllOrders = async () => {
   try {
    const { data } = await axios.get("http://localhost:5000/api/orders/all");
    console.log("API Response:", data);
    if (Array.isArray(data)) {
     setOrderDetails(data[0]);
    } else {
     setOrderDetails(data);
    }
   } catch (error) {
    console.error("Error fetching all orders and shipments:", error);
    setError("Error fetching orders and shipment details.");
   }
  };

  fetchAllOrders();
 }, []);

 //

 if (!orderDetails) {
  return <div>Loading order details...</div>;
 }

 //

 return (
  <div className="orderConfirmationContainer">
   <h1>Order Confirmation</h1>
   <h3 className="thankYouMessage">Thank you for your purchase!</h3>

   <div className="orderDetails">
    <h3>Order ID: {orderDetails.id}</h3>
    <h4>Shipping Address: {orderDetails.shippingAddress}</h4>
    <h4>Payment Method: {orderDetails.paymentMethod}</h4>

    <h3>Order Summary:</h3>
    {cart.length === 0 ? (
     <p>Your cart is empty.</p>
    ) : (
     <>
      {cart.map((item) => (
       <div className="orderConfirmationCartItem" key={item.id}>
        <div className="orderConfirmationCartItemDiv">
         <h3>{item.name}</h3>
         <img src={item.image} alt={item.name} />
        </div>
        <p>${item.price.toFixed(2)}</p>
       </div>
      ))}
     </>
    )}

    <h3>Total: ${orderDetails.total}</h3>

    <button onClick={() => navigate("/")}>Go Back to Homepage</button>
   </div>
  </div>
 );
};

export default OrderConfirmation;
