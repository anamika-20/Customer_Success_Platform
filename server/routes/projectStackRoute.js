import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { updateProjectStack } from "../controllers/projectStackController.js";
const router = express.Router();
router.put(
  "/:proj/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  updateProjectStack
);

export default router;
