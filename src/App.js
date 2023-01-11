import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navbar";

import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
import Instructions from "./Components/Instructions";
import SetPlayerForm from "./Components/Game-Components/SetPlayerForm";

import "bootstrap/dist/css/bootstrap.min.css";

import GameSetup from "./Components/Game-Components/GameSetup";
import WelcomeUser from "./Components/WelcomeUser";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const players = useSelector((state) => state.players.players);

  return (
    <div className="App">
      <NavBar />
      {/* <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/instructions" element={<Instructions />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/newGame" element={<SetPlayerForm />}></Route>
      </Routes> */}
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<WelcomeUser />}></Route>
          <Route path="/instructions" element={<Instructions />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/newGame" element={<SetPlayerForm />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/instructions" element={<Instructions />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/newGame" element={<SetPlayerForm />}></Route>
        </Routes>
      )}

      {/* {isLoggedIn && players.length === 0 && (
        <div>
          <WelcomeUser />
        </div>
      )} */}
      {players.length > 0 && <GameSetup />}
    </div>
  );
}

export default App;

// Start Game
//  - (input) Enter player usernames in form
//  - Click button "let's play" to execute
//  - Returns game_id for dealing cards

// Deal Game
//  - (input) pulls game_id from Start Game
//  - Click button "Deal Cards" to execute
//  - Returns card table object to execute card visuals and placement

// check_game_start -> used to identify start of game moves vs regular play
//  - use card table object to check the number of cards with face_up set to true
//  - if < 2: players both flip cards (returns score), player turn set to null
// if = 2: set player turn to highest score

// (if player turn us not null) Draw Card
// set current card to selected card object (all table details)

// based on selected card card_location
//  - DrawPile - discard and replace functions available
//  - If discard is chosen, next function available is flip_card
//  - DiscardPile - replace function available

// replace function
// - Takes in drawn card_id. board_id and selected placement location

// Identify when turn is over and update current player

// update score (get current score)
// activate when current player changes
// returns board_ids and scores
// update state

// Check for game win
//  - use card table object to check the number of cards with face_up set to true
//  - if = 12  -> *other player gets one more turn -> game over
//  - assign_winner(game_id, player_id)
//  - update_score and graphics
