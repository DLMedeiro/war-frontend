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
import Toast from "../Toast";
import "../../Components/Toast.css";
import PlayerCollection from "./PlayerCollection";
import PlayerWar from "./PlayerWar";
import Player1Battle from "./Player1Battle";
import Player2Battle from "./Player2Battle";

function Players(player) {
  // useEffect(() => {
  //   if (player === "player1") {

  //   }
  // }, players);

  // const gameStatus = useSelector((state) => state.cardDeck.gameReady);
  const player1Cards = useSelector((state) => state.player1.cards);
  const player1War = useSelector((state) => state.player1.war);
  const player1Battle = useSelector((state) => state.player1.battle);
  const player1Collection = useSelector((state) => state.player1.collection);
  const players = useSelector((state) => state.players.players);
  const player2Cards = useSelector((state) => state.player2.cards);
  const player2War = useSelector((state) => state.player2.war);
  const player2Battle = useSelector((state) => state.player2.battle);
  const player2Collection = useSelector((state) => state.player2.collection);
  // const player1Turn = useSelector((state) => state.player1.playerBtn);
  // const player2Turn = useSelector((state) => state.player2.playerBtn);
  const player1 = useSelector((state) => state.player1.player);
  const player2 = useSelector((state) => state.player2.player);
  const currentPlayer = useSelector((state) => state.players.currentPlayer);
  const [p1Compare, setP1Compare] = useState(0);
  const [p2Compare, setP2Compare] = useState(0);
  const gameStatus = useSelector((state) => state.cardDeck.gameReady);

  // const [p1Compare, setP1Compare] = useState(0);
  // const [p2Compare, setP2Compare] = useState(0);

  // const [collection, setCollection] = useState([]);
  //   const [disableP1Btn, setDisableP1Btn] = useState(false);
  //   const [disableP2Btn, setDisableP2Btn] = useState(true);

  const dispatch = useDispatch();

  // Only for computer play
  useEffect(() => {
    if (player1.name === "Computer") {
      // Change turn at start of game
      if (player2War.length === 1) {
        // playerButtonActivation();
        setTimeout(p1War, 1000);
      } else if (player1War.length === 2 && player2Battle.length < 3) {
        // playerButtonActivation();
        // setTimeout(p1War, 1000);
      }
    }
  }, [player2War]);
  //   const shuffle = (cards) => {
  //     let index = cards.length;
  //     let randomIndex;

  //     if (cards.length < 2) {
  //       setCollection(cards);
  //       return cards;
  //     }

  //     while (index != 0) {
  //       randomIndex = Math.floor(Math.random() * index);
  //       index--;
  //     }

  //     [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];

  //     setCollection(cards);

  //     return cards;
  //   };

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

  //   useEffect(() => {
  //     if (player1Cards.length <= 4 && player1Collection.length > 0) {
  //       setCollection(player1Collection);
  //       shuffle(collection);
  //       dispatch(player1Actions.removeFromCollection());
  //       dispatch(player1Actions.addToCollection(collection));
  //       for (let card in player1Collection) {
  //         dispatch(player1Actions.addCard(player1Collection[card]));
  //       }
  //       dispatch(player1Actions.removeFromCollection());
  //       setCollection([]);
  //     }
  //     if (player2Cards.length <= 4 && player2Collection.length > 0) {
  //       setCollection(player2Collection);
  //       shuffle(collection);
  //       dispatch(player2Actions.removeFromCollection());
  //       dispatch(player2Actions.addToCollection(collection));
  //       for (let card in player2Collection) {
  //         dispatch(player2Actions.addCard(player2Collection[card]));
  //       }
  //       dispatch(player2Actions.removeFromCollection());
  //       setCollection([]);
  //     }
  //   }, [player1Cards, player2Cards]);

  const p1War = () => {
    if (player1War.length === 0) {
      dispatch(player1Actions.addToWar(player1Cards[0]));
      dispatch(player1Actions.removeCard());
      if (player1.name !== "Computer") {
        changeCurrentPlayer();
      }
      // playerButtonActivation();
      // changeCurrentPlayer();
      // dispatch(playersActions.setCurrentPlayer(players[1]));
    } else if (player1War.length > 0 && player1Battle.length < 3) {
      if (player1.name === "Computer") {
        dispatch(player1Actions.addToBattle(player1Cards[0]));
        // console.log(player1Cards[0]);
        dispatch(player1Actions.addToBattle(player1Cards[1]));
        // console.log(player1Cards[1]);
        dispatch(player1Actions.addToBattle(player1Cards[2]));
        // console.log(player1Cards[2]);
        dispatch(player1Actions.addToWar(player1Cards[3]));
        // console.log(player1Cards[3]);
        dispatch(player1Actions.removeCard());
        dispatch(player1Actions.removeCard());
        dispatch(player1Actions.removeCard());
        dispatch(player1Actions.removeCard());
        // dispatch(playersActions.setCurrentPlayer(players[1]));
        changeCurrentPlayer();

        // updatePlayerTurn();
      } else {
        // console.log(player1Cards[0]);
        dispatch(player1Actions.addToBattle(player1Cards[0]));
        dispatch(player1Actions.removeCard());
        // dispatch(playersActions.setCurrentPlayer(players[1]));
        // updatePlayerTurn();
      }
    } else if (player1Battle.length === 3) {
      //   console.log(player1Cards[0]);
      dispatch(player1Actions.addToWar(player1Cards[0]));
      dispatch(player1Actions.removeCard());
      // dispatch(playersActions.setCurrentPlayer(players[1]));
      // updatePlayerTurn();
      //   console.log(player1War);
    } else if (player1Battle.length > 3 && player1Battle.length < 6) {
      //   console.log(player1Cards[0]);
      dispatch(player1Actions.addToBattle(player1Cards[0]));
      dispatch(player1Actions.removeCard());
      // dispatch(playersActions.setCurrentPlayer(players[1]));
      // updatePlayerTurn();
    } else if (player1Battle.length === 6) {
      //   console.log(player1Cards[0]);
      dispatch(player1Actions.addToWar(player1Cards[0]));
      dispatch(player1Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[1]));
      // updatePlayerTurn();
      //   console.log(player1War);
    } else if (player1Battle.length > 6 && player1Battle.length < 9) {
      //   console.log(player1Cards[0]);
      dispatch(player1Actions.addToBattle(player1Cards[0]));
      dispatch(player1Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[1]));
      // updatePlayerTurn();
    } else if (player1Battle.length === 9) {
      //   console.log(player1Cards[0]);
      dispatch(player1Actions.addToWar(player1Cards[0]));
      dispatch(player1Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[1]));
      // updatePlayerTurn();
      //   console.log(player1War);
    }
  };
  const p2War = () => {
    if (player2War.length === 0) {
      dispatch(player2Actions.addToWar(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      if (player1War.length === 0) {
        changeCurrentPlayer();
      }

      // dispatch(playersActions.setCurrentPlayer(players[0]));
      // updatePlayerTurn();
    } else if (player2Battle.length === 0) {
      dispatch(player2Actions.addToBattle(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      // dispatch(playersActions.setCurrentPlayer(players[0]));
      // updatePlayerTurn();
    } else if (player2Battle.length > 0 && player2Battle.length < 3) {
      dispatch(player2Actions.addToBattle(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      // dispatch(playersActions.setCurrentPlayer(players[0]));
      // updatePlayerTurn();
    } else if (player2Battle.length === 3) {
      dispatch(player2Actions.addToWar(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[0]));
      // playerButtonActivation();
    } else if (player2Battle.length > 3 && player2Battle.length < 6) {
      dispatch(player2Actions.addToBattle(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[0]));
      // updatePlayerTurn();
    } else if (player2Battle.length === 6) {
      dispatch(player2Actions.addToWar(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[0]));
      // playerButtonActivation();
    } else if (player2Battle.length > 6 && player2Battle.length < 9) {
      dispatch(player2Actions.addToBattle(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[0]));
      // updatePlayerTurn();
    } else if (player2Battle.length === 9) {
      dispatch(player2Actions.addToWar(player2Cards[0]));
      dispatch(player2Actions.removeCard());
      dispatch(playersActions.setCurrentPlayer(players[0]));
    }
  };

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

  useEffect(() => {
    // if (
    //   player1.name !== "Computer" &&
    //   player1War.length > 0 &&
    //   player1War.length > player2War.length
    // ) {
    //   changeCurrentPlayer();
    //   playerButtonActivation();
    // }
    if (player1War.length > 0 && player1War.length === player2War.length) {
      setP1Compare(player1War[player1War.length - 1].game_value);
      setP2Compare(player2War[player2War.length - 1].game_value);
    }
  }, [player1War, player2War]);
  console.log(currentPlayer);

  useEffect(() => {
    if (p1Compare > 0 && p2Compare > 0) {
      if (player2War.length > 1) {
        // Set longer time for battle
        setTimeout(compareCards, 6000);
      } else {
        setTimeout(compareCards, 2000);
      }
    }
  }, [p2Compare, p1Compare]);

  const compareCards = () => {
    if (p1Compare > p2Compare) {
      // add all cards to p1 collection
      for (let card in player1War) {
        dispatch(player1Actions.addToCollection(player1War[card]));
        dispatch(player1Actions.removeFromWar());
      }
      for (let card in player2War) {
        dispatch(player1Actions.addToCollection(player2War[card]));
        dispatch(player2Actions.removeFromWar());
      }
      if (player1Battle.length > 0 && player2Battle.length > 0) {
        for (let card in player1Battle) {
          dispatch(player1Actions.addToCollection(player1Battle[card]));
          dispatch(player1Actions.removeFromBattle());
        }
        for (let card in player2Battle) {
          dispatch(player1Actions.addToCollection(player2Battle[card]));
          dispatch(player2Actions.removeFromBattle());
        }
      }
      changeCurrentPlayer();
      // playerButtonActivation();
      setP1Compare(0);
      setP2Compare(0);
    } else if (p1Compare < p2Compare) {
      // add all cards to p2 collection
      for (let card in player1War) {
        dispatch(player2Actions.addToCollection(player1War[card]));
        dispatch(player1Actions.removeFromWar());
      }
      for (let card in player2War) {
        dispatch(player2Actions.addToCollection(player2War[card]));
        dispatch(player2Actions.removeFromWar());
      }
      if (player1Battle.length > 0 && player2Battle.length > 0) {
        for (let card in player1Battle) {
          dispatch(player2Actions.addToCollection(player1Battle[card]));
          dispatch(player1Actions.removeFromBattle());
        }
        for (let card in player2Battle) {
          dispatch(player2Actions.addToCollection(player2Battle[card]));
          dispatch(player2Actions.removeFromBattle());
        }
      }
      changeCurrentPlayer();
      // playerButtonActivation();
      setP1Compare(0);
      setP2Compare(0);
    } else if (p1Compare === p2Compare) {
      new Toast({
        message:
          "WAR! Time to battle by drawing 4 cards, the player with the higher fourth card wins the pile.",
      });
      if (player1.name !== "Computer") {
        checkEndGame();
        // setDisableP1Btn(false);
      } else {
        checkEndGame();
        p1War();
        // setDisableP2Btn(false);
      }
    }
  };

  useEffect(() => {
    if (gameStatus) {
      checkEndGame();
    }
  }, [player1Cards, player1Collection, player2Cards, player2Collection]);

  // Run playerTurn at the start of the game to highlight the correct card, not needed for anything else
  useEffect(() => {
    // playerButtonActivation();
  }, [gameStatus]);

  const checkEndGame = () => {
    if (
      p1Compare > 0 &&
      p2Compare > 0 &&
      p1Compare === p2Compare &&
      player1Cards.length + player1Collection.length < 4
    ) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner(players[0].player2));
    } else if (
      p1Compare > 0 &&
      p2Compare > 0 &&
      p1Compare === p2Compare &&
      player2Cards.length + player2Collection.length < 4
    ) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner(players[0].player1));
    }
    if (gameStatus && player1Cards.length + player1Collection.length <= 0) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner(players[0].player1));
    } else if (
      gameStatus &&
      player2Cards.length + player2Collection.length <= 0
    ) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner(players[0].player2));
    }
  };

  useEffect(() => {
    if (
      Object.keys(currentPlayer)[0] === "player1" &&
      players[0].player1 === "Computer"
    ) {
      document.getElementById("p1Btn").disabled = true;
      document.getElementById("p2Btn").disabled = true;
    } else if (
      Object.keys(currentPlayer)[0] === "player1" &&
      players[0].player1 !== "Computer"
    ) {
      document.getElementById("p1Btn").disabled = false;
      document.getElementById("p2Btn").disabled = true;
    } else if (Object.keys(currentPlayer)[0] === "player2") {
      console.log("test");
      document.getElementById("p1Btn").disabled = true;
      document.getElementById("p2Btn").disabled = false;
    }
  }, [currentPlayer]);

  const changeCurrentPlayer = () => {
    if (Object.keys(currentPlayer)[0] === "player1") {
      dispatch(playersActions.setCurrentPlayer(players[1]));
    } else if (Object.keys(currentPlayer)[0] === "player2") {
      dispatch(playersActions.setCurrentPlayer(players[0]));
    }
  };

  return (
    <div>
      <div className="column">
        <h1>{player1.name}'s Cards</h1>
        <h3>Card Total: {player1Cards.length + player1Collection.length}</h3>

        <div className="inner-container">
          <PlayerCollection player={"Player1"} />
          {/* <PlayerDrawPile player={"Player1"} /> */}
          <button
            id="p1Btn"
            onClick={p1War}
            className="clickCard"
            style={{
              backgroundImage: `url(${cardBack})`,
            }}
          ></button>
          <PlayerWar player={"Player1"} />
        </div>
      </div>
      <div className="column">
        <h1>{player2.name}'s Cards</h1>
        <h3>Card Total: {player2Cards.length + player2Collection.length}</h3>

        <div className="inner-container">
          <PlayerCollection player={"Player2"} />
          {/* <PlayerDrawPile player={"Player2"} /> */}
          <button
            id="p2Btn"
            onClick={p2War}
            className="clickCard"
            style={{
              backgroundImage: `url(${cardBack})`,
            }}
          ></button>
          <PlayerWar player={"Player2"} />
        </div>
      </div>

      <div className="column">
        {player1Battle.length > 0 && (
          <div className="row">
            <Player1Battle battleStartingIndex={0} />
          </div>
        )}
        {player2Battle.length > 0 && (
          <div className="row">
            <Player2Battle battleStartingIndex={0} />
          </div>
        )}
      </div>
      <div className="column">
        {player1Battle.length > 3 && (
          <div className="row">
            <Player1Battle battleStartingIndex={3} />
          </div>
        )}
        {player2Battle.length > 3 && (
          <div className="row">
            <Player2Battle battleStartingIndex={3} />
          </div>
        )}
      </div>
      <div className="column">
        {player1Battle.length > 6 && (
          <div className="row">
            <Player1Battle battleStartingIndex={6} />
          </div>
        )}
        {player2Battle.length > 6 && (
          <div className="row">
            <Player2Battle battleStartingIndex={6} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Players;
