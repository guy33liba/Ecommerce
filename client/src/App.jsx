import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import AddProduct from "./pages/AddProduct"; // Import AddProduct

function App() {
 return (
  <div>
   <CartProvider>
    <Router>
     <Header />
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
        <Link to="/addProduct">Add Product</Link>
       </li>
      </ul>
     </nav>
     <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<Productpage />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/checkout" element={<Checkoutpage />} />
      <Route path="/addProduct" element={<AddProduct />} />
     </Routes>
    </Router>
   </CartProvider>
  </div>
 );
}

export default App;
