import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

function Login() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [rememberMe, setRememberMe] = useState(false);
 const [user, setUser] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const { data } = await axios.post("http://localhost:5000/api/users/login", {
    email,
    password,
   });

   localStorage.setItem("token", data.token);
   sessionStorage.setItem("token", data.user);
   navigate("/");
  } catch (error) {
   setErrorMessage("Invalid credentials, please try again.");
   console.error(error.response?.data || error.message);
  }
 };
 console.log(user);

 return (
  <div className="loginWrapper">
   <div className="loginContainer">
    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    <h2>Login</h2>
    <h2>{user}</h2>
    <form onSubmit={handleSubmit}>
     <div className="inputGroup">
      <input
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       required
      />
     </div>

     <div className="inputGroup">
      <input
       type={showPassword ? "text" : "password"}
       placeholder="Password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
      />
      <span className="passwordToggle" onClick={() => setShowPassword(!showPassword)}>
       {showPassword ? <FaEye /> : <FaEyeSlash />}
      </span>
     </div>

     <div className="rememberMeContainer">
      <label>
       <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
       Remember Me
      </label>
      <a href="/forgot-password" className="forgotPassword">
       Forgot Password?
      </a>
     </div>

     <button type="submit">Login</button>

     <p className="registerPrompt">
      Don't have an account? <a href="/register">Register here</a>
     </p>
    </form>
   </div>
  </div>
 );
}

export default Login;
