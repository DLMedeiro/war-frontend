import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./PlayerBoard.css";

// import "./PlayerBoard.css";

function PlayerBoard({ playerCards, flipCard, player }) {
  // console.log(playerCards[0]);
  return (
    <>
      {playerCards ? (
        <div className="container">
          {/* <h1>This is the Player Board Section</h1> */}
          {/* <div>{playerHand[0].image}</div> */}
          <div className="grid-container-playerBoards">
            {playerCards.map((c) => (
              <Card card={c} flipCard={flipCard} player={player} />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default PlayerBoard;
