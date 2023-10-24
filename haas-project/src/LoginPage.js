import React, { useState } from "react";
import { Paper, Container, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { deepPurple } from "@mui/material/colors";
import Axios from "axios";

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post("flask-backend/login.py/login", {
        username: username,
        password: password,
      });
  
      if (response.status === 200) {
        navigate("/projects");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };
  
  const handleRegistration = async () => {
    try {
      const response = await Axios.post("http://localhost:3000/register", {
        username: username,
        password: password,
      });
  
      if (response.status === 201) {
        navigate("/projects");
      } else {
        setError("User already exists");
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleRegistration}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <p style={{ color: "red" }}>{error}</p>
              <Link href="./createaccount" variant="body2">
                {"Don't have an account? Create Account"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;