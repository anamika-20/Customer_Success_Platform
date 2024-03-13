import ClientFeedback from "../schemas/ClientFeedback.js";

// Get all client feedback
export const getAllClientFeedback = async (req, res) => {
  try {
    const feedbacks = await ClientFeedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single client feedback
export const getClientFeedbackById = async (req, res) => {
  try {
    const feedback = await ClientFeedback.findById(req.params.id);
    if (!feedback) {
      res.status(404).json({ message: "Client feedback not found" });
      return;
    }
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new client feedback
export const createClientFeedback = async (req, res) => {
  const feedback = new ClientFeedback(req.body);
  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update
export const updateClientFeedback = async (req, res) => {
  try {
    const feedback = await ClientFeedback.findById(req.params.id);
    if (!feedback) {
      res.status(404).json({ message: "Client feedback not found" });
      return;
    }
    if (req.body.feedbackType != null) {
      feedback.feedbackType = req.body.feedbackType;
    }
    if (req.body.dateReceived != null) {
      feedback.dateReceived = req.body.dateReceived;
    }
    if (req.body.detailedFeedback != null) {
      feedback.detailedFeedback = req.body.detailedFeedback;
    }
    if (req.body.actionTaken != null) {
      feedback.actionTaken = req.body.actionTaken;
    }
    if (req.body.closureDate != null) {
      feedback.closureDate = req.body.closureDate;
    }
    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete
export const deleteClientFeedback = async (req, res) => {
  try {
    const feedback = await ClientFeedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Client feedback not found" });
    }

    await ClientFeedback.deleteOne({ _id: req.params.id });

    return res.json({ message: "Deleted client feedback" });
  } catch (err) {
    console.error("Error deleting client feedback:", err);
    return res
      .status(500)
      .json({ message: "Failed to delete client feedback" });
  }
};

export default {
  getAllClientFeedback,
  getClientFeedbackById,
  createClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
};
