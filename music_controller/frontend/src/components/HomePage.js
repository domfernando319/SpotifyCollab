import React, { Component } from 'react'
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage';
import { BrowserRouter as Router, Routes, Link, Route, Redirect } from "react-router-dom";
import Room from './Room';

export default function HomePage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>This is the home page</p>} />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  )
}