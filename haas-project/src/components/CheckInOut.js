import React, { useContext, useState } from "react";
import { Box, Grid, TextField, Button, Modal} from "@mui/material";

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

function CheckInOut({ name, joined, projectid, setQauntity, amount}) {
  const [qty, setQty] = useState(amount);
  const [message, setMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleCheckin = (e) => {
    e.preventDefault();
    console.log(e)
    var fetchURL =`/checkin?projectid=${projectid}&qty=${qty}&name=${name}`;
    fetch(fetchURL)
      .then((response) => response.text())
      //.then((data) => console.log(data))
      .then(function (data) {
        data = JSON.parse(data);

        if (data.code === 200) {
          setMessage(data.message);
          if(data.checkedin){
            console.log("reached reload")
            setQauntity();
          }
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
    var fetchURL = `/checkout?projectid=${projectid}&qty=${qty}&name=${name}`;
    fetch(fetchURL)
      .then((response) => response.text())
      //.then((data) => console.log(data))
      .then(function (data) {
        data = JSON.parse(data);

        if (data.code === 200) {
          setMessage(data.message);
          if(data.checkedout){
            console.log("reached reload")
            setQauntity();
          }
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
          disabled={!joined}
          inputProps={{min:'0', step:'any'}}
        />
        <Button
          onClick={handleCheckin}
          variant="contained"
          color="success"
          size="medium"
          style={{ marginRight: 10 }}
          disabled={!joined}
        >
          Check In
        </Button>
        <Button
          onClick={handleCheckout}
          variant="contained"
          color="success"
          size="medium"
          style={{ marginRight: 10 }}
          disabled={!joined}
        >
          Check Out
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
    </Grid>
  );
}

export default CheckInOut;
