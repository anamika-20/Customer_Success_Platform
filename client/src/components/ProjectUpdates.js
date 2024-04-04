import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import {
  Grid,
  Paper,
  TextField,
  Button,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchProjectUpdates,
  submitProjectUpdate,
  deleteProjectUpdate,
  fetchUserRole,
  updateProjectUpdate,
} from "../api/projectUpdatesAPI";

const ProjectUpdates = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    generalUpdates: "",
  });
  const [editData, setEditData] = useState({
    _id: "",
    date: "",
    generalUpdates: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (update) => {
    setEditData(update);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedUpdate = await updateProjectUpdate(editData._id, editData);
      setUpdates(
        updates.map((update) =>
          update._id === updatedUpdate._id ? updatedUpdate : update
        )
      );
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error editing Update:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitProjectUpdate(formData);
      setUpdates([...updates, response]);
      console.log("Updates submitted:", response);
      setFormData({
        date: "",
        generalUpdates: "",
      });
    } catch (error) {
      console.error("Error submitting Updates:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjectUpdates();
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching Updates:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await fetchUserRole(user?.email);
        if (role === "Does not Exists") setRole(null);
        else setRole(role);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    if (!isLoading) getUserRole();
  }, [isLoading, user]);

  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        console.error("Updates _id is undefined or null");
        return;
      }
      await deleteProjectUpdate(_id);
      setUpdates(updates.filter((update) => update._id !== _id));
      console.log("Update deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting Update:", error);
    }
  };

  return (
    !isLoading && (
      <Layout>
        {(role === "projectmanager" || role === "admin") && (
          <Grid item xs={12}>
            <h2>Project Updates</h2>
            <Paper sx={{ p: 2 }}>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="date">Date</InputLabel>
                <TextField
                required
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="generalUpdates">
                  General Updates
                </InputLabel>
                <TextField
                required
                  id="generalUpdates"
                  name="generalUpdates"
                  multiline
                  rows={4}
                  value={formData.generalUpdates}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </form>
            </Paper>
          </Grid>
        )}

        {/* Display Updates */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mt: 4 }}>
            <h2>Older Updates</h2>
            {updates.map((update, index) => (
              <div key={index}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3>Date: {update.date.split("T")[0]}</h3>
                  {(role === "projectmanager" || role === "admin") && (
                    <Button onClick={() => handleEdit(update)}>
                      <EditIcon style={{ marginLeft: "10px" }} />
                    </Button>
                  )}

                  {(role === "projectmanager" || role === "admin") && (
                    <Button>
                      <DeleteIcon
                        style={{ marginLeft: "10px" }}
                        color="error"
                        onClick={() => handleDelete(update._id)}
                      />
                    </Button>
                  )}
                </div>
                <p>General Updates: {update.generalUpdates}</p>
              </div>
            ))}
            {updates.length === 0 && <p>No updates yet.</p>}
          </Paper>
        </Grid>

        {/* Edit Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Update</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSaveEdit}>
              <InputLabel htmlFor="date">Date</InputLabel>
              <TextField
                id="date"
                name="date"
                type="date"
                value={editData.date}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    date: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="generalUpdates">General Updates</InputLabel>
              <TextField
                id="generalUpdates"
                name="generalUpdates"
                multiline
                rows={4}
                value={editData.generalUpdates}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    generalUpdates: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" type="submit">
                Save
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Layout>
    )
  );
};

export default ProjectUpdates;
