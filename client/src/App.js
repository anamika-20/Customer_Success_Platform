import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AppRoutes from "./AppRoutes";

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  if (!isAuthenticated && !isLoading) loginWithRedirect();

  return (
    isAuthenticated &&
    !isLoading && (
      <Router>
        <AppRoutes />
      </Router>
    )
  );
}

export default App;
