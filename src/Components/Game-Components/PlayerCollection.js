import React from "react";
import { useSelector } from "react-redux";

import "./Card.css";
import "./GameBoard.css";
import "./GameSetup.css";
import "../../Components/Toast.css";

function PlayerCollection({ player }) {
  const player1Collection = useSelector((state) => state.player1.collection);
  const player2Collection = useSelector((state) => state.player2.collection);

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
