import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Productpage from "./pages/Productpage";
import Checkoutpage from "./pages/Checkoutpage";
import Cartpage from "./pages/Cartpage";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/Productcontext";
import OrderConfirmation from "./pages/OrderConfirmation";
import Header from "./pages/Header";
function App() {
 return (
  <div>
   <ProductProvider>
    <CartProvider>
     <Router>
      <AppWithHeader />
      <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/product/:id" element={<Productpage />} />
       <Route path="/cart" element={<Cartpage />} />
       <Route path="/checkout" element={<Checkoutpage />} />
       <Route path="/productpage" element={<Productpage />} />
       <Route path="/orderConfirmation" element={<OrderConfirmation />} />
      </Routes>
     </Router>
    </CartProvider>
   </ProductProvider>
  </div>
 );
}

function AppWithHeader() {
 const location = useLocation();
 const shouldHideHeader = location.pathname === "/orderConfirmation";
 return <>{!shouldHideHeader && <Header />}</>;
}
export default App;
