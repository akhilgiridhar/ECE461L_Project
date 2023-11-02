import React, { useState } from "react";
import "./App.css";
import { Paper, Container, Grid, TextField, Button, Modal, Box } from "@mui/material";
import ProjectsScreen from "./pages/ProjectsScreen";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 10,
};

function Projects() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="md" className="top-left-container">
      <div style={{ display: 'flex', alignContent: 'center', paddingTop: '10px', textAlign: 'center' }}>
        <Button
          onClick={handleModal}
          variant="contained"
          color="success"
          size="medium"
          style={{}}
        >
          Create Project
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create Project</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '60px', marginBottom: '10px' }}>
            <h3>Name:</h3>
            <TextField></TextField>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <h3>Description:</h3>
            <TextField></TextField>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '10px' }}>
            <h3>Project ID:</h3>
            <TextField></TextField>
          </div>
          <Button onClick={closeModal}>Create</Button>
        </Box>
      </Modal>
      <Grid container spacing={3} style={{ padding: "5px" }}>
        <Grid item xs={12}>
          <ProjectsScreen>Project 1</ProjectsScreen>
        </Grid>
        <Grid item xs={12}>
          <ProjectsScreen>Project 2</ProjectsScreen>
        </Grid>
        <Grid item xs={12}>
          <ProjectsScreen>Project 3</ProjectsScreen>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Projects;
