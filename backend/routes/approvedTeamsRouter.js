import express from "express";
import ApprovedTeamsController from "../controllers/approvedTeams.js";

const router = express.Router();

const { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam } =
  ApprovedTeamsController;

router.get("/approvedTeams", getAllTeams);
router.get("/approvedTeams/:id", getTeamById);
router.post("/approvedTeams", createTeam);
router.patch("/approvedTeams/:id", updateTeam);
router.delete("/approvedTeams/:id", deleteTeam);

export default router;
