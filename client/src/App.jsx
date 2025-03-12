import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Checkoutpage from "./pages/Checkoutpage";
import Header from "./components/Header";
import Cartpage from "./pages/Cartpage";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/Productcontext";
function App() {
 return (
  <div>
   <ProductProvider>
    <CartProvider>
     <Router>
      <Header />
      <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/product/:id" element={<Productpage />} />
       <Route path="/cart" element={<Cartpage />} />
       <Route path="/checkout" element={<Checkoutpage />} />
       <Route path="/productpage" element={<Productpage />} />
      </Routes>
     </Router>
    </CartProvider>
   </ProductProvider>
  </div>
 );
}

export default App;
