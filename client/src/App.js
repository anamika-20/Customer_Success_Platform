import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import ApprovedTeams from "./pages/ApprovedTeams";
import Resources from "./pages/Resources";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientFeedback from "./pages/ClientFeedback";
import Moms from "./pages/Moms";
import ProjectUpdates from "./pages/ProjectUpdates";
import AddUser from "./pages/AddUser";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Button, Toolbar, Typography } from "@mui/material";
import ProjectDetails from "./pages/ProjectDetails";
import AuditHistory from "./components/AuditHistory.js";
import VersionHistory from "./components/VersionHistory.js"
import ProjectBudget from "./components/ProjectBudget.js"
import SprintDetail from "./components/SprintDetail"
import Risk from "./components/Risk"
import Escalation from "./components/Escalation"
import Phases from "./components/Phases"
import StakeHolders from "./components/StakeHolders"


function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const [userExists, setUserExists] = useState(true);
  if (!isAuthenticated && !isLoading) loginWithRedirect();
  const handleCheckUser = async (email) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/isValidUser",
        { params: { email } }
      );
      setUserExists(response.data.exists);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (isAuthenticated && !isLoading) handleCheckUser(user?.email);
  }, [isLoading]);

  return isAuthenticated && !isLoading && userExists ? (
    <Router>
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
        <Route path="/phases" element={<Phases />} />
        <Route path="/stakeholders" element={<StakeHolders />} />
      </Routes>
    </Router>
  ) : (
    <>
      {isAuthenticated && !isLoading && (
        <Toolbar sx={{ display: "flex", flexDirection: "column", gap: [2] }}>
          <Typography>
            User is not authorised to access, tell the authority to give access
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </Button>
        </Toolbar>
      )}
    </>
  );
}

export default App;
