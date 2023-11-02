import React, { useState } from "react";
import { Paper, Container, Grid, TextField, Button, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { deepPurple, indigo } from '@mui/material/colors';

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

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUserid = (e) => {
    setUserid(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    var fetchURL = "/login?userid=" + userid + "&password=" + password
    fetch(fetchURL)
      .then((response) => response.text())
      .then(function (data) {
        data = JSON.parse(data);

        if(data.code === 200) {
          if(data.isAuthenticated) {
            navigate('/projects');
          } else {
            setMessage("Invalid credentials. Try again")
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
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="./createaccount" variant="body2">
                {"Don't have an account? Create Account"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
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
  );

}

export default LoginForm;