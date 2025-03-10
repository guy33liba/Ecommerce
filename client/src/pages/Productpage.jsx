import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Productpage = () => {
 const { id } = useParams();
 const [product, setProduct] = useState(null);

 useEffect(() => {
  const fetchProduct = async () => {
   const result = await axios.get(`/products/${id}`);
   setProduct(result.data);
  };
  fetchProduct();
 }, [id]);
 if (!product) {
  return <div>Loading...</div>;
 }
 return (
  <div>
   <h1>{product.name}</h1>
   <img src={product.image} alt="" />
   <p>{product.description}</p>
   <p>Price: ${product.price}</p>
   <button>Add To Cart</button>
  </div>
 );
};

export default Productpage;
