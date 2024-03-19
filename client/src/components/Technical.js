import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Modal,
} from "@mui/material";
import Layout from "../Layout";
import {
  getAllTechnicalEscalationMatrix,
  createTechnicalEscalationMatrix,
  updateTechnicalEscalationMatrix,
  deleteTechnicalEscalationMatrix,
} from "../api/technicalEscalationMatrixAPI";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Technical = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [escalationMatrix, setEscalationMatrix] = useState([]);
  const [formData, setFormData] = useState({
    // project_id: "",
    level: "",
    name: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    // project_id: "",
    level: "",
    name: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTechnicalEscalationMatrix();
        setEscalationMatrix(data);
      } catch (error) {
        console.error("Error fetching technical escalation matrix:", error);
      }
    };
    fetchData();
  }, []);
  const getRole = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getRole?email=${user?.email}`
      );
      if (response.data.role === "Does not Exists") setRole(null);
      else setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };
  if (!isLoading) getRole();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = await createTechnicalEscalationMatrix(formData);
      setEscalationMatrix([...escalationMatrix, newEntry]);
      setFormData({  level: "", name: "" });
    } catch (error) {
      console.error("Error adding technical escalation matrix:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const entryToEdit = escalationMatrix.find((entry) => entry._id === id);
      setEditFormData({
        // project_id: entryToEdit.project_id,
        level: entryToEdit.level,
        name: entryToEdit.name,
      });
      setEditingId(id);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Error editing technical escalation matrix:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateTechnicalEscalationMatrix(editingId, editFormData);
      const updatedMatrix = escalationMatrix.map((entry) =>
        entry._id === editingId ? { ...entry, ...editFormData } : entry
      );
      setEscalationMatrix(updatedMatrix);
      setEditFormData({ level: "", name: "" });
      setEditingId(null);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTechnicalEscalationMatrix(id);
      setEscalationMatrix(escalationMatrix.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error deleting technical escalation matrix:", error);
    }
  };

  return (
    !isLoading && (
      <Layout>
        <Grid container justifyContent="center">
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={10}>
              <h2>Add Technical Escalation Matrix</h2>
            </Grid>
          )}
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={10}>
              <form onSubmit={handleSubmit}>
                {/* <TextField
                  name="project_id"
                  label="Project ID"
                  value={formData.project_id}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                /> */}
                <TextField
                  name="level"
                  label="Level"
                  value={formData.level}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit" sx={{ mr: 2 }}>
                  {editingId ? "Save" : "Add"}
                </Button>
                {editingId && (
                  <Button
                    variant="contained"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                )}
              </form>
            </Grid>
          )}
          <Grid item xs={10}>
            <h2>Technical Escalation Matrix</h2>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Project ID</TableCell> */}
                    <TableCell>Level</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {escalationMatrix.map((entry) => (
                    <TableRow key={entry._id}>
                      {/* <TableCell>{entry.project_id}</TableCell> */}
                      <TableCell>{entry.level}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "projectmanager" && role !== "admin"
                          }
                          color="primary"
                          onClick={() => handleEdit(entry._id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "projectmanager" && role !== "admin"
                          }
                          color="error"
                          onClick={() => handleDelete(entry._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        {/* Edit Modal */}
        <Modal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          aria-labelledby="edit-modal-title"
          aria-describedby="edit-modal-description"
        >
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              p: 4,
            }}
          >
            <Typography variant="h6" id="edit-modal-title" sx={{ mb: 2 }}>
              Edit Technical Escalation Matrix
            </Typography>
            <form onSubmit={handleSaveEdit}>
              {/* <TextField
                name="project_id"
                label="Project ID"
                value={editFormData.project_id}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    project_id: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              /> */}
              <TextField
                name="level"
                label="Level"
                value={editFormData.level}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, level: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="name"
                label="Name"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" type="submit" sx={{ mr: 2 }}>
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
            </form>
          </Paper>
        </Modal>
      </Layout>
    )
  );
};

export default Technical;
