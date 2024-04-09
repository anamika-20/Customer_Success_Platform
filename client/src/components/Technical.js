import React, { useState, useEffect, useContext } from "react";
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
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const Technical = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);

  const [escalationMatrix, setEscalationMatrix] = useState([]);
  const [formData, setFormData] = useState({
    level: "",
    name: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    level: "",
    name: "",
  });

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        // setResources(project.resources);
      }
    }
  }, [id, projects]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const newEntry = await createTechnicalEscalationMatrix(formData);
      // setEscalationMatrix([...escalationMatrix, newEntry]);
      setFormData({ level: "", name: "" });
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
      // await updateTechnicalEscalationMatrix(editingId, editFormData);
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
      // await deleteTechnicalEscalationMatrix(id);
      setEscalationMatrix(escalationMatrix.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error deleting technical escalation matrix:", error);
    }
  };

  return (
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
                required={true}
                name="level"
                label="Level"
                value={formData.level}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                required={true}
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
                <Button variant="contained" onClick={() => setEditingId(null)}>
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
                        disabled={role !== "projectmanager" && role !== "admin"}
                        color="primary"
                        onClick={() => handleEdit(entry._id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={role !== "projectmanager" && role !== "admin"}
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
              required={true}
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
              require={true}
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
            <Button variant="contained" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
          </form>
        </Paper>
      </Modal>
    </Layout>
  );
};

export default Technical;
