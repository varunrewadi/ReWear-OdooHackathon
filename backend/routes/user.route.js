import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addItem, deleteItem, getAllMyItems, getProfile } from "../controllers/user.controller.js";
import upload from "../middleware/upload.js";

const router = new express.Router();

router.get("/", protectRoute, getProfile);
router.post('/add', protectRoute, upload.array('images', 5), addItem);
router.delete("/delete/:itemId", protectRoute, deleteItem);
router.get("/my-items", protectRoute, getAllMyItems);
// router.post("/update", protectRoute, updateUserProfile);

export default router;
