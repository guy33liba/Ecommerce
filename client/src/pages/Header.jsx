import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../src/App.css";

const Header = () => {
 const navigate = useNavigate();

 const isAuthenticated = localStorage.getItem("token");

 // Logout function
 const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
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
