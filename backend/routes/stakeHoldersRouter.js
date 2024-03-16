import express from "express";
import StakeHoldersController from "../controllers/stakeHolders.js";

const router = express.Router();

// Destructure the controller functions
const {getAllStakeHolders,getStakeHoldersById,createStakeHolders,updateStakeHolders,deleteStakeHolders, } = StakeHoldersController;

// Routes
router.get("/stakeHolders", getAllStakeHolders);
router.get("/stakeHolders/:id", getStakeHoldersById);
router.post("/stakeHolders", createStakeHolders);
router.patch("/stakeHolders/:id", updateStakeHolders);
router.delete("/stakeHolders/:id", deleteStakeHolders);

export default router;