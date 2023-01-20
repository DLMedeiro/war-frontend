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

function PlayerCollection({ player }) {
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
  const player1Turn = useSelector((state) => state.player1.playerTurn);
  const player2Turn = useSelector((state) => state.player2.playerTurn);

  const [p1Compare, setP1Compare] = useState(0);
  const [p2Compare, setP2Compare] = useState(0);

  const [collection, setCollection] = useState([]);
  //   const [disableP1Btn, setDisableP1Btn] = useState(false);
  //   const [disableP2Btn, setDisableP2Btn] = useState(true);

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (players[0].player1 === "Computer") {
  //       if (player2War.length === 1) {
  //         setTimeout(p1War, 1000);
  //       } else if (player2War.length === 2 && player1Battle.length === 0) {
  //         setTimeout(p1War, 1000);
  //       }
  //     }
  //   }, [player2War]);

  const shuffle = (cards) => {
    let index = cards.length;
    let randomIndex;

    if (cards.length < 2) {
      setCollection(cards);
      return cards;
    }

    while (index != 0) {
      randomIndex = Math.floor(Math.random() * index);
      index--;
    }

    [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];

    setCollection(cards);

    return cards;
  };

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

  useEffect(() => {
    if (player1Cards.length <= 4 && player1Collection.length > 0) {
      setCollection(player1Collection);
      shuffle(collection);
      dispatch(player1Actions.removeFromCollection());
      dispatch(player1Actions.addToCollection(collection));
      for (let card in player1Collection) {
        dispatch(player1Actions.addCard(player1Collection[card]));
      }
      dispatch(player1Actions.removeFromCollection());
      setCollection([]);
    }
    if (player2Cards.length <= 4 && player2Collection.length > 0) {
      setCollection(player2Collection);
      shuffle(collection);
      dispatch(player2Actions.removeFromCollection());
      dispatch(player2Actions.addToCollection(collection));
      for (let card in player2Collection) {
        dispatch(player2Actions.addCard(player2Collection[card]));
      }
      dispatch(player2Actions.removeFromCollection());
      setCollection([]);
    }
  }, [player1Cards, player2Cards]);

  //   const p1War = () => {
  //     if (player1War.length === 0) {
  //       dispatch(player1Actions.addToWar(player1Cards[0]));
  //       dispatch(player1Actions.removeCard());
  //     } else if (player1Battle.length === 0) {
  //       if (players[0].player1 === "Computer") {
  //         dispatch(player1Actions.addToBattle(player1Cards[0]));
  //         console.log(player1Cards[0]);
  //         dispatch(player1Actions.addToBattle(player1Cards[1]));
  //         console.log(player1Cards[1]);
  //         dispatch(player1Actions.addToBattle(player1Cards[2]));
  //         console.log(player1Cards[2]);
  //         dispatch(player1Actions.addToWar(player1Cards[3]));
  //         console.log(player1Cards[3]);
  //         dispatch(player1Actions.removeCard());
  //         dispatch(player1Actions.removeCard());
  //         dispatch(player1Actions.removeCard());
  //         dispatch(player1Actions.removeCard());
  //       } else {
  //         console.log(player1Cards[0]);
  //         dispatch(player1Actions.addToBattle(player1Cards[0]));
  //         dispatch(player1Actions.removeCard());
  //       }
  //     } else if (player1Battle.length > 0 && player1Battle.length < 3) {
  //       console.log(player1Cards[0]);
  //       dispatch(player1Actions.addToBattle(player1Cards[0]));
  //       dispatch(player1Actions.removeCard());
  //     } else if (player1Battle.length === 3) {
  //       console.log(player1Cards[0]);
  //       dispatch(player1Actions.addToWar(player1Cards[0]));
  //       dispatch(player1Actions.removeCard());
  //       console.log(player1War);
  //       dispatch(player1Actions.changeTurn());
  //       dispatch(player2Actions.changeTurn());
  //     } else if (player1Battle.length > 3 && player1Battle.length < 6) {
  //       console.log(player1Cards[0]);
  //       dispatch(player1Actions.addToBattle(player1Cards[0]));
  //       dispatch(player1Actions.removeCard());
  //     } else if (player1Battle.length === 6) {
  //       console.log(player1Cards[0]);
  //       dispatch(player1Actions.addToWar(player1Cards[0]));
  //       dispatch(player1Actions.removeCard());
  //       console.log(player1War);
  //       dispatch(player1Actions.changeTurn());
  //       dispatch(player2Actions.changeTurn());
  //     }
  //   };
  //   const p2War = () => {
  //     if (player2War.length === 0) {
  //       dispatch(player2Actions.addToWar(player2Cards[0]));
  //       dispatch(player2Actions.removeCard());
  //     } else if (player2Battle.length === 0) {
  //       console.log(player2Cards[0]);
  //       dispatch(player2Actions.addToBattle(player2Cards[0]));
  //       dispatch(player2Actions.removeCard());
  //     } else if (player2Battle.length > 0 && player2Battle.length < 3) {
  //       console.log(player2Cards[0]);
  //       dispatch(player2Actions.addToBattle(player2Cards[0]));
  //       dispatch(player2Actions.removeCard());
  //     } else if (player2Battle.length === 3) {
  //       console.log(player2Cards[0]);
  //       dispatch(player2Actions.addToWar(player2Cards[0]));
  //       dispatch(player2Actions.removeCard());
  //       console.log(player2War);
  //     } else if (player2Battle.length > 3 && player2Battle.length < 6) {
  //       console.log(player2Cards[0]);
  //       dispatch(player2Actions.addToBattle(player2Cards[0]));
  //       dispatch(player2Actions.removeCard());
  //     } else if (player2Battle.length === 6) {
  //       console.log(player2Cards[0]);
  //       dispatch(player2Actions.addToWar(player2Cards[0]));
  //       dispatch(player2Actions.removeCard());
  //       console.log(player2War);
  //     }
  //   };

  //   useEffect(() => {
  //     if (
  //       (player1War.length === 1 && player2War.length === 0) ||
  //       (player1War.length === 2 && player2War.length === 1)
  //     ) {
  //       dispatch(player1Actions.changeTurn());
  //       dispatch(player2Actions.changeTurn());
  //     } else if (player1War.length === 1 && player2War.length === 1) {
  //       dispatch(player1Actions.changeTurn());
  //       dispatch(player2Actions.changeTurn());
  //     } else if (
  //       player1War.length === 0 &&
  //       player2War.length === 0 &&
  //       players[0].player1 === "Computer"
  //     ) {
  //       //   dispatch(player1Actions.changeTurn());
  //       dispatch(player2Actions.changeTurn());
  //     } else if (
  //       player1War.length === 0 &&
  //       player2War.length === 0 &&
  //       players[0].player1 !== "Computer"
  //     ) {
  //       dispatch(player1Actions.changeTurn());
  //       dispatch(player2Actions.changeTurn());
  //     }
  //   }, [player1War, player2War]);

  //   useEffect(() => {
  //     console.log(player1War.length);
  //     if (player1War.length > 0 && player1War.length === player2War.length) {
  //       setP1Compare(player1War[player1War.length - 1].game_value);
  //       setP2Compare(player2War[player2War.length - 1].game_value);
  //     }
  //   }, [player1War, player2War]);

  //   useEffect(() => {
  //     if (p1Compare > 0 && p2Compare > 0) {
  //       if (player2War.length > 1) {
  //         // Set longer time for battle
  //         setTimeout(checkForWin, 6000);
  //       } else {
  //         setTimeout(checkForWin, 2000);
  //       }
  //     }
  //   }, [p2Compare, p1Compare]);

  //   const checkForWin = () => {
  //     if (p1Compare > p2Compare) {
  //       // add all cards to p1 collection
  //       for (let card in player1War) {
  //         dispatch(player1Actions.addToCollection(player1War[card]));
  //       }
  //       for (let card in player2War) {
  //         dispatch(player1Actions.addToCollection(player2War[card]));
  //       }
  //       if (player1Battle.length > 0 && player2Battle.length > 0) {
  //         for (let card in player1Battle) {
  //           dispatch(player1Actions.addToCollection(player1Battle[card]));
  //         }
  //         for (let card in player2Battle) {
  //           dispatch(player1Actions.addToCollection(player2Battle[card]));
  //         }
  //       }
  //       setP1Compare(0);
  //       setP2Compare(0);
  //       dispatch(player1Actions.removeFromWar());
  //       dispatch(player2Actions.removeFromWar());
  //       dispatch(player1Actions.removeFromBattle());
  //       dispatch(player2Actions.removeFromBattle());
  //     } else if (p1Compare < p2Compare) {
  //       // add all cards to p2 collection
  //       for (let card in player1War) {
  //         dispatch(player2Actions.addToCollection(player1War[card]));
  //       }
  //       for (let card in player2War) {
  //         dispatch(player2Actions.addToCollection(player2War[card]));
  //       }
  //       if (player1Battle.length > 0 && player2Battle.length > 0) {
  //         for (let card in player1Battle) {
  //           dispatch(player2Actions.addToCollection(player1Battle[card]));
  //         }
  //         for (let card in player2Battle) {
  //           dispatch(player2Actions.addToCollection(player2Battle[card]));
  //         }
  //       }
  //       setP1Compare(0);
  //       setP2Compare(0);
  //       dispatch(player1Actions.removeFromWar());
  //       dispatch(player2Actions.removeFromWar());
  //       dispatch(player1Actions.removeFromBattle());
  //       dispatch(player2Actions.removeFromBattle());
  //     } else if (p1Compare === p2Compare) {
  //       new Toast({
  //         message:
  //           "WAR! Time to battle by drawing 4 cards, the player with the higher fourth card wins the pile.",
  //       });
  //       if (players[0].player1 !== "Computer") {
  //         checkEndGame();
  //         setDisableP1Btn(false);
  //       } else {
  //         checkEndGame();
  //         setDisableP2Btn(false);
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     if (gameStatus) {
  //       checkEndGame();
  //     }
  //   }, [player1Cards, player1Collection, player2Cards, player2Collection]);

  //   const checkEndGame = () => {
  //     if (
  //       p1Compare > 0 &&
  //       p2Compare > 0 &&
  //       p1Compare === p2Compare &&
  //       player1Cards.length + player1Collection.length < 4
  //     ) {
  //       dispatch(cardsActions.endGame());
  //       dispatch(playersActions.addWinner(players[0].player2));
  //     } else if (
  //       p1Compare > 0 &&
  //       p2Compare > 0 &&
  //       p1Compare === p2Compare &&
  //       player2Cards.length + player2Collection.length < 4
  //     ) {
  //       dispatch(cardsActions.endGame());
  //       dispatch(playersActions.addWinner(players[0].player1));
  //     }
  //     if (gameStatus && player1Cards.length + player1Collection.length <= 0) {
  //       dispatch(cardsActions.endGame());
  //       dispatch(playersActions.addWinner(players[0].player1));
  //     } else if (
  //       gameStatus &&
  //       player2Cards.length + player2Collection.length <= 0
  //     ) {
  //       dispatch(cardsActions.endGame());
  //       dispatch(playersActions.addWinner(players[0].player2));
  //     }
  //   };

  return (
    <div>
      {player === "Player1" ? (
        <div className="inner-container">
          {player1Collection.length > 0 ? (
            <div
              className="playerCard inner-container"
              style={{
                backgroundImage: `url(${
                  player1Collection[player1Collection.length - 1].image_url
                })`,
              }}
            ></div>
          ) : (
            <div className="inner-container">
              <div className="playerCard inner-container card-placeholder"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="inner-container">
          {player2Collection.length > 0 ? (
            <div
              className="playerCard inner-container"
              style={{
                backgroundImage: `url(${
                  player2Collection[player2Collection.length - 1].image_url
                })`,
              }}
            ></div>
          ) : (
            <div className="inner-container">
              <div className="playerCard inner-container card-placeholder"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerCollection;
