import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Card.css";
import "./GameBoard.css";
import "./GameSetup.css";
import "../../Components/Toast.css";

function PlayerWar({ player }) {
  const player1War = useSelector((state) => state.player1.war);

  const player2War = useSelector((state) => state.player2.war);

  return (
    <div>
      {player === "Player1" ? (
        <div className="inner-container">
          {player1War.length > 0 ? (
            <div>
              <div
                className="playerCard"
                style={{
                  backgroundImage: `url(${player1War[0].image_url})`,
                }}
              ></div>
            </div>
          ) : (
            <div>
              <div></div>
              <div className="playerCard card-placeholder"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="inner-container">
          {player2War.length > 0 ? (
            <div>
              <div
                className="playerCard"
                style={{
                  backgroundImage: `url(${player2War[0].image_url})`,
                }}
              ></div>
            </div>
          ) : (
            <div>
              <div></div>
              <div className="playerCard card-placeholder"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerWar;
