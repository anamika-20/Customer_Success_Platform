import express from "express";
import SprintDetailController from "../controllers/sprintDetail.js"

const router = express.Router();

const {getAllSprintDetails,getSprintDetailById,createSprintDetail,updateSprintDetail,deleteSprintDetail, } = SprintDetailController;

// Routes
router.get("/sprintDetail", getAllSprintDetails);
router.get("/sprintDetail/:id", getSprintDetailById);
router.post("/sprintDetail", createSprintDetail);
router.patch("/sprintDetail/:id", updateSprintDetail);
router.delete("/sprintDetail/:id", deleteSprintDetail);

export default router;