import React from "react";

import Actions from "./Actions";
import DrawDiscard from "./DrawDiscard";

// import "./CenterBoard.css";

function CenterBoard({ discardCards, drawCards, currentPlayer }) {
  return (
    <div>
      <h1>This is the Center Board Section</h1>
      {/* <div class="grid-container"> */}
      <div>
        <h2>Draw Discard Area</h2>
        <DrawDiscard discardCards={discardCards} drawCards={drawCards} />
      </div>
      <div>
        <h2>Actions Area</h2>
        <Actions currentPlayer={currentPlayer} />
      </div>

      {/* </div> */}
    </div>
  );
}

export default CenterBoard;
