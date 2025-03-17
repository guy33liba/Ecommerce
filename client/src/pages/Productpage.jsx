import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { useProductContext } from "../context/Productcontext";

const Productpage = () => {
 const { id } = useParams(); // ✅ Get product ID from URL
 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const { addToCart, setMessage } = useCartContext();
 const { user } = useProductContext();
 useEffect(() => {
  const fetchProduct = async (item) => {
   if (user) {
    try {
     const result = await axios.get(`http://localhost:5000/api/products/${id}`);
     setProduct(result.data);
    } catch (err) {
     console.error("Error fetching product:", err);
     setError("Failed to load product. Please try again later.");
    } finally {
     setLoading(false);
    }
   }
  };

  fetchProduct();
 }, [id]);

 if (loading) return <h2>Loading product...</h2>;
 if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

 return (
  <div className="singleProductContainer">
   {product ? (
    <>
     <h1>{product.name}</h1>
     <img src={product.image} alt={product.name} width="300" />
     <p>Price: ${product.price.toFixed(2)}</p>
     <p>{product.description}</p>
     <Link to="/cart">
      <button
       onClick={() => {
        console.log(product._id);
        addToCart(product);
       }}
      >
       Add to Cart
      </button>
     </Link>
    </>
   ) : (
    <h2>Product not found.</h2>
   )}
  </div>
 );
};

export default Productpage;
