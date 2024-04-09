import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { Grid, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MultiStepFormModal from "./MultiStepFormModal";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";

const ProjectDetails = () => {
  const { projects, loading, error } = useContext(DataContext);
  console.log(projects);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getRandomImage = () => {
    const keywords = ["people", "business", "team", "office", "meeting"];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    return `https://source.unsplash.com/400x300/?${randomKeyword}`;
  };
  const handleProject = (id) => {
    navigate(`/project/${id}`);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <Grid container spacing={5} sx={{ p: 2 }}>
        <Grid container item>
          <Grid item xs={10}>
            <Typography className="mb-2">My Projects</Typography>
            <Grid item xs={4} flex flexDirection={"row"}>
              {projects &&
                projects.map((project) => (
                  <Card
                    sx={{ maxWidth: 345 }}
                    onClick={() => {
                      handleProject(project._id);
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={getRandomImage()}
                        alt="random image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {project.projectName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {project.projectDescription}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
            >
              <AddIcon />
              Add Project
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <MultiStepFormModal open={openModal} onClose={handleCloseModal} />
    </Layout>
  );
};

export default ProjectDetails;
