import express from "express";
import userControllers, {
  getRole,
  isValidUser,
} from "../controllers/userControllers.js";
import pkg from "express-openid-connect";

const router = express.Router();
const { userDetails } = userControllers;
const { requiresAuth } = pkg;

console.log(userDetails);

// Ensure authentication middleware is applied
router.get("/user-info", requiresAuth(), userDetails);
router.get("/isValidUser", isValidUser);
router.get("/getRole", getRole);

export default router;
