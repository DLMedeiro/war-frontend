import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../../store/player-slice";
import { selectAllCards } from "../../store/cards-slice";
import { fetchCards } from "../../store/cards-slice";
import WarApi from "../../warApi";
import Card from "./Card";

import PlayerBoard from "./PlayerBoard";
import CenterBoard from "./CenterBoard";
import PlayerCountForm from "./PlayerCountForm";
import SkyjoApi from "../../skyjoApi";
import Main from "./Main";

import "./Main.css";

function GameSetup() {
  const players = useSelector((state) => state.players.players);
  const cards = useSelector((state) => state.cardDeck.cardDeck);
  // const [cards, setCards] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCards());
  // }, []);

  const removePlayers = () => {
    dispatch(playersActions.removePlayers());
  };

  console.log(cards);
  // useEffect(() => {
  //   async function getId() {
  //     if (playersReady) {
  // let id = await CardsApi.getDeckId();
  // setDeckId(id);
  // console.log(players[0]);
  // console.log(players[1]);
  // let res1 = await CardsApi.getPlayerCards(deckId);
  // let res2 = await CardsApi.getPlayerCards(deckId);
  // setPlayerHand([[{ [player1]: "test" }], [{ [player2]: "test" }]]);
  //     }
  //   }
  //   getId();
  // }, [playersReady]);

  // useEffect(() => {
  //   async function setupCards() {
  //     if (cards.length > 0) {
  //       WarApi.removeCards();
  //       setCards([]);
  //     }
  //   }
  //   setupCards();
  // }, []);

  const deal = () => {
    // let cards = await WarApi.getCards();
    console.log(cards);
    // setCards(cards);
  };

  // const [player1, setPlayer1] = useState("");
  // const [player2, setPlayer2] = useState("");

  // const [player1Board, setPlayer1Board] = useState("");
  // const [player2Board, setPlayer2Board] = useState("");

  // const [gameId, setGameId] = useState(null);

  // const [player1Score, setPlayer1Score] = useState("");
  // const [player2Score, setPlayer2Score] = useState("");

  // const [player1Cards, setPlayer1Cards] = useState([]);
  // const [player2Cards, setPlayer2Cards] = useState([]);

  // const [drawCards, setDrawCards] = useState([]);
  // const [discardCards, setDiscardCards] = useState([]);

  // const [currentPlayer, setCurrentPlayer] = useState(player1);

  // const addPlayers = (player) => {
  //   let players = Object.values(player);
  //   // console.log(players);
  //   setPlayer1(players[0]);
  //   setPlayer2(players[1]);
  //   // Creates an array holding each player's name

  //   start();
  // };

  // console.log(currentPlayer);
  // async function start() {
  //   const board_req = await SkyjoApi.startGame(player1, player2);
  //   // console.log(board_req);
  //   setPlayer1Board(board_req[0].board_id);
  //   setPlayer1Score(board_req[0].score);
  //   setPlayer2Board(board_req[1].board_id);
  //   setPlayer2Score(board_req[1].score);
  //   setGameId(board_req[0].game_id);
  // }

  //   async function dealCards() {
  //     // console.log(player1Board, player2Board, gameId);
  //     let cardLocationInfo = { player1Board, player2Board, gameId };
  //     const cardTable = await SkyjoApi.deal(cardLocationInfo);
  //     console.log(cardTable);
  //     for (let card in cardTable) {
  //       if (cardTable[card].card_location[0] === "discardPile") {
  //         setDiscardCards((cards) => [...cards, cardTable[card]]);
  //       }
  //       if (cardTable[card].card_location[0] === "drawPile") {
  //         setDrawCards((cards) => [...cards, cardTable[card]]);
  //       }
  //       if (cardTable[card].board_id === player1Board) {
  //         setPlayer1Cards((cards) => [...cards, cardTable[card]]);
  //       }
  //       if (cardTable[card].board_id === player2Board) {
  //         setPlayer2Cards((cards) => [...cards, cardTable[card]]);
  //       }
  //     }
  //     // setCards(true);
  //     // setPlayer2Cards()
  //   }
  //   console.log(player1Cards);

  //   async function newGame() {
  //     await SkyjoApi.reset();
  //     setGameId(null);
  //   }
  //   console.log(gameId);

  async function startGame(player1_id, player2_id) {
    // let cardTable = SkyjoAPI.start_game(player1_id, player2_id)
    // With cardTable Set state for player1 cards, player2 cards, drawPile, discardPile
    // startOfGameMoves()
  }
  const startOfGameMoves = () => {
    // If currentPlayer id null
    //    if player's board has 0 cards face up
    //        Available functions: flipCard
    //    if a player's board has 1 card face up
    //        Available functions: flipCard
    //    if a player's board has 2 cards face up
    //        Compare player's scores
    //        set current player to player with highest score
    //        gamePlayMoves()
    //          if scores are tied - come back to***
    //              Available functions: flipCard
  };

  async function flipCard(game_id, player_id, board_id, card_id) {
    // let playerCards = SkyjoAPI.flipBoardCard(game_id, player_id, board_id, card_id)
    // used only on player board
    // Output: player_id cards
    // update state of player_id cards
    // update_score(based on state of player_id cards)
    // score update on backend done with player cards are pulled
    //  if currentPlayer is null
    //      startOfGameMove()
    //  if currentPlayer is not null
    //      set currentPlayer to next player
    //      gamePlayMoves()
  }
  async function drawCard(card_id, location = "") {
    // set selectedCard
    // remove card from drawPile
    // SkyjoApi.drawCard(card_id, location)
    // returns new drawPile -> update state
  }
  async function discardCard(card_id, location = "discard") {
    // Card moving to discard
    // Inputs: selectedCardId, location
    // Output: update discardPileCards
    // SkyjoApi.discardCard(card_id, location)
    // returns new discardPile -> set state to new discardPile
    // Clear selectedCard
    // Direct user to flipCard function
  }
  async function replaceCard(
    card_id,
    replacement_card_id,
    board_id,
    new_location
  ) {
    // Card moving from draw to player board, and replaced card moving to discard.  Score update on completion
    // Inputs:
    //    card_id: selectedCardId in state
    //    replacement_card_id: Card selected on player's board
    //    board_id: player's board
    //    new_location: location of replacement_card_id
    // SkyjoApi.replaceCard(card_id, board_id, location)
    // Returns updated player cards -> update state of player's cards
    // update_score(based on state of player_id cards)
    // discardCard(replacement_card_id) -> moves replaced card to discard pile
    // Clear selectedCard
    // set currentPlayer to next player
    // gamePlayMoves()
  }
  const updateScore = (playerTurn_output) => {
    // update score in state
    // based on game_value and face_up = true on player board
  };

  const gamePlayMoves = () => {
    // if currentPlayer is not null
    //    Available functions: drawCard
    // if selectedCard is not null
    //        Available functions: discardCard, replaceCard
    //            if discardCard
    //                Available functions after discardCard: flipCard
    //                    Available functions after flipCard: none, change current player
    //            if replaceCard
    //                Available functions after replaceCard: none, change current player
  };

  return (
    <>
      <div>
        <h1>Set Players Screen</h1>
        <h3>Just Kidding</h3>
        <h5>We're not ready yet</h5>
        <h6>Player 1 is {players[0].player1}</h6>
        <h6>Player 2 is {players[0].player2}</h6>

        <button onClick={removePlayers}>Reset Players</button>

        {cards.length > 0 ? (
          <div>
            <h5>Show Cards Here</h5>
            {console.log(cards[0][0])}
            {cards[0].map((c) => (
              <div className="grid-item">
                <button
                  className="playerCard"
                  style={{
                    backgroundImage: `url(${c.image_url})`,
                  }}
                ></button>
              </div>
            ))}
          </div>
        ) : (
          <button onClick={deal}>Deal Cards</button>
        )}
      </div>
    </>
  );
}
//   return (
//     <>
//       {gameId !== null ? (
//         <div>
//           <Main
//             p1={player1}
//             p2={player2}
//             p1Board={player1Board}
//             p2Board={player2Board}
//             gId={gameId}
//             p1Score={player1Score}
//             p2Score={player2Score}
//           />
//         </div>
//       ) : (
//         <div>
//           <h1>Set Players Screen</h1>
//           <h3>Just Kidding</h3>
//           <h5>We're not ready yet</h5>
//           <h6>Player 1 is {players[0].player1}</h6>
//           <h6>Player 2 is {players[0].player2}</h6>

//           <button onClick={removePlayers}>Reset Players</button>
//         </div>
//       )}
//     </>
//   );
// }

export default GameSetup;
