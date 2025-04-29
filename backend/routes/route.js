import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// --- Signup Route ---
router.post("/user/signup", async (req, res) => {
  const { fullname, username, password, role, email } = req.body;

  if (!fullname || !email || !username || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Something went wrong during signup." });
  }
});

// --- Login Route ---
router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Something went wrong during login." });
  }
});

// --- Get all Users Route ---
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- Update User Role Route ---
router.put("/user/:id/role", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    await User.findByIdAndUpdate(id, { role });
    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;