import React, { useState, useEffect } from "react";
import { Paper, Container, Grid, TextField, Button } from '@mui/material';
import CheckInOut from "./CheckInOut";

export default function Hardware({ name, qty, projectid, joined, setQty, reload }) {
    return (
        <div style={{ flexDirection: 'column' }}>
            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p>{name} {qty}</p>
                <CheckInOut joined={joined} projectid={projectid} setQauntity={reload} amt={qty} name={name}></CheckInOut>
            </div>
        </div>
    );
}