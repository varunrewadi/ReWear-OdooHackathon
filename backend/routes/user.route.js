import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addItem, deleteItem, getAllMyItems, getProfile } from "../controllers/user.controller.js";

const router = new express.Router();

router.get("/", protectRoute, getProfile);
router.post("/", protectRoute, addItem);
router.delete("/delete/:itemId", protectRoute, deleteItem);
router.get("/my-items", protectRoute, getAllMyItems);
// router.post("/update", protectRoute, updateUserProfile);

export default router;
