import express from "express";
import clientFeedbackController from "../controllers/clientFeedback.js";
import checkAdmin from "../middlewares/check-admin.js";

const router = express.Router();

// Destructure the controller functions
const {
  getAllClientFeedback,
  getClientFeedbackById,
  createClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
} = clientFeedbackController;

// Routes
router.get("/clientfeedback",  (getAllClientFeedback));
router.get("/clientfeedback/:id", getClientFeedbackById);
router.post("/clientfeedback", createClientFeedback);
router.patch("/clientfeedback/:id", updateClientFeedback);
router.delete("/clientfeedback/:id", deleteClientFeedback);

export default router;
