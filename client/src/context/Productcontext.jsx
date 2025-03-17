import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
 const [products, setProducts] = useState([]);
 const [user, setUser] = useState("");

 return (
  <ProductContext.Provider value={{ products, setProducts, user, setUser }}>
   {children}
  </ProductContext.Provider>
 );
};

export default ProductProvider;

// Corrected useProductContext function
export const useProductContext = () => {
 return useContext(ProductContext);
};
