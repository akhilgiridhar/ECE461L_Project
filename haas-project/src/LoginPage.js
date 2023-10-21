import React from "react";
import {Paper, Container, Grid, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const isAuthenticated = true;

        if (isAuthenticated) {
        navigate('/projects');
        }
    };
    
    return (
        <div>
          <h1>Login Page</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      );
    
}

export default LoginForm;