// import express from "express";
// import userControllers from "../controllers/userControllers.js";
// import checkAdmin from "../middlewares/client-admin.js";
// import pkg from "express-openid-connect";
// const { requiresAuth } = pkg;

// const router = express.Router();

// const { userDetails } = userControllers;
// console.log(userDetails)
// // Routes
// router.get("/user-info", requiresAuth, userDetails);

// export default router;
import express from "express";
import userControllers from "../controllers/userControllers.js";
import pkg from "express-openid-connect";

const router = express.Router();
const { userDetails } = userControllers;
const { requiresAuth } = pkg;

console.log(userDetails)

// Ensure authentication middleware is applied
router.get("/user-info", requiresAuth(), userDetails);

export default router;
