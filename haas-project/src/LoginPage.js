import React from "react";
import {Paper, Container, Grid, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { deepPurple, indigo } from '@mui/material/colors';

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();

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
              id="userid"
              label="User ID"
              name="userid"
              autoComplete="userid"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
      </Container>
      );
    
}

export default LoginForm;