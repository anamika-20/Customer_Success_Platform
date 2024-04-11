import Project from "../models/Project.js";

const checkIfStakeHolder = async (projectId, userId) => {
  const project = await Project.findById(projectId).populate({
    path: "stakeholders",
    populate: {
      path: "PM Auditor Client",
      model: "User",
    },
  });

  if (!project) return false;

  const stakeholders = project.stakeholders;

  if (!stakeholders) return false;
  console.log(stakeholders);

  const isStakeholder =
    stakeholders.PM.some((stakeholder) => stakeholder.equals(userId)) ||
    stakeholders.Auditor.some((stakeholder) => stakeholder.equals(userId)) ||
    stakeholders.Client.some((stakeholder) => stakeholder.equals(userId));

  return isStakeholder;
};

export { checkIfStakeHolder };
