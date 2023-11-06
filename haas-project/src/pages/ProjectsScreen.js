import React, { useEffect, useState } from "react";
import { Paper, Container, Grid, TextField, Button } from "@mui/material";
import Hardware from "../components/Hardware.js";
import "./ProjectsScreen.css";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

export default function ProjectsScreen({projectid, name, qty1, qty2, joined, users, userid}) {
  const [join, setJoined] = useState(joined);
  const [color, setColor] = useState(join ? "lightgray" : "white");
  const [label, setLabel] = useState(join ? "Leave" : "Join");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersArr, setUsers] = useState(users);
  const [currqty1, setQty1] = useState(qty1);
  const [currqty2, setQty2] = useState(qty2);

  useEffect(()=>{console.log("changed1")}, [currqty1]);
  useEffect(()=>{console.log("changed2")}, [currqty2]);

  const handleChange = (e) => {
    var fetchURL;

    if (label == "Join") {
      e.preventDefault();
      fetchURL = "/joinProject?projectid=" + projectid + "&username=" + userid;
      fetch(fetchURL)
        .then((response) => response.text())
        //.then((data) => console.log(data))
        .then(function (data) {
          data = JSON.parse(data);

          if (data.code === 200) {
            setMessage(data.message);
            setUsers(data.users);
          } else {
            setMessage(
              "response code: " +
                data.code +
                " and message recieved: " +
                data.error
            );
          }
        });
        setJoined(true);
    } else {
      e.preventDefault();
      fetchURL = "/leaveProject?projectid=" + projectid + "&username=" + userid;
      fetch(fetchURL)
        .then((response) => response.text())
        //.then((data) => console.log(data))
        .then(function (data) {
          data = JSON.parse(data);

          if (data.code === 200) {
            setMessage(data.message);
            setUsers(data.users)
          } else {
            setMessage(
              "response code: " +
                data.code +
                " and message recieved: " +
                data.error
            );
          }
        });
        setJoined(false);
    }
    
    const col = color === "white" ? "lightgray" : "white";
    const lab = label === "Join" ? "Leave" : "Join";
    setColor(col);
    setLabel(lab);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const displayUsers = () => {
    if (!usersArr) return null;
  
    return (
      <ul>
        {usersArr.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    );
  };

  return (
    <Paper
      elevation={5}
      style={{
        backgroundColor: color,
        width: "96.5vw",
        height: "10vw",
        marginTop: 20,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "100px" }}>
        <text style={{ fontSize: "20px", fontWeight: "bold", padding: "10px" }}>
          {name}
        </text>
      </div>
      <div style={{ marginRight: "100px" }}>
        {displayUsers()}
      </div>
      <div style={{ flexDirection: "column" }}>
        {console.log("projectScreen")}
        {console.log(typeof setQty1)}
        <Hardware name={"HW1"} qty={currqty1} projectid={projectid} joined={join} setQty={setQty1}></Hardware>
        <Hardware name={"HW2"} qty={currqty2} projectid={projectid} joined={join} setQty={setQty2}></Hardware>
      </div>
      <div style={{ marginLeft: "50px" }}>
        <Button variant="contained" onClick={handleChange}>
          {label}
        </Button>
      </div>
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
    </Paper>
  );
}
