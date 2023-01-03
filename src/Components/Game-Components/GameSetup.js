import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../../store/player-slice";
import { fetchCards, cardsActions } from "../../store/cards-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";
import { warActions } from "../../store/war-slice";
import cardBack from "./back.png";

import PlayerBoard from "./PlayerBoard";
import CenterBoard from "./CenterBoard";
import PlayerCountForm from "./PlayerCountForm";
import SkyjoApi from "../../skyjoApi";
import Main from "./Main";

import "./Main.css";

function GameSetup() {
  const players = useSelector((state) => state.players.players);
  const cards = useSelector((state) => state.cardDeck.cardDeck);
  const player1Cards = useSelector((state) => state.player1.cards);
  const player2Cards = useSelector((state) => state.player2.cards);
  const player1Collection = useSelector((state) => state.player1.collection);
  const player2Collection = useSelector((state) => state.player2.collection);
  const player1Attack = useSelector((state) => state.war.p1Attack);
  const player2Attack = useSelector((state) => state.war.p2Attack);
  const player1Battle = useSelector((state) => state.war.p1Battle);
  const player2Battle = useSelector((state) => state.war.p2Battle);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cards.length > 0) {
      for (let card in cards[0]) {
        if (cards[0][card].player == 1) {
          dispatch(player1Actions.addCards(cards[0][card]));
        } else if (cards[0][card].player == 2) {
          dispatch(player2Actions.addCards(cards[0][card]));
        }
      }
    }
  }, [cards]);

  // Check for winner of war
  const checkForWin = () => {
    if (player1Attack[0].game_value > player2Attack[0].game_value) {
      dispatch(player1Actions.addCollection(player1Attack[0]));
      dispatch(player1Actions.addCollection(player2Attack[0]));
      dispatch(warActions.removeP1Attack());
      dispatch(warActions.removeP2Attack());
      console.log(player1Collection);
    } else if (player1Attack[0].game_value < player2Attack[0].game_value) {
      dispatch(player2Actions.addCollection(player1Attack[0]));
      dispatch(player2Actions.addCollection(player2Attack[0]));
      dispatch(warActions.removeP1Attack());
      dispatch(warActions.removeP2Attack());
      console.log(player2Collection);
    }
  };

  // const player1Wins = () => {
  //   dispatch(player1Actions.addCollection(player1Attack[0]));
  //   dispatch(player1Actions.addCollection(player2Attack[0]));
  //   dispatch(warActions.removeP1Attack());
  //   dispatch(warActions.removeP2Attack());
  //   console.log(player1Collection);
  // };
  // const player2Wins = () => {
  //   dispatch(player2Actions.addCollection(player1Attack[0]));
  //   dispatch(player2Actions.addCollection(player2Attack[0]));
  //   dispatch(warActions.removeP1Attack());
  //   dispatch(warActions.removeP2Attack());
  //   console.log(player2Collection);
  // };

  const removePlayers = () => {
    dispatch(playersActions.removePlayers());
  };

  const deal = () => {
    dispatch(fetchCards());
  };

  const player1Card = () => {
    let card = player1Cards[0];
    dispatch(warActions.addP1Attack(card));
    dispatch(player1Actions.removeFromCards());
  };
  const player2Card = () => {
    let card = player2Cards[0];
    dispatch(warActions.addP2Attack(card));
    dispatch(player2Actions.removeFromCards());
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
            <h5>Player 1 Cards</h5>
            <button
              onClick={player1Card}
              className="playerCard"
              style={{
                backgroundImage: `url(${cardBack})`,
              }}
            ></button>
            <h5>Player 1 Attack</h5>
            {player1Attack.length > 0 ? (
              <div
                className="playerCard"
                style={{
                  backgroundImage: `url(${player1Attack[0].image_url})`,
                }}
              ></div>
            ) : (
              <h4>No card drawn yet</h4>
            )}
            <h5>Player 1 collection: {player1Collection.length}</h5>
            {player1Collection.length > 0 ? (
              // console.log(player1Collection)
              <div
                className="playerCard"
                style={{
                  backgroundImage: `url(${player1Collection[0].image_url})`,
                }}
              ></div>
            ) : (
              <h4>No card in collection yet</h4>
            )}
            <h5>Player 2 Cards</h5>
            <button
              onClick={player2Card}
              className="playerCard"
              style={{
                backgroundImage: `url(${cardBack})`,
              }}
            ></button>
            <h5>Player 2 Attack</h5>
            {player2Attack.length > 0 ? (
              <div
                className="playerCard"
                style={{
                  backgroundImage: `url(${player2Attack[0].image_url})`,
                }}
              >
                <button onClick={checkForWin}>Check for win</button>
              </div>
            ) : (
              <h4>No card drawn yet</h4>
            )}
            <h5>Player 2 collection: {player2Collection.length}</h5>
            {player2Collection.length > 0 ? (
              // console.log(player2Collection)
              <div
                className="playerCard"
                style={{
                  backgroundImage: `url(${player2Collection[0].image_url})`,
                }}
              ></div>
            ) : (
              <h4>No card in collection yet</h4>
            )}
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
