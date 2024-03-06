import express from "express";
import userControllers from "../controllers/userControllers.js";
import checkAdmin from "../middlewares/client-admin.js";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

const router = express.Router();

// Destructure the controller functions
const { userDetails } = userControllers;

// Routes
router.get("/user-info", requiresAuth, userDetails);

export default router;
