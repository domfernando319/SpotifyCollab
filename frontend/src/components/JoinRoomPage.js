import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';



export default function JoinRoomPage() {

  let [roomCode, setRoomCode] = useState("")
  let [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  function handleTextFieldChange(e) {
    setRoomCode(e.target.value)
  }

  function handleRoomButtonClick() {
    const requestOptions = {
       method: 'POST',
       headers: {"Content-Type":"application/json"},
       body: JSON.stringify({
        code:roomCode
       })
    };
    fetch('api/join-room', requestOptions)
      .then((res) => {
        if (res.ok) {
          navigate(`/room/${roomCode}`)
        } else {
          setErrorMessage('Room Not Found!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component ="h4">Join a Room</Typography> 
      </Grid> 
      <Grid item xs={12} align="center">
        <TextField
          error={errorMessage}
          label="Code"
          placeholder="Enter a Room Code"
          value ={roomCode}
          helperText={errorMessage}
          variant="outlined"
          onChange={handleTextFieldChange}
          />
      </Grid> 
      <Grid item xs={12} align="center">
        <Button variant="contained" color ="primary" to="/" onClick ={handleRoomButtonClick}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color ="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>

    </Grid>
  )
}