import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {Grid, Button, Typography} from '@material-ui/core';

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();
  const { roomCode } = useParams();

  useEffect(() => {
    getRoomDetails() //call getRoom Details when roomCode changes
  }, [roomCode]);
  // You can define functions within components like so
  function getRoomDetails() {
    fetch('/api/get-room' + '?code=' + roomCode)
        .then((r) => {
          if (!r.ok) {
            props.leaveRoomCallback();
            navigate('/')
          }
          return r.json()
        })
        // .then((data) => {
        //     setVotesToSkip(data.votes_to_skip)
        //     setGuestCanPause(data.guest_can_pause)
        //     setIsHost(data.is_host)
        // })
        // .catch((error) => {
        //     console.error('Error fetching room details:', error)
        // })
  }

  function leaveButtonClick() {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': "application/json"},

    }
    fetch('/api/leave-room', requestOptions)
      .then((response) => {
        props.leaveRoomCallback();
        navigate('/')
        response.json()
      })
  }

  return (

    <Grid container spacing ={1}>
      <Grid item xs={12} align='center'>
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant="h6" component="h6">
          Votes to Skip: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant="h6" component="h6">
          Guest can Pause: {guestCanPause ? 'Yes' : 'No'}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography variant="h6" component="h6">
          Host: {isHost ? 'Yes' : 'No'}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button variant="contained" color='secondary' onClick={leaveButtonClick}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
    // <div>
    //   <h3>{roomCode}</h3>
    //   <p>Votes to Skip: {votesToSkip}</p>
    //   <p>Guest can Pause: {guestCanPause ? 'Yes' : 'No'}</p>
    //   <p>Host: {isHost ? 'Yes' : 'No'}</p>
    // </div>
  );
}

export default Room;
