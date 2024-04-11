import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  TextField,
  Button,
  Container,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axiosInstance, { setAuthHeader } from "../axiosConfig";

import Layout from "./Layout";
import { DataContext } from "../DataContext";

const AddUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { role: currentRole, refreshData } = useContext(DataContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      await axiosInstance.post(`/user/add`, {
        name,
        role,
        email,
      });

      await refreshData();

      setName("");
      setRole("");
      setEmail("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    currentRole === "admin" && (
      <Layout>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            Add User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputLabel>Role*</InputLabel>
            <Select
              fullWidth
              required
              variant="outlined"
              margin="normal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="projectmanager">Project Manager</MenuItem>
              <MenuItem value="auditor">Auditor</MenuItem>
              <MenuItem value="client">Client</MenuItem>
            </Select>
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Container>
      </Layout>
    )
  );
};

export default AddUser;
