import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SetPlayerForm from "./Game-Components/SetPlayerForm";

function WelcomeUser() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome User!</h1>
          <h2>Play against Computer</h2>
          <button>Play Game?</button>
          <h2>Play with a friend</h2>
          <button>
            <Link to="/newGame">Play Game?</Link>
          </button>
        </div>
      ) : (
        <div>
          <h1>Welcome!</h1>
          <h2>Play against Computer</h2>
          <button>Play Game?</button>
          <h2>Play with a friend</h2>
          <button>
            <Link to="/newGame">Play Game?</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default WelcomeUser;
