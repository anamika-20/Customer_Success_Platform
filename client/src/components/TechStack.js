import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import HorizontalList from "./HorizontalList";
import { Grid, Button, Box, Paper } from "@mui/material";
import Chip from "@mui/material/Chip";

import { useAuth0 } from "@auth0/auth0-react";

import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import WordInput from "./WordInput";

const TechStack = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [isEditable, setIsEditable] = useState(false);
  const { id } = useParams();
  const { projects, loading, error, role } = useContext(DataContext);
  const [inputValues, setInputValues] = useState({
    backend: [],
    frontend: [],
    mobileApp: [],
    database: [],
    infrastructureAndServices: [],
  });

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        const { projectStack } = project;
        setInputValues({
          backend: projectStack?.backend || [],
          frontend: projectStack?.frontend || [],
          mobileApp: projectStack?.mobileApp || [],
          database: projectStack?.database || [],
          infrastructureAndServices:
            projectStack?.infrastructureAndServices || [],
        });
      }
    }
  }, [id, projects]);

  const handleSubmit = async (e) => {
    const project = projects.find((p) => p._id === id);
    if (project) {
      try {
        const token = await getAccessTokenSilently();
        setAuthHeader(token);
        await axiosInstance.put(`/projectstack/${id}/edit`, inputValues);
        setIsEditable(false);
      } catch (error) {
        console.error("Error creating phase:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>

        <Grid item xs={6} justifyContent={"center"}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <h2>Tech Stack</h2>
            {isEditable ? (
              <Box display="flex" flexDirection="column" alignItems="center">
                <WordInput
                  label="Backend"
                  words={inputValues.backend}
                  setWords={(words) =>
                    setInputValues({ ...inputValues, backend: words })
                  }
                />
                <WordInput
                  label="Frontend"
                  words={inputValues.frontend}
                  setWords={(words) =>
                    setInputValues({ ...inputValues, frontend: words })
                  }
                />
                <WordInput
                  label="Mobile App"
                  words={inputValues.mobileApp}
                  setWords={(words) =>
                    setInputValues({ ...inputValues, mobileApp: words })
                  }
                />
                <WordInput
                  label="Database"
                  words={inputValues.database}
                  setWords={(words) =>
                    setInputValues({ ...inputValues, database: words })
                  }
                />
                <WordInput
                  label="Infrastructure and Services"
                  words={inputValues.infrastructureAndServices}
                  setWords={(words) =>
                    setInputValues({
                      ...inputValues,
                      infrastructureAndServices: words,
                    })
                  }
                />

                <Button
                  type={"submit"}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  style={{ marginTop: "20px" }}
                >
                  Submit
                </Button>
              </Box>
            ) : (
              <Box display="flex" flexDirection="column">
                {inputValues?.backend?.length > 0 && (
                  <div>
                    Backend:
                    {inputValues?.backend?.map((word, index) => (
                      <Chip
                        key={index}
                        label={word}
                        style={{ margin: "5px" }}
                      />
                    ))}
                  </div>
                )}
                {inputValues?.frontend?.length > 0 && (
                  <div>
                    Frontend:
                    {inputValues?.frontend?.map((word, index) => (
                      <Chip
                        key={index}
                        label={word}
                        style={{ margin: "5px" }}
                      />
                    ))}
                  </div>
                )}
                {inputValues?.mobileApp?.length > 0 && (
                  <div>
                    Mobile App:
                    {inputValues?.mobileApp?.map((word, index) => (
                      <Chip
                        key={index}
                        label={word}
                        style={{ margin: "5px" }}
                      />
                    ))}
                  </div>
                )}
                {inputValues?.database?.length > 0 && (
                  <div>
                    Database:
                    {inputValues?.database?.map((word, index) => (
                      <Chip
                        key={index}
                        label={word}
                        style={{ margin: "5px" }}
                      />
                    ))}
                  </div>
                )}
                {inputValues?.infrastructureAndServices?.length > 0 && (
                  <div>
                    Infrastructure and Services:
                    {inputValues?.infrastructureAndServices?.map(
                      (word, index) => (
                        <Chip
                          key={index}
                          label={word}
                          style={{ margin: "5px" }}
                        />
                      )
                    )}
                  </div>
                )}
                {role === "projectmanager" ||
                  (role === "admin" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setIsEditable(true);
                      }}
                      style={{ marginTop: "20px" }}
                    >
                      Edit
                    </Button>
                  ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default TechStack;
