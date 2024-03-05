import express from "express";
import ApprovedTeamsController from "../controllers/approvedTeams.js";

const router = express.Router();

const { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam,tablename, teamResources } =
  ApprovedTeamsController;

router.get("/approvedTeams", getAllTeams);
router.get("/approvedTeams/:id", getTeamById);
router.post("/approvedTeams", createTeam);
// router.post("/phaseNumber", createPhase);
// router.post("/teamResources", createTeamResources);
router.post('/tables',tablename);
router.post('/tables/:tableId',teamResources);
router.patch("/approvedTeams/:id", updateTeam);
router.delete("/approvedTeams/:id", deleteTeam);

export default router;


