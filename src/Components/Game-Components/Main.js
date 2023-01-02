import React, { useEffect, useState } from "react";

import PlayerBoard from "./PlayerBoard";
import CenterBoard from "./CenterBoard";
import PlayerCountForm from "./PlayerCountForm";
import CardsApi from "../../cardsApi";
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

    const cardTable = await SkyjoApi.deal();
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

  useEffect(() => {
    console.log(player1Score);
    async function updateScore() {
      if (player1Cards.length > 0) {
        let score = player1Score;
        for (let card in player1Cards) {
          if (player1Cards[card].face_up == true) {
            score += player1Cards[card].game_value;
            setPlayer1Score(score);
            // console.log(player1Cards[card].board_id, score);
            const test = await SkyjoApi.updateScore(
              player1Cards[card].board_id,
              score
            );
            console.log(test);
          }
        }
      }
    }
    updateScore();
  }, [player1Cards]);

  useEffect(() => {
    async function updateScore() {
      if (player2Cards.length > 0) {
        let score = player2Score;
        for (let card in player2Cards) {
          if (player2Cards[card].face_up == true) {
            score += player2Cards[card].game_value;
            setPlayer2Score(score);
            const test = await SkyjoApi.updateScore(
              card.board_id,
              card.id,
              score
            );
            // console.log(test);
          }
        }
      }
    }
    updateScore();
  }, [player2Cards]);

  async function newGame() {
    setGameId(null);
    setPlayer1Score(0);
    await SkyjoApi.reset();
  }
  // console.log(gameId);
  // console.log(player2Cards);

  const flipCard = async (board_id, card_id, player) => {
    let updatedPlayerCards = await SkyjoApi.flipBoardCard(board_id, card_id);
    // console.log(updatedPlayerCards);
    if (player === player1) {
      setPlayer1Cards(updatedPlayerCards);
    }
    if (player === player2) {
      setPlayer2Cards(updatedPlayerCards);
    }
  };

  // console.log(player1Cards);
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

  // async function flipCard(game_id, player_id, board_id, card_id) {
  //   // let playerCards = SkyjoAPI.flipBoardCard(game_id, player_id, board_id, card_id)
  //   // used only on player board
  //   // Output: player_id cards
  //   // update state of player_id cards
  //   // update_score(based on state of player_id cards)
  //   // score update on backend done with player cards are pulled
  //   //  if currentPlayer is null
  //   //      startOfGameMove()
  //   //  if currentPlayer is not null
  //   //      set currentPlayer to next player
  //   //      gamePlayMoves()
  // }
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

  return (
    <>
      {gameId !== null ? (
        <div>
          {player1Cards.length > 0 ? (
            <div className="gameBoards">
              <a href="/newGame" onClick={newGame}>
                New Game
              </a>
              <div className="playerBoards">
                <div className="player1Board">
                  <h1>Player 1 Cards</h1>
                  <PlayerBoard
                    playerCards={player1Cards}
                    flipCard={flipCard}
                    player={p1}
                  />
                  <Scores score={player1Score} />
                </div>
                <div className="player2Board">
                  <h1>Player 2 Cards</h1>
                  <PlayerBoard
                    playerCards={player2Cards}
                    flipCard={flipCard}
                    player={p2}
                  />
                  <Scores score={player2Score} />
                </div>
              </div>

              <CenterBoard
                discardCards={discardCards}
                drawCards={drawCards}
                currentPlayer={p1}
              />
            </div>
          ) : (
            <div>
              <h1>Deal Cards Screen</h1>
              <button onClick={dealCards}>Deal Cards</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <GameSetup />
        </div>
      )}
    </>
  );
}

export default Main;
