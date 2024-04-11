import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Paper,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const Technical = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role, refreshData } =
    useContext(DataContext);
  console.log(projects);

  const [users, setUsers] = useState([]);

  const [escalationMatrix, setEscalationMatrix] = useState([]);
  const [formData, setFormData] = useState({
    escalationLevel: "",
    name: "",
  });

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        const { technicalMatrix } = project;
        setEscalationMatrix(technicalMatrix);
      }
    }
  }, [id, projects]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAuthHeader(token);

        const response = await axiosInstance.get(`/user`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error creating phase:", error);
      }
    };
    getUsers();
  }, [getAccessTokenSilently]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const project = projects.find((p) => p._id === id);
    if (project) {
      try {
        const token = await getAccessTokenSilently();
        setAuthHeader(token);
        const data = escalationMatrix;
        data.push(formData);
        await axiosInstance.put(`/project/edit/${id}`, {
          technicalMatrix: data,
        });
        await refreshData();
      } catch (error) {
        console.error("Error creating phase:", error);
      }
    }
  };

  const handleDelete = async (entryId) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      await axiosInstance.put(`/project/edit/${id}`, {
        technicalMatrix: escalationMatrix.filter(
          (entry) => entry._id !== entryId
        ),
      });
      await refreshData();
      setEscalationMatrix(
        escalationMatrix.filter((entry) => entry._id !== entryId)
      );
    } catch (error) {
      console.error("Error deleting technical escalation matrix:", error);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        {(role === "projectmanager" || role === "admin") && (
          <Grid item xs={8}>
            <Paper sx={{ p: 2, mt: 4 }}>
              <h2>Add Technical Escalation Matrix</h2>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="escalationLevel">Level</InputLabel>
                <TextField
                  required={true}
                  name="escalationLevel"
                  value={formData.escalationLevel}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="name">Name</InputLabel>
                <Select
                  fullWidth
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  variant="outlined"
                  margin="normal"
                >
                  {users.map((user) => (
                    <MenuItem key={user} value={user}>
                      {user.name + " - " + user.role}
                    </MenuItem>
                  ))}
                </Select>
                <Button variant="contained" type="submit" sx={{ mr: 2 }}>
                  Add
                </Button>
              </form>
            </Paper>
          </Grid>
        )}
        <Grid item xs={10}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <h2>Technical Escalation Matrix</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Level</TableCell>
                  <TableCell>Name</TableCell>
                  {(role === "projectmanager" || role === "admin") && (
                    <TableCell>Delete</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {escalationMatrix ? (
                  escalationMatrix.map((entry) => (
                    <TableRow key={entry._id}>
                      <TableCell>{entry.escalationLevel}</TableCell>
                      <TableCell>{entry.name.name}</TableCell>

                      {(role === "projectmanager" || role === "admin") && (
                        <TableCell>
                          <Button
                            color="error"
                            onClick={() => handleDelete(entry._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Technical;
