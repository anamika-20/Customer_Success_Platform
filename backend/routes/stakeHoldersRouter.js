import express from "express";
import StakeHoldersController from "../controllers/stakeHolders.js";

const router = express.Router();

// Destructure the controller functions
const {getAllStakeHolders,getStakeHoldersById,createStakeHolders,updateStakeHolders,deleteStakeHolders, } = StakeHoldersController;

// Routes
router.get("/stakeholders", getAllStakeHolders);
router.get("/stakeholders/:id", getStakeHoldersById);
router.post("/stakeholders", createStakeHolders);
router.patch("/stakeholders/:id", updateStakeHolders);
router.delete("/stakeholders/:id", deleteStakeHolders);

export default router;