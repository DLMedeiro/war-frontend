import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardsActions } from "../../store/cards-slice";
import { playersActions } from "../../store/players-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";
import cardBack from "./back.png";
import "./Card.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./GameBoard.css";
import "./GameSetup.css";
import Toast from "../../Components/Toast";
import "../../Components/Toast.css";
import Players from "./Players";

function GameBoard() {
  const gameStatus = useSelector((state) => state.cardDeck.gameReady);
  const players = useSelector((state) => state.players.players);
  const player1Cards = useSelector((state) => state.player1.cards);
  const player1War = useSelector((state) => state.player1.war);
  const player1Battle = useSelector((state) => state.player1.battle);
  const player1Collection = useSelector((state) => state.player1.collection);
  const player2Cards = useSelector((state) => state.player2.cards);
  const player2War = useSelector((state) => state.player2.war);
  const player2Battle = useSelector((state) => state.player2.battle);
  const player2Collection = useSelector((state) => state.player2.collection);
  const player1 = useSelector((state) => state.player1.player);
  const player2 = useSelector((state) => state.player2.player);
  const currentPlayer = useSelector((state) => state.players.currentPlayer);
  const player1Turn = useSelector((state) => state.player1.playerTurn);
  const player2Turn = useSelector((state) => state.player2.playerTurn);

  const [collection, setCollection] = useState([]);
  const [disableP1Btn, setDisableP1Btn] = useState(false);
  const [disableP2Btn, setDisableP2Btn] = useState(true);

  const dispatch = useDispatch();

  // Computer play functionality

  useEffect(() => {
    if (Object.keys(currentPlayer)[0] === "player1") {
      new Toast({
        message: `${currentPlayer.player1}'s Turn! Start by clicking on your face down card.  Watch for the red highlight to see when you can flip another card`,
      });
    } else if (Object.keys(currentPlayer)[0] === "player2") {
      new Toast({
        message: `${currentPlayer.player2}'s Turn! Start by clicking on your face down card.  Watch for the red highlight to see when you can flip another card`,
      });
    }
  }, []);
  // useEffect(() => {
  //   if (player1.name === "Computer") {
  //     new Toast({
  //       message: `${player2.name}'s Turn! Start by clicking on your face down card.  Watch for the red highlight to see when you can flip another card`,
  //     });
  //   } else {
  //     new Toast({
  //       message: `${player1.name}'s Turn! Start by clicking on your face down card.  Watch for the red highlight to see when you can flip another card`,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (players[0].player1 === "Computer") {
  //     if (player2War.length === 1) {
  //       setTimeout(p1War, 1000);
  //     } else if (player2War.length === 2 && player1Battle.length === 0) {
  //       setTimeout(p1War, 1000);
  //     }
  //   }
  // }, [player2War]);

  // const shuffle = (cards) => {
  //   let index = cards.length;
  //   let randomIndex;

  //   if (cards.length < 2) {
  //     setCollection(cards);
  //     return cards;
  //   }

  //   while (index != 0) {
  //     randomIndex = Math.floor(Math.random() * index);
  //     index--;
  //   }

  //   [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];

  //   setCollection(cards);

  //   return cards;
  // };

  // https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html

  // function randomize(values) {
  //   let index = values.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (index != 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * index);
  //     index--;

  //     // And swap it with the current element.
  //     [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
  //   }

  //   return values;
  // }

  // var arr = ["a", "b", "c", "d", "e"];
  // randomize(arr);
  // console.log(arr);

  // useEffect(() => {
  //   if (player1Cards.length <= 4 && player1Collection.length > 0) {
  //     setCollection(player1Collection);
  //     shuffle(collection);
  //     dispatch(player1Actions.removeFromCollection());
  //     dispatch(player1Actions.addToCollection(collection));
  //     for (let card in player1Collection) {
  //       dispatch(player1Actions.addCard(player1Collection[card]));
  //     }
  //     dispatch(player1Actions.removeFromCollection());
  //     setCollection([]);
  //   }
  //   if (player2Cards.length <= 4 && player2Collection.length > 0) {
  //     setCollection(player2Collection);
  //     shuffle(collection);
  //     dispatch(player2Actions.removeFromCollection());
  //     dispatch(player2Actions.addToCollection(collection));
  //     for (let card in player2Collection) {
  //       dispatch(player2Actions.addCard(player2Collection[card]));
  //     }
  //     dispatch(player2Actions.removeFromCollection());
  //     setCollection([]);
  //   }
  // }, [player1Cards, player2Cards]);

  // const p1War = () => {
  //   if (player1War.length === 0) {
  //     dispatch(player1Actions.addToWar(player1Cards[0]));
  //     dispatch(player1Actions.removeCard());
  //   } else if (player1Battle.length === 0) {
  //     if (players[0].player1 === "Computer") {
  //       dispatch(player1Actions.addToBattle(player1Cards[0]));
  //       console.log(player1Cards[0]);
  //       dispatch(player1Actions.addToBattle(player1Cards[1]));
  //       console.log(player1Cards[1]);
  //       dispatch(player1Actions.addToBattle(player1Cards[2]));
  //       console.log(player1Cards[2]);
  //       dispatch(player1Actions.addToWar(player1Cards[3]));
  //       console.log(player1Cards[3]);
  //       dispatch(player1Actions.removeCard());
  //       dispatch(player1Actions.removeCard());
  //       dispatch(player1Actions.removeCard());
  //       dispatch(player1Actions.removeCard());
  //     } else {
  //       console.log(player1Cards[0]);
  //       dispatch(player1Actions.addToBattle(player1Cards[0]));
  //       dispatch(player1Actions.removeCard());
  //     }
  //   } else if (player1Battle.length > 0 && player1Battle.length < 3) {
  //     console.log(player1Cards[0]);
  //     dispatch(player1Actions.addToBattle(player1Cards[0]));
  //     dispatch(player1Actions.removeCard());
  //   } else if (player1Battle.length === 3) {
  //     console.log(player1Cards[0]);
  //     dispatch(player1Actions.addToWar(player1Cards[0]));
  //     dispatch(player1Actions.removeCard());
  //     console.log(player1War);
  //     setDisableP1Btn(true);
  //     setDisableP2Btn(false);
  //   } else if (player1Battle.length > 3 && player1Battle.length < 6) {
  //     console.log(player1Cards[0]);
  //     dispatch(player1Actions.addToBattle(player1Cards[0]));
  //     dispatch(player1Actions.removeCard());
  //   } else if (player1Battle.length === 6) {
  //     console.log(player1Cards[0]);
  //     dispatch(player1Actions.addToWar(player1Cards[0]));
  //     dispatch(player1Actions.removeCard());
  //     console.log(player1War);
  //     setDisableP1Btn(true);
  //     setDisableP2Btn(false);
  //   }
  // };
  // const p2War = () => {
  //   if (player2War.length === 0) {
  //     dispatch(player2Actions.addToWar(player2Cards[0]));
  //     dispatch(player2Actions.removeCard());
  //   } else if (player2Battle.length === 0) {
  //     console.log(player2Cards[0]);
  //     dispatch(player2Actions.addToBattle(player2Cards[0]));
  //     dispatch(player2Actions.removeCard());
  //   } else if (player2Battle.length > 0 && player2Battle.length < 3) {
  //     console.log(player2Cards[0]);
  //     dispatch(player2Actions.addToBattle(player2Cards[0]));
  //     dispatch(player2Actions.removeCard());
  //   } else if (player2Battle.length === 3) {
  //     console.log(player2Cards[0]);
  //     dispatch(player2Actions.addToWar(player2Cards[0]));
  //     dispatch(player2Actions.removeCard());
  //     console.log(player2War);
  //   } else if (player2Battle.length > 3 && player2Battle.length < 6) {
  //     console.log(player2Cards[0]);
  //     dispatch(player2Actions.addToBattle(player2Cards[0]));
  //     dispatch(player2Actions.removeCard());
  //   } else if (player2Battle.length === 6) {
  //     console.log(player2Cards[0]);
  //     dispatch(player2Actions.addToWar(player2Cards[0]));
  //     dispatch(player2Actions.removeCard());
  //     console.log(player2War);
  //   }
  // };

  // useEffect(() => {
  //   if (
  //     (player1War.length === 1 && player2War.length === 0) ||
  //     (player1War.length === 2 && player2War.length === 1)
  //   ) {
  //   } else if (player1War.length === 1 && player2War.length === 1) {

  //   } else if (
  //     player1War.length === 0 &&
  //     player2War.length === 0 &&
  //     player1.name === "Computer"
  //   ) {
  //     setDisableP1Btn(true);
  //     setDisableP2Btn(false);
  //   } else if (
  //     player1War.length === 0 &&
  //     player2War.length === 0 &&
  //     player1.name !== "Computer"
  //   ) {
  //     setDisableP1Btn(false);
  //     setDisableP2Btn(true);
  //   }
  // }, [player1War, player2War]);

  return (
    <div className="outer-container gameboard">
      <div className="row">
        {/* <div className="column side"></div> */}
        {/* Player 1 Board - Draw and collection piles */}
        <Players />
        {/* <div className="column side"></div> */}
      </div>

      {/* -------------------------------------------------------- */}
      {/* 2nd row for battles */}
    </div>
  );
}

export default GameBoard;
