import axios from "axios";
import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";

const ShipmentHistory = () => {
 const { shipments, setShipments } = useCartContext();
 const [orderDetails, setOrderDetails] = useState(null);
 const [error, setError] = useState(null);

 useEffect(() => {
  const fetchOrderAndShipments = async () => {
   try {
    const { data } = await axios.get("http://localhost:5000/api/orders/all");
    console.log("API Response:", data); // Verify the response structure

    // Set order details (orders array)
    setOrderDetails(data);

    // Flatten and set shipments to the context state
    const allShipments = data.flatMap((order) => {
     return Array.isArray(order.shipmentDetails) ? order.shipmentDetails : [];
    });

    console.log("Flattened Shipments:", allShipments); // Verify flattened shipments
    setShipments(allShipments); // Set the flattened shipments in context state
   } catch (error) {
    console.error("Error fetching order or shipment details:", error);
    setError("Error fetching order or shipment details.");
   }
  };

  fetchOrderAndShipments();
 }, [setShipments]);

 return (
  <div className="orderDetailsContainer">
   <h2>Your Shipments</h2>
   {error && <p style={{ color: "red" }}>{error}</p>}

   {orderDetails ? (
    <div>
     {orderDetails.map((order) => (
      <div key={order.orderId} className="orderDetails">
       <h3>Order ID: {order.orderId}</h3>
       <p>Shipping Address: {order.shippingAddress}</p>
       <p>Payment Method: {order.paymentMethod}</p>
       <p>
        {order.items.map((item) => (
         <div className="orderItemsDetails">
          <span className="name">
           <h2>Product:</h2>
           {item.name}
          </span>
          <span>
           <img src={item.image} alt="hello" />
          </span>
          <span>price : ${item.price}</span>
          <span>Quantity : {item.quantity}</span>
         </div>
        ))}
       </p>
       <h3 className="total">Total: ${order.total}</h3>

       {/* Display the shipment details for this order */}
      </div>
     ))}
    </div>
   ) : (
    <p>Loading your order details...</p>
   )}
  </div>
 );
};

export default ShipmentHistory;
