import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from '@material-ui/core';

function CreateRoomPage(props) {

  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip);
  const [updateFlag, setUpdateFlag] = useState(props.update);
  
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { roomCode } = useParams();
  const navigate = useNavigate();
  const pageTitle = props.update ? "Update Room Settings" : "Create a Room";

  const handleVotesChanged = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChanged = (e) => {
    setGuestCanPause(e.target.value === 'true' ? true : false);
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/' + data.code))
      .catch((err) => console.error('Error creating room:', err));
  };

  function handleUpdateButtonPressed() {
    const requestOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode
      }),
    };
    fetch('/api/update-room', requestOptions)
      .then((response) => {
        if (response.ok) {
            setSuccessMsg("Room updated successfully!")            
            // // navigate to the new updated room endpoint
            // navigate('/room/' + roomCode)
        } else {
            setErrMsg("Error updating room...")
        }
        return response.json()
      })
      .then((data) => {
        setGuestCanPause(data.guest_can_pause)
        setVotesToSkip(data.votes_to_skip)

      })
  }

  function renderCreateButtons() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
            Create a Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>  
    )
  }

  function renderUpdateButtons() {
    return (
      <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>
            Update
          </Button>
        </Grid>
    )
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errMsg != "" || successMsg != ""}>
          {successMsg}
        </Collapse>
      </Grid>
      {/* Title */}
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          {pageTitle}
        </Typography>
      </Grid>
      {/* radio buttons */}
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">

          <FormHelperText>
            <div align="center">
              Guest Control of Playback state
            </div>
          </FormHelperText>

          <RadioGroup row defaultValue={guestCanPause.toString()} onChange={handleGuestCanPauseChanged}>
            <FormControlLabel 
              value ="true" 
              control={<Radio color="primary"/>}
              label = "Play/Pause"
              labelPlacement='bottom'
            />
            <FormControlLabel 
              value ="false" 
              control={<Radio color="secondary"/>}
              label = "No Control"
              labelPlacement='bottom'
            />
          </RadioGroup>
        </FormControl>

      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField 
            required={true} 
            type="number"
            onChange={handleVotesChanged}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: {textAlign: "center"}
            }}
          />
          <FormHelperText>
            <div align="center">
              Votes Required to Skip Song
            </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {updateFlag ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
}

CreateRoomPage.defaultProps = {
  votesToSkip : 2,
  guestCanPause : true,
  update : false,
  roomCode: null,
  updateCallBack: () =>{}
}

export default CreateRoomPage;
