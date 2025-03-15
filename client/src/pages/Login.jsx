import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const { data } = await axios.post("http://localhost:5000/api/users/login", {
    email,
    password,
   });
   const { token } = data;
   localStorage.setItem("token", token);
   navigate("/shipments");
  } catch (error) {
   setErrorMessage("Invalid credentials, please try again.");
   console.error(error.response?.data || error.message);
  }
 };

 return (
  <div>
   {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
   <h2>Login</h2>
   <form onSubmit={handleSubmit}>
    <input
     type="email"
     placeholder="Email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    />
    <input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit">Login</button>
   </form>
  </div>
 );
}

export default Login;
