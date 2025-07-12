import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import redis from "../config/redis.js";

import User from "../model/user.model.js";

const generateTokens = (userID) => {
  const accessToken = jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userID, refreshToken) => {
  await redis.set(
    `refreshToken:${userID}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 days expiry
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        message: "First name, last name, email, and password are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role to 'user' if not provided
    const userRole = role === "admin" ? "admin" : "user";

    const newUser = new User({
      email,
      password: hashedPassword,
      profile: {
        firstName,
        lastName,
      },
      role: userRole,
    });

    await newUser.save();

    const { accessToken, refreshToken } = generateTokens(newUser._id);
    await storeRefreshToken(newUser._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      userID: newUser._id,
      firstName: newUser.profile.firstName,
      lastName: newUser.profile.lastName,
      email: newUser.email,
      role: newUser.role,
      accessToken, // Include token in response for frontend state
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        userID: user._id,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Sign In Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refreshToken:${decoded._id}`);
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    console.error("Sign Out Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listUsers = async (req, res) => {
  try {
    // Exclude password from results
    const users = await User.find({}, "-password");
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users removed" });
  } catch (error) {
    console.error("Error removing users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User removed from Database" });
    }
    if (!user) {
      res.status(404).json({ message: "No such User found in Database." });
    }
  } catch (error) {
    console.log(error.message);
  }
};
