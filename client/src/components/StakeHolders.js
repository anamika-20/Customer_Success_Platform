import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Select,
  Grid,
  MenuItem,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";
import Layout from "./Layout";

const StakeHolders = () => {
  const [stakeholders, setstakeholders] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role, refreshData } =
    useContext(DataContext);
  console.log(projects);
  const [pmList, setPmList] = useState([]);
  const [auditorList, setAuditorList] = useState([]);
  const [clientList, setClientList] = useState([]);
  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setstakeholders(project.stakeholders);
        setPmList(project.stakeholders.PM);
        setAuditorList(project.stakeholders.Auditor);
        setClientList(project.stakeholders.Clients);
      }
    }
  }, [id, projects]);

  // [
  //   { id: 1, name: "John Doe" },
  // ]);
  // const [auditorList, setauditorList] = useState([
  //   { id: 1, name: "Emily Brown" },
  // ]);
  // const [clientList, setClientList] = useState([
  //   { id: 1, name: "Sarah Williams" },
  // ]);

  const handleStakeholderChange = (type, e) => {
    const name = e.target.value;
    const newStakeholder = { id: Date.now(), name };

    switch (type) {
      case "pm":
        setPmList([...pmList, newStakeholder]);
        break;
      case "auditor":
        setAuditorList([...auditorList, newStakeholder]);
        break;
      case "client":
        setClientList([...clientList, newStakeholder]);
        break;
      default:
        break;
    }
  };

  const removeStakeholder = (index, type) => {
    switch (type) {
      case "pm":
        const updatedpmList = [...pmList];
        updatedpmList.splice(index, 1);
        setPmList(updatedpmList);
        break;
      case "auditor":
        const updatedauditorList = [...auditorList];
        updatedauditorList.splice(index, 1);
        setAuditorList(updatedauditorList);
        break;
      case "client":
        const updatedclientList = [...clientList];
        updatedclientList.splice(index, 1);
        setClientList(updatedclientList);
        break;
      default:
        break;
    }
  };

  const getAvailableStakeholders = (type) => {
    switch (type) {
      case "pm":
        // For this example, returning a static list of available PMs
        return [
          { id: 2, name: "Jane Smith" },
          { id: 3, name: "Alice Johnson" },
        ];
      case "auditor":
        // For this example, returning a static list of available Auditors
        return [
          { id: 2, name: "Michael Johnson" },
          { id: 3, name: "David Brown" },
        ];
      case "client":
        // For this example, returning a static list of available Clients
        return [
          { id: 2, name: "David Jones" },
          { id: 3, name: "Laura Smith" },
        ];
      default:
        return [];
    }
  };

  const renderStakeholderSection = (
    type,
    stakeholders,
    handleChange,
    availableStakeholders
  ) => (
    <Box mt={2}>
      <Typography variant="subtitle1">{`${
        type.charAt(0).toUpperCase() + type.slice(1)
      }s`}</Typography>
      {stakeholders?.map((stakeholder, index) => (
        <Box key={index} display="flex" alignItems="center" mt={1}>
          <TextField
            fullWidth
            label={`${type.charAt(0).toUpperCase() + type.slice(1)} ${
              index + 1
            }`}
            value={stakeholder.name}
            variant="outlined"
            margin="normal"
            disabled
          />
          <IconButton
            color="secondary"
            onClick={() => removeStakeholder(index, type)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Select
        fullWidth
        onChange={(e) => handleChange(type, e)}
        variant="outlined"
        margin="normal"
      >
        <MenuItem value="" disabled>
          Select {type.charAt(0).toUpperCase() + type.slice(1)}
        </MenuItem>
        {availableStakeholders?.map((stakeholder) => (
          <MenuItem key={stakeholder.id} value={stakeholder.name}>
            {stakeholder.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        <Grid container item justifyContent="center" spacing={4}>
          {(role === "projectmanager" || role === "admin") && (
            <Container>
              {/* <Typography variant="h6" gutterBottom>
                Step 4: Stakeholders
              </Typography> */}

              {renderStakeholderSection(
                "pm",
                pmList,
                handleStakeholderChange,
                getAvailableStakeholders("pm")
              )}
              {renderStakeholderSection(
                "client",
                clientList,
                handleStakeholderChange,
                getAvailableStakeholders("client")
              )}
              {renderStakeholderSection(
                "auditor",
                auditorList,
                handleStakeholderChange,
                getAvailableStakeholders("auditor")
              )}
            </Container>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default StakeHolders;
