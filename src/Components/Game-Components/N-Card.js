import React from "react";

import "./Card.css";

function Card({ card }) {
  return (
    <>
      {card ? (
        <div className="grid-item">
          <button
            className="playerCard"
            style={{
              backgroundImage: `url(${card.image_url})`,
            }}
          ></button>
        </div>
      ) : (
        <h1>Loading your board...</h1>
      )}
    </>
  );
}

export default Card;
