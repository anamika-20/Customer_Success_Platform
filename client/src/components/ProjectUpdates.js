import React, { useEffect, useState, useContext } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const ProjectUpdates = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { user, isLoading } = useAuth0();
  const { id } = useParams();
  const { projects, loading, error, role, refreshProjects } =
    useContext(DataContext);
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

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setUpdates(project.projectUpdates);
      }
    }
  }, [id, projects]);

  const fetchData = async () => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.get(
        `http://localhost:8080/projectupdates/${id}`
      );
      setUpdates(response.data);
    } catch (error) {
      console.error("Error fetching Updates:", error);
    }
  };

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

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { _id, ...data } = editData;

    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.put(
        `http://localhost:8080/projectupdates/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedProject = updates.map((update) =>
          update._id === _id ? response.data : update
        );
        setUpdates(updatedProject);
        setEditDialogOpen(false);
        console.log("Resource updated with _id:", _id);
        refreshProjects(); // Reload the context data
      } else {
        console.error("Error updating resource:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing Update:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.post(
        `http://localhost:8080/projectupdates/${id}/add`,
        {
          date: formData.date,
          generalUpdates: formData.generalUpdates,
        }
      );

      setUpdates([...updates, response.data]);
      setFormData({
        date: "",
        generalUpdates: "",
      });
      refreshProjects(); // Reload the context data
    } catch (error) {
      console.error("Error submitting Updates:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(
        `http://localhost:8080/projectupdates/${id}/${_id}/delete`
      );
      setUpdates(updates.filter((update) => update._id !== _id));
      console.log("update deleted with _id:", _id);
      refreshProjects(); // Reload the context data
    } catch (error) {
      console.error("Error deleting Update:", error);
    }
  };

  return (
    !isLoading && (
      <Layout>
        <Grid container>
          <Grid item xs={12}>
            <HorizontalList />
          </Grid>
          <Grid container item justifyContent="center" spacing={4}>
            {(role === "projectmanager" || role === "admin") && (
              <Grid item xs={6}>
                <Paper sx={{ p: 2, mt: 4 }}>
                  <h2>Project Updates</h2>
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
            <Grid item xs={8}>
              <Paper sx={{ p: 2, mt: 4 }}>
                <h2>Older Updates</h2>
                {updates?.map((update, index) => (
                  <div key={index}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h3>Date: {update?.date?.split("T")[0]}</h3>
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
                    <p>General Updates: {update?.generalUpdates}</p>
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
                    // value={editData.date}
                    value={editData.date.split("T")[0]}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        date: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="generalUpdates">
                    General Updates
                  </InputLabel>
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
          </Grid>
        </Grid>
      </Layout>
    )
  );
};

export default ProjectUpdates;
