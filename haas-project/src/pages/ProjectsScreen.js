import React, { useState } from "react";
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

export default function ProjectsScreen({ children }) {
  const [color, setColor] = useState("white");
  const [label, setLabel] = useState("Join");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    var fetchURL;

    if (label == "Join") {
      e.preventDefault();
      fetchURL = "/joinProject" + children;
      fetch(fetchURL)
        .then((response) => response.text())
        //.then((data) => console.log(data))
        .then(function (data) {
          data = JSON.parse(data);

          if (data.code === 200) {
            setMessage(data.message);
          } else {
            setMessage(
              "response code: " +
                data.code +
                " and message recieved: " +
                data.error
            );
          }
        });
    } else {
      e.preventDefault();
      fetchURL = "/leaveProject/" + children;
      fetch(fetchURL)
        .then((response) => response.text())
        //.then((data) => console.log(data))
        .then(function (data) {
          data = JSON.parse(data);

          if (data.code === 200) {
            setMessage(data.message);
          } else {
            setMessage(
              "response code: " +
                data.code +
                " and message recieved: " +
                data.error
            );
          }
        });
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
          {children}
        </text>
      </div>
      <div style={{ marginRight: "100px" }}>
        <p>List of Users</p>
      </div>
      <div style={{ flexDirection: "column" }}>
        <Hardware>HW1: 50/100</Hardware>
        <Hardware>HW2: 0/100</Hardware>
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
