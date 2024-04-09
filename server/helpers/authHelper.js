// import Project from "../models/Project.js";

// const checkIfStakeHolder = async (projectId, user) => {
//   const project = await Project.findById(projectId).populate("stakeholders");

//   if (!project) return false;

//   const stakeholders = project.stakeholders;
//   if (!stakeholders) return false;

//   const isStakeholder =
//     stakeholders.PM.some((stakeholder) => stakeholder.name.equals(user._id)) ||
//     stakeholders.Auditor.some((stakeholder) =>
//       stakeholder.name.equals(user._id)
//     ) ||
//     stakeholders.Client.some((stakeholder) =>
//       stakeholder.name.equals(user._id)
//     );
//   return isStakeholder;
// };

// export { checkIfStakeHolder };

import Project from "../models/Project.js";

const checkIfStakeHolder = async (projectId, userId) => {
  const project = await Project.findById(projectId).populate("stakeholders");

  if (!project) return false;

  const stakeholders = project.stakeholders;

  if (!stakeholders) return false;

  const isStakeholder =
    stakeholders.PM.some((stakeholder) => stakeholder.equals(userId)) ||
    stakeholders.Auditor.some((stakeholder) => stakeholder.equals(userId)) ||
    stakeholders.Client.some((stakeholder) => stakeholder.equals(userId));

  return isStakeholder;
};

export { checkIfStakeHolder };
