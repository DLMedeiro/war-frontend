import "./App.css";
// import UserContext from "./Components/UserContext";
import React from "react";
import { useSelector } from "react-redux";
// import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
// import SkyjoApi from "./skyjoApi.js";
// import CardsApi from "./cardsApi";
import NavBar from "./Components/Navbar";
import PlayerCountForm from "./Components/Game-Components/PlayerCountForm";
// import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
// import NewAccount from "./Components/NewAccount";
// import Main from "./Components/Game-Components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import GameSetup from "./Components/Game-Components/GameSetup";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const players = useSelector((state) => state.players.players);
  console.log(players);
  // const [currentPlayer, setCurrentPlayer] = useState({});
  // const [token, setToken] = useState({});
  // const [playerCards, setPlayerCards] = useState({});
  // const [deckId, setDeckId] = useState("");

  // Login function
  // async function login(data, username) {
  //   let res = await SkyjoApi.loginPlayer(data);
  //   if (res) {
  //     // player variable not getting response
  //     let player = await SkyjoApi.loggedInPlayer(username);
  //     setToken(res);
  //     localStorage.setItem("player", JSON.stringify(player));
  //     localStorage.setItem("token", JSON.stringify(res));
  //   }
  // }
  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("player"))) {
  //     setCurrentPlayer(JSON.parse(localStorage.getItem("player")));
  //   }
  // }, [token]);

  // async function registerNewPlayer(data) {
  //   let newPlayerToken = await SkyjoApi.registerPlayer(data);
  //   if (newPlayerToken) {
  //     let newPlayer = {
  //       username: data.username,
  //       password: data.password,
  //     };
  //     login(newPlayer, data.username);
  //   }
  // }

  // async function logout() {
  //   localStorage.clear();
  //   setCurrentPlayer({});
  // }

  // async function pullDeckId() {
  //   let res = await CardsApi.getDeckId();
  //   // localStorage.setItem("deckId", JSON.stringify(res));
  //   return res;
  // }
  // async function buildPlayerHand(deckId) {
  //   let res = await CardsApi.getPlayerCards(deckId);
  //   // console.log(res.cards);
  //   return res.cards;
  // }

  return (
    <div className="App">
      {isLoggedIn && players.length === 0 && (
        <div>
          <NavBar />
          <PlayerCountForm />
        </div>
      )}
      {!isLoggedIn && <LoginForm />}
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
