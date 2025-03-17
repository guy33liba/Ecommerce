import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useProductContext } from "../context/Productcontext";

const Productlist = () => {
 const { products, setProducts, user, setUser } = useProductContext();
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 useEffect(() => {
  const fetchUser = async () => {
   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
   if (token) {
    const { jwtDecode } = await import("jwt-decode");
    const decoded = jwtDecode(token);
    setUser(decoded);
   }
  };
  fetchUser();
  const fetchProducts = async () => {
   try {
    const result = await axios.get("http://localhost:5000/api/products");
    setProducts(result.data);
   } catch (err) {
    console.error("Error fetching products:", err);
    setError("Failed to load products. Please try again later.");
   } finally {
    setLoading(false);
   }
  };

  fetchProducts();
 }, [setProducts]); // Adding setProducts as a dependency

 if (loading) return <h2>Loading products...</h2>;
 if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
 return (
  <div className="productListConteiner">
   <h1>Product Catalog</h1>

   {/* Display logged-in user's name */}

   <div className="productList">
    {products.length === 0 ? (
     <p>No products available.</p>
    ) : (
     products.map((product) => (
      <div key={product._id} className="productCard">
       <img src={product.image} alt={product.name} />

       <h3>{product.name}</h3>
       <p>${product.price.toFixed(2)}</p>
       <Link to={`/product/${product._id}`} className="viewButton">
        View Product
       </Link>
      </div>
     ))
    )}
   </div>
  </div>
 );
};

export default Productlist;
