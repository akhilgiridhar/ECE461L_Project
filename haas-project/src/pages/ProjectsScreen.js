import React, {useState} from "react";
import {Paper, Container, Grid, TextField, Button} from '@mui/material';
import Hardware from './Hardware.js';
import './ProjectsScreen.css';

export default function ProjectsScreen({children}){
    const [color, setColor] = useState('white')
    const [label, setLabel] = useState('Join')

    const handleChange = () => {
        const col = color === 'white' ? 'lightgray' : 'white';
        const lab = label === 'Join' ? 'Leave' : 'Join';
        setColor(col);
        setLabel(lab);
    }

    return(
        <Paper elevation={5} style={{ backgroundColor: color, width: '96.5vw', height: '10vw', marginTop: 20, textAlign: 'left', display: 'flex', alignItems: 'center'}}>
            <div style={{ marginRight: '100px' }}>
                <text style={{fontSize: '20px', fontWeight: 'bold', padding: '10px'}}>{children}</text>
            </div>
            <div style={{ marginRight: '100px' }}>
                <p>List of Users</p>
            </div>
            <div style={{flexDirection: 'column'}}>
                <Hardware>HW1: 50/100</Hardware>
                <Hardware>HW2: 0/100</Hardware>
            </div>
            <div style={{marginLeft: '50px'}}>
                <Button variant="contained" onClick={handleChange}>{label}</Button>
            </div>

        </Paper>
    );
}