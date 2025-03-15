import React from "react";
import { Link } from "react-router-dom";
import "../../src/App.css";
const Header = () => {
 return (
  <div className="headerContainer">
   {" "}
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
    </ul>
   </nav>
  </div>
 );
};

export default Header;
