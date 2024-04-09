import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addProjectUpdate } from "../controllers/projectUpdatesController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addProjectUpdate
);

export default router;
