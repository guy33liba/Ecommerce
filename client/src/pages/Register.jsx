import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
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
   console.error(error.response.data);
  }
 };
 return (
  <div>
   <h2>Register</h2>
   <form className="registerFormContainer" onSubmit={handleSubmit}>
    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
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
    <button type="submit">Register</button>
   </form>
  </div>
 );
};

export default Register;
