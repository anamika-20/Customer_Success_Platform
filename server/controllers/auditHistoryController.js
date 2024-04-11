import { checkIfStakeHolder } from "../helpers/authHelper.js";
import AuditHistory from "../models/AuditHistory.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import sendEmail from "./sendEmail.js";

//funct to make the complete data
const formateDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB");
};

const getData = (auditHistory) => {
  return `
  <table style="border-collapse: collapse; width: 100%;>
     <thead>
        <th style="border: 1px solid black; background-color: #f2f2f2; padding: 8px; text-align: left;">Date</th>
        <th style="border: 1px solid black; background-color: #f2f2f2; padding: 8px; text-align: left;">Reviewed By</th>
        <th style="border: 1px solid black; background-color: #f2f2f2; padding: 8px; text-align: left;">Status</th>
        <th style="border: 1px solid black; background-color: #f2f2f2; padding: 8px; text-align: left;">Reviewed Section</th>
        <th style="border: 1px solid black; background-color: #f2f2f2; padding: 8px; text-align: left;">Comment Queries</th>
        <th style="border: 1px solid black; background-color: #f2f2f2; padding: 8px; text-align: left;">Action Item</th>
     </thead>
     <tbody>
    <tr>
        <td style="border: 1px solid black; padding: 8px; text-align: left;">${formateDate(
          auditHistory.dateOfAudit
        )}</td>
        <td style="border: 1px solid black; padding: 8px; text-align: left;">${
          auditHistory.reviewedBy.name +
          "<" +
          auditHistory.reviewedBy.email +
          ">"
        }</td>
        <td style="border: 1px solid black; padding: 8px; text-align: left;">${
          auditHistory.status
        }</td>
        <td style="border: 1px solid black; padding: 8px; text-align: left;">${
          auditHistory.reviewedSection
        }</td>
        <td style="border: 1px solid black; padding: 8px; text-align: left;">${
          auditHistory.commentQueries
        }</td>
        <td style="border: 1px solid black; padding: 8px; text-align: left;">${
          auditHistory.actionItem
        }</td>
    </tr>
    </tbody>
  </table>`;
};
//function to get emails and names from stakeholders
const getEmailsAndNames = (stakeholders) => {
  const names = [];
  const emails = [];

  // Extract PM names and emails
  stakeholders.PM.forEach((person) => {
    names.push(person.name);
    emails.push(person.email);
  });

  // Extract Auditor names and emails
  stakeholders.Auditor.forEach((person) => {
    names.push(person.name);
    emails.push(person.email);
  });

  // Extract Client names and emails
  stakeholders.Client.forEach((person) => {
    names.push(person.name);
    emails.push(person.email);
  });

  return { names, emails };
};

//@desc Create a new audit history and associate it with a project
//@route POST /auditHistory/:proj/add
//@access admin, auditor
const addAuditHistory = async (req, res) => {
  try {
    const projectId = req.params.proj;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const project = await Project.findById(projectId).populate({
      path: "stakeholders",
      populate: {
        path: "PM Auditor Client",
        model: "User",
      },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    const newAuditHistory = new AuditHistory(req.body);

    await newAuditHistory.save();

    project.auditHistory.push(newAuditHistory._id);

    await project.save();

    const populatedAuditHistory = await AuditHistory.findOne({
      _id: newAuditHistory._id,
    }).populate("reviewedBy");

    const data = getData(populatedAuditHistory);
    const stakeHolders = project.stakeholders;
    const { emails, names } = getEmailsAndNames(stakeHolders);
    const result = await sendEmail(emails, data, names);

    console.log(result);
    if (result.success) console.log("Email sent successfully");
    else console.log("Email not sent!");

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Edit a AuditHistory
//@route PUT /auditHistory/:proj/:id/edit
//@access admin, auditor
const editAuditHistory = async (req, res) => {
  try {
    const { proj: projectId, id } = req.params;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const project = await Project.findById(projectId).populate({
      path: "stakeholders",
      populate: {
        path: "PM Auditor Client",
        model: "User",
      },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const updatedAuditHistory = await AuditHistory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).populate("reviewedBy");

    if (!updatedAuditHistory) {
      return res.status(404).json({ message: "Audit History not found." });
    }

    const data = getData(updatedAuditHistory);
    const stakeHolders = project.stakeholders;
    const { emails, names } = getEmailsAndNames(stakeHolders);
    const result = await sendEmail(emails, data, names);

    console.log(result);
    if (result.success) console.log("Email sent successfully");
    else console.log("Email not sent!");

    res
      .status(200)
      .json({ message: updatedAuditHistory.name + " edited successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//@desc Delete a AuditHistory from project also
//@route POST /auditHistory/:proj/:id/delete
//@access admin, auditor
const deleteAuditHistory = async (req, res) => {
  try {
    const { proj: projectId, id } = req.params;
    const { email } = req.userDetails;
    const user = await User.findOne({ email });

    const isStakeHolder = await checkIfStakeHolder(projectId, user);
    if (user.role !== "admin" && !isStakeHolder) {
      return res.status(403).json({
        message: "You are not authorized to access this project.",
      });
    }

    const project = await Project.findById(projectId).populate({
      path: "stakeholders",
      populate: {
        path: "PM Auditor Client",
        model: "User",
      },
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    // Delete AuditHistory from AuditHistory collection
    const deletedAuditHistory = await AuditHistory.findByIdAndDelete(
      id
    ).populate("reviewedBy");

    if (!deletedAuditHistory) {
      return res.status(404).json({ message: "AuditHistory not found." });
    }
    // Remove AuditHistory ID from array of AuditHistorys in Project collection
    await Project.updateOne(
      { _id: projectId },
      { $pull: { auditHistory: id } }
    );

    const data = getData(deletedAuditHistory);
    const stakeHolders = project.stakeholders;
    const { emails, names } = getEmailsAndNames(stakeHolders);
    const result = await sendEmail(emails, data, names);

    console.log(result);
    if (result.success) console.log("Email sent successfully");
    else console.log("Email not sent!");

    return res
      .status(200)
      .json({ message: deletedAuditHistory.name + " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addAuditHistory, editAuditHistory, deleteAuditHistory };
