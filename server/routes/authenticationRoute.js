import express from "express";
import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../schema/ProductSchema.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
 const { name, email, password } = req.body;
 try {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
   return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
   name,
   email,
   password: hashedPassword,
  });

  await user.save();
  res.status(201).json({ message: "User registered successfully" });
 } catch (error) {
  console.error(error); // Log the error
  res.status(500).json({ message: "Server error", error });
 }
});

// Login User
router.post("/login", async (req, res) => {
 const { email, password } = req.body;

 try {
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
   return res.status(400).json({ message: "Invalid credentials" });
  }
  console.log(user);
  // Generate a JWT token and send it back to the user
  const token = jwt.sign(
   { _id: user._id, name: user.name, email: user.email },
   process.env.JWT_SECRET,
   {
    expiresIn: "30d",
   }
  );
  res.status(200).json({ token, user: { name: user.name, email: user.email } });
 } catch (error) {
  res.status(500).json({ message: "Server error", error });
 }
});

// Authentication Middleware

export const authenticateUser = async (req, res, next) => {
 const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
 if (!token) {
  return res.status(401).json({ message: "No token provided" });
 }

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have a valid secret
  const user = await User.findById(decoded._id);
  if (!user) {
   return res.status(404).json({ message: "User not found" });
  }

  req.user = user; // Attach user info to the request
  next();
 } catch (error) {
  return res.status(401).json({ message: "Invalid token" });
 }
};

//get shipments

// router.get("/products", authenticateUser, async (req, res) => {
//  try {
//   const userId = req.user._id;
//   const products = await Product.find({ user: userId });
//   res.status(200).json({ products });
//  } catch (error) {
//   res.status(500).json({ message: "Server error", error });
//  }
// });

export default router;
