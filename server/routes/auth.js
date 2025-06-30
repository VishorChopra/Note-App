import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User Already Exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const neewUser = new User({
      name,
      email,
      password: hashpassword,
    });

    await neewUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Account Create Successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Adding User" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Exists" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);

    if (!checkpassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#", {
      expiresIn: "5h",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Login Server" });
  }
});

router.get("/verify", middleware, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
