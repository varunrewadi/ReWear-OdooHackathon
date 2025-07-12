import express from "express";
import { signup, signin, signout, listUsers, removeAllUsers, deleteUser } from "../controllers/auth.controller.js";
import { adminRoute, authenticateToken, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/listusers", protectRoute, adminRoute, listUsers);
router.delete("/removeuser/:id", protectRoute, adminRoute, deleteUser);
router.delete("/clear", removeAllUsers);

//TODO: jwt token cookie for user signin



export default router;