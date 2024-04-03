/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Toolbar, Typography, Button } from "@mui/material";

const UserAuthorization = ({ user }) => {
  const [userExists, setUserExists] = useState(true);

  const checkUserAuthorization = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/isAuthorized`,
        { params: { email } }
      );
      setUserExists(response.data.exists);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkUserAuthorization(user?.email);
  }, [user?.email]);

  return (
    <>
      {userExists ? (
        <Toolbar sx={{ display: "flex", flexDirection: "column", gap: [2] }}>
          <Typography>
            User is not authorised to access, tell the authority to give access
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const { logout } = useAuth0();
              logout({ logoutParams: { returnTo: window.location.origin } });
            }}
          >
            Log Out
          </Button>
        </Toolbar>
      ) : null}
    </>
  );
};

export default UserAuthorization;
