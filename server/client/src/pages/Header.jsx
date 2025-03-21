import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/App.css";
import { useProductContext } from "../context/Productcontext";
import { useCartContext } from "../context/CartContext";

const Header = () => {
 const navigate = useNavigate();
 const { setUser } = useProductContext();
 const { setCart } = useCartContext();
 const isAuthenticated = localStorage.getItem("token");

 // Logout function
 const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
  setUser("");
  setCart([]);
 };

 return (
  <div className="headerContainer">
   <nav>
    <ul>
     <li>
      <Link to="/">Home</Link>
     </li>
     <li>
      <Link to="/cart">Cart</Link>
     </li>
     <li>
      <Link to="/checkout">Checkout</Link>
     </li>
     <li>
      <Link to="/shipments">Shipments</Link>
     </li>

     {isAuthenticated ? (
      <li>
       <button onClick={handleLogout} className="logoutButton">
        Logout
       </button>
      </li>
     ) : (
      <>
       <li>
        <Link to="/login" className="loginLink">
         Login
        </Link>
       </li>
       <li>
        <Link to="/register" className="loginLink">
         Register
        </Link>
       </li>
      </>
     )}
    </ul>
   </nav>
  </div>
 );
};

export default Header;
