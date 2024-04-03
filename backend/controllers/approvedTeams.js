import ApprovedTeams from "../modals/ApprovedTeams.js";
// import { push as RouterPush } from 'react-router-redux';

// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await ApprovedTeams.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single team by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await ApprovedTeams.findById(req.params.id);
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new team
export const createTeam = async (req, res) => {
  const team = new ApprovedTeams(req.body);
  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing team
export const updateTeam = async (req, res) => {
  try {
    const team = await ApprovedTeams.findById(req.params.id);
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    team.set(req.body);
    const updatedTeam = await team.save();
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete
export const deleteTeam = async (req, res) => {
  try {
    const team = await ApprovedTeams.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Delete the document using deleteOne method
    await team.deleteOne({ _id: req.params.id });

    return res.json({ message: "Deleted Approved Team" });
  } catch (err) {
    console.error("Error deleting Approved Teams:", err);
    return res.status(500).json({ message: "Failed to delete Approved Teams" });
  }
};

export default {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
