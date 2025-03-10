import React from "react";
import { useState } from "react";

const AddProduct = () => {
 const [product, setProduct] = useState({
  name: "",
  price: "",
  image: "",
 });
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   await axios.post("http://localhost:5000/api/products", product);
   alert("Product added successfully!");
   setProduct({ name: "", price: "", image: "" });
  } catch (error) {
   console.error("Error adding Product:", error);
   alert("Failed to add product");
  }
 };
 return (
  <div>
   <h2>Add New Product</h2>
   <form onSubmit={handleSubmit}>
    <input
     type="text"
     value={product.name}
     onChange={(e) => setProduct({ ...product, name: e.target.value })}
    />
    <input
     type="number"
     value={product.price}
     onChange={(e) => setProduct({ ...product, price: e.target.value })}
    />
    <input
     type="text"
     value={product.image}
     onChange={(e) => setProduct({ ...product, image: e.target.value })}
    />
    <button type="submit">Add To Cart</button>
   </form>
  </div>
 );
};

export default AddProduct;
