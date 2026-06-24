import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'


dotenv.config();

const app = express();

app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});

