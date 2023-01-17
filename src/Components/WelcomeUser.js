import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { playersActions } from "../store/player-slice";

function WelcomeUser() {
  const dispatch = useDispatch();

  const setComputer = () => {
    dispatch(playersActions.addPlayer({ player1: "Computer" }));
  };

  const resetPlayers = () => {
    dispatch(playersActions.removePlayers());
  };

  return (
    <>
      <Link
        id="btn-main"
        role="button"
        className="btn btn-lg btn-block"
        to="/newGame"
        onClick={setComputer}
      >
        Play against a Computer
      </Link>
      <Link
        id="btn-main"
        role="button"
        className="btn btn-lg btn-block"
        to="/newGame"
        onClick={resetPlayers}
      >
        Play with a friend
      </Link>
    </>
  );
}

export default WelcomeUser;
