import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../../store/player-slice";
import { fetchCards, cardsActions } from "../../store/cards-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";
import { warActions } from "../../store/war-slice";
import cardBack from "./back.png";
import "./GameSetup.css";

import PlayerBoard from "./PlayerBoard";
import CenterBoard from "./CenterBoard";
import PlayerCountForm from "./PlayerCountForm";
import SkyjoApi from "../../skyjoApi";
import Main from "./Main";

import "./Main.css";

function GameSetup() {
  const cards = useSelector((state) => state.cardDeck.cardDeck);
  const player1Cards = useSelector((state) => state.player1.cards);
  const player1War = useSelector((state) => state.player1.war);
  const player1Battle = useSelector((state) => state.player1.battle);
  const player1Collection = useSelector((state) => state.player1.collection);
  const player2Cards = useSelector((state) => state.player2.cards);
  const player2War = useSelector((state) => state.player2.war);
  const player2Battle = useSelector((state) => state.player2.battle);
  const player2Collection = useSelector((state) => state.player2.collection);

  const [p1Compare, setP1Compare] = useState([]);
  const [p2Compare, setP2Compare] = useState([]);

  const dispatch = useDispatch();

  // Pull cards from API, assign cards to players in backend
  // updates state of "cards" to card table information from backend
  const deal = () => {
    dispatch(fetchCards());
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

  console.log(player1War);
  console.log(player2War);

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

  console.log(p1Compare, p2Compare);

  useEffect(() => {
    setTimeout(checkForWin, 2000);
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
      setP1Compare([]);
      setP2Compare([]);
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
      setP1Compare([]);
      setP2Compare([]);
      dispatch(player1Actions.removeFromWar());
      dispatch(player2Actions.removeFromWar());
      dispatch(player1Actions.removeFromBattle());
      dispatch(player2Actions.removeFromBattle());
    } else if (p1Compare === p2Compare) {
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
      setP1Compare([player1War[player1War.length - 1]]);
      setP2Compare([[player2War[player2War.length - 1]]]);
    }
  };

  console.log(player1Collection);
  console.log(player2Collection);

  return (
    <>
      {/* <h1>TEst</h1>
      <button onClick={deal}>Deal</button> */}

      {player1Cards.length > 0 && player2Cards.length > 0 ? (
        <div>
          <h1>Player 1 Cards</h1>
          <h2>Total cards left in pile: {player1Cards.length}</h2>
          <button
            onClick={p1War}
            className="playerCard"
            style={{
              backgroundImage: `url(${cardBack})`,
            }}
          ></button>

          {player1War.length > 0 ? (
            <div className="grid-container">
              {player1War.map((c) => (
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
            <h4>No cards played yet</h4>
          )}

          {player1Collection.length > 0 ? (
            <div className="grid-container">
              {player1Collection.map((c) => (
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
            <h4>No cards in collection</h4>
          )}

          <h1>Player 2 Cards</h1>
          <h2>Total cards left in pile: {player2Cards.length}</h2>
          <button
            onClick={p2War}
            className="playerCard"
            style={{
              backgroundImage: `url(${cardBack})`,
            }}
          ></button>

          {player2War.length > 0 ? (
            <div className="grid-container">
              {player2War.map((c) => (
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
            <h4>No cards played yet</h4>
          )}

          {player2Collection.length > 0 ? (
            <div className="grid-container">
              {player2Collection.map((c) => (
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
            <h4>No cards in collection</h4>
          )}
        </div>
      ) : (
        <button onClick={deal}>Deal</button>
      )}
    </>
  );
}

export default GameSetup;
