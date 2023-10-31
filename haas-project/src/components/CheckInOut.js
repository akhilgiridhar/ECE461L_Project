import React from "react";
import { useState } from "react";
import { Paper, Container, Grid, TextField, Button } from "@mui/material";
import Modal from "react-modal";

function CheckInOut() {
  const [qty, setQty] = useState("");
  const [message, setMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleCheckin = (e) => {
    e.preventDefault();
    var fetchURL = "/checkin?projectid={p123}&qty=" + qty;
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

    setIsModalOpen(true);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    var fetchURL = "/checkout?projectid={p123}&qty=" + qty;
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

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <TextField
          type="number"
          onChange={handleQty}
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: 10 }}
        />
        <Button
          onClick={handleCheckin}
          variant="contained"
          color="success"
          size="medium"
          style={{ marginRight: 10 }}
        >
          Check In
        </Button>
        <Button
          onClick={handleCheckout}
          variant="contained"
          color="success"
          size="medium"
          style={{ marginRight: 10 }}
        >
          Check Out
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Form Submission Result"
      >
        <h2>{message}</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </Grid>
  );
}

export default CheckInOut;
