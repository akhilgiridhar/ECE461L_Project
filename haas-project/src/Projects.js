import React, { useState } from 'react';
import './App.css';
import {Paper, Container, Grid, TextField, Button} from '@mui/material';
import ProjectsScreen from './pages/ProjectsScreen';

function Projects() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  


  return (
    <Container maxWidth="md" className="top-left-container">
      <Grid container spacing={3} style={{ padding: '5px'}}>
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