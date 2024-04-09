import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addClientFeedback } from "../controllers/clientFeedbackController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addClientFeedback
);

export default router;
