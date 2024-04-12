import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../DataContext";

const MultiStepFormModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  const { refreshData } = useContext(DataContext);
  const { getAccessTokenSilently } = useAuth0();
  const [step, setStep] = useState(0);
  const [allPms, setAllPms] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [allAuditors, setAllAuditors] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const token = await getAccessTokenSilently();
      console.log("accessToken: " + token);
      try {
        const response = await axios.get(
          "http://localhost:8080/user",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const users = response.data;
        console.log(users);
        const pms = users.filter((user) => user.role === "projectmanager");
        const clients = users.filter((user) => user.role === "client");
        const auditors = users.filter((user) => user.role === "auditor");

        setAllPms(pms);
        setAllClients(clients);
        setAllAuditors(auditors);
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
    getAllUsers();
  }, [getAccessTokenSilently]);

  const [pmStakeholders, setPmStakeholders] = useState([]);
  const [clientStakeholders, setClientStakeholders] = useState([]);
  const [auditorStakeholders, setAuditorStakeholders] = useState([]);

  // console.log(
  //   allPms
  //     .filter((pm) => !pmStakeholders.includes(pm.email))
  //     .map((pm) => pm.email)
  // );

  const handleStakeholderChange = (type, event) => {
    const newValue = event.target.value;
    switch (type) {
      case "pm":
        setPmStakeholders([...pmStakeholders, newValue]);
        break;
      case "client":
        setClientStakeholders([...clientStakeholders, newValue]);
        break;
      case "auditor":
        setAuditorStakeholders([...auditorStakeholders, newValue]);
        break;
      default:
        break;
    }
  };

  const removeStakeholder = (index, type) => {
    switch (type) {
      case "pm":
        const newPmStakeholders = [...pmStakeholders];
        newPmStakeholders.splice(index, 1);
        setPmStakeholders(newPmStakeholders);
        break;
      case "client":
        const newClientStakeholders = [...clientStakeholders];
        newClientStakeholders.splice(index, 1);
        setClientStakeholders(newClientStakeholders);
        break;
      case "auditor":
        const newAuditorStakeholders = [...auditorStakeholders];
        newAuditorStakeholders.splice(index, 1);
        setAuditorStakeholders(newAuditorStakeholders);
        break;
      default:
        break;
    }
  };

  const getAvailableStakeholders = (type) => {
    switch (type) {
      case "pm":
        return allPms.filter((pm) => !pmStakeholders.includes(pm));
      case "client":
        return allClients.filter(
          (client) => !clientStakeholders.includes(client)
        );
      case "auditor":
        return allAuditors.filter(
          (auditor) => !auditorStakeholders.includes(auditor)
        );
      default:
        return [];
    }
  };

  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    durationMonths: "",
    budgetedHours: "",
    projectDescription: "",
    stakeholders: {},
  });
  const [errors, setErrors] = useState({});

  const steps = ["Name", "Details", "Description", "Stakeholders"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const currentStep = steps[step];

    if (currentStep === "Details") {
      if (
        !formData.projectType ||
        !formData.durationMonths ||
        !formData.budgetedHours
      ) {
        setErrors({
          projectType: !formData.projectType ? "This field is required" : "",
          durationmonths: !formData.durationMonths
            ? "This field is required"
            : "",
          budgetedhours: !formData.budgetedHours
            ? "This field is required"
            : "",
        });
        return;
      }
    } else if (currentStep === "Name" && !formData["projectName"]) {
      setErrors({
        projectName: "This field is required",
      });
      return;
    } else if (
      currentStep === "Description" &&
      !formData["projectDescription"]
    ) {
      setErrors({
        projectDescription: "This field is required",
      });
    }

    setStep((prevStep) => prevStep + 1);
    setErrors({});
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
    setErrors({});
  };
  const handleSubmit = () => {
    // TODO: validation checking
    // if (!formData.stakeholders) {
    //   setErrors({
    //     stakeholders: "This field is required",
    //   });
    //   return;
    // }
    const pmids = pmStakeholders.map((stakeholder) => stakeholder._id);
    const auditorids = auditorStakeholders.map(
      (stakeholder) => stakeholder._id
    );
    const clientids = clientStakeholders.map((stakeholder) => stakeholder._id);

    const stakeholders = {
      PM: pmids,
      Auditor: auditorids,
      Client: clientids,
    };

    const postProject = async () => {
      const token = await getAccessTokenSilently();
      try {
        const response = await axios.post(
          "http://localhost:8080/project/add",
          { ...formData, stakeholders },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await refreshData();
        navigate(`/project/${response.data._id}`);
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    };
    postProject();
    setFormData({
      projectName: "",
      projectType: "",
      durationMonths: "",
      budgetedHours: "",
      projectDescription: "",
      stakeholders: {},
    });
    setStep(0);
    onClose();
  };
  console.log(formData); // you can handle the form data submission here

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Add New Project</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 0 && (
          <>
            <Typography variant="h6">
              Project Name(Name Should be unique)
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!errors.projectName}
              helperText={errors.projectName}
            />
          </>
        )}
        {step === 1 && (
          <>
            <Typography variant="h6">Project Details</Typography>
            <Select
              fullWidth
              label="Type"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!errors.projectType}
              helperText={errors.projectType}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Budget Type
              </MenuItem>
              <MenuItem value="Fixed Budget">Fixed Budget</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Duration (Months)"
              name="durationMonths"
              value={formData.durationMonths}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!errors.durationmonths}
              helperText={errors.durationmonths}
              type="number"
            />
            <TextField
              fullWidth
              label="Budgeted Hours"
              name="budgetedHours"
              value={formData.budgetedHours}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!errors.budgetedhours}
              helperText={errors.budgetedhours}
              type="number"
            />
          </>
        )}
        {step === 2 && (
          <>
            <Typography variant="h6">Project Description</Typography>
            <TextField
              fullWidth
              label="Description"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!errors.projectDescription}
              helperText={errors.projectDescription}
              multiline
              rows={4}
            />
          </>
        )}
        {step === 3 && (
          <>
            <Typography variant="h6">Step 4: Stakeholders</Typography>
            <Box mt={2}>
              <Typography variant="subtitle1">
                Project Managers (PMs)
              </Typography>
              {pmStakeholders.map((pm, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    label={`PM ${index + 1}`}
                    value={pm.name}
                    variant="outlined"
                    margin="normal"
                  />
                  <IconButton
                    color="secondary"
                    onClick={() => removeStakeholder(index, "pm")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Select
                fullWidth
                onChange={(e) => handleStakeholderChange("pm", e)}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="" disabled>
                  Select PM
                </MenuItem>
                {getAvailableStakeholders("pm").map((pm) => (
                  <MenuItem key={pm} value={pm}>
                    {pm.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle1">Clients</Typography>
              {clientStakeholders.map((client, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    label={`Client ${index + 1}`}
                    value={client.name}
                    variant="outlined"
                    margin="normal"
                  />
                  <IconButton
                    color="secondary"
                    onClick={() => removeStakeholder(index, "client")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Select
                fullWidth
                onChange={(e) => handleStakeholderChange("client", e)}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="" disabled>
                  Select Client
                </MenuItem>
                {getAvailableStakeholders("client").map((client) => (
                  <MenuItem key={client} value={client}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle1">Auditors</Typography>
              {auditorStakeholders.map((auditor, index) => (
                <Box key={index} display="flex" alignItems="center">
                  <TextField
                    fullWidth
                    label={`Auditor ${index + 1}`}
                    value={auditor.name}
                    variant="outlined"
                    margin="normal"
                  />
                  <IconButton
                    color="secondary"
                    onClick={() => removeStakeholder(index, "auditor")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Select
                fullWidth
                onChange={(e) => handleStakeholderChange("auditor", e)}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="" disabled>
                  Select Auditor
                </MenuItem>
                {getAvailableStakeholders("auditor").map((auditor) => (
                  <MenuItem key={auditor} value={auditor}>
                    {auditor.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {step !== 0 && (
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
        )}
        {step !== 3 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MultiStepFormModal;
