import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, cardsActions, clearCards } from "../../store/cards-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";
import "./GameSetup.css";
import "./Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GameBoard from "./GameBoard";
import { playersActions } from "../../store/player-slice";
import SetPlayerForm from "./SetPlayerForm";
import { Link } from "react-router-dom";
import InstructionModal from "./InstructionModal";

function GameSetup() {
  const cards = useSelector((state) => state.cardDeck.cardDeck);
  const players = useSelector((state) => state.players.players);
  const gameStatus = useSelector((state) => state.cardDeck.gameReady);
  const player1Cards = useSelector((state) => state.player1.cards);

  const player2Cards = useSelector((state) => state.player2.cards);

  const winner = useSelector((state) => state.players.winner);

  const dispatch = useDispatch();

  // State for Instruction Modal
  const [show, setShow] = useState(false);

  // Pull cards from API, assign cards to players in backend
  // updates state of "cards" to card table information from backend
  // const deal = async () => {
  //   // dispatch(clearCards());
  //   dispatch(fetchCards());
  // };

  const newGame = () => {
    dispatch(player1Actions.endGame());
    dispatch(player2Actions.endGame());
    dispatch(cardsActions.endGame());
    dispatch(playersActions.removeWinner());
    dispatch(playersActions.removePlayers());
    dispatch(clearCards());
  };

  // player 1 and 2 cards assigned and state updated
  useEffect(() => {
    if (cards.length > 0) {
      for (let card in cards[0]) {
        if (cards[0][card].player == 1) {
          dispatch(player1Actions.addCard(cards[0][card]));
        } else if (cards[0][card].player == 2) {
          dispatch(player2Actions.addCard(cards[0][card]));
        }
      }
    }
  }, [cards]);

  useEffect(() => {
    if (player1Cards.length > 0 && player2Cards.length > 0) {
      dispatch(cardsActions.startGame());
    } else {
      dispatch(cardsActions.endGame());
    }
  }, [player1Cards, player2Cards]);

  return (
    <>
      {gameStatus == true ? (
        <div className="outer-container">
          {/* ---- */}
          <div>
            <button onClick={() => setShow(true)}>Instructions</button>
            <InstructionModal onClose={() => setShow(false)} show={show} />
          </div>
          {/* ---- */}
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={newGame}
          >
            New Game
          </button>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={newGame}
          >
            <Link to="/">Leave Game</Link>
          </button>
          <GameBoard />
        </div>
      ) : (
        <div>
          <SetPlayerForm />
        </div>
      )}

      {winner.length > 0 && (
        <div>
          <h1>The winner is: {winner[0]}</h1>
        </div>
      )}
    </>
  );
}

export default GameSetup;
