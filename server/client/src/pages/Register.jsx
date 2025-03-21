import axios from "axios";
import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);

 const navigate = useNavigate();
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   await axios.post("http://localhost:5000/api/users/register", {
    name,
    email,
    password,
   });
   navigate("/login");
  } catch (error) {
   console.error(error);
  }
 };
 console.log(name);
 return (
  <div className="registerWrapper">
   <div className="registerContainer">
    <h2>Register</h2>
    <form className="inputGroup" onSubmit={handleSubmit}>
     <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
     <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     />
     <input
      type={showPassword ? "password" : "text"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />{" "}
     <span
      className="passwordToggle registerPasswordToggle"
      onClick={() => setShowPassword(!showPassword)}
     >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
     </span>
     <button type="submit">Register</button>
    </form>
    <div className="registerPrompt">
     Already have an account? <a href="/login">Login</a>
    </div>
   </div>
  </div>
 );
};

export default Register;
