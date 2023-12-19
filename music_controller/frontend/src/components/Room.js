import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Room() {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const { roomCode } = useParams();

  useEffect(() => {
    getRoomDetails() //call getRO=oom Details when roomCode changes
  }, [roomCode]);

  // You can define functions within components like so
  function getRoomDetails() {
    fetch('/api/get-room' + '?code=' + roomCode)
        .then((r) => {return r.json()})
        .then((data) => {
            setVotesToSkip(data.votes_to_skip)
            setGuestCanPause(data.guest_can_pause)
            setIsHost(data.is_host)
        })
        .catch((error) => {
            console.error('Error fetching room details:', error)
        })
  }

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes to Skip: {votesToSkip}</p>
      <p>Guest can Pause: {guestCanPause ? 'Yes' : 'No'}</p>
      <p>Host: {isHost ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default Room;
