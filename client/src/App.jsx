import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Checkoutpage from "./pages/Checkoutpage";
import Header from "./components/Header";
import ProductContext from "./context/ProductContext";
import Cartpage from "./pages/Cartpage";
import CartProvider from "./context/CartContext";
function App() {
 return (
  <div>
   <ProductContext>
    <CartProvider>
     <Router>
      <Header />
      <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/product/:id" element={<Productpage />} />
       <Route path="/cart" element={<Cartpage />} />
       <Route path="/checkout" element={<Checkoutpage />} />
      </Routes>
     </Router>
    </CartProvider>
   </ProductContext>
  </div>
 );
}

export default App;
