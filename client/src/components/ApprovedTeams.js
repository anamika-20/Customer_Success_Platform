import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const ApprovedTeams = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const { projects, loading, error, role, setLoading, refreshData } =
    useContext(DataContext);
  const [teams, setTeams] = useState([]);
  const [phaseNumber, setPhaseNumber] = useState("");
  const [tableData, setTableData] = useState([
    { numberOfResources: "", role: "", availability: "", duration: "" },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTeamId, setEditedTeamId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setTeams(project.approvedTeam);
      }
    }
  }, [id, projects]);

  const handleAddRow = () => {
    setErrorMessage("");

    setTableData([
      ...tableData,
      { numberOfResources: "", role: "", availability: "", duration: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    setErrorMessage("");
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const handleInputChange = (index, event) => {
    setErrorMessage("");
    const { name, value } = event.target;
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
  };

  const handleEdit = (team) => {
    setEditedTeamId(team._id);
    setPhaseNumber(team.phaseNumber);
    setTableData(team.details);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (!phaseNumber) {
      setErrorMessage("Please enter the Table Name");
      return;
    }
    for (const row of tableData) {
      if (
        !row.numberOfResources ||
        !row.role ||
        !row.availability ||
        !row.duration
      ) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
    }

    const teamResources = tableData.map((row) => ({
      numberOfResources: row.numberOfResources,
      role: row.role,
      availability: row.availability,
      duration: row.duration,
    }));

    const team = {
      phaseNumber,
      details: teamResources,
    };

    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      if (editedTeamId)
        await axiosInstance.put(`/teams/${id}/${editedTeamId}/edit`, team);
      else await axiosInstance.post(`/teams/${id}/add`, team);

      await refreshData();

      setPhaseNumber("");
      setTableData([
        { numberOfResources: "", role: "", availability: "", duration: "" },
      ]);
      setEditedTeamId(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      await axiosInstance.delete(`/teams/${id}/${_id}/delete`);
      setTeams(teams.filter((team) => team._id !== _id));
    } catch (error) {
      console.error("Error deleting Team:", error);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <Grid justifyContent="center" spacing={4} container>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        <Grid item xs={10} sx={{ marginLeft: 5 }}>
          <h2>Approved Teams</h2>
          <Grid item xs={10} sx={{ marginLeft: 5 }}>
            <div style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}>
              {teams.map((team, index) => (
                <div key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>Phase Number: {team.phaseNumber}</h2>
                    {(role === "projectmanager" || role === "admin") && (
                      <Button onClick={() => handleEdit(team)}>
                        <EditIcon style={{ marginLeft: "10px" }} />
                      </Button>
                    )}
                    {(role === "projectmanager" || role === "admin") && (
                      <Button>
                        <DeleteIcon
                          style={{ marginLeft: "10px" }}
                          color="error"
                          onClick={() => handleDelete(team._id)}
                        />
                      </Button>
                    )}
                  </div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No. Of Resources</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Availability %(in number)</TableCell>
                        <TableCell>Duration</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {team.details.map((resource, resourceIndex) => (
                        <TableRow key={resourceIndex}>
                          <TableCell>{resource.numberOfResources}</TableCell>
                          <TableCell>{resource.role}</TableCell>
                          <TableCell>{resource.availability}</TableCell>
                          <TableCell>{resource.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </Grid>
          {(role === "projectmanager" || role === "admin") && (
            <Button variant="contained" onClick={() => setOpenDialog(true)}>
              Add Phase Data
            </Button>
          )}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Enter Table Data</DialogTitle>
            <DialogContent>
              <TextField
                required={true}
                label="Phase Number"
                variant="outlined"
                value={phaseNumber}
                onChange={(e) => setPhaseNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No. Of resources</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Availability%(in number)</TableCell>
                    <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((rowData, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          required={true}
                          name="numberOfResources"
                          variant="outlined"
                          value={rowData.numberOfResources}
                          onChange={(e) => handleInputChange(index, e)}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          required={true}
                          name="role"
                          variant="outlined"
                          value={rowData.role}
                          onChange={(e) => handleInputChange(index, e)}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          required={true}
                          name="availability"
                          variant="outlined"
                          value={rowData.availability}
                          onChange={(e) => handleInputChange(index, e)}
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          required={true}
                          name="duration"
                          variant="outlined"
                          value={rowData.duration}
                          onChange={(e) => handleInputChange(index, e)}
                          fullWidth
                        />
                      </TableCell>
                      {tableData.length > 1 && (
                        <td>
                          <Button onClick={() => handleRemoveRow(index)}>
                            <DeleteIcon />
                          </Button>
                        </td>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleAddRow}>
                Add Row
              </Button>
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ApprovedTeams;
