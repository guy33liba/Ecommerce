import React, { useState, useEffect } from "react";
import axios from "axios";

function Shipments() {
 const [shipments, setShipments] = useState([]);

 // Fetch the token from localStorage (or wherever you store it)
 const token = localStorage.getItem("token");

 useEffect(() => {
  const fetchShipments = async () => {
   if (!token) {
    console.error("Token is missing.");
    return; // Do nothing if token is not found
   }

   try {
    const { data } = await axios.get("http://localhost:5000/api/users/shipments", {
     headers: { Authorization: `Bearer ${token}` }, // Correct header format
    });

    setShipments(data.shipments); // Assuming the response contains a 'shipments' array
   } catch (error) {
    console.error("Error fetching shipments:", error.response?.data || error.message);
   }
  };

  fetchShipments();
 }, [token]); // Only re-run the effect if the token changes

 return (
  <div>
   <h2>Your Shipments</h2>
   <ul>
    {shipments.length === 0 ? (
     <p>No shipments available.</p>
    ) : (
     shipments.map((shipment) => (
      <li key={shipment.shipmentId}>
       <h3>{shipment.status}</h3>
       <p>Address: {shipment.address}</p>
       <p>Tracking Number: {shipment.trackingNumber}</p>
       <p>Date Shipped: {shipment.dateShipped}</p>
      </li>
     ))
    )}
   </ul>
  </div>
 );
}

export default Shipments;
