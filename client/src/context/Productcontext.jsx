import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
 const [products, setProducts] = useState([]);

 return (
  <ProductContext.Provider value={{ products, setProducts }}>{children}</ProductContext.Provider>
 );
};

export default ProductProvider;

// Corrected useProductContext function
export const useProductContext = () => {
 return useContext(ProductContext);
};
