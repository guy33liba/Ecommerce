import React from "react";
import Productlist from "./Productlist";
import { useProductContext } from "../context/Productcontext";

const Homepage = () => {
 const { user } = useProductContext();

 return (
  <div className="homePageContainer">
   <img src="/images/sea.png" className="seaBackground" />

   <header className="welcomeHeader">
    <h1>Welcome to the Store</h1>
    {user && (
     <div className="userGreeting">
      <h2>
       Hello, <span>{user.name}</span>! 👋 🚀
      </h2>
     </div>
    )}
   </header>
   <Productlist />
  </div>
 );
};

export default Homepage;
