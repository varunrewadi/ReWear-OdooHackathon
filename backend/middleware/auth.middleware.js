import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const tokenFromHeader = authHeader && authHeader.split(" ")[1];
    const tokenFromCookie = req.cookies?.accessToken;

    const token = tokenFromHeader || tokenFromCookie;

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const customer = await User.findById(decoded.userID);

        if (!customer) return res.status(404).json({ message: "User not found" });

        req.customer = customer;
        req.user = customer; // unify for protectRoute
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        res.status(403).json({ message: "Token invalid or expired" });
    }
};


export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({ message: "Unauthorized: no access token" });
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userID).select("-password");

            if (!user) {
                return res.status(401).json({ message: "user not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired" });
            }
            throw error;

        }
    } catch (error) {
        console.log("error: ", error.message)
        return res.status(401).json({ message: "Error: no token" })
    }

}

export const adminRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();
        }
        else {
            return res.status(403).json({ message: "Access Denied" })
        }

    } catch (error) {

    }
}

export const managerRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin" || req.user.role === "manager") {
            next();
        }
        else {
            return res.status(403).json({ message: "Access Denied" })
        }

    } catch (error) {

    }
}

export const transportRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin" || req.user.role === "transport") {
            next();
        }
        else {
            return res.status(403).json({ message: "Access Denied" })
        }

    } catch (error) {

    }
}

export const staffRoute = async (req, res, next) => {
    try {
        if (req.user && req.user.role !== "customer") {
            next();
        }
        else {
            return res.status(403).json({ message: "Access Denied" })
        }

    } catch (error) {

    }
}