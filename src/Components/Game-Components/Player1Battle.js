import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Card.css";
import "./GameBoard.css";
import "./GameSetup.css";
import "../../Components/Toast.css";

function Player1Battle({ battleStartingIndex }) {
  const player1War = useSelector((state) => state.player1.war);
  const player1Battle = useSelector((state) => state.player1.battle);

  return (
    <div className="column">
      <div className="stacked-outer-container">
        {player1Battle.length >= 1 ||
        player1Battle.length >= 4 ||
        player1Battle.length >= 7 ? (
          <div
            className="playerCard card-1"
            style={{
              backgroundImage: `url(${player1Battle[battleStartingIndex].image_url})`,
            }}
          ></div>
        ) : (
          <div> </div>
        )}
        {player1Battle.length >= 2 ||
        player1Battle.length >= 5 ||
        player1Battle.length >= 8 ? (
          <div
            className="playerCard card-2"
            style={{
              backgroundImage: `url(${
                player1Battle[battleStartingIndex + 1].image_url
              })`,
            }}
          ></div>
        ) : (
          <div> </div>
        )}
        {player1Battle.length >= 3 ||
        player1Battle.length >= 6 ||
        player1Battle.length >= 9 ? (
          <div
            className="playerCard card-3"
            style={{
              backgroundImage: `url(${
                player1Battle[battleStartingIndex + 2].image_url
              })`,
            }}
          ></div>
        ) : (
          <div> </div>
        )}
        {player1War[1] ? (
          <div
            className="playerCard card-4"
            style={{
              backgroundImage: `url(${
                player1War[player1War.length - 1].image_url
              })`,
            }}
          ></div>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}

export default Player1Battle;
