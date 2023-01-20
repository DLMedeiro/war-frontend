import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";
import { fetchCards } from "../../store/cards-slice";
import Toast from "../../Components/Toast";
import "../../Components/Toast.css";
import { playersActions } from "../../store/players-slice";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";

const SetPlayerForm = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);
  const player1 = useSelector((state) => state.player1.player);
  const player2 = useSelector((state) => state.player2.player);
  const [player1Placeholder, setPlayer1Placeholder] = useState({});
  const [player2Placeholder, setPlayer2Placeholder] = useState({});

  const INITIAL_STATE = {};
  const [formData, setFormData] = useState(INITIAL_STATE);

  // Computer is added into players when computer choice is chosen.  This checks if players has anything in it, and assigns player 1 to that player("Computer")
  useEffect(() => {
    if (players.length > 0) {
      if (players[0].player1) {
        dispatch(player1Actions.addPlayer({ name: players[0].player1 }));
        setPlayer1Placeholder({ name: "Computer" });
      }
    }
  }, [players]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "player1" && player1.name !== "Computer") {
      setPlayer1Placeholder({ name: value });
    }
    if (name === "player2") {
      setPlayer2Placeholder({ name: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(player1Placeholder.name);
    console.log(player2Placeholder.name.length);
    if (
      player1Placeholder.name.length === 0 ||
      player2Placeholder.name.length === 0
    ) {
      new Toast({
        message: "Please enter a name for both players",
        type: "danger",
      });
    }
    if (
      player1Placeholder.name === "Computer" &&
      player2Placeholder.name.length > 0
    ) {
      dispatch(player2Actions.addPlayer(player2Placeholder));
      dispatch(playersActions.addPlayer({ player2: player2Placeholder.name }));
      // set current player to player 2
      dispatch(playersActions.setCurrentPlayer(player2Placeholder));
      dispatch(fetchCards());
      setFormData(INITIAL_STATE);
      setPlayer1Placeholder({});
      setPlayer2Placeholder({});
      return redirect("/newGame");
    } else if (
      player1Placeholder.name !== "Computer" &&
      player1Placeholder.name.length > 0 &&
      player2Placeholder.name.length > 0
    ) {
      dispatch(player1Actions.addPlayer(player1Placeholder));
      dispatch(playersActions.addPlayer({ player1: player1Placeholder.name }));
      dispatch(player2Actions.addPlayer(player2Placeholder));
      dispatch(playersActions.addPlayer({ player2: player2Placeholder.name }));
      // Set current player to player 1
      dispatch(playersActions.setCurrentPlayer(player1Placeholder));
      dispatch(fetchCards());
      setFormData(INITIAL_STATE);
      setPlayer1Placeholder({});
      setPlayer2Placeholder({});
      return redirect("/newGame");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {player1.name === "Computer" ? (
        <div className="form-group">
          <label htmlFor="player1">Player 1</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="player1"
            value={player1.name}
            disabled
          />
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor="player1">Player 1</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="player1"
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="player2">Player 2</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="player2"
        />
      </div>
      <button
        type="submit"
        id="btn-login"
        className="btn btn-primary btn-lg btn-block"
      >
        Let's Play!
      </button>
    </form>
  );
};

export default SetPlayerForm;
