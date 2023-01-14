import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SetPlayerForm from "./Game-Components/SetPlayerForm";
import "./NavBar.css";

function WelcomeUser() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Link
        id="btn-main"
        role="button"
        className="btn btn-lg btn-block"
        to="/newGame"
      >
        Play against a Computer
      </Link>
      <Link
        id="btn-main"
        role="button"
        className="btn btn-lg btn-block"
        to="/newGame"
      >
        Play with a friend
      </Link>
    </>
  );
}

export default WelcomeUser;
