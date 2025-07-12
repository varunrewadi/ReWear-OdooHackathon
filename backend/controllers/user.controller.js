import Item from "../model/items.model.js";
import { uploadImagesToCloudinary } from "../utils/image.to.url.js";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const checkUser = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const tokenFromHeader = authHeader && authHeader.split(" ")[1];
    const tokenFromCookie = req.cookies?.accessToken;

    const accessToken = tokenFromHeader || tokenFromCookie;

    if (!accessToken) {
      return res.status(200).json({ user: null, authenticated: false });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userID).select("-password");

      if (!user) {
        return res.status(200).json({ user: null, authenticated: false });
      }

      return res.status(200).json({
        user: user,
        authenticated: true,
      });
    } catch (error) {
      // Token is invalid or expired
      return res.status(200).json({ user: null, authenticated: false });
    }
  } catch (error) {
    console.error("Check user error:", error);
    return res.status(200).json({ user: null, authenticated: false });
  }
};

export const getProfile = (req, res) => {
  const userData = req.user;
  if (!userData) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  res.status(200).json({ profile: userData });
};

export const addItem = async (req, res) => {
  try {
    const user = req.user; // populated by protectRoute

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not found in request" });
    }

    const { title, description, category, type, size, condition, tags } =
      req.body;

    if (!title || !category || !type || !condition) {
      return res
        .status(400)
        .json({ message: "Title, category, type, and condition are required" });
    }

    const uploadedImageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const uploadRes = await cloudinary.uploader.upload_stream(
            {
              folder: "items",
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
              } else {
                uploadedImageUrls.push(result.secure_url);
              }
            }
          );

          // Pipe file buffer into the upload stream
          uploadRes.end(file.buffer);
        } catch (uploadErr) {
          console.error(`❌ Failed to upload image:`, uploadErr);
        }
      }
    }

    const newItem = new Item({
      title,
      description: description || "",
      images: uploadedImageUrls,
      category,
      type,
      size: size || "",
      condition,
      tags: tags ? JSON.parse(tags) : [],
      ownerId: user._id,
    });

    await newItem.save();

    res.status(201).json({
      message: "Item added successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Add Item Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const user = req.user; // Populated by your auth middleware
    const { itemId } = req.params; // Get item ID from URL

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not found in request" });
    }

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the signed-in user owns the item
    if (item.ownerId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You are not allowed to delete this item",
        });
    }

    await item.deleteOne();

    res.status(200).json({ message: "Item deleted successfully", itemId });
  } catch (error) {
    console.error("Delete Item Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllMyItems = async (req, res) => {
  try {
    const user = req.user; // populated from auth middleware

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const items = await Item.find({ ownerId: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "User items retrieved successfully",
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("Get All My Items Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
