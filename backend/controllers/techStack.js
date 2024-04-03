import TechStack from "../modals/TechStack.js";

// Get all tech stacks
export const getAllTechStack = async (req, res) => {
  try {
    const techStack = await TechStack.find();
    res.json(techStack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single tech stack by ID
export const getTechStackById = async (req, res) => {
  try {
    const techStack = await TechStack.findById(req.params.id);
    if (!techStack) {
      res.status(404).json({ message: "Tech Stack not found" });
      return;
    }
    res.json(techStack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new tech stack
export const createTechStack = async (req, res) => {
  const techStack = new TechStack(req.body);
  try {
    const newTechStack = await techStack.save();
    res.status(201).json(newTechStack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update tech stack
export const updateTechStack = async (req, res) => {
    try {
      const techStack = await TechStack.findById(req.params.id);
      if (!techStack) {
        res.status(404).json({ message: "Tech Stack not found" });
        return;
      }
      // Update fields if present in the request body
      if (req.body.category !== null) {
        techStack.category = req.body.category;
      }
      const updatedTechStack = await techStack.save();
      res.json(updatedTechStack);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Delete tech stack
export const deleteTechStack = async (req, res) => {
  try {
    const techStack = await TechStack.findById(req.params.id);
    if (!techStack) {
      return res.status(404).json({ message: "Tech Stack not found" });
    }
    await TechStack.deleteOne({ _id: req.params.id });
    return res.json({ message: "Deleted Tech Stack" });
  } catch (err) {
    console.error("Error deleting Tech Stack:", err);
    return res.status(500).json({ message: "Failed to delete Tech Stack" });
  }
};

export default{
    getAllTechStack,
    getTechStackById,
    createTechStack,
    updateTechStack,
    deleteTechStack,
}