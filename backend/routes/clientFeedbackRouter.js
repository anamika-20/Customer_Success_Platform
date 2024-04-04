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
router.get("/clientfeedbacks",  (getAllClientFeedback));
router.get("/clientfeedbacks/:id", getClientFeedbackById);
router.post("/clientfeedbacks", createClientFeedback);
router.patch("/clientfeedbacks/:id", updateClientFeedback);
router.delete("/clientfeedbacks/:id", deleteClientFeedback);

export default router;
