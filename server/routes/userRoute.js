import express from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  getRole,
} from "../controllers/userController.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.post(
  "/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin"]);
  },
  addUser
);
router.delete(
  "/delete/:id",
  (req, res, next) => {
    checkRole(req, res, next, ["admin"]);
  },
  deleteUser
);
router.get("/", getUsers);
router.get("/role", getRole);

export default router;
