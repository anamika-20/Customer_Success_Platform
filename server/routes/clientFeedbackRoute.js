import express from "express";
import checkRole from "../middlewares/checkRole.js";
import {
  addClientFeedback,
  editClientFeedback,
  deleteClientFeedback,
} from "../controllers/clientFeedbackController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "client"]);
  },
  addClientFeedback
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin"]);
  },
  editClientFeedback
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin"]);
  },
  deleteClientFeedback
);

export default router;
