import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardsActions } from "../../store/cards-slice";
import { playersActions } from "../../store/player-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";
import cardBack from "./back.png";
import "./Card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GameBoard.css";

function GameBoard() {
  const gameStatus = useSelector((state) => state.cardDeck.gameReady);
  const cards = useSelector((state) => state.cardDeck.cardDeck);
  const player1Cards = useSelector((state) => state.player1.cards);
  const player1War = useSelector((state) => state.player1.war);
  const player1Battle = useSelector((state) => state.player1.battle);
  const player1Collection = useSelector((state) => state.player1.collection);
  const player2Cards = useSelector((state) => state.player2.cards);
  const player2War = useSelector((state) => state.player2.war);
  const player2Battle = useSelector((state) => state.player2.battle);
  const player2Collection = useSelector((state) => state.player2.collection);

  const [p1Compare, setP1Compare] = useState(0);
  const [p2Compare, setP2Compare] = useState(0);
  const [collection, setCollection] = useState([]);

  const dispatch = useDispatch();

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

  console.log(player1Cards, player1Collection);
  console.log(player2Cards, player2Collection);
  const p1War = () => {
    dispatch(player1Actions.addToWar(player1Cards[0]));
    dispatch(player1Actions.removeCard());
  };
  const p2War = () => {
    dispatch(player2Actions.addToWar(player2Cards[0]));
    dispatch(player2Actions.removeCard());
  };

  useEffect(() => {
    if (player1War.length > 0 && player2War.length > 0) {
      setP1Compare(player1War[player1War.length - 1].game_value);
      setP2Compare(player2War[player2War.length - 1].game_value);
    }
  }, [player1War, player2War]);

  // console.log(p1Compare, p2Compare);

  useEffect(() => {
    if (p1Compare > 0 && p2Compare > 0) {
      //   checkForWin();
      setTimeout(checkForWin, 3000);
    }
  }, [p2Compare, p1Compare]);

  const checkForWin = () => {
    if (p1Compare > p2Compare) {
      // add all cards to p1 collection
      for (let card in player1War) {
        dispatch(player1Actions.addToCollection(player1War[card]));
      }
      for (let card in player2War) {
        dispatch(player1Actions.addToCollection(player2War[card]));
      }
      if (player1Battle.length > 0 && player2Battle.length > 0) {
        for (let card in player1Battle) {
          dispatch(player1Actions.addToCollection(player1Battle[card]));
        }
        for (let card in player2Battle) {
          dispatch(player1Actions.addToCollection(player2Battle[card]));
        }
      }
      setP1Compare(0);
      setP2Compare(0);
      dispatch(player1Actions.removeFromWar());
      dispatch(player2Actions.removeFromWar());
      dispatch(player1Actions.removeFromBattle());
      dispatch(player2Actions.removeFromBattle());
    } else if (p1Compare < p2Compare) {
      // add all cards to p2 collection
      for (let card in player1War) {
        dispatch(player2Actions.addToCollection(player1War[card]));
      }
      for (let card in player2War) {
        dispatch(player2Actions.addToCollection(player2War[card]));
      }
      if (player1Battle.length > 0 && player2Battle.length > 0) {
        for (let card in player1Battle) {
          dispatch(player2Actions.addToCollection(player1Battle[card]));
        }
        for (let card in player2Battle) {
          dispatch(player2Actions.addToCollection(player2Battle[card]));
        }
      }
      setP1Compare(0);
      setP2Compare(0);
      dispatch(player1Actions.removeFromWar());
      dispatch(player2Actions.removeFromWar());
      dispatch(player1Actions.removeFromBattle());
      dispatch(player2Actions.removeFromBattle());
    } else if (p1Compare === p2Compare) {
      checkEndGame();
      dispatch(player1Actions.addToBattle(player1Cards[0]));
      dispatch(player1Actions.addToBattle(player1Cards[1]));
      dispatch(player1Actions.addToBattle(player1Cards[2]));
      dispatch(player1Actions.addToWar(player1Cards[3]));
      dispatch(player1Actions.removeCard());
      dispatch(player1Actions.removeCard());
      dispatch(player1Actions.removeCard());
      dispatch(player1Actions.removeCard());
      dispatch(player2Actions.addToBattle(player2Cards[0]));
      dispatch(player2Actions.addToBattle(player2Cards[1]));
      dispatch(player2Actions.addToBattle(player2Cards[2]));
      dispatch(player2Actions.addToWar(player2Cards[3]));
      dispatch(player2Actions.removeCard());
      dispatch(player2Actions.removeCard());
      dispatch(player2Actions.removeCard());
      dispatch(player2Actions.removeCard());
      setP1Compare(player1War[player1War.length - 1]);
      setP2Compare([player2War[player2War.length - 1]]);
    }
  };

  useEffect(() => {
    if (gameStatus) {
      checkEndGame();
    }
  }, [player1Cards, player1Collection, player2Cards, player2Collection]);

  const checkEndGame = () => {
    if (
      p1Compare > 0 &&
      p2Compare > 0 &&
      p1Compare === p2Compare &&
      player1Cards.length + player1Collection.length < 4
    ) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner("player 2"));
    } else if (
      p1Compare > 0 &&
      p2Compare > 0 &&
      p1Compare === p2Compare &&
      player2Cards.length + player2Collection.length < 4
    ) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner("player 1"));
    }
    if (gameStatus && player1Cards.length + player1Collection.length <= 0) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner("player 1"));
    } else if (
      gameStatus &&
      player2Cards.length + player2Collection.length <= 0
    ) {
      dispatch(cardsActions.endGame());
      dispatch(playersActions.addWinner("player 2"));
    }
  };

  // console.log(player1Collection);
  // console.log(player2Collection);

  return (
    <div className="Outer-container">
      <div className="inner-container">
        <h1>Player 1 Cards</h1>
        <h2>Card Total: {player1Cards.length + player1Collection.length}</h2>

        <div className="outer-container">
          <div className="inner-container">
            <button
              onClick={p1War}
              className="playerCard"
              style={{
                backgroundImage: `url(${cardBack})`,
              }}
            ></button>
          </div>

          <div className="inner-container">
            {player1War.length > 0 ? (
              <div>
                <div>
                  <button
                    className="playerCard"
                    style={{
                      backgroundImage: `url(${
                        player1War[player1War.length - 1].image_url
                      })`,
                    }}
                  ></button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="playerCard"
                  style={{
                    backgroundColor: `green`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {player1Battle.length > 0 ? (
          <div>
            <div className="outer-container">
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player1Battle[player1Battle.length - 1].image_url
                  })`,
                }}
              ></div>
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player1Battle[player1Battle.length - 2].image_url
                  })`,
                }}
              ></div>
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player1Battle[player1Battle.length - 3].image_url
                  })`,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="outer-container">
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
          </div>
        )}

        {player1Collection.length > 0 ? (
          <div>
            <div className="outer-container">
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player1Collection[player1Collection.length - 1].image_url
                  })`,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="outer-container">
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
          </div>
        )}
      </div>

      <div className="inner-container">
        <h1>Player 2 Cards</h1>
        <h2>Card Total: {player2Cards.length + player2Collection.length}</h2>
        <div className="outer-container">
          <div className="inner-container">
            {player2War.length > 0 ? (
              <div>
                <div>
                  <button
                    className="playerCard"
                    style={{
                      backgroundImage: `url(${
                        player2War[player2War.length - 1].image_url
                      })`,
                    }}
                  ></button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="playerCard"
                  style={{
                    backgroundColor: `green`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="inner-container">
            <button
              onClick={p2War}
              className="playerCard"
              style={{
                backgroundImage: `url(${cardBack})`,
              }}
            ></button>
          </div>
        </div>

        {player2Battle.length > 0 ? (
          <div>
            <div className="outer-container">
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player2Battle[player2Battle.length - 1].image_url
                  })`,
                }}
              ></div>
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player2Battle[player2Battle.length - 2].image_url
                  })`,
                }}
              ></div>
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player2Battle[player2Battle.length - 3].image_url
                  })`,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="outer-container">
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
          </div>
        )}

        {player2Collection.length > 0 ? (
          <div>
            <div className="outer-container">
              <div
                className="playerCard inner-container"
                style={{
                  backgroundImage: `url(${
                    player2Collection[player2Collection.length - 1].image_url
                  })`,
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="outer-container">
            <div
              className="playerCard inner-container"
              style={{
                backgroundColor: `green`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameBoard;
