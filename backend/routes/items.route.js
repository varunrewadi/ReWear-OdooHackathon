import express from "express";
import {
  getAllItems,
  getItemById,
  getItemsByCategory,
} from "../controllers/items.controller.js";

const router = new express.Router();

// Public routes for browsing
router.get("/", getAllItems);
router.get("/category/:category", getItemsByCategory);
router.get("/:id", getItemById);

export default router;
