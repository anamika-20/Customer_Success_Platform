import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addMoM, editMoM, deleteMoM } from "../controllers/momsController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "projectmanager"]);
  },
  addMoM
);
router.put(
  "/:proj/:id/edit",
  (req, res, next) => {
    checkRole(req, res, next, ["admin"]);
  },
  editMoM
);
router.delete(
  "/:proj/:id/delete",
  (req, res, next) => {
    checkRole(req, res, next, ["admin"]);
  },
  deleteMoM
);

export default router;
