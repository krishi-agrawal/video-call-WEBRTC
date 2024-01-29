import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "./Lobby.css";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  return(
    <div className="form">
    <div className="title">Welcome</div>
    <div className="subtitle">Join a Room!</div>
    <div className="input-container ic1">
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" type="email" placeholder=" " />
      <div className="cut"></div>
      <label htmlFor="email" className="placeholder">Email</label>
    </div>
    <div className="input-container ic2">
      <input id="room" value={room} onChange={(e) => setRoom(e.target.value)}  className="input" type="text" placeholder=" " />
      <div className="cut cut-short"></div>
      <label htmlFor="room" className="placeholder">Room</label>
    </div>
    <button type="text" className="submit" onClick={handleSubmitForm}>submit</button>
  </div>
  )
};

export default LobbyScreen;
