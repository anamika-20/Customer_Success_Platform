import express from "express";
import userControllers from "../controllers/userControllers.js";
// import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();
const { userDetails, getRole, isValidUser } = userControllers;

// Ensure authentication middleware is applied
// router.get("/user-info", authenticateToken, userDetails);
router.get("/isValidUser", isValidUser);
router.get("/getRole", /*authenticateToken, */ getRole);

export default router;
