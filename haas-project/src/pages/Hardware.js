import React from "react";
import {Paper, Container, Grid, TextField, Button} from '@mui/material';
import CheckInOut from "./CheckInOut";

export default function Hardware({children}){
    return(
        <div style={{flexDirection: 'column'}}>
            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <p>{children}</p>
                <CheckInOut></CheckInOut>
            </div>
        </div>
  );
}