import { Router } from "express";
// import {
//   registerUser,
//   authUser,
//   allUsers,
// } from "../controllers/userControllers";
// import { protect } from "../middleware/authMiddleware";

const router = Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.route("/login").post(authUser);

export default router;
