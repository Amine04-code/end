import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true, // ✨ MUST be required!
      enum: ["accountant", "candidate", "employee", "manager"], // ✨ Optional: restrict roles
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
