import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playersActions } from "../../store/player-slice";
import WarApi from "../../warApi";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { fetchCards } from "../../store/cards-slice";

const SetPlayerForm = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.players);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const INITIAL_STATE = {};
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    if (players.length > 0) {
      if (players[0].player1) {
        setPlayer1(players[0].player1);
        // setFormData({ player1: "Computer" });
      }
    }
  }, [players]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "player1") {
      setPlayer1(value);
    }
    if (name === "player2") {
      setPlayer2(value);
    }
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((formData) => ({
  //     ...formData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (players[0]) {
      dispatch(playersActions.addPlayer({ player2: player2 }));
    } else {
      dispatch(playersActions.addPlayer({ player1: player1 }));
      dispatch(playersActions.addPlayer({ player2: player2 }));
    }
    console.log(players);
    dispatch(fetchCards());
    setFormData(INITIAL_STATE);
    // clearCards();
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(playersActions.addPlayer(formData));
  //   console.log(players);
  //   dispatch(fetchCards());
  //   setFormData(INITIAL_STATE);
  //   // clearCards();
  // };
  // async function clearCards() {
  //   await WarApi.removeCards();
  // }
  return (
    <form>
      {player1 === "Computer" ? (
        <div className="form-group">
          <label htmlFor="player1">Player 1</label>
          <input
            className="form-control"
            onChange={handleChange}
            name="player1"
            value={player1}
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

      <Link
        type="button"
        id="btn-login"
        className="btn btn-primary btn-lg btn-block"
        onClick={handleSubmit}
        to="/newGame"
      >
        Let's Play!
      </Link>
    </form>
  );
};

export default SetPlayerForm;
