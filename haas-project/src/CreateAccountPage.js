import React, { useState } from 'react';
import './App.css';
import { Paper, Container, Grid, Link, TextField, Button, Modal, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import PersonIcon from '@mui/icons-material/Person';
import { deepPurple, indigo } from '@mui/material/colors';
import { useAuth } from "./auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = useAuth()

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleUserid = (e) => {
    setUserid(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    var fetchURL = "/createUser?name=" + name + "&userid=" + userid + "&password=" + password
    fetch(fetchURL)
      .then((response) => response.text())
      .then(function (data) {
        data = JSON.parse(data);

        if(data.code === 200) {
          if(data.isAuthenticated) {
            auth.login(data.username)
            navigate('/projects/' + data.username + "/" + data.name);
          } else {
            setMessage("User exists. Try again")
            setIsModalOpen(true);
          }
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: deepPurple[300] }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          HAAS Project
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="userid"
            label="User ID"
            name="userid"
            autoComplete="userid"
            autoFocus
            onChange={handleUserid}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCreate}
          >
            Create Account
          </Button>
          <Grid container>
          </Grid>
        </Box>
      </Box>
      <Grid container>
            <Grid item>
              <Link href="./login" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{message}</h2>
          <Button onClick={closeModal}>Close</Button>
        </Box>
      </Modal>
    </Container>
  )
}