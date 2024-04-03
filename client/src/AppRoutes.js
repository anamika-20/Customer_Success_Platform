import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import ApprovedTeams from "./components/ApprovedTeams.js";
import Resources from "./components/Resources.js";
import ClientFeedback from "./components/ClientFeedback.js";
import Moms from "./components/Moms.js";
import ProjectUpdates from "./components/ProjectUpdates.js";
import AddUser from "./components/AddUser.js";
import ProjectDetails from "./components/ProjectDetails.js";
import AuditHistory from "./components/AuditHistory.js";
import VersionHistory from "./components/VersionHistory.js";
import ProjectBudget from "./components/ProjectBudget.js";
import SprintDetail from "./components/SprintDetail";
import Risk from "./components/Risk";
import Escalation from "./components/Escalation";
import Phases from "./components/Phases";
import StakeHolders from "./components/StakeHolders";
import Technical from "./components/Technical.js";
import Operational from "./components/Operational.js";
import Financial from "./components/Financial.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/project" element={<ProjectDetails />} />
      <Route path="/approvedteams" element={<ApprovedTeams />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/clientfeedback" element={<ClientFeedback />} />
      <Route path="/moms" element={<Moms />} />
      <Route path="/projectupdates" element={<ProjectUpdates />} />
      <Route path="/audithistory" element={<AuditHistory />} />
      <Route path="/versionhistory" element={<VersionHistory />} />
      <Route path="/projectbudget" element={<ProjectBudget />} />
      <Route path="/sprintdetail" element={<SprintDetail />} />
      <Route path="/risk" element={<Risk />} />
      <Route path="/escalationmatrices" element={<Escalation />} />
      <Route path="/technical" element={<Technical />} />
      <Route path="/financial" element={<Financial />} />
      <Route path="/operational" element={<Operational />} />
      <Route path="/phases" element={<Phases />} />
      <Route path="/stakeholders" element={<StakeHolders />} />
    </Routes>
  );
};

export default AppRoutes;
