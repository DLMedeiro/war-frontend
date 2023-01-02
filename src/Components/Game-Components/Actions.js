import React from "react";

// import "./Actions.css";

function Actions({ currentPlayer }) {
  // console.log(currentPlayer);
  return (
    <>
      {currentPlayer ? (
        <div className="container">
          <h3>This area is for Player action and hints</h3>
          <h4>Current Player:{currentPlayer}</h4>
        </div>
      ) : (
        <div className="container">
          <h3>...Loading player</h3>
        </div>
      )}
    </>
  );
}

export default Actions;
