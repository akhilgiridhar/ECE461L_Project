import React from "react";
import {Paper, Container, Grid, TextField, Button} from '@mui/material';

export default function CheckInOut(){
    return( 
        <Grid>
            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <TextField label="Check In" type="number" InputLabelProps={{ shrink: true,}} style={{marginBottom: 10}}/>
                <TextField label="Check Out" type="number" InputLabelProps={{ shrink: true,}} style={{marginBottom: 10}}/>
                <Button variant="contained" color="success" size="medium" style={{marginRight: 10}}>
                    Modify Items
                </Button>
            </div>
        </Grid>
    );
}
