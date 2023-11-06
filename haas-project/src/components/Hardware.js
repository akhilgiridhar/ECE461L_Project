import React, { useState } from "react";
import {Paper, Container, Grid, TextField, Button} from '@mui/material';
import CheckInOut from "./CheckInOut";

export default function Hardware({ name, qty, projectid, joined, setQty}){
    const [amount, setAmount] = useState(qty);

    const handleDataFromCheckInOut = (data) => {
        setAmount(data);
    }

    const updateAmt = (qty) => {
        setAmount(parseInt(amount) + parseInt(qty));
    }

    return(
        <div style={{flexDirection: 'column'}}>
            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <p>{name} {amount}</p>
                <CheckInOut joined={joined} projectid={projectid} sendDataToHardware={handleDataFromCheckInOut} setQauntity={updateAmt} amt = {amount}></CheckInOut>
            </div>
        </div>
  );
}