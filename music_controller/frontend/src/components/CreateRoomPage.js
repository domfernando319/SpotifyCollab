// import React, { Component } from 'react'
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import { Link } from "react-router-dom";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";


// export default class CreateRoomPage extends Component {
//     defaultVotes = 2;
//     constructor(props) {
//         super(props);
//         this.state = {
//           guest_can_pause: true,
//           votes_to_skip: this.defaultVotes,
//         }
//         this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this)
//         this.handleGuestCanPauseChanged = this.handleGuestCanPauseChanged.bind(this)
//         this.handleVotesChanged = this.handleVotesChanged.bind(this)
//     }
//     handleVotesChanged(e) {
//       this.setState({
//         votes_to_skip: e.target.value,
//       })
//     }

//     handleGuestCanPauseChanged(e) {
//       this.setState({
//         guest_can_pause: e.target.value === 'true' ? true : false,
//       })
//     }

//     handleRoomButtonPressed() {
//       const requestOptions = {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           votes_to_skip: this.state.votes_to_skip,
//           guest_can_pause: this.state.guest_can_pause,
//         }),
//       };
//       fetch('/api/create-room', requestOptions)
//         .then((response) => response.json())
//         .then((data) => console.log(data));
//     }
//   render() {
//     return (
//       // main container for page
//       <Grid container spacing={1}>
//         {/* Title */}
//         <Grid item xs={12} align="center">
//           <Typography component='h4' variant='h4'>
//             Create a room
//           </Typography>
//         </Grid>
//         {/* radio buttons */}
//         <Grid item xs={12} align="center">
//           <FormControl component="fieldset">

//             <FormHelperText>
//               <div align="center">
//                 Guest Control of Playback state
//               </div>
//             </FormHelperText>

//             <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChanged}>
//               <FormControlLabel 
//                 value ="true" 
//                 control={<Radio color="primary"/>}
//                 label = "Play/Pause"
//                 labelPlacement='bottom'
//               />
//               <FormControlLabel 
//                 value ="false" 
//                 control={<Radio color="secondary"/>}
//                 label = "No Control"
//                 labelPlacement='bottom'
//               />
//             </RadioGroup>
//           </FormControl>

//         </Grid>

//         <Grid item xs={12} align="center">
//           <FormControl>
//             <TextField 
//               required={true} 
//               type="number"
//               onChange={this.handleVotesChanged}
//               defaultValue={this.defaultVotes}
//               inputProps={{
//                 min: 1,
//                 style: {textAlign: "center"}
//               }}
//             />
//             <FormHelperText>
//               <div align="center">
//                 Votes Required to Skip Song
//               </div>
//             </FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
//             Create a Room
//           </Button>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button color="secondary" variant="contained" to="/" component={Link}>
//               Back
//           </Button>
//         </Grid>
//       </Grid>
//     )
//   }
// }
import React, { useState } from 'react';
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

function CreateRoomPage(props) {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

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
      .then((data) => this.props.history.push('/room/' + data.code));
  };

  return (
    <Grid container spacing={1}>
      {/* Title */}
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          Create a room
        </Typography>
      </Grid>
      {/* ... other components ... */}
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
  );
}

export default CreateRoomPage;
