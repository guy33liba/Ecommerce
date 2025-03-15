import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import {
 Homepage,
 Productpage,
 Cartpage,
 Checkoutpage,
 OrderConfirmation,
 Register,
 Login,
 Shipments,
} from "./utils";

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
       <Route path="/orderConfirmation" element={<OrderConfirmation />} />
       <Route path="/register" element={<Register />} />
       <Route path="/orderConfirmation" element={<Login />} />
       <Route path="/orderConfirmation" element={<Shipments />} />
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
