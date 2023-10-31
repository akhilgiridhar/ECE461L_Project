import React, {useState} from 'react';
import './App.css';
import {Paper, Container, Grid, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { deepPurple, indigo } from '@mui/material/colors';


export default function CreateAccount() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [userid, setUserid] = useState("")
    const [password, setPassword] = useState("")

    const handleName = (e) => {
      setName(e.target.value);
    }

    const handleUserid = (e) => {
      setName(e.target.value);
    }

    const handlePassword = (e) => {
      setName(e.target.value);
    }

    const handleLogin = async () => {
        const isAuthenticated = true;

        if (isAuthenticated) {
        navigate('/projects');
        }
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
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            >
              Create Account 
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
    </Container>
    )
}