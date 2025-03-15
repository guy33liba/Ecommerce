import express from "express";
import User from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

  // Generate a JWT token and send it back to the user
  const token = jwt.sign({ _id: user._id }, "yourJwtSecret", { expiresIn: "1h" });
  res.status(200).json({ token });
 } catch (error) {
  res.status(500).json({ message: "Server error", error });
 }
});

// Authentication Middleware
const authenticateUser = async (req, res, next) => {
 const token = req.header("Authorization");
 if (!token) {
  return res.status(401).json({ message: "Access Denied" });
 }

 try {
  const verified = jwt.verify(token, "yourJwtSecret");
  req.user = verified;
  next();
 } catch (error) {
  res.status(400).json({ message: "Invalid Token" });
 }
};

//get shipments

router.get("/shipments", authenticateUser, async (req, res) => {
 try {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("shipments");

  if (!user) {
   return res.status(404).json({ message: "User not found" });
  }

  const shipments = user.shipments;
  res.status(200).json({ shipments });
 } catch (error) {
  res.status(500).json({ message: "Server error", error });
 }
});

export default router;
