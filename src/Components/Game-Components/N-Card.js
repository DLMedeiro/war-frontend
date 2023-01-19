import React, { useEffect, useState } from "react";

import "./Card.css";
import cardBack from "./back.png";
import SkyjoApi from "../../skyjoApi";

function Card({ card }) {
  // console.log(card.face_up);
  // const [cardUp, setCardUp] = useState(true);
  // const [cardUp, setCardUp] = useState(card.face_up);
  // const [currentImage, setCurrentImage] = useState(playerCards.face_up);
  // const [boardCards, setBoardCards] = useState({});
  // console.log(card);
  // useEffect(() => {
  //   if (playerHand) {
  //     setBoardCards(playerHand);
  //   }
  // }, [boardCards]);

  // const flip = async () => {
  //   console.log(card.id);
  //   if (cardUp === false) {
  //     // console.log(card.board_id, card.id);
  //     await flipCard(card.board_id, card.id, player);
  //     setCardUp(true);
  //   }
  // };

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
