import React from "react";
import Card from "./Card";
import "./DrawDiscard.css";

function DrawDiscard({ discardCards, drawCards }) {
  // const [discardCards, setDiscardCards] = useState(discardCards);
  // const [drawCards, setDrawCards] = useState(drawCards);
  return (
    <div className="grid-container-drawDiscard">
      <div className="grid-item">
        <h3> Draw Card</h3>
        <Card card={drawCards[0]} />
      </div>
      <div className="grid-item">
        <h3> Discard Card</h3>
        <Card card={discardCards[0]} />
      </div>
    </div>
  );
}

export default DrawDiscard;
