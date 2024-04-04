import express from "express";
import SprintDetailController from "../controllers/sprintDetail.js"

const router = express.Router();

const {getAllSprintDetails,getSprintDetailById,createSprintDetail,updateSprintDetail,deleteSprintDetail, } = SprintDetailController;

// Routes
router.get("/sprints", getAllSprintDetails);
router.get("/sprints/:id", getSprintDetailById);
router.post("/sprints", createSprintDetail);
router.patch("/sprints/:id", updateSprintDetail);
router.delete("/sprints/:id", deleteSprintDetail);

export default router;