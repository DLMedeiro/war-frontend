import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, cardsActions, clearCards } from "../../store/cards-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";
import "./GameSetup.css";
import "./Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GameBoard from "./GameBoard";
import { playersActions } from "../../store/player-slice";
import WarApi from "../../warApi";

function GameSetup() {
  const cards = useSelector((state) => state.cardDeck.cardDeck);
  const players = useSelector((state) => state.players.players);
  const gameStatus = useSelector((state) => state.cardDeck.gameReady);
  const player1Cards = useSelector((state) => state.player1.cards);

  const player2Cards = useSelector((state) => state.player2.cards);

  const winner = useSelector((state) => state.players.winner);

  const dispatch = useDispatch();

  // Pull cards from API, assign cards to players in backend
  // updates state of "cards" to card table information from backend
  const deal = async () => {
    dispatch(fetchCards());
  };

  const newGame = () => {
    dispatch(playersActions.removePlayers());
    dispatch(player1Actions.endGame());
    dispatch(player2Actions.endGame());
    dispatch(cardsActions.endGame());
    dispatch(playersActions.removeWinner());
  };

  // const clearCards = async () => {
  //   console.log("screen should change");
  //   dispatch(cardsActions.endGame());
  //   dispatch(clearCards());
  // };

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
    // else {

    // }
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
        <div>
          <GameBoard />
          <button onClick={newGame}>New Game</button>
        </div>
      ) : (
        <div>
          {winner.length > 0 ? (
            <h1 className="deal">The winner is: {winner[0]}</h1>
          ) : (
            <button className="deal" onClick={deal}>
              Deal
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default GameSetup;
