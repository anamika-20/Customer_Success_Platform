import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addSprint } from "../controllers/sprintController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addSprint
);

export default router;
