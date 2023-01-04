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

  // Check for winner of war
  const checkForWin = () => {
    if (player1Attack[0].game_value > player2Attack[0].game_value) {
      player1Wins();
    } else if (player1Attack[0].game_value < player2Attack[0].game_value) {
      player2Wins();
    } else if (player1Attack[0].game_value === player2Attack[0].game_value) {
      dispatch(warActions.addP1Battle(player1Cards[0]));
      dispatch(warActions.addP1Battle(player1Cards[1]));
      dispatch(warActions.addP1Battle(player1Cards[2]));
      dispatch(warActions.addP1Battle(player1Cards[3]));
      dispatch(player1Actions.removeFromCards());
      dispatch(player1Actions.removeFromCards());
      dispatch(player1Actions.removeFromCards());
      dispatch(player1Actions.removeFromCards());
      dispatch(warActions.addP2Battle(player2Cards[0]));
      dispatch(warActions.addP2Battle(player2Cards[1]));
      dispatch(warActions.addP2Battle(player2Cards[2]));
      dispatch(warActions.addP2Battle(player2Cards[3]));
      dispatch(player2Actions.removeFromCards());
      dispatch(player2Actions.removeFromCards());
      dispatch(player2Actions.removeFromCards());
      dispatch(player2Actions.removeFromCards());
    }
  };

  const player1Wins = () => {
    dispatch(player1Actions.addCollection(player1Attack[0]));
    dispatch(player1Actions.addCollection(player2Attack[0]));
    dispatch(warActions.removeP1Attack());
    dispatch(warActions.removeP2Attack());
    if (player1Battle.length > 0) {
      dispatch(player1Actions.addCollection(player1Battle));
      dispatch(player1Actions.addCollection(player2Battle));
      dispatch(warActions.removeP1Battle());
      dispatch(warActions.removeP2Battle());
    }
  };
  const player2Wins = () => {
    dispatch(player2Actions.addCollection(player1Attack[0]));
    dispatch(player2Actions.addCollection(player2Attack[0]));
    dispatch(warActions.removeP1Attack());
    dispatch(warActions.removeP2Attack());
    if (player2Battle.length > 0) {
      dispatch(player2Actions.addCollection(player1Battle));
      dispatch(player2Actions.addCollection(player2Battle));
      dispatch(warActions.removeP1Battle());
      dispatch(warActions.removeP2Battle());
    }
  };

  const tieBreaker = () => {
    if (player1Battle[3].game_value > player2Battle[3].game_value) {
      player1Wins();
    } else if (player1Battle[3].game_value < player2Battle[3].game_value) {
      player2Wins();
    } else if (player1Battle[3].game_value === player2Battle[3].game_value) {
      tieBreaker();
    }
  };

  // const checkTieWinner = () => {
  // };
  // console.log(player1Battle[3].game_value);
  // console.log(player2Battle[player2Battle.length - 1].game_value);
  // console.log(player2Battle);

  const removePlayers = () => {
    dispatch(playersActions.removePlayers());
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

            <h5>Player 1 Battle</h5>
            {player1Battle.length > 0 ? (
              console.log(player1Battle)
            ) : (
              // <div>
              //   {player1Battle.map((c) => (
              //     <div className="grid-item">
              //       <button
              //         className="playerCard"
              //         style={{
              //           backgroundImage: `url(${c.image_url})`,
              //         }}
              //       ></button>
              //     </div>
              //   ))}
              // </div>
              <h4>No card in Battle yet</h4>
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

            <h5>Player 2 Battle</h5>
            <button onClick={tieBreaker}>Check battle Winner</button>
            {player2Battle.length > 0 ? (
              console.log(player2Battle)
            ) : (
              // <div>
              //   {player2Battle.map((c) => (
              //     <div className="grid-item">
              //       <button
              //         className="playerCard"
              //         style={{
              //           backgroundImage: `url(${c.image_url})`,
              //         }}
              //       ></button>
              //     </div>
              //   ))}
              // </div>
              <h4>No card in Battle yet</h4>
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
