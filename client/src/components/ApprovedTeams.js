import React, { useEffect, useState, useContext } from "react";
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
// import {
//   fetchTeams,
//   saveTeam,
//   updateTeam,
//   deleteTeam,
//   fetchUserRole,
// } from "../api/approvedTeamsAPI";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";

const ApprovedTeams = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [teams, setTeams] = useState([]);
  const [phaseNumber, setPhaseNumber] = useState("");
  const [tableData, setTableData] = useState([
    { numberOfResources: "", role: "", availability: "", duration: "" },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedTeam, setEditedTeam] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();
  const { projects, loading, error } = useContext(DataContext);

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { numberOfResources: "", role: "", availability: "", duration: "" },
    ]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
  };

  const handleEdit = (team) => {
    setEditedTeam(team);
    setPhaseNumber(team.PhaseNumber);
    setTableData(team.teamResources);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    // for (const row of tableData) {
    //   if (
    //     !row.numberOfResources ||
    //     !row.role ||
    //     !row.availability ||
    //     !row.duration
    //   ) {
    //     setErrorMessage("Please fill in all fields.");
    //     return;
    //   }
    // }

    const teamResources = tableData.map((row) => ({
      numberOfResources: row.numberOfResources,
      role: row.role,
      availability: row.availability,
      duration: row.duration,
    }));

    const team = {
      PhaseNumber: phaseNumber,
      teamResources: teamResources,
    };

    try {
      if (editedTeam) {
        // await updateTeam(editedTeam._id, team);
        setOpenDialog(false);
        setEditedTeam(null);
      } else {
        // await saveTeam(team);
        setOpenDialog(false);
      }
      fetchTeamsData();
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      // await deleteTeam(_id);
      setTeams(teams.filter((team) => team._id !== _id));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const fetchTeamsData = async () => {
    try {
      // const data = await fetchTeams();
      // setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeamsData();
    if (!isLoading) {
      const getUserRole = async () => {
        // const role = await fetchUserRole(user?.email);
        setRole(role);
      };
      getUserRole();
    }
  }, [isLoading, user]);

  return (
    <Layout>
      <Grid item container>
        <Grid item xs={10} sx={{ marginLeft: 5 }}>
          <h2>Approved Teams</h2>
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
                label="Table Name"
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
                    <TableCell>Availability%</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
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

          <Grid item xs={10} sx={{ marginLeft: 5 }}>
            <div style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}>
              {teams.map((team, index) => (
                <div key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>Phase Number: {team.PhaseNumber}</h2>
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
                        <TableCell>Availability %</TableCell>
                        <TableCell>Duration</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {team.teamResources.map((resource, resourceIndex) => (
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
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ApprovedTeams;
