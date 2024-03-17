import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Button, Toolbar, Typography } from "@mui/material";
import AppRoutes from "./AppRoutes";

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
      <AppRoutes />
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
