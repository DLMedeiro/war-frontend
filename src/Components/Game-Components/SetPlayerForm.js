import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../../store/player-slice";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, redirect } from "react-router-dom";
import { fetchCards } from "../../store/cards-slice";
import Toast from "../../Components/Toast";
import "../../Components/Toast.css";
import { player1Actions } from "../../store/player1-slice";
import { player2Actions } from "../../store/player2-slice";

const SetPlayerForm = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);
  const player1 = useSelector((state) => state.player1.player);
  const player2 = useSelector((state) => state.player2.player);
  const [player1Placeholder, setPlayer1Placeholder] = useState("");
  const [player2Placeholder, setPlayer2Placeholder] = useState("");

  const INITIAL_STATE = {};
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    if (players.length > 0) {
      if (players[0].player1) {
        dispatch(player1Actions.addPlayer(players[0]));
        // setPlayer1(players[0].player1);
        // setFormData({ player1: "Computer" });
      }
    }
  }, [players]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (player1.player1 === "Computer") {
      dispatch(player1Actions.addPlayer({ name: value }));
    }
    if (name === "player1" && player1.player1 !== "Computer") {
      setPlayer1Placeholder({ name: value });
    }
    if (name === "player2") {
      setPlayer2Placeholder({ name: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (player1Placeholder.length === 0 || player2Placeholder.length === 0) {
      new Toast({
        message: "Please enter a name for both players",
        type: "danger",
      });
    }
    if (player1.length > 0 && player2.length === 0) {
      dispatch(player2Actions.addPlayer(player2Placeholder));
      dispatch(fetchCards());
      setFormData(INITIAL_STATE);
      return redirect("/newGame");
    } else if (player1.length === 0 && player2.length === 0) {
      dispatch(player1Actions.addPlayer(player1Placeholder));
      dispatch(player2Actions.addPlayer(player2Placeholder));
      dispatch(fetchCards());
      setFormData(INITIAL_STATE);
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
