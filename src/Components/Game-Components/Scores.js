import React from "react";

// import "./Scores.css";

function Scores({ score }) {
  return (
    <>
      {score ? (
        <div className="container">
          <h3>This area is for all Player scores during the game</h3>
          <h4>{score}</h4>
        </div>
      ) : (
        <div className="container">
          <h3>No values to calculate yet</h3>
        </div>
      )}
    </>
  );
}

export default Scores;
