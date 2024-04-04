import express from "express";
import ApprovedTeamsController from "../controllers/approvedTeams.js";

const router = express.Router();

const { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam } =
  ApprovedTeamsController;

router.get("/approvedteams", getAllTeams);
router.get("/approvedteams/:id", getTeamById);
router.post("/approvedteams", createTeam);
router.patch("/approvedteams/:id", updateTeam);
router.delete("/approvedteams/:id", deleteTeam);

export default router;
