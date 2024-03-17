import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { Grid, Paper, TextField, Button, InputLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";

const ProjectUpdates = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    generalUpdates: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/projectupdates",
        formData
      );
      setUpdates([...updates, response.data]);
      console.log("Updates submitted:", response.data);

      setFormData({
        date: "",
        generalUpdates: "",
      });
    } catch (error) {
      console.error("Error submitting Updates:", error);
    }
  };

  const fetchProjectUpdates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/projectupdates"
      );
      setUpdates(response.data);
    } catch (error) {
      console.error("Error fetching Updates:", error);
    }
  };

  useEffect(() => {
    fetchProjectUpdates();
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
  //delete
  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        console.error("Updates _id is undefined or null");
        return;
      }

      await axios.delete(`http://localhost:8080/api/projectupdates/${_id}`);
      setUpdates(updates.filter((update) => update._id !== _id));
      console.log("Update deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting Update:", error);
    }
  };

  return (
    !isLoading && (
      <Layout>
        <h2>Project Updates</h2>
        {(role === "projectmanager" || role === "admin") && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="date">Date</InputLabel>
                <TextField
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
                  {console.log(role)}
                  {(role === "projectmanager" || role === "admin") && (
                    <Button>
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
      </Layout>
    )
  );
};

export default ProjectUpdates;
