import express from "express";
import checkRole from "../middlewares/checkRole.js";
import { addMoM } from "../controllers/momsController.js";

const router = express.Router();

router.post(
  "/:proj/add",
  (req, res, next) => {
    checkRole(req, res, next, ["admin", "client"]);
  },
  addMoM
);

export default router;
