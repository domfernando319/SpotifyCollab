import React, { Component } from 'react'
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import { BrowserRouter as Router, Routes, Link, Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import Room from './Room';
import {Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { useEffect, useState } from 'react';



export default function HomePage(props) {

  const [roomCode, setRoomCode] = useState(null)

  useEffect(() => {
    async function autoEnter() {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            })
    };
    autoEnter();
    
  },[]);

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          {/* Title */}
          <Typography variant="h3" compact="h3">
            SpotifyCollab
          </Typography>
          <Typography variant="body1">
            1. Create a listening room. Host must have Spotify Premium!
          </Typography>
          <Typography variant="body1">
            2. Share the Room Code
          </Typography>
          <Typography variant="body1">
            Happy Listening!
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color ="primary" to='/join' component={Link}>
              Join a Room
            </Button>
            <Button color ="secondary" to='/create' component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }

  function clearRoomCode() {
    setRoomCode(null)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          roomCode ? (<Navigate replace to={`/room/${roomCode}`}/>) : renderHomePage()
        }
        />
    

        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route 
          path="/room/:roomCode" 
          element={<Room leaveRoomCallback={clearRoomCode}/>}
        />
      </Routes>
    </Router>
  )
}