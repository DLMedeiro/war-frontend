import React, { useEffect, useState } from "react";
import WarApi from "../../warApi";

import PlayerBoard from "./PlayerBoard";
import CenterBoard from "./CenterBoard";
import PlayerCountForm from "./PlayerCountForm";
// import CardsApi from "../../cardsApi";
import SkyjoApi from "../../skyjoApi";
import GameSetup from "./GameSetup";
import Scores from "./Scores";

import "./Main.css";

function Main({ p1, p2, p1Board, p2Board, gId, p1Score, p2Score }) {
  // console.log(p1);

  const [player1, setPlayer1] = useState(p1);
  const [player2, setPlayer2] = useState(p2);

  const [player1Board, setPlayer1Board] = useState(p1Board);
  const [player2Board, setPlayer2Board] = useState(p2Board);

  const [gameId, setGameId] = useState(gId);

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(p2Score);

  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);

  const [drawCards, setDrawCards] = useState([]);
  const [discardCards, setDiscardCards] = useState([]);

  const [cards, setCards] = useState([]);

  // const [currentPlayer, setCurrentPlayer] = useState(p1);

  // const addPlayers = (player) => {
  //   let players = Object.values(player);
  //   console.log(players);
  //   setPlayer1(players[0]);
  //   setPlayer2(players[1]);
  //   // Creates an array holding each player's name

  //   start();
  // };

  // console.log(currentPlayer);
  // async function start() {
  //   const board_req = await SkyjoApi.startGame(player1, player2);
  //   console.log(board_req);
  //   setPlayer1Board(board_req[0].board_id);
  //   setPlayer1Score(board_req[0].score);
  //   setPlayer2Board(board_req[1].board_id);
  //   setPlayer2Score(board_req[1].score);
  //   setGameId(board_req[0].game_id);
  // }
  let cardLocationInfo = { player1Board, player2Board, gameId };

  async function dealCards() {
    // console.log(player1Board, player2Board, gameId);

    const cardTable = await WarApi.getCards();
    if (cardTable) {
      setCards(cardTable);
    } else {
      setCards([]);
    }
  }
  // console.log(cards);

  useEffect(() => {
    if (cards.length > 0) {
      for (let card in cards) {
        if (cards[card].card_location[0] == "discardPile") {
          // console.log(cards[card]);
          setDiscardCards((discardCards) => [...discardCards, cards[card]]);
        }
        if (cards[card].card_location[0] == "drawPile") {
          setDrawCards((drawCards) => [...drawCards, cards[card]]);
        }
        if (cards[card].board_id == player1Board) {
          setPlayer1Cards((player1Cards) => [...player1Cards, cards[card]]);
        }
        if (cards[card].board_id == player2Board) {
          setPlayer2Cards((player2Cards) => [...player2Cards, cards[card]]);
        }
      }
    }
  }, [cards]);
  // setCards(true);
  // setPlayer2Cards()

  // useEffect(() => {
  //   console.log(player1Score);
  //   async function updateScore() {
  //     if (player1Cards.length > 0) {
  //       let score = player1Score;
  //       for (let card in player1Cards) {
  //         if (player1Cards[card].face_up == true) {
  //           score += player1Cards[card].game_value;
  //           setPlayer1Score(score);
  //           // console.log(player1Cards[card].board_id, score);
  //           const test = await SkyjoApi.updateScore(
  //             player1Cards[card].board_id,
  //             score
  //           );
  //           console.log(test);
  //         }
  //       }
  //     }
  //   }
  //   updateScore();
  // }, [player1Cards]);

  // useEffect(() => {
  //   async function updateScore() {
  //     if (player2Cards.length > 0) {
  //       let score = player2Score;
  //       for (let card in player2Cards) {
  //         if (player2Cards[card].face_up == true) {
  //           score += player2Cards[card].game_value;
  //           setPlayer2Score(score);
  //           const test = await SkyjoApi.updateScore(
  //             card.board_id,
  //             card.id,
  //             score
  //           );
  //           // console.log(test);
  //         }
  //       }
  //     }
  //   }
  //   updateScore();
  // }, [player2Cards]);

  // async function newGame() {
  //   setGameId(null);
  //   setPlayer1Score(0);
  //   await SkyjoApi.reset();
  // }
  // console.log(gameId);
  // console.log(player2Cards);

  // const flipCard = async (board_id, card_id, player) => {
  //   let updatedPlayerCards = await SkyjoApi.flipBoardCard(board_id, card_id);
  //   // console.log(updatedPlayerCards);
  //   if (player === player1) {
  //     setPlayer1Cards(updatedPlayerCards);
  //   }
  //   if (player === player2) {
  //     setPlayer2Cards(updatedPlayerCards);
  //   }
  // };

  return <></>;
}

export default Main;
