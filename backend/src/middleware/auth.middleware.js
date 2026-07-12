import { getAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { configDotenv } from "dotenv";
configDotenv();

export const protectRoute = [
  async (req, res, next) => {
    try {
      const clerkId = getAuth(req).userId;
      if (!clerkId)
        return res.status(401).json({
          message: "Unauthorized - invalid token",
        });

      const user = await User.findOne({ clerkId });
      if (!user)
        return res.status(401).json({
          message: "Unauthorized - user not found",
        });

      req.user = user;

      next();
    } catch (error) {
      console.log("error at protectRoute");
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
];

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized - user not found" });
  }
  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden - admin only" });
  }
  next();
};
