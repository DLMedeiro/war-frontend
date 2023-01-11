import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SetPlayerForm from "./Game-Components/SetPlayerForm";

function WelcomeUser() {
  const players = useSelector((state) => state.players.players);
  console.log(players);
  return (
    <div>
      <h1>Welcome User!</h1>
      <h2>Play against Computer</h2>
      <button>Play Game?</button>
      <h2>Play with a friend</h2>
      <button>
        <Link to="/newGame">Play Game?</Link>
      </button>
    </div>
  );
}

export default WelcomeUser;
