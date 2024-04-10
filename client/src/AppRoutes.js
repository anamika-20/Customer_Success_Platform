import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
import ApprovedTeams from "./components/ApprovedTeams.js";
import Resources from "./components/Resources.js";
import ClientFeedback from "./components/ClientFeedback.js";
import Moms from "./components/Moms.js";
import ProjectUpdates from "./components/ProjectUpdates.js";
// import AddUser from "./components/AddUser.js";
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
import DownloadDetails from "./components/DownloadDetails.js";
import OneProjectDetail from "./components/OneProjectDetail.js";
import { DataProvider } from "./DataContext";
import TechStack from "./components/TechStack.js";

const AppRoutes = () => {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/adduser" element={<AddUser />} /> */}
        <Route path="/project" element={<ProjectDetails />} />
        <Route path="/project/:id" element={<OneProjectDetail />} />
        <Route path="/download" element={<DownloadDetails />} />
        <Route path="/project/:id/approvedteams" element={<ApprovedTeams />} />
        <Route path="/project/:id/resources" element={<Resources />} />
        <Route
          path="/project/:id/clientfeedback"
          element={<ClientFeedback />}
        />
        <Route path="/project/:id/moms" element={<Moms />} />
        <Route
          path="/project/:id/projectupdates"
          element={<ProjectUpdates />}
        />
        <Route path="/project/:id/audithistory" element={<AuditHistory />} />
        <Route
          path="/project/:id/versionhistory"
          element={<VersionHistory />}
        />
        <Route path="/projectbudget" element={<ProjectBudget />} />
        <Route path="/project/:id/sprintdetail" element={<SprintDetail />} />
        <Route path="/project/:id/risk" element={<Risk />} />
        <Route path="/project/:id/techstack" element={<TechStack />} />
        <Route
          path="/project/:id/escalationmatrices"
          element={<Escalation />}
        />
        <Route path="/project/:id/technical" element={<Technical />} />
        <Route path="/project/:id/financial" element={<Financial />} />
        <Route path="/project/:id/operational" element={<Operational />} />
        <Route path="/project/:id/phases" element={<Phases />} />
        <Route path="/project/:id/stakeholders" element={<StakeHolders />} />
      </Routes>
    </DataProvider>
  );
};

export default AppRoutes;
